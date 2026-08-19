import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import StatCard from "../components/StatCard";
import IncidentCard from "../components/IncidentCard";
import { getIncidents } from "../services/api";

function Dashboard({ setPage }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          value="12"
          description="All reported incidents"
        />

        <StatCard
          title="Submitted"
          value="4"
          description="Awaiting review"
        />

        <StatCard
          title="Under Investigation"
          value="5"
          description="Currently being handled"
        />

        <StatCard
          title="Resolved"
          value="3"
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

          <button className="text-button">
            View All
          </button>
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
                onClick={() => setPage("details")}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;