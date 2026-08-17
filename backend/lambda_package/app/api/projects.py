from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from pydantic import BaseModel

from app.database import SessionLocal
from app.crud.project import (
    create_project,
    get_all_projects,
    delete_project,
)
from app.crud.project_conversation import (
    get_project_conversation_links,
)
from app.crud.project_memory import (
    add_memory_to_project,
    get_project_memory_links,
    remove_memory_from_project,
)
from app.models.memory import Memory

router = APIRouter()


class ProjectCreate(BaseModel):
    name: str
    description: str | None = None


class ProjectMemoryCreate(BaseModel):
    memory_id: int


@router.get("/")
async def list_projects():
    db = SessionLocal()

    try:
        projects = get_all_projects(db)

        return [
            {
                "id": str(project.id),
                "name": project.name,
                "description": project.description or "",
                "memories": len(
                    get_project_memory_links(db, project.id)
                ),
                "conversations": db.execute(
                    text(
                        """
                        SELECT COUNT(*)
                        FROM conversations
                        WHERE project_id = :project_id
                        """
                    ),
                    {"project_id": project.id},
                ).scalar(),
                "tags": ["Project"],
                "created_at": project.created_at,
                "updated_at": project.updated_at,
            }
            for project in projects
        ]

    finally:
        db.close()


@router.post("/")
async def create_new_project(payload: ProjectCreate):
    db = SessionLocal()

    try:
        name = payload.name.strip()

        if not name:
            raise HTTPException(
                status_code=400,
                detail="Project name is required",
            )

        project = create_project(
            db,
            name=name,
            description=payload.description,
        )

        return {
            "id": str(project.id),
            "name": project.name,
            "description": project.description or "",
            "memories": 0,
            "conversations": 0,
            "tags": ["New Project"],
            "created_at": project.created_at,
            "updated_at": project.updated_at,
        }

    finally:
        db.close()


@router.delete("/{project_id}")
async def remove_project(project_id: int):
    db = SessionLocal()

    try:
        project = delete_project(db, project_id)

        if not project:
            raise HTTPException(
                status_code=404,
                detail="Project not found",
            )

        return {
            "success": True,
            "id": str(project_id),
        }

    finally:
        db.close()


# -------------------------
# Get memories for project
# -------------------------
@router.get("/{project_id}/memories")
async def get_project_memories(project_id: int):
    db = SessionLocal()

    try:
        links = get_project_memory_links(
            db,
            project_id,
        )

        memories = []

        for link in links:
            memory = (
                db.query(Memory)
                .filter(Memory.id == link.memory_id)
                .first()
            )

            if memory:
                memories.append(
                    {
                        "id": memory.id,
                        "key": memory.key,
                        "value": memory.value,
                        "confidence": 100,
                    }
                )

        return memories

    finally:
        db.close()


# -------------------------
# Add memory to project
# -------------------------
@router.post("/{project_id}/memories")
async def add_project_memory(
    project_id: int,
    payload: ProjectMemoryCreate,
):
    db = SessionLocal()

    try:
        memory = (
            db.query(Memory)
            .filter(Memory.id == payload.memory_id)
            .first()
        )

        if not memory:
            raise HTTPException(
                status_code=404,
                detail="Memory not found",
            )

        add_memory_to_project(
            db,
            project_id,
            payload.memory_id,
        )

        return {
            "success": True,
            "project_id": str(project_id),
            "memory_id": payload.memory_id,
        }

    finally:
        db.close()


# -------------------------
# Remove memory from project
# -------------------------
@router.delete("/{project_id}/memories/{memory_id}")
async def remove_project_memory(
    project_id: int,
    memory_id: int,
):
    db = SessionLocal()

    try:
        removed = remove_memory_from_project(
            db,
            project_id,
            memory_id,
        )

        if not removed:
            raise HTTPException(
                status_code=404,
                detail="Memory is not linked to this project",
            )

        return {
            "success": True,
            "project_id": str(project_id),
            "memory_id": memory_id,
        }

    finally:
        db.close()