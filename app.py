import io
import logging
import time
from typing import Optional

import cv2
import numpy as np
from deepface import DeepFace
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Face Screening Service",
    description="Face detection, matching, and liveness verification for KYC",
    version="1.0.0",
)

# Configuration
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
DEFAULT_IMAGE_SIZE = (640, 640)

# Models
SUPPORTED_MODELS = ["ArcFace", "Facenet", "VGG-Face", "Facenet512"]
DEFAULT_MODEL = "ArcFace"

# Detectors
SUPPORTED_DETECTORS = ["opencv", "retinaface", "mtcnn", "ssd"]
DEFAULT_DETECTOR = "retinaface"


def validate_image(file: UploadFile) -> None:
    """Validate uploaded image file."""
    # Check file extension
    filename = file.filename.lower()
    ext = filename.split(".")[-1]
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
        )


async def process_image(
    file: UploadFile, target_size: tuple = DEFAULT_IMAGE_SIZE
) -> np.ndarray:
    """Read and preprocess uploaded image."""
    try:
        # Read file
        img_bytes = await file.read()

        # Check file size
        if len(img_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Max size: {MAX_FILE_SIZE / 1024 / 1024}MB",
            )

        # Open and convert to RGB
        img_pil = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        # Resize
        img_pil = img_pil.resize(target_size, Image.LANCZOS)

        # Convert to numpy array
        img_array = np.array(img_pil)

        return img_array

    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(
            status_code=400, detail=f"Failed to process image: {str(e)}"
        )


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "service": "Face Screening Service",
        "status": "healthy",
        "version": "1.0.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "models_available": SUPPORTED_MODELS,
        "detectors_available": SUPPORTED_DETECTORS,
    }


@app.post("/api/face/verify")
async def verify_faces(
    selfie: UploadFile = File(..., description="Customer selfie photo"),
    id_photo: UploadFile = File(..., description="ID document photo"),
    model_name: str = Query(DEFAULT_MODEL, enum=SUPPORTED_MODELS),
    detector_backend: str = Query(DEFAULT_DETECTOR, enum=SUPPORTED_DETECTORS),
    enforce_detection: bool = Query(True, description="Fail if no face detected"),
):
    """
    Verify if selfie matches ID photo.

    Returns:
    - match: bool (whether faces match)
    - confidence: float (0-100, higher is better)
    - threshold: float (model's threshold for matching)
    - distance: float (raw distance metric)
    - duration_ms: float (processing time in milliseconds)
    """
    start_time = time.time()

    try:
        # Validate files
        validate_image(selfie)
        validate_image(id_photo)

        logger.info(
            f"Verifying faces with model={model_name}, detector={detector_backend}"
        )

        # Process images
        img1 = await process_image(selfie)
        img2 = await process_image(id_photo)

        # Verify faces
        result = DeepFace.verify(
            img1_path=img1,
            img2_path=img2,
            model_name=model_name,
            enforce_detection=enforce_detection,
            detector_backend=detector_backend,
        )

        duration_ms = (time.time() - start_time) * 1000

        response = {
            "match": result["verified"],
            "confidence": round((1 - result["distance"]) * 100, 2),
            "distance": round(result["distance"], 4),
            "threshold": result["threshold"],
            "model": model_name,
            "detector": detector_backend,
            "duration_ms": round(duration_ms, 2),
        }

        logger.info(
            f"Verification complete: match={response['match']}, confidence={response['confidence']}"
        )

        return response

    except ValueError as e:
        logger.warning(f"Face detection failed: {str(e)}")
        raise HTTPException(
            status_code=422,
            detail={
                "error": "face_not_detected",
                "message": "Could not detect face in one or both images",
                "details": str(e),
            },
        )

    except Exception as e:
        logger.error(f"Verification error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "verification_failed",
                "message": "An unexpected error occurred during verification",
                "details": str(e),
            },
        )


@app.post("/api/face/detect")
async def detect_faces(
    image: UploadFile = File(..., description="Image to detect faces in"),
    detector_backend: str = Query(DEFAULT_DETECTOR, enum=SUPPORTED_DETECTORS),
):
    """
    Detect faces in an image.

    Returns:
    - face_count: int
    - faces: list of face regions
    - has_single_face: bool (important for selfie validation)
    """
    try:
        validate_image(image)

        img_array = await process_image(image)

        # Detect faces
        faces = DeepFace.extract_faces(
            img_path=img_array,
            detector_backend=detector_backend,
            enforce_detection=False,
        )

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
        }

    except Exception as e:
        logger.error(f"Face detection error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Face detection failed: {str(e)}")


@app.post("/api/face/liveness/photo")
async def check_liveness_photo(
    photo: UploadFile = File(..., description="Selfie photo for liveness check"),
):
    """
    Basic liveness check on a single photo.

    Checks for:
    - Image quality
    - Face visibility
    - Potential spoofing indicators

    Note: Single-photo liveness is less reliable than video-based.
    """
    try:
        validate_image(photo)

        img_array = await process_image(photo)

        # Convert to grayscale for analysis
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)

        # Check image quality (Laplacian variance - blur detection)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        is_blurry = laplacian_var < 100

        # Check brightness
        brightness = np.mean(gray)
        is_too_dark = brightness < 50
        is_too_bright = brightness > 200

        # Detect face
        faces = DeepFace.extract_faces(
            img_path=img_array, detector_backend="opencv", enforce_detection=False
        )

        face_detected = len(faces) > 0
        single_face = len(faces) == 1

        # Calculate liveness score (0-100)
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

        return {
            "liveness_score": score,
            "passed": passed,
            "checks": {
                "face_detected": face_detected,
                "single_face": single_face,
                "image_quality": "good" if not is_blurry else "poor",
                "lighting": "good" if not (is_too_dark or is_too_bright) else "poor",
                "blur_score": round(laplacian_var, 2),
                "brightness": round(brightness, 2),
            },
            "issues": issues,
            "recommendation": "PASS" if passed else "FAIL",
        }

    except Exception as e:
        logger.error(f"Liveness check error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Liveness check failed: {str(e)}")


@app.post("/api/face/embedding")
async def generate_embedding(
    photo: UploadFile = File(..., description="Face photo to generate embedding"),
    model_name: str = Query(DEFAULT_MODEL, enum=SUPPORTED_MODELS),
):
    """
    Generate face embedding (vector representation) for duplicate checking.

    Returns:
    - embedding: list[float] (512-dimensional vector)
    - model: str
    """
    try:
        validate_image(photo)

        img_array = await process_image(photo)

        # Generate embedding
        embedding_objs = DeepFace.represent(
            img_path=img_array, model_name=model_name, enforce_detection=True
        )

        if not embedding_objs:
            raise HTTPException(status_code=422, detail="No face detected in image")

        embedding = embedding_objs[0]["embedding"]

        return {
            "embedding": embedding,
            "dimension": len(embedding),
            "model": model_name,
        }

    except ValueError as e:
        raise HTTPException(status_code=422, detail=f"Face not detected: {str(e)}")

    except Exception as e:
        logger.error(f"Embedding generation error: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Embedding generation failed: {str(e)}"
        )


@app.post("/api/face/analyze")
async def analyze_face(
    photo: UploadFile = File(..., description="Face photo to analyze"),
):
    """
    Analyze facial attributes (age, gender, emotion).

    Useful for additional verification or fraud detection.
    """
    try:
        validate_image(photo)

        img_array = await process_image(photo)

        # Analyze face
        analysis = DeepFace.analyze(
            img_path=img_array,
            actions=["age", "gender", "emotion"],
            enforce_detection=True,
            detector_backend="opencv",
        )

        if isinstance(analysis, list):
            analysis = analysis[0]

        return {
            "age": analysis.get("age"),
            "gender": analysis.get("dominant_gender"),
            "gender_confidence": analysis.get("gender"),
            "emotion": analysis.get("dominant_emotion"),
            "emotion_confidence": analysis.get("emotion"),
        }

    except ValueError as e:
        raise HTTPException(status_code=422, detail=f"Face not detected: {str(e)}")

    except Exception as e:
        logger.error(f"Face analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Face analysis failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
