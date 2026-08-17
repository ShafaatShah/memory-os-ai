from app.crud.conversation import (
    add_message,
    create_conversation,
    get_messages,
    get_conversation,
)
from app.database import SessionLocal


class ConversationService:

    def create_new_conversation(self):
        db = SessionLocal()

        try:
            conversation = create_conversation(db)
            return conversation.id

        finally:
            db.close()

    def save_message(
        self,
        conversation_id: int,
        role: str,
        content: str,
    ):
        db = SessionLocal()

        try:
            # Save the message
            add_message(
                db,
                conversation_id,
                role,
                content,
            )

            # Automatically create a title from
            # the first user message.
            if role == "user":
                conversation = get_conversation(
                    db,
                    conversation_id,
                )

                if conversation:
                    if conversation.title == "New Chat":

                        text = " ".join(
                            content.strip().split()
                        )

                        lowered = text.lower()

                        # Memory-related titles
                        if (
                            "favorite color" in lowered
                            or "favourite colour" in lowered
                        ):
                            title = "Favorite Color"

                        elif (
                            "favorite food" in lowered
                            or "favourite food" in lowered
                        ):
                            title = "Favorite Food"

                        elif "my name" in lowered:
                            title = "My Name"

                        elif (
                            "where do i live" in lowered
                            or "my location" in lowered
                        ):
                            title = "My Location"

                        else:
                            # Use the first few words
                            # for a clean conversation title.
                            words = text.rstrip("?! .").split()

                            if len(words) > 7:
                                title = (
                                    " ".join(words[:7])
                                    + "..."
                                )
                            else:
                                title = text.rstrip(
                                    "?! ."
                                )

                            if title:
                                title = (
                                    title[0].upper()
                                    + title[1:]
                                )
                            else:
                                title = "New Chat"

                        conversation.title = title

                        db.commit()

        finally:
            db.close()

    def load_messages(
        self,
        conversation_id: int,
    ):
        db = SessionLocal()

        try:
            messages = get_messages(
                db,
                conversation_id,
            )

            return [
                {
                    "role": message.role,
                    "content": message.content,
                }
                for message in messages
            ]

        finally:
            db.close()


conversation_service = ConversationService()