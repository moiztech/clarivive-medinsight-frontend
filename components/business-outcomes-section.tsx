import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function BusinessOutcomesSection() {
  const categories = [
    {
      icon: "⏱️",
      title: "Compliance Training",
      color: "from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: "🌱",
      title: "Employee Development",
      color: "from-blue-100 to-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: "🎯",
      title: "Onboarding",
      color: "from-teal-100 to-teal-50",
      iconColor: "text-teal-600",
    },
    {
      icon: "💰",
      title: "Revenue Enablement",
      color: "from-green-100 to-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: "🤝",
      title: "Customer Training",
      color: "from-yellow-100 to-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: "⭐",
      title: "Member Training",
      color: "from-pink-100 to-pink-50",
      iconColor: "text-pink-600",
    },
  ]

  const benefits = [
    "Reduce risk",
    "Build a culture of integrity",
    "Report and measure results",
    "Improve business performance",
  ]

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Section */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto">
            Drive business outcomes across your entire organization.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center space-y-4 hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className={`text-5xl ${category.iconColor} flex justify-center`}>
                  <span>{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Training Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-gray-100 to-white rounded-3xl p-12">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Build a culture of integrity with compliance training
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Protect your organization from risk and ensure compliance across your entire workforce. Litmos' LMS, with
              region-specific training courses, makes compliance easier, more cost-effective, and even engaging for your
              employees.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="inline-block text-purple-600 font-semibold hover:text-purple-700">
              Learn more →
            </a>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/images/image-2014.png"
              alt="Woman in green sweater with training dashboard"
              width={600}
              height={600}
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
