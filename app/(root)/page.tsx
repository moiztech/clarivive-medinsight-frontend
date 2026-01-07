import React from "react";
import HeroSection from "@/components/home/hero-section";
// import AboutSection from "@/components/home/about-section";
// import FlourishSection from "@/components/home/flourish-section";
// import TrainingDeliverySection from "@/components/home/training-delivery-section";
// import FeaturesSection from "@/components/home/features-section";
import BusinessOutcomesSection from "@/components/home/business-outcomes-section";
// import StatsSection from "@/components/home/stats-section";
// import AudiencesSection from "@/components/home/audiences-section";
// import TestimonialCardSection from "@/components/home/testimonial-card-section";
// import CustomersSection from "@/components/home/customers-section";
// import LMSSection from "@/components/home/lms-section";
// import TestimonialsSection from "@/components/home/testimonials-section";
// import { Footer } from "@/components/home/footer";
// import TrustSection from "@/components/home/trust-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import MedicalServices from "@/components/about/medical-services";
import LaboratoryAdvantages from "@/components/about/laboratory-advantages";
import { DoctorsSection } from "@/components/doctors-section";
import { LogoBar } from "@/components/logo-bar";
import { TestimonialSection } from "@/components/testimonial-section";
import { StatsBar } from "@/components/stats-bar";
import { FaqSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <>
      <AnimateOnScroll>
        <HeroSection />
      </AnimateOnScroll>
      <section className="max-w-full px-5 lg:px-10 mx-auto font-bold text-4xl text-center pt-25 pb-25 lg:max-w-6xl">
        Our vision is to provide organizations of all sizes with accessible, practical, and easy-to-understand health, safety, and care training, helping your team stay skilled,
        confident, and compliant in everyday practice.
      </section>
      <AnimateOnScroll>
        {/* <AboutSection /> */}
        <MedicalServices />
      </AnimateOnScroll>

      <AnimateOnScroll>
        {/* <FlourishSection /> */}
        <LaboratoryAdvantages />
      </AnimateOnScroll>
      {/* 
      <AnimateOnScroll>
        <TrainingDeliverySection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FeaturesSection />
      </AnimateOnScroll> */}

      <AnimateOnScroll>
        <BusinessOutcomesSection />
      </AnimateOnScroll>

      {/* <StatsSection /> */}
      <DoctorsSection />

      {/* <AudiencesSection /> */}
      <LogoBar />

      <AnimateOnScroll>
        {/* <TestimonialCardSection /> */}
        <TestimonialSection />
      </AnimateOnScroll>

      {/* <CustomersSection /> */}
      <StatsBar />

      <AnimateOnScroll>
        {/* <LMSSection /> */}
        <FaqSection />
      </AnimateOnScroll>

      {/* <AnimateOnScroll>
        <TestimonialsSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <TrustSection />
      </AnimateOnScroll> */}

      <AnimateOnScroll>
        <SignupCTASection />
      </AnimateOnScroll>
    </>
  );
}
