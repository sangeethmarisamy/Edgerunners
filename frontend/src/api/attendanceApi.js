const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/attendance`;

export async function getAttendance() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch attendance");
  }

  return response.json();
}

export async function createAttendance(attendance) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendance),
  });

  if (!response.ok) {
    throw new Error("Failed to mark attendance");
  }

  return response.json();
}

export async function getAttendanceById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch attendance record");
  }

  return response.json();
}

export async function deleteAttendance(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete attendance");
  }
}