from sqlalchemy import Column, DateTime, BigInteger, String, Integer, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True,
    )

    title = Column(
        String,
        nullable=False,
        default="New Chat",
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )