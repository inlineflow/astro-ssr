import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [tailwindcss(), svgr()],
  },
  integrations: [react()],
  i18n: {
    locales: ["ru", "kg", "en"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  site: "https://example.com",
  server: {
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "astro-ssr-falling-resonance-9559.fly.dev",
      // 'all'
    ],
  },
});

if (import.meta.env.DEV) {
  if (typeof process !== "undefined") {
    const { server } = await import("./src/mocks/server");
    server.listen();
    console.log("MSW server mocks started.");
  }
}
