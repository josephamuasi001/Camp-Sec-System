import { ShieldCheck } from "lucide-react";
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

function SecurityDashboard({ setPage }) {
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
          <strong>4</strong>
        </div>

        <div className="security-stat">
          <span>Under Investigation</span>
          <strong>5</strong>
        </div>

        <div className="security-stat">
          <span>Resolved</span>
          <strong>3</strong>
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
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={() => setPage("manage")}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SecurityDashboard;