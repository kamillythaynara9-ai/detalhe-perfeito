// Build próprio (sem Lovable): gera o site como arquivos estáticos prontos
// para a Vercel. BASE = endereço onde o site fica publicado.
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const BASE = process.env["SITE_BASE"] ?? "/";

export default defineConfig({
  base: BASE,
  server: { host: "127.0.0.1" },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      router: { basepath: BASE },
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: false },
      pages: [{ path: "/" }],
    }),
    viteReact(),
  ],
});
