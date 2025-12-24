import Image from "next/image"
import { Share2 } from "lucide-react"

const doctors = [
  {
    name: "Dr. Lawson Bourne",
    image: "/male-doctor-smiling.jpg",
  },
  {
    name: "Dr. Hailey Marie",
    image: "/female-doctor-smiling.png",
  },
  {
    name: "Dr. Jayne Adams",
    image: "/older-male-doctor-smiling.jpg",
  },
]

export function DoctorsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 mb-6">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
            Meet the Dentist
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Meet the Doctor Who Keeps
            <br />
            Your <span className="italic font-serif text-indigo-500">Smile Healthy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-xl">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute bottom-4 right-4 p-3 bg-slate-950 text-white rounded-full hover:bg-indigo-600 transition-colors shadow-lg">
                  <Share2 className="size-5" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{doctor.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
