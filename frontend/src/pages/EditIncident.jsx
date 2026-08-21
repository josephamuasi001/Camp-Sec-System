import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { getIncident, updateIncident } from "../services/api";

function EditIncident({ setPage, incidentId }) {
  const [formData, setFormData] = useState({
    incident_type: "",
    location: "",
    incident_date: "",
    incident_time: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        const incident = data.incident;

        setFormData({
          incident_type: incident.incident_type,
          location: incident.location,
          incident_date: incident.incident_date,
          incident_time: incident.incident_time,
          description: incident.description,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await updateIncident(incidentId, formData);

      alert("Incident updated successfully.");

      setPage("details");
    } catch (err) {
      console.error(err);
      setError("Unable to update incident. Please try again.");
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

  if (error) {
    return (
      <div className="details-page">
        <button
          className="back-button"
          onClick={() => setPage("details")}
        >
          <ArrowLeft size={18} />
          Back to Incident
        </button>

        <p className="form-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="report-page">
      <button
        className="back-button"
        onClick={() => setPage("details")}
      >
        <ArrowLeft size={18} />
        Back to Incident
      </button>

      <div className="report-header">
        <p className="eyebrow">INCIDENT MANAGEMENT</p>

        <h1>Edit Incident</h1>

        <p>
          Update the information you provided for this incident.
        </p>
      </div>

      <form
        className="incident-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="incident_type">
            Incident Type
          </label>

          <select
            id="incident_type"
            name="incident_type"
            value={formData.incident_type}
            onChange={handleChange}
            required
          >
            <option value="">Select incident type</option>
            <option value="Theft">Theft</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Assault">Assault</option>
            <option value="Lost Property">Lost Property</option>
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
            required
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
              required
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
              required
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
            required
          />
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-button submit-button"
          disabled={saving}
        >
          <Save size={18} />

          {saving
            ? "Saving Changes..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditIncident;