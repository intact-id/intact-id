import io
import time

import numpy as np
from deepface import DeepFace
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/compare")
async def compare_faces(
    photo1: UploadFile = File(...),
    photo2: UploadFile = File(...),
    enforce_detection: bool = True,
):
    try:
        start_time = time.time()

        # Read uploaded files
        img1_bytes = await photo1.read()
        img2_bytes = await photo2.read()

        # Open images with PIL
        img1_pil = Image.open(io.BytesIO(img1_bytes)).convert("RGB").resize((640, 640))
        img2_pil = Image.open(io.BytesIO(img2_bytes)).convert("RGB").resize((640, 640))

        # Convert to NumPy arrays
        img1 = np.array(img1_pil)
        img2 = np.array(img2_pil)

        # Verify faces
        result = DeepFace.verify(
            img1_path=img1,
            img2_path=img2,
            model_name="ArcFace",
            enforce_detection=enforce_detection,
            detector_backend="retinaface",
        )

        duration = time.time() - start_time

        return {
            "match": result["verified"],
            "confidence": (1 - result["distance"]) * 100,
            "threshold": result["threshold"],
            "duration_seconds": duration,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Face could not be detected in one of the images: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        )
