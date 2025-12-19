"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type AnimationType = "translate" | "opacity"

type Props = {
  children: React.ReactNode
  className?: string
  once?: boolean
  threshold?: number
  rootMargin?: string
  delay?: number

  /** default: "translate" (your existing working behavior) */
  type?: AnimationType

  /** Only used when type="translate" */
  translateY?: number

  /** Only used when type="opacity" */
  fromOpacity?: number
}

export default function AnimateOnScroll({
  children,
  className,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  delay = 0,
  type = "translate",
  translateY = 16,
  fromOpacity = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  const style = useMemo<React.CSSProperties>(() => {
    const base: React.CSSProperties = {
      transitionDelay: `${delay}ms`,
    }

    if (type === "opacity") {
      // Opacity reveal on scroll
      return {
        ...base,
        opacity: visible ? 1 : fromOpacity,
        transitionProperty: "opacity",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "opacity",
      }
    }

    // Default: translate (your existing behavior)
    return {
      ...base,
      transform: visible ? "translateY(0px)" : `translateY(${translateY}px)`,
      opacity: visible ? 1 : 0,
      transitionProperty: "transform, opacity",
      transitionDuration: "700ms",
      transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      willChange: "transform, opacity",
    }
  }, [type, visible, delay, translateY, fromOpacity])

  return (
    <div ref={ref} className={cn("aos", className)} style={style}>
      {children}
    </div>
  )
}
