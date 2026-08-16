function AppShell({ children, currentPage, setCurrentPage }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">AI</div>

          <div>
            <h2>Academic</h2>
            <span>Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-title">OVERVIEW</span>

            <button
              type="button"
              className={`nav-item ${
                currentPage === "dashboard" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </button>
          </div>

          <div className="nav-section">
            <span className="nav-title">ACADEMICS</span>

            <button
              className={`nav-item ${
                currentPage === "students" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("students")}
            >
              Students
            </button>

            <button
              className={`nav-item ${
                currentPage === "teachers" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("teachers")}
            >
              Teachers
            </button>
            <button
              type="button"
              className={`nav-item ${
                currentPage === "courses" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("courses")}
            >
              Courses
            </button>

            <button
              type="button"
              className={`nav-item ${
                currentPage === "classrooms" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("classrooms")}
            >
              Classrooms
            </button>

            <button
              type="button"
              className={`nav-item ${
                currentPage === "enrollments" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("enrollments")}
            >
              Enrollments
            </button>
          </div>

          <div className="nav-section">
            <span className="nav-title">ACTIVITY</span>

            <button
              type="button"
              className={`nav-item ${
                currentPage === "attendance" ? "active" : ""
              }`}
              onClick={() => setCurrentPage("attendance")}
            >
              Attendance
            </button>

            <button className="nav-item">Assignments</button>

            <button className="nav-item">Examinations</button>
          </div>

          <div className="nav-section">
            <span className="nav-title">INTELLIGENCE</span>

            <button className="nav-item">AI Insights</button>

            <button className="nav-item">At-Risk Students</button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">S</div>

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-label">ACADEMIC MANAGEMENT</span>
          </div>

          <div className="topbar-user">
            <span>●</span>
            System Online
          </div>
        </header>

        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}

export default AppShell;
