import Image from "next/image"

export default function LMSSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Easy management and reporting
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Atlas, our Learning Management System, gives you that 'at a glance' view so you can quickly see if your
              staff are up to date with their chosen online training courses and personal development while still
              providing the tools to drill down and look at the finer details.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Easily onboard your staff, take the headache out of administration, and let Atlas automate your training
              schedules.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-pink-500 font-semibold text-lg hover:text-pink-600 transition-colors"
            >
              Learn more about our Learning Management System →
            </a>
          </div>

          {/* Right - Dashboard Image */}
          <div className="relative">
            <Image
              src="/images/image-2017.png"
              alt="Atlas Learning Management System dashboard"
              width={700}
              height={500}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
