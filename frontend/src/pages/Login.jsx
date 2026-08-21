import { useState } from "react";

import { loginStudent } from "../services/api";

import "../styles/login.css";

function Login({ setPage, setStudent }) {
  const [studentId, setStudentId] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginStudent(studentId, password);

     setStudent(data.student);

      localStorage.setItem(
        "campsec_student",
        JSON.stringify(data.student)
      );

      localStorage.removeItem("campsec_admin");

      setPage("dashboard");
    } catch (err) {
      if (err.message.includes("not found")) {
        setError("Student ID not found. Please register first.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <p className="eyebrow">CAMPUS SECURITY</p>

        <h1>Student Login</h1>

        <p>
          Login using your student ID and password/PIN.
        </p>
      </div>

      <form className="incident-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_id">
            Student ID
          </label>

          <input
            id="student_id"
            type="text"
            placeholder="e.g. 21289082"
            value={studentId}
            onChange={(event) =>
              setStudentId(event.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password / PIN
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password or PIN"
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
          className="primary-button submit-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("register")}
        >
          Don't have an account? Register
        </button>

        {/* Admin Login */}
        <div className="admin-login-divider">
          <span>Campus Security Personnel</span>
        </div>

        <button
          type="button"
          className="admin-login-button"
          onClick={() => setPage("admin-login")}
        >
          Admin Login
        </button>
      </form>
    </div>
  );
}

export default Login;