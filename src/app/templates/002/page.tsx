"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";

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
  clients: Array<{
    id: string;
    name: string;
    industry: string;
    website: string;
    logoUrl: string;
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
    logoUrl: string;
    coverImageUrl: string;
    description: string;
    myRole: string;
    keyLearnings: string;
    technologies: string[];
    links: {
      liveUrl: string | null;
      githubUrl: string | null;
      appStoreUrl: string | null;
      playStoreUrl: string | null;
    };
    status: string;
    type: string;
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

export default function Template002() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedAppScreenshot, setSelectedAppScreenshot] = useState<{[key: string]: number}>({});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "projects", "contact"];
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

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-400">Loading...</div>
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
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          scrolled ? "top-4" : "top-6"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 px-6 py-3 rounded-full",
            "backdrop-blur-xl bg-white/70 shadow-lg shadow-black/5",
            "border border-gray-200/50",
            "transition-all duration-300"
          )}
        >
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "hover:bg-gray-100",
                activeSection === item.id
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <img
              src={data.personalInfo.profilePictureUrl}
              alt={data.personalInfo.name}
              className="relative w-48 h-48 rounded-full mx-auto border-4 border-white shadow-xl"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {data.personalInfo.name}
            </h1>
            <p className="text-lg text-gray-500">{data.personalInfo.surname}</p>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              {data.personalInfo.title}
            </p>
            <p className="text-lg text-gray-500 flex items-center justify-center gap-2">
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

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {data.personalInfo.bio}
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href={data.personalInfo.resumeUrl}
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors"
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
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-200"
                  title={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* About Section - Skills */}
      <section id="about" className="py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-bold text-gray-900">Skills</h2>
            <p className="text-xl text-gray-600">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.map((skillGroup, index) => {
              const techKeys = Object.keys(skillGroup.technologies);
              return (
                <div
                  key={index}
                  onClick={() =>
                    setExpandedSkill(
                      expandedSkill === skillGroup.category
                        ? null
                        : skillGroup.category
                    )
                  }
                  className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {skillGroup.category}
                    </h3>
                    <svg
                      className={cn(
                        "w-6 h-6 text-gray-400 transition-transform duration-200",
                        expandedSkill === skillGroup.category && "rotate-180"
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

                  {/* Technology chips - always visible */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {techKeys.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details with progress bars */}
                  <AnimatePresence>
                    {expandedSkill === skillGroup.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          {Object.entries(skillGroup.technologies).map(
                            ([tech, level], idx) => {
                              const percentage = getProficiencyPercentage(level);
                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                                  className="space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">
                                      {tech}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {level}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ delay: idx * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                                      className="bg-gray-900 h-2 rounded-full"
                                    />
                                  </div>
                                </motion.div>
                              );
                            }
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      {data.clients && data.clients.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Trusted by
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {data.clients.map((client) => (
                <a
                  key={client.id}
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-12 w-auto"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      <section id="experience" className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-bold text-gray-900">Experience</h2>
            <p className="text-xl text-gray-600">My professional journey</p>
          </div>

          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 border-l-2 border-gray-200 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gray-900 ring-4 ring-white" />

                <div
                  onClick={() =>
                    setExpandedExperience(
                      expandedExperience === index ? null : index
                    )
                  }
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {job.jobTitle}
                      </h3>
                      <p className="text-lg text-gray-600 mt-1">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-gray-900"
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
                      <p className="text-sm font-medium text-gray-900">
                        {job.startDate} - {job.endDate}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Summary - Always visible */}
                  <p className="text-gray-600 mb-4">{job.summary}</p>

                  {/* Technologies Used - Always visible */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.technologiesUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand indicator */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
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
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
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
                                  className="flex gap-3 text-gray-600"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
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
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Tech Stack
                              </h4>
                              <div className="space-y-3">
                                {job.techStack.frontend && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                      Frontend
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {job.techStack.frontend.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {job.techStack.testing && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                      Testing
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {job.techStack.testing.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                                        >
                                          {tech}
                                        </span>
                                      ))}
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

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-32 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900">Education</h2>
              <p className="text-xl text-gray-600">Academic background</p>
            </div>

            <div className="grid gap-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-gray-600 mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  {edu.details && edu.details.length > 0 && (
                    <ul className="space-y-2">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-600">
                          <svg
                            className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
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

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-bold text-gray-900">Projects</h2>
            <p className="text-xl text-gray-600">
              Selected works and case studies
            </p>
          </div>

          <PhotoProvider
            maskOpacity={0.5}
            overlayRender={(props) => (
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.isFeatured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() =>
                      setExpandedProject(
                        expandedProject === project.title
                          ? null
                          : project.title
                      )
                    }
                    className="p-8 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="text-gray-900 font-medium text-sm mb-4 flex items-center gap-2">
                      <span>
                        {expandedProject === project.title
                          ? "Show less"
                          : "Learn more"}
                      </span>
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedProject === project.title && "rotate-180"
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

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 space-y-4",
                        expandedProject === project.title
                          ? "max-h-[600px] opacity-100 mb-4"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          My Role
                        </p>
                        <p className="text-gray-600 text-sm">
                          {project.myRole}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Key Learnings
                        </p>
                        <p className="text-gray-600 text-sm">
                          {project.keyLearnings}
                        </p>
                      </div>

                      {/* Screenshot Thumbnails */}
                      {project.screenshots && project.screenshots.length > 0 && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Screenshots
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {project.screenshots.map((screenshot, idx) => (
                              <PhotoView key={idx} src={screenshot}>
                                <img
                                  src={screenshot}
                                  alt={`${project.title} screenshot ${idx + 1}`}
                                  className="h-20 w-28 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 border border-gray-200"
                                />
                              </PhotoView>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.links.liveUrl && (
                        <a
                          href={project.links.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium text-center hover:bg-gray-800 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                      {project.links.githubUrl && (
                        <a
                          href={project.links.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-full text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>

                    {/* View Details Modal */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <Modal>
                        <ModalTrigger className="w-full mt-4 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium text-center hover:bg-gray-800 transition-colors">
                          View Details
                        </ModalTrigger>
                        <ModalBody>
                          <ModalContent className="cursor-auto">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-8">
                              <div className="flex-1">
                                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                                  {project.title}
                                </h2>
                                <div className="flex items-center gap-3">
                                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                    {project.status}
                                  </span>
                                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                    {project.type}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                About the Project
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            {/* My Role */}
                            <div className="mb-8">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                My Role
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {project.myRole}
                              </p>
                            </div>

                            {/* Key Learnings */}
                            <div className="mb-8">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Key Learnings
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {project.keyLearnings}
                              </p>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Technologies Used
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* App Screenshots with iPhone Frame */}
                            {project.appScreenshots && project.appScreenshots.length > 0 && (
                              <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                  Mobile App Screenshots
                                </h3>
                                <div className="flex flex-col md:flex-row gap-6">
                                  {/* Thumbnails */}
                                  <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 order-2 md:order-1">
                                    {project.appScreenshots.map((screenshot, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() =>
                                          setSelectedAppScreenshot({
                                            ...selectedAppScreenshot,
                                            [project.title]: idx,
                                          })
                                        }
                                        className={cn(
                                          "flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden border-2 transition-all",
                                          (selectedAppScreenshot[project.title] || 0) === idx
                                            ? "border-blue-500 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-gray-400"
                                        )}
                                      >
                                        <img
                                          src={screenshot}
                                          alt={`Thumbnail ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                    ))}
                                  </div>

                                  {/* iPhone Frame Viewer */}
                                  <div className="flex-shrink-0 order-1 md:order-2">
                                    <div className="relative w-[400px] mx-auto">
                                      {/* Screenshot inside frame */}
                                      <div className="absolute inset-0 p-[14px]">
                                        <img
                                          src={project.appScreenshots[selectedAppScreenshot[project.title] || 0]}
                                          alt={`${project.title} app screenshot`}
                                          className="w-full h-full object-cover rounded-[45px]"
                                        />
                                      </div>
                                      {/* iPhone Frame on top */}
                                      <img
                                        src="/images/iphone-frame.png"
                                        alt="iPhone frame"
                                        className="relative z-10 w-full h-auto"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Web Screenshots */}
                            {project.screenshots && project.screenshots.length > 0 && (
                              <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                  Web Screenshots
                                </h3>
                                <PhotoProvider
                                  maskOpacity={0.5}
                                >
                                  <div className="grid grid-cols-2 gap-4">
                                    {project.screenshots.map((screenshot, idx) => (
                                      <PhotoView key={idx} src={screenshot}>
                                        <img
                                          src={screenshot}
                                          alt={`${project.title} screenshot ${idx + 1}`}
                                          className="w-full h-48 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-gray-200"
                                        />
                                      </PhotoView>
                                    ))}
                                  </div>
                                </PhotoProvider>
                              </div>
                            )}

                            {/* Links */}
                            <div className="mb-8">
                              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Project Links
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.links.liveUrl && (
                                  <a
                                    href={project.links.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span>View Live Site</span>
                                  </a>
                                )}
                                {project.links.githubUrl && (
                                  <a
                                    href={project.links.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>View on GitHub</span>
                                  </a>
                                )}
                                {project.links.appStoreUrl && (
                                  <a
                                    href={project.links.appStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
                                    className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <span>Play Store</span>
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Client Info */}
                            {project.clientId && data.clients && (
                              <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                  Client
                                </h3>
                                {(() => {
                                  const client = data.clients.find(c => c.id === project.clientId);
                                  if (client) {
                                    return (
                                      <a
                                        href={client.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                      >
                                        <img
                                          src={client.logoUrl}
                                          alt={client.name}
                                          className="h-10 w-auto"
                                        />
                                        <div>
                                          <p className="font-medium text-gray-900">{client.name}</p>
                                          <p className="text-sm text-gray-500">{client.industry}</p>
                                        </div>
                                      </a>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            )}
                          </ModalContent>
                        </ModalBody>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </section>

      {/* Code Snippets Section */}
      {data.codeSnippets && data.codeSnippets.length > 0 && (
        <section className="py-32 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900">
                Code Snippets
              </h2>
              <p className="text-xl text-gray-600">
                Reusable solutions and utilities
              </p>
            </div>

            <PhotoProvider
              maskOpacity={0.5}
              overlayRender={(props) => (
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
                    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {snippet.title}
                        </h3>
                        <p className="text-gray-600">{snippet.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {snippet.language}
                      </span>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto mb-4">
                      <pre className="text-sm text-gray-100 font-mono">
                        <code>{snippet.code}</code>
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
                        className="inline-block text-gray-900 font-medium text-sm hover:underline"
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
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900">
                Testimonials
              </h2>
              <p className="text-xl text-gray-600">
                What people say about working with me
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={testimonial.contactAvatarUrl}
                      alt={testimonial.contactPerson}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.contactPerson}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.contactTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Re: {testimonial.projectName}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-gray-600 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      {data.articles && data.articles.length > 0 && (
        <section className="py-32 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900">Articles</h2>
              <p className="text-xl text-gray-600">
                Thoughts and technical writings
              </p>
            </div>

            <div className="grid gap-6">
              {data.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{article.publication}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all flex-shrink-0"
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

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-5xl font-bold text-gray-900">
                Certifications
              </h2>
              <p className="text-xl text-gray-600">
                Professional credentials and achievements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {cert.issuingOrganization}
                  </p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Let's work together on your next project
            </p>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <a
                href={`mailto:${data.personalInfo.contact.email}`}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <svg
                    className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors"
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
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-900">
                    {data.personalInfo.contact.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${data.personalInfo.contact.phone}`}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <svg
                    className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors"
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
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-medium text-gray-900">
                    {data.personalInfo.contact.phone}
                  </p>
                </div>
              </a>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6">Connect with me on</p>
              <div className="flex items-center justify-center gap-4">
                {Object.entries(data.personalInfo.socialLinks).map(
                  ([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-200"
                      title={platform}
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} {data.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
