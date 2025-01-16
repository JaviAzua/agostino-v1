"use client";

import { useRef, useEffect, useState } from "react";
import { AboutT, BannerT, ReviewsT, VideoGridT } from "@/types";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./header"), { ssr: false });
const ReelPage = dynamic(() => import("./reel-page"), { ssr: false });
const AboutServer = dynamic(() => import("./about"), { ssr: false });
const ProjectsGrid = dynamic(() => import("./projects-grid"), { ssr: false });
const ReviewsAndContact = dynamic(() => import("./reviews-and-contact"), {
  ssr: false,
});
const Footer = dynamic(() => import("./footer"), { ssr: false });

interface PageProps {
  bannerImg: BannerT[];
  videoGrid: VideoGridT[];
  aboutDB: AboutT[];
  reviewsDB: ReviewsT[];
}

export default function ClientMainPage({
  bannerImg,
  videoGrid,
  aboutDB,
  reviewsDB,
}: PageProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="h-dvh overflow-hidden bg-blackB">
      <Header scrollContainer={mainRef} />
      <main
        ref={mainRef}
        className="h-dvh overflow-y-auto lg:snap-y lg:snap-mandatory"
      >
        <section
          id="reel"
          className="h-[50vh] pt-20 lg:pt-0 lg:h-dvh w-full snap-start overflow-hidden"
        >
          <ReelPage bannerImg={bannerImg[0]} />
        </section>

        <section
          id="about"
          className="min-h-screen snap-start py-20 flex items-center"
        >
          <div className="container mx-auto px-4">
            <AboutServer aboutDB={aboutDB[0]} />
          </div>
        </section>

        <section id="projects" className="min-h-screen snap-start py-20">
          <ProjectsGrid videoGrid={videoGrid} />
        </section>

        <section
          id="contactB"
          className="min-h-screen snap-start py-20 overflow-hidden"
        >
          <ReviewsAndContact reviewsDB={reviewsDB} />
        </section>

        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </div>
  );
}
