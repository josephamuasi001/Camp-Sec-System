import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";

import ReportIncident from "./pages/ReportIncident";

import IncidentDetails from "./pages/IncidentDetails";

import SecurityDashboard from "./pages/SecurityDashboard";

import ManageIncident from "./pages/ManageIncident";

import Login from "./pages/Login";

import Register from "./pages/Register";

import EditIncident from "./pages/EditIncident";

import AdminLogin from "./pages/AdminLogin";

import AdminRegister from "./pages/AdminRegister";

import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem("campsec_student");
    const savedAdmin = localStorage.getItem("campsec_admin");

    if (savedStudent) {
      const parsedStudent = JSON.parse(savedStudent);
      setStudent(parsedStudent);
      setPage("dashboard");
    }

    if (savedAdmin) {
      const parsedAdmin = JSON.parse(savedAdmin);
      setAdmin(parsedAdmin);
      setPage("security");
    }
  }, []);
  

  return (
    <>
      <Navbar 
      setPage={setPage}
      student={student}
      admin={admin}
      setStudent={setStudent}
      setAdmin={setAdmin}
      />

      <main>
        {page === "login" && (
          <Login
            setPage={setPage}
            setStudent={setStudent}
          />
        )}

        {page === "register" && (
          <Register
            setPage={setPage}
          />
        )}


        {page === "dashboard" && (
          <Dashboard
            setPage={setPage}
            setSelectedIncident={setSelectedIncident}
            student={student}
          />
        )}

        {page === "report" && (
          <ReportIncident
            setPage={setPage}
            student={student}
          />
        )}

        {page === "details" && (
          <IncidentDetails
            setPage={setPage}
            incidentId={selectedIncident}
          />
        )}


        {page === "edit" && (
          <EditIncident
            setPage={setPage}
            incidentId={selectedIncident}
          />
        )}

        {page === "admin-login" && (
          <AdminLogin
            setPage={setPage}
            setAdmin={setAdmin}
            setStudent={setStudent}
          />
        )}


        {page === "admin-register" && (
          <AdminRegister
            setPage={setPage}
          />
        )}

        {page === "security" && admin && (
          <SecurityDashboard
            setPage={setPage}
            setSelectedIncident={setSelectedIncident}
            admin={admin}
          />
        )}

        {page === "manage" && admin && (
          <ManageIncident
            setPage={setPage}
            incidentId={selectedIncident}
          />
        )}
      </main>
    </>
  );
}

export default App;