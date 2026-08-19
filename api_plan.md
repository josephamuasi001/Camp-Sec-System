# Camp-Sec API Plan

## 1. API Technology

Backend:

```text
FastAPI
```

API style:

```text
REST
```

Base path:

```text
/api
```

The exact prefix can be finalized during backend setup.

## 2. Authentication

Authentication is handled primarily by Supabase Auth.

Potential backend endpoints:

```text
GET    /api/auth/me
```

This can return the currently authenticated application profile once backend token verification is implemented.

## 3. Incidents

### Create Incident

```text
POST /api/incidents
```

Purpose:

Create a new security incident.

### List Incidents

```text
GET /api/incidents
```

Purpose:

Retrieve incidents permitted for the current role.

### Get Incident

```text
GET /api/incidents/{incident_id}
```

Purpose:

Retrieve details for one incident.

### Update Incident

```text
PUT /api/incidents/{incident_id}
```

Purpose:

Update permitted incident information.

### Update Status

```text
PATCH /api/incidents/{incident_id}/status
```

Purpose:

Change the incident status.

### Search Incidents

```text
GET /api/incidents/search
```

Potential query parameters:

```text
incident_type
location
status
incident_id
```

## 4. Incident Actions

### Add Action

```text
POST /api/incidents/{incident_id}/actions
```

Purpose:

Record an action taken by security personnel.

### List Actions

```text
GET /api/incidents/{incident_id}/actions
```

Purpose:

Retrieve the incident action/history records.

## 5. Reports

Potential endpoint:

```text
GET /api/reports/incidents/summary
```

Purpose:

Return basic incident counts and summaries.

## 6. Health

```text
GET /api/health
```

Purpose:

Confirm that the backend is running.

## 7. API Design Principles

- Validate incoming data.
- Return consistent HTTP status codes.
- Return useful error messages.
- Keep database logic organized.
- Keep authentication/authorization separate from presentation.
- Avoid exposing sensitive information.
- Use role permissions for protected operations.

## 8. Implementation Order

1. Health check
2. Database connection
3. Create incident
4. List incidents
5. Get incident
6. Update status
7. Add/list actions
8. Search
9. Basic reports
10. Backend authentication/authorization hardening
