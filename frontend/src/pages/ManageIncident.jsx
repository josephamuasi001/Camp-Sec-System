import { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";


import {
  getIncident,
  updateIncidentStatus,
} from "../services/api";

import "../styles/manageIncident.css";

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
  <div className="manage-page">

    <button
      className="manage-back-button"
      onClick={() => setPage("security")}
    >
      <ArrowLeft size={17} />
      Back to Security Portal
    </button>

    {/* ================================
        CASE HEADER
       ================================ */}

    <section className="manage-header">

      <div className="manage-header-main">

        <div className="manage-case-label">
          <span>SECURITY CASE</span>
          <strong>
            INC-{String(incident.id).padStart(3, "0")}
          </strong>
        </div>

        <h1>{incident.incident_type}</h1>

        <p>
          Review the details of this incident and update
          its status as the investigation progresses.
        </p>

      </div>

      <div
        className={`manage-status status-${status
          .toLowerCase()
          .replaceAll(" ", "-")}`}
      >
        <span className="manage-status-dot"></span>
        {status}
      </div>

    </section>


    {/* ================================
        CASE CONTENT
       ================================ */}

    <div className="manage-layout">

      <main className="manage-main">

        {/* INCIDENT INFORMATION */}

        <section className="manage-card">

          <div className="manage-card-header">
            <div>
              <span className="manage-card-eyebrow">
                CASE DETAILS
              </span>

              <h2>Incident Information</h2>
            </div>
          </div>

          <div className="manage-info-grid">

            <div className="manage-info-item">
              <div className="manage-info-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>Location</span>
                <strong>{incident.location}</strong>
              </div>
            </div>


            <div className="manage-info-item">
              <div className="manage-info-icon">
                <Calendar size={18} />
              </div>

              <div>
                <span>Date Reported</span>
                <strong>{incident.incident_date}</strong>
              </div>
            </div>


            <div className="manage-info-item">
              <div className="manage-info-icon">
                <Clock size={18} />
              </div>

              <div>
                <span>Time Reported</span>
                <strong>{incident.incident_time}</strong>
              </div>
            </div>


            <div className="manage-info-item">
              <div className="manage-info-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <span>Incident ID</span>
                <strong>
                  INC-{String(incident.id).padStart(3, "0")}
                </strong>
              </div>
            </div>

          </div>

        </section>


        {/* DESCRIPTION */}

        <section className="manage-card">

          <div className="manage-card-header">
            <div>
              <span className="manage-card-eyebrow">
                REPORT
              </span>

              <h2>Incident Description</h2>
            </div>
          </div>

          <div className="manage-description">
            {incident.description}
          </div>

        </section>

      </main>


      {/* ================================
          ACTION PANEL
         ================================ */}

      <aside className="manage-sidebar">

        <section className="manage-action-card">

          <div className="manage-action-icon">
            <ShieldCheck size={23} />
          </div>

          <span className="manage-card-eyebrow">
            CASE MANAGEMENT
          </span>

          <h2>Update Case Status</h2>

          <p>
            Change the status of this incident to reflect
            its current stage in the investigation.
          </p>


          <label htmlFor="incident-status">
            Current Status
          </label>

          <select
            id="incident-status"
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
            <p className="manage-error">
              {error}
            </p>
          )}


          <button
            className="manage-update-button"
            onClick={handleUpdate}
            disabled={updating}
          >
            <ShieldCheck size={18} />

            {updating
              ? "Updating Case..."
              : "Update Case Status"}
          </button>

        </section>

      </aside>

    </div>

  </div>
);
}

export default ManageIncident;