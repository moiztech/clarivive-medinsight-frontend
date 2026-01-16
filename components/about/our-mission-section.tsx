import { Great_Vibes } from "next/font/google";
const _greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  preload: true,
});
export default function OurMissionSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance">
              Our mission
            </h1>

            {/* First Paragraph */}
            <p className="text-lg leading-relaxed text-slate-700">
              To deliver practical, high-quality training that supports safe
              working practices, strengthens professional competence, and helps
              organisations meet UK regulatory and governance expectations. We
              prioritise clarity over complexity and real-world application over
              theory alone.
            </p>
          </div>

          {/* Right Stats */}
          <div className="space-y-6">
            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="inline-block bg-primary-blue text-white py-7 px-12 rounded-[50px]">
                <h3 className="text-lg sm:text-2xl uppercase font-regular">
                  More than <span className="text-4xl">75</span>
                </h3>
                <p className="text-sm font-light">e learning trainings</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="inline-block bg-primary-blue text-white py-7 px-12 rounded-[50px]">
                <h3 className="text-lg sm:text-2xl uppercase font-regular">
                  Upto <span className="text-4xl">6</span>
                </h3>
                <p className="text-sm font-light">Assets under holding</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="inline-block bg-primary-blue text-white py-7 px-12 rounded-[50px]">
                <h3 className="text-lg sm:text-2xl uppercase font-regular">
                  Only <span className="text-4xl">1</span>
                </h3>
                <p className="text-sm font-light">Centralized platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
