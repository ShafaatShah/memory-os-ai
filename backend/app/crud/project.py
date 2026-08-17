from sqlalchemy.orm import Session

from app.models.project import Project


def create_project(
    db: Session,
    name: str,
    description: str | None = None,
):
    project = Project(
        name=name,
        description=description,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_all_projects(db: Session):
    return (
        db.query(Project)
        .order_by(Project.created_at.desc())
        .all()
    )


def get_project(
    db: Session,
    project_id: int,
):
    return (
        db.query(Project)
        .filter(Project.id == project_id)
        .first()
    )


def delete_project(
    db: Session,
    project_id: int,
):
    project = get_project(db, project_id)

    if not project:
        return None

    db.delete(project)
    db.commit()

    return project