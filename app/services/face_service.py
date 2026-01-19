"""Face recognition service."""
import time
from typing import Any, Dict, List, Optional

from deepface import DeepFace

from app.config import get_settings
from app.core.exceptions import FaceNotDetectedError, ServiceUnavailableError
from app.core.logging import get_logger
from app.services.image_processor import image_processor
from app.services.model_manager import model_manager
from app.utils.cache import cache_manager
from app.utils.performance import performance_manager, metrics, async_timed

settings = get_settings()
logger = get_logger(__name__)


class FaceService:
    """Core face recognition service."""

    @async_timed
    async def verify(
        self,
        img1_bytes: bytes,
        img2_bytes: bytes,
        model_name: str = settings.default_model,
        detector_backend: str = settings.default_detector,
    ) -> Dict[str, Any]:
        """
        Verify if two images contain the same face.
        """
        # Validate model and detector
        model_manager.validate_model(model_name)
        model_manager.validate_detector(detector_backend)

        # Generate efficient cache key
        # Use perceptual hash for images + model config
        hash1 = image_processor.get_perceptual_hash(img1_bytes)
        hash2 = image_processor.get_perceptual_hash(img2_bytes)
        
        # Ensure consistent order for cache key (a vs b is same as b vs a)
        if hash1 > hash2:
            h1, h2 = hash2, hash1
        else:
            h1, h2 = hash1, hash2
            
        cache_key = cache_manager.generate_key(
            h1, h2, model_name, detector_backend, prefix="verify"
        )
        
        cached_result = await cache_manager.get(cache_key)
        if cached_result:
            logger.info("Returning cached verification result")
            metrics.record_request(0, cached=True)
            return cached_result

        start_time = time.time()

        try:
            # Process images (CPU bound)
            img1 = await performance_manager.run_in_executor(
                image_processor.process_image, img1_bytes
            )
            img2 = await performance_manager.run_in_executor(
                image_processor.process_image, img2_bytes
            )

            # Run verification in thread pool to avoid blocking event loop
            # DeepFace.verify is blocking and CPU intensive
            result = await performance_manager.run_in_executor(
                DeepFace.verify,
                img1_path=img1,
                img2_path=img2,
                model_name=model_name,
                detector_backend=detector_backend,
                enforce_detection=True,
                align=True,
                timeout=settings.operation_timeout_seconds
            )

            duration_ms = (time.time() - start_time) * 1000

            response = {
                "match": result["verified"],
                "confidence": round((1 - result["distance"]) * 100, 2),
                "distance": round(result["distance"], 4),
                "threshold": result["threshold"],
                "model": model_name,
                "detector": detector_backend,
                "similarity_metric": result.get("similarity_metric", "cosine"),
                "facial_areas": result.get("facial_areas", {}),
                "duration_ms": round(duration_ms, 2),
            }

            # Cache result
            await cache_manager.set(cache_key, response, ttl=300)  # 5 minutes cache
            
            # Record metrics
            metrics.record_request(duration_ms, cached=False)

            return response

        except ValueError as e:
            logger.warning(f"Face detection failed: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise FaceNotDetectedError(details={"error": str(e)})
        except Exception as e:
            logger.error(f"Verification error: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise ServiceUnavailableError(
                message="Verification failed", details={"error": str(e)}
            )

    @async_timed
    async def detect(
        self,
        image_bytes: bytes,
        detector_backend: str = settings.default_detector,
    ) -> Dict[str, Any]:
        """
        Detect faces in an image.
        """
        model_manager.validate_detector(detector_backend)
        start_time = time.time()

        try:
            # Process image in thread pool
            img_array = await performance_manager.run_in_executor(
                image_processor.process_image, image_bytes
            )

            # Run detection in thread pool
            faces = await performance_manager.run_in_executor(
                DeepFace.extract_faces,
                img_path=img_array,
                detector_backend=detector_backend,
                enforce_detection=False,
                align=True,
                timeout=settings.operation_timeout_seconds
            )

            duration_ms = (time.time() - start_time) * 1000
            metrics.record_request(duration_ms, cached=False)

            return {
                "face_count": len(faces),
                "has_single_face": len(faces) == 1,
                "faces": [
                    {
                        "confidence": round(face.get("confidence", 0), 4),
                        "region": face.get("facial_area", {}),
                    }
                    for face in faces
                ],
                "detector": detector_backend,
                "duration_ms": round(duration_ms, 2),
            }

        except Exception as e:
            logger.error(f"Face detection error: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise ServiceUnavailableError(
                message="Face detection failed", details={"error": str(e)}
            )

    @async_timed
    async def check_liveness(self, image_bytes: bytes) -> Dict[str, Any]:
        """
        Perform basic liveness check on photo.
        """
        start_time = time.time()
        try:
            img_array = await performance_manager.run_in_executor(
                image_processor.process_image, image_bytes
            )
            
            # Calculate quality metrics in thread pool
            blur_score = await performance_manager.run_in_executor(
                image_processor.calculate_blur_score, img_array
            )
            brightness = await performance_manager.run_in_executor(
                image_processor.calculate_brightness, img_array
            )
            
            is_blurry = blur_score < 100
            is_too_dark = brightness < 50
            is_too_bright = brightness > 200

            # Detect face (use fast opencv detector)
            faces = await performance_manager.run_in_executor(
                DeepFace.extract_faces,
                img_path=img_array,
                detector_backend="opencv",
                enforce_detection=False,
                timeout=settings.operation_timeout_seconds
            )

            face_detected = len(faces) > 0
            single_face = len(faces) == 1

            # Scoring logic
            score = 0
            issues = []

            if face_detected:
                score += 40
            else:
                issues.append("no_face_detected")

            if single_face:
                score += 20
            elif len(faces) > 1:
                issues.append("multiple_faces")

            if not is_blurry:
                score += 20
            else:
                issues.append("image_blurry")

            if not is_too_dark and not is_too_bright:
                score += 20
            else:
                issues.append("poor_lighting")

            passed = score >= 60 and face_detected and single_face
            
            duration_ms = (time.time() - start_time) * 1000
            metrics.record_request(duration_ms, cached=False)

            return {
                "liveness_score": score,
                "passed": passed,
                "checks": {
                    "face_detected": face_detected,
                    "single_face": single_face,
                    "image_quality": "good" if not is_blurry else "poor",
                    "lighting": "good" if not (is_too_dark or is_too_bright) else "poor",
                    "blur_score": round(blur_score, 2),
                    "brightness": round(brightness, 2),
                },
                "issues": issues,
                "recommendation": "PASS" if passed else "FAIL",
                "duration_ms": round(duration_ms, 2),
            }

        except Exception as e:
            logger.error(f"Liveness check error: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise ServiceUnavailableError(
                message="Liveness check failed", details={"error": str(e)}
            )

    @async_timed
    async def get_embedding(
        self,
        image_bytes: bytes,
        model_name: str = settings.default_model,
    ) -> Dict[str, Any]:
        """
        Generate face embedding.
        """
        model_manager.validate_model(model_name)

        # Check cache using perceptual hash
        img_hash = image_processor.get_perceptual_hash(image_bytes)
        
        cache_key = cache_manager.generate_key(
            img_hash, model_name, prefix="embedding"
        )
        
        cached_result = await cache_manager.get(cache_key)
        if cached_result:
            metrics.record_request(0, cached=True)
            return cached_result

        start_time = time.time()

        try:
            img_array = await performance_manager.run_in_executor(
                image_processor.process_image, image_bytes
            )

            embedding_objs = await performance_manager.run_in_executor(
                DeepFace.represent,
                img_path=img_array,
                model_name=model_name,
                enforce_detection=True,
                timeout=settings.operation_timeout_seconds
            )

            if not embedding_objs:
                raise FaceNotDetectedError()

            embedding = embedding_objs[0]["embedding"]
            
            result = {
                "embedding": embedding,
                "dimension": len(embedding),
                "model": model_name,
            }

            # Cache embedding (longer TTL)
            await cache_manager.set(cache_key, result, ttl=3600)
            
            duration_ms = (time.time() - start_time) * 1000
            metrics.record_request(duration_ms, cached=False)

            return result

        except ValueError as e:
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise FaceNotDetectedError(details={"error": str(e)})
        except Exception as e:
            logger.error(f"Embedding error: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise ServiceUnavailableError(
                message="Embedding generation failed", details={"error": str(e)}
            )

    @async_timed
    async def analyze(
        self,
        image_bytes: bytes,
        actions: List[str] = ["age", "gender", "emotion"],
    ) -> Dict[str, Any]:
        """
        Analyze facial attributes.
        """
        start_time = time.time()
        try:
            img_array = await performance_manager.run_in_executor(
                image_processor.process_image, image_bytes
            )

            analysis = await performance_manager.run_in_executor(
                DeepFace.analyze,
                img_path=img_array,
                actions=actions,
                enforce_detection=True,
                detector_backend="opencv",
                timeout=settings.operation_timeout_seconds
            )

            if isinstance(analysis, list):
                analysis = analysis[0]

            duration_ms = (time.time() - start_time) * 1000
            metrics.record_request(duration_ms, cached=False)

            return {
                "age": analysis.get("age"),
                "gender": analysis.get("dominant_gender"),
                "gender_confidence": analysis.get("gender"),
                "emotion": analysis.get("dominant_emotion"),
                "emotion_confidence": analysis.get("emotion"),
                "duration_ms": round(duration_ms, 2),
            }

        except ValueError as e:
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise FaceNotDetectedError(details={"error": str(e)})
        except Exception as e:
            logger.error(f"Analysis error: {e}")
            metrics.record_request((time.time() - start_time) * 1000, error=True)
            raise ServiceUnavailableError(
                message="Face analysis failed", details={"error": str(e)}
            )


# Global face service instance
face_service = FaceService()
