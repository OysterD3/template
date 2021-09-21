import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [solidPlugin(), WindiCSS()],
  server: {
    host: "local.astrox.io",
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
