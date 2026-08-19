# Camp-Sec Development Workflow

## 1. Development Principle

Camp-Sec will be developed as a sequence of small, verifiable milestones.

We do not build several major features at the same time.

## 2. Feature Workflow

For every feature:

```text
PLAN
  ↓
BUILD
  ↓
TEST
  ↓
VERIFY
  ↓
COMMIT
  ↓
PUSH
  ↓
NEXT FEATURE
```

## 3. Before Coding

Before starting a feature:

- Check the current project state.
- Confirm the required files exist.
- Confirm the database structure if applicable.
- Identify the exact acceptance criteria.
- Avoid changing unrelated features.

## 4. During Coding

- Keep frontend and backend responsibilities separated.
- Use clear names.
- Keep functions focused.
- Validate user input.
- Handle errors.
- Avoid hard-coded secrets.
- Update documentation when architecture changes.

## 5. Testing

Each feature should be tested at the appropriate level.

### Frontend

Test:

- Form behavior
- Navigation
- Loading states
- Error states
- Successful flows

### Backend

Test:

- Endpoint responses
- Validation
- Database operations
- Error handling

### Database

Verify:

- Records are created correctly.
- Relationships work.
- Security policies behave as intended.

## 6. Git Workflow

After each meaningful completed feature:

```bash
git status
git add .
git commit -m "feat: short description"
git push
```

Examples:

```text
feat: initialize project structure
feat: connect backend to supabase
feat: implement authentication
feat: add incident reporting
feat: add incident tracking
feat: add security officer dashboard
```

## 7. Commit Rule

A commit should represent one meaningful change.

Avoid giant commits containing unrelated features.

## 8. Debugging Rule

When something fails:

1. Stop.
2. Read the exact error.
3. Identify which layer failed.
4. Inspect the relevant file.
5. Make the smallest necessary fix.
6. Retest.
7. Commit once the feature is stable.

Layers:

```text
React
  ↓
FastAPI
  ↓
Supabase
```

## 9. Documentation Rule

If implementation changes the agreed architecture, database, API, or MVP scope:

- Update the relevant Markdown file.
- Keep documentation synchronized with the actual implementation.

## 10. MVP Completion

The MVP is complete when the following workflow works:

```text
User registers
    ↓
User logs in
    ↓
User reports incident
    ↓
Incident stored
    ↓
Security personnel views incident
    ↓
Incident reviewed/investigated
    ↓
Status updated
    ↓
Action recorded
    ↓
Reporter sees updated status
```

After MVP completion, the project can move into security hardening, testing improvements, deployment, and additional features.
