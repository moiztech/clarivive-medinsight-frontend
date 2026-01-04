import { Service } from "@/lib/types";
import { Heart, Eye, Brain, Activity, Syringe, ClipboardList, Stethoscope, Microscope } from "lucide-react";
import ServicesGridCard from "../cards/services-grid-card";

export default function ServicesGrid({
  services = [],
  title = "Our Services",
  description = "We provide various directions",
}: {
  services?: Service[];
  title?: string;
  description?: string;
}) {
  const defaultServices = [
    { title: "Angioplasty", icon: Heart },
    { title: "Cardiology", icon: Activity },
    { title: "Dental", icon: Stethoscope },
    { title: "Endocrinology", icon: Syringe },
    { title: "Eye Care", icon: Eye },
    { title: "Neurology", icon: Brain },
    { title: "Orthopaedics", icon: ClipboardList },
    { title: "RMI", icon: Microscope },
  ];

  return (
    <section className="py-24 bg-white lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <span className="inline-block px-4 py-1 bg-blue-400/10 text-blue-400 text-sm font-semibold rounded-md tracking-wider uppercase">{title}</span>
          <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">{description}</h2>
        </div>
        <div
          className={`grid gap-x-px gap-y-px border border-slate-100 
              overflow-hidden rounded-2xl shadow-sm
              ${services.length < 4 ? "grid-cols-1 md:grid-cols-2 justify-center" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {services.map((service, index) => (
            <ServicesGridCard service={service} key={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
