import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutHero() {
  const services = [
    "Comprehensive Inpatient Services",
    "Medical And Surgical Services",
    "Outpatient Services",
    "Medicine & instrument",
    "Specialised Support Service",
    "Instant Operation & Appointment",
  ]

  return (
    <section className="py-24 bg-white overflow-hidden lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
                alt="Healthcare professional with patient"
                width={800}
                height={900}
                className="w-full h-auto object-cover aspect-[4/4]"
              />
            </div>
            {/* Decorative element inspired by Paco/Brittany style */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-medical-navy/5 rounded-full z-0 blur-3xl" />
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-blue-400/20 text-blue-400 text-sm font-normal rounded-md tracking-wide uppercase">
                What About Us
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-medical-navy leading-[1.1]">
                The Heart And Science Of <span className="text-blue-400 font-serif">Medic Test</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                It is a long established fact that a reader will be distracted by at its layout. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </p>
            </div>

            <ul className="grid grid-cols-1  gap-y-4 gap-x-8">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-3 group">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-400/10 flex items-center justify-center transition-colors group-hover:bg-blue-400">
                    <Check className="w-3.5 h-3.5 text-blue-400 transition-colors group-hover:text-white" />
                  </div>
                  <span className="text-medical-navy font-medium text-base">{service}</span>
                </li>
              ))}
            </ul>

            <Button className="h-14 px-10 bg-blue-400 hover:bg-blue-400/90 text-white rounded-md text-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-400/20">
              READ MORE +
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
