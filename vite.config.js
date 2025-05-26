import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  //Proxy to avoid CORS, remove later
  server: {
    proxy: {
      "/backend_proxy": {
        target: "https://livetune-be-test.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend_proxy/, ""),
      },
    },
  },
});
