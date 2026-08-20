import { useState } from "react";
import { createIncident } from "../services/api";
import { ArrowLeft, Send } from "lucide-react";

function ReportIncident({ setPage }) {
  const [formData, setFormData] = useState({
    incident_type: "",
    location: "",
    incident_date: "",
    incident_time: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await createIncident(formData);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Unable to submit incident. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Incident Reported</h1>

          <p>
            Your security incident has been successfully submitted.
          </p>

          <button
            className="primary-button"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <button
        className="back-button"
        onClick={() => setPage("dashboard")}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="report-header">
        <p className="eyebrow">INCIDENT REPORTING</p>

        <h1>Report a Security Incident</h1>

        <p>
          Provide accurate information about the incident so it can
          be reviewed by campus security.
        </p>
      </div>

      <form className="incident-form" onSubmit={handleSubmit}>
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
            placeholder="e.g. Balme Library"
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
            placeholder="Describe what happened..."
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
          disabled={submitting}
        >
          <Send size={18} />

          {submitting ? "Submitting..." : "Submit Incident"}
        </button>
      </form>
    </div>
  );
}

export default ReportIncident;