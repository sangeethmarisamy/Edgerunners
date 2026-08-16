import { useEffect, useState } from "react";
import {
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
} from "../api/enrollmentApi";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    enrollmentDate: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadEnrollments();
  }, []);

  async function loadEnrollments() {
    try {
      const data = await getEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const enrollment = {
        student: {
          id: Number(formData.studentId),
        },
        course: {
          id: Number(formData.courseId),
        },
        enrollmentDate: formData.enrollmentDate,
        status: formData.status,
      };

      const created = await createEnrollment(enrollment);

      setEnrollments([...enrollments, created]);
      setShowForm(false);

      setFormData({
        studentId: "",
        courseId: "",
        enrollmentDate: "",
        status: "ACTIVE",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create enrollment");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEnrollment(id);
      setEnrollments(
        enrollments.filter((enrollment) => enrollment.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete enrollment");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Enrollments</h1>
          <p>Manage student course enrollments.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Add Enrollment
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Add Enrollment</h2>

          <input
            type="number"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="courseId"
            placeholder="Course ID"
            value={formData.courseId}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <button type="submit">Add</button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.student?.id}</td>
              <td>{enrollment.course?.id}</td>
              <td>{enrollment.enrollmentDate}</td>
              <td>{enrollment.status}</td>
              <td>
                <button
                  onClick={() => {
                    alert(
                      `Enrollment #${enrollment.id}\nStudent: ${enrollment.student?.id}\nCourse: ${enrollment.course?.id}\nStatus: ${enrollment.status}`
                    );
                  }}
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(enrollment.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enrollments;