import { Heart, Eye, Brain, Activity, Syringe, ClipboardList, Stethoscope, Microscope } from "lucide-react"

export default function ServicesGrid() {
  const services = [
    { title: "Angioplasty", icon: Heart },
    { title: "Cardiology", icon: Activity },
    { title: "Dental", icon: Stethoscope },
    { title: "Endocrinology", icon: Syringe },
    { title: "Eye Care", icon: Eye },
    { title: "Neurology", icon: Brain },
    { title: "Orthopaedics", icon: ClipboardList },
    { title: "RMI", icon: Microscope },
  ]

  return (
    <section className="py-24 bg-white lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <span className="inline-block px-4 py-1 bg-blue-400/10 text-blue-400 text-sm font-semibold rounded-md tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-medical-navy">We Provide Various Directions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-px gap-y-px bg-slate-100 border border-slate-100 overflow-hidden rounded-2xl shadow-sm">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer p-10 flex flex-col items-center text-center space-y-6 transition-all duration-300 hover:z-10 hover:shadow-2xl hover:bg-slate-50 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-400 /5 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-400  group-hover:-translate-y-2 group-hover:rotate-3 shadow-inner">
                <service.icon
                  className="w-10 h-10 text-blue-400 transition-colors group-hover:text-white"
                  strokeWidth={1.5}
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-medical-navy">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  There are many variations of passages of Lorem Ipsum available.
                </p>
              </div>
              <button className="text-secondary font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn">
                READ MORE <span className="transition-transform group-hover/btn:translate-x-1">+</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
