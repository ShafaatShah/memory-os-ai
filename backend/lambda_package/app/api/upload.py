from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
import shutil

router = APIRouter()

from pathlib import Path
UPLOAD_DIR = Path("/tmp/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = UPLOAD_DIR / file.filename

        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": file.filename,
            "message": "File uploaded successfully",
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )