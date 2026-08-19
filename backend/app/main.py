from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.database import supabase


app = FastAPI(
    title="Camp-Sec System API",
    description="Campus Security Incident Reporting and Management System",
    version="1.0.0",
)


class IncidentCreate(BaseModel):
    incident_type: str
    description: str
    location: str
    incident_date: str
    incident_time: str


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
    
@app.post("/incidents")
def create_incident(incident: IncidentCreate):
    try:
        response = (
            supabase
            .table("incidents")
            .insert({
                "incident_type": incident.incident_type,
                "description": incident.description,
                "location": incident.location,
                "incident_date": incident.incident_date,
                "incident_time": incident.incident_time,
            })
            .execute()
        )

        return {
            "message": "Incident created successfully",
            "incident": response.data[0],
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )