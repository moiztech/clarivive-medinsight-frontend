import Image from "next/image"

export default function TestimonialCardSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="text-2xl font-bold text-gray-900">gusto</div>
            <blockquote className="text-2xl font-semibold text-gray-900 leading-relaxed">
              "The investment versus the business impact of LearnUpon is outsized. We're seeing real results. We're
              reaping the rewards."
            </blockquote>
            <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
              Read the story →
            </a>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Gusto team members"
              width={300}
              height={300}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
