import HowItWorks from "@/components/about/how-it-works";
import LaboratoryAdvantages from "@/components/about/laboratory-advantages";
import MedicalServices from "@/components/about/medical-services";
import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb link="About Us" title="General information" description='Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences.' />

      <LaboratoryAdvantages/>
      <MedicalServices/>
      <HowItWorks/>
    </div>
  );
}

export default page;
