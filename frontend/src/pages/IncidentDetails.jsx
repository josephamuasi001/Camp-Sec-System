import { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Shield,
} from "lucide-react";

import { getIncident } from "../services/api";

function IncidentDetails({ setPage, incidentId }) {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (err) {
        console.error(err);
        setError("Unable to load incident.");
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [incidentId]);

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
          onClick={() => setPage("dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
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
        onClick={() => setPage("dashboard")}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="details-header">
        <div>
          <p className="eyebrow">
            INCIDENT INC-{String(incident.id).padStart(3, "0")}
          </p>

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

                <strong>
                  INC-{String(incident.id).padStart(3, "0")}
                </strong>
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