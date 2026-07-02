import api, { setToken } from "./api.js";

export async function register({ firstName, lastName, email, password }) {
  const data = await api.post("/auth/register", { firstName, lastName, email, password });
  setToken(data.token);
  return data.user;
}

export async function login({ email, password }) {
  const data = await api.post("/auth/login", { email, password });
  setToken(data.token);
  return data.user;
}

export async function fetchMe() {
  const data = await api.get("/auth/me");
  return data.user;
}

export function logout() {
  setToken(null);
}
