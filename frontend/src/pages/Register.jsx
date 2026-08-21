import { useState } from "react";
import { registerStudent } from "../services/api";

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
    <div className="report-page">
      <div className="report-header">
        <p className="eyebrow">CAMPUS SECURITY</p>

        <h1>Student Registration</h1>

        <p>
          Create your Campus Security account.
        </p>
      </div>

      <form className="incident-form" onSubmit={handleSubmit}>
        <div className="form-group">
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

        <div className="form-group">
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
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-button submit-button"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("login")}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;