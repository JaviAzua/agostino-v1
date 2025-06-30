"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "works", "about", "contact"];

export const useCurrentSectionId = (): string => {
  const [currentSection, setCurrentSection] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    const handleScroll = () => {
      let found = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            found = id;
            break;
          }
        }
      }
      setCurrentSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return currentSection;
};
