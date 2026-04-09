import Image from "next/image";
import { Share2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import AnimateOnScroll from "./ui/animate-on-scroll";

const doctors = [
  {
    designation: "BLS, PEOPLE M&H, PMVA TRAINER",
    name: "Muhammad Ameer Hamza",
    image: "/team/ceo.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/muhammad-ameer-hamza-0743b583",
      facebook: "https://www.facebook.com/ClariviveMedInsight",
      instagram: "https://www.instagram.com/_muhammad_ameer_hamza_",
    },
  },
  {
    designation: "BLS, MEDICATION ADMINISTRATION TRAINER",
    name: "Malik Arsalan Ahmed",
    image: "/team/trainer-1.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/malik-arsalan-ahmed-3aa526276",
      facebook: "https://www.facebook.com/profile.php?id=100007462964848#",
      instagram:
        "https://www.instagram.com/malikarsalanahmed?utm_source=qr",
    },
  },
  {
    designation: "BLS, PEOPLE M&H TRAINER",
    name: "Mubashir Iqbal",
    image: "/team/trainer-2.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/mubashir-iqbal-915159b4/",
      facebook: "https://www.facebook.com/mubash.veil",
      instagram: "https://www.instagram.com/mubaish",
    },
  },
];

export function DoctorsSection() {
  return (
    <section className="py-20 px-5 bg-slate-50 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 mb-6">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#1321F1]" />
            Meet our team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Meet the Experienced Practitioners Behind Our
            <br />
            <span className="italic font-serif text-[#1321F1]">
              Training Courses
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <AnimateOnScroll
              threshold={0.45}
              delay={100 + index * 150}
              key={doctor.name}
            >
              <div className="group flex flex-col items-center">
                <div className="relative w-full aspect-[1/1] cursor-pointer group rounded-3xl overflow-hidden mb-5">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute -bottom-5 right-3 bg-slate-50 rounded-t-full p-2">
                    <button className="p-2 mb-3 bg-slate-950 cursor-pointer text-white rounded-full group-hover:bg-[#1321F1] hover:bg-[#1321F1] transition-colors shadow-lg">
                      <Share2 className="size-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-15 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300 flex right-3 bg-[#1321F1] rounded-full p-2 flex-col items-center gap-2">
                    <a
                      href={doctor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on LinkedIn`}
                      className="p-2 bg-slate-50 cursor-pointer text-slate-800 rounded-full hover:text-[#1321F1] transition-colors shadow-lg"
                    >
                      <FaLinkedinIn className="size-4" />
                    </a>
                    <a
                      href={doctor.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on Facebook`}
                      className="p-2 bg-slate-50 cursor-pointer text-slate-800 rounded-full hover:text-[#1321F1] transition-colors shadow-lg"
                    >
                      <FaFacebookF className="size-4" />
                    </a>
                    <a
                      href={doctor.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doctor.name} on Instagram`}
                      className="p-2 bg-slate-50 cursor-pointer text-slate-800 rounded-full hover:text-[#1321F1] transition-colors shadow-lg"
                    >
                      <FaInstagram className="size-4" />
                    </a>
                  </div>
                </div>
                <h3 className="text-2xl self-start font-medium text-slate-900">
                  {doctor.name}
                </h3>
                <p className="text-lg self-start font-medium text-primary-blue italic">
                  {doctor.designation}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
