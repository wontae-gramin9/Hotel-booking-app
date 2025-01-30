import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsxInject: `import * as React from "react"`,
  },
  test: {
    environment: "jsdom",
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
