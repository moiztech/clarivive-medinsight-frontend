import Image from "next/image";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "Who can access training with Clarivive MedInsight?",
    answer:
      "Our training is available to individual learners and organizations operating within health and social care, including care homes, domiciliary care services, healthcare agencies, independent providers, and related services. Training is designed to support learning and role awareness within employer governance structures.",
  },
  {
    question: "Do your courses provide a qualification or license to practice?",
    answer:
      "No. Our courses provide structured training and learning aligned with relevant UK guidance. Certificates confirm training completion only and do not replace employer competency assessment, supervision, or authorization to practice independently.",
  },
  {
    question: "Are your courses aligned with UK standards?",
    answer:
      "Yes. Our training content is developed in line with relevant UK frameworks and guidance, such as Skills for Care guidance, the Core Skills Training Framework (CSTF), and Health and Safety Executive (HSE) principles, where applicable. We do not claim statutory accreditation unless explicitly stated.",
  },
  {
    question: "How is training delivered?",
    answer:
      "Training may be delivered face-to-face, online through our learning management system (LMS), or via blended learning. Delivery methods depend on the course, learner needs, and organizational requirements.",
  },
  {
    question: "How do certificates work and how long are they valid?",
    answer:
      "Certificates are issued after successful completion of training requirements and validity would be 1 year. Employers remain responsible for determining refresher frequency and ongoing competence.",
  },
  {
    question: "Can organizations monitor staff training progress?",
    answer:
      "Yes. Organizations with approved access can view training status and certificates for their registered staff through our secure organizational portal. Access is read-only and does not allow organizations to amend training outcomes or records.",
  },
  {
    question: "Do you make reasonable adjustments for learners?",
    answer:
      "Where disclosed and appropriate, reasonable adjustments may be considered to support learner participation, in line with the Equality Act 2010. Adjustments are implemented where safe and proportionate and do not compromise learning objectives or safety.",
  },
  {
    question: "How is learner data stored and protected?",
    answer:
      "Learner data is stored securely in accordance with UK GDPR and data protection legislation. Data is processed only for legitimate training, governance, and legal purposes and is not used for profiling or background tracking. Access to records is restricted to authorized users only.",
  },
  {
    question: "What format are your certificates issued in?",
    answer:
      "Certificates are issued in a digital format through our secure learning management system (LMS). Certificates include the learner name, course title, completion date, and validity period where applicable. Paper copies are not routinely issued unless specifically agreed in advance.",
  },
  {
    question: "Is your training accepted across different organizations?",
    answer:
      "Our training supports learning and awareness and is aligned with relevant UK guidance. Acceptance of training is determined by each employer or organization in line with their internal policies, governance arrangements, and commissioning requirements.",
  },
  {
    question: "Do your courses provide CPD credits or points?",
    answer:
      "Some courses may be eligible for Continuing Professional Development (CPD) recognition where applicable. Where CPD applies, this will be clearly stated on the course information and certificate. CPD recognition does not imply qualification, professional registration, or authorization to practice.",
  },
  {
    question: "What is your refund policy for training courses?",
    answer:
      "Refund eligibility depends on the type of training booked. Fees for face-to-face training are generally non-refundable once delivered or where cancellation occurs outside agreed notice periods. E-learning refunds may be considered only where access has not been activated and notification is provided within the agreed timeframe.",
  },
  {
    question: "Can I get a refund if I cannot attend a face-to-face course?",
    answer:
      "If you are unable to attend a face-to-face course, you may request a reschedule in line with our published notice periods. Non-attendance or late cancellation does not automatically entitle learners or organizations to a refund, as trainer time, venue, and preparation costs are incurred.",
  },
  {
    question: "How does organizational access to the portal work?",
    answer:
      "Approved organizations are provided read-only access to the organizational portal, allowing visibility of staff training status and certificates. Organizations cannot edit records, assessments, or outcomes. Access is limited to staff linked to the organization and authorized users only.",
  },
  {
    question:
      "What happens to organizational access if staff leave or accounts are inactive?",
    answer:
      "Organizations are responsible for keeping staff records up to date, including removing leavers. Charges incurred due to outdated records remain the organization’s responsibility. Inactive user accounts may be suspended or removed in line with our data retention and security policies.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-8 bg-white lg:px-10 2xl:px-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Image & Contact */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/FAQ-SECTION-IMAGE.webp"
                alt="Doctor and patient"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 flex items-center gap-6 border border-emerald-100">
              <div className="p-4 bg-indigo-600 rounded-full text-white shadow-lg">
                <Phone className="size-8" />
              </div>
              <div>
                <p className="text-slate-500 font-medium">Emergency Call</p>
                <p className="text-2xl font-bold text-slate-900">
                  +44 (07345 052986)
                </p>
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
                Get answers to common medical questions, treatments & healthcare
                services for informed decision-making.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="space-y-4 my-1 py-1"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white hover:bg-indigo-50 border cursor-pointer group border-slate-200 rounded-xl px-6 data-[state=open]:bg-indigo-50 data-[state=open]:ring-2 data-[state=open]:ring-indigo-600/10 data-[state=open]:border-indigo-600 transition-all"
                >
                  <AccordionTrigger className="hover:no-underline  cursor-pointer font-bold text-slate-900 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
