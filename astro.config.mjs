import node from "@astrojs/node";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import Compress from "astro-compress";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "astro/config";

import { manifest, seoConfig } from "./src/utils/seo-config";

const isDocker = process.env.CONTAINER === "true";
const isDev = process.env.NODE_ENV === "development";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: !isDocker
    ? vercel({
        edgeMiddleware: {
          priority: "high",
          handlers: [
            {
              route: "/(.*)",
              handler: "cache",
              options: {
                cacheKey: "astro-cache",
                edge: {
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
                },
                browser: {
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  serviceWorkerSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
      })
    : node({
        mode: "standalone",
      }),
  site: seoConfig.baseURL,
  compressHTML: true,
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
        disable: isDev,
        manifest,
        workbox: {
          globDirectory: isDocker ? "./dist/client" : "./.vercel/output/static",
          globPatterns: [
            "**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
          ],
          // Don't fallback on document based (e.g. `/some-page`) requests
          // This removes an errant console.log message from showing up.
          navigateFallback: null,
          inlineWorkboxRuntime: true,
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 20,

                  // 30 days
                  maxAgeSeconds: 30 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,

                  // Only cache 10 images.
                  maxEntries: 10,

                  // Cache for a maximum of a week.
                  maxAgeSeconds: 7 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,
                },
              },
            },
            {
              urlPattern: /\.(?:js|css)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-resources",
                expiration: {
                  maxEntries: 20,

                  // 30 days
                  maxAgeSeconds: 30 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,

                  // Only cache 10 images.
                  maxEntries: 10,

                  // Cache for a maximum of a week.
                  maxAgeSeconds: 7 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,
                },
              },
            },
            {
              urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "fonts",
                expiration: {
                  maxEntries: 20,

                  // 30 days
                  maxAgeSeconds: 30 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,

                  // Only cache 10 images.
                  maxEntries: 10,

                  // Cache for a maximum of a week.
                  maxAgeSeconds: 7 * 24 * 60 * 60,

                  // Automatically cleanup if quota is exceeded.
                  purgeOnQuotaError: true,
                },
              },
            },
          ],
        },
      }),
    ],
  },
});
