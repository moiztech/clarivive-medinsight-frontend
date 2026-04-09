"use client";
import {
  ArrowUpRight,
  Brain,
  Flower2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "../ui/animate-on-scroll";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function MedicalServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1);
  const services = [
    {
      icon: Brain,
      title: "Face-to-Face Training",
      description:
        "We deliver classroom-based training across the UK, led by experienced trainers. Our face-to-face courses emphasize practical learning, real-life scenarios, and safe skill development.",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
      href: "/courses/face-to-face",
    },
    {
      icon: Flower2,
      title: "Online Learning",
      description:
        "For organizations requiring flexibility, we offer professionally developed online training that can be completed anytime and anywhere.",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      href: "/courses/online",
    },
  ];
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setItemsPerSlide(4); // xl
      } else if (width >= 768) {
        setItemsPerSlide(2); // md
      } else {
        setItemsPerSlide(1); // sm
      }

      setCurrentIndex(0); // reset slide on resize

      // Update container width to avoid ref access during render
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateItemsPerSlide(); // initial run
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(services?.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pointer / drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
    (e.target as Element)?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    setDragOffset(delta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    const width = el?.clientWidth || 1;
    const delta = dragOffset;
    const threshold = Math.min(80, width * 0.15);

    if (delta <= -threshold) {
      nextSlide();
    } else if (delta >= threshold) {
      prevSlide();
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    (e.target as Element)?.releasePointerCapture?.(e.pointerId);
  };

  // Autoplay: advance every 2.5s when not paused or dragging
  useEffect(() => {
    // Only autoplay when there are more than 4 service items
    if (!(services.length > 4)) return;

    const interval = setInterval(() => {
      if (!isPaused && !isDraggingRef.current) nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, [itemsPerSlide, isPaused, services.length]);
  const shouldCenter = services.length < itemsPerSlide;
  return (
    <section
      id="our-courses"
      className="py-20 bg-blue-600 relative overflow-hidden px-8 lg:px-20 2xl:px-25"
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onDragStart={(e) => e.preventDefault()}
        className="container mx-auto overflow-hidden max-w-7xl"
        style={{
          touchAction: "pan-y",
          userSelect: isDragging ? "none" : undefined,
        }}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-full text-sm text-white mb-6">
            Our Courses
          </div>
          <h2 className="text-4xl lg:text-6xl font-medium mx-auto max-w-3xl text-white">
            Our Training Courses – Expert Learning for{" "}
            <span className="italic font-serif">Every professional</span>
          </h2>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
        {/** Compute centering when fewer than 4 slides, otherwise normal sliding */}
        <div
          className={
            shouldCenter
              ? "flex justify-center gap-6"
              : `flex ${isDragging ? "" : "transition-transform duration-500 ease-out"}`
          }
          style={
            shouldCenter
              ? undefined
              : {
                  transform: (() => {
                    const base = -currentIndex * 100;
                    const dragPercent = (dragOffset / containerWidth) * 100;
                    return `translateX(${base + dragPercent}%)`;
                  })(),
                }
          }
        >
          {services.map((service, index) => (
            <AnimateOnScroll
              key={index}
              className={`shrink-0 px-2 ${shouldCenter ? "w-full md:w-[360px]" : "w-full md:w-1/2 xl:w-1/4"}`}
            >
              <div
                className="bg-white rounded-3xl rounded-br-2xl overflow-hidden group
             transition-transform duration-300 flex flex-col lg:h-[520px] relative border-0 [transform:translateZ(0)]"
              >
                <div className="relative h-70 lg:h-54 2xl:h-60 shrink-0">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p
                      className="text-gray-600 leading-relaxed mb-4 line-clamp-4 pe-10 xl:pe-5"
                      title={service.description}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
                <Link href={service.href}>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="shadow-xl absolute end-0 bottom-0 z-4 flex rounded-2xl transition-all hover:rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-white"
                  >
                    <ArrowUpRight className="w-8 h-8 text-primary-blue" />
                  </Button>
                </Link>
                {/* <!-- Main cut --> */}
                <span
                  className="absolute bottom-0 right-0
              w-36 h-36
              bg-blue-600 rounded-full
              translate-x-[52%] translate-y-[52%]"
                ></span>

                {/* <!-- Vertical smoothing --> */}

                {/* <span className="absolute -bottom-1 -right-1 w-35 h-35 bg-blue-600 rounded-full translate-x-1/2 translate-y-1/2"></span> */}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        {/* </div> */}

        {/* Decorative back to top button */}
        {/* <button className="fixed bottom-8 right-8 w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <ArrowUpRight className="w-6 h-6" />
        </button> */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full xl:hidden bg-white/80 hover:bg-white border-cyan-400"
          >
            <ChevronLeft className="h-5 w-5 text-gray-900" />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? "w-8 bg-gray-900" : "w-2 bg-gray-900/30"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full xl:hidden bg-white/80 hover:bg-white border-cyan-400"
          >
            <ChevronRight className="h-5 w-5 text-gray-900" />
          </Button>
        </div>
      </div>
    </section>
  );
}
