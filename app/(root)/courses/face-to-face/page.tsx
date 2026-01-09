import React from "react";
import { HeartPulse, Users, Activity, ShieldAlert, BadgeCheck, RefreshCcw, Pill } from "lucide-react";
import AboutHero, { CoursesHeroProps } from "@/components/courses/courses-hero";
import SignupCTASection from "@/components/home/signup-cta-section";
import ProcessSection, { ProcessSectionProps } from "@/components/courses/process-section";
import ServicesGrid from "@/components/courses/services-grid";
import { FaqSection } from "@/components/faq-section";
import { StatsBar } from "@/components/stats-bar";
import BreadCrumb from "@/components/BreadCrumb";

function page() {
  const services = [
    {
      title: "First Aid",
      icon: HeartPulse,
    },
    {
      title: "People Moving & Handling",
      icon: Users,
    },
    {
      title: "Basic Life Support (BLS)",
      icon: Activity,
    },
    {
      title: "PMVA (Prevention & Management of Violence and Aggression)",
      icon: ShieldAlert,
    },
    {
      title: "Care Certificate Training",
      icon: BadgeCheck,
    },
    {
      title: "Mandatory Refreshers Course",
      icon: RefreshCcw,
    },
    {
      title: "Medication Administration",
      icon: Pill,
    },
  ];

  const courseHeroContent: CoursesHeroProps = {
    headingPre: "",
    headingHighlight: "Face-to-Face ",
    headingPost: "Health & Social Care Training",
    description:
      "Our face-to-face training courses are delivered by experienced professionals and are designed to support learning, practical awareness, and safe working practices within health and social care settings. Training is structured, interactive, and aligned with relevant UK guidance, while remaining within clear professional and organisational boundaries. Face-to-face delivery supports engagement, discussion, and practical demonstration where appropriate, and is suitable for both individual learners and organisations requiring on-site training.",
    services: [
      "Trainer-Led Sessions",
      "Guidance-Aligned Content",
      "Practical Demonstration Where Appropriate",
      "On-Site or Agreed Venue Delivery",
      "Clear Learner Declarations & Consent",
      "Certificates of Completion",
    ],
    showReadMore: false,
  };
  const processSectionProps : ProcessSectionProps = {
    headingMain: 'How Our ',
    headingHighlight: 'Face-to-Face Training',
    description: 'Access structured, in-person health and social care training through a clear and organised process. The steps below outline how face-to-face training is booked, delivered, and recorded.',
    imageSrc:"https://images.unsplash.com/photo-1673865641073-4479f93a7776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    steps: [
      {
        title: 'Select Your Training',
        number: '1',
        description: 'Choose from our range of face-to-face courses aligned with relevant UK health and social care guidance. Training may be booked by individual learners or arranged by organisations for on-site or agreed venue delivery.'
      },
      {
        title: 'Attend Your Training Session',
        number: '2',
        description: 'Attend the scheduled face-to-face training delivered by an experienced trainer. Sessions include guided learning, discussion, and practical elements where appropriate to the course and environment.',
      },
      {
        title: 'Training Records & Certificates',
        number: '3',
        description: 'Following attendance and completion, training records are updated, and a digital certificate is issued confirming attendance and learning outcomes achieved. Certificates support training evidence and organisational audit requirements and do not confirm competence or authorisation to practise.'
      }
    ]
  }
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Courses", href: "/courses" },
          { label: "Face to Face Courses", href: "/courses/face-to-face" },
        ]}
        title="Face to Face Courses"
      />
      <AboutHero {...courseHeroContent} />
      <ServicesGrid services={services} title="Our Courses" description="We provide various courses" cardLinkPrefix="course" />
      <StatsBar />
      <ProcessSection {...processSectionProps} />
      <FaqSection />
      <SignupCTASection />
    </div>
  );
}

export default page;
