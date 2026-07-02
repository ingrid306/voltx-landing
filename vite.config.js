import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En desarrollo: /api/* → http://localhost:4000/api/*
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
