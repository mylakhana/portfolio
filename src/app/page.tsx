"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import "react-photo-view/dist/react-photo-view.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/theme-provider";
import { PortfolioData } from "@/types/portfolio";
import { isVideoFile } from "@/lib/portfolio-utils";

// Section Components
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CodeSnippetsSection from "@/components/sections/CodeSnippetsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";

// Add scroll animation and scrollbar styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 30s linear infinite;
      width: max-content;
    }
    .animate-scroll:hover {
      animation-play-state: paused;
    }
    .animate-scroll-slow {
      animation: scroll 60s linear infinite;
      width: max-content;
    }
    .animate-scroll-slow:hover {
      animation-play-state: paused;
    }

    /* Custom scrollbar styles */
    .scrollbar-thin::-webkit-scrollbar {
      height: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }
    .dark .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #4b5563;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
    .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
    }
  `;
  if (!document.head.querySelector('style[data-scroll-animation]')) {
    style.setAttribute('data-scroll-animation', 'true');
    document.head.appendChild(style);
  }
}

export default function Template002() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "skills", "experience", "trusted-by", "technologies", "projects", "snippets", "testimonials", "education", "contact"];
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set page title based on personalInfo.name
  useEffect(() => {
    if (data?.personalInfo?.name) {
      document.title = data.personalInfo.name;
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="animate-pulse text-lg text-gray-400 dark:text-gray-500">Loading...</div>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);

      // Do NOT auto-close mobile menu - let user close it manually
    }
  };

  const toggleTheme = () => {
    // Cycle through: system → light → dark → system
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Floating Navigation */}
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          scrolled ? "top-4" : "top-6",
          "max-w-[95vw]"
        )}
      >
        <div
          className={cn(
            "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg shadow-black/5",
            "border border-gray-200/50 dark:border-gray-700/50",
            "transition-all duration-300",
            "rounded-3xl"
          )}
        >
          {/* Mobile: Burger Menu (< 530px) */}
          <div className="min-[530px]:hidden flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Theme Toggle - Always visible on mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === "system" ? "light" : theme === "light" ? "dark" : "system"} theme`}
              title={`Current: ${theme} (${resolvedTheme})`}
            >
              {theme === "system" ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : theme === "light" ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Items (Collapsible) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden min-[530px]:hidden border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col gap-1 p-3">
                  {[
                    { id: "home", label: "Home" },
                    { id: "skills", label: "Skills" },
                    { id: "experience", label: "Experience" },
                    { id: "trusted-by", label: "TechStack" },
                    { id: "projects", label: "Projects" },
                    { id: "snippets", label: "Code" },
                    { id: "testimonials", label: "Endorsements" },
                    { id: "education", label: "Education" },
                    { id: "contact", label: "Connect" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-left",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        activeSection === item.id
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          : "text-gray-600 dark:text-gray-300"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation (>= 530px) */}
          <div className="hidden min-[530px]:flex items-center gap-1 px-6 py-3 max-[1330px]:flex-wrap justify-center">
            {[
              { id: "home", label: "Home" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "trusted-by", label: "TechStack" },
              { id: "projects", label: "Projects" },
              { id: "snippets", label: "Code" },
              { id: "testimonials", label: "Endorsements" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Connect" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  activeSection === item.id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === "system" ? "light" : theme === "light" ? "dark" : "system"} theme`}
              title={`Current: ${theme} (${resolvedTheme})`}
            >
              {theme === "system" ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : theme === "light" ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection data={data} scrollToSection={scrollToSection} />

      {/* Skills Section */}
      <SkillsSection data={data} />

      {/* Work Experience Section */}
      <ExperienceSection data={data} />

      {/* Trusted By Section */}
      <ClientsSection data={data} resolvedTheme={resolvedTheme || "light"} />

      {/* Technologies I Have Used Section */}
      <TechnologiesSection data={data} />

      {/* Projects Section */}
      <ProjectsSection data={data} resolvedTheme={resolvedTheme} isVideoFile={isVideoFile} />

      {/* Code Snippets Section */}
      <CodeSnippetsSection data={data} />

      {/* Testimonials Section */}
      <TestimonialsSection data={data} resolvedTheme={resolvedTheme || "light"} />

      {/* Education Section */}
      <EducationSection data={data} />

      {/* Certifications Section */}
      <CertificationsSection data={data} />

      {/* Articles Section */}
      <ArticlesSection data={data} />

      {/* Contact Section */}
      <ContactSection data={data} />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {data.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
