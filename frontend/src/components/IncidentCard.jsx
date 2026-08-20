function IncidentCard({ incident, onClick }) {
  return (
    <button
      className="incident-card"
      onClick={onClick}
    >
      <div className="incident-main">
        <div>
          <h3>{incident.incident_type}</h3>

          <p>{incident.location}</p>
        </div>

        <span
          className={`status status-${incident.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {incident.status}
        </span>
      </div>

      <div className="incident-meta">
        <span>
          INC-{String(incident.id).padStart(3, "0")}
        </span>

        <span>{incident.date}</span>
      </div>
    </button>
  );
}

export default IncidentCard;