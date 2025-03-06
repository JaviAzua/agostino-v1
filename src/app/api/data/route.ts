import { NextResponse } from "next/server";
import { client } from "@/lib/client";
import type { AboutT, BannerT, VideoGridT, ReviewsT } from "@/types";

export async function GET() {
  try {
    const bannerQuery = '*[_type == "banner"]';
    const videoQuery = '*[_type == "videoGrid"]';
    const aboutQuery = '*[_type == "about"]';
    const reviewsQuery = '*[_type == "reviews"]';

    const [bannerImg, videoGrid, aboutDB, reviewsDB] = await Promise.all([
      client.fetch<BannerT[]>(bannerQuery),
      client.fetch<VideoGridT[]>(videoQuery),
      client.fetch<AboutT[]>(aboutQuery),
      client.fetch<ReviewsT[]>(reviewsQuery),
    ]);

    return NextResponse.json({
      bannerImg,
      videoGrid,
      aboutDB,
      reviewsDB,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
