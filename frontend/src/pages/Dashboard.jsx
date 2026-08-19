import { Plus } from "lucide-react";
import StatCard from "../components/StatCard";
import IncidentCard from "../components/IncidentCard";

const incidents = [
  {
    id: "INC-001",
    incident_type: "Theft",
    location: "Balme Library",
    status: "Under Review",
    date: "19 Aug 2026",
  },
  {
    id: "INC-002",
    incident_type: "Vandalism",
    location: "Commonwealth Hall",
    status: "Resolved",
    date: "18 Aug 2026",
  },
  {
    id: "INC-003",
    incident_type: "Lost Property",
    location: "UG Main Gate",
    status: "Submitted",
    date: "18 Aug 2026",
  },
];

function Dashboard({ setPage }) {
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
            <p>Latest security reports submitted on campus.</p>
          </div>

          <button className="text-button">
            View All
          </button>
        </div>

        <div className="incident-list">
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={() => setPage("details")}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;