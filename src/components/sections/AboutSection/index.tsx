"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef, useEffect } from "react";
import type { AboutType } from "@/types";
import { urlFor } from "@/sanity/img-builder";
import Image from "next/image";
import Photoshop from "@/components/skill-logos/photoshop-logo";
import Illustrator from "@/components/skill-logos/illustrator-logo";
import AfterEffects from "@/components/skill-logos/after-effects-logo";
import Premiere from "@/components/skill-logos/premiere-logo";
import Blender from "@/components/skill-logos/blender-logo";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const skills: Skill[] = [
  { name: "After Effects", icon: AfterEffects },
  { name: "Photoshop", icon: Photoshop },
  { name: "Illustrator", icon: Illustrator },
  { name: "Premiere Pro", icon: Premiere },
  { name: "Blender", icon: Blender },
];

export default function AboutSection({ about }: { about: AboutType[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const imgUrl = urlFor(about[0]?.photo).url() as string;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Main timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Simple staggered animations for all elements
    tl.to(
      [imageRef.current, titleRef.current, ".skill-item", ".about-paragraph"],
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  // Split bigText into paragraphs
  let paragraphs: string[] = [];
  const bigText = about[0]?.bigText;
  if (typeof bigText === "string") {
    paragraphs = (bigText as string)
      .replace(/\.(?= [A-Z])/g, ".|")
      .split("|")
      .map((p: string) => p.trim())
      .filter(Boolean);
  } else if (Array.isArray(bigText)) {
    paragraphs = bigText.filter((p): p is string => typeof p === "string");
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen text-honeydew bg-night overflow-hidden pt-[30vh] pb-[10vh]"
      aria-labelledby="about-title"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-[80vw] mx-auto">
        {/* Image Container */}
        <div
          ref={imageRef}
          className="overflow-hidden blur-[10px] aspect-[9/16] max-h-[50vh] place-self-center"
        >
          <Image
            src={imgUrl}
            quality={100}
            alt="Foto de perfil de Gonzalo Agostino, video editor y motion designer"
            width={1500}
            height={1500}
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover h-full w-full transition-all duration-700 group-hover:scale-105 bg-white/30 border border-persian_orange/20 rounded-lg"
            priority
          />
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="skills-section">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-8 text-center relative opacity-0 translate-y-10 blur-[10px]"
            id="skills-title"
          >
            Skills
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-persian_orange rounded-full" />
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="skill-item flex flex-col items-center gap-3 p-4 rounded-xl backdrop-blur-sm border border-honeydew/10 hover:border-persian_orange/50 transition-all duration-300 group opacity-0 translate-y-10 blur-[10px]"
                  tabIndex={0}
                  aria-label={skill.name}
                  role="listitem"
                >
                  <div className="relative">
                    <Icon
                      width={50}
                      height={50}
                      className="transition-all duration-300 group-hover:drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-persian_orange/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 -z-10" />
                  </div>
                  <p className="text-sm text-center font-medium">
                    {skill.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden h-36 flex items-center mb-8 bg-gradient-to-r from-persian_orange/80 via-persian_orange to-persian_orange/80 text-night shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <ul className="flex items-center h-full gap-6 animate-infinite-scroll">
          {[...about[0].machineText, ...about[0].machineText].map(
            (text, index) => (
              <li
                key={index}
                className="text-9xl font-bold text-nowrap flex items-center"
              >
                {text}
                <span className="mx-4 text-6xl opacity-60">·</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-8">
        {paragraphs.map((text, idx) => (
          <p
            key={idx}
            className="about-paragraph text-lg md:text-xl leading-relaxed text-center mb-6 relative opacity-0 translate-y-10 blur-[10px]"
            tabIndex={0}
            aria-label={`About paragraph ${idx + 1}`}
          >
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-honeydew/5 to-transparent rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </p>
        ))}
      </div>
    </section>
  );
}
