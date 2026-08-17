from fastapi import APIRouter
from sqlalchemy import func

from app.database import SessionLocal
from app.models.project import Project
from app.models.memory import Memory
from app.models.conversation import Conversation
from app.models.task import Task


router = APIRouter()


@router.get("/")
async def get_stats():
    db = SessionLocal()

    try:
        projects_count = (
            db.query(func.count(Project.id))
            .scalar()
            or 0
        )

        memories_count = (
            db.query(func.count(Memory.id))
            .scalar()
            or 0
        )

        conversations_count = (
            db.query(func.count(Conversation.id))
            .scalar()
            or 0
        )

        tasks_count = (
            db.query(func.count(Task.id))
            .scalar()
            or 0
        )

        return {
            "projects": projects_count,
            "memories": memories_count,
            "tasks": tasks_count,
            "conversations": conversations_count,
        }

    finally:
        db.close()