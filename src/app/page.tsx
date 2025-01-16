import { AboutT, BannerT, VideoGridT, ReviewsT } from "@/types";
import { client } from "@/lib/client";
import ClientMainPage from "@/components/client-main-page";

export default async function Page() {
  const bannerQuery = '*[_type == "banner"]';
  const videoQuery = '*[_type == "videoGrid"]';
  const aboutQuery = '*[_type == "about"]';
  const reviewsQuery = '*[_type == "reviews"]';

  const bannerImg: BannerT[] = await client.fetch(bannerQuery);
  const videoGrid: VideoGridT[] = await client.fetch(videoQuery);
  const aboutDB: AboutT[] = await client.fetch(aboutQuery);
  const reviewsDB: ReviewsT[] = await client.fetch(reviewsQuery);

  return (
    <ClientMainPage
      bannerImg={bannerImg}
      videoGrid={videoGrid}
      aboutDB={aboutDB}
      reviewsDB={reviewsDB}
    />
  );
}
