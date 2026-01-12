import { CheckCircle2 } from "lucide-react";

const differentiators = [
  "Training grounded in real workplace scenarios",
  "Clear learning outcomes linked to role responsibilities",
  "Alignment with UK standards and professional frameworks",
  "Focus on competence, confidence, and safe practice",
];

export default function WhoWeAreSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column – Who We Are */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900">
              Who We Are
            </h2>

            <p className="mt-5 text-base leading-relaxed text-gray-700">
              Clarivive MedInsight supports learners across health, social care,
              and wider workplace safety roles.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Our training is developed and delivered by professionals with
              frontline experience, ensuring learners understand not only what
              is required of them, but why it matters in practice.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              We recognise the operational pressures faced by staff and
              organisations. Our courses are designed to be relevant,
              achievable, and directly applicable to day-to-day work.
            </p>
          </div>

          {/* Right Column – What Sets Us Apart */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900">
              What Sets Us Apart
            </h2>

            <ul className="mt-6 space-y-4">
              {differentiators.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-base text-gray-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
