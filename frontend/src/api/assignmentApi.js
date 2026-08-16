const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export async function getAssignments() {
  const response = await fetch(`${API_URL}/assignments`);

  if (!response.ok) {
    throw new Error("Failed to load assignments");
  }

  return response.json();
}

export async function createAssignment(assignment) {
  const response = await fetch(`${API_URL}/assignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignment),
  });

  if (!response.ok) {
    throw new Error("Failed to create assignment");
  }

  return response.json();
}

export async function deleteAssignment(id) {
  const response = await fetch(`${API_URL}/assignments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete assignment");
  }
}