const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

export async function getStudents() {
  const response = await fetch(`${API_BASE_URL}/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export async function createStudent(student) {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
}
