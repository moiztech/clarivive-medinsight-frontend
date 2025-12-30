import BreadCrumb from "@/components/BreadCrumb";
import AboutHero from "@/components/courses/courses-hero";
import ProcessSection from "@/components/courses/process-section";
import ServicesGrid from "@/components/courses/services-grid";
import { FaqSection } from "@/components/faq-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import { StatsBar } from "@/components/stats-bar";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Courses", href: "/courses" },
          { label: "Online Courses", href: "/courses/online" },
        ]}
        title="Online Courses"
      />
      <AboutHero />
      <ServicesGrid />
      <StatsBar />
      <ProcessSection />
      <FaqSection />
      <SignupCTASection/>
    </div>
  );
}

export default page;
