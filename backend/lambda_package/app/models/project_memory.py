from sqlalchemy import Column, BigInteger, DateTime
from sqlalchemy.sql import func

from app.database import Base


class ProjectMemory(Base):
    __tablename__ = "project_memories"

    id = Column(
        BigInteger,
        primary_key=True,
    )

    project_id = Column(
        BigInteger,
        nullable=False,
    )

    memory_id = Column(
        BigInteger,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )