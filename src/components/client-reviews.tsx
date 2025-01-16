"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewsT } from "@/types";
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
      <h3 className="text-2xl font-semibold mb-6 text-orangeL">
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
              <Card className="bg-white/50 shadow-xl border-gray-700">
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
        <CarouselPrevious className="text-orangeL hover:text-white hover:bg-orangeL/20 transition-colors duration-300 hidden" />
        <CarouselNext className="text-orangeL hover:text-white hover:bg-orangeL/20 transition-colors duration-300 hidden" />
      </Carousel>
    </motion.div>
  );
}

export default ClientReviews;
