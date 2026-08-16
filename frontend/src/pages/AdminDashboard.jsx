import { useEffect, useState } from "react";

const API = "http://localhost:8080/api";

export default function AdminDashboard() {
  const [data, setData] = useState({
    students: [],
    teachers: [],
    courses: [],
    classrooms: []
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API}/students`).then(r => r.json()),
      fetch(`${API}/teachers`).then(r => r.json()),
      fetch(`${API}/courses`).then(r => r.json()),
      fetch(`${API}/classrooms`).then(r => r.json())
    ]).then(([students, teachers, courses, classrooms]) => {
      setData({ students, teachers, courses, classrooms });
    }).catch(console.error);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Complete academic management overview.</p>
        </div>
        <div className="role-badge">ADMIN</div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Students</span>
          <strong>{data.students.length}</strong>
          <small>Registered students</small>
        </div>

        <div className="stat-card">
          <span>Teachers</span>
          <strong>{data.teachers.length}</strong>
          <small>Faculty members</small>
        </div>

        <div className="stat-card">
          <span>Courses</span>
          <strong>{data.courses.length}</strong>
          <small>Academic courses</small>
        </div>

        <div className="stat-card">
          <span>Classrooms</span>
          <strong>{data.classrooms.length}</strong>
          <small>Active classrooms</small>
        </div>
      </div>

      <div className="dashboard-two-column">
        <div className="dashboard-card">
          <h2>Students</h2>
          {data.students.length === 0
            ? <p>No students found.</p>
            : data.students.slice(0, 8).map(s => (
                <div className="dashboard-list-item" key={s.id}>
                  <strong>{s.name}</strong>
                  <p>{s.registerNumber}</p>
                  <small>{s.department} · Year {s.year}</small>
                </div>
              ))}
        </div>

        <div className="dashboard-card">
          <h2>Teachers</h2>
          {data.teachers.length === 0
            ? <p>No teachers found.</p>
            : data.teachers.slice(0, 8).map(t => (
                <div className="dashboard-list-item" key={t.id}>
                  <strong>{t.name}</strong>
                  <p>{t.email}</p>
                </div>
              ))}
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Administration</h2>
        <p>
          Manage students, teachers, courses, classrooms,
          assignments, examinations and attendance.
        </p>
      </div>
    </div>
  );
}
