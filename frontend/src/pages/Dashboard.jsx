import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import StatCard from "../components/StatCard";
import IncidentCard from "../components/IncidentCard";

import { getIncidents } from "../services/api";

function Dashboard({ setPage, setSelectedIncident }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await getIncidents();

        setIncidents(data.incidents);
      } catch (err) {
        setError("Unable to load incidents.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const submittedCount = incidents.filter(
    (incident) => incident.status === "Submitted"
  ).length;

  const investigationCount = incidents.filter(
    (incident) => incident.status === "Under Investigation"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const filteredIncidents =
  filter === "All"
    ? incidents
    : incidents.filter(
        (incident) => incident.status === filter
      );

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident.id);
    setPage("details");
  };

  return (
    <div className="dashboard">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">CAMPUS SECURITY</p>

          <h1>Security Overview</h1>

          <p>
            Monitor and manage reported security incidents across campus.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("report")}
        >
          <Plus size={18} />
          Report Incident
        </button>
      </section>

      <section className="stats-grid">
        <StatCard
          title="Total Incidents"
          value={incidents.length}
          description="All reported incidents"
        />

        <StatCard
          title="Submitted"
          value={submittedCount}
          description="Awaiting review"
        />

        <StatCard
          title="Under Investigation"
          value={investigationCount}
          description="Currently being handled"
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
          description="Successfully resolved"
        />
      </section>

      <section className="incidents-section">
        <div className="section-heading">
          <div>
            <h2>Recent Incidents</h2>

            <p>
              Latest security reports submitted on campus.
            </p>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === "All" ? "active-filter" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>

            <button
              className={filter === "Submitted" ? "active-filter" : ""}
              onClick={() => setFilter("Submitted")}
            >
              Submitted
            </button>

            <button
              className={filter === "Under Investigation" ? "active-filter" : ""}
              onClick={() => setFilter("Under Investigation")}
            >
              Under Investigation
            </button>

            <button
              className={filter === "Resolved" ? "active-filter" : ""}
              onClick={() => setFilter("Resolved")}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="incident-list">
          {loading && (
            <p>Loading incidents...</p>
          )}

          {error && (
            <p>{error}</p>
          )}

          {!loading &&
            !error &&
            incidents.length === 0 && (
              <p>
                No incidents have been reported yet.
              </p>
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

export default Dashboard;