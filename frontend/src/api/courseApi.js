const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

export async function getCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`);

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

export async function createCourse(course) {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error("Failed to create course");
  }

  return response.json();
}

export async function deleteCourse(id) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
}