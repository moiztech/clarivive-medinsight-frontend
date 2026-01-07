import BreadCrumb from "@/components/BreadCrumb";
import ServicesGrid from "@/components/courses/services-grid";
import SignupCTASection from "@/components/home/signup-cta-section";
import { LogoBar } from "@/components/logo-bar";
import { Service } from "@/lib/types";
import { Activity, Heart } from "lucide-react";
import React from "react";

function page() {
  const branches: Service[] = [
    { title: "Angioplasty", icon: Heart },
    { title: "Cardiology", icon: Activity },
  ];
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Branches", href: "/branches" },
          //   { label: "Face to Face Courses", href: "/branches" },
        ]}
        title="Our Branches"
      />
      <ServicesGrid services={branches}/>
      <LogoBar />
      <SignupCTASection />
    </div>
  );
}

export default page;
