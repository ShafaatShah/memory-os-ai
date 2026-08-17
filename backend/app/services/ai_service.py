from openai import OpenAI

from app.config import settings
from app.services.memory_service import memory_service
from app.services.conversation_service import conversation_service

SYSTEM_PROMPT = """
You are MemoryOS AI.

You are an intelligent AI operating system.

Your purpose is to remember important user information,
retrieve it when needed, and answer accurately.

Use the retrieved user memories when they are relevant to
the user's current question.

Do not claim to remember something if it is not present
in the retrieved memories.

Be concise, professional, and helpful.
"""


class AIService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    async def generate_response(
        self,
        message: str,
        conversation_id=None,
    ) -> dict:

        # ---------------------------------
        # Validate conversation
        # ---------------------------------
        if conversation_id is None:
            raise ValueError("conversation_id is required")

        conversation_id = int(conversation_id)

        # ---------------------------------
        # Save user message
        # ---------------------------------
        memory_service.add_user_message(message)

        conversation_service.save_message(
            conversation_id,
            "user",
            message,
        )

        # ---------------------------------
        # Retrieve relevant memories
        # ---------------------------------
        relevant_memories = memory_service.search_relevant_memories(
            message,
            limit=5,
        )

        memories = []

        for memory in relevant_memories:
            memories.append(
                {
                    "id": memory["memory_id"],
                    "key": memory["key"],
                    "value": memory["value"],
                    "confidence": round(memory["similarity"] * 100),
                }
            )

        # ---------------------------------
        # Build retrieved memory context
        # ---------------------------------
        memory_context = ""

        if relevant_memories:
            memory_context = "Retrieved User Memories:\n"

            for memory in relevant_memories:
                memory_context += (
                    f"- {memory['key']}: "
                    f"{memory['value']} "
                    f"(similarity: "
                    f"{memory['similarity']:.2f})\n"
                )

        # ---------------------------------
        # Build system prompt
        # ---------------------------------
        system_prompt = SYSTEM_PROMPT

        if memory_context:
            system_prompt += (
                "\n\n" + memory_context
            )

        # ---------------------------------
        # Load conversation from database
        # ---------------------------------
        conversation_messages = (
            conversation_service.load_messages(
                conversation_id
            )
        )

        # ---------------------------------
        # Build AI messages
        # ---------------------------------
        messages = [
            {
                "role": "system",
                "content": system_prompt,
            }
        ]

        messages.extend(
            conversation_messages
        )

        # ---------------------------------
        # Ask OpenAI
        # ---------------------------------
        response = self.client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=messages,
        )

        answer = (
            response.choices[0].message.content
            or ""
        )

        # ---------------------------------
        # Save assistant response
        # ---------------------------------
        memory_service.add_assistant_message(
            answer
        )

        conversation_service.save_message(
            conversation_id,
            "assistant",
            answer,
        )

        # ---------------------------------
        # Return response + retrieved memories
        # ---------------------------------
        return {
            "response": answer,
            "memories": memories,
        }


ai_service = AIService()