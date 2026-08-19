# Camp-Sec System Architecture

## 1. Architecture Overview

Camp-Sec uses a three-layer web application architecture:

```text
React Frontend
      |
      | HTTP / REST
      v
FastAPI Backend
      |
      v
Supabase PostgreSQL
```

Supabase Auth provides authentication services alongside the application database.

## 2. Frontend

The React frontend is responsible for:

- User interface
- Forms
- Navigation
- Dashboards
- Client-side state
- Authentication state
- Displaying incidents and statuses
- Sending requests to FastAPI

The frontend should not contain sensitive business rules that must be enforced by the server.

## 3. Backend

FastAPI is responsible for:

- REST API endpoints
- Request validation
- Business logic
- Incident operations
- Status transitions
- Search
- Reporting
- Communication with Supabase
- Server-side authorization as the security layer is strengthened

## 4. Database

Supabase PostgreSQL stores persistent application data.

Core entities:

```text
users
incidents
incident_actions
notifications
```

Supabase Auth manages authentication identities.

## 5. Authentication Flow

```text
User
 |
 v
React Login/Register
 |
 v
Supabase Auth
 |
 v
Authenticated Session
 |
 v
Application Profile
 |
 v
Role-aware Frontend
```

## 6. Incident Reporting Flow

```text
Student/Staff
 |
 v
React Incident Form
 |
 v
FastAPI API
 |
 v
Validation
 |
 v
Supabase PostgreSQL
 |
 v
Incident Record
```

## 7. Incident Management Flow

```text
Incident Submitted
       |
       v
Security Officer
       |
       v
Review
       |
       v
Investigation
       |
       v
Status Update
       |
       v
Resolution / Closure
       |
       v
Reporter Tracks Status
```

## 8. Role-aware Access

The system supports different responsibilities for:

- Student
- Staff
- Security Officer
- Security Supervisor
- Management
- System Administrator

Frontend routing can control which screens are presented, while backend authorization should ultimately enforce access to protected operations.

## 9. Security Principles

- Authentication should be handled through Supabase Auth.
- Database access should use appropriate Row Level Security policies.
- Secrets must remain in environment variables.
- Frontend code must not contain private service keys.
- Backend authorization should protect sensitive operations.
- User input must be validated.
- Access should follow least privilege.

## 10. Deployment Architecture

```text
Browser
   |
   v
React Frontend
   |
   | HTTPS REST requests
   v
FastAPI Backend
   |
   v
Supabase
   |
   +-- PostgreSQL
   +-- Authentication
```
