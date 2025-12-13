export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Great selection of courses that suit our clients at a great price. Easy to purchase the relevant courses. We are able to support more clients to meet their training needs",
    },
    {
      quote:
        "Really straightforward to purchase and enrol learning. The course was easy to navigate and lots of added information. Fully understandable from start to finish",
    },
    {
      quote:
        "Very easy website to use. Great range of courses. Simple to allocate courses to participants by email. Saves time and gave learners the responsibility to complete before the deadline.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-cyan-400 via-cyan-300 to-blue-300">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Millions of learners love us</h2>
          <p className="text-lg text-gray-900 max-w-4xl mx-auto">
            Discover over 300 certified eLearning courses covering compliance topics like Health & Safety, Food Safety,
            Safeguarding or Personal Skills Development in line with UK legislation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-cyan-300/50 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/30">
              <div className="text-6xl text-red-600 font-serif mb-4">"</div>
              <p className="text-gray-900 leading-relaxed">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
