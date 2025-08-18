"use client";

import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HomeSectionClient from "@/components/sections/HomeSection";
import WorkSectionPage from "@/components/sections/WorkSection";
import TopNavbar from "@/components/top-navbar/top-navbar";
import { useCurrentSectionId } from "@/hooks/useCurrentSectionId";
import { AboutType, BannerType, ReviewsType, VideoGridType } from "@/types";
import React, { useMemo } from "react";

interface PageClientProps {
  videoGrid: VideoGridType[];
  banner: BannerType[];
  reviews: ReviewsType[];
  about: AboutType[];
}
const sectionTextMap: Record<string, string> = {
  works: "Works - vision into visuals",
  about: "About - my skills",
  contact: "Contact - get in touch",
};
export default function PageClient({
  videoGrid,
  banner,
  reviews,
  about,
}: PageClientProps) {
  const currentSectionId = useCurrentSectionId();
  const leftText = useMemo(
    () => sectionTextMap[currentSectionId ?? ""],
    [currentSectionId]
  );
  const reviewBig = reviews.find((review) => review.title === "reviewBig");
  const reviewBigData = reviewBig?.review;

  return (
    <main>
      <HomeSectionClient data={banner} />
      <TopNavbar leftText={leftText} />
      <WorkSectionPage
        data={videoGrid}
        review={{ review: reviewBigData ?? "" }}
      />
      <AboutSection about={about} />
      <ContactSection />
    </main>
  );
}
