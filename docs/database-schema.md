# MemoryOS AI Database Schema

## Tables

### Users

Stores user accounts.

Fields:

- id
- name
- email
- created_at

---

### Projects

Stores user projects.

Fields:

- id
- user_id
- title
- description
- status
- created_at

---

### Conversations

Stores chat history.

Fields:

- id
- project_id
- message
- role
- created_at

---

### Memories

Stores long-term memories.

Fields:

- id
- project_id
- summary
- importance
- tags
- created_at

---

### Tasks

Stores project tasks.

Fields:

- id
- project_id
- title
- status
- due_date