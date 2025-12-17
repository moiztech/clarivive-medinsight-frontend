import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutSection() {
  const services = [
    "Comprehensive Inpatient Services",
    "Medical And Surgical Services",
    "Outpatient Services",
    "Medicine & Instrument",
    "Specialised Support Service",
    "Instant Operation & Appointment",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Healthcare professional consulting with patient"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">WHAT ABOUT US</Badge>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-balance">
              The Heart And Science Of Medic Test
            </h2>

            <p className="text-gray-600 leading-relaxed">
              It is a long established fact that a reader will be distracted by at its layout. Lorem Ipsum is simply
              dummy text of the printing and typesetting industry.
            </p>

            {/* Services List */}
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{service}</span>
                </li>
              ))}
            </ul>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base">
              READ MORE
              <span className="ml-2">+</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
