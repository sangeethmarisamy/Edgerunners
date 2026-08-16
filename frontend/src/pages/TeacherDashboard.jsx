import { useEffect, useState } from "react";

const API = "http://localhost:8080/api";

export default function TeacherDashboard() {
  const [data, setData] = useState({
    assignments: [],
    exams: [],
    courses: [],
    classrooms: []
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API}/assignments`).then(r => r.json()),
      fetch(`${API}/exams`).then(r => r.json()),
      fetch(`${API}/courses`).then(r => r.json()),
      fetch(`${API}/classrooms`).then(r => r.json())
    ]).then(([assignments, exams, courses, classrooms]) => {
      setData({ assignments, exams, courses, classrooms });
    }).catch(console.error);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>Manage teaching and academic activities.</p>
        </div>
        <div className="role-badge">TEACHER</div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Courses</span>
          <strong>{data.courses.length}</strong>
          <small>Available courses</small>
        </div>

        <div className="stat-card">
          <span>Classes</span>
          <strong>{data.classrooms.length}</strong>
          <small>Classrooms</small>
        </div>

        <div className="stat-card">
          <span>Assignments</span>
          <strong>{data.assignments.length}</strong>
          <small>Assignments</small>
        </div>

        <div className="stat-card">
          <span>Examinations</span>
          <strong>{data.exams.length}</strong>
          <small>Exams</small>
        </div>
      </div>

      <div className="dashboard-two-column">
        <div className="dashboard-card">
          <h2>Assignments</h2>
          {data.assignments.length === 0
            ? <p>No assignments available.</p>
            : data.assignments.map(a => (
                <div className="dashboard-list-item" key={a.id}>
                  <strong>{a.title}</strong>
                  <p>{a.description || "Academic assignment"}</p>
                  <small>Due: {a.dueDate}</small>
                </div>
              ))}
        </div>

        <div className="dashboard-card">
          <h2>Examinations</h2>
          {data.exams.length === 0
            ? <p>No examinations available.</p>
            : data.exams.map(e => (
                <div className="dashboard-list-item" key={e.id}>
                  <strong>{e.examName}</strong>
                  <p>{e.examType || "Examination"}</p>
                  <small>Date: {e.examDate}</small>
                </div>
              ))}
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Teacher Workspace</h2>
        <p>
          Manage courses, classrooms, assignments, examinations,
          attendance and grades using the sidebar.
        </p>
      </div>
    </div>
  );
}
