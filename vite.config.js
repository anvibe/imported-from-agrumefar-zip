import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

// Generated project files use .js extensions for JSX (matching the live preview sandbox).
// Vite's dev server can be told to treat .js as JSX via esbuild options, but "vite build"
// runs source through Rollup's import analysis first, which doesn't know JSX — so a plugin
// that runs esbuild's own JSX transform ahead of that step is needed for the production build
// to work too, not just local "vite dev".
function jsxInJs() {
  return {
    name: "jsx-in-js",
    async transform(code, id) {
      if (!id.match(/\/src\/.*\.js$/)) return null;
      return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" });
    },
  };
}

export default defineConfig({
  plugins: [jsxInJs(), react()],
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
});
