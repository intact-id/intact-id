"""Face verification routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.api.models.responses import VerifyResponse
from app.config import get_settings
from app.core.security import check_rate_limit, verify_api_key
from app.services.face_service import face_service
from app.utils.validators import validate_upload_file

router = APIRouter()
settings = get_settings()


@router.post(
    "/verify",
    response_model=VerifyResponse,
    dependencies=[Depends(check_rate_limit)],
    summary="Verify if two faces match",
    description="Compare a selfie photo with an ID document photo to verify identity.",
)
async def verify_faces(
    selfie: Annotated[UploadFile, File(description="Customer selfie photo")],
    id_photo: Annotated[UploadFile, File(description="ID document photo")],
    model_name: Annotated[str, Form()] = settings.default_model,
    detector_backend: Annotated[str, Form()] = settings.default_detector,
):
    """
    Verify faces in two images.
    """
    # Validate files
    await validate_upload_file(selfie)
    await validate_upload_file(id_photo)

    # Read content
    selfie_bytes = await selfie.read()
    id_photo_bytes = await id_photo.read()

    # Verify
    return await face_service.verify(
        img1_bytes=selfie_bytes,
        img2_bytes=id_photo_bytes,
        model_name=model_name,
        detector_backend=detector_backend,
    )
