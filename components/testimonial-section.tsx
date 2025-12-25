"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The medical team is incredibly knowledgeable and thorough. I felt confident in their care every step of the way. I'm so thankful for their expertise.",
    name: "Sapphire Rose",
    role: "Dental",
    image: "/female-medical-professional.png",
  },
  {
    quote:
      "Fantastic experience — compassionate staff and clear communication. Appointments run on time and the follow-up was excellent.",
    name: "Liam Parker",
    role: "Pediatrics",
    image: "/home/doctor-testimonial.jpg",
  },
  {
    quote:
      "Highly recommend. The virtual consultation saved me a trip and the advice was spot on. Professional and empathetic.",
    name: "Ava Martinez",
    role: "Cardiology",
    image: "/female-medical-professional.png",
  },
]

export function TestimonialSection() {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, testimonials.length - 1))
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current == null) return
    const endX = e.changedTouches[0].clientX
    const diff = endX - startX.current
    const threshold = 50
    if (diff < -threshold) setIndex((i) => Math.min(i + 1, testimonials.length - 1))
    if (diff > threshold) setIndex((i) => Math.max(i - 1, 0))
    startX.current = null
  }

  return (
    <section className="py-24 bg-white overflow-hidden mx-auto lg:px-10 2xl:px-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column stays fixed */}
          <div className="relative">
            <div className="absolute top-0 left-0 bg-white rounded-2xl p-6 z-10 transform -translate-x-4 -translate-y-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-slate-900">4.9</span>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="size-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm font-medium">(2.5k+ reviews)</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden">
              <Image src="/home/doctor-testimonial.jpg" alt="AI Medical Robot" fill className="object-cover" />
            </div>
          </div>

          {/* Right column: sliding quotes only */}
          <div className="overflow-hidden relative touch-pan-right md:touch-none">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out touch-pan-y"
              style={{ width: `${testimonials.length * 100}%`, transform: `translateX(-${index * (100 / testimonials.length)}%)` }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="px-9" style={{ width: `${100 / testimonials.length}%` }}>
                  <div className="space-y-8">
                    <div className="text-indigo-100">
                      <Quote className="size-20" strokeWidth={1} />
                    </div>

                    <p className="text-2xl font-normal text-slate-800 leading-relaxed">{`"${t.quote}"`}</p>

                    <div className="flex items-center gap-6">
                      <div className="relative size-16 rounded-full overflow-hidden ring-4 ring-indigo-50 w-16 h-16">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-slate-900">{t.name}</h4>
                        <p className="text-indigo-600 font-normal italic">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-y-0 left-2 flex items-center">
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                aria-label="Previous testimonial"
                className="p-2 rounded-full bg-white/80 hover:bg-white"
              >
                ‹
              </button>
            </div>

            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                onClick={() => setIndex((i) => Math.min(i + 1, testimonials.length - 1))}
                aria-label="Next testimonial"
                className="p-2 rounded-full bg-white/80 hover:bg-white"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
