import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportIncident from "./pages/ReportIncident";
import IncidentDetails from "./pages/IncidentDetails";
import SecurityDashboard from "./pages/SecurityDashboard";
import ManageIncident from "./pages/ManageIncident";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Navbar setPage={setPage} />

      <main>
        {page === "dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {page === "report" && (
          <ReportIncident setPage={setPage} />
        )}

        {page === "details" && (
          <IncidentDetails setPage={setPage} />
        )}

        {page === "security" && (
          <SecurityDashboard setPage={setPage} />
        )}

        {page === "manage" && (
          <ManageIncident setPage={setPage} />
        )}
      </main>
    </>
  );
}

export default App;