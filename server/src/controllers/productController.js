import Product from "../models/Product.js";

export async function listProducts(req, res, next) {
  try {
    const { category, sort } = req.query;
    const filter = {};
    if (category && category !== "all") filter.category = category;

    let query = Product.find(filter);

    switch (sort) {
      case "price-asc":
        query = query.sort({ price: 1 });
        break;
      case "price-desc":
        query = query.sort({ price: -1 });
        break;
      case "rating":
        query = query.sort({ rating: -1 });
        break;
      default:
        break;
    }

    const products = await query.exec();
    res.json({ products });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
}
