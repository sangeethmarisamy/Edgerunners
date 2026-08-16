import { useEffect, useState } from "react";

import {
  getStudents,
  createStudent,
  deleteStudent,
} from "./api/studentApi";

import AppShell from "./components/AppShell";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Classrooms from "./pages/Classrooms";

import "./App.css";

const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

function App() {
  const [role, setRole] = useState("student");
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [studentDashboard, setStudentDashboard] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registerNumber: "",
    department: "",
    year: "",
  });

  /*
   * ============================
   * STUDENT DASHBOARD
   * ============================
   */

  useEffect(() => {
    if (role !== "student") {
      return;
    }

    async function loadStudentDashboard() {
      setDashboardLoading(true);
      setDashboardError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/students/2/dashboard`
        );

        if (!response.ok) {
          throw new Error(
            `Dashboard request failed: ${response.status}`
          );
        }

        const data = await response.json();

        setStudentDashboard(data);
      } catch (error) {
        console.error("Student dashboard error:", error);
        setDashboardError(
          "Failed to load student dashboard. Check that the backend tunnel is running."
        );
      } finally {
        setDashboardLoading(false);
      }
    }

    loadStudentDashboard();
  }, [role]);

  /*
   * ============================
   * ADMIN STUDENTS
   * ============================
   */

  useEffect(() => {
    if (currentPage !== "students") {
      return;
    }

    async function loadStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    }

    loadStudents();
  }, [currentPage]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleAddStudent(event) {
    event.preventDefault();

    try {
      const newStudent = {
        name: formData.name,
        email: formData.email,
        registerNumber: formData.registerNumber,
        department: formData.department,
        year: Number(formData.year),
      };

      const createdStudent = await createStudent(newStudent);

      setStudents([...students, createdStudent]);

      setFormData({
        name: "",
        email: "",
        registerNumber: "",
        department: "",
        year: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add student");
    }
  }

  async function handleDeleteStudent(id) {
    try {
      await deleteStudent(id);

      setStudents(
        students.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  }

  function handleViewStudent(student) {
    setSelectedStudent(student);
  }

  /*
   * ============================
   * ROLE SWITCH
   * ============================
   */

  function changeRole(newRole) {
    setRole(newRole);

    if (newRole === "student") {
      setCurrentPage("student-dashboard");
    }

    if (newRole === "teacher") {
      setCurrentPage("teacher-dashboard");
    }

    if (newRole === "admin") {
      setCurrentPage("admin-dashboard");
    }
  }

  /*
   * ============================
   * STUDENT DASHBOARD UI
   * ============================
   */

  function StudentDashboard() {
    if (dashboardLoading) {
      return (
        <div className="dashboard-page">
          <div className="page-header">
            <div>
              <h1>Student Dashboard</h1>
              <p>Loading academic information...</p>
            </div>
          </div>

          <div className="dashboard-card">
            Loading dashboard...
          </div>
        </div>
      );
    }

    if (dashboardError) {
      return (
        <div className="dashboard-page">
          <div className="page-header">
            <div>
              <h1>Student Dashboard</h1>
              <p>Academic overview</p>
            </div>
          </div>

          <div className="dashboard-card error-card">
            <h2>Failed to load student dashboard</h2>
            <p>{dashboardError}</p>

            <button
              onClick={() => {
                setRole("student");
                setDashboardLoading(true);
              }}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!studentDashboard) {
      return null;
    }

    const student = studentDashboard.student;
    const assignments = studentDashboard.assignments || [];
    const exams = studentDashboard.exams || [];
    const submissions = studentDashboard.submissions || [];
    const grades = studentDashboard.grades || [];
    const attendance = studentDashboard.attendance || [];

    const presentCount = attendance.filter(
      (item) => item.status === "PRESENT"
    ).length;

    const attendancePercentage =
      attendance.length > 0
        ? Math.round((presentCount / attendance.length) * 100)
        : 0;

    return (
      <div className="dashboard-page">
        <div className="page-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>
              Welcome back, {student.name}
            </p>
          </div>

          <div className="role-badge">
            STUDENT
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <span>Assignments</span>
            <strong>{assignments.length}</strong>
            <small>Assigned</small>
          </div>

          <div className="stat-card">
            <span>Examinations</span>
            <strong>{exams.length}</strong>
            <small>Upcoming</small>
          </div>

          <div className="stat-card">
            <span>Grades</span>
            <strong>{grades.length}</strong>
            <small>Recorded</small>
          </div>

          <div className="stat-card">
            <span>Attendance</span>
            <strong>{attendancePercentage}%</strong>
            <small>Current</small>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2>Student Profile</h2>

            <div className="profile-grid">
              <div>
                <span>Name</span>
                <strong>{student.name}</strong>
              </div>

              <div>
                <span>Register Number</span>
                <strong>{student.registerNumber}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{student.email}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{student.department}</strong>
              </div>

              <div>
                <span>Year</span>
                <strong>{student.year}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2>Assignments</h2>

            {assignments.length === 0 ? (
              <p>No assignments available.</p>
            ) : (
              <div className="dashboard-list">
                {assignments.map((assignment) => (
                  <div
                    className="dashboard-list-item"
                    key={assignment.id}
                  >
                    <div>
                      <strong>{assignment.title}</strong>

                      <p>{assignment.description}</p>
                    </div>

                    <div className="item-meta">
                      <span>
                        Due: {assignment.dueDate}
                      </span>

                      <span>
                        Max Marks: {assignment.maxMarks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2>Examinations</h2>

            {exams.length === 0 ? (
              <p>No examinations available.</p>
            ) : (
              <div className="dashboard-list">
                {exams.map((exam) => (
                  <div
                    className="dashboard-list-item"
                    key={exam.id}
                  >
                    <div>
                      <strong>{exam.examName}</strong>

                      <p>
                        {exam.examType} · {exam.duration}
                      </p>
                    </div>

                    <div className="item-meta">
                      <span>
                        Date: {exam.examDate}
                      </span>

                      <span>
                        Total: {exam.totalMarks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-two-column">
          <div className="dashboard-card">
            <h2>Grades</h2>

            {grades.length === 0 ? (
              <p>No grades available.</p>
            ) : (
              grades.map((grade) => (
                <div
                  className="grade-row"
                  key={grade.id}
                >
                  <div>
                    <strong>
                      {grade.exam?.examName}
                    </strong>

                    <span>
                      {grade.remarks}
                    </span>
                  </div>

                  <div>
                    <strong>
                      {grade.marksObtained}
                    </strong>

                    <span>
                      Grade {grade.grade}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="dashboard-card">
            <h2>Submissions</h2>

            {submissions.length === 0 ? (
              <p>No submissions available.</p>
            ) : (
              submissions.map((submission) => (
                <div
                  className="submission-row"
                  key={submission.id}
                >
                  <strong>
                    {submission.assignment?.title}
                  </strong>

                  <span>
                    {submission.status}
                  </span>

                  <small>
                    Marks: {submission.marks ?? "-"}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2>Attendance</h2>

            {attendance.length === 0 ? (
              <p>No attendance records available.</p>
            ) : (
              <div className="attendance-list">
                {attendance.map((item) => (
                  <div
                    className="attendance-row"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.classroom?.course?.courseName}
                      </strong>

                      <span>
                        {item.attendanceDate}
                      </span>
                    </div>

                    <span
                      className={
                        item.status === "PRESENT"
                          ? "status-present"
                          : "status-absent"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /*
   * ============================
   * TEACHER DASHBOARD
   * ============================
   */

  function TeacherDashboard() {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <div>
            <h1>Teacher Dashboard</h1>
            <p>Manage teaching and academic activities.</p>
          </div>

          <div className="role-badge">
            TEACHER
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <span>Students</span>
            <strong>—</strong>
            <small>Academic records</small>
          </div>

          <div className="stat-card">
            <span>Courses</span>
            <strong>—</strong>
            <small>Assigned courses</small>
          </div>

          <div className="stat-card">
            <span>Assignments</span>
            <strong>—</strong>
            <small>Manage assignments</small>
          </div>

          <div className="stat-card">
            <span>Exams</span>
            <strong>—</strong>
            <small>Manage examinations</small>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Teacher Workspace</h2>

          <p>
            Use the academic management sections to manage
            courses, classrooms, assignments and examinations.
          </p>

          <div className="quick-actions">
            <button
              onClick={() => setCurrentPage("courses")}
            >
              Courses
            </button>

            <button
              onClick={() => setCurrentPage("classrooms")}
            >
              Classrooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ============================
   * ADMIN DASHBOARD
   * ============================
   */

  function AdminDashboard() {
    return (
      <div className="dashboard-page">
        <div className="page-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Manage the complete academic platform.
            </p>
          </div>

          <div className="role-badge">
            ADMIN
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <span>Students</span>
            <strong>{students.length}</strong>
            <small>Registered students</small>
          </div>

          <div className="stat-card">
            <span>Teachers</span>
            <strong>—</strong>
            <small>Faculty records</small>
          </div>

          <div className="stat-card">
            <span>Courses</span>
            <strong>—</strong>
            <small>Academic courses</small>
          </div>

          <div className="stat-card">
            <span>Classrooms</span>
            <strong>—</strong>
            <small>Active classrooms</small>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Administration</h2>

          <p>
            Use the navigation menu to manage students,
            teachers, courses and classrooms.
          </p>
        </div>
      </div>
    );
  }


  /*
   * ============================
   * ACADEMIC DATA PAGES
   * ============================
   */

  function AcademicDataPage({ title, endpoint, columns }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      async function loadData() {
        setLoading(true);
        setError("");

        try {
          const response = await fetch(`${API_BASE_URL}${endpoint}`);

          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }

          const result = await response.json();
          setData(Array.isArray(result) ? result : []);
        } catch (err) {
          console.error(err);
          setError("Unable to load data from backend.");
        } finally {
          setLoading(false);
        }
      }

      loadData();
    }, [endpoint]);

    return (
      <div className="app">
        <div className="page-header">
          <div>
            <h1>{title}</h1>
            <p>Live data from the Academic Intelligence backend.</p>
          </div>

          <div className="role-badge">
            {role.toUpperCase()}
          </div>
        </div>

        <div className="dashboard-card">
          {loading && <p>Loading {title.toLowerCase()}...</p>}

          {error && (
            <div className="error-card">
              <h2>Backend connection error</h2>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <p>No {title.toLowerCase()} available.</p>
          )}

          {!loading && !error && data.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.label}>{column.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      {columns.map((column) => (
                        <td key={column.label}>
                          {column.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  /*
   * ============================
   * MAIN RENDER
   * ============================
   */

  return (
    <AppShell
      role={role}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setRole={changeRole}
    >
      {role === "student" &&
        (currentPage === "dashboard" ||
         currentPage === "student-dashboard") && (
          <StudentDashboard />
        )}

      {role === "teacher" &&
        currentPage === "teacher-dashboard" && (
          <TeacherDashboard />
        )}

      {role === "admin" &&
        currentPage === "admin-dashboard" && (
          <AdminDashboard />
        )}

      {role === "admin" &&
        currentPage === "students" && (
          <div className="app">
            <div className="page-header">
              <div>
                <h1>Students</h1>
                <p>
                  Manage students in the Academic
                  Intelligence Platform.
                </p>
              </div>

              <button
                onClick={() => setShowForm(true)}
              >
                Add Student
              </button>
            </div>

            {showForm && (
              <form
                className="student-form"
                onSubmit={handleAddStudent}
              >
                <h2>Add Student</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="registerNumber"
                  placeholder="Register Number"
                  value={formData.registerNumber}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />

                <div>
                  <button type="submit">
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {selectedStudent && (
              <div className="student-details">
                <h2>Student Details</h2>

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedStudent.name}
                </p>

                <p>
                  <strong>Register Number:</strong>{" "}
                  {selectedStudent.registerNumber}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {selectedStudent.email}
                </p>

                <p>
                  <strong>Department:</strong>{" "}
                  {selectedStudent.department}
                </p>

                <p>
                  <strong>Year:</strong>{" "}
                  {selectedStudent.year}
                </p>

                <button
                  onClick={() =>
                    setSelectedStudent(null)
                  }
                >
                  Close
                </button>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register No.</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>

                    <td>
                      {student.registerNumber}
                    </td>

                    <td>{student.email}</td>

                    <td>
                      {student.department}
                    </td>

                    <td>{student.year}</td>

                    <td>
                      <button
                        onClick={() =>
                          handleViewStudent(student)
                        }
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteStudent(
                            student.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {currentPage === "teachers" && <Teachers />}

      {currentPage === "courses" && <Courses />}

      {currentPage === "classrooms" && (
        <Classrooms />
      )}

      {currentPage === "assignments" && (
        <AcademicDataPage
          title="Assignments"
          endpoint="/assignments"
          columns={[
            {
              label: "Title",
              render: (item) => item.title || "-"
            },
            {
              label: "Description",
              render: (item) => item.description || "-"
            },
            {
              label: "Due Date",
              render: (item) => item.dueDate || "-"
            },
            {
              label: "Max Marks",
              render: (item) => item.maxMarks ?? "-"
            }
          ]}
        />
      )}

      {currentPage === "exams" && (
        <AcademicDataPage
          title="Examinations"
          endpoint="/exams"
          columns={[
            {
              label: "Exam",
              render: (item) => item.examName || "-"
            },
            {
              label: "Type",
              render: (item) => item.examType || "-"
            },
            {
              label: "Date",
              render: (item) => item.examDate || "-"
            },
            {
              label: "Total Marks",
              render: (item) => item.totalMarks ?? "-"
            },
            {
              label: "Duration",
              render: (item) => item.duration || "-"
            }
          ]}
        />
      )}

      {currentPage === "grades" && (
        <AcademicDataPage
          title="Grades"
          endpoint="/grades"
          columns={[
            {
              label: "Student",
              render: (item) => item.student?.name || "-"
            },
            {
              label: "Exam",
              render: (item) => item.exam?.examName || "-"
            },
            {
              label: "Marks",
              render: (item) => item.marksObtained ?? "-"
            },
            {
              label: "Grade",
              render: (item) => item.grade || "-"
            },
            {
              label: "Remarks",
              render: (item) => item.remarks || "-"
            }
          ]}
        />
      )}

      {currentPage === "attendance" && (
        <AcademicDataPage
          title="Attendance"
          endpoint="/attendance"
          columns={[
            {
              label: "Student",
              render: (item) => item.student?.name || "-"
            },
            {
              label: "Course",
              render: (item) =>
                item.classroom?.course?.courseName || "-"
            },
            {
              label: "Date",
              render: (item) => item.attendanceDate || "-"
            },
            {
              label: "Status",
              render: (item) => item.status || "-"
            }
          ]}
        />
      )}
    </AppShell>
  );
}

export default App;
