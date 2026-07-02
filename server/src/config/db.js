import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Falta MONGODB_URI en las variables de entorno (.env).");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  console.log(`[db] Conectado a MongoDB -> ${mongoose.connection.name}`);

  mongoose.connection.on("error", (err) => {
    console.error("[db] Error de conexión:", err.message);
  });
}
