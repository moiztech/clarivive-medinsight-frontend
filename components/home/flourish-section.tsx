import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function FlourishSection() {
  return (
    <section className="py-24 px-6 bg-white max-w-full overflow-hidden">
      <div className="w-full mx-auto">
        <div className="grid lg:grid-cols-2 max-w-full gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 w-full wrap-break-word whitespace-normal">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              We're known for learning,
              <br />
              loved for caring
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Here at Flourish, we like to do things differently. We are all about keeping things simple and delivering
              realistic solutions to real problems. Our ultimate goal is to drive excellence in care for all because we
              believe that everyone deserves the chance to flourish.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From our impressive portfolio of <span className="font-semibold">online courses</span>, our interactive{" "}
              <span className="font-semibold">programmes</span> and our online care shift marketplace, we are redefining
              what recruitment and training looks like, one click at a time.
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-6 text-lg rounded-md">
              The Flourish Journey
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative max-w-full">
            <Image
              src="/images/image-2010.png"
              alt="Flourish team members in navy hoodies"
              width={700}
              height={500}
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
