import BreadCrumb from "@/components/BreadCrumb";
import AboutHero, { CoursesHeroProps } from "@/components/courses/courses-hero";
import ProcessSection, { ProcessSectionProps, ProcessStep } from "@/components/courses/process-section";
import ServicesGrid from "@/components/courses/services-grid";
import { FaqSection } from "@/components/faq-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import { StatsBar } from "@/components/stats-bar";
import { Heart, Eye, Brain, Activity, Syringe, ClipboardList, Stethoscope, Microscope, BookOpen } from "lucide-react";
import React from "react";

function page() {
  const courseTitles = [
    "Physical Activity and Mobility Support",
    "Understanding Ageing and Older Adults",
    "Alcohol Misuse Awareness",
    "Anxiety Awareness",
    "Arthritis Awareness",
    "Assessing Individual Care Needs",
    "Autism and Learning Disability Awareness",
    "Bipolar Disorder Awareness",
    "Bloodborne Virus Awareness",
    "Care Certificate Standards (All 15)",
    "Care Planning Principles",
    "CBT-Informed Approaches Awareness",
    "Effective Communication in Care",
    "Confidentiality and Data Protection",
    "Consent and Lawful Care",
    "Continence Care Awareness",
    "COSHH Awareness",
    "COVID-19 Infection Control",
    "Cyber Security and Data Safety",
    "Dementia Awareness",
    "Depression Awareness",
    "Deprivation of Liberty Safeguards Awareness",
    "Professional Development in Care",
    "Diabetes Awareness",
    "Emergency Preparedness Awareness",
    "Equality, Diversity and Inclusion",
    "Substance Misuse Awareness",
    "End of Life Care Awareness",
    "Eating Disorder Awareness",
    "Epilepsy Awareness",
    "Fire Safety Awareness",
    "First Aid Awareness",
    "Food Safety Level 2 Awareness",
    "HACCP Principles Awareness",
    "Hand Hygiene and IPC",
    "Health and Safety Awareness",
    "Hepatitis Awareness",
    "Staff Induction Awareness",
    "Infection Prevention and Control",
    "Information Governance Awareness",
    "Latex Allergy Awareness",
    "Managing Challenging Behaviour",
    "Mental Capacity Act Awareness",
    "Mental Health Awareness",
    "Moving and Handling Risk Assessment",
    "Moving and Handling Principles",
    "Sharps Safety Awareness",
    "Nutrition and Hydration Awareness",
    "OCD Awareness",
    "Oral Health Care Awareness",
    "Osteoporosis Awareness",
    "Pain Management Awareness",
    "Panic and Acute Anxiety Awareness",
    "Paranoia Awareness",
    "Person-Centred Care Principles",
    "Personality Disorder Awareness",
    "Trauma and PTSD Awareness",
    "Pressure Area Care",
    "Core Care Principles and Confidentiality",
    "Risk Assessment Awareness",
    "Role of the Care Worker",
    "Medicines Management Awareness",
    "Safeguarding Children Awareness",
    "Safeguarding Adults Awareness",
    "Self-Harm Awareness",
    "Sepsis Awareness",
    "Skin Integrity Awareness",
    "Sleep Health Awareness",
    "Stress and Wellbeing Awareness",
    "Stroke Awareness",
    "Supervision and Appraisal Awareness",
    "Train the Trainer Awareness",
    "Tuberculosis Awareness",
    "Organisational Awareness",
    "Wound Care Awareness",
  ];

  const services = courseTitles.map((title) => ({ title, icon: BookOpen }));
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
    description: "Access compliant health and social care training through a clear, structured process. Follow the steps below to enrol, learn, and record your training securely.",
    imageSrc:"https://images.unsplash.com/photo-1673865641073-4479f93a7776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Courses", href: "/courses" },
          { label: "Online Courses", href: "/courses/online" },
        ]}
        title="Online Courses"
      />
      <AboutHero {...courseHeroContent} />
      <ServicesGrid cardLinkPrefix="course" title="our courses" services={services} />
      <StatsBar />
      <ProcessSection {...processSectionContent} />
      <FaqSection />
      <SignupCTASection />
    </div>
  );
}

export default page;
