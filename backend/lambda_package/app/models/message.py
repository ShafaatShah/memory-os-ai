from sqlalchemy import Column, DateTime, ForeignKey, BigInteger, Text
from sqlalchemy.sql import func

from app.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(BigInteger, primary_key=True, index=True)

    conversation_id = Column(
        BigInteger,
        ForeignKey("conversations.id"),
        nullable=False,
        index=True,
    )

    role = Column(
        Text,
        nullable=False,
    )

    content = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )