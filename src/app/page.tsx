"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { motion, AnimatePresence } from "framer-motion";
import { CometCard } from "@/components/ui/comet-card";
import {
  ExpandableCard,
  ExpandableCardProvider,
  CardThumbnail,
  CardExpanded,
} from "@/components/ui/expandable-card";
import { AppScreenshot } from "@/components/AppScreenshot";
import { useTheme } from "@/providers/theme-provider";
import { TechIcon, getDeviconName, parseIconString } from "@/components/ui/tech-icon";
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";

// Helper function to determine if a file is a video
const isVideoFile = (filename: string): boolean => {
  const videoExtensions = ['.mp4', '.mkv', '.webm', '.mov', '.avi'];
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

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

interface PortfolioData {
  personalInfo: {
    name: string;
    surname: string;
    title: string;
    location: string;
    bio: string;
    profilePictureUrl: string;
    resumeUrl: string;
    contact: {
      email: string;
      phone: string;
    };
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
      blog: string;
    };
  };
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesUsed: number;
    happyClients: number;
  };
  technologiesUsed: string[];
  clients: Array<{
    id: string;
    name: string;
    industry: string;
    website: string;
    logoUrl: string;
    logoVariants?: {
      text?: string;
      textDark?: string;
      dark?: string;
    };
  }>;
  skills: Array<{
    category: string;
    technologies: Record<string, string>;
  }>;
  workExperience: Array<{
    company: string;
    companyUrl?: string;
    jobTitle: string;
    location: string;
    type: string;
    startDate: string;
    endDate: string;
    summary: string;
    responsibilities: string[];
    technologiesUsed: string[];
    techStack: {
      frontend?: string[];
      testing?: string[];
    };
  }>;
  projects: Array<{
    title: string;
    clientId: string;
    isFeatured: boolean;
    sort: number;
    timelineSort?: number;
    logoUrl: string;
    logoVariants?: {
      text?: string;
      textDark?: string;
      dark?: string;
    };
    coverImageUrl: string;
    description: string;
    myRole: string;
    keyLearnings: string[];
    technologies: string[];
    links: {
      liveUrl: string | null;
      githubUrl: string | null;
      appStoreUrl: string | null;
      playStoreUrl: string | null;
    };
    status: string;
    type: string;
    platform: string | string[];
    screenshots: string[];
    appScreenshots?: string[];
  }>;
  codeSnippets: Array<{
    title: string;
    description: string;
    language: string;
    code: string;
    gistUrl: string;
    screenshots: string[];
  }>;
  testimonials: Array<{
    clientId: string;
    contactPerson: string;
    contactTitle: string;
    contactAvatarUrl: string;
    quote: string;
    projectName: string;
  }>;
  articles: Array<{
    title: string;
    publication: string;
    date: string;
    url: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    details: string[];
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    date: string;
    credentialUrl: string;
  }>;
}

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case "github":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "blog":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const getProficiencyPercentage = (level: string): number => {
  switch (level.toLowerCase()) {
    case "expert":
      return 100;
    case "high":
      return 70;
    case "moderate":
      return 50;
    case "low":
      return 10;
    default:
      return 0;
  }
};

const getProficiencyColor = (level: string): { bg: string; text: string; border: string; barBg: string } => {
  switch (level.toLowerCase()) {
    case "expert":
      return {
        bg: "bg-emerald-50/30 dark:bg-emerald-950/10",
        text: "text-emerald-500 dark:text-emerald-500",
        border: "border-emerald-200/30 dark:border-emerald-800/20",
        barBg: "bg-emerald-400/70 dark:bg-emerald-500/50"
      };
    case "high":
      return {
        bg: "bg-blue-50/30 dark:bg-blue-950/10",
        text: "text-blue-500 dark:text-blue-500",
        border: "border-blue-200/30 dark:border-blue-800/20",
        barBg: "bg-blue-400/70 dark:bg-blue-500/50"
      };
    case "moderate":
      return {
        bg: "bg-amber-50/30 dark:bg-amber-950/10",
        text: "text-amber-500 dark:text-amber-500",
        border: "border-amber-200/30 dark:border-amber-800/20",
        barBg: "bg-amber-400/70 dark:bg-amber-500/50"
      };
    case "low":
      return {
        bg: "bg-gray-50/30 dark:bg-gray-800/10",
        text: "text-gray-500 dark:text-gray-500",
        border: "border-gray-200/30 dark:border-gray-700/20",
        barBg: "bg-gray-400/70 dark:bg-gray-500/50"
      };
    default:
      return {
        bg: "bg-gray-50/30 dark:bg-gray-800/10",
        text: "text-gray-500 dark:text-gray-500",
        border: "border-gray-200/30 dark:border-gray-700/20",
        barBg: "bg-gray-400/70 dark:bg-gray-500/50"
      };
  }
};

export default function Template002() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilters, setProjectFilters] = useState({
    status: "All",
    type: "All",
    platform: "All",
    technology: "All",
    client: "All"
  });
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
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-32 max-[1199px]:pt-44 max-[749px]:pt-56 max-[529px]:pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <CometCard rounded="rounded-full" className="w-48 h-48 mx-auto">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse -z-10" />
            <img
              src={data.personalInfo.profilePictureUrl}
              alt={data.personalInfo.name}
              className="relative w-full h-full rounded-full border-4 border-white shadow-xl object-cover z-10"
            />
          </CometCard>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {data.personalInfo.name}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">{data.personalInfo.surname}</p>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
              {data.personalInfo.title}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {data.personalInfo.location}
            </p>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {data.personalInfo.bio}
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href={data.personalInfo.resumeUrl}
              target="_blank"
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-gray-900/20 dark:shadow-white/10"
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Get in Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-8">
            {Object.entries(data.personalInfo.socialLinks).map(
              ([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-200"
                  title={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              My tech arsenal
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>

                {/* All technologies with progress bars - always visible */}
                <div className="space-y-4">
                  {Object.entries(skillGroup.technologies).map(
                    ([tech, level], idx) => {
                      const percentage = getProficiencyPercentage(level);
                      const colors = getProficiencyColor(level);
                      const iconString = getDeviconName(tech);
                      const { name, variant } = parseIconString(iconString);
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-lg" />
                              <span className="truncate">{tech}</span>
                            </span>
                            <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", colors.bg, colors.text, colors.border, "border")}>
                              {level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              transition={{ delay: idx * 0.05, duration: 0.8, ease: "easeOut" }}
                              viewport={{ once: true }}
                              className={cn("h-2 rounded-full", colors.barBg)}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Bar - Moved below skills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            >
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Years Experience
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.stats.yearsOfExperience}+
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            >
              <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Projects Completed
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.stats.projectsCompleted}+
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            >
              <svg className="w-12 h-12 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Technologies Used
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.stats.technologiesUsed}+
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            >
              <svg className="w-12 h-12 text-amber-600 dark:text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Happy Clients
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.stats.happyClients}+
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Where I've Worked</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The journey so far</p>
          </div>

          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gray-900 dark:bg-white ring-4 ring-white dark:ring-gray-950" />

                <div
                  onClick={() =>
                    setExpandedExperience(
                      expandedExperience === index ? null : index
                    )
                  }
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {job.jobTitle}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-gray-900 dark:hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {job.startDate} - {job.endDate}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Summary - Always visible */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{job.summary}</p>

                  {/* Technologies Used - Always visible */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.technologiesUsed.map((tech, idx) => {
                      const iconString = getDeviconName(tech);
                      const { name, variant } = parseIconString(iconString);
                      return (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium flex items-center gap-1.5"
                        >
                          <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Expand indicator */}
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span>
                      {expandedExperience === index
                        ? "Show less"
                        : "Show more"}
                    </span>
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedExperience === index && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedExperience === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-3">
                              {job.responsibilities.map((resp, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: idx * 0.15,
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 100
                                  }}
                                  className="flex gap-3 text-gray-600 dark:text-gray-300"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>{resp}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack */}
                          {job.techStack && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: job.responsibilities.length * 0.15 + 0.2, duration: 0.4 }}
                            >
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Tech Stack
                              </h4>
                              <div className="space-y-3">
                                {job.techStack.frontend && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Frontend
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {job.techStack.frontend.map((tech, idx) => {
                                        const iconString = getDeviconName(tech);
                                        const { name, variant } = parseIconString(iconString);
                                        return (
                                          <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5"
                                          >
                                            <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                                            {tech}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                                {job.techStack.testing && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Testing
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {job.techStack.testing.map((tech, idx) => {
                                        const iconString = getDeviconName(tech);
                                        const { name, variant } = parseIconString(iconString);
                                        return (
                                          <span
                                            key={idx}
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1.5"
                                          >
                                            <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                                            {tech}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {data.clients && data.clients.length > 0 && (
        <section id="trusted-by" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Clients Who Trust Me
            </h3>
            <AutoScrollCarousel
              containerClassName="bg-white dark:bg-gray-800 rounded-2xl py-8 px-6 border border-gray-200 dark:border-gray-700"
              speed="normal"
            >
              {/* Duplicate items for seamless loop - repeat more if few items */}
              {(() => {
                const repeatCount = data.clients.length < 6 ? 4 : 2;
                return Array(repeatCount).fill(data.clients).flat().map((client, index) => {
                  const isDark = resolvedTheme === 'dark';
                  const logoSrc = isDark
                    ? (client.logoVariants?.textDark || client.logoVariants?.text || client.logoUrl)
                    : (client.logoVariants?.text || client.logoUrl);

                  return (
                    <div
                      key={`${client.id}-${index}`}
                      className="transition-all duration-300 opacity-80 hover:opacity-100 hover:drop-shadow-lg flex-shrink-0"
                    >
                      <img
                        src={logoSrc}
                        alt={client.name}
                        className="h-12 w-auto"
                      />
                    </div>
                  );
                });
              })()}
            </AutoScrollCarousel>
          </div>
        </section>
      )}

      {/* Technologies I Have Used Section */}
      <section id="technologies" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Stack & Tools
          </h3>
          <AutoScrollCarousel
            containerClassName="bg-white dark:bg-gray-800 rounded-2xl py-12 px-6 border border-gray-200 dark:border-gray-700"
            speed="normal"
          >
            {/* Duplicate items for seamless loop - repeat more if few items */}
            {(() => {
              const repeatCount = data.technologiesUsed.length < 8 ? 4 : 2;
              return Array(repeatCount).fill(data.technologiesUsed).flat().map((tech, index) => {
                const iconString = getDeviconName(tech);
                const { name, variant } = parseIconString(iconString);
                return (
                  <div
                    key={`${tech}-${index}`}
                    className="flex-shrink-0 transition-all duration-300 opacity-85 hover:opacity-100 hover:drop-shadow-lg"
                  >
                    <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-5xl" />
                  </div>
                );
              });
            })()}
          </AutoScrollCarousel>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Projects & Experiments</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A showcase of projects — some live in production, others live in my GitHub, all part of my journey as a developer.
              
            </p>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "group px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-3",
                showFilters
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter Projects</span>
              {Object.values(projectFilters).filter(v => v !== "All").length > 0 && (
                <span className="px-2 py-0.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full text-xs font-bold">
                  {Object.values(projectFilters).filter(v => v !== "All").length}
                </span>
              )}
              <svg
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  showFilters && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Collapsible Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-12"
              >
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700">
                  {/* Status Filter */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Status:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        ele.style.cursor = 'grabbing';
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;
                        const handleMouseMove = (e: MouseEvent) => {
                          const x = e.pageX - ele.offsetLeft;
                          const walk = (x - startX) * 2;
                          ele.scrollLeft = scrollLeft - walk;
                        };
                        const handleMouseUp = () => {
                          ele.style.cursor = 'grab';
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}>
                      {["All", ...Array.from(new Set(data.projects.map(p => p.status)))].map((status) => (
                        <button
                          key={status}
                          onClick={() => setProjectFilters({...projectFilters, status})}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                            projectFilters.status === status
                              ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-600 dark:hover:border-emerald-500"
                          )}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Type:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        ele.style.cursor = 'grabbing';
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;
                        const handleMouseMove = (e: MouseEvent) => {
                          const x = e.pageX - ele.offsetLeft;
                          const walk = (x - startX) * 2;
                          ele.scrollLeft = scrollLeft - walk;
                        };
                        const handleMouseUp = () => {
                          ele.style.cursor = 'grab';
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}>
                      {["All", ...Array.from(new Set(data.projects.map(p => p.type)))].map((type) => (
                        <button
                          key={type}
                          onClick={() => setProjectFilters({...projectFilters, type})}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                            projectFilters.type === type
                              ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Platform Filter */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Platform:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        ele.style.cursor = 'grabbing';
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;
                        const handleMouseMove = (e: MouseEvent) => {
                          const x = e.pageX - ele.offsetLeft;
                          const walk = (x - startX) * 2;
                          ele.scrollLeft = scrollLeft - walk;
                        };
                        const handleMouseUp = () => {
                          ele.style.cursor = 'grab';
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}>
                      {["All", ...Array.from(new Set(data.projects.flatMap(p => Array.isArray(p.platform) ? p.platform : [p.platform])))].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => setProjectFilters({...projectFilters, platform})}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                            projectFilters.platform === platform
                              ? "bg-purple-600 dark:bg-purple-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-500"
                          )}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technology Filter */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Tech:</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        const ele = e.currentTarget;
                        ele.style.cursor = 'grabbing';
                        const startX = e.pageX - ele.offsetLeft;
                        const scrollLeft = ele.scrollLeft;
                        const handleMouseMove = (e: MouseEvent) => {
                          const x = e.pageX - ele.offsetLeft;
                          const walk = (x - startX) * 2;
                          ele.scrollLeft = scrollLeft - walk;
                        };
                        const handleMouseUp = () => {
                          ele.style.cursor = 'grab';
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}>
                      {["All", ...Array.from(new Set(data.projects.flatMap(p => p.technologies)))].slice(0, 10).map((tech) => (
                        <button
                          key={tech}
                          onClick={() => setProjectFilters({...projectFilters, technology: tech})}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 whitespace-nowrap flex-shrink-0",
                            projectFilters.technology === tech
                              ? "bg-amber-600 dark:bg-amber-500 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-600 dark:hover:border-amber-500"
                          )}
                        >
                          {tech !== "All" && <TechIcon name={getDeviconName(tech)} variant="original" className="text-sm" />}
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Client Filter */}
                  {data.clients && data.clients.length > 0 && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] pt-1.5 flex-shrink-0">Client:</span>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => {
                          const ele = e.currentTarget;
                          ele.style.cursor = 'grabbing';
                          const startX = e.pageX - ele.offsetLeft;
                          const scrollLeft = ele.scrollLeft;
                          const handleMouseMove = (e: MouseEvent) => {
                            const x = e.pageX - ele.offsetLeft;
                            const walk = (x - startX) * 2;
                            ele.scrollLeft = scrollLeft - walk;
                          };
                          const handleMouseUp = () => {
                            ele.style.cursor = 'grab';
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };
                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}>
                        {["All", ...data.clients.map(c => c.name)].map((client) => (
                          <button
                            key={client}
                            onClick={() => setProjectFilters({...projectFilters, client})}
                            className={cn(
                              "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                              projectFilters.client === client
                                ? "bg-rose-600 dark:bg-rose-500 text-white shadow-lg"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-rose-600 dark:hover:border-rose-500"
                            )}
                          >
                            {client}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clear Filters Button */}
                  {Object.values(projectFilters).some(v => v !== "All") && (
                    <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setProjectFilters({
                          status: "All",
                          type: "All",
                          platform: "All",
                          technology: "All",
                          client: "All"
                        })}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ExpandableCardProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.filter(project => {
                const matchesStatus = projectFilters.status === "All" || project.status === projectFilters.status;
                const matchesType = projectFilters.type === "All" || project.type === projectFilters.type;
                const matchesPlatform = projectFilters.platform === "All" || (
                  Array.isArray(project.platform)
                    ? project.platform.includes(projectFilters.platform)
                    : project.platform === projectFilters.platform
                );
                const matchesTech = projectFilters.technology === "All" || project.technologies.includes(projectFilters.technology);
                const matchesClient = projectFilters.client === "All" || (
                  data.clients.find(c => c.name === projectFilters.client)?.id === project.clientId
                );
                return matchesStatus && matchesType && matchesPlatform && matchesTech && matchesClient;
              }).sort((a, b) => a.sort - b.sort).map((project, index) => (
                <ExpandableCard key={index} id={`project-${index}`}>
                  {/* Card Thumbnail (Collapsed View) */}
                  <CardThumbnail>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                      <div className="relative h-64 bg-gray-100 overflow-hidden">
                        <img
                          src={project.coverImageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {project.isFeatured && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                            Featured
                          </div>
                        )}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {project.status}
                        </div>
                      </div>

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                          {project.logoUrl && (
                            <img
                              src={resolvedTheme === 'dark' && project.logoVariants?.dark ? project.logoVariants.dark : project.logoUrl}
                              alt={`${project.title} logo`}
                              className="w-16 h-16 object-contain rounded-lg"
                            />
                          )}
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                          {project.technologies.slice(0, 4).map((tech, idx) => {
                            const iconString = getDeviconName(tech);
                            const { name, variant } = parseIconString(iconString);
                            return (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium h-fit flex items-center gap-1.5"
                              >
                                <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                                {tech}
                              </span>
                            );
                          })}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium h-fit">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        <button className="w-full px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-auto">
                          View Details
                        </button>
                      </div>
                    </div>
                  </CardThumbnail>

                  {/* Card Expanded (Full Screen View) */}
                  <CardExpanded className="p-8 md:p-12">
                    {/* Header with Cover Image */}
                    <div className="relative h-80 -mx-8 md:-mx-12 -mt-8 md:-mt-12 mb-8 overflow-hidden">
                      <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/50 dark:via-gray-900/50 to-transparent" />
                      <div className="absolute bottom-6 left-8 md:left-12 right-8 md:right-12">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                            {project.status}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                            {project.type}
                          </span>
                          {project.isFeatured && (
                            <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          {project.logoUrl && (
                            <img
                              src={resolvedTheme === 'dark' && project.logoVariants?.dark ? project.logoVariants.dark : project.logoUrl}
                              alt={`${project.title} logo`}
                              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg bg-white/80 p-2"
                            />
                          )}
                          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 darl:text-gray-200 dark:text-gray-300">
                            {project.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content - 2 columns */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            About the Project
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {project.description}
                          </p>
                        </div>

                        {/* Key Learnings - Full Width */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-6 border border-blue-100 dark:border-blue-900">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Key Learnings
                          </h4>
                          <ul className="space-y-2">
                            {project.keyLearnings.map((learning, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{learning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mobile App Screenshots */}
                        {project.appScreenshots && project.appScreenshots.length > 0 && (
                          <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                              Mobile Experience
                            </h3>
                            <AppScreenshot
                              screenshots={project.appScreenshots}
                              projectTitle={project.title}
                            />
                          </div>
                        )}
                      </div>

                      {/* Sidebar - 1 column */}
                      <div className="space-y-6">
                        {/* My Role - Compact Badge Style */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border-l-4 border-gray-900 dark:border-white">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                            My Role
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {project.myRole}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => {
                              const iconString = getDeviconName(tech);
                              const { name, variant } = parseIconString(iconString);
                              return (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 flex items-center gap-1.5"
                                >
                                  <TechIcon name={name} variant={variant as "plain" | "original" | "line"} className="text-sm" />
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Links */}
                        {(project.links.liveUrl || project.links.githubUrl || project.links.appStoreUrl || project.links.playStoreUrl) && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Links
                            </h4>
                            <div className="space-y-3">
                              {project.links.liveUrl && (
                              <a
                                href={project.links.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                  />
                                </svg>
                                <span>Live Site</span>
                              </a>
                            )}
                            {project.links.githubUrl && (
                              <a
                                href={project.links.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>GitHub</span>
                              </a>
                            )}
                            {project.links.appStoreUrl && (
                              <a
                                href={project.links.appStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                </svg>
                                <span>App Store</span>
                              </a>
                            )}
                            {project.links.playStoreUrl && (
                              <a
                                href={project.links.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <span>Play Store</span>
                              </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Client Info */}
                        {project.clientId && data.clients && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Client
                            </h4>
                            {(() => {
                              const client = data.clients.find(
                                (c) => c.id === project.clientId
                              );
                              if (client) {
                                return (
                                  <a
                                    href={client.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600 text-center"
                                  >
                                    <img
                                      src={resolvedTheme === 'dark' && client.logoVariants?.dark ? client.logoVariants.dark : client.logoUrl}
                                      alt={client.name}
                                      className="h-16 w-auto"
                                    />
                                    <div>
                                      <p className="font-bold text-gray-900 dark:text-white text-lg">
                                        {client.name}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {client.industry}
                                      </p>
                                    </div>
                                  </a>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        )}

                        {/* Web Screenshots - Peek at the Pixels */}
                        {project.screenshots && project.screenshots.length > 0 && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Peek at the Pixels
                            </h4>
                            <PhotoProvider maskOpacity={0.5}>
                              <div className="grid grid-cols-2 gap-2">
                                {project.screenshots.map((screenshot, idx) => (
                                  isVideoFile(screenshot) ? (
                                    <video
                                      key={idx}
                                      src={screenshot}
                                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                    />
                                  ) : (
                                    <PhotoView key={idx} src={screenshot}>
                                      <img
                                        src={screenshot}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 dark:border-gray-600"
                                      />
                                    </PhotoView>
                                  )
                                ))}
                              </div>
                            </PhotoProvider>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardExpanded>
                </ExpandableCard>
              ))}
            </div>
          </ExpandableCardProvider>
        </div>
      </section>

      {/* Code Snippets Section */}
      {data.codeSnippets && data.codeSnippets.length > 0 && (
        <section id="snippets" className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                Code Vault
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A peek into the code that defines my style — from clever abstractions to battle-tested components.
              </p>
            </div>

            <PhotoProvider
              maskOpacity={0.5}
              overlayRender={() => (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(10px)",
                  }}
                />
              )}
            >
              <div className="grid gap-8">
                {data.codeSnippets.map((snippet, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {snippet.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{snippet.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {snippet.language}
                      </span>
                    </div>

                    <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-2 min-[480px]:p-4 md:p-6 overflow-x-auto mb-4 max-w-full">
                      <pre className="text-[10px] min-[480px]:text-xs md:text-sm text-gray-100 dark:text-gray-200 font-mono whitespace-pre w-full min-w-0">
                        <code className="block">{snippet.code}</code>
                      </pre>
                    </div>

                    {/* Screenshots */}
                    {snippet.screenshots && snippet.screenshots.length > 0 && (
                      <div className="mb-4 space-y-3">
                        {snippet.screenshots.map((screenshot, idx) => (
                          <PhotoView key={idx} src={screenshot}>
                            <img
                              src={screenshot}
                              alt={`${snippet.title} screenshot ${idx + 1}`}
                              className="w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 shadow-sm"
                            />
                          </PhotoView>
                        ))}
                      </div>
                    )}

                    {snippet.gistUrl && (
                      <a
                        href={snippet.gistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-gray-900 dark:text-white font-medium text-sm hover:underline"
                      >
                        View on GitHub Gist →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </PhotoProvider>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section id="testimonials" className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                Kind Words
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                What colleagues, clients, and collaborators have to say about working with me.
              </p>
            </div>

            <AutoScrollCarousel
              speed="slow"
              gap="gap-8"
              delay={5000}
              containerClassName="pb-8"
              equalHeight={true}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[...data.testimonials, ...data.testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex-shrink-0 w-[500px] h-full flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={testimonial.contactAvatarUrl}
                      alt={testimonial.contactPerson}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.contactPerson}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.contactTitle}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Re: {testimonial.projectName}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </AutoScrollCarousel>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section id="education" className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Learning Path</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">My formal learning journey — where I gained the skills that power my work today.</p>
            </div>

            <div className="grid gap-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  {edu.details && edu.details.length > 0 && (
                    <ul className="space-y-2">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-300">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                Badges & Certifications
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Achievements unlocked
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {cert.issuingOrganization}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Issued: {cert.date}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:underline"
                    >
                      View Credential
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      {data.articles && data.articles.length > 0 && (
        <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Blog & Writings</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Sharing what I learn
              </p>
            </div>

            <div className="grid gap-6">
              {data.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{article.publication}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Let's Connect</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hit me up for projects or just to chat
            </p>
          </div>

          <CometCard>
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 w-full max-w-4xl mx-auto overflow-hidden">
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-3xl opacity-40" />

              <div className="relative space-y-10">
                {/* Header with decorative element */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    Ready to collaborate? Reach out through any of these channels
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${data.personalInfo.contact.email}`}
                    className="group relative bg-white dark:bg-gray-700 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-300 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                          {data.personalInfo.contact.email}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </a>

                  <a
                    href={`tel:${data.personalInfo.contact.phone}`}
                    className="group relative bg-white dark:bg-gray-700 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                        <svg
                          className="w-6 h-6 text-purple-600 dark:text-purple-300 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                          {data.personalInfo.contact.phone}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </a>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">or connect on social</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {Object.entries(data.personalInfo.socialLinks).map(
                    ([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-900 hover:to-gray-800 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                        title={platform}
                      >
                        <div className="text-gray-700 group-hover:text-white transition-colors">
                          <SocialIcon platform={platform} />
                        </div>
                      </a>
                    )
                  )}
                </div>

                {/* Footer note */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>
          </CometCard>
        </div>
      </section>

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
