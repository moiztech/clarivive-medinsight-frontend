export default function FeaturesSection() {
  const features = [
    {
      title: "Training delivery",
      description:
        "Your staff deserve a simple and effective learning experience. Online training allows your team to access digestible courses at anytime, anywhere.",
    },
    {
      title: "Course content",
      description:
        "Our library of high-quality, video-based online courses covers topics like Health & Safety, HR, Compliance, and Soft Skills.",
    },
    {
      title: "Management & reporting",
      description:
        "Access the smart features you need without the crazy cost of an enterprise LMS, saving you both time and money.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
