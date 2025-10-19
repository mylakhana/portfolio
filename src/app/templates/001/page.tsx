import { HeroSection } from "@/components/blocks/hero-section-dark";
import { Navbar } from "@/components/sections/navbar";
import { StatsSection } from "@/components/sections/stats-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import portfolioData from "../../../../public/data.json";

export default function Template001() {
  const { personalInfo, skills, workExperience, projects, testimonials } = portfolioData;

  return (
    <main className="min-h-screen bg-white scroll-smooth">
      <Navbar name={personalInfo.name} />

      <HeroSection
        title={personalInfo.name}
        subtitle={{
          regular: personalInfo.title + " • ",
          gradient: "Crafting Digital Excellence",
        }}
        description={personalInfo.bio}
        ctaText="View My Work"
        ctaHref="#projects"
        bottomImage={{
          light: "/images/screenshots/alpha-001.png",
          dark: "/images/screenshots/alpha-001.png",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.3,
          cellSize: 50,
          lightLineColor: "#e5e7eb",
          darkLineColor: "#9ca3af",
        }}
      />

      <StatsSection />

      <div id="skills">
        <SkillsSection skills={skills} />
      </div>

      <div id="experience">
        <ExperienceSection experiences={workExperience} />
      </div>

      <div id="projects">
        <ProjectsSection projects={projects} />
      </div>

      <TestimonialsSection testimonials={testimonials} />

      <CTASection name={personalInfo.name} resumeUrl={personalInfo.resumeUrl} />

      <div id="contact">
        <ContactSection
          contact={personalInfo.contact}
          socialLinks={personalInfo.socialLinks}
          name={personalInfo.name}
        />
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </h3>
              <p className="text-gray-400">{personalInfo.title}</p>
            </div>

            <div className="flex gap-6">
              {personalInfo.socialLinks.github && (
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
              {personalInfo.socialLinks.linkedin && (
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {personalInfo.socialLinks.twitter && (
                <a
                  href={personalInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Built with Next.js, React, Tailwind CSS, and Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
