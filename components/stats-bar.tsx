"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

export function StatsBar() {
  const ref = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="bg-[#1321F1] py-10 lg:px-10 2xl:px-15">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {/* Appointments Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-indigo-600 size-10">
                  <AvatarImage src={`/user-avatar.png?height=40&width=40&query=user avatar ${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-white font-bold text-lg leading-tight">
              3+ Delivery
              <br />
              Options
            </p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Doctors Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <h3 className="text-white text-4xl font-bold mb-2">{started ? <CountUp delay={0.2} start={0} duration={1} end={1} /> : 0} Centralized Platform,</h3>
            <p className="text-white/90 font-medium">Secure training records</p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Customer Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 px-8">
            <h3 className="text-white text-4xl font-bold mb-2">{started ? <CountUp delay={0.4} start={0} duration={1.2} end={3} /> : 0} Access Levels,</h3>
            <p className="text-white/90 font-medium">Learners · Trainers · Organizations</p>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/20" />

          {/* Awards Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 ps-8">
            <h3 className="text-white text-4xl font-bold mb-2">Flexible Delivery</h3>
            <p className="text-white/90 font-medium">Multiple learning routes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
