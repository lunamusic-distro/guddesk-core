import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "GudDesk",
      formats: ["umd", "es"],
      fileName: (format) =>
        format === "umd" ? "guddesk.umd.cjs" : "guddesk.js",
    },
    rollupOptions: {
      external: ["pusher-js"],
      output: {
        inlineDynamicImports: true,
        globals: {
          "pusher-js": "Pusher",
        },
      },
    },
    minify: "esbuild",
    target: "es2020",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
