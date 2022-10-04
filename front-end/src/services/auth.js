import api from "./api";

export async function signup(data) {
  return await api.post("/signup",data);
}

export async function signin(data) {
  return await api.post("/signin", data);
} 