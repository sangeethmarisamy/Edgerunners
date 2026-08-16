import { useEffect, useState } from "react";
import {
  getClassrooms,
  createClassroom,
  deleteClassroom,
} from "../api/classroomApi";

function Classrooms() {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    section: "",
    semester: "",
    academicYear: "",
    roomNumber: "",
    schedule: "",
    courseId: "",
    teacherId: "",
  });

  useEffect(() => {
    loadClassrooms();
  }, []);

  async function loadClassrooms() {
    try {
      const data = await getClassrooms();
      setClassrooms(data);
    } catch (error) {
      console.error("Failed to load classrooms:", error);
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
      const classroom = {
        className: formData.className,
        section: formData.section,
        semester: formData.semester,
        academicYear: formData.academicYear,
        roomNumber: formData.roomNumber,
        schedule: formData.schedule,
        course: {
          id: Number(formData.courseId),
        },
        teacher: {
          id: Number(formData.teacherId),
        },
      };

      const created = await createClassroom(classroom);

      setClassrooms([...classrooms, created]);
      setShowForm(false);

      setFormData({
        className: "",
        section: "",
        semester: "",
        academicYear: "",
        roomNumber: "",
        schedule: "",
        courseId: "",
        teacherId: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add classroom");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteClassroom(id);
      setClassrooms(classrooms.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete classroom");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Classrooms</h1>
          <p>Manage classes, schedules and academic sections.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Add Classroom
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Add Classroom</h2>

          <input
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            required
          />

          <input
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleChange}
            required
          />

          <input
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />

          <input
            name="academicYear"
            placeholder="Academic Year"
            value={formData.academicYear}
            onChange={handleChange}
            required
          />

          <input
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />

          <input
            name="schedule"
            placeholder="Schedule"
            value={formData.schedule}
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
            type="number"
            name="teacherId"
            placeholder="Teacher ID"
            value={formData.teacherId}
            onChange={handleChange}
            required
          />

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
            <th>Class</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Academic Year</th>
            <th>Room</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id}>
              <td>{classroom.className}</td>
              <td>{classroom.section}</td>
              <td>{classroom.semester}</td>
              <td>{classroom.academicYear}</td>
              <td>{classroom.roomNumber}</td>
              <td>{classroom.schedule}</td>
              <td>
                <button
                  onClick={() => handleDelete(classroom.id)}
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

export default Classrooms;