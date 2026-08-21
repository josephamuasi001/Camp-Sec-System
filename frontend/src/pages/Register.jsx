import { useState } from "react";
import { UserPlus, ArrowLeft } from "lucide-react";
import { registerStudent } from "../services/api";
import "../styles/register.css";

function Register({ setPage }) {
  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await registerStudent(formData);

      alert("Registration successful. You can now login.");
      setPage("login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <button
          className="register-back"
          onClick={() => setPage("login")}
        >
          <ArrowLeft size={17} />
          Back to Login
        </button>

        <div className="register-card">

          <div className="register-brand">
            <div className="register-logo">
              <img
                src="/images/ug-logo.png"
                alt="University of Ghana"
              />
            </div>

            <div>
              <p className="register-brand-name">
                Camp-Sec
              </p>

              <span>
                Campus Security
              </span>
            </div>
          </div>

          <div className="register-header">
            <div className="register-icon">
              <UserPlus size={22} />
            </div>

            <div>
              <p className="register-eyebrow">
                CAMPUS SECURITY
              </p>

              <h1>
                Create your account
              </h1>

              <p>
                Register to report and track security
                incidents on campus.
              </p>
            </div>
          </div>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <div className="register-form-group">
              <label htmlFor="student_id">
                Student ID
              </label>

              <input
                id="student_id"
                name="student_id"
                type="text"
                placeholder="e.g. 21289082"
                value={formData.student_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-form-group">
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

            <div className="register-form-group">
              <label htmlFor="password">
                Password / PIN
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password or PIN"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="register-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              <UserPlus size={18} />

              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="register-footer">
            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </div>

        </div>

        <p className="register-security-note">
          University of Ghana Campus Security Portal
        </p>

      </div>
    </div>
  );
}

export default Register;