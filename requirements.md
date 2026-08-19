# Camp-Sec Requirements

## 1. System Purpose

Camp-Sec is intended to provide a centralized system for reporting, managing, tracking, searching, and reporting on campus security incidents.

## 2. Functional Requirements

### Authentication

- Users must be able to authenticate.
- The system must identify users and their roles.
- Access must depend on user responsibilities.

### Incident Reporting

The system must allow authorized users to report incidents.

An incident should capture:

- Incident type
- Description
- Location
- Date
- Time
- Reporter

The system should validate required information before accepting a report.

### Incident Management

Authorized security personnel should be able to:

- View submitted incidents
- Review incidents
- Investigate incidents
- Update incident status
- Record actions taken
- Manage incident information as permitted

### Incident Tracking

Reporters should be able to:

- View their submitted reports
- View incident details
- Track the status of their reports

### Search and Retrieval

Authorized users should be able to search and retrieve incident records.

Useful search/filter fields include:

- Incident ID
- Incident type
- Location
- Status

### Reporting

Authorized users should be able to access basic summaries and reports concerning incidents.

### Notifications

The system may notify relevant users about important incident updates.

## 3. Non-Functional Requirements

### Security

- Authentication must be implemented.
- Authorization should follow user roles.
- Sensitive credentials must not be exposed.
- Database security policies should be used appropriately.

### Usability

- The interface should be clear and easy to understand.
- Incident reporting should be straightforward.
- Important status information should be visible.

### Reliability

- Failed operations should return understandable errors.
- Database operations should be handled safely.
- The application should preserve incident records correctly.

### Maintainability

- Frontend and backend responsibilities should remain separated.
- Code should use a clear project structure.
- Features should be developed incrementally.
- Documentation should remain synchronized with implementation.

### Performance

- Common pages and API requests should respond within reasonable time under expected MVP usage.

## 4. Scope Boundaries

The system manages information about security incidents.

It does not directly perform physical security operations such as patrols, CCTV operations, or emergency response.
