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
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: false,
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.105.102:5050",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (p) => p.replace(/^\/api/, ""),
    //   },
    // },
  },
});
