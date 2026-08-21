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
    student_id: str
    incident_type: str
    description: str
    location: str
    incident_date: str
    incident_time: str
    
    
class IncidentStatusUpdate(BaseModel):
    status: str

class StudentRegister(BaseModel):
    student_id: str
    name: str
    phone: str
    password: str


class StudentLogin(BaseModel):
    student_id: str
    password: str


class IncidentUpdate(BaseModel):
    incident_type: str
    description: str
    location: str
    incident_date: str
    incident_time: str
    
class SecurityRegister(BaseModel):
    security_id: str
    name: str
    phone: str
    password: str


class SecurityLogin(BaseModel):
    security_id: str
    password: str
    
    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://campus-3hnr.onrender.com", 
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
                  "student_id": incident.student_id,
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


@app.post("/students/register")
def register_student(student: StudentRegister):
    try:
        # Check if student ID already exists
        existing_student = (
            supabase
            .table("students")
            .select("*")
            .eq("student_id", student.student_id)
            .execute()
        )

        if existing_student.data:
            raise HTTPException(
                status_code=400,
                detail="Student ID is already registered",
            )

        # Create new student
        response = (
            supabase
            .table("students")
            .insert({
                "student_id": student.student_id,
                "name": student.name,
                "phone": student.phone,
                "password": student.password,
            })
            .execute()
        )

        return {
            "message": "Student registered successfully",
            "student": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.post("/students/login")
def login_student(student: StudentLogin):
    try:
        response = (
            supabase
            .table("students")
            .select("*")
            .eq("student_id", student.student_id)
            .execute()
        )

        # Student ID does not exist
        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Student ID not found. Please register first.",
            )

        existing_student = response.data[0]

        # Password is incorrect
        if existing_student["password"] != student.password:
            raise HTTPException(
                status_code=401,
                detail="Incorrect password.",
            )

        return {
            "message": "Login successful",
            "student": {
                "id": existing_student["id"],
                "student_id": existing_student["student_id"],
                "name": existing_student["name"],
                "phone": existing_student["phone"],
            },
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

@app.get("/incidents/student/{student_id}")
def get_student_incidents(student_id: str):
    try:
        response = (
            supabase
            .table("incidents")
            .select("*")
            .eq("student_id", student_id)
            .execute()
        )

        return {
            "message": "Student incidents retrieved successfully",
            "incidents": response.data,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        

        

@app.put("/incidents/{incident_id}")
def update_incident(
    incident_id: int,
    incident: IncidentUpdate,
):
    try:
        response = (
            supabase
            .table("incidents")
            .update({
                "incident_type": incident.incident_type,
                "description": incident.description,
                "location": incident.location,
                "incident_date": incident.incident_date,
                "incident_time": incident.incident_time,
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
            "message": "Incident updated successfully",
            "incident": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        

@app.post("/security/register")
def register_security(security: SecurityRegister):
    try:
        # Check if security ID already exists
        existing_security = (
            supabase
            .table("security_users")
            .select("*")
            .eq("security_id", security.security_id)
            .execute()
        )

        if existing_security.data:
            raise HTTPException(
                status_code=400,
                detail="Security ID is already registered",
            )

        # Create security account
        response = (
            supabase
            .table("security_users")
            .insert({
                "security_id": security.security_id,
                "name": security.name,
                "phone": security.phone,
                "password": security.password,
            })
            .execute()
        )

        return {
            "message": "Security account registered successfully",
            "security": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
        


@app.post("/security/login")
def login_security(security: SecurityLogin):
    try:
        response = (
            supabase
            .table("security_users")
            .select("*")
            .eq("security_id", security.security_id)
            .execute()
        )

        # Security ID does not exist
        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Security ID not found.",
            )

        existing_security = response.data[0]

        # Password is incorrect
        if existing_security["password"] != security.password:
            raise HTTPException(
                status_code=401,
                detail="Incorrect password.",
            )

        return {
            "message": "Security login successful",
            "security": {
                "id": existing_security["id"],
                "security_id": existing_security["security_id"],
                "name": existing_security["name"],
                "phone": existing_security["phone"],
            },
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )