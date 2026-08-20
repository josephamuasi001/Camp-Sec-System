from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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
    
class IncidentStatusUpdate(BaseModel):
    status: str
    
    
    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://camp-sec-system-pvfg.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        

@app.get("/incidents")
def get_incidents():
    try:
        response = (
            supabase
            .table("incidents")
            .select("*")
            .execute()
        )

        return {
            "message": "Incidents retrieved successfully",
            "incidents": response.data,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        

@app.patch("/incidents/{incident_id}/status")
def update_incident_status(
    incident_id: int,
    status_update: IncidentStatusUpdate,
):
    allowed_statuses = [
        "Submitted",
        "Under Review",
        "Under Investigation",
        "Resolved",
        "Closed",
    ]

    if status_update.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid incident status",
        )

    try:
        response = (
            supabase
            .table("incidents")
            .update({
                "status": status_update.status,
            })
            .eq("id", incident_id)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Incident not found",
            )

        return {
            "message": "Incident status updated successfully",
            "incident": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

@app.get("/incidents/{incident_id}")
def get_incident(incident_id: int):
    try:
        response = (
            supabase
            .table("incidents")
            .select("*")
            .eq("id", incident_id)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Incident not found",
            )

        return {
            "message": "Incident retrieved successfully",
            "incident": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        