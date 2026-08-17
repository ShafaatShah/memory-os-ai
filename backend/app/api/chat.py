import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import ai_service
from app.database import SessionLocal
from app.models.conversation import Conversation
from app.crud.project_conversation import (
    get_project_conversation_links,
)
from app.crud.project_memory import (
    add_memory_to_project,
    get_project_memory_links,
)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: str


class MemoryUsed(BaseModel):
    id: int
    key: str
    value: str
    confidence: int


class ChatResponse(BaseModel):
    response: str
    memories: list[MemoryUsed]


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Generate AI response and save the message
        result = await ai_service.generate_response(
            request.message,
            request.conversation_id,
        )

        # -------------------------------------------------
        # Link retrieved memories to the conversation's project
        # -------------------------------------------------
        db = SessionLocal()

        try:
            conversation_id = int(request.conversation_id)

            conversation = (
                db.query(Conversation)
                .filter(Conversation.id == conversation_id)
                .first()
            )

            # Collect target project IDs (from direct FK or junction table)
            target_project_ids = set()

            if conversation and getattr(conversation, "project_id", None):
                target_project_ids.add(conversation.project_id)

            project_links = get_project_conversation_links(
                db,
                conversation_id,
            )
            for link in project_links:
                target_project_ids.add(link.project_id)

            if target_project_ids and result.get("memories"):
                for project_id in target_project_ids:
                    existing_links = get_project_memory_links(
                        db,
                        project_id,
                    )

                    existing_memory_ids = {
                        link.memory_id for link in existing_links
                    }

                    for memory in result.get("memories", []):
                        memory_id = memory.get("id")

                        if (
                            memory_id
                            and memory_id not in existing_memory_ids
                        ):
                            add_memory_to_project(
                                db,
                                project_id,
                                memory_id,
                            )

        finally:
            db.close()

        # -------------------------------------------------
        # Automatically rename "New Chat"
        # using the first user message
        # -------------------------------------------------
        db = SessionLocal()

        try:
            conversation = (
                db.query(Conversation)
                .filter(
                    Conversation.id == int(request.conversation_id)
                )
                .first()
            )

            if conversation and conversation.title == "New Chat":
                title = request.message.strip()

                # Keep the title short and clean
                if len(title) > 45:
                    title = title[:45].rstrip() + "..."

                if title:
                    conversation.title = title
                    db.commit()

        finally:
            db.close()

        return ChatResponse(
            response=result["response"],
            memories=result["memories"],
        )

    except Exception as error:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )