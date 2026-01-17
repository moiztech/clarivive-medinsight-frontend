import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function QualityGovern() {
  const services = [
    "Skills for Care guidance",
    "Core Skills Training Framework (CSTF)",
    "Health and Safety Executive (HSE) guidance",
  ];

  return (
    <section className="py-24 bg-white overflow-hidden lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-blue-400/20 text-blue-400 text-sm font-normal rounded-md tracking-wide uppercase">
                Quality & Governance
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-medical-navy leading-[1.1]">
                Quality &{" "}
                <span className="text-blue-400 font-serif">Governance</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Our training is developed and reviewed in line with relevant UK
                guidance, including where applicable:
              </p>
            </div>

            <ul className="grid grid-cols-1  gap-y-4 gap-x-8">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-3 group">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-400/10 flex items-center justify-center transition-colors group-hover:bg-blue-400">
                    <Check className="w-3.5 h-3.5 text-blue-400 transition-colors group-hover:text-white" />
                  </div>
                  <span className="text-medical-navy font-medium text-base">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Training certificates confirm course completion and learning
              outcomes achieved. They do not replace employer induction,
              supervision, or role-specific competency sign-off.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/QUALITY-&-GOVERNANCE-IMG.jpg"
                alt="Healthcare professional with patient"
                width={800}
                height={900}
                className="w-full h-auto object-cover object-[bottom_center] aspect-[4/4]"
              />
            </div>
            {/* Decorative element inspired by Paco/Brittany style */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-medical-navy/5 rounded-full z-0 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
