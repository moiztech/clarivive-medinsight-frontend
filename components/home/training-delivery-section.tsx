import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function TrainingDeliverySection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left - Device Mockup */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/home/Comp Image.png"
                alt="Learning platform on multiple devices"
                width={600}
                height={400}
                className="w-full"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Simple training delivery
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              An accessible and simple-to-use learning experience which delivers online training effectively for
              everyone.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our online training courses are compatible on any device, include closed captions, and can be machine
              translated into over 41 international languages.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-pink-500 font-semibold text-lg hover:text-pink-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 mr-1" />
              Learn more about training delivery
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Over 250 high quality online courses
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              With an extensive library of over 250 high-quality eLearning courses available in 41+ languages, we've
              certainly got a course or two for your staff. These online courses are perfect for building up the core
              skills of your employees and helping them towards legislative compliance.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-pink-500 font-semibold text-lg hover:text-pink-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 mr-1" />
              Learn more about our online courses content
            </a>
          </div>

          {/* Right - Accreditation Card */}
          <div>
            <Image src="/home/Image Accpet& Approved.png" alt="Accreditation Card" width={600} height={400} className="w-full" />
          </div>
          {/* <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="bg-yellow-400 rounded-2xl p-8 text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900">APPROVED & ACCREDITED</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Image
                src="/placeholder.svg?height=80&width=150"
                alt="IOSH Approved"
                width={150}
                height={80}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=80&width=150"
                alt="CPD Certified"
                width={150}
                height={80}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=80&width=150"
                alt="RoSPA Approved"
                width={150}
                height={80}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=80&width=150"
                alt="IIRSM Approved"
                width={150}
                height={80}
                className="mx-auto"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
