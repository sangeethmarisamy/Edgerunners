import { useEffect, useState } from "react";
import {
  getAssignments,
  createAssignment,
  deleteAssignment,
} from "../api/assignmentApi";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxMarks: "",
    classroomId: "",
  });

  async function loadAssignments() {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const assignment = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        maxMarks: Number(formData.maxMarks),
        classroom: {
          id: Number(formData.classroomId),
        },
      };

      const created = await createAssignment(assignment);

      setAssignments([...assignments, created]);

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        maxMarks: "",
        classroomId: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create assignment");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this assignment?")) return;

    try {
      await deleteAssignment(id);

      setAssignments(
        assignments.filter((assignment) => assignment.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete assignment");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Assignments</h1>
          <p>Manage academic assignments.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Add Assignment
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Add Assignment</h2>

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="maxMarks"
            placeholder="Maximum Marks"
            value={formData.maxMarks}
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

          <button type="submit">Add</button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {loading ? (
        <div className="dashboard-message">
          Loading assignments...
        </div>
      ) : assignments.length === 0 ? (
        <div className="dashboard-message">
          No assignments available.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Max Marks</th>
              <th>Classroom</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.dueDate}</td>
                <td>{assignment.maxMarks}</td>
                <td>
                  {assignment.classroom?.id ?? "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(assignment.id)}
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

export default Assignments;