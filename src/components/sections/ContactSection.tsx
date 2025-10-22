"use client";

import { CometCard } from "@/components/ui/comet-card";
import { SocialIcon } from "@/lib/portfolio-utils";
import { PortfolioData } from "@/types/portfolio";

interface ContactSectionProps {
  data: PortfolioData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
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
  );
}
