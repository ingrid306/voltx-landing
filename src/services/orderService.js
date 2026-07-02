import api from "./api.js";

export async function createOrder({ items, shipping, paymentMethod }) {
  const data = await api.post("/orders", { items, shipping, paymentMethod });
  return data.order;
}

export async function fetchOrders() {
  const data = await api.get("/orders");
  return data.orders;
}
