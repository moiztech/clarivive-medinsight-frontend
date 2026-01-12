import { LucideIcon, Target, CircleCheckBig, Handshake, GraduationCap } from "lucide-react";
import AnimateOnScroll from "../ui/animate-on-scroll";
import Image from "next/image";

type AdvantageItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type LaboratoryAdvantagesProps = {
  badgeText?: string;
  heading?: string;
  highlightedText?: string;
  headingPost?: string;
  imageSrc?: string;
  imageAlt?: string;
  advantages?: AdvantageItem[];
};
export default function LaboratoryAdvantages({
  badgeText = "Why Choose Us",
  heading = "Why Choose Our",
  highlightedText = "Healthcare Training",
  headingPost = 'Courses:',
  imageSrc = "/atom.png",
  imageAlt = "Molecular Structure",
  advantages = [
    {
      icon: Target,
      title: "Practice-Focused Training Delivery",
      description: "Structured, practical training designed to support safe practice in health and social care settings.",
    },
    {
      icon: CircleCheckBig,
      title: "Quality, Governance & Standards Alignment",
      description: "Training developed in line with relevant UK guidance and sector frameworks, supporting consistency, safety, and regulatory confidence.",
    },
    {
      icon: Handshake,
      title: "Partnership-Led Training Support",
      description: "Working with health and social care organizations to deliver training that fits local policies, roles, and operational needs.",
    },
    {
      icon: GraduationCap,
      title: "Experienced Healthcare Trainers",
      description: "Training delivered by practitioners with relevant sector experience and subject knowledge appropriate to the courses provided.",
    },
  ],
}: LaboratoryAdvantagesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto lg:px-20 2xl:px-25">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left side */}
          <div className="shrink-0 lg:w-1/3">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 mb-6">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
              {badgeText}
            </span>

            <div className="relative w-80 h-80 text-center mx-auto">
              <Image src={imageSrc} alt={imageAlt} width={240} height={240} className="w-full h-full object-cover opacity-20" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {heading} <span className="text-primary-blue italic font-serif">{highlightedText}</span> {headingPost}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {advantages.map((advantage, index) => (
                <AnimateOnScroll key={index} delay={100 + index * 250} threshold={0.8}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <advantage.icon className="w-6 h-6 text-primary-blue" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
