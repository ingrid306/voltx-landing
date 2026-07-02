import Product from "../models/Product.js";

async function hydrateCart(rawItems) {
  if (rawItems.length === 0) return [];
  const ids = rawItems.map((i) => i.productId);
  const products = await Product.find({ id: { $in: ids } });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  return rawItems
    .filter((i) => byId[i.productId])
    .map((i) => {
      const p = byId[i.productId];
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        stock: p.stock,
        quantity: Math.min(i.quantity, p.stock),
      };
    });
}

export async function getCart(req, res, next) {
  try {
    const items = await hydrateCart(req.user.cart);
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

// Reemplaza el carrito completo del usuario (estrategia simple de sincronización).
export async function replaceCart(req, res, next) {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "El campo 'items' debe ser un array." });
    }

    req.user.cart = items
      .filter((i) => i.id && i.quantity > 0)
      .map((i) => ({ productId: i.id, quantity: i.quantity }));

    await req.user.save();
    const hydrated = await hydrateCart(req.user.cart);
    res.json({ items: hydrated });
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    req.user.cart = req.user.cart.filter((i) => i.productId !== req.params.productId);
    await req.user.save();
    const hydrated = await hydrateCart(req.user.cart);
    res.json({ items: hydrated });
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    req.user.cart = [];
    await req.user.save();
    res.json({ items: [] });
  } catch (err) {
    next(err);
  }
}
