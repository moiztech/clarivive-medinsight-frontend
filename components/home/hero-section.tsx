"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"; // assuming shadcn/ui installed
import { Play } from "lucide-react";
import Image from "next/image";
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
                  <span className="bg-clip-text mb-0 pb-0 text-transparent overflow-hidden bg-linear-to-r from-blue-600 to-blue-300 font-bold"> trusted partner</span>
                  <br />
                  for digital healthcare excellence & compliance.
                </h1>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  <span className="text-blue-600 font-semibold">Empowering healthcare professionals </span>
                  at every stage. Access
                  <span className="text-blue-500 font-semibold cursor-pointer hover:underline">&nbsp; expert-led healthcare training</span> anytime, build practical skills, stay
                  compliant, and manage your learning with ease. Ready to advance your career ? Start learning today.
                </p>
              </section>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2">
              <Button size="xl" className="bg-[#1321F1] hover:bg-[#1321F1]/90 text-secondary-foreground px-10">
                Get Started
              </Button>
              <VideoButton />
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">20M</div>
                <div className="text-sm text-muted-foreground mt-1">Views</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">50K</div>
                <div className="text-sm text-muted-foreground mt-1">Students</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">4K</div>
                <div className="text-sm text-muted-foreground mt-1">Certificates</div>
              </div>
            </div> */}
          </div>

          {/* Right content - Hero Image */}
          <div className="relative">
            {/* Main hero image */}
            <div className="relative z-10">
              <Image width={100} height={100} preload loading="eager" src="images/Group 32.png" alt="Excited student with coffee and phone" className="w-full h-auto rounded-lg" />
            </div>

            {/* Decorative elements */}
            {/* <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div> */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>

            {/* Floating badge - Chrome icon */}
            {/* <div className="absolute top-8 hidden xl:block left-8 bg-card shadow-lg rounded-2xl p-4 animate-float">
              <svg className="w-12 h-12" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#4285F4" />
                <circle cx="24" cy="24" r="12" fill="white" />
                <circle cx="24" cy="24" r="8" fill="#4285F4" />
              </svg>
            </div> */}

            {/* User profile badge */}
            {/* <div
              className="absolute top-1/3 right-4 bg-card shadow-lg rounded-xl p-3 flex items-center gap-3 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="Anik Deb"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">Anik Deb</div>
                <div className="text-xs text-muted-foreground">
                  UX/UI Designer
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 fill-accent"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div> */}

            {/* Progress indicator */}
            <div className="absolute bottom-1/4 left-1/4 bg-card shadow-lg rounded-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex gap-2 items-center mb-2">
                <div className="w-8 h-1 bg-accent rounded-full"></div>
                <div className="w-8 h-1 bg-secondary rounded-full"></div>
              </div>
            </div>

            {/* User avatars group */}
            {/* <div
              className="absolute bottom-12 left-8 bg-card shadow-lg rounded-full p-2 flex items-center animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i}`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-card"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground border-2 border-card flex items-center justify-center text-xs font-semibold">
                  +5
                </div>
              </div>
            </div> */}

            {/* Decorative shapes */}
            {/* <div className="absolute top-0 right-1/4 w-24 h-24 bg-accent rounded-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-1/3 -right-8 w-32 h-32 hidden xl:block">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 L90 50 L50 90 L10 50 Z"
                  fill="currentColor"
                  className="text-secondary opacity-30"
                />
              </svg>
            </div> */}
          </div>
        </div>
        <div className="absolute end-0 pointer-events-none start-0 bottom-0 xl:-bottom-1/3">
          <img loading="eager" src="images/Vector 1.png" alt="Wave Pattern" className="w-full h-auto" />
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
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

  return (
    <>
      <Button variant="ghost" size="xl" className="gap-2" onClick={() => setOpen(true)}>
        <div className="w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
          <Play className="w-4 h-4 text-[#1321F1] fill-[#1321F1]" />
        </div>
        <span className="text-[#1321F1]">Watch Video</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent  className="max-w-5xl! p-0 bg-black border-none focus:outline-none">
          <div className="relative pt-[56.25%]">
            {" "}
            {/* 16:9 aspect ratio */}
            <iframe
              className="absolute inset-0 w-full h-full rounded-xl"
              src={videoSrc}
              title="Clarivive MedInsight – Home Page Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <DialogClose asChild>
            <button className="absolute cursor-pointer -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-black z-50">✕</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
