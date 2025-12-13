"use client";

import { useState } from "react";
import {
  LandingHeader,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  BrandsSection,
  PricingSection,
  ReviewsSection,
  CTASection,
  ContactSection,
  LandingFooter,
  LoginModal,
} from "@/components/landing";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader onLoginClick={() => setIsLoginOpen(true)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BrandsSection />
      <PricingSection />
      <ReviewsSection />
      <CTASection />
      <ContactSection />
      <LandingFooter />
    </div>
  );
}
