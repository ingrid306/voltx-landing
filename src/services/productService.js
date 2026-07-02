import api from "./api.js";

export async function fetchProducts({ category, sort } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (sort) params.set("sort", sort);
  const qs = params.toString();
  const data = await api.get(`/products${qs ? `?${qs}` : ""}`);
  return data.products;
}

export async function fetchProductById(id) {
  const data = await api.get(`/products/${id}`);
  return data.product;
}
