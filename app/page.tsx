"use client"
import React, { useState } from "react"
import TopBar from "@/components/home/top-bar"
import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import AboutSection from "@/components/home/about-section"
import FlourishSection from "@/components/home/flourish-section"
import TrainingDeliverySection from "@/components/home/training-delivery-section"
import FeaturesSection from "@/components/home/features-section"
import BusinessOutcomesSection from "@/components/home/business-outcomes-section"
import StatsSection from "@/components/home/stats-section"
import AudiencesSection from "@/components/home/audiences-section"
import TestimonialCardSection from "@/components/home/testimonial-card-section"
import CustomersSection from "@/components/home/customers-section"
import LMSSection from "@/components/home/lms-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import { Footer } from "@/components/home/footer"
import LoadingSkeleton from "@/components/home/LoadingSkeleton"
import { LoadingSkeletonProps } from "@/components/home/LoadingSkeleton"
import TrustSection from "@/components/home/trust-section"
import SignupCTASection from "@/components/home/signup-cta-section"

export default function HomePage() {
  const [loadingFinished, setLoadingFinished] = useState(false)

  const loadingSkeletonProps: LoadingSkeletonProps = {
    minDuration: 1500,
    onFinish: () => setLoadingFinished(true),
  };

  return (
    <LoadingSkeleton {...loadingSkeletonProps}>
      <div className="min-h-screen">
        <TopBar />
        <Header />
        <HeroSection />
        <AboutSection />
        <FlourishSection />
        <TrainingDeliverySection />
        <FeaturesSection />
        <BusinessOutcomesSection />
        <StatsSection />
        <AudiencesSection />
        <TestimonialCardSection />
        <CustomersSection />
        <LMSSection />
        <TestimonialsSection />
        <TrustSection/>
        <SignupCTASection/>
        <Footer />
      </div>
    </LoadingSkeleton>
  )
}
