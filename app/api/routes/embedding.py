"""Embedding generation routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.api.models.responses import EmbeddingResponse
from app.config import get_settings
from app.core.security import check_rate_limit, verify_api_key
from app.services.face_service import face_service
from app.utils.validators import validate_upload_file

router = APIRouter()
settings = get_settings()


@router.post(
    "/embedding",
    response_model=EmbeddingResponse,
    dependencies=[Depends(verify_api_key), Depends(check_rate_limit)],
    summary="Generate face embedding",
    description="Generate a vector representation of a face.",
)
async def generate_embedding(
    photo: Annotated[UploadFile, File(description="Face photo")],
    model_name: Annotated[str, Form()] = settings.default_model,
):
    """
    Generate face embedding.
    """
    # Validate file
    await validate_upload_file(photo)

    # Read content
    photo_bytes = await photo.read()

    # Generate embedding
    return await face_service.get_embedding(
        image_bytes=photo_bytes,
        model_name=model_name,
    )
