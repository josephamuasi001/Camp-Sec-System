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
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <>
      <Navbar setPage={setPage} />

      <main>
        {page === "dashboard" && (
          <Dashboard
            setPage={setPage}
            setSelectedIncident={setSelectedIncident}
          />
        )}

        {page === "report" && (
          <ReportIncident setPage={setPage} />
        )}

        {page === "details" && (
          <IncidentDetails
            setPage={setPage}
            incidentId={selectedIncident}
          />
        )}

        {page === "security" && (
          <SecurityDashboard
            setPage={setPage}
            setSelectedIncident={setSelectedIncident}
          />
        )}

        {page === "manage" && (
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