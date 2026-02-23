import Image from "next/image";
import { Star } from "lucide-react";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ProcessSectionProps = {
  headingMain?: string;
  headingHighlight?: string;
  description?: string;
  steps?: ProcessStep[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  badgeText?: string;
  badgeIcon?: React.ComponentType<any>;
};

export default function ProcessSection(props: ProcessSectionProps) {
  const {
    headingMain = "How ",
    headingHighlight = "our platform",
    description = "Navigating your healthcare journey with HealNet is seamless. Just follow these steps mentioned below to proceed with your selected services. You can also see our FAQ section for more guidance.",
    steps = [
      {
        number: "1",
        title: "Create Your Profile",
        description:
          "Sign up and fill in your medical history securely. Setting up your profile this way would ensure that you stay up-to-date with your medical processes.",
      },
      {
        number: "2",
        title: "Choose Your Service",
        description:
          "Select from our range of services and book a consultation. Booking a consultation with HealNet is fairly simple and straight-forward.",
      },
      {
        number: "3",
        title: "Meet Your Doctor",
        description:
          "Have a virtual consultation with one of our certified specialists, or go for a physical visit to the doctor in case you opted for a physical check-up.",
      },
    ],
    imageSrc = "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop",
    imageAlt = "Certified medical specialist",
    imageWidth = 600,
    imageHeight = 700,
    badgeText = "Best Certified Team of Specialists",
    badgeIcon = Star,
  } = props;

  const BadgeIcon = badgeIcon;

  return (
    <section className="py-24 px-8 bg-white lg:px-10 2xl:px-15 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M200 100L200 50M200 350L200 300M100 200L50 200M350 200L300 200"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-medical-navy">
            {headingMain}
            <span className="text-primary-blue">{headingHighlight}</span> works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="space-y-12 relative">
              <div className="absolute left-[26px] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-secondary/30 hidden md:block" />

              {steps.map((step, index) => (
                <div key={index} className="flex gap-8 relative group">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-secondary/20 z-10 transition-transform group-hover:scale-110">
                    {step.number}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-medical-navy group-hover:text-secondary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative rounded-[40px] overflow-hidden border-2 border-blue-300">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto object-cover aspect-4/3"
                />
                <div className="absolute bottom-5 lg:bottom-10 lg:left-10 left-2 right-2 lg:right-10 bg-white rounded-2xl p-3 lg:p-5 shadow-xl flex items-center gap-4 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <BadgeIcon className="w-5 h-5 text-primary-blue fill-primary-blue" />
                  </div>
                  <span className="text-medical-navy font-bold text-lg">
                    {badgeText}
                  </span>
                </div>
              </div>

              <div className="absolute -top-10 -right-10 w-24 h-28 bg-blue-400/10 rounded-full flex items-center justify-center z-0">
                <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-2 bg-white rounded-full" />
                  <div className="absolute w-2 h-8 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
