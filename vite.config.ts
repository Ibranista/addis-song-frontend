import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "https://addis-song-backend.onrender.com/",
        target: "http://localhost:8000",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
