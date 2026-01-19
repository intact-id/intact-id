"""Image validation utilities."""
from typing import Optional

from fastapi import UploadFile

from app.config import get_settings
from app.core.exceptions import FileTooLargeError, InvalidFileTypeError

settings = get_settings()


def validate_file_extension(filename: str) -> None:
    """
    Validate file extension.
    
    Args:
        filename: Name of the uploaded file
        
    Raises:
        InvalidFileTypeError: If file extension is not allowed
    """
    ext = filename.lower().split(".")[-1]
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise InvalidFileTypeError(
            message=f"Invalid file type. Allowed: {', '.join(settings.ALLOWED_EXTENSIONS)}",
            details={
                "error": "invalid_file_type",
                "allowed_extensions": list(settings.ALLOWED_EXTENSIONS),
                "received_extension": ext,
            },
        )


def validate_file_size(file_size: int, max_size: Optional[int] = None) -> None:
    """
    Validate file size.
    
    Args:
        file_size: Size of the file in bytes
        max_size: Maximum allowed size in bytes (defaults to config)
        
    Raises:
        FileTooLargeError: If file exceeds maximum size
    """
    max_bytes = max_size or settings.max_file_size_bytes
    if file_size > max_bytes:
        raise FileTooLargeError(
            message=f"File too large. Max size: {settings.max_file_size_mb}MB",
            details={
                "error": "file_too_large",
                "max_size_mb": settings.max_file_size_mb,
                "max_size_bytes": max_bytes,
                "file_size_bytes": file_size,
            },
        )


async def validate_upload_file(file: UploadFile) -> None:
    """
    Validate uploaded file.
    
    Args:
        file: FastAPI UploadFile object
        
    Raises:
        InvalidFileTypeError: If file type is invalid
        FileTooLargeError: If file is too large
    """
    # Validate extension
    if file.filename:
        validate_file_extension(file.filename)

    # Read file to check size
    content = await file.read()
    validate_file_size(len(content))

    # Reset file pointer
    await file.seek(0)
