import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import Compress from "astro-compress";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "astro/config";

import { manifest, seoConfig } from "./seo-config";

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  integrations: [
    react(),
    prefetch({
      // Prefetch all pages in the /blog directory
      include: ["/**"],
    }),
    sitemap(),
    Compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 10000000,
    },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        manifest,

        workbox: {
          globDirectory: "dist",
          globPatterns: [
            "**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
          ],
          // Don't fallback on document based (e.g. `/some-page`) requests
          // This removes an errant console.log message from showing up.
          navigateFallback: null,
          maximumFileSizeToCacheInBytes: 10000000,
        },
      }),
    ],
  },
});
