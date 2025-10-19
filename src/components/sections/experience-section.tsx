"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologiesUsed: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-gray-600 text-lg">Building products and leading teams across the stack</p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12 border-l-4 border-gradient-to-b from-purple-500 to-pink-500"
              style={{ borderImage: 'linear-gradient(to bottom, #9333ea, #ec4899) 1' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg"
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-purple-100"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{exp.jobTitle}</h3>
                    <div className="flex items-center gap-2 text-purple-600 font-semibold text-lg">
                      <Briefcase className="w-5 h-5" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-right bg-purple-50 px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-6">
                  {exp.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{resp}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {exp.technologiesUsed.map((tech, techIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + techIdx * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200 hover:border-purple-300 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
