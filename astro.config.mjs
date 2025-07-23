import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import node from "@astrojs/node";
import svgr from 'vite-plugin-svgr';
import { defineConfig } from "astro/config";


export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss(), svgr()],
  },
  integrations: [react()],
});

if (import.meta.env.DEV) {
  if (typeof process !== 'undefined') {
    const { server } = await import('./src/mocks/server');
    server.listen();
    console.log('MSW server mocks started.')
  }
}