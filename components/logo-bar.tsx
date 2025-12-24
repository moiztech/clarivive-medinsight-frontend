import Image from "next/image"

const logos = [
  { name: "The Adecco Group", src: "/adecco-group-logo.jpg" },
  { name: "Hootsuite", src: "/hootsuite-logo.png" },
  { name: "PING", src: "/ping-logo.jpg" },
  { name: "bambooHR", src: "/bamboohr-logo.jpg" },
  { name: "gusto", src: "/gusto-logo.png" },
  { name: "USA Football", src: "/usa-football-logo.jpg" },
]

export function LogoBar() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-slate-500 text-sm font-semibold tracking-widest uppercase mb-10">
          MEET SOME OF OUR 1,500+ CUSTOMERS
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo) => (
            <div key={logo.name} className="relative h-10 w-32 md:w-40">
              <Image src={logo.src || "/placeholder.svg"} alt={logo.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
