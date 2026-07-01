/*import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
const __dirname = fileURLToPath(new URL(".", import.meta.url));


export default defineConfig({
  plugins: [
    tanstackStart({
      // Keep the custom SSR error-wrapper server entry (src/server.ts).
      server: { entry: "server" },
      // Build for Cloudflare Pages (Workers runtime + static assets).
      target: "vercel",
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent duplicate React / Router copies in the bundle.
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  server: {
    port: 8080,
    host: true,
    strictPort: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
*/

import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Pure SPA build — no SSR, no Nitro server.
// TanStackRouterVite handles file-based routing client-side.
// For a portfolio site this is simpler, faster to deploy, and works
// perfectly on Vercel as static files.
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 8080,
    host: true,
    strictPort: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});