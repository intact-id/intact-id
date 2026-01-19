"""Redis caching utilities."""
import hashlib
import json
from typing import Any, Optional

import redis.asyncio as aioredis

from app.config import get_settings
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


class CacheManager:
    """Manage Redis cache connections and operations."""

    def __init__(self):
        """Initialize cache manager."""
        self.redis: Optional[aioredis.Redis] = None
        self.enabled = settings.redis_enabled

    async def connect(self) -> None:
        """Connect to Redis with connection pooling."""
        if not self.enabled:
            logger.info("Redis caching is disabled")
            return

        try:
            # Create connection pool with explicit settings
            pool = aioredis.ConnectionPool.from_url(
                settings.redis_url,
                max_connections=settings.redis_max_connections,
                socket_timeout=settings.redis_socket_timeout,
                socket_connect_timeout=settings.redis_socket_connect_timeout,
                decode_responses=True,
                encoding="utf-8",
            )
            
            self.redis = aioredis.Redis(connection_pool=pool)
            await self.redis.ping()
            logger.info(
                f"Connected to Redis successfully with pool size {settings.redis_max_connections}"
            )
        except Exception as e:
            logger.warning(f"Failed to connect to Redis: {e}. Caching disabled.")
            self.enabled = False
            self.redis = None

    async def disconnect(self) -> None:
        """Disconnect from Redis."""
        if self.redis:
            await self.redis.close()
            logger.info("Disconnected from Redis")

    async def get(self, key: str) -> Optional[Any]:
        """
        Get value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None
        """
        if not self.enabled or not self.redis:
            return None

        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Cache get error: {e}")
            return None

    async def set(
        self, key: str, value: Any, ttl: Optional[int] = None
    ) -> bool:
        """
        Set value in cache.
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds (defaults to config)
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enabled or not self.redis:
            return False

        try:
            ttl = ttl or settings.cache_ttl_seconds
            await self.redis.setex(
                key, ttl, json.dumps(value, default=str)
            )
            return True
        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False

    async def delete(self, key: str) -> bool:
        """
        Delete value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enabled or not self.redis:
            return False

        try:
            await self.redis.delete(key)
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False

    @staticmethod
    def generate_key(*args: Any, prefix: str = "") -> str:
        """
        Generate cache key from arguments.
        
        Args:
            *args: Arguments to hash
            prefix: Key prefix
            
        Returns:
            Cache key
        """
        # Optimize for bytes (images) - use hash instead of MD5
        parts = []
        for arg in args:
            if isinstance(arg, bytes):
                # Use Python's built-in hash for speed (not cryptographic but fine for cache keys)
                parts.append(str(hash(arg)))
            else:
                parts.append(str(arg))
        
        content = ":".join(parts)
        # Use faster hash for non-cryptographic purposes
        hash_value = str(hash(content))
        
        if prefix:
            return f"{prefix}:{hash_value}"
        return hash_value


# Global cache manager instance
cache_manager = CacheManager()
