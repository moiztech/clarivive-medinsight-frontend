import Image from "next/image";
import AnimateOnScroll from "../ui/animate-on-scroll";

export default function HowItWorks() {
  const steps = [
    {
      title: "Facility",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      rotate: "-rotate-3",
    },
    {
      title: "E-Learning",
      description: "Nulla ante eros, venenatis vel malesuada sit amet luctus.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      rotate: "rotate-2",
    },
    {
      title: "Kid's Courses",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      rotate: "-rotate-2",
    },
    {
      title: "Best Students",
      description: "Nulla ante eros, venenatis vel malesuada sit amet luctus.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      rotate: "rotate-3",
    },
  ];

  const decorations = [
    { type: "star", color: "text-cyan-400", left: "15%", top: "40%" },
    { type: "circle", color: "text-orange-400", left: "42%", top: "30%" },
    { type: "star", color: "text-gray-400", left: "58%", top: "50%" },
    { type: "circle", color: "text-orange-400", left: "85%", top: "35%" },
    { type: "triangle", color: "text-blue-600", left: "90%", top: "25%" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[20rem] font-bold text-gray-300">Process</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-cyan-500 font-medium mb-6">Research & Pedagogy</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">How It Works?</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">Proin ac lobortis arcu, a vestibulum augue. Vivamus ipsum neque, facilisis vel mollis vitae, mollis nec ante. Quisque aliquam dictum condim.</p>
        </div>

        <div className="relative">
          {/* Dotted connecting line */}
          <svg className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 hidden lg:block" style={{ zIndex: 0 }}>
            <path d="M 50 60 Q 300 20, 550 60 T 1050 60" stroke="#22d3ee" strokeWidth="2" strokeDasharray="8,8" fill="none" />
          </svg>

          {/* Decorative shapes */}
          {decorations.map((deco, index) => (
            <div key={index} className={`absolute hidden lg:block ${deco.color}`} style={{ left: deco.left, top: deco.top }}>
              {deco.type === "star" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0l2.5 7.5H20l-6 4.5 2.5 7.5L10 15l-6.5 4.5L6 12 0 7.5h7.5z" />
                </svg>
              )}
              {deco.type === "circle" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="8" r="7" />
                </svg>
              )}
              {deco.type === "triangle" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0l10 20H0z" />
                </svg>
              )}
            </div>
          ))}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <AnimateOnScroll key={index} delay={150 + index * 250} once={false} type="opacity" fromOpacity={0.2 - index * 0.05}>
                <div className="text-center">
                  {/* Polaroid-style image */}
                  <div className={`bg-white p-3 shadow-xl inline-block mb-6 ${step.rotate} hover:rotate-0 transition-transform duration-300`} style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
                    <div className="relative w-64 h-64 border-4 border-cyan-400 border-dashed">
                      <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
