import asyncio
import os
import sys

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient

from app.main import app
from app.config import get_settings

settings = get_settings()
client = TestClient(app)

def test_health_check():
    """Test health check endpoint."""
    print("Testing health check...")
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "models_available" in data
    print("Health check passed")

def test_auth_failure():
    """Test authentication failure."""
    print("Testing auth failure...")
    response = client.post("/api/face/detect")
    assert response.status_code == 401
    print("Auth failure test passed")

def test_auth_success():
    """Test authentication success (using mock data)."""
    print("Testing auth success...")
    # We can't easily test the full flow without actual images,
    # but we can verify the auth middleware passes

    # Create a dummy image
    with open("test_image.jpg", "wb") as f:
        f.write(b"fake image data")

    try:
        response = client.post(
            "/api/face/detect",
            headers={
                "X-API-Key": settings.api_key,
                "X-API-Secret": settings.api_secret
            },
            files={"image": ("test_image.jpg", b"fake image data", "image/jpeg")}
        )
        # Should fail with image error, not auth error
        assert response.status_code != 401
        print("✅ Auth success test passed")
    finally:
        if os.path.exists("test_image.jpg"):
            os.remove("test_image.jpg")

if __name__ == "__main__":
    print("Starting verification...")
    try:
        test_health_check()
        test_auth_failure()
        test_auth_success()
        print("\n🎉 All verification tests passed!")
    except Exception as e:
        print(f"\n❌ Verification failed: {e}")
        sys.exit(1)
