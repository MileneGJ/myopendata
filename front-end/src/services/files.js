import api from "./api";

export async function listAll() {
  const response = await api.get("/files");
  return response.data;
}

export async function create(data) {
  const response = await api.post("/files", data);
  return response.data;
}
