import React from "react";
export default function ExperienceCredibilitySection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-bold leading-tight text-gray-900">Experience You Can Rely On</h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600">
              Experience shapes how we design and deliver learning — practical, structured, and built around real operational needs rather than abstract theory.
            </p>
          </div>

          {/* Right Cards */}
          <div className="relative flex justify-between gap-8 items-end">
            {/* Card 1 */}
            <div className="rounded-2xl border  border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Recognised UK Guidance</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                We deliver professionally developed training across key areas. All courses are developed in line with recognised UK guidance, best practice, and sector
                expectations.
              </p>
            </div>

            {/* Card 2 – Taller */}
            <div className="rounded-2xl border border-gray-200 bg-gray-100 p-8 shadow-sm sm:row-span-2">
              <h3 className="text-3xl font-semibold text-gray-900 mb-30">Over 12 Years</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Our team brings over 12 years of combined experience across healthcare, social care, and safety-focused training environments.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-gray-200 bg-blue-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-900 mb-20">Flexible Delivery</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-800">
                We offer flexible delivery methods to suit different roles, organisations, and schedules. Every session is structured to ensure learning is relevant, engaging, and
                transferable to the workplace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
