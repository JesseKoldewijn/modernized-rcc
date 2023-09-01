export const appConfig = {
  nav: {
    title: "Modernized RCC",
    links: [
      {
        name: "Home",
        href: "/",
      },
      { name: "React RCC", href: "/react-rcc" },
      { name: "jQuery", href: "/jquery" },
    ],
  },
  meta: {
    baseUrl: "https://modernized-rcc.vercel.app",
    title: {
      branding: "Modernized RCC",
      separator: " | ",
      specific: {
        "react-rcc": "React.js RCC",
        "jquery-actions": "jQuery Actions",
        "404": "Page Not Found",
      },
    },
    desc: {
      default:
        "Modernized RCC - A modernized React.js Class Components based website using Astro.js to attach all components together.",
      specific: {},
    },
    openGraph: {
      desc: "Modernized RCC - A modernized React.js Class Components based website using Astro.js to attach all components together.",
      image: {
        url: "/favicon.ico",
        alt: "OpenGraph thumbnail description.",
        width: 1200,
        height: 630,
      },
    },
  },
} as const;

export type PageTitle = keyof (typeof appConfig)["meta"]["title"]["specific"];
