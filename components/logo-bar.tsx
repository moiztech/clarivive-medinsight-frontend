"use client"
import Image from "next/image"

const logos = [
  { name: "The Adecco Group", src: "/adecco-group-logo.jpg" },
  { name: "Hootsuite", src: "/hootsuite-logo.png" },
  { name: "PING", src: "/ping-logo.jpg" },
  { name: "bambooHR", src: "/bamboohr-logo.jpg" },
  { name: "gusto", src: "/gusto-logo.png" },
  { name: "USA Football", src: "/usa-football-logo.jpg" },
  { name: "Slack", src: "/placeholder.svg" },
  { name: "Google", src: "/placeholder.svg" },
  { name: "Microsoft", src: "/placeholder.svg" },
  { name: "Airbnb", src: "/placeholder.svg" },
]

export function LogoBar() {
  const repeated = Array.from({ length: 2 }).flatMap(() => logos)

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-slate-500 text-sm font-semibold tracking-widest uppercase mb-10">
          MEET SOME OF OUR 1,500+ CUSTOMERS
        </h2>

        <div className="overflow-hidden">
          <div className="marquee flex items-center" aria-hidden={false}>
            <div className="marquee__group flex items-center">
              {repeated.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="relative w-32 md:w-40 h-12 md:h-15 flex-shrink-0 opacity-50 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image src={logo.src || "/placeholder.svg"} alt={logo.name} fill className="object-contain" />
                </div>
              ))}
            </div>

            <div className="marquee__group flex items-center" aria-hidden>
              {repeated.map((logo, i) => (
                <div
                  key={`dup-${logo.name}-${i}`}
                  className="relative w-32 md:w-40 h-12 md:h-15 flex-shrink-0 opacity-50 grayscale transition-all duration-300"
                >
                  <Image src={logo.src || "/placeholder.svg"} alt={logo.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          gap: 2rem;
          will-change: transform;
          animation: marquee 16s linear infinite;
        }

        .marquee__group {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
