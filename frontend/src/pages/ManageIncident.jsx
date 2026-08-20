import { useEffect, useState } from "react";

import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";

import {
  getIncident,
  updateIncidentStatus,
} from "../services/api";

function ManageIncident({ setPage, incidentId }) {
  const [incident, setIncident] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIncident = async () => {
      if (!incidentId) {
        setError("No incident selected.");
        setLoading(false);
        return;
      }

      try {
        const data = await getIncident(incidentId);

        setIncident(data.incident);
        setStatus(data.incident.status);
      } catch (err) {
        console.error(err);
        setError("Unable to load incident.");
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [incidentId]);

  const handleUpdate = async () => {
    setUpdating(true);
    setError("");

    try {
      const data = await updateIncidentStatus(
        incident.id,
        status
      );

      setIncident(data.incident);
      setStatus(data.incident.status);

      alert("Incident status updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to update incident status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <p>Loading incident...</p>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="details-page">
        <button
          className="back-button"
          onClick={() => setPage("security")}
        >
          <ArrowLeft size={18} />
          Back to Security Portal
        </button>

        <p className="form-error">
          {error || "Incident not found."}
        </p>
      </div>
    );
  }

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
            SECURITY MANAGEMENT · INC-{String(incident.id).padStart(3, "0")}
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

              <strong>
                INC-{String(incident.id).padStart(3, "0")}
              </strong>
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
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Under Investigation</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            className="primary-button"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </section>
      </div>
    </div>
  );
}

export default ManageIncident;