from sqlalchemy import Column, Integer, String, DateTime, func

from app.database import Base


class Memory(Base):
    __tablename__ = "memories"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    key = Column(
        String(100),
        nullable=False,
        index=True,
    )

    value = Column(
        String(1000),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )