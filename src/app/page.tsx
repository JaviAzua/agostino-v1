import type { AboutT, BannerT, VideoGridT, ReviewsT } from "@/types";
import ClientMainPage from "@/components/client-main-page";
import { env } from "../../env";
import { FaSpinner } from "react-icons/fa";

interface ApiResponse {
  bannerImg: BannerT[];
  videoGrid: VideoGridT[];
  aboutDB: AboutT[];
  reviewsDB: ReviewsT[];
}

export default async function Page() {
  try {
    const res = await fetch(`${env.BASE_URL}/api/data`, {
      next: { revalidate: 172800 },
    });
    if (!res.ok) throw new Error("API not available");

    const data: ApiResponse = await res.json();

    return (
      <ClientMainPage
        bannerImg={data.bannerImg}
        videoGrid={data.videoGrid}
        aboutDB={data.aboutDB}
        reviewsDB={data.reviewsDB}
      />
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="animate-spin">
        <FaSpinner />
      </div>
    );
  }
}
