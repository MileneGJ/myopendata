import api from "./api";

export async function listAll(token) {
  const config = createConfig(token)
  const response = await api.get("/files",config);
  return response.data;
}

export async function create(token,data) {
  const config = createConfig(token)
  const response = await api.post("/files", config, data);
  return response.data;
}

function createConfig(token) {
  return {
    headers:{
      authorization: `Bearer ${token}`
    }
  }
}