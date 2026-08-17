from typing import List

from app.crud.memory import get_all_memories, save_memory
from app.crud.memory_embedding import (
    save_memory_embedding,
    search_memory_embeddings,
)
from app.database import SessionLocal
from app.services.embedding_service import embedding_service
from app.services.memory_extraction_service import memory_extraction_service


class MemoryService:

    def __init__(self):
        self.conversation: List[dict] = []

    # -------------------------
    # Conversation
    # -------------------------

    def add_user_message(self, message: str):
        self.conversation.append(
            {
                "role": "user",
                "content": message,
            }
        )

        self.extract_memory(message)

    def add_assistant_message(self, message: str):
        self.conversation.append(
            {
                "role": "assistant",
                "content": message,
            }
        )

    def get_conversation(self):
        return self.conversation

    # -------------------------
    # Memory Extraction
    # -------------------------

    def extract_memory(self, text: str):

        memories = memory_extraction_service.extract(text)

        if not memories:
            return

        db = SessionLocal()

        try:
            for item in memories:

                key = item.get("key")
                value = item.get("value")

                if not key or not value:
                    continue

                key = str(key).strip().lower()
                key_aliases = {
                    "favorite_food": "favourite_food",
                    "favorite_color": "favourite_colour",
                    "favorite_colour": "favourite_colour",
                    "favorite_sport": "favourite_sport",
                }
                key = key_aliases.get(key, key)
                value = str(value).strip()

                if not key or not value:
                    continue

                # ---------------------------------
                # Save / update normal memory
                # ---------------------------------
                memory = save_memory(
                    db,
                    key,
                    value,
                )

                # ---------------------------------
                # Create semantic embedding
                # ---------------------------------
                embedding_text = f"{key}: {value}"

                embedding = embedding_service.create_embedding(
                    embedding_text
                )

                # ---------------------------------
                # Save / update vector memory
                # ---------------------------------
                save_memory_embedding(
                    db,
                    memory.id,
                    key,
                    value,
                    embedding,
                )

        finally:
            db.close()

    # -------------------------
    # Memory Retrieval
    # -------------------------

    def get_memories(self):
        db = SessionLocal()

        try:
            memories = get_all_memories(db)

            return {
                memory.key: memory.value
                for memory in memories
            }

        finally:
            db.close()

    def get_memory_context(self) -> str:
        memories = self.get_memories()

        if not memories:
            return ""

        context = "Known User Facts:\n"

        for key, value in memories.items():
            context += f"- {key}: {value}\n"

        return context

    def search_relevant_memories(
        self,
        query: str,
        limit: int = 5,
    ):
        db = SessionLocal()

        try:
            query_embedding = embedding_service.create_embedding(query)

            results = search_memory_embeddings(
                db,
                query_embedding,
                limit=10,
            )

            relevant = []

            for row in results:
                similarity = float(row.similarity)

                # Ignore weak / unrelated memories
                if similarity < 0.35:
                    continue

                relevant.append(
                    {
                        "memory_id": row.memory_id,
                        "key": row.memory_key,
                        "value": row.memory_value,
                        "similarity": similarity,
                    }
                )

                if len(relevant) >= limit:
                    break

            return relevant

        finally:
            db.close()

    # -------------------------
    # Clear temporary conversation
    # -------------------------

    def clear(self):
        self.conversation = []


memory_service = MemoryService()