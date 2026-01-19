"""Facial analysis routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile

from app.api.models.responses import AnalysisResponse
from app.core.security import check_rate_limit, verify_api_key
from app.services.face_service import face_service
from app.utils.validators import validate_upload_file

router = APIRouter()


@router.post(
    "/analyze",
    response_model=AnalysisResponse,
    dependencies=[Depends(verify_api_key), Depends(check_rate_limit)],
    summary="Analyze facial attributes",
    description="Analyze age, gender, and emotion from a face photo.",
)
async def analyze_face(
    photo: Annotated[UploadFile, File(description="Face photo to analyze")],
):
    """
    Analyze face.
    """
    # Validate file
    await validate_upload_file(photo)

    # Read content
    photo_bytes = await photo.read()

    # Analyze
    return await face_service.analyze(image_bytes=photo_bytes)
