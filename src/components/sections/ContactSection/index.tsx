import React from "react";
import { ContactForm } from "./contact-form";
import JaLogo from "@/components/ja-logo";
import { CornerLeftUp } from "lucide-react";

export default function ContactSection() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="contact"
      className="min-h-dvh bg-night flex items-center justify-center relative overflow-hidden"
    >
      <ContactForm />
      <div className="absolute bottom-0 left-0 text-honeydew flex justify-between w-full">
        <JaLogo />
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 px-4 group"
        >
          <CornerLeftUp className="animate-bounce duration-1000 " />
          <span className="group-hover:scale-95 transition-all duration-300">
            Scroll to top
          </span>
        </button>
      </div>
    </div>
  );
}
