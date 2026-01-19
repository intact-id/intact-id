"""Liveness check routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile

from app.api.models.responses import LivenessResponse
from app.core.security import check_rate_limit, verify_api_key
from app.services.face_service import face_service
from app.utils.validators import validate_upload_file

router = APIRouter()


@router.post(
    "/liveness/photo",
    response_model=LivenessResponse,
    dependencies=[Depends(verify_api_key), Depends(check_rate_limit)],
    summary="Check liveness of a photo",
    description="Perform basic liveness checks on a selfie photo.",
)
async def check_liveness(
    photo: Annotated[UploadFile, File(description="Selfie photo for liveness check")],
):
    """
    Check liveness of photo.
    """
    # Validate file
    await validate_upload_file(photo)

    # Read content
    photo_bytes = await photo.read()

    # Check liveness
    return await face_service.check_liveness(image_bytes=photo_bytes)
