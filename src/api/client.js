import { fetchFromFakeDB } from "./fake-backend.js";

export async function client(endpoint, { data, method, token }) {
  const config = {
    url: endpoint,
    method,
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
    },
  };
  const response = await fetchFromFakeDB(config).json();
  return response;
}
