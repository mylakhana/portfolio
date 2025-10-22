"use client";

import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";
import { TechIcon, getDeviconName, parseIconString } from "@/components/ui/tech-icon";
import { PortfolioData } from "@/types/portfolio";

interface TechnologiesSectionProps {
  data: PortfolioData;
}

export default function TechnologiesSection({ data }: TechnologiesSectionProps) {
  return (
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
  );
}
