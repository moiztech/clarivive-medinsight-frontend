import MedicalServices from "@/components/about/medical-services";
import SignupCTASection from "@/components/home/signup-cta-section";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MedicalServices/>
      <SignupCTASection />
    </>
  );
}

export default layout;
