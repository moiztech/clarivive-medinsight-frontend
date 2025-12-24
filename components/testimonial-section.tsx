import Image from "next/image"
import { Star, Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Rating and AI Doctor */}
          <div className="relative">
            <div className="absolute top-0 left-0 bg-white shadow-xl rounded-2xl p-6 z-10 border border-slate-100 transform -translate-x-4 -translate-y-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-slate-900">4.9</span>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="size-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm font-medium">(2.5k+ reviews)</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-indigo-50">
              <Image src="/placeholder.svg" alt="AI Medical Robot" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column: Testimonial Text */}
          <div className="space-y-10">
            <div className="text-indigo-100">
              <Quote className="size-20 fill-current" />
            </div>

            <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic">
              "The medical team is incredibly knowledgeable and thorough. I felt confident in their care every step of
              the way. I'm so thankful for their expertise. I always check Healthline when I have a question about
              symptoms, medications, or diet. The articles are reviewed by professionals, and I like that they cite
              their sources. It feels trustworthy and not too overwhelming."
            </p>

            <div className="flex items-center gap-6">
              <div className="relative size-16 rounded-full overflow-hidden ring-4 ring-indigo-50">
                <Image src="/female-medical-professional.png" alt="Sapphire Rose" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Sapphire Rose</h4>
                <p className="text-indigo-600 font-medium italic">Dental</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
