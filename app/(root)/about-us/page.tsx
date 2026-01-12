import CommunitySection from "@/components/about/community-section";
import ExperienceCredibilitySection from "@/components/about/ExperienceCredibilitySection";
import HowItWorks from "@/components/about/how-it-works";
import LaboratoryAdvantages from "@/components/about/laboratory-advantages";
import MedicalServices from "@/components/about/medical-services";
import OurMission from "@/components/about/our-mission";
import OurMissionSection from "@/components/about/our-mission-section";
import OurCommitmentSection from "@/components/about/ourCommitmenet";
import WhoWeAreSection from "@/components/about/whoWeAre";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb paths={[{ label: "About Us", href: "/about-us" }]} title="About Us" />
      <CommunitySection />
      <OurMissionSection />
      {/* <OurMission/> */}
      {/* <LaboratoryAdvantages/> */}
      <OurCommitmentSection />
      <WhoWeAreSection />
      <ExperienceCredibilitySection />
      <div className="mx-auto max-w-7xl px-8 pb-24">
        <Image src={"/images/about-us-group.jpeg"} alt="our group" width={600} height={200} className="w-full! h-150! rounded-2xl object-cover" />
      </div>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-4xl mb-5">Empowering Safe Practice Through Clarity</h2>
          <p className="mt-2 text-lg max-w-2/3 mx-auto">
            Effective training does not end at course completion. We support learners with clear guidance and structured learning that reinforces safe, professional practice over
            time.
          </p>
        </div>
      </section>
      <MedicalServices />
      <HowItWorks />
    </div>
  );
}

export default page;
