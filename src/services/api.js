// Cliente HTTP centralizado.
// En desarrollo usa el proxy de Vite (/api → localhost:4000/api), así que
// BASE_URL queda vacío. En producción, se lee VITE_API_URL.

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

function getToken() {
  try {
    return localStorage.getItem("voltx_token") || null;
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("voltx_token", token);
  } else {
    localStorage.removeItem("voltx_token");
  }
}

async function request(method, path, body) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

const api = {
  get:    (path)        => request("GET",    path),
  post:   (path, body)  => request("POST",   path, body),
  put:    (path, body)  => request("PUT",    path, body),
  delete: (path)        => request("DELETE", path),
};

export default api;
