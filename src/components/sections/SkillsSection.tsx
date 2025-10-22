"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TechIcon, getDeviconName, parseIconString } from "@/components/ui/tech-icon";
import { getProficiencyPercentage, getProficiencyColor } from "@/lib/portfolio-utils";
import { PortfolioData } from "@/types/portfolio";

interface SkillsSectionProps {
  data: PortfolioData;
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  return (
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
  );
}
