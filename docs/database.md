# Camp-Sec Database Design

## 1. Database Technology

Database:

```text
Supabase PostgreSQL
```

Authentication:

```text
Supabase Auth
```

## 2. Core Tables

### users

Stores application-level user profiles.

| Column | Purpose |
|---|---|
| id | User identifier, linked to authentication identity |
| full_name | User's name |
| email | User email |
| role | Application role |
| created_at | Creation timestamp |
| updated_at | Last update timestamp |

### incidents

Stores security incident reports.

| Column | Purpose |
|---|---|
| id | Incident identifier |
| reporter_id | User who reported the incident |
| incident_type | Type/category of incident |
| description | Incident description |
| location | Incident location |
| incident_date | Date of incident |
| incident_time | Time of incident |
| status | Current status |
| assigned_officer_id | Officer assigned where applicable |
| created_at | Creation timestamp |
| updated_at | Last update timestamp |

### incident_actions

Stores actions performed during incident management.

| Column | Purpose |
|---|---|
| id | Action identifier |
| incident_id | Related incident |
| officer_id | Officer performing the action |
| action_description | Description of action |
| created_at | Action timestamp |

### notifications

Stores application notifications.

| Column | Purpose |
|---|---|
| id | Notification identifier |
| user_id | Recipient |
| incident_id | Related incident where applicable |
| message | Notification message |
| is_read | Read/unread state |
| created_at | Creation timestamp |

## 3. Relationships

```text
users
  |
  +----< incidents
  |
  +----< incident_actions
  |
  +----< notifications

incidents
  |
  +----< incident_actions
  |
  +----< notifications
```

## 4. Important Relationships

One user can report many incidents.

One incident belongs to one reporter.

One incident can have many recorded actions.

One security officer can perform many incident actions.

One user can receive many notifications.

## 5. Authentication Relationship

Supabase Auth owns the authentication identity.

The application `users.id` should correspond to the authenticated user's identity ID.

## 6. Database Security

Row Level Security should be enabled where appropriate.

Example principle:

```text
Reporter → can access permitted records belonging to themselves
Security Officer → can access incidents required for security duties
Admin → can access administrative records
```

Exact policies should be implemented deliberately during database setup rather than assumed.
