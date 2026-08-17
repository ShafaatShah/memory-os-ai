from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI

from mangum import Mangum
from app.api.chat import router as chat_router
from app.api.memory import router as memory_router
from app.database import Base, engine
from app.models.memory import Memory
from sqlalchemy import inspect
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.project import Project
from app.models.task import Task
from app.api import conversations
from app.api.upload import router as upload_router
from app.api.stats import router as stats_router
from app.api import projects

Base.metadata.create_all(bind=engine)

# --- Debug lines added below ---
print("Registered tables:", Base.metadata.tables.keys())
inspector = inspect(engine)
print("Database tables:", inspector.get_table_names())
# -------------------------------

app = FastAPI(
    title="MemoryOS AI API",
    version="1.0.0",
    description="Backend API for MemoryOS AI"
)

# Allow requests from the Next.js frontend


# Include API routes
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(memory_router, prefix="/api/memory", tags=["Memory"])
# --- Added Conversations Router Below ---
app.include_router(
    conversations.router,
    prefix="/api/conversations",
    tags=["Conversations"],
)
# --- Added Upload Router Below ---
app.include_router(
    upload_router,
    prefix="/api/upload",
    tags=["Upload"],
)
# --- Added Stats Router Below ---
app.include_router(
    stats_router,
    prefix="/api/stats",
    tags=["Stats"],
)
# --- Added Projects Router Below ---
app.include_router(
    projects.router,
    prefix="/api/projects",
    tags=["projects"],
)


@app.get("/")
async def root():
    return {
        "message": "MemoryOS AI Backend is running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "ok"
    }


handler = Mangum(app)