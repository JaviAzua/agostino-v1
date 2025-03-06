"use client";

import type { ReviewsT } from "@/types";
import { motion } from "framer-motion";
import ClientReviews from "./client-reviews";
import { ContactForm } from "./contact-form";

type Props = {
  reviewsDB: ReviewsT[];
};

export default function ReviewsAndContact({ reviewsDB }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-12 md:py-16"
    >
      <h2 className="text-gray-500 text-center font-semibold text-2xl md:text-3xl md:tracking-[1rem] mb-12">
        GET IN TOUCH
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <ClientReviews reviewsDB={reviewsDB} />
      </div>
    </motion.div>
  );
}
