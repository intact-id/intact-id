"""Model management service."""
import threading
from typing import Any, Dict, Optional

from deepface import DeepFace

from app.config import get_settings
from app.core.exceptions import ModelNotFoundError
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


class ModelManager:
    """
    Manages DeepFace models and detectors.
    Handles pre-loading and thread-safe access.
    """

    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        """Singleton pattern."""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(ModelManager, cls).__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        """Initialize model manager."""
        if self._initialized:
            return

        self.models: Dict[str, Any] = {}
        self.detectors: Dict[str, Any] = {}
        self._initialized = True

    def preload_models(self) -> None:
        """Pre-load configured models and detectors."""
        logger.info("Pre-loading models and detectors...")

        # Pre-load models
        for model_name in settings.preload_models_list:
            try:
                logger.info(f"Loading model: {model_name}")
                # DeepFace builds model on first call
                DeepFace.build_model(model_name=model_name)
                self.models[model_name] = True
                
                # Warmup with dummy inference to initialize weights/cache
                # This prevents first-request latency
                try:
                    logger.info(f"Warming up model {model_name}...")
                    import numpy as np
                    dummy_img = np.zeros((224, 224, 3), dtype=np.uint8)
                    DeepFace.represent(
                        img_path=dummy_img, 
                        model_name=model_name, 
                        enforce_detection=False
                    )
                except Exception as w_e:
                    logger.warning(f"Warmup failed for {model_name}: {w_e}")
                    
                logger.info(f"Successfully loaded and warmed up model: {model_name}")
            except Exception as e:
                logger.error(f"Failed to load model {model_name}: {e}")

        # Pre-load detectors (some need initialization)
        for detector in settings.preload_detectors_list:
            try:
                logger.info(f"Initializing detector: {detector}")
                # Just a dummy call to initialize
                # Extract faces triggers detector initialization
                import numpy as np
                dummy_img = np.zeros((224, 224, 3), dtype=np.uint8)
                try:
                    DeepFace.extract_faces(
                        img_path=dummy_img,
                        detector_backend=detector,
                        enforce_detection=False
                    )
                except:
                    pass
                self.detectors[detector] = True
            except Exception as e:
                logger.error(f"Failed to initialize detector {detector}: {e}")

        logger.info("Model pre-loading complete")

    def validate_model(self, model_name: str) -> None:
        """
        Validate if model is supported.
        
        Args:
            model_name: Name of the model
            
        Raises:
            ModelNotFoundError: If model is not supported
        """
        if model_name not in settings.SUPPORTED_MODELS:
            raise ModelNotFoundError(
                message=f"Model '{model_name}' not supported",
                details={
                    "error": "model_not_supported",
                    "supported_models": settings.SUPPORTED_MODELS,
                },
            )

    def validate_detector(self, detector_backend: str) -> None:
        """
        Validate if detector is supported.
        
        Args:
            detector_backend: Name of the detector backend
            
        Raises:
            ModelNotFoundError: If detector is not supported
        """
        if detector_backend not in settings.SUPPORTED_DETECTORS:
            raise ModelNotFoundError(
                message=f"Detector '{detector_backend}' not supported",
                details={
                    "error": "detector_not_supported",
                    "supported_detectors": settings.SUPPORTED_DETECTORS,
                },
            )


# Global model manager instance
model_manager = ModelManager()
