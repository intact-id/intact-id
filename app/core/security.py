"""Security utilities including authentication and rate limiting."""
import time
from collections import defaultdict
from typing import Dict, Optional, Tuple

from fastapi import Depends, Header, HTTPException, Request
from fastapi.security import APIKeyHeader

from app.config import get_settings
from app.core.exceptions import AuthenticationError, RateLimitError

settings = get_settings()

# API Key header scheme
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)
api_secret_header = APIKeyHeader(name="X-API-Secret", auto_error=False)


# Rate limiting storage (in-memory, use Redis in production for distributed systems)
rate_limit_storage: Dict[str, list] = defaultdict(list)


async def verify_api_key(
    x_api_key: Optional[str] = Header(None),
    x_api_secret: Optional[str] = Header(None),
) -> Tuple[str, str]:
    """
    Verify API key and secret from headers.
    
    Args:
        x_api_key: API key from X-API-Key header
        x_api_secret: API secret from X-API-Secret header
        
    Returns:
        Tuple of (api_key, api_secret)
        
    Raises:
        AuthenticationError: If authentication fails
    """
    if not x_api_key or not x_api_secret:
        raise AuthenticationError(
            message="Missing API credentials",
            details={
                "error": "missing_credentials",
                "required_headers": ["X-API-Key", "X-API-Secret"],
            },
        )

    # Verify against configured credentials
    if x_api_key != settings.api_key or x_api_secret != settings.api_secret:
        raise AuthenticationError(
            message="Invalid API credentials",
            details={"error": "invalid_credentials"},
        )

    return x_api_key, x_api_secret


async def check_rate_limit(
    request: Request, 
    api_creds: Tuple[str, str] = Depends(verify_api_key)
) -> None:
    """
    Check if request exceeds rate limit.
    
    Args:
        request: FastAPI request object
        api_creds: Tuple of (api_key, api_secret) from verify_api_key dependency
        
    Raises:
        RateLimitError: If rate limit is exceeded
    """
    api_key = api_creds[0]
    current_time = time.time()
    window_start = current_time - 60  # 1 minute window

    # Get request history for this API key
    request_times = rate_limit_storage[api_key]

    # Remove old requests outside the window
    request_times[:] = [t for t in request_times if t > window_start]

    # Check if limit exceeded
    if len(request_times) >= settings.rate_limit_per_minute:
        raise RateLimitError(
            message=f"Rate limit exceeded. Maximum {settings.rate_limit_per_minute} requests per minute.",
            details={
                "error": "rate_limit_exceeded",
                "limit": settings.rate_limit_per_minute,
                "window": "1 minute",
                "retry_after": 60,
            },
        )

    # Add current request
    request_times.append(current_time)


def get_cors_config() -> dict:
    """Get CORS configuration."""
    return {
        "allow_origins": settings.allowed_origins_list,
        "allow_credentials": True,
        "allow_methods": ["GET", "POST"],
        "allow_headers": ["*"],
    }
