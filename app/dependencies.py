"""Dependency injection."""
from app.config import get_settings
from app.services.face_service import face_service
from app.services.model_manager import model_manager
from app.utils.cache import cache_manager

settings = get_settings()


def get_config():
    """Get configuration settings."""
    return settings


def get_face_service():
    """Get face service instance."""
    return face_service


def get_model_manager():
    """Get model manager instance."""
    return model_manager


def get_cache_manager():
    """Get cache manager instance."""
    return cache_manager
