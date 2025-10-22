"use client";

import { PortfolioData } from "@/types/portfolio";

interface CertificationsSectionProps {
  data: PortfolioData;
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
  if (!data.certifications || data.certifications.length === 0) {
    return null;
  }

  return (
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
  );
}
