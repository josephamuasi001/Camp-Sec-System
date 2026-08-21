import {
  Shield,
  LayoutDashboard,
  FilePlus,
  LockKeyhole,
  LogOut,
} from "lucide-react";

function Navbar({
  setPage,
  student,
  admin,
  setStudent,
  setAdmin,
}) {
  const handleLogout = () => {
    setStudent(null);
    setAdmin(null);

    localStorage.removeItem("campsec_student");
    localStorage.removeItem("campsec_admin");

    setPage("login");
  };

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
        {student && (
          <>
            <button onClick={() => setPage("dashboard")}>
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button onClick={() => setPage("report")}>
              <FilePlus size={18} />
              Report Incident
            </button>

            <button onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}

        {admin && (
          <>
            <button onClick={() => setPage("security")}>
              <LockKeyhole size={18} />
              Admin Portal
            </button>

            <button onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;