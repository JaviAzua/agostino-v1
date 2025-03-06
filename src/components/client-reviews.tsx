"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type { ReviewsT } from "@/types";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  reviewsDB: ReviewsT[];
};

function ClientReviews({ reviewsDB }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <h3 className="text-2xl font-semibold mb-8 text-orangeL">
        Client Reviews
      </h3>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {reviewsDB.map((review) => (
            <CarouselItem key={review._id}>
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <FaQuoteLeft className="text-orangeL text-3xl mb-4" />
                  <blockquote className="text-base sm:text-lg text-gray-300 italic mb-4">
                    {`"${review.review}"`}
                  </blockquote>
                  <cite className="text-sm sm:text-base font-semibold text-orangeL not-italic">
                    - {review.from}
                  </cite>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}

export default ClientReviews;
