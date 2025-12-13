import Image from "next/image"

export default function AudiencesSection() {
  const audiences = [
    {
      title: "Employees",
      description: "Onboard, develop, and skill up your people.",
      color: "border-yellow-400",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Customers",
      description: "Show customers the path to long-term success.",
      color: "border-teal-400",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Partners",
      description: "Get partners speaking your revenue-driving language.",
      color: "border-purple-400",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Members",
      description: "Capture members' attention through engaging training.",
      color: "border-red-400",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Extended Enterprise",
      description: "Make training your business's hyper-growth strategy.",
      color: "border-blue-400",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Train every audience</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            No matter who you want to train, LearnUpon is purpose-built for every audience to be trained under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Top Row - 3 items */}
          {audiences.slice(0, 3).map((audience, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative mx-auto w-64 h-64">
                <div className={`absolute inset-0 rounded-full border-8 ${audience.color}`}></div>
                <Image
                  src={audience.image || "/placeholder.svg"}
                  alt={audience.title}
                  width={256}
                  height={256}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
          {/* Bottom Row - 2 items centered */}
          {audiences.slice(3, 5).map((audience, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="relative mx-auto w-64 h-64">
                <div className={`absolute inset-0 rounded-full border-8 ${audience.color}`}></div>
                <Image
                  src={audience.image || "/placeholder.svg"}
                  alt={audience.title}
                  width={256}
                  height={256}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
