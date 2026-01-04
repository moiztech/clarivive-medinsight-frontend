"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function BusinessOutcomesSection() {
  const [activeTab, setActiveTab] = useState("compliance");

  const categories = [
    {
      id: "compliance",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Individual Learners",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
    },
    {
      id: "employee",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L15 8L21 9L16.5 14L18 21L12 17.5L6 21L7.5 14L3 9L9 8L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "For Organizations",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "onboarding",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
        </svg>
      ),
      title: "Health Care Providers",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      hoverBg: "hover:bg-teal-100",
    },
    {
      id: "revenue",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Social Care Organizations",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
    {
      id: "customer",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Healthcare Agencies & Workforce Providers",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      hoverBg: "hover:bg-yellow-100",
    },
    {
      id: "member",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Independent & Specialist Care Services",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverBg: "hover:bg-pink-100",
    },
  ];

  const tabContent = {
    compliance: {
      headline: "Individual Learners",
      description:
        "Structured training for individuals working or seeking to work in health and social care roles, designed to support learning, confidence, and role awareness within clear professional boundaries.",
      points: [
        "Easy course selection and online booking",
        "Face-to-face, online, or blended learning options",
        "Clear learner declarations and consent process",
        "Certificates confirming training completion only",
      ],
      ctas: [
        {
          label: "View Course 1",
          href: "/courses/course-1",
        },
        {
          label: "View Course 2",
          href: "/courses/course-2",
        },
      ],
      image: "/home/Image 03.png",
    },

    employee: {
      headline: "For organizations",
      description:
        "Training solutions for organizations requiring consistent, auditable training delivery while retaining full responsibility for supervision, competence assessment, and workforce governance.",
      points: [
        "organizational training planning and support",
        "Secure oversight of staff training records",
        "Flexible delivery aligned to operational needs",
        "Clear separation between training and deployment decisions",
      ],
      ctas: [
        {
          label: "For organizations",
          href: "/for-organizations",
        },
      ],
      image: "/home/Image 03.png",
    },

    onboarding: {
      headline: "Health Care Providers",
      description:
        "Training support for NHS services and independent healthcare providers across clinical and non-clinical settings, aligned with relevant UK guidance and organizational governance frameworks.",
      points: [
        "Mandatory and refresher training options",
        "Role-appropriate course content",
        "Secure records to support audit and assurance",
        "Delivery aligned with service environments",
      ],
      ctas: [],
      image: "/home/Image 03.png",
    },

    revenue: {
      headline: "Social Care Organizations",
      description:
        "Training for care homes, supported living, and domiciliary care services, reflecting real-world care environments and supporting consistency, safety, and inspection readiness.",
      points: [
        "Practical training for care settings",
        "Mandatory and refresher learning",
        "Blended learning to support flexible teams",
        "Support for internal governance processes",
      ],
      ctas: [],
      image: "/home/Image 03.png",
    },

    customer: {
      headline: "Healthcare Agencies & Workforce Providers",
      description: "Consistent training delivery for agencies supplying temporary, bank, or contract staff into health and social care environments.",
      points: [
        "Standardized training across staff groups",
        "Clear certification boundaries",
        "Organizational visibility of training status",
        "Centralized records for compliance support",
      ],
      ctas: [],
      image: "/home/Image 03.png",
    },

    member: {
      headline: "Independent & Specialist Care Services",
      description: "Tailored training support for independent providers and specialist services operating under their own policies, risk frameworks, and service models.",
      points: ["Bespoke training discussions", "Site-specific delivery where appropriate", "Alignment with local service needs", "Clear professional and governance boundaries"],
      ctas: [],
      image: "/home/Image 03.png",
    },
  };

  const activeContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">Supporting Training Across Health & Social Care</h2>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:px-6 xl:px-6">
          {categories.map((category, index) => (
            <div key={category.id}>
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`
                    ${category.bgColor} ${category.hoverBg}
                    w-full h-full relative cursor-pointer
                    rounded-3xl p-3 text-center
                    transition-all duration-300
                    shadow-lg shadow-blue-200
                    transform hover:scale-105
                    ${activeTab === category.id ? "shadow-none! bg-gray-100! rounded-b-none z-10 -mb-6 scale-105" : ""}
                  `}
              >
                <div
                  className={`${category.color} flex justify-center mb-3 w-14 h-14 items-center mx-auto transition-transform duration-300 py-2 ${
                    activeTab === category.id ? "scale-120" : ""
                  }`}
                >
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-md leading-tight">{category.title}</h3>
                <ChevronDown className={`w-5 h-5 mx-auto text-purple-600 transition-transform duration-300 ${activeTab === category.id ? "rotate-180" : ""}`} />
                {activeTab === category.id && (
                  <div className="absolute hidden xl:block top-full left-0 right-0 h-8 bg-gray-100 z-0">
                    {index === 0 ? " " : <span className="absolute -left-4 -bottom-4 w-4 h-7 bg-gray-100 rounded-tl-4xl" />}
                    {index === categories.length - 1 ? " " : <span className="absolute -right-4 -bottom-4 w-4 h-7 bg-gray-100 rounded-tr-4xl" />}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Content Area with Animation */}
        <div className="bg-gray-100 rounded-4xl px-8 pt-10 pb-6 lg:px-6 shadow-sm overflow-hidden relative">
          <div key={activeTab} className="grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{activeContent.headline}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{activeContent.description}</p>
              <ul className="space-y-3">
                {activeContent.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              {activeContent.ctas.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {activeContent.ctas.map((cta, index) => (
                    <a
                      key={index}
                      href={cta.href}
                      className="inline-flex items-center px-6 py-3 rounded-full
                   bg-purple-600 text-white font-semibold
                   hover:bg-purple-700 transition-all"
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}

              {/* <a href="#" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 group">
                Learn more
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span> */}
              {/* </a> */}
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 p-8">
                <Image src={activeContent.image || "/placeholder.svg"} alt={activeContent.headline} width={600} height={600} className="w-full h-full object-cover rounded-full" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl animate-bounce" style={{ animationDuration: "3s" }} />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full animate-pulse" style={{ animationDuration: "2s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
