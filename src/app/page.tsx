import { client } from "@/sanity/client";
import { AboutType, BannerType, ReviewsType, VideoGridType } from "@/types";
import { HOMEPAGE_QUERY } from "@/lib/queries";
import React from "react";
import PageClient from "./page-client";

export default async function HomePage() {
  const { videoGrid, banner, reviews } = await client.fetch<{
    videoGrid: VideoGridType[];
    about: AboutType[];
    banner: BannerType[];
    reviews: ReviewsType[];
  }>(HOMEPAGE_QUERY, {}, { next: { revalidate: 604800 } });

  return <PageClient videoGrid={videoGrid} banner={banner} reviews={reviews} />;
}
