"""Custom exceptions for the Face Screening Service."""
from typing import Any, Dict, Optional


class FaceScreeningException(Exception):
    """Base exception for face screening service."""

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None,
    ):
        self.message = message
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)


class AuthenticationError(FaceScreeningException):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Authentication failed", details: Optional[Dict[str, Any]] = None):
        super().__init__(message, status_code=401, details=details)


class RateLimitError(FaceScreeningException):
    """Raised when rate limit is exceeded."""

    def __init__(self, message: str = "Rate limit exceeded", details: Optional[Dict[str, Any]] = None):
        super().__init__(message, status_code=429, details=details)


class FaceNotDetectedError(FaceScreeningException):
    """Raised when no face is detected in image."""

    def __init__(
        self,
        message: str = "Could not detect face in image",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=422, details=details)


class InvalidImageError(FaceScreeningException):
    """Raised when image is invalid or corrupted."""

    def __init__(
        self,
        message: str = "Invalid or corrupted image",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=400, details=details)


class FileTooLargeError(FaceScreeningException):
    """Raised when uploaded file exceeds size limit."""

    def __init__(
        self,
        message: str = "File size exceeds maximum allowed",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=400, details=details)


class InvalidFileTypeError(FaceScreeningException):
    """Raised when file type is not allowed."""

    def __init__(
        self,
        message: str = "Invalid file type",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=400, details=details)


class ModelNotFoundError(FaceScreeningException):
    """Raised when requested model is not available."""

    def __init__(
        self,
        message: str = "Requested model not found",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=400, details=details)


class ServiceUnavailableError(FaceScreeningException):
    """Raised when service is temporarily unavailable."""

    def __init__(
        self,
        message: str = "Service temporarily unavailable",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message, status_code=503, details=details)
