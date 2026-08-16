const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export async function getExams() {
  const response = await fetch(`${API_URL}/exams`);

  if (!response.ok) {
    throw new Error("Failed to load exams");
  }

  return response.json();
}

export async function createExam(exam) {
  const response = await fetch(`${API_URL}/exams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exam),
  });

  if (!response.ok) {
    throw new Error("Failed to create exam");
  }

  return response.json();
}

export async function deleteExam(id) {
  const response = await fetch(`${API_URL}/exams/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete exam");
  }
}