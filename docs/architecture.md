# MemoryOS AI Architecture

## Overview

MemoryOS AI follows a modern three-tier architecture.

User

↓

Next.js Frontend

↓

FastAPI Backend

↓

CockroachDB + AI Provider + File Storage

---

## Frontend

Responsible for:

- User Interface
- Navigation
- Forms
- Dashboard
- Chat
- Projects
- Memory

---

## Backend

Responsible for:

- Business Logic
- Authentication
- AI Requests
- Memory Management
- Database Access

---

## Database

CockroachDB stores:

- Users
- Projects
- Conversations
- Memories
- Tasks

---

## AI

Responsible for:

- Generating responses
- Using stored memories
- Continuing conversations

---

## File Storage

Stores uploaded documents and media files.

---

## Data Flow

User

↓

Frontend

↓

Backend

↓

Database

↓

AI

↓

Database

↓

Frontend

↓

User