"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"; // assuming shadcn/ui installed
import { Play } from "lucide-react";
import Image from "next/image";
import mainBanner from "@/public/images/main-hero-banner.png";
import { useState } from "react";

export default function HeroSection() {
  return (
    <section className="relative  bg-background py-14 lg:py-16">
      <div className="container mx-auto px-4 xl:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-14 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <section className="max-w-3xl mx-auto px-1">
                <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
                  Your
                  <span className="bg-clip-text mb-0 pb-0 text-transparent overflow-hidden bg-linear-to-r from-blue-600 to-blue-300 font-bold">
                    {" "}
                    trusted partner
                  </span>
                  <br />
                  for digital healthcare excellence & compliance.
                </h1>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  <span className="text-blue-600 font-semibold">
                    Empowering healthcare professionals{" "}
                  </span>
                  at every stage. Access
                  <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
                    &nbsp; expert-led healthcare training
                  </span>{" "}
                  anytime, build practical skills, stay compliant, and manage
                  your learning with ease. Ready to advance your career ? Start
                  learning today.
                </p>
              </section>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="xl"
                className="bg-[#1321F1] hover:bg-[#1321F1]/90 text-secondary-foreground px-10"
              >
                Get Started
              </Button>
              <VideoButton />
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="relative">
            {/* Main hero image */}
            <div className="relative z-10">
              <Image
                priority
                src={mainBanner}
                alt="Excited student with coffee and phone"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>
            <div
              className="absolute bottom-1/4 left-1/4 bg-card shadow-lg rounded-lg p-3 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex gap-2 items-center mb-2">
                <div className="w-8 h-1 bg-accent rounded-full"></div>
                <div className="w-8 h-1 bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute end-0 pointer-events-none start-0 bottom-0 xl:-bottom-2/3">
          <img
            loading="eager"
            src="images/Vector 1.png"
            alt="Wave Pattern"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style> */}
    </section>
  );
}

function VideoButton() {
  const videoId = "JygUacpeBjk";
  const [open, setOpen] = useState(false);
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`;

  return (
    <>
      <Button
        variant="ghost"
        size="xl"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <div className="w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
          <Play className="w-4 h-4 text-[#1321F1] fill-[#1321F1]" />
        </div>
        <span className="text-[#1321F1]">Watch Video</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl! p-0 bg-black border-none focus:outline-none">
          <div className="relative pt-[56.25%]">
            {" "}
            {/* 16:9 aspect ratio */}
            <iframe
              key={open ? "open" : "closed"}
              className="absolute inset-0 w-full h-full rounded-xl"
              src={videoSrc}
              title="Clarivive MedInsight – Home Page Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <DialogClose asChild>
            <button className="absolute cursor-pointer -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-black z-50">
              ✕
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
