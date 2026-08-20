const API_URL = "https://camp-sec-system.onrender.com";

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