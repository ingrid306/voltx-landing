import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import { products } from "./products.source.js";

async function run() {
  await connectDB();

  console.log(`[seed] Insertando ${products.length} productos...`);

  for (const p of products) {
    await Product.findOneAndUpdate({ id: p.id }, p, { upsert: true, new: true });
  }

  console.log("[seed] Listo. Catálogo cargado en MongoDB.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] Error:", err.message);
  process.exit(1);
});
