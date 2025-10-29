import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ React Router ke liye history fallback enable kiya gaya
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
});
