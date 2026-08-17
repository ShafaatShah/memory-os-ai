from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.models.message import Message


# -------------------------
# Conversation CRUD
# -------------------------

def create_conversation(
    db: Session,
    title: str = "New Chat",
    project_id: int | None = None,
):
    conversation = Conversation(
        title=title,
        project_id=project_id,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversation(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .first()
    )


def get_all_conversations(db: Session):
    return (
        db.query(Conversation)
        .order_by(Conversation.updated_at.desc())
        .all()
    )


# -------------------------
# Automatic Conversation Title
# -------------------------

def generate_conversation_title(content: str) -> str:
    """
    Create a short readable title from the user's first message.
    No AI call is required.
    """

    text = " ".join(content.strip().split())

    if not text:
        return "New Chat"

    # Special cases for common MemoryOS conversations
    lowered = text.lower()

    if "favorite color" in lowered or "favourite colour" in lowered:
        return "Favorite Color"

    if "favorite food" in lowered or "favourite food" in lowered:
        return "Favorite Food"

    if "my name" in lowered:
        return "My Name"

    if "where do i live" in lowered or "where do i live" in lowered:
        return "My Location"

    # Remove common question marks / punctuation
    cleaned = text.rstrip("?!.")

    # Keep title short
    words = cleaned.split()

    if len(words) > 7:
        cleaned = " ".join(words[:7]) + "..."

    # Capitalize nicely
    title = cleaned[:1].upper() + cleaned[1:]

    return title


# -------------------------
# Message CRUD
# -------------------------

def add_message(
    db: Session,
    conversation_id: int,
    role: str,
    content: str,
):
    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
    )

    db.add(message)

    # Automatically create a title from the first user message
    if role == "user":
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == conversation_id)
            .first()
        )

        if conversation and conversation.title == "New Chat":
            conversation.title = generate_conversation_title(content)

    db.commit()
    db.refresh(message)

    return message


def get_messages(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .all()
    )