"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TechIcon, getDeviconName, parseIconString } from "@/components/ui/tech-icon";
import { PortfolioData } from "@/types/portfolio";

interface ExperienceSectionProps {
  data: PortfolioData;
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  return (
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
  );
}
