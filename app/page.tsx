import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FlourishSection from "@/components/flourish-section"
import TrainingDeliverySection from "@/components/training-delivery-section"
import FeaturesSection from "@/components/features-section"
import BusinessOutcomesSection from "@/components/business-outcomes-section"
import StatsSection from "@/components/stats-section"
import AudiencesSection from "@/components/audiences-section"
import TestimonialCardSection from "@/components/testimonial-card-section"
import CustomersSection from "@/components/customers-section"
import LMSSection from "@/components/lms-section"
import TestimonialsSection from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
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
      <Footer />
    </div>
  )
}
