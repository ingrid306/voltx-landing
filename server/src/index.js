import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDB();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`[server] VoltX API escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("[server] No se pudo iniciar:", err.message);
    process.exit(1);
  }
}

start();
