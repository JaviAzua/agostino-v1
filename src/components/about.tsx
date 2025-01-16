"use client";

import { AboutT } from "@/types";
import Image from "next/image";
import React from "react";
import {
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobeaudition,
  SiAdobeillustrator,
  SiBlender,
  SiAdobephotoshop,
} from "react-icons/si";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "@/lib/client";

type Props = {
  aboutDB: AboutT;
};

function About({ aboutDB }: Props) {
  const Words = aboutDB.machineText.map((w) => w);
  const url = urlFor(aboutDB.photo && aboutDB.photo).url();

  const [mainText] = useTypewriter({
    words: [Words[0], Words[1], Words[2], Words[3]],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <article className="w-full">
      <h2 className="text-gray-500 text-center font-semibold text-2xl tracking-[2rem] mb-10">
        About
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
        <div className="relative w-60 h-60 md:w-80 md:h-80 flex-shrink-0">
          <Image
            src={url}
            alt="Profile picture"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="max-w-2xl">
          <h3 className="text-3xl md:text-4xl lg:text-5xl text-center lg:text-left font-bold mb-6">
            {mainText}
            <Cursor cursorColor="#E79E22" />
          </h3>
          <div className="space-y-4 mb-6">
            {aboutDB.bigText.map((parraf, index) => (
              <p key={index} className="text-base md:text-lg">
                {parraf}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <SiAdobepremierepro className="w-8 h-8 text-gray-400 hover:text-gray-600" />
            <SiAdobeaftereffects className="w-8 h-8 text-gray-400 hover:text-gray-600" />
            <SiAdobeaudition className="w-8 h-8 text-gray-400 hover:text-gray-600" />
            <SiAdobeillustrator className="w-8 h-8 text-gray-400 hover:text-gray-600" />
            <SiAdobephotoshop className="w-8 h-8 text-gray-400 hover:text-gray-600" />
            <SiBlender className="w-8 h-8 text-gray-400 hover:text-gray-600" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default About;
