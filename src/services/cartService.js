import api from "./api.js";

// Reemplaza todo el carrito en el servidor con el estado local actual.
export async function syncCart(items) {
  const data = await api.put("/cart", { items });
  return data.items;
}

export async function fetchCart() {
  const data = await api.get("/cart");
  return data.items;
}

export async function removeCartItemApi(productId) {
  const data = await api.delete(`/cart/${productId}`);
  return data.items;
}

export async function clearCartApi() {
  const data = await api.delete("/cart");
  return data.items;
}
