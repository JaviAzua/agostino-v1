import "./globals.css";
import { Metadata } from "next";
import { env } from "../../env";

import "@fontsource-variable/dm-sans/index.css";
import "@fontsource-variable/darker-grotesque";
import CustomCursor from "@/components/cursor/custom-cursor";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Gonzalo Agostino | Professional Video Editor",
  description:
    "Unlock the power of storytelling with high-quality video editing. Transform your vision into stunning visuals with a professional touch.",
  keywords: [
    "video editor",
    "professional video editing",
    "cinematic",
    "motion graphics",
    "visual storytelling",
    "film editing",
    "content creation",
    "Gonzalo Agostino",
    "video editing services",
    "Adobe Premiere Pro",
    "DaVinci Resolve",
  ],
  openGraph: {
    title: "Gonzalo Agostino | Professional Video Editor",
    description:
      "Unlock the power of storytelling with high-quality video editing. Transform your vision into stunning visuals with a professional touch.",
    url: env.BASE_URL,
    siteName: "Gonzalo Agostino Portfolio",
    images: [
      {
        url: `${env.BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gonzalo Agostino Portfolio",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Agostino | Professional Video Editor",
    description:
      "Unlock the power of storytelling with high-quality video editing. Transform your vision into stunning visuals with a professional touch.",
    images: [`${env.BASE_URL}/og-image.jpg`],
  },
  robots: "index, follow",
  alternates: {
    canonical: env.BASE_URL,
  },
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },

    {
      url: "/favicon.ico",
      sizes: "any",
      rel: "icon",
    },
  ],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Gonzalo Agostino",
      url: env.BASE_URL,
      jobTitle: "Video Editor",
      image: `${env.BASE_URL}/og-image.jpg`,
    }),

    "link[rel='manifest']": "/site.webmanifest",
    "meta[name='theme-color']": "#121619",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor>{children}</CustomCursor>
        <Toaster />
      </body>
    </html>
  );
}
