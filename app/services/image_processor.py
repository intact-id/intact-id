"""Image processing service."""
import io
from typing import Tuple

import cv2
import imagehash
import numpy as np
from PIL import Image

from app.config import get_settings
from app.core.exceptions import InvalidImageError
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


class ImageProcessor:
    """Handles image processing operations."""

    @staticmethod
    async def process_image(
        image_bytes: bytes,
        target_size: Tuple[int, int] = settings.DEFAULT_IMAGE_SIZE,
    ) -> np.ndarray:
        """
        Process image bytes into numpy array.
        
        Args:
            image_bytes: Raw image bytes
            target_size: Target size (width, height)
            
        Returns:
            Numpy array of the image
            
        Raises:
            InvalidImageError: If image cannot be processed
        """
        try:
            # Open image with PIL
            img_pil = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB
            if img_pil.mode != "RGB":
                img_pil = img_pil.convert("RGB")

            # Resize if needed
            # Note: DeepFace handles resizing internally, but we can pre-resize 
            # to reduce memory usage for very large images
            if img_pil.size[0] > 2000 or img_pil.size[1] > 2000:
                img_pil.thumbnail((2000, 2000), Image.LANCZOS)
            
            # Convert to numpy array
            img_array = np.array(img_pil)
            
            return img_array

        except Exception as e:
            logger.error(f"Error processing image: {e}")
            raise InvalidImageError(
                message="Failed to process image",
                details={"error": str(e)},
            )

    @staticmethod
    def to_grayscale(img_array: np.ndarray) -> np.ndarray:
        """Convert RGB image to grayscale."""
        return cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)

    @staticmethod
    def calculate_blur_score(img_array: np.ndarray) -> float:
        """
        Calculate blur score using Laplacian variance.
        Lower score means more blurry.
        """
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        return cv2.Laplacian(gray, cv2.CV_64F).var()

    @staticmethod
    def calculate_brightness(img_array: np.ndarray) -> float:
        """Calculate average brightness."""
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        return np.mean(gray)
    
    @staticmethod
    def get_perceptual_hash(image_bytes: bytes) -> str:
        """
        Generate perceptual hash of image for content-based caching.
        
        Args:
            image_bytes: Raw image bytes
            
        Returns:
            Perceptual hash string
        """
        try:
            img_pil = Image.open(io.BytesIO(image_bytes))
            # Use average hash for speed (phash is more accurate but slower)
            return str(imagehash.average_hash(img_pil))
        except Exception as e:
            logger.warning(f"Failed to generate perceptual hash: {e}")
            # Fallback to simple hash
            return str(hash(image_bytes))


# Global image processor instance
image_processor = ImageProcessor()
