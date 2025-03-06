import type { AboutT, BannerT, VideoGridT, ReviewsT } from "@/types";
import ClientMainPage from "@/components/client-main-page";
import { env } from "../../env";

// Interfaz para los datos que esperamos de la API
interface ApiResponse {
  bannerImg: BannerT[];
  videoGrid: VideoGridT[];
  aboutDB: AboutT[];
  reviewsDB: ReviewsT[];
}

export default async function Page() {
  const res = await fetch(`${env.BASE_URL}/api/data`, {
    next: { revalidate: 172800 }, // 48 horas en segundos
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ApiResponse = await res.json();

  return (
    <ClientMainPage
      bannerImg={data.bannerImg}
      videoGrid={data.videoGrid}
      aboutDB={data.aboutDB}
      reviewsDB={data.reviewsDB}
    />
  );
}
