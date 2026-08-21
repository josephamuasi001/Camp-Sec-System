import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { loginAdmin } from "../services/api";

function AdminLogin({ setPage, setAdmin, setStudent }) {
  const [securityId, setSecurityId] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(securityId, password);

      // Store the logged-in admin
      setAdmin(data.security);setAdmin(data.security);

      localStorage.setItem(
        "campsec_admin",
        JSON.stringify(data.security)
      );

      localStorage.removeItem("campsec_student");

      setPage("security");
      setStudent(null);
      // Go to Admin Dashboard
      setPage("security");
    } catch (err) {
      console.error(err);
      setError(err.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-icon">
          <ShieldCheck size={32} />
        </div>

        <p className="eyebrow">CAMPUS SECURITY</p>

        <h1>Admin Login</h1>

        <p className="login-description">
          Sign in to access the campus security administration portal.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="security_id">
              Admin ID
            </label>

            <input
              id="security_id"
              type="text"
              placeholder="e.g. SEC001"
              value={securityId}
              onChange={(event) =>
                setSecurityId(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin_password">
              Password
            </label>

            <input
              id="admin_password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
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
            className="primary-button"
            disabled={loading}
          >
            <ShieldCheck size={18} />

            {loading ? "Signing in..." : "Sign In as Admin"}
          </button>

        </form>

        <button
            className="back-button"
            onClick={() => setPage("admin-register")}
            >
        Don't have an admin account? Register
        </button>

        <button
          className="back-button"
          onClick={() => setPage("login")}
        >
          Back to Student Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;