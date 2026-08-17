from sqlalchemy.orm import Session

from app.models.project_memory import ProjectMemory


def add_memory_to_project(
    db: Session,
    project_id: int,
    memory_id: int,
):
    existing = (
        db.query(ProjectMemory)
        .filter(
            ProjectMemory.project_id == project_id,
            ProjectMemory.memory_id == memory_id,
        )
        .first()
    )

    if existing:
        return existing

    link = ProjectMemory(
        project_id=project_id,
        memory_id=memory_id,
    )

    db.add(link)
    db.commit()
    db.refresh(link)

    return link


def get_project_memory_links(
    db: Session,
    project_id: int,
):
    return (
        db.query(ProjectMemory)
        .filter(ProjectMemory.project_id == project_id)
        .all()
    )


def remove_memory_from_project(
    db: Session,
    project_id: int,
    memory_id: int,
):
    link = (
        db.query(ProjectMemory)
        .filter(
            ProjectMemory.project_id == project_id,
            ProjectMemory.memory_id == memory_id,
        )
        .first()
    )

    if not link:
        return False

    db.delete(link)
    db.commit()

    return True