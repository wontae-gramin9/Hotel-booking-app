import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
});
