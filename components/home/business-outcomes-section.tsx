"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Building2,
  Stethoscope,
  HeartHandshake,
  Users,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function BusinessOutcomesSection() {
  const [activeTab, setActiveTab] = useState("compliance");

  const categories = [
    {
      id: "compliance",
      icon: <User className="w-full h-full" />,
      title: "Individual Learners",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "employee",
      icon: <Building2 className="w-full h-full" />,
      title: "Organizations",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "onboarding",
      icon: <Stethoscope className="w-full h-full" />,
      title: "Health Care Providers",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "revenue",
      icon: <HeartHandshake className="w-full h-full" />,
      title: "Social Care Organizations",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "customer",
      icon: <Users className="w-full h-full" />,
      title: "Healthcare Agencies & Workforce Providers",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      id: "member",
      icon: <ShieldCheck className="w-full h-full" />,
      title: "Independent & Specialist Care Services",
      color: "text-primary-blue",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
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
          label: "Online Courses",
          href: "/courses/online",
        },
        {
          label: "Face-to-Face Courses",
          href: "/courses/face-to-face",
        },
      ],
      image: "/INDIVIDUAL-LARNER-ICON.svg",
    },

    employee: {
      headline: "Organizations",
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
          label: "Learn more",
          href: "/organizations",
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
      ctas: [
        {
          label: "Learn more",
          href: "/organizations",
        },
      ],
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
      ctas: [
        {
          label: "Learn more",
          href: "/organizations",
        },
      ],
      image: "/home/Image 03.png",
    },

    customer: {
      headline: "Healthcare Agencies & Workforce Providers",
      description:
        "Consistent training delivery for agencies supplying temporary, bank, or contract staff into health and social care environments.",
      points: [
        "Standardized training across staff groups",
        "Clear certification boundaries",
        "Organizational visibility of training status",
        "Centralized records for compliance support",
      ],
      ctas: [
        {
          label: "Learn more",
          href: "/organizations",
        },
      ],
      image: "/home/Image 03.png",
    },

    member: {
      headline: "Independent & Specialist Care Services",
      description:
        "Tailored training support for independent providers and specialist services operating under their own policies, risk frameworks, and service models.",
      points: [
        "Bespoke training discussions",
        "Site-specific delivery where appropriate",
        "Alignment with local service needs",
        "Clear professional and governance boundaries",
      ],

      ctas: [
        {
          label: "Learn more",
          href: "/organizations",
        },
      ],
      image: "/home/Image 03.png",
    },
  };

  const activeContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Supporting Training Across Health & Social Care
          </h2>
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
                  className={`${category.color} flex justify-center mb-3 w-14 h-14 items-center mx-auto transition-transform duration-200 py-2 ${
                    activeTab === category.id ? "scale-120" : ""
                  }`}
                >
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-md leading-tight">
                  {category.title}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 mx-auto text-purple-600 transition-transform duration-300 ${activeTab === category.id ? "rotate-180" : ""}`}
                />
                {activeTab === category.id && (
                  <div className="absolute hidden xl:block top-full left-0 right-0 h-8 bg-gray-100 z-0">
                    {index === 0 ? (
                      " "
                    ) : (
                      <span className="absolute -left-4 -bottom-4 w-4 h-7 bg-gray-100 rounded-tl-4xl" />
                    )}
                    {index === categories.length - 1 ? (
                      " "
                    ) : (
                      <span className="absolute -right-4 -bottom-4 w-4 h-7 bg-gray-100 rounded-tr-4xl" />
                    )}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Content Area with Animation */}
        <div className="bg-gray-100 rounded-4xl px-8 pt-10 pb-6 lg:px-6 shadow-sm overflow-hidden relative">
          <div
            key={activeTab}
            className="grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {activeContent.headline}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {activeContent.description}
              </p>
              <ul className="space-y-3">
                {activeContent.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              {activeContent.ctas.length > 0 && (
                <div className="flex flex-wrap gap-8 pt-4">
                  {activeContent.ctas.map((cta, index) => (
                    //   <a
                    //     key={index}
                    //     href={cta.href}
                    //     className="inline-flex items-center px-6 py-3 rounded-full
                    //  bg-purple-600 text-white font-semibold
                    //  hover:bg-purple-700 transition-all"
                    //   >
                    //     {cta.label}
                    //   </a>
                    <Link
                      key={index}
                      href={`${cta.href}`}
                      className="text-primary-blue  underline-offset-2 py-2 font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn"
                    >
                      {cta.label}{" "}
                      <span className="transition-transform group-hover/btn:translate-x-1">
                        +
                      </span>
                    </Link>
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
  );
}
