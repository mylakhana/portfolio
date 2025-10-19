"use client";
import { motion } from "framer-motion";
import { Award, Briefcase, Code, Users } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Briefcase,
      value: "5+",
      label: "Years Experience",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Code,
      value: "50+",
      label: "Projects Completed",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      value: "30+",
      label: "Happy Clients",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Award,
      value: "15+",
      label: "Awards Won",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
