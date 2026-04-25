import React from "react";
import AboutHero, { CoursesHeroProps } from "@/components/courses/courses-hero";
import SignupCTASection from "@/components/home/signup-cta-section";
import ProcessSection, {
  ProcessSectionProps,
} from "@/components/courses/process-section";
import { FaqSection } from "@/components/faq-section";
import { StatsBar } from "@/components/stats-bar";
import BreadCrumb from "@/components/BreadCrumb";
import ClientCoursesGrid from "@/app/(root)/courses/online/client-courses-grid";
import { CategoryResponse } from "@/lib/types";
import { buildApiUrl } from "@/lib/api-url";

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
  imageSrc: "/courses-about-us.jpg",
};

const processSectionProps: ProcessSectionProps = {
  headingMain: "How Our ",
  headingHighlight: "Face-to-Face Training",
  description:
    "Access structured, in-person health and social care training through a clear and organised process. The steps below outline how face-to-face training is booked, delivered, and recorded.",
  imageSrc:
    "https://images.unsplash.com/photo-1673865641073-4479f93a7776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
  steps: [
    {
      title: "Select Your Training",
      number: "1",
      description:
        "Choose from our range of face-to-face courses aligned with relevant UK health and social care guidance. Training may be booked by individual learners or arranged by organisations for on-site or agreed venue delivery.",
    },
    {
      title: "Attend Your Training Session",
      number: "2",
      description:
        "Attend the scheduled face-to-face training delivered by an experienced trainer. Sessions include guided learning, discussion, and practical elements where appropriate to the course and environment.",
    },
    {
      title: "Training Records & Certificates",
      number: "3",
      description:
        "Following attendance and completion, training records are updated, and a digital certificate is issued confirming attendance and learning outcomes achieved. Certificates support training evidence and organisational audit requirements and do not confirm competence or authorisation to practise.",
    },
  ],
};

async function page() {
  let courseJson: { data?: unknown[]; meta?: unknown } = {};
  let categoryJson: CategoryResponse[] = [];

  try {
    const [courseRes, categoryRes] = await Promise.all([
      fetch(buildApiUrl("/courses/type/face-to-face?page=1"), {
        next: { revalidate: 60 },
      }),
      fetch(buildApiUrl("/categories"), {
        next: { revalidate: 300 },
      }),
    ]);

    courseJson = await courseRes.json();

    const categoryData = await categoryRes.json();
    categoryJson = categoryData?.data || [];
  } catch (error) {
    console.error("Failed to load face-to-face courses page data", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Face to Face Courses", href: "/courses/face-to-face" },
        ]}
        coverImg="/course/face-to-face-banner.png"
        title="Face to Face Courses"
      />

      <AboutHero {...courseHeroContent} />

      <ClientCoursesGrid
        initialData={courseJson.data || []}
        type="face-to-face"
        initialMeta={courseJson.meta}
        categories={categoryJson}
      />

      <StatsBar />
      <ProcessSection {...processSectionProps} />
      <FaqSection />
      <SignupCTASection />
    </div>
  );
}

export default page;