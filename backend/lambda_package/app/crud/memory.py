from sqlalchemy.orm import Session

from app.models.memory import Memory


# -------------------------
# Get all memories
# -------------------------

def get_all_memories(db: Session):
    return (
        db.query(Memory)
        .order_by(Memory.created_at.desc())
        .all()
    )


# -------------------------
# Get one memory
# -------------------------

def get_memory(db: Session, key: str):
    return (
        db.query(Memory)
        .filter(Memory.key == key)
        .first()
    )


# -------------------------
# Save / Update memory
# -------------------------

def save_memory(
    db: Session,
    key: str,
    value: str,
):
    existing = get_memory(db, key)

    if existing:
        existing.value = value

        db.commit()
        db.refresh(existing)

        return existing

    memory = Memory(
        key=key,
        value=value,
    )

    db.add(memory)
    db.commit()
    db.refresh(memory)

    return memory


# -------------------------
# Delete memory
# -------------------------

def delete_memory(
    db: Session,
    key: str,
):
    memory = get_memory(db, key)

    if not memory:
        return False

    db.delete(memory)
    db.commit()

    return True