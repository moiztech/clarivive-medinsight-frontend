import Image from "next/image"
import { Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How often should I have a general health check-up?",
    answer:
      "Seek emergency care if you experience severe chest pain, difficulty breathing, sudden weakness, heavy bleeding, confusion, or loss of consciousness.",
  },
  {
    question: "How do I know if my condition requires emergency care?",
    answer:
      "Generally, if you have severe symptoms that came on suddenly, it's best to seek immediate medical attention. Our team is available 24/7 for consultations.",
  },
  {
    question: "What are the best ways to manage stress and anxiety?",
    answer:
      "Management includes regular exercise, proper sleep, mindfulness techniques, and professional counseling if needed.",
  },
  {
    question: "What tests are included in a routine health screening?",
    answer:
      "A routine screening typically includes blood pressure checks, cholesterol levels, blood glucose, and other vital health markers.",
  },
]

export function FaqSection() {
  return (
    <section className="py-24 bg-white lg:px-10 2xl:px-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Image & Contact */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image src="/home/doctor-consult.jpg" alt="Doctor and patient" fill className="object-cover" />
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 flex items-center gap-6 border border-emerald-100">
              <div className="p-4 bg-indigo-600 rounded-full text-white shadow-lg">
                <Phone className="size-8" />
              </div>
              <div>
                <p className="text-slate-500 font-medium">Emergency Call</p>
                <p className="text-2xl font-bold text-slate-900">+1-868-842-7758</p>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 mb-6">
                <span className="mr-2 h-1 w-1 rounded-full bg-slate-900" />
                FAQ's
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Medical FAQs – Everything
                <br />
                You Need to Know
              </h2>
              <p className="text-slate-600 text-lg">
                Get answers to common medical questions, treatments & healthcare services for informed decision-making.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white hover:bg-indigo-50 border cursor-pointer group border-slate-200 rounded-xl px-6 data-[state=open]:bg-indigo-50 data-[state=open]:ring-2 data-[state=open]:ring-indigo-600/10 data-[state=open]:border-indigo-600 transition-all"
                >
                  <AccordionTrigger className="hover:no-underline  cursor-pointer font-bold text-slate-900 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
