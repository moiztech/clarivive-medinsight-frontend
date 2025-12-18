import React from "react";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import FlourishSection from "@/components/home/flourish-section";
import TrainingDeliverySection from "@/components/home/training-delivery-section";
import FeaturesSection from "@/components/home/features-section";
import BusinessOutcomesSection from "@/components/home/business-outcomes-section";
import StatsSection from "@/components/home/stats-section";
import AudiencesSection from "@/components/home/audiences-section";
import TestimonialCardSection from "@/components/home/testimonial-card-section";
import CustomersSection from "@/components/home/customers-section";
import LMSSection from "@/components/home/lms-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import { Footer } from "@/components/home/footer";
import TrustSection from "@/components/home/trust-section";
import SignupCTASection from "@/components/home/signup-cta-section";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";

export default function HomePage() {
  return (
    <>
      <AnimateOnScroll>
        <HeroSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <AboutSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FlourishSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <TrainingDeliverySection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FeaturesSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <BusinessOutcomesSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <StatsSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <AudiencesSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <TestimonialCardSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CustomersSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <LMSSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <TestimonialsSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <TrustSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <SignupCTASection />
      </AnimateOnScroll>
    </>
  );
}
