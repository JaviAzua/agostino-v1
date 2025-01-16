"use client";

import { ReviewsT } from "@/types";
import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";
import ClientReviews from "./client-reviews";

type Props = {
  reviewsDB: ReviewsT[];
};

export default function ReviewsAndContact({ reviewsDB }: Props) {
  return (
    <div className=" py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-orangeL text-center font-bold text-4xl mb-12 tracking-[0.2em]">
          GET IN TOUCH
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ClientReviews reviewsDB={reviewsDB} />
        </div>
      </motion.div>
    </div>
  );
}
