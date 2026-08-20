import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { updateIncidentStatus } from "../services/api";

function ManageIncident({ setPage }) {
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

  const [status, setStatus] = useState(incident.status);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = () => {
    alert(`Incident ${incident.id} updated to "${status}"`);
  };

  return (
    <div className="details-page">
      <button
        className="back-button"
        onClick={() => setPage("security")}
      >
        <ArrowLeft size={18} />
        Back to Security Portal
      </button>

      <div className="details-header">
        <div>
          <p className="eyebrow">
            SECURITY MANAGEMENT · {incident.id}
          </p>

          <h1>{incident.incident_type}</h1>

          <p>
            Review and manage this security incident.
          </p>
        </div>

        <span
          className={`status status-${status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {status}
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
              <span>Incident ID</span>
              <strong>{incident.id}</strong>
            </div>
          </div>
        </section>

        <section className="details-card">
          <h2>Description</h2>

          <p className="incident-description">
            {incident.description}
          </p>
        </section>

        <section className="details-card status-card">
          <h2>Update Incident Status</h2>

          <p>
            As security personnel, update the incident as
            investigation progresses.
          </p>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Under Investigation</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <button
            className="primary-button"
            onClick={handleUpdate}
          >
            Update Status
          </button>
        </section>
      </div>
    </div>
  );
}

export default ManageIncident;