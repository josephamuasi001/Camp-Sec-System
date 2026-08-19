# Camp-Sec Architecture Essentials

## Stack

```text
Frontend  → React
Backend   → FastAPI
Database  → Supabase PostgreSQL
Auth      → Supabase Auth
```

## Core Flow

```text
React
  ↓
FastAPI
  ↓
Supabase
```

## Authentication

```text
React
  ↓
Supabase Auth
  ↓
Session
  ↓
User Profile
  ↓
Role
```

## Incident Flow

```text
Student/Staff
  ↓
Report Incident
  ↓
FastAPI
  ↓
Supabase
  ↓
Security Officer
  ↓
Review / Investigate
  ↓
Update Status
  ↓
Reporter Tracks Status
```

## Core Tables

```text
users
incidents
incident_actions
notifications
```

## Main Roles

```text
student
staff
security_officer
security_supervisor
management
admin
```

## Architecture Rule

The frontend is responsible for presentation and user interaction.

FastAPI is responsible for API behavior and business logic.

Supabase is responsible for persistent storage and authentication services.

Sensitive authorization must ultimately be enforced on the backend/database, not only by React.
