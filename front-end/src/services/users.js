import createConfig from "../utils/createConfigApi";
import api from "./api";

export async function getUserNameById(token, id) {
  const config = createConfig(token);
  const response = await api.get(`/user?id=${id}`, config);
  return response.data;
}

export async function getUserData(token) {
  const config = createConfig(token);
  const response = await api.get(`/user`, config);
  return response.data;
}

export async function deleteUser(token) {
  const config = createConfig(token);
  await api.delete(`/user`, config);
}
