export const dynamic = "force-dynamic";

import "./globals.css";
import { Metadata } from "next";
import { env } from "../../env";
import { client } from "@/sanity/client";
import { AboutType, BannerType, ReviewsType, VideoGridType } from "@/types";
import { HOMEPAGE_QUERY } from "@/lib/queries";
import HomeSection from "@/components/sections/HomeSection";
import VideoGridSection from "@/components/sections/VideoGridSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

import "@fontsource-variable/dm-sans/index.css";
import "@fontsource-variable/darker-grotesque";
import CustomCursor from "@/components/cursor/custom-cursor";

export const metadata: Metadata = {
  title: "Gonzalo Agostino | Professional Video Editor",
  description:
    "Unlock the power of storytelling with high-quality video editing. Transform your vision into stunning visuals with a professional touch.",
  keywords: [
    "video editor",
    "professional video editing",
    "cinematic editing",
    "post-production",
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
      url: "/favicon-dark.ico",
      media: "(prefers-color-scheme: dark)",
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
  ],
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Gonzalo Agostino",
      url: env.BASE_URL,
      jobTitle: "Video Editor",
      image: `${env.BASE_URL}/profile.webp`,
    }),
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
  const { /*about,reviews, */ videoGrid, banner } = await client.fetch<{
    videoGrid: VideoGridType[];
    about: AboutType[];
    banner: BannerType[];
    reviews: ReviewsType[];
  }>(HOMEPAGE_QUERY, {}, { next: { revalidate: 604800 } });

  return (
    <html lang="en">
      <body>
        <CustomCursor>
          <main>
            <HomeSection data={banner} />
            <VideoGridSection data={videoGrid} />
            <AboutSection /* data={about} isNight={isNight} */ />
            <ContactSection /* data={reviews} isNight={isNight}  */ />
            {children}
          </main>
        </CustomCursor>
      </body>
    </html>
  );
}
