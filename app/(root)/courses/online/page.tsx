import BreadCrumb from "@/components/BreadCrumb";
import AboutHero, { CoursesHeroProps } from "@/components/courses/courses-hero";
import ProcessSection, {
  ProcessSectionProps,
} from "@/components/courses/process-section";
import { FaqSection } from "@/components/faq-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import { StatsBar } from "@/components/stats-bar";
import React from "react";
import ClientCoursesGrid from "./client-courses-grid";
import { CategoryResponse } from "@/lib/types";

const courseHeroContent: CoursesHeroProps = {
  headingPre: "Online Health & Social ",
  headingHighlight: "Care Training",
  description:
    "Our online courses are designed to support learning, role awareness, and ongoing development for individuals and organizations working in health and social care. Training is accessible, clearly structured, and aligned with relevant UK guidance, while remaining within defined professional and governance boundaries. Courses are delivered through our secure learning management system (LMS) and support mandatory training, refresher learning, and organizational oversight.",
  services: [
    "Structured Learning Modules",
    "Guidance-Aligned Content",
    "Flexible Online Access",
    "Learner Declarations & Consent",
    "Digital Certificates of Completion",
    "Secure Records & Audit Support",
  ],
  showReadMore: false,
};
const processSectionContent: ProcessSectionProps = {
  headingMain: "How Our ",
  headingHighlight: "Training Platform",
  description:
    "Access compliant health and social care training through a clear, structured process. Follow the steps below to enrol, learn, and record your training securely.",
  imageSrc:
    "https://images.unsplash.com/photo-1673865641073-4479f93a7776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  steps: [
    {
      number: "1",
      title: "Select Your Training",
      description:
        "Browse our range of CSTF and Skills for Care–aligned courses. Choose individual courses or learning packages based on your role or organizational requirements.",
    },
    {
      number: "2",
      title: "Complete Your Learning",
      description:
        "Access online learning at your own pace or attend scheduled face-to-face sessions where applicable. Training completion records are automatically updated on your profile.",
    },
    {
      number: "3",
      title: "Download Your Certificates",
      description:
        "On successful completion, download your certificate confirming training attendance and learning outcomes achieved. Certificates support training evidence and audit readiness.",
    },
  ],
};
async function page() {
  const [courseRes, categoryRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/type/online?page=1`,
      {
        next: { revalidate: 60 },
      },
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
      next: { revalidate: 300 },
    }),
  ]);

  const courseJson = await courseRes.json();
  const { data: categoryJson }: { data: CategoryResponse[] } =
    await categoryRes.json();
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[{ label: "Online Courses", href: "/courses/online" }]}
        title="Online Courses"
      />
      <AboutHero {...courseHeroContent} />
      <ClientCoursesGrid
        initialData={courseJson.data}
        initialMeta={courseJson.meta}
        categories={categoryJson}
        type="online"
      />
      <StatsBar />
      <ProcessSection {...processSectionContent} />
      <FaqSection />
      <SignupCTASection />
    </div>
  );
}

export default page;
