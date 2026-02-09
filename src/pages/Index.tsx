import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SpirographLoader from "@/components/SpirographLoader";
import ParticleSystem from "@/components/ParticleSystem";
import Navigation from "@/components/Navigation";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import PositionsSection from "@/components/PositionsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <SpirographLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Scroll Progress Bar */}
          <ScrollProgressBar />
          
          {/* Aurora background effect */}
          <div className="aurora-bg fixed inset-0" />
          
          {/* Gold particle system */}
          <ParticleSystem />

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <PositionsSection />
            <LanguagesSection />
            <ContactSection />
          </main>
        </div>
      )}
    </>
  );
};

export default Index;
