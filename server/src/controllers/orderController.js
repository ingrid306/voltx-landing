import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { sendOrderConfirmationEmail } from "../utils/mailer.js";

const SHIPPING_COST = 4999;

export async function createOrder(req, res, next) {
  try {
    const { items, shipping, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío." });
    }
    if (!shipping?.fullName || !shipping?.address || !shipping?.city || !shipping?.postalCode) {
      return res.status(400).json({ message: "Faltan datos de envío." });
    }
    if (!paymentMethod) {
      return res.status(400).json({ message: "Falta el método de pago." });
    }

    // Recalculamos precios y validamos stock contra la base, nunca confiamos
    // en los precios que manda el cliente.
    const ids = items.map((i) => i.id ?? i.productId);
    const products = await Product.find({ id: { $in: ids } });
    const byId = Object.fromEntries(products.map((p) => [p.id, p]));

    const orderItems = [];
    for (const raw of items) {
      const productId = raw.id ?? raw.productId;
      const product = byId[productId];
      if (!product) {
        return res.status(400).json({ message: `Producto inexistente: ${productId}` });
      }
      if (raw.quantity < 1 || raw.quantity > product.stock) {
        return res.status(409).json({ message: `Stock insuficiente para ${product.name}.` });
      }
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: raw.quantity,
      });
    }

    const subtotal = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const total = subtotal + SHIPPING_COST;
    const orderNumber = `VX-${Date.now().toString().slice(-8)}`;

    const order = await Order.create({
      orderNumber,
      user: req.user._id,
      items: orderItems,
      shipping,
      paymentMethod,
      subtotal,
      shippingCost: SHIPPING_COST,
      total,
    });

    // Descuenta stock (best-effort, no transaccional: alcanza para este proyecto).
    await Promise.all(
      orderItems.map((i) => Product.updateOne({ id: i.productId }, { $inc: { stock: -i.quantity } }))
    );

    // Vacía el carrito del usuario tras la compra.
    req.user.cart = [];
    await req.user.save();

    sendOrderConfirmationEmail({ to: req.user.email, order }).catch((err) =>
      console.error("[mail] Error enviando confirmación:", err.message)
    );

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}
