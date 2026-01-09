import React from "react";
import StatsHero from "./stats-hero";
import Image from "next/image";

export type ourMissionProps = {
  headingStart?: string;
  headingHighlight?: string;
  aboutImages?: boolean
};

function OurMission({
  headingStart = 'Our Mission is simple: to serve with care, act with integrity,',
  headingHighlight = ' and always put your needs first.',
  aboutImages = true
} : ourMissionProps) {
  return (
    <div className="pt-15 bg-white lg:px-20 2xl:px-25">
      <h2 className="text-4xl max-w-4xl mx-auto text-center font-light text-indigo-950">
        {headingStart}{" "}
        <span className="bg-clip-text mb-0 pb-0 text-transparent overflow-hidden bg-linear-to-r from-indigo-950 to-gray-200">{headingHighlight}</span>
      </h2>
      {aboutImages && (
        <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-20 lg:gap-40">
          <StatsHero />
          <Image src="/about-us-img.png" alt="About Us" width={300} height={200} className="w-1/3 h-auto mx-5" preload loading="eager" />
        </div>
      )}
    </div>
  );
}

export default OurMission;
