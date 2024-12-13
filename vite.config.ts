import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: false,
  },
});
