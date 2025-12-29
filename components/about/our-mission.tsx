import React from "react";
import StatsHero from "./stats-hero";
import Image from "next/image";

function OurMission() {
  return (
    <div className="pt-20 bg-white lg:px-20 2xl:px-25">
      <h2 className="text-5xl max-w-3xl mx-auto text-center font-light text-indigo-950">
        Our Mission is simple: to serve with care, act with integrity,{" "}
        <span className="bg-clip-text mb-0 pb-0 text-transparent overflow-hidden bg-linear-to-r from-indigo-950 to-gray-100"> and always put your needs first.</span>
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-20 lg:gap-40">
        <StatsHero />
        <Image src="/about-us-img.png" alt="About Us" width={300} height={200} className="w-1/3 h-auto mx-5" preload loading="eager" />
      </div>
    </div>
  );
}

export default OurMission;
