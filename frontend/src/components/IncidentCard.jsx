import {
  MapPin,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import "../styles/security.css";

function IncidentCard({ incident, onClick }) {
  const statusClass = incident.status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <button
      className="security-incident-card"
      onClick={onClick}
    >
      <div className="security-incident-number">
        INC-{String(incident.id).padStart(3, "0")}
      </div>

      <div className="security-incident-main">
        <div className="security-incident-title">
          <h3>{incident.incident_type}</h3>

          <div className="security-incident-location">
            <MapPin size={14} />
            <span>{incident.location}</span>
          </div>
        </div>

        <div className="security-incident-date">
          <CalendarDays size={14} />
          <span>{incident.date}</span>
        </div>

        <span
          className={`security-status security-status-${statusClass}`}
        >
          <span className="status-dot"></span>
          {incident.status}
        </span>

        <div className="security-incident-action">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </button>
  );
}

export default IncidentCard;