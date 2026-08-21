import { useEffect, useState } from "react";

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
            INCIDENT INC-
            {String(incident.id).padStart(3, "0")}
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

        {incident.status === "Submitted" && (
          <button
            className="primary-button"
            onClick={() => setEditing(true)}
          >
            <Pencil size={18} />
            Edit Incident
          </button>
        )}

      </div>

      {!editing ? (
        <>
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
                      INC-
                      {String(incident.id).padStart(3, "0")}
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

          <div className="details-actions">

          </div>
        </>
      ) : (

        <section className="details-card">

          <h2>Edit Incident</h2>

          <div className="incident-form">

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
                rows="6"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <div className="details-actions">

              <button
                className="back-button"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={18} />

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