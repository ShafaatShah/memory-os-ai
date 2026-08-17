import json

from sqlalchemy import text
from sqlalchemy.orm import Session


def save_memory_embedding(
    db: Session,
    memory_id: int,
    memory_key: str,
    memory_value: str,
    embedding: list[float],
):
    embedding_json = json.dumps(embedding)

    existing = db.execute(
        text(
            """
            SELECT id
            FROM memory_embeddings
            WHERE memory_id = :memory_id
            LIMIT 1
            """
        ),
        {
            "memory_id": memory_id,
        },
    ).fetchone()

    if existing:
        db.execute(
            text(
                """
                UPDATE memory_embeddings
                SET
                    memory_key = :memory_key,
                    memory_value = :memory_value,
                    embedding = CAST(:embedding AS VECTOR)
                WHERE memory_id = :memory_id
                """
            ),
            {
                "memory_id": memory_id,
                "memory_key": memory_key,
                "memory_value": memory_value,
                "embedding": embedding_json,
            },
        )
    else:
        db.execute(
            text(
                """
                INSERT INTO memory_embeddings (
                    memory_id,
                    memory_key,
                    memory_value,
                    embedding
                )
                VALUES (
                    :memory_id,
                    :memory_key,
                    :memory_value,
                    CAST(:embedding AS VECTOR)
                )
                """
            ),
            {
                "memory_id": memory_id,
                "memory_key": memory_key,
                "memory_value": memory_value,
                "embedding": embedding_json,
            },
        )

    db.commit()


def delete_memory_embedding(
    db: Session,
    memory_id: int,
):
    db.execute(
        text(
            """
            DELETE FROM memory_embeddings
            WHERE memory_id = :memory_id
            """
        ),
        {
            "memory_id": memory_id,
        },
    )

    db.commit()


def search_memory_embeddings(
    db: Session,
    embedding: list[float],
    limit: int = 5,
):
    embedding_json = json.dumps(embedding)

    result = db.execute(
        text(
            """
            SELECT
                m.id AS memory_id,
                m.key AS memory_key,
                m.value AS memory_value,
                1 - (
                    me.embedding <=> CAST(:embedding AS VECTOR)
                ) AS similarity
            FROM memories m
            JOIN memory_embeddings me
                ON me.memory_id = m.id
            ORDER BY me.embedding <=> CAST(:embedding AS VECTOR)
            LIMIT :limit
            """
        ),
        {
            "embedding": embedding_json,
            "limit": limit,
        },
    )

    return result.fetchall()