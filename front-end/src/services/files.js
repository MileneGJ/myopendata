import createConfig from "../utils/createConfigApi";
import api from "./api";

export async function listAll(token) {
  const config = createConfig(token)
  const response = await api.get("/files",config);
  return response.data;
}

export async function listByField(token,search) {
  const config = createConfig(token)
  const response = await api.get(`/files?${search.field}=${search.content}`,config);
  return response.data;
}

export async function create(token,data) {
  const config = createConfig(token)
  const response = await api.post("/files", data, config);
  return response.data;
}

export async function getFileById(token,id) {
  const config = createConfig(token)
  const response = await api.get(`/files/${id}`,config);
  return response.data;
}

export async function createFileData(token, data, onUploadProgress) {
  const config = createConfig(token)
  config.onUploadProgress = onUploadProgress
  const response = await api.post("/filedata", data, config);
  return response.data;
}