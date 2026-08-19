import { ArrowLeft, MapPin, Calendar, Clock, Shield } from "lucide-react";

function IncidentDetails({ setPage }) {
  const incident = {
    id: "INC-001",
    incident_type: "Theft",
    location: "Balme Library",
    incident_date: "19 August 2026",
    incident_time: "10:30 AM",
    description:
      "A laptop was reported missing from the library. The incident was reported to campus security for further investigation.",
    status: "Under Review",
  };

  return (
    <div className="details-page">
      <button
        className="back-button"
        onClick={() => setPage("dashboard")}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="details-header">
        <div>
          <p className="eyebrow">INCIDENT {incident.id}</p>
          <h1>{incident.incident_type}</h1>
          <p>
            Security incident reported on campus.
          </p>
        </div>

        <span
          className={`status status-${incident.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {incident.status}
        </span>
      </div>

      <div className="details-grid">
        <section className="details-card">
          <h2>Incident Information</h2>

          <div className="info-list">
            <div className="info-item">
              <MapPin size={20} />

              <div>
                <span>Location</span>
                <strong>{incident.location}</strong>
              </div>
            </div>

            <div className="info-item">
              <Calendar size={20} />

              <div>
                <span>Date</span>
                <strong>{incident.incident_date}</strong>
              </div>
            </div>

            <div className="info-item">
              <Clock size={20} />

              <div>
                <span>Time</span>
                <strong>{incident.incident_time}</strong>
              </div>
            </div>

            <div className="info-item">
              <Shield size={20} />

              <div>
                <span>Incident ID</span>
                <strong>{incident.id}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="details-card">
          <h2>Description</h2>

          <p className="incident-description">
            {incident.description}
          </p>
        </section>
      </div>
    </div>
  );
}

export default IncidentDetails;