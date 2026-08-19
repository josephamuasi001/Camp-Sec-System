import {
  Shield,
  LayoutDashboard,
  FilePlus,
  LockKeyhole,
} from "lucide-react";

function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <Shield size={24} />
        </div>

        <div>
          <h2>Camp-Sec</h2>
          <span>Campus Security</span>
        </div>
      </div>

      <div className="navbar-links">
        <button onClick={() => setPage("dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button onClick={() => setPage("report")}>
          <FilePlus size={18} />
          Report Incident
        </button>

        <button onClick={() => setPage("security")}>
          <LockKeyhole size={18} />
          Security Portal
        </button>
      </div>
    </nav>
  );
}

export default Navbar;