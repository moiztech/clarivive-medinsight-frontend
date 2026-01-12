import { BookOpen, CheckCircle, ShieldCheck, Smile } from "lucide-react";

const commitments = [
  {
    icon: BookOpen,
    title: "Practical, Competence-Focused Learning",
    description:
      "Training designed to support real-world understanding and practical application, helping learners build meaningful competence rather than theoretical familiarity alone.",
  },
  {
    icon: CheckCircle,
    title: "Clear Expectations & Measurable Outcomes",
    description: "Each course sets clear learning objectives and outcomes, enabling learners and organisations to understand what training covers and what it does not.",
  },
  {
    icon: ShieldCheck,
    title: "Aligned With UK Standards",
    description: "Our training is developed in line with relevant UK regulatory guidance and recognised professional and sector frameworks where applicable.",
  },
  {
    icon: Smile,
    title: "Positive Learner Experience",
    description: "We aim to provide a supportive, well-structured learning experience from enrolment through to certification.",
  },
];

export default function OurCommitmentSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold text-gray-900">Our Commitment</h2>
          <p className="mt-4 text-base text-gray-600">
            Our approach is built on clarity, simplicity, and quality. We are committed to delivering training that supports learners and organisations with confidence,
            transparency, and consistency.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-900">{item.title}</h3>

                <p className="mt-3 text-md leading-relaxed text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
