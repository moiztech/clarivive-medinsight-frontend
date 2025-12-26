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
  const [dragOffset, setDragOffset] = useState(0) // px offset while dragging
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)

  const INTERVAL = 3500 // autoplay interval in ms
  const THRESHOLD = 50 // px required to trigger slide change

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % testimonials.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Autoplay
  useEffect(() => {
    if (paused || isDragging.current) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, index])

  // Pointer (mouse/touch) handlers
  function onPointerDown(e: React.PointerEvent) {
    // only left button for mouse
    if ((e as any).button === 2) return
    startX.current = e.clientX
    isDragging.current = true
    setDragOffset(0)
    setPaused(true)
    // try to capture pointer so we continue receiving moves even if pointer leaves element
    try {
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
    } catch (err) {
      // ignore
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current || startX.current == null) return
    const diff = e.clientX - startX.current
    setDragOffset(diff)
  }

  function finishDrag(clientX?: number) {
    if (startX.current == null) return
    const endX = clientX ?? 0
    const diff = (clientX ?? 0) - startX.current

    if (diff < -THRESHOLD) setIndex((i) => (i + 1) % testimonials.length)
    else if (diff > THRESHOLD) setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

    startX.current = null
    isDragging.current = false
    setDragOffset(0)
    // give autoplay a small timeout before resuming to avoid instant slide change
    setTimeout(() => setPaused(false), 500)
  }

  function onPointerUp(e: React.PointerEvent) {
    finishDrag(e.clientX)
    try {
      ;(e.target as Element).releasePointerCapture?.(e.pointerId)
    } catch (err) {
      // ignore
    }
  }

  // Touch fallback (for older browsers without pointer events)
  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
    isDragging.current = true
    setDragOffset(0)
    setPaused(true)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging.current || startX.current == null) return
    const diff = e.touches[0].clientX - startX.current
    setDragOffset(diff)
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current == null) return
    const endX = e.changedTouches[0].clientX
    finishDrag(endX)
  }

  const basePercent = -index * (100 / testimonials.length)
  const transitionStyle = dragOffset === 0 ? "transform 500ms ease-in-out" : "none"

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
          <div
            className="overflow-hidden relative touch-pan-right md:touch-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex touch-pan-y"
              style={{
                width: `${testimonials.length * 100}%`,
                transform: `translateX(calc(${basePercent}% + ${dragOffset}px))`,
                transition: transitionStyle,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => finishDrag()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="px-9" style={{ width: `${100 / testimonials.length}%` }}>
                  <div className="space-y-8">
                    <div className="text-indigo-100">
                      <Quote className="size-20" strokeWidth={1} />
                    </div>

                    <p className="text-2xl font-normal text-slate-800 leading-relaxed">{`\"${t.quote}\"`}</p>

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

            {/* Indicators (optional) */}
            {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-600" : "bg-indigo-200"}`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
