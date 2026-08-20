import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import IncidentCard from "../components/IncidentCard";
import { getIncidents } from "../services/api";

function SecurityDashboard({ setPage, setSelectedIncident }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await getIncidents();

        setIncidents(data.incidents);
      } catch (err) {
        console.error(err);
        setError("Unable to load incident reports.");
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident.id);
    setPage("manage");
  };

  const pendingCount = incidents.filter(
    (incident) =>
      incident.status === "Submitted" ||
      incident.status === "Under Review"
  ).length;

  const investigationCount = incidents.filter(
    (incident) => incident.status === "Under Investigation"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  return (
    <div className="security-page">
      <section className="security-header">
        <div>
          <p className="eyebrow">SECURITY PERSONNEL</p>

          <h1>Security Portal</h1>

          <p>
            Review reported incidents and manage their status.
          </p>
        </div>

        <div className="security-badge">
          <ShieldCheck size={20} />
          Security Access
        </div>
      </section>

      <section className="security-stats">
        <div className="security-stat">
          <span>Pending Reports</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="security-stat">
          <span>Under Investigation</span>
          <strong>{investigationCount}</strong>
        </div>

        <div className="security-stat">
          <span>Resolved</span>
          <strong>{resolvedCount}</strong>
        </div>
      </section>

      <section className="incidents-section">
        <div className="section-heading">
          <div>
            <h2>Incident Reports</h2>

            <p>
              Select an incident to review and manage it.
            </p>
          </div>
        </div>

        <div className="incident-list">
          {loading && (
            <p>Loading incident reports...</p>
          )}

          {error && (
            <p className="form-error">{error}</p>
          )}

          {!loading &&
            !error &&
            incidents.length === 0 && (
              <p>No incident reports available.</p>
            )}

          {!loading &&
            !error &&
            incidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={{
                  ...incident,
                  date: incident.incident_date,
                }}
                onClick={() =>
                  handleIncidentClick(incident)
                }
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default SecurityDashboard;