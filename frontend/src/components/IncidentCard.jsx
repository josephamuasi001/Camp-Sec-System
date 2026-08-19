function IncidentCard({ incident, onClick }) {
  return (
    <button className="incident-card" onClick={onClick}>
      <div className="incident-main">
        <div>
          <h3>{incident.incident_type}</h3>
          <p>{incident.location}</p>
        </div>

        <span className={`status status-${incident.status.toLowerCase().replaceAll(" ", "-")}`}>
          {incident.status}
        </span>
      </div>

      <div className="incident-meta">
        <span>{incident.id}</span>
        <span>{incident.date}</span>
      </div>
    </button>
  );
}

export default IncidentCard;