const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export async function getStudentDashboard(studentId) {
  const response = await fetch(
    `${API_URL}/students/${studentId}/dashboard`
  );

  if (!response.ok) {
    throw new Error(`Dashboard request failed: ${response.status}`);
  }

  return response.json();
}