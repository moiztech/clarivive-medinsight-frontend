"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function BusinessOutcomesSection() {
  const [activeTab, setActiveTab] = useState("compliance")

  const categories = [
    {
      id: "compliance",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Compliance Training",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
    },
    {
      id: "employee",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 2L15 8L21 9L16.5 14L18 21L12 17.5L6 21L7.5 14L3 9L9 8L12 2Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Employee Development",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "onboarding",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
        </svg>
      ),
      title: "Onboarding",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      hoverBg: "hover:bg-teal-100",
    },
    {
      id: "revenue",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Revenue Enablement",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
    {
      id: "customer",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Customer Training",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      hoverBg: "hover:bg-yellow-100",
    },
    {
      id: "member",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Member Training",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverBg: "hover:bg-pink-100",
    },
  ]

  const tabContent = {
    compliance: {
      headline: "Build a culture of integrity with compliance training",
      description:
        "Protect your organization from risk and ensure compliance across your entire workforce. Litmos' LMS, with region-specific training courses, makes compliance easier, more cost-effective, and even engaging for your employees.",
      benefits: [
        "Reduce risk",
        "Build a culture of integrity",
        "Report and measure results",
        "Improve business performance",
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
    },
    employee: {
      headline: "Work smarter with impactful employee training and development",
      description:
        "Empower your employees to develop their skills, advance their careers, and drive your business forward. Join over 4,000 top-performing companies who trust Litmos to engage and retain their talent.",
      benefits: [
        "Improve skills",
        "Support career growth",
        "Improve business performance",
        "Enhance employee satisfaction",
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop",
    },
    onboarding: {
      headline: "Timely and relevant employee, partner, and customer onboarding",
      description:
        "Simplify onboarding for employees, partners, and customers with our all-in-one learning solution. Streamline your tech stack with an intuitive platform that accelerates time-to-value for everyone.",
      benefits: [
        "Enhance new employee experience",
        "Reduce ramp for revenue teams",
        "Improve time to value for customers",
        "Increase efficiency with one solution",
      ],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop",
    },
    revenue: {
      headline: "Rev up your revenue with impactful sales, partner, and CX training",
      description:
        "Unleash the full potential of your revenue teams – sales, marketing, and customer experience. Drive performance, engagement, and bottom-line growth with Litmos' comprehensive learning solution, trusted by thousands of top-performing companies.",
      benefits: [
        "Improve skills, support re-skilling",
        "Engage revenue teams",
        "Improve business performance",
        "Support career growth",
      ],
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop",
    },
    customer: {
      headline: "Lock in loyalty with impactful customer training",
      description:
        "Increase customer loyalty and retention with impactful training that strengthens their connection to your brand. Litmos' flexible, scalable platform delivers engaging customer training experiences that drive results.",
      benefits: [
        "Engage customers with your brand",
        "Provide 24/7 access to product knowledge",
        "Improve customer satisfaction",
        "Monetize product content",
      ],
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop",
    },
    member: {
      headline: "Capture members' attention through engaging training",
      description:
        "Engage your members with high-quality training content that keeps them coming back. Build a thriving learning community with Litmos' intuitive platform designed for membership organizations.",
      benefits: [
        "Increase member engagement",
        "Deliver consistent training",
        "Track member progress",
        "Build learning communities",
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=800&fit=crop",
    },
  }

  const activeContent = tabContent[activeTab as keyof typeof tabContent]

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Drive business outcomes across your entire organization.
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`${category.bgColor} ${category.hoverBg} relative cursor-pointer rounded-2xl p-5 text-center transition-all duration-300 shadow-md shadow-blue-100 transform hover:scale-105 ${
                activeTab === category.id ? `ring-2 ring-offset-0 ring-blue-200 rounded-b-none scale-102` : ""
              }`}
            >
              <div className={`${category.color} flex justify-center mb-3`}>{category.icon}</div>
              <h3 className="font-medium text-gray-900 text-sm leading-tight">{category.title}</h3>
              <ChevronDown
                className={`w-5 h-5 mx-auto text-purple-600 transition-transform duration-300 ${
                  activeTab === category.id ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
        </div>

        {/* Content Area with Animation */}
        <div className="bg-white rounded-3xl px-8 py-4 lg:py-4 lg:px-12 shadow-sm overflow-hidden">
          <div
            key={activeTab}
            className="grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{activeContent.headline}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{activeContent.description}</p>
              <ul className="space-y-3">
                {activeContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 group"
              >
                Learn more
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 p-8">
                <Image
                  src={activeContent.image || "/placeholder.svg"}
                  alt={activeContent.headline}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Decorative Elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
