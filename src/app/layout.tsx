import "./globals.css";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Gonzalo Agostino",
  description:
    "Looking for a skilled video editor who can help you bring your vision to life? With years of experience in video editing and a background in cinematic arts, I have the skills and expertise to create visually stunning videos that communicate your message effectively.",
  openGraph: {
    title: "Gonzalo Agostino Portfolio",
    description:
      "Looking for a skilled video editor who can help you bring your vision to life? With years of experience in video editing and a background in cinematic arts, I have the skills and expertise to create visually stunning videos that communicate your message effectively.",
    images: [
      {
        url: "https://www.gonzaloagostino.com/thumbnail.png",
        alt: "Gonzalo Agostino Portfolio Thumbnail",
      },
    ],
    type: "profile",
    url: "https://www.gonzaloagostino.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.className} bg-blackB text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
