import { ArrowUpRight, Brain, Flower2, Bone, Activity } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "../ui/animate-on-scroll";

export default function MedicalServices() {
  const services = [
    {
      icon: Brain,
      title: "Neurology",
      description: "Neurology is the branch of medicine that focuses on the diagnosis, treatment, and management of disorders.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    {
      icon: Flower2,
      title: "Holistic Care",
      description: "It recognizes that health is influenced by a combination of physical, mental, emotional, and spiritual factors.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    },
    {
      icon: Bone,
      title: "Orthopedic",
      description: "Focuses on the diagnosis, treatment, and rehabilitation of musculoskeletal conditions and injuries.",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80",
    },
    {
      icon: Activity,
      title: "Diagnostics",
      description: "Accurate testing and screening services to detect, monitor, and diagnose various medical conditions.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden lg:px-10 2xl:px-15">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-full text-sm text-white mb-6">Our Department</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Our Medical Services – Expert Care for <span className="italic font-serif">Every Patient</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <svg width="0" height="0" className="absolute">
            <defs>
              {/* This path creates a “bite” / concave curve at bottom-right */}
              <clipPath id="card-br-curve" clipPathUnits="objectBoundingBox">
                {/* objectBoundingBox uses 0..1 coords */}
                <path
                  d="
            M 0 0
            H 1
            V 0.78
            C 1 0.92, 0.92 1, 0.78 1
            H 0
            Z
          "
                />
              </clipPath>
            </defs>
          </svg>
          {services.map((service, index) => (

            <AnimateOnScroll key={index} delay={100 + index * 250}>
            <div key={index} className="bg-white rounded-3xl overflow-hidden group hover:scale-103 transition-transform duration-300" style={{ clipPath: "url(#card-br-curve)" }}>
              <div className="relative h-54 2xl:h-64">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <Button variant="ghost" size="icon-lg" className="ml-auto shadow-xl me-1 flex rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors">
                  <ArrowUpRight className="w-8 h-8" />
                </Button>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Decorative back to top button */}
        {/* <button className="fixed bottom-8 right-8 w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <ArrowUpRight className="w-6 h-6" />
        </button> */}
      </div>
    </section>
  );
}
