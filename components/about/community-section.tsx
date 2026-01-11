export default function CommunitySection() {
  return (
    <section className="w-full bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance">About Clarivive MedInsight</h2>

            <p className="text-lg leading-relaxed text-slate-700">
              We are a UK-based health, safety, and care training provider delivering clear, practical, and standards-aligned training for individuals and organisations working in
              regulated and safety-critical environments. Our focus is simple: supporting safe practice, regulatory compliance, and professional confidence through training that
              reflects real-world responsibilities.
            </p>
          </div>

          {/* Right Image Gallery */}
          <div className="grid grid-cols-2 gap-4 auto-rows-max">
            {/* Large left image */}
            <div className="col-span-1 row-span-2">
              <div className="h-80 sm:h-96 bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl overflow-hidden">
                <img src="/woman-with-red-hair-in-office-setting.jpg" alt="Professional woman in office" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Top right image */}
            <div className="col-span-1">
              <div className="h-40 sm:h-44 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden">
                <img src="/people-in-collaborative-workspace.jpg" alt="Collaborative workspace" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bottom right image */}
            <div className="col-span-1">
              <div className="h-40 sm:h-44 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl overflow-hidden">
                <img src="/office-environment-with-team.jpg" alt="Office environment" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Side Vertical Gallery (for larger screens) */}
          {/* <div className="flex lg:col-start-2 lg:row-start-1 lg:flex-col gap-4">
            <div className="h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden">
              <img src="/person-in-green-outdoors.jpg" alt="Outdoor lifestyle" className="w-full h-full object-cover" />
            </div>
            <div className="h-40 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl overflow-hidden">
              <img src="/people-in-modern-office.jpg" alt="Modern office" className="w-full h-full object-cover" />
            </div>
            <div className="h-32 bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl overflow-hidden">
              <img src="/plants-and-interior-design.jpg" alt="Interior with plants" className="w-full h-full object-cover" />
            </div>
            <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden">
              <img src="/person-in-casual-setting.jpg" alt="Casual environment" className="w-full h-full object-cover" />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
