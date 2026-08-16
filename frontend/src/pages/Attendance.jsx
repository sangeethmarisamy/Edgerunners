import { useEffect, useState } from "react";
import {
  getAttendance,
  createAttendance,
  deleteAttendance,
} from "../api/attendanceApi";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    classroomId: "",
    attendanceDate: "",
    status: "PRESENT",
  });

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    try {
      setError("");
      const data = await getAttendance();
      setRecords(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load attendance records.");
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const attendance = {
        student: {
          id: Number(formData.studentId),
        },
        classroom: {
          id: Number(formData.classroomId),
        },
        attendanceDate: formData.attendanceDate,
        status: formData.status,
      };

      const created = await createAttendance(attendance);

      setRecords([...records, created]);
      setShowForm(false);

      setFormData({
        studentId: "",
        classroomId: "",
        attendanceDate: "",
        status: "PRESENT",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAttendance(id);

      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete attendance");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Monitor and manage student attendance.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Mark Attendance
        </button>
      </div>

      {error && (
        <div className="student-details">
          <strong>{error}</strong>
          <br />
          <button onClick={loadAttendance}>Retry</button>
        </div>
      )}

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Mark Attendance</h2>

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
            name="classroomId"
            placeholder="Classroom ID"
            value={formData.classroomId}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="attendanceDate"
            value={formData.attendanceDate}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PRESENT">PRESENT</option>
            <option value="ABSENT">ABSENT</option>
          </select>

          <br /><br />

          <button type="submit">Save</button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {records.length === 0 && !error ? (
        <div className="student-details">
          <h2>No attendance records</h2>
          <p>There are currently no attendance records.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Classroom</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.student?.id}</td>
                <td>{record.classroom?.id}</td>
                <td>{record.attendanceDate}</td>
                <td>{record.status}</td>

                <td>
                  <button
                    onClick={() =>
                      alert(
                        `Attendance #${record.id}\n` +
                        `Student: ${record.student?.id}\n` +
                        `Classroom: ${record.classroom?.id}\n` +
                        `Date: ${record.attendanceDate}\n` +
                        `Status: ${record.status}`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;