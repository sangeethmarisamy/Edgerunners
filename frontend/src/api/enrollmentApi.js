const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/enrollments`;

export async function getEnrollments() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }

  return response.json();
}

export async function createEnrollment(enrollment) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollment),
  });

  if (!response.ok) {
    throw new Error("Failed to create enrollment");
  }

  return response.json();
}

export async function getEnrollment(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch enrollment");
  }

  return response.json();
}

export async function deleteEnrollment(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete enrollment");
  }
}