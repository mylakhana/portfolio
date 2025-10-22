"use client";

import { CometCard } from "@/components/ui/comet-card";
import { SocialIcon } from "@/lib/portfolio-utils";
import { PortfolioData } from "@/types/portfolio";

interface HeroSectionProps {
  data: PortfolioData;
  scrollToSection: (section: string) => void;
}

export default function HeroSection({ data, scrollToSection }: HeroSectionProps) {
  return (
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
  );
}
