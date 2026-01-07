import BreadCrumb from "@/components/BreadCrumb";
import AboutHero from "@/components/courses/courses-hero";
import ProcessSection from "@/components/courses/process-section";
import ServicesGrid from "@/components/courses/services-grid";
import { FaqSection } from "@/components/faq-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import { StatsBar } from "@/components/stats-bar";
import { Heart, Eye, Brain, Activity, Syringe, ClipboardList, Stethoscope, Microscope } from "lucide-react"
import React from "react";

function page() {
  const services = [
    { title: "Angioplasty", icon: Heart },
    { title: "Cardiology", icon: Activity },
    { title: "Dental", icon: Stethoscope },
    { title: "Endocrinology", icon: Syringe },
    { title: "Eye Care", icon: Eye },
    { title: "Neurology", icon: Brain },
    { title: "Orthopaedics", icon: ClipboardList },
    { title: "RMI", icon: Microscope },
  ]
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Courses", href: "/courses" },
          { label: "Face to Face Courses", href: "/courses/face-to-face" },
        ]}
        title="Face to Face Courses"
      />
      <AboutHero />
      <ServicesGrid services={services} />
      <StatsBar />
      <ProcessSection />
      <FaqSection />
      <SignupCTASection />
    </div>
  );
}

export default page;
