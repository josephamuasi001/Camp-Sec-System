import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import IncidentCard from "../components/IncidentCard";
import { getIncidents } from "../services/api";
import "../styles/security.css";

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

    <section className="security-hero">
      <div className="security-hero-content">
        <div className="security-title-group">
          <div className="security-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <p className="eyebrow">SECURITY PERSONNEL</p>
            <h1>Security Operations</h1>
            <p>
              Review, verify and manage reported campus security incidents.
            </p>
          </div>
        </div>

        <div className="security-access">
          <span className="access-dot"></span>
          <span>Security Access</span>
        </div>
      </div>
    </section>

    <section className="security-stats">

      <div className="security-stat pending">
        <div className="stat-content">
          <span>Pending Reports</span>
          <strong>{pendingCount}</strong>
          <small>Awaiting security review</small>
        </div>
      </div>

      <div className="security-stat investigation">
        <div className="stat-content">
          <span>Under Investigation</span>
          <strong>{investigationCount}</strong>
          <small>Currently being handled</small>
        </div>
      </div>

      <div className="security-stat resolved">
        <div className="stat-content">
          <span>Resolved Cases</span>
          <strong>{resolvedCount}</strong>
          <small>Successfully completed</small>
        </div>
      </div>

    </section>

    <section className="security-incidents">

      <div className="security-section-header">
        <div>
          <p className="section-eyebrow">CASE MANAGEMENT</p>
          <h2>Incident Reports</h2>
          <p>
            Review submitted reports and take appropriate action.
          </p>
        </div>

        <div className="incident-count">
          {incidents.length}{" "}
          {incidents.length === 1 ? "Report" : "Reports"}
        </div>
      </div>

      <div className="security-incident-list">

        {loading && (
          <div className="security-state">
            <div className="loading-spinner"></div>
            <p>Loading incident reports...</p>
          </div>
        )}

        {error && (
          <div className="security-state security-error">
            <ShieldCheck size={20} />
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          incidents.length === 0 && (
            <div className="security-state">
              <ShieldCheck size={28} />
              <h3>No Incident Reports</h3>
              <p>
                There are currently no incident reports available.
              </p>
            </div>
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