"use client";

import { PortfolioData } from "@/types/portfolio";

interface EducationSectionProps {
  data: PortfolioData;
}

export default function EducationSection({ data }: EducationSectionProps) {
  if (!data.education || data.education.length === 0) {
    return null;
  }

  return (
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
  );
}
