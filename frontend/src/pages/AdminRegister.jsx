import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { registerAdmin } from "../services/api";
import "../styles/admin-register.css";

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
      <div className="admin-success-page">
  <div className="admin-success-card">

    <div className="admin-success-icon">
      ✓
    </div>

    <h1>Admin Account Created</h1>

    <p>
      Your admin account has been successfully registered.
      You can now sign in to the campus security administration
      portal.
    </p>

    <button
      className="admin-success-button"
      onClick={() => setPage("admin-login")}
    >
      Go to Admin Login
    </button>

  </div>
</div>
    );
  }

  return (
  <div className="admin-register-page">
    <div className="admin-register-container">

      <div className="admin-register-header">

        <div className="admin-register-icon">
          <ShieldCheck size={30} />
        </div>

        <p className="eyebrow">
          CAMPUS SECURITY
        </p>

        <h1>Admin Registration</h1>

        <p className="admin-register-description">
          Create an administrator account for the campus
          security system.
        </p>

      </div>

      <div className="admin-register-card">

        <div className="admin-security-notice">
          <ShieldCheck size={18} />

          <div>
            <strong>Security Personnel Access</strong>
            <span>
              This account is intended for authorised
              campus security personnel.
            </span>
          </div>
        </div>

        <form
          className="admin-register-form"
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
          <p className="admin-register-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="admin-register-submit"
          disabled={loading}
        >
          <ShieldCheck size={18} />

          {loading
            ? "Creating Account..."
            : "Create Admin Account"}
        </button>

        <div className="admin-register-actions">

  <button
    type="button"
    className="admin-register-link"
    onClick={() => setPage("admin-login")}
  >
    Already have an admin account? Login
  </button>

  <button
    type="button"
    className="admin-register-link"
    onClick={() => setPage("login")}
  >
    Back to Student Login
  </button>

</div>
      </form>
    </div>
    </div>
  </div>
  );
}

export default AdminRegister;