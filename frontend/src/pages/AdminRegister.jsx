import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { registerAdmin } from "../services/api";

function AdminRegister({ setPage }) {
  const [formData, setFormData] = useState({
    security_id: "",
    name: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerAdmin(formData);

      setRegistered(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>Admin Account Created</h1>

          <p>
            Your admin account has been successfully registered.
          </p>

          <button
            className="primary-button"
            onClick={() => setPage("admin-login")}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-header">
        <div className="login-icon">
          <ShieldCheck size={32} />
        </div>

        <p className="eyebrow">
          CAMPUS SECURITY
        </p>

        <h1>Admin Registration</h1>

        <p>
          Create an administrator account for the campus
          security system.
        </p>
      </div>

      <form
        className="incident-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="security_id">
            Admin ID
          </label>

          <input
            id="security_id"
            name="security_id"
            type="text"
            placeholder="e.g. SEC001"
            value={formData.security_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 0240000000"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="admin_password">
            Password / PIN
          </label>

          <input
            id="admin_password"
            name="password"
            type="password"
            placeholder="Create a password or PIN"
            value={formData.password}
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
          disabled={loading}
        >
          <ShieldCheck size={18} />

          {loading
            ? "Creating Account..."
            : "Create Admin Account"}
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("admin-login")}
        >
          Already have an admin account? Login
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("login")}
        >
          Back to Student Login
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;