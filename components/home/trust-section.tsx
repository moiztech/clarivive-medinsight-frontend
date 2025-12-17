"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mountain, ClipboardCheck, Wallet, Laptop } from "lucide-react"

export default function TrustSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Why 1000s of care providers, schools, and local authorities trust us...
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We've got over 15 years' experience of delivering award-winning training. We are proud to already work with
            1000's of care providers, local authorities and schools nationally to deliver exceptional levels of
            training, which place care and compassion front and center.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Image with CTA */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
              alt="Happy care providers"
              className="w-full h-full object-cover min-h-[600px]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <Button
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg h-14 rounded-xl"
              >
                Find out more about our journey
              </Button>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Steeped in Expertise */}
            <Card className="p-8 hover:shadow-lg transition-shadow bg-white border border-gray-200">
              <div className="mb-6">
                <Mountain className="w-12 h-12 text-yellow-400 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Steeped in Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                We know your world because it's ours too. Our training and staffing solutions are created by experts who
                understand your unique challenges.
              </p>
            </Card>

            {/* Compliance Gurus */}
            <Card className="p-8 hover:shadow-lg transition-shadow bg-white border border-gray-200">
              <div className="mb-6">
                <ClipboardCheck className="w-12 h-12 text-yellow-400 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Gurus</h3>
              <p className="text-gray-600 leading-relaxed">
                We help to keep you compliant. Our experts stay ahead of ever-changing regulations across social care
                and education, so you don't have to.
              </p>
            </Card>

            {/* Affordable Solutions */}
            <Card className="p-8 hover:shadow-lg transition-shadow bg-white border border-gray-200">
              <div className="mb-6">
                <Wallet className="w-12 h-12 text-yellow-400 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Affordable Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                We understand the challenges of the sectors we work in. Which is why our training and staffing solutions
                always put the customer's budget first.
              </p>
            </Card>

            {/* Cutting-edge technology */}
            <Card className="p-8 hover:shadow-lg transition-shadow bg-white border border-gray-200">
              <div className="mb-6">
                <Laptop className="w-12 h-12 text-yellow-400 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cutting-edge technology</h3>
              <p className="text-gray-600 leading-relaxed">
                Our cutting-edge digital platforms are built to be intuitive and accessible. Integrating digital into
                your work life has never been easier.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
