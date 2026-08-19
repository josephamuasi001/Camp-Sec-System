# Camp-Sec Development Plan

## 1. Project Overview

Camp-Sec is a web-based Campus Security Incident Reporting and Management System for the University of Ghana.

The MVP focuses on allowing students and staff to report security incidents and track their reports, while authorized security personnel can review, investigate, update, and manage incidents.

## 2. Technology Stack

- Frontend: React
- Backend: FastAPI
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- API style: REST
- Development environment: Localhost during development

## 3. Development Strategy

The project will be developed incrementally.

Each feature follows:

1. Plan
2. Build
3. Test
4. Verify
5. Commit
6. Push
7. Move to the next feature

No major feature should be started until the previous milestone is working.

## 4. Development Phases

### Phase 1 — Project Foundation

- Create the project repository.
- Create `frontend` and `backend` directories.
- Initialize React.
- Initialize FastAPI.
- Establish local development commands.
- Create the initial README and documentation.

### Phase 2 — Database Foundation

Create and verify the core database structures:

- `users`
- `incidents`
- `incident_actions`
- `notifications`

Connect FastAPI to Supabase and verify database connectivity.

### Phase 3 — Authentication

Implement:

- Registration
- Login
- Logout
- Session persistence
- User profiles
- User roles
- Protected frontend routes

Authentication will use Supabase Auth.

### Phase 4 — Incident Reporting

Implement the core reporting workflow:

- Incident reporting form
- Incident validation
- Incident creation API
- Storage in Supabase
- Submission confirmation

### Phase 5 — Reporter Incident Tracking

Implement:

- My Incidents
- Incident details
- Current incident status
- Incident history/actions where applicable

### Phase 6 — Security Officer Management

Implement:

- Security officer dashboard
- Incident list
- Incident details
- Review workflow
- Status updates
- Assignment where required
- Recording security actions

### Phase 7 — Search and Basic Reports

Implement:

- Incident search
- Filtering
- Basic incident statistics
- Basic reports for authorized users

### Phase 8 — Notifications

Implement the MVP notification capability where required for important incident updates.

### Phase 9 — Testing and MVP Verification

Verify the complete workflow:

Student/staff registers → logs in → reports an incident → incident is stored → security personnel reviews it → status is updated → reporter can see the updated status.

### Phase 10 — Deployment Readiness

- Environment configuration
- Production database configuration
- Frontend deployment plan
- Backend deployment plan
- CORS configuration
- Security review
- Final testing

## 5. MVP Priority

### Must Have

- Authentication
- Role-aware access
- Incident reporting
- Incident storage
- Incident tracking
- Security incident management
- Status updates
- Basic search
- Basic reports

### Can Be Deferred

- Advanced analytics
- External SMS integrations
- CCTV integration
- Live GPS tracking
- Mobile application
- AI-powered classification
- Advanced emergency dispatch integrations

## 6. Definition of Done

A feature is considered complete when:

- The code works locally.
- The intended user flow works.
- Errors are handled reasonably.
- Database behavior has been verified where applicable.
- The feature has been tested.
- Changes are committed with a meaningful Git message.
- The repository remains in a working state.
