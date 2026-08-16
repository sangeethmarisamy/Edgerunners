const API_URL =
  "https://gxgwv1bd-8080.inc1.devtunnels.ms/api/classrooms";

export async function getClassrooms() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch classrooms");
  }

  return response.json();
}

export async function createClassroom(classroom) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classroom),
  });

  if (!response.ok) {
    throw new Error("Failed to create classroom");
  }

  return response.json();
}

export async function deleteClassroom(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete classroom");
  }
}