const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

export async function getTeachers() {
  const response = await fetch(`${API_BASE_URL}/teachers`);

  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }

  return response.json();
}

export async function createTeacher(teacher) {
  const response = await fetch(`${API_BASE_URL}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  });

  if (!response.ok) {
    throw new Error("Failed to create teacher");
  }

  return response.json();
}

export async function deleteTeacher(id) {
  const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete teacher");
  }
}