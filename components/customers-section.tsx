import Image from "next/image"

export default function CustomersSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <h3 className="text-center text-sm font-semibold text-gray-500 tracking-wider uppercase">
          MEET SOME OF OUR 1,500+ CUSTOMERS
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          <Image src="/placeholder.svg?height=40&width=140" alt="The Adecco Group" width={140} height={40} />
          <Image src="/placeholder.svg?height=40&width=140" alt="Hootsuite" width={140} height={40} />
          <Image src="/placeholder.svg?height=40&width=140" alt="PING" width={140} height={40} />
          <Image src="/placeholder.svg?height=40&width=140" alt="BambooHR" width={140} height={40} />
          <Image src="/placeholder.svg?height=40&width=140" alt="Gusto" width={140} height={40} />
          <Image src="/placeholder.svg?height=40&width=140" alt="USA Football" width={140} height={40} />
        </div>
      </div>
    </section>
  )
}
