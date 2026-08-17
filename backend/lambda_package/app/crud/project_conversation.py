from sqlalchemy.orm import Session

from app.models.project_conversation import ProjectConversation


def add_conversation_to_project(
    db: Session,
    project_id: int,
    conversation_id: int,
):
    existing = (
        db.query(ProjectConversation)
        .filter(
            ProjectConversation.project_id == project_id,
            ProjectConversation.conversation_id == conversation_id,
        )
        .first()
    )

    if existing:
        return existing

    link = ProjectConversation(
        project_id=project_id,
        conversation_id=conversation_id,
    )

    db.add(link)
    db.commit()
    db.refresh(link)

    return link


def get_project_conversation_links(
    db: Session,
    project_id: int,
):
    return (
        db.query(ProjectConversation)
        .filter(ProjectConversation.project_id == project_id)
        .order_by(ProjectConversation.created_at.asc())
        .all()
    )


def remove_conversation_from_project(
    db: Session,
    project_id: int,
    conversation_id: int,
):
    link = (
        db.query(ProjectConversation)
        .filter(
            ProjectConversation.project_id == project_id,
            ProjectConversation.conversation_id == conversation_id,
        )
        .first()
    )

    if not link:
        return False

    db.delete(link)
    db.commit()

    return True