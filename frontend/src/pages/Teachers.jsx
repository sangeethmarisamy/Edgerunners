import { useEffect, useState } from "react";
import { getTeachers, createTeacher, deleteTeacher } from "../api/teacherApi";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to load teachers:", error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleAddTeacher(event) {
    event.preventDefault();

    try {
      const teacher = {
        name: formData.name,
        email: formData.email,
        employeeId: formData.employeeId,
        department: formData.department,
        designation: formData.designation,
      };

      const createdTeacher = await createTeacher(teacher);

      setTeachers([...teachers, createdTeacher]);

      setFormData({
        name: "",
        email: "",
        employeeId: "",
        department: "",
        designation: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add teacher");
    }
  }

  async function handleDeleteTeacher(id) {
    if (!window.confirm("Delete this teacher?")) {
      return;
    }

    try {
      await deleteTeacher(id);

      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete teacher");
    }
  }
  function handleViewTeacher(teacher) {
    setSelectedTeacher(teacher);
  }
  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Teachers</h1>
          <p>Manage faculty and teaching staff.</p>
        </div>

        <button onClick={() => setShowForm(true)}>Add Teacher</button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleAddTeacher}>
          <h2>Add Teacher</h2>

          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
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
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
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
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
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
      {selectedTeacher && (
        <div className="student-details">
          <h2>Teacher Details</h2>

          <p>
            <strong>Name:</strong> {selectedTeacher.name}
          </p>

          <p>
            <strong>Employee ID:</strong> {selectedTeacher.employeeId}
          </p>

          <p>
            <strong>Department:</strong> {selectedTeacher.department}
          </p>

          <p>
            <strong>Designation:</strong> {selectedTeacher.designation}
          </p>

          <button onClick={() => setSelectedTeacher(null)}>Close</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.employeeId}</td>
              <td>{teacher.department}</td>
              <td>{teacher.designation}</td>

              <td>
                <button onClick={() => handleViewTeacher(teacher)}>View</button>

                <button onClick={() => handleDeleteTeacher(teacher.id)}>
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

export default Teachers;
