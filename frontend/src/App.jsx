import { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "./api/studentApi";
import AppShell from "./components/AppShell";
import "./App.css";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Classrooms from "./pages/Classrooms";
import Enrollments from "./pages/Enrollments";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Exams from "./pages/Exams";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("students");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registerNumber: "",
    department: "",
    year: "",
  });

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    }

    loadStudents();
  }, []);

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

      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  }
  function handleViewStudent(student) {
    setSelectedStudent(student);
  }
  return (
    <AppShell currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === "students" && (
        <div className="app">
          <div className="page-header">
            <div>
              <h1>Students</h1>
              <p>Manage students in the Academic Intelligence Platform.</p>
            </div>

            <button onClick={() => setShowForm(true)}>Add Student</button>
          </div>

          {showForm && (
            <form className="student-form" onSubmit={handleAddStudent}>
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
                <button type="submit">Add</button>

                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
          {selectedStudent && (
            <div className="student-details">
              <h2>Student Details</h2>

              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>

              <p>
                <strong>Register Number:</strong>{" "}
                {selectedStudent.registerNumber}
              </p>

              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>

              <p>
                <strong>Department:</strong> {selectedStudent.department}
              </p>

              <p>
                <strong>Year:</strong> {selectedStudent.year}
              </p>

              <button onClick={() => setSelectedStudent(null)}>Close</button>
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
                  <td>{student.registerNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>

                  <td>
                    <button onClick={() => handleViewStudent(student)}>
                      View
                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)}>
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
      {currentPage === "classrooms" && <Classrooms />}
      {currentPage === "enrollments" && <Enrollments />}
      {currentPage === "attendance" && <Attendance />}
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "assignments" && <Assignments />}
      {currentPage === "exams" && <Exams />}
    </AppShell>
  );
}

export default App;
