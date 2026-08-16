import { useEffect, useState } from "react";

const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

function StudentDashboard({ studentId }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/students/${studentId}/dashboard`
        );

        if (!response.ok) {
          throw new Error("Failed to load student dashboard");
        }

        const data = await response.json();

        setDashboard(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load student dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [studentId]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Student Dashboard...</h2>
        <p>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Failed to load student dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  const student = dashboard.student;

  const assignments = dashboard.assignments || [];
  const exams = dashboard.exams || [];
  const submissions = dashboard.submissions || [];
  const grades = dashboard.grades || [];
  const attendance = dashboard.attendance || [];

  const presentCount = attendance.filter(
    (item) => item.status === "PRESENT"
  ).length;

  const attendancePercentage =
    attendance.length > 0
      ? Math.round((presentCount / attendance.length) * 100)
      : 0;

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Student Dashboard</h1>

          <p>
            Welcome back, <strong>{student.name}</strong>
          </p>
        </div>
      </div>

      {/* STUDENT PROFILE */}

      <div className="student-profile-card">
        <div className="student-avatar">
          {student.name?.charAt(0)}
        </div>

        <div>
          <h2>{student.name}</h2>

          <p>
            {student.registerNumber} • {student.department} • Year{" "}
            {student.year}
          </p>

          <span>{student.email}</span>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>ASSIGNMENTS</span>
          <strong>{assignments.length}</strong>
          <p>Upcoming assignments</p>
        </div>

        <div className="dashboard-card">
          <span>EXAMS</span>
          <strong>{exams.length}</strong>
          <p>Upcoming examinations</p>
        </div>

        <div className="dashboard-card">
          <span>ATTENDANCE</span>
          <strong>{attendancePercentage}%</strong>
          <p>Current attendance</p>
        </div>

        <div className="dashboard-card">
          <span>GRADES</span>
          <strong>{grades.length}</strong>
          <p>Published results</p>
        </div>
      </div>

      {/* ASSIGNMENTS */}

      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Upcoming Assignments</h2>
          <span>{assignments.length} items</span>
        </div>

        {assignments.length === 0 ? (
          <p className="empty-state">No upcoming assignments.</p>
        ) : (
          <div className="dashboard-list">
            {assignments.map((assignment) => (
              <div className="dashboard-list-item" key={assignment.id}>
                <div>
                  <strong>{assignment.title}</strong>

                  <p>{assignment.description}</p>

                  <small>
                    {assignment.classroom?.course?.courseCode} •{" "}
                    {assignment.classroom?.course?.courseName}
                  </small>
                </div>

                <div className="date-badge">
                  Due {assignment.dueDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXAMS */}

      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Upcoming Examinations</h2>
          <span>{exams.length} exams</span>
        </div>

        {exams.length === 0 ? (
          <p className="empty-state">No upcoming exams.</p>
        ) : (
          <div className="dashboard-list">
            {exams.map((exam) => (
              <div className="dashboard-list-item" key={exam.id}>
                <div>
                  <strong>{exam.examName}</strong>

                  <p>
                    {exam.examType} • {exam.duration}
                  </p>

                  <small>
                    {exam.classroom?.course?.courseCode} •{" "}
                    {exam.classroom?.course?.courseName}
                  </small>
                </div>

                <div className="date-badge">
                  {exam.examDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GRADES */}

      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Academic Performance</h2>
          <span>{grades.length} results</span>
        </div>

        {grades.length === 0 ? (
          <p className="empty-state">No grades published.</p>
        ) : (
          <div className="dashboard-list">
            {grades.map((grade) => (
              <div className="dashboard-list-item" key={grade.id}>
                <div>
                  <strong>{grade.exam?.examName}</strong>

                  <p>{grade.remarks}</p>
                </div>

                <div className="grade-badge">
                  {grade.marksObtained} /{" "}
                  {grade.exam?.totalMarks}

                  <strong>{grade.grade}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMISSIONS */}

      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Assignment Submissions</h2>
          <span>{submissions.length} submissions</span>
        </div>

        {submissions.length === 0 ? (
          <p className="empty-state">No submissions yet.</p>
        ) : (
          <div className="dashboard-list">
            {submissions.map((submission) => (
              <div
                className="dashboard-list-item"
                key={submission.id}
              >
                <div>
                  <strong>
                    {submission.assignment?.title}
                  </strong>

                  <p>{submission.feedback}</p>

                  <small>
                    Submitted: {submission.submittedAt}
                  </small>
                </div>

                <div className="status-badge">
                  {submission.status}
                  <strong>
                    {submission.marks} marks
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
