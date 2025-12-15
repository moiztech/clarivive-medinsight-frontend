"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(1)

  const testimonials = [
    {
      quote:
        "Great selection of courses that suit our clients at a great price. Easy to purchase the relevant courses. We are able to support more clients to meet their training needs",
    },
    {
      quote:
        "Really straightforward to purchase and enrol learning. The course was easy to navigate and lots of added information. Fully understandable from start to finish",
    },
    {
      quote:
        "Very easy website to use. Great range of courses. Simple to allocate courses to participants by email. Saves time and gave learners the responsibility to complete before the deadline.",
    },
    {
      quote:
        "Very easy website to use. Great range of courses. Simple to allocate courses to participants by email. Saves time and gave learners the responsibility to complete before the deadline.",
    },
  ]

  // Detect breakpoint changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const handleBreakpointChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setItemsPerSlide(e.matches ? 2 : 1)
      setCurrentIndex(0) // Reset to first slide on breakpoint change
    }

    // Set initial value
    handleBreakpointChange(mediaQuery)

    // Listen for changes
    mediaQuery.addEventListener("change", handleBreakpointChange)
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange)
  }, [])

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-24 px-6 bg-linear-to-br from-cyan-400 via-cyan-300 to-blue-300">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Millions of learners love us</h2>
          <p className="text-lg text-gray-900 max-w-4xl mx-auto">
            Discover over 300 certified eLearning courses covering compliance topics like Health & Safety, Food Safety,
            Safeguarding or Personal Skills Development in line with UK legislation.
          </p>
        </div>

        {/* <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-cyan-300/50 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/30">
              <div className="text-6xl text-red-600 font-serif mb-4">"</div>
              <p className="text-gray-900 leading-relaxed">{testimonial.quote}</p>
            </div>
          ))}
        </div> */}

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full md:w-1/2 shrink-0 px-4">
                  <div className="bg-cyan-300/50 backdrop-blur-sm rounded-3xl p-8 border border-cyan-900">
                    <div className="text-6xl text-red-600 font-serif mb-4">"</div>
                    <p className="text-gray-900 leading-relaxed">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-white/80 hover:bg-white border-cyan-400"
            >
              <ChevronLeft className="h-5 w-5 text-gray-900" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-gray-900" : "w-2 bg-gray-900/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-white/80 hover:bg-white border-cyan-400"
            >
              <ChevronRight className="h-5 w-5 text-gray-900" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
