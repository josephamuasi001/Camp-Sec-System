const API_URL = "https://camp-sec-backend-new.onrender.com";


export async function getIncidents() {
  const response = await fetch(`${API_URL}/incidents`);

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return response.json();
}

export async function createIncident(incident) {
  const response = await fetch(`${API_URL}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(incident),
  });

  if (!response.ok) {
    throw new Error("Failed to create incident");
  }

  return response.json();
}


export async function updateIncidentStatus(incidentId, status) {
  const response = await fetch(
    `${API_URL}/incidents/${incidentId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update incident status");
  }

  return response.json();
}


export async function getIncident(incidentId) {
  const response = await fetch(
    `${API_URL}/incidents/${incidentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch incident");
  }

  return response.json();
}


export async function registerStudent(student) {
  const response = await fetch(`${API_URL}/students/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}

export async function loginStudent(studentId, password) {
  const response = await fetch(`${API_URL}/students/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      student_id: studentId,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

export async function getStudentIncidents(studentId) {
  const response = await fetch(
    `${API_URL}/incidents/student/${studentId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch student incidents"
    );
  }

  return data;
}


export async function updateIncident(incidentId, incident) {
  const response = await fetch(
    `${API_URL}/incidents/${incidentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incident_type: incident.incident_type,
        description: incident.description,
        location: incident.location,
        incident_date: incident.incident_date,
        incident_time: incident.incident_time,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update incident");
  }

  return data;
}


export async function registerAdmin(admin) {
  const response = await fetch(`${API_URL}/security/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Admin registration failed");
  }

  return data;
}

export async function loginAdmin(securityId, password) {
  const response = await fetch(`${API_URL}/security/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      security_id: securityId,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Admin login failed");
  }

  return data;
}