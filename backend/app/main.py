from fastapi import FastAPI

from app.database import supabase


app = FastAPI(
    title="Camp-Sec System API",
    description="Campus Security Incident Reporting and Management System",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Camp-Sec System API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/test-db")
def test_database():
    response = (
        supabase
        .table("incidents")
        .select("*")
        .limit(1)
        .execute()
    )

    return {
        "message": "Supabase connection successful",
        "data": response.data,
    }