import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * Replaces @lovable.dev/vite-tanstack-config.
 *
 * tanstackStart() already bundles:
 *   @vitejs/plugin-react, @tanstack/router-plugin, nitro (SSR/edge build)
 * so we do NOT add those separately — doing so causes duplicate-plugin
 * errors exactly as the old comment warned.
 *
 * Node version: use Node 24 or 26 (both satisfy @tanstack/react-start's
 * >=22.12.0 requirement). Node 20 will NOT work with this version.
 */
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
