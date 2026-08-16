function AppShell({
  children,
  currentPage,
  setCurrentPage,
  role = "ADMIN",
}) {
  const normalizedRole = role.toUpperCase();

  const isAdmin = normalizedRole === "ADMIN";
  const isTeacher = normalizedRole === "TEACHER";
  const isStudent = normalizedRole === "STUDENT";

  function goTo(page) {
    setCurrentPage(page);
  }

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

          {/* ================= OVERVIEW ================= */}

          <div className="nav-section">
            <span className="nav-title">OVERVIEW</span>

            <button
              className={`nav-item ${
                currentPage === "dashboard" ||
                currentPage === "student-dashboard" ||
                currentPage === "teacher-dashboard" ||
                currentPage === "admin-dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                goTo(
                  isStudent
                    ? "dashboard"
                    : isTeacher
                    ? "teacher-dashboard"
                    : "admin-dashboard"
                )
              }
            >
              Dashboard
            </button>
          </div>

          {/* ================= ADMIN ================= */}

          {isAdmin && (
            <>
              <div className="nav-section">
                <span className="nav-title">ACADEMICS</span>

                <button
                  className={`nav-item ${
                    currentPage === "students" ? "active" : ""
                  }`}
                  onClick={() => goTo("students")}
                >
                  Students
                </button>

                <button
                  className={`nav-item ${
                    currentPage === "teachers" ? "active" : ""
                  }`}
                  onClick={() => goTo("teachers")}
                >
                  Teachers
                </button>

                <button
                  className={`nav-item ${
                    currentPage === "courses" ? "active" : ""
                  }`}
                  onClick={() => goTo("courses")}
                >
                  Courses
                </button>

                <button
                  className={`nav-item ${
                    currentPage === "classrooms" ? "active" : ""
                  }`}
                  onClick={() => goTo("classrooms")}
                >
                  Classrooms
                </button>
              </div>

              <div className="nav-section">
                <span className="nav-title">MANAGEMENT</span>

                <button
                  className={`nav-item ${
                    currentPage === "assignments" ? "active" : ""
                  }`}
                  onClick={() => goTo("assignments")}
                >
                  Assignments
                </button>

                <button
                  className={`nav-item ${
                    currentPage === "exams" ? "active" : ""
                  }`}
                  onClick={() => goTo("exams")}
                >
                  Examinations
                </button>

                <button
                  className={`nav-item ${
                    currentPage === "attendance" ? "active" : ""
                  }`}
                  onClick={() => goTo("attendance")}
                >
                  Attendance
                </button>
              </div>
            </>
          )}

          {/* ================= TEACHER ================= */}

          {isTeacher && (
            <div className="nav-section">
              <span className="nav-title">TEACHING</span>

              <button
                className={`nav-item ${
                  currentPage === "classrooms" ? "active" : ""
                }`}
                onClick={() => goTo("classrooms")}
              >
                My Classes
              </button>

              <button
                className={`nav-item ${
                  currentPage === "assignments" ? "active" : ""
                }`}
                onClick={() => goTo("assignments")}
              >
                Assignments
              </button>

              <button
                className={`nav-item ${
                  currentPage === "exams" ? "active" : ""
                }`}
                onClick={() => goTo("exams")}
              >
                Examinations
              </button>

              <button
                className={`nav-item ${
                  currentPage === "attendance" ? "active" : ""
                }`}
                onClick={() => goTo("attendance")}
              >
                Attendance
              </button>

              <button
                className={`nav-item ${
                  currentPage === "grades" ? "active" : ""
                }`}
                onClick={() => goTo("grades")}
              >
                Grades
              </button>
            </div>
          )}

          {/* ================= STUDENT ================= */}

          {isStudent && (
            <div className="nav-section">
              <span className="nav-title">MY ACADEMICS</span>

              <button
                className={`nav-item ${
                  currentPage === "dashboard" ||
                  currentPage === "student-dashboard"
                    ? "active"
                    : ""
                }`}
                onClick={() => goTo("dashboard")}
              >
                My Dashboard
              </button>

              <button
                className={`nav-item ${
                  currentPage === "assignments" ? "active" : ""
                }`}
                onClick={() => goTo("assignments")}
              >
                Assignments
              </button>

              <button
                className={`nav-item ${
                  currentPage === "exams" ? "active" : ""
                }`}
                onClick={() => goTo("exams")}
              >
                Examinations
              </button>

              <button
                className={`nav-item ${
                  currentPage === "grades" ? "active" : ""
                }`}
                onClick={() => goTo("grades")}
              >
                My Grades
              </button>

              <button
                className={`nav-item ${
                  currentPage === "attendance" ? "active" : ""
                }`}
                onClick={() => goTo("attendance")}
              >
                My Attendance
              </button>
            </div>
          )}

          {/* ================= INTELLIGENCE ================= */}

          <div className="nav-section">
            <span className="nav-title">INTELLIGENCE</span>

            <button
              className={`nav-item ${
                currentPage === "insights" ? "active" : ""
              }`}
              onClick={() => goTo("insights")}
            >
              AI Insights
            </button>

            {(isAdmin || isTeacher) && (
              <button
                className={`nav-item ${
                  currentPage === "at-risk" ? "active" : ""
                }`}
                onClick={() => goTo("at-risk")}
              >
                At-Risk Students
              </button>
            )}
          </div>
        </nav>

        {/* ================= USER ================= */}

        <div className="sidebar-footer">

          <div className="user-avatar">
            {isStudent ? "S" : isTeacher ? "T" : "A"}
          </div>

          <div>
            <strong>
              {isStudent
                ? "Student"
                : isTeacher
                ? "Teacher"
                : "Admin"}
            </strong>

            <span>
              {isStudent
                ? "Student Portal"
                : isTeacher
                ? "Faculty Portal"
                : "Administrator"}
            </span>
          </div>

        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">

          <div>
            <span className="topbar-label">
              {isStudent
                ? "STUDENT PORTAL"
                : isTeacher
                ? "TEACHER PORTAL"
                : "ACADEMIC MANAGEMENT"}
            </span>
          </div>

          <div className="topbar-user">
            <span>●</span>
            System Online
          </div>

        </header>

        <section className="page-content">
          {children}
        </section>

      </main>
    </div>
  );
}

export default AppShell;
