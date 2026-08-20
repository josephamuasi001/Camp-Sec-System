const API_URL = "http://127.0.0.1:8000";

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