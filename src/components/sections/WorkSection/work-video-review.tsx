"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import useInView from "@/hooks/useInView";

gsap.registerPlugin(SplitText);

function WorkVideoReview({ review }: { review: string }) {
  const reviewRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(reviewRef as React.RefObject<Element>, {
    threshold: 0.8,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    if (isInView && !hasAnimated && reviewRef.current) {
      const reviewText = new SplitText(reviewRef.current, {
        type: "words",
      });
      gsap.from(reviewText.words, {
        autoAlpha: 0,
        y: 50,
        duration: 0.4,
        stagger: 0.1,
        filter: "blur(10px)",
        onComplete: () => setHasAnimated(true),
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <div className="pb-[15vh] pt-20 mb:pt-0 xl:pt-[15vh] max-w-[80vw] lg:max-w-[70vw] mx-auto">
      <p
        ref={reviewRef}
        className="text-night font-dm text-center text-4xl lg:text-6xl font-bold"
      >
        {review}
      </p>
    </div>
  );
}

export default WorkVideoReview;
