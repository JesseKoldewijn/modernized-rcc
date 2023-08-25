// Type imports
import type { TwitterCardType } from "astro-seo";
import type { ManifestOptions } from "vite-plugin-pwa";

import { appConfig } from "../config/app";

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
  baseURL: appConfig.meta.baseUrl, // Change this to your production URL.
  description: appConfig.meta.desc.default, // Change this to be your website's description.
  type: "website",
  image: appConfig.meta.openGraph.image,
  siteName: appConfig.meta.title.branding, // Change this to your website's name,
  twitter: {
    card: "summary_large_image" as TwitterCardType,
  },
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
  name: appConfig.meta.title.branding,
  short_name: appConfig.meta.title.branding,
  description: appConfig.meta.desc.default,
  start_url: "/",
  theme_color: "#30E130",
  background_color: "#ffffff",
  display: "standalone",
  icons: [
    {
      src: "/favicon.ico",
      sizes: "192x192",
      type: "image/ico",
    },
    {
      src: "/favicon.ico",
      sizes: "512x512",
      type: "image/ico",
    },
    {
      src: "/favicon.ico",
      sizes: "512x512",
      type: "image/ico",
      purpose: "any maskable",
    },
  ],
};
