import { useEffect, useState } from "react";
import {
  getCourses,
  createCourse,
  deleteCourse,
} from "../api/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    credits: "",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleAddCourse(event) {
    event.preventDefault();

    try {
      const course = {
        courseCode: formData.courseCode,
        courseName: formData.courseName,
        department: formData.department,
        credits: Number(formData.credits),
      };

      const createdCourse = await createCourse(course);

      setCourses([...courses, createdCourse]);

      setFormData({
        courseCode: "",
        courseName: "",
        department: "",
        credits: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add course");
    }
  }

  async function handleDeleteCourse(id) {
    if (!window.confirm("Delete this course?")) {
      return;
    }

    try {
      await deleteCourse(id);

      setCourses(
        courses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete course");
    }
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p>Manage academic courses and subjects.</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          Add Course
        </button>
      </div>

      {showForm && (
        <form
          className="student-form"
          onSubmit={handleAddCourse}
        >
          <h2>Add Course</h2>

          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={formData.courseName}
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
            name="credits"
            placeholder="Credits"
            min="1"
            value={formData.credits}
            onChange={handleChange}
            required
          />

          <div>
            <button type="submit">Add</button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {selectedCourse && (
        <div className="student-details">
          <h2>Course Details</h2>

          <p>
            <strong>Course Code:</strong>{" "}
            {selectedCourse.courseCode}
          </p>

          <p>
            <strong>Course Name:</strong>{" "}
            {selectedCourse.courseName}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {selectedCourse.department}
          </p>

          <p>
            <strong>Credits:</strong>{" "}
            {selectedCourse.credits}
          </p>

          <button
            onClick={() => setSelectedCourse(null)}
          >
            Close
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.department}</td>
              <td>{course.credits}</td>

              <td>
                <button
                  onClick={() =>
                    setSelectedCourse(course)
                  }
                >
                  View
                </button>

                <button
                  onClick={() =>
                    handleDeleteCourse(course.id)
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
  );
}

export default Courses;