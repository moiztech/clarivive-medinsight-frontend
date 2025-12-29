import HowItWorks from "@/components/about/how-it-works";
import LaboratoryAdvantages from "@/components/about/laboratory-advantages";
import MedicalServices from "@/components/about/medical-services";
import OurMission from "@/components/about/our-mission";
import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb paths={[{ label: "About Us", href: "/about-us" }]} title="About Us" />
      <OurMission/>
      <LaboratoryAdvantages/>
      <MedicalServices/>
      <HowItWorks/>
    </div>
  );
}

export default page;
