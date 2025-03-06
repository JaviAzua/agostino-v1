"use client";

import { useRef, useEffect, useState, RefObject } from "react";
import type { AboutT, BannerT, ReviewsT, VideoGridT } from "@/types";

import ReelPage from "./reel-page";
import Header from "./header";
import AboutSection from "./about";
import ProjectsGrid from "./projects-grid";
import ReviewsAndContact from "./reviews-and-contact";
import Footer from "./footer";

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
    <main
      ref={mainRef}
      className="relative bg-blackB overflow-x-hidden lg:h-screen lg:overflow-y-auto lg:snap-y lg:snap-mandatory"
    >
      <Header scrollContainer={mainRef as RefObject<HTMLElement>} />

      <section id="reel" className="relative w-full h-[100vh] lg:snap-start">
        <ReelPage bannerImg={bannerImg[0]} />
      </section>

      <section
        id="about"
        className="w-full py-16 lg:py-20 lg:min-h-screen lg:snap-start"
      >
        <div className="container mx-auto px-4 md:px-6">
          <AboutSection aboutDB={aboutDB[0]} />
        </div>
      </section>

      <section
        id="projects"
        className="w-full pt-20 lg:min-h-screen lg:snap-start"
      >
        <div className="container mx-auto px-4 md:px-6">
          <ProjectsGrid videoGrid={videoGrid} />
        </div>
      </section>

      <section
        id="contactB"
        className="w-full pt-20 lg:min-h-screen lg:snap-start"
      >
        <ReviewsAndContact reviewsDB={reviewsDB} />
      </section>

      <div className="w-full lg:snap-start">
        <Footer />
      </div>
    </main>
  );
}
