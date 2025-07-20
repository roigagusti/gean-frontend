"use client";

import Features from "@components/custom/landing/features/features";
import Footer from "@components/custom/landing/footer/footer";
import Header from "@components/custom/landing/header/header";
import "@components/custom/landing/landing.css";
import MainSection from "@components/custom/landing/main-section/main-section";
import TryIt from "@components/custom/landing/try-it/try-it";

export default function LandingPage() {
  return (
    <>
      <Header />
      <MainSection />
      <Features />
      <TryIt />
      <Footer />
    </>
  );
}
