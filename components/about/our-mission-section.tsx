export default function OurMissionSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance">Our mission</h1>

            {/* First Paragraph */}
            <p className="text-lg leading-relaxed text-slate-700">
              To deliver practical, high-quality training that supports safe working practices, strengthens professional competence, and helps organisations meet UK regulatory and
              governance expectations. We prioritise clarity over complexity and real-world application over theory alone.
            </p>

          </div>

          {/* Right Stats */}
          <div className="space-y-12 lg:pt-8">
            {/* Stat 1 */}
            <div className="space-y-2">
              <h3 className="text-5xl sm:text-7xl font-bold text-slate-900">More than 75 </h3>
              <p className="text-lg text-slate-600">e learinign trianingis</p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <h3 className="text-5xl sm:text-7xl font-bold text-slate-900">Upto 6</h3>
              <p className="text-lg text-slate-600">Assets under holding</p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <h3 className="text-5xl sm:text-7xl font-bold text-slate-900">Only 1 </h3>
              <p className="text-lg text-slate-600">Centralized platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
