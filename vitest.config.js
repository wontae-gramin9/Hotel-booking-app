import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
