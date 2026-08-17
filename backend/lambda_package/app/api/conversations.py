from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.database import SessionLocal
from app.crud.conversation import (
    get_all_conversations,
    get_messages,
    create_conversation,
    get_conversation,
)

router = APIRouter()


@router.post("")
async def create_new_conversation(project_id: int | None = None):
    db = SessionLocal()

    try:
        conversation = create_conversation(
            db,
            project_id=project_id,
        )

        return {
            "id": str(conversation.id),
            "title": conversation.title,
            "created_at": conversation.created_at,
            "updated_at": conversation.updated_at,
        }

    finally:
        db.close()


@router.get("")
async def list_conversations():
    db = SessionLocal()

    try:
        conversations = get_all_conversations(db)

        return [
            {
                "id": str(conversation.id),
                "title": conversation.title,
                "created_at": conversation.created_at,
                "updated_at": conversation.updated_at,
            }
            for conversation in conversations
        ]

    finally:
        db.close()


@router.get("/project/{project_id}")
async def project_conversations(project_id: int):
    db = SessionLocal()

    try:
        result = db.execute(
            text(
                """
                SELECT id, title, created_at, updated_at
                FROM conversations
                WHERE project_id = :project_id
                ORDER BY updated_at DESC
                """
            ),
            {"project_id": project_id},
        )

        conversations = result.fetchall()

        return [
            {
                "id": str(row.id),
                "title": row.title,
                "created_at": row.created_at,
                "updated_at": row.updated_at,
            }
            for row in conversations
        ]

    finally:
        db.close()


@router.get("/{conversation_id}/messages")
async def conversation_messages(conversation_id: int):
    db = SessionLocal()

    try:
        messages = get_messages(db, conversation_id)

        return [
            {
                "id": str(message.id),
                "role": message.role,
                "content": message.content,
                "created_at": message.created_at,
            }
            for message in messages
        ]

    finally:
        db.close()


@router.delete("/{conversation_id}")
async def delete_conversation(conversation_id: int):
    db = SessionLocal()

    try:
        db.execute(
            text(
                "DELETE FROM messages "
                "WHERE conversation_id = :conversation_id"
            ),
            {"conversation_id": conversation_id},
        )

        result = db.execute(
            text(
                "DELETE FROM conversations "
                "WHERE id = :conversation_id"
            ),
            {"conversation_id": conversation_id},
        )

        if result.rowcount == 0:
            db.rollback()

            raise HTTPException(
                status_code=404,
                detail="Conversation not found",
            )

        db.commit()

        return {
            "success": True,
            "id": str(conversation_id),
        }

    except HTTPException:
        raise

    except Exception as error:
        db.rollback()

        print(
            f"Failed to delete conversation: {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to delete conversation",
        )

    finally:
        db.close()