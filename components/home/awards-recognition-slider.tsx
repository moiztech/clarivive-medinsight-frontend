"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AwardItem = {
  title: string;
  image: string;
};

const awards: AwardItem[] = [
  {
    title: "Disability Confident Employer",
    image: "https://www.kallidus.com/wp-content/uploads/2022/06/dc_badge2.png",
  },
  {
    title: "BHG Recognition",
    image: "https://www.kallidus.com/wp-content/uploads/2024/03/BHG-for-Post-4.png",
  },
  {
    title: "Best Compliance LMS",
    image:
      "https://www.kallidus.com/wp-content/uploads/2024/03/Best-Compliance-LMS-from-ELI-1.png",
  },
  {
    title: "Best LMS",
    image:
      "https://www.kallidus.com/wp-content/uploads/2024/03/Best-LMS-from-ELI-1.png",
  },
  {
    title: "Disability Confident Employer",
    image: "https://www.kallidus.com/wp-content/uploads/2022/06/dc_badge2.png",
  },
  {
    title: "BHG Recognition",
    image: "https://www.kallidus.com/wp-content/uploads/2024/03/BHG-for-Post-4.png",
  },
  {
    title: "Best Compliance LMS",
    image:
      "https://www.kallidus.com/wp-content/uploads/2024/03/Best-Compliance-LMS-from-ELI-1.png",
  },
  {
    title: "Best LMS",
    image:
      "https://www.kallidus.com/wp-content/uploads/2024/03/Best-LMS-from-ELI-1.png",
  },
];

export default function AwardsRecognitionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsPerView(4);
      } else if (width >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }

      setCurrentIndex(0);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = Math.max(0, awards.length - itemsPerView);

  const next = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  useEffect(() => {
    if (maxIndex === 0) return;

    const interval = setInterval(() => {
      if (!isPaused && !isDraggingRef.current) {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
    (e.target as Element)?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    setDragOffset(e.clientX - startXRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const threshold = Math.min(80, containerWidth * 0.15);

    if (dragOffset <= -threshold) {
      next();
    } else if (dragOffset >= threshold) {
      prev();
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    (e.target as Element)?.releasePointerCapture?.(e.pointerId);
  };

  const slideWidthPercent = 100 / itemsPerView;
  const translatePercent = currentIndex * slideWidthPercent;
  const dragPercent = (dragOffset / Math.max(containerWidth, 1)) * 100;

  return (
    <section className="bg-white py-18 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1b1c44]">
            Awards & Recognition
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto">
            We strive for excellent training experiences and continuously improve for learners and organizations.
          </p>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onDragStart={(e) => e.preventDefault()}
          style={{ touchAction: "pan-y", userSelect: isDragging ? "none" : undefined }}
        >
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-400 ease-out"}`}
            style={{ transform: `translateX(calc(-${translatePercent}% + ${dragPercent}%))` }}
          >
            {awards.map((award, index) => (
              <div
                key={`${award.title}-${index}`}
                className="shrink-0 px-4"
                style={{ width: `${slideWidthPercent}%` }}
              >
                <div className="h-40 md:h-44 flex items-center justify-center p-4">
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={260}
                    height={120}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentIndex ? "w-8 bg-[#1321F1]" : "w-2 bg-gray-400"}`}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
