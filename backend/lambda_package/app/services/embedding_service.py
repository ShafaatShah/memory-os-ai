from openai import OpenAI

from app.config import settings


class EmbeddingService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

        self.model = "text-embedding-3-small"

    def create_embedding(self, text: str) -> list[float]:

        response = self.client.embeddings.create(
            model=self.model,
            input=text,
        )

        return response.data[0].embedding


embedding_service = EmbeddingService()