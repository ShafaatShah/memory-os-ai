from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.memory import Memory
from app.services.memory_service import memory_service
from app.crud.memory import save_memory, delete_memory
from app.crud.memory_embedding import (
    save_memory_embedding,
    delete_memory_embedding,
)
from app.services.embedding_service import embedding_service


router = APIRouter()


class MemoryUpdate(BaseModel):
    value: str


# -------------------------
# Get all memories
# -------------------------

@router.get("/")
async def get_memories():
    memories = []

    for key, value in memory_service.get_memories().items():
        memories.append(
            {
                "key": key,
                "value": value,
                "confidence": 100,
            }
        )

    return {
        "count": len(memories),
        "memories": memories,
    }


# -------------------------
# Update memory
# -------------------------

@router.put("/{key}")
async def update_memory(
    key: str,
    request: MemoryUpdate,
):
    db = SessionLocal()

    try:
        memory = save_memory(
            db,
            key,
            request.value.strip(),
        )

        embedding_text = f"{memory.key}: {memory.value}"

        embedding = embedding_service.create_embedding(
            embedding_text
        )

        save_memory_embedding(
            db,
            memory.id,
            memory.key,
            memory.value,
            embedding,
        )

        return {
            "key": memory.key,
            "value": memory.value,
            "confidence": 100,
        }

    finally:
        db.close()


# -------------------------
# Delete memory
# -------------------------

@router.delete("/{key}")
async def remove_memory(key: str):
    db = SessionLocal()

    try:
        db_memory = (
            db.query(Memory)
            .filter(Memory.key == key)
            .first()
        )

        if not db_memory:
            raise HTTPException(
                status_code=404,
                detail="Memory not found",
            )

        delete_memory_embedding(
            db,
            db_memory.id,
        )

        delete_memory(db, key)

        return {
            "success": True,
            "message": f"Memory '{key}' deleted",
        }

    finally:
        db.close()