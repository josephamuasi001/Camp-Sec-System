import { useState } from "react";

import {
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { loginAdmin } from "../services/api";

import "../styles/admin-login.css";

function AdminLogin({
  setPage,
  setAdmin,
  setStudent,
}) {
  const [securityId, setSecurityId] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(
        securityId,
        password
      );

      setAdmin(data.security);

      localStorage.setItem(
        "campsec_admin",
        JSON.stringify(data.security)
      );

      localStorage.removeItem("campsec_student");

      setStudent(null);
      setPage("security");
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Admin login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        <button
          className="admin-login-back"
          onClick={() => setPage("login")}
        >
          <ArrowLeft size={17} />
          Back to Student Login
        </button>

        <div className="admin-login-card">

          {/* BRAND */}
          <div className="admin-login-brand">
            <div className="admin-login-logo">
              <img
                src="/images/ug-logo.png"
                alt="University of Ghana"
              />
            </div>

            <div>
              <p className="admin-brand-name">
                Camp-Sec
              </p>

              <span>
                Campus Security
              </span>
            </div>
          </div>

          {/* HEADER */}
          <div className="admin-login-header">

            <div className="admin-login-icon">
              <ShieldCheck size={25} />
            </div>

            <div>
              <p className="admin-login-eyebrow">
                SECURITY PERSONNEL
              </p>

              <h1>
                Admin Portal
              </h1>

              <p>
                Sign in to manage and review campus
                security incidents.
              </p>
            </div>

          </div>

          {/* FORM */}
          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-form-group">
              <label htmlFor="security_id">
                Security ID
              </label>

              <input
                id="security_id"
                type="text"
                placeholder="e.g. SEC001"
                value={securityId}
                onChange={(event) =>
                  setSecurityId(
                    event.target.value
                  )
                }
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin_password">
                Password
              </label>

              <input
                id="admin_password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                required
              />
            </div>

            {error && (
              <p className="admin-login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              <ShieldCheck size={18} />

              {loading
                ? "Signing in..."
                : "Sign In as Admin"}
            </button>

          </form>

          {/* FOOTER */}
          <div className="admin-login-footer">

            <span>
              Don't have an admin account?
            </span>

            <button
              type="button"
              onClick={() =>
                setPage("admin-register")
              }
            >
              Register
            </button>

          </div>

        </div>

        <p className="admin-security-note">
          Authorized University of Ghana Campus Security Personnel
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;