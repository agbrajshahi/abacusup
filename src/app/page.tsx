import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Courses from "@/components/Courses";
import HowItWorks from "@/components/HowItWorks";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Learn Abacus Online in Bangladesh",
  description:
    "Master mental math with Bangladesh's #1 online Abacus platform. Live classes, interactive virtual Abacus, structured Level 1–8 courses.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </>
  );
}