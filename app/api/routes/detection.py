"""Face detection routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.api.models.responses import DetectResponse
from app.config import get_settings
from app.core.security import check_rate_limit, verify_api_key
from app.services.face_service import face_service
from app.utils.validators import validate_upload_file

router = APIRouter()
settings = get_settings()


@router.post(
    "/detect",
    response_model=DetectResponse,
    dependencies=[Depends(verify_api_key), Depends(check_rate_limit)],
    summary="Detect faces in an image",
    description="Detect and count faces in an uploaded image.",
)
async def detect_faces(
    image: Annotated[UploadFile, File(description="Image to detect faces in")],
    detector_backend: Annotated[str, Form()] = settings.default_detector,
):
    """
    Detect faces in image.
    """
    # Validate file
    await validate_upload_file(image)

    # Read content
    image_bytes = await image.read()

    # Detect
    return await face_service.detect(
        image_bytes=image_bytes,
        detector_backend=detector_backend,
    )
