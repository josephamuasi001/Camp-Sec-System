import { useEffect, useState } from "react";

import "../styles/incident-details.css";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Pencil,
  Save,
} from "lucide-react";

import {
  getIncident,
  updateIncident,
} from "../services/api";

function IncidentDetails({ setPage, incidentId }) {
  const [incident, setIncident] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    incident_type: "",
    location: "",
    incident_date: "",
    incident_time: "",
    description: "",
  });

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

        setFormData({
          incident_type: data.incident.incident_type,
          location: data.incident.location,
          incident_date: data.incident.incident_date,
          incident_time: data.incident.incident_time,
          description: data.incident.description,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load incident.");
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [incidentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const data = await updateIncident(
        incidentId,
        formData
      );

      setIncident(data.incident);

      setFormData({
        incident_type: data.incident.incident_type,
        location: data.incident.location,
        incident_date: data.incident.incident_date,
        incident_time: data.incident.incident_time,
        description: data.incident.description,
      });

      setEditing(false);

      alert("Incident updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to update incident.");
    } finally {
      setSaving(false);
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

    {/* TOP NAVIGATION */}
    <div className="details-topbar">
      <button
        className="details-back"
        onClick={() => setPage("dashboard")}
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      <div className="case-reference">
        <span>CASE REFERENCE</span>
        <strong>
          INC-{String(incident.id).padStart(3, "0")}
        </strong>
      </div>
    </div>

    {/* CASE HEADER */}
    <section className="case-header">

      <div className="case-header-main">
        <div className="case-eyebrow">
          <Shield size={15} />
          CAMPUS SECURITY CASE
        </div>

        <h1>{incident.incident_type}</h1>

        <p>
          Security incident reported on the University of Ghana campus.
        </p>
      </div>

      <div className="case-header-actions">

        <span
          className={`case-status status-${incident.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {incident.status}
        </span>

        {incident.status === "Submitted" && (
          <button
            className="case-edit-button"
            onClick={() => setEditing(true)}
          >
            <Pencil size={17} />
            Edit Incident
          </button>
        )}

      </div>

    </section>

    {!editing ? (

      /* =========================
         VIEW MODE
         ========================= */

      <div className="case-layout">

        {/* MAIN CASE CONTENT */}
        <main className="case-main">

          <section className="case-section">
            <div className="case-section-heading">
              <span className="section-number">01</span>

              <div>
                <h2>Incident Description</h2>
                <p>
                  Details provided by the reporting student.
                </p>
              </div>
            </div>

            <div className="description-box">
              <p>{incident.description}</p>
            </div>
          </section>

          <section className="case-section">
            <div className="case-section-heading">
              <span className="section-number">02</span>

              <div>
                <h2>Incident Information</h2>
                <p>
                  Key information associated with this report.
                </p>
              </div>
            </div>

            <div className="incident-information-grid">

              <div className="information-item">
                <div className="information-icon">
                  <MapPin size={18} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>{incident.location}</strong>
                </div>
              </div>

              <div className="information-item">
                <div className="information-icon">
                  <Calendar size={18} />
                </div>

                <div>
                  <span>Date</span>
                  <strong>{incident.incident_date}</strong>
                </div>
              </div>

              <div className="information-item">
                <div className="information-icon">
                  <Clock size={18} />
                </div>

                <div>
                  <span>Time</span>
                  <strong>{incident.incident_time}</strong>
                </div>
              </div>

              <div className="information-item">
                <div className="information-icon">
                  <Shield size={18} />
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

        </main>

        {/* CASE SIDEBAR */}
        <aside className="case-sidebar">

          <div className="case-sidebar-header">
            <span>CASE STATUS</span>

            <div className="sidebar-status">
              <span className="status-dot"></span>
              {incident.status}
            </div>
          </div>

          <div className="case-sidebar-divider"></div>

          <div className="case-sidebar-item">
            <span>Incident Type</span>
            <strong>{incident.incident_type}</strong>
          </div>

          <div className="case-sidebar-item">
            <span>Reported Location</span>
            <strong>{incident.location}</strong>
          </div>

          <div className="case-sidebar-item">
            <span>Report Date</span>
            <strong>{incident.incident_date}</strong>
          </div>

          <div className="case-sidebar-item">
            <span>Report Time</span>
            <strong>{incident.incident_time}</strong>
          </div>

          <div className="case-security-note">
            <Shield size={18} />

            <div>
              <strong>Security Notice</strong>

              <p>
                This report is visible only to authorised
                campus security personnel and the reporting student.
              </p>
            </div>
          </div>

        </aside>

      </div>

    ) : (

      /* =========================
         EDIT MODE
         ========================= */

      <section className="edit-case">

        <div className="edit-case-header">
          <div>
            <div className="case-eyebrow">
              <Pencil size={15} />
              EDIT SECURITY CASE
            </div>

            <h2>Update Incident</h2>

            <p>
              Make changes to the information submitted in this report.
            </p>
          </div>
        </div>

        <div className="edit-form">

          <div className="form-group">
            <label htmlFor="incident_type">
              Incident Type
            </label>

            <select
              id="incident_type"
              name="incident_type"
              value={formData.incident_type}
              onChange={handleChange}
            >
              <option value="Theft">Theft</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Assault">Assault</option>
              <option value="Lost Property">
                Lost Property
              </option>
              <option value="Suspicious Activity">
                Suspicious Activity
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="incident_date">
                Date
              </label>

              <input
                id="incident_date"
                name="incident_date"
                type="date"
                value={formData.incident_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="incident_time">
                Time
              </label>

              <input
                id="incident_time"
                name="incident_time"
                type="time"
                value={formData.incident_time}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="7"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="edit-actions">

            <button
              className="cancel-edit-button"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              className="save-case-button"
              onClick={handleSave}
              disabled={saving}
            >
              <Save size={17} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </div>

      </section>

    )}

  </div>
);
}

export default IncidentDetails;