import { useEffect, useState } from "react";
import { getStudentDashboard } from "../api/dashboardApi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary test student.
  // Later this should come from login/current user.
  const studentId = 2;

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentDashboard(studentId);
        setDashboard(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load student dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Loading student information...</p>
          </div>
        </div>

        <div className="dashboard-message">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Student overview</p>
          </div>
        </div>

        <div className="dashboard-message error">
          {error}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="app">
        <div className="dashboard-message">
          No dashboard data available.
        </div>
      </div>
    );
  }

  const student = dashboard.student || {};
  const assignments = dashboard.assignments || [];
  const exams = dashboard.exams || [];
  const submissions = dashboard.submissions || [];
  const grades = dashboard.grades || [];
  const attendance = dashboard.attendance || [];

  return (
    <div className="app">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Student academic overview.</p>
        </div>
      </div>

      {/* STUDENT INFO */}
      <div className="dashboard-student-card">
        <div className="student-avatar">
          {student.name ? student.name.charAt(0).toUpperCase() : "S"}
        </div>

        <div>
          <h2>{student.name || "Student"}</h2>

          <p>
            {student.registerNumber || "N/A"} •{" "}
            {student.department || "N/A"} • Year{" "}
            {student.year || "N/A"}
          </p>

          <span>{student.email || "No email available"}</span>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>ASSIGNMENTS</span>
          <strong>{assignments.length}</strong>
          <p>Total assignments</p>
        </div>

        <div className="dashboard-card">
          <span>EXAMS</span>
          <strong>{exams.length}</strong>
          <p>Scheduled exams</p>
        </div>

        <div className="dashboard-card">
          <span>SUBMISSIONS</span>
          <strong>{submissions.length}</strong>
          <p>Total submissions</p>
        </div>

        <div className="dashboard-card">
          <span>GRADES</span>
          <strong>{grades.length}</strong>
          <p>Recorded grades</p>
        </div>

        <div className="dashboard-card">
          <span>ATTENDANCE</span>
          <strong>{attendance.length}</strong>
          <p>Attendance records</p>
        </div>
      </div>

      {/* ASSIGNMENTS */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Assignments</h2>
          <span>{assignments.length}</span>
        </div>

        {assignments.length === 0 ? (
          <div className="empty-state">
            No assignments available.
          </div>
        ) : (
          <div className="dashboard-list">
            {assignments.map((assignment) => (
              <div
                className="dashboard-list-item"
                key={assignment.id}
              >
                <div>
                  <strong>
                    {assignment.title || "Untitled Assignment"}
                  </strong>

                  <p>
                    {assignment.description ||
                      "No description available."}
                  </p>
                </div>

                <div className="list-meta">
                  <span>
                    Due: {assignment.dueDate || "N/A"}
                  </span>

                  <span>
                    Marks: {assignment.maxMarks ?? "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXAMS */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Exams</h2>
          <span>{exams.length}</span>
        </div>

        {exams.length === 0 ? (
          <div className="empty-state">
            No exams scheduled.
          </div>
        ) : (
          <div className="dashboard-list">
            {exams.map((exam) => (
              <div
                className="dashboard-list-item"
                key={exam.id}
              >
                <div>
                  <strong>
                    {exam.examName || "Unnamed Exam"}
                  </strong>

                  <p>
                    {exam.examType || "Exam"}
                  </p>
                </div>

                <div className="list-meta">
                  <span>
                    Date: {exam.examDate || "N/A"}
                  </span>

                  <span>
                    Total: {exam.totalMarks ?? "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GRADES */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Grades</h2>
          <span>{grades.length}</span>
        </div>

        {grades.length === 0 ? (
          <div className="empty-state">
            No grades available.
          </div>
        ) : (
          <div className="dashboard-list">
            {grades.map((grade) => (
              <div
                className="dashboard-list-item"
                key={grade.id}
              >
                <div>
                  <strong>
                    Grade: {grade.grade || "N/A"}
                  </strong>

                  <p>
                    {grade.remarks || "No remarks"}
                  </p>
                </div>

                <div className="list-meta">
                  <span>
                    Marks: {grade.marksObtained ?? "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ATTENDANCE */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Attendance</h2>
          <span>{attendance.length}</span>
        </div>

        {attendance.length === 0 ? (
          <div className="empty-state">
            No attendance records available.
          </div>
        ) : (
          <div className="dashboard-list">
            {attendance.map((record) => (
              <div
                className="dashboard-list-item"
                key={record.id}
              >
                <div>
                  <strong>
                    {record.status || "UNKNOWN"}
                  </strong>

                  <p>
                    {record.attendanceDate || "No date"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;