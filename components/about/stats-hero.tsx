import React from "react"

export default function StatsHero() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Top label */}
        <span className="absolute top-0 left-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Who are we?
        </span>

        {/* Rotated side label */}
        <div className="absolute right-3 top-2/3 rotate-90 origin-right hidden md:block">
          <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Years of medical healthcare
          </span>
        </div>

        <div className="flex flex-col items-center gap-6">

          {/* Big number */}
          <h1 className="text-[140px] md:text-[220px] leading-none font-extrabold text-blue-900 tracking-tight">
            12
          </h1>

          {/* Right content */}
          <div className="flex flex-col gap-6">

            {/* Avatars */}
            <div className="flex items-center -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  alt="Medical expert"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>

            {/* Caption */}
            <p className="max-w-xs text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Trusted experts in medical health and wellness
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
