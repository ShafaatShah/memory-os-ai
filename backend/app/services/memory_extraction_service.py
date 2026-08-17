import json

from openai import OpenAI

from app.config import settings


class MemoryExtractionService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    def extract(self, text: str) -> list[dict]:

        prompt = f"""
Analyze the user's message and identify information that
would be useful to remember about the user in future conversations.

Only extract stable or potentially useful user facts.

Examples of useful memories:
- name
- favorite food
- favorite color
- favorite sport
- location
- occupation
- skills
- projects
- preferences
- goals
- recurring interests

Do NOT extract:
- questions
- temporary statements
- requests to the AI
- information about other people
- information that is clearly not about the user

Return ONLY valid JSON in this exact format:

[
  {{
    "key": "short_snake_case_key",
    "value": "fact about the user"
  }}
]

If there is nothing worth remembering, return:

[]

User message:
{text}
"""

        response = self.client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a memory extraction system. "
                        "Extract only useful user facts."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        content = (
            response.choices[0].message.content
            or "[]"
        )

        try:
            result = json.loads(content)

            if not isinstance(result, list):
                return []

            return result

        except json.JSONDecodeError:
            return []


memory_extraction_service = MemoryExtractionService()