import { useEffect, useState } from "react";
import {
  getExams,
  createExam,
  deleteExam,
} from "../api/examApi";

function Exams() {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    examName: "",
    examType: "INTERNAL",
    examDate: "",
    totalMarks: "",
    duration: "",
    classroomId: "",
  });

  async function loadExams() {
    try {
      setLoading(true);
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load exams");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExams();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const exam = {
        examName: formData.examName,
        examType: formData.examType,
        examDate: formData.examDate,
        totalMarks: Number(formData.totalMarks),
        duration: formData.duration,
        classroom: {
          id: Number(formData.classroomId),
        },
      };

      const createdExam = await createExam(exam);

      setExams([...exams, createdExam]);

      setFormData({
        examName: "",
        examType: "INTERNAL",
        examDate: "",
        totalMarks: "",
        duration: "",
        classroomId: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create exam");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this exam?")) return;

    try {
      await deleteExam(id);

      setExams(
        exams.filter((exam) => exam.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete exam");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Examinations</h1>
          <p>Manage academic examinations.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Add Exam
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>Add Exam</h2>

          <input
            type="text"
            name="examName"
            placeholder="Exam Name"
            value={formData.examName}
            onChange={handleChange}
            required
          />

          <select
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
          >
            <option value="INTERNAL">INTERNAL</option>
            <option value="SEMESTER">SEMESTER</option>
          </select>

          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="totalMarks"
            placeholder="Total Marks"
            value={formData.totalMarks}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 2 Hours)"
            value={formData.duration}
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
          Loading exams...
        </div>
      ) : exams.length === 0 ? (
        <div className="dashboard-message">
          No exams available.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Type</th>
              <th>Date</th>
              <th>Total Marks</th>
              <th>Duration</th>
              <th>Classroom</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.examName}</td>
                <td>{exam.examType}</td>
                <td>{exam.examDate}</td>
                <td>{exam.totalMarks}</td>
                <td>{exam.duration}</td>
                <td>
                  {exam.classroom?.id ?? "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(exam.id)}
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

export default Exams;