const API_BASE_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api";

export async function getStudentDashboard(studentId) {
  const response = await fetch(
    `${API_BASE_URL}/students/${studentId}/dashboard`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load student dashboard: ${response.status}`
    );
  }

  return response.json();
}
