"use client";

import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";
import { PortfolioData } from "@/types/portfolio";

interface ClientsSectionProps {
  data: PortfolioData;
  resolvedTheme: string;
}

export default function ClientsSection({ data, resolvedTheme }: ClientsSectionProps) {
  if (!data.clients || data.clients.length === 0) {
    return null;
  }

  return (
    <section id="trusted-by" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Clients Who Trust Me
        </h3>
        <AutoScrollCarousel
          containerClassName="bg-white dark:bg-gray-800 rounded-2xl py-8 px-6 border border-gray-200 dark:border-gray-700"
          speed="normal"
        >
          {/* Duplicate items for seamless loop - repeat more if few items */}
          {(() => {
            const repeatCount = data.clients.length < 6 ? 4 : 2;
            return Array(repeatCount).fill(data.clients).flat().map((client, index) => {
              const isDark = resolvedTheme === 'dark';
              const logoSrc = isDark
                ? (client.logoVariants?.textDark || client.logoVariants?.text || client.logoUrl)
                : (client.logoVariants?.text || client.logoUrl);

              return (
                <div
                  key={`${client.id}-${index}`}
                  className="transition-all duration-300 opacity-80 hover:opacity-100 hover:drop-shadow-lg flex-shrink-0"
                >
                  <img
                    src={logoSrc}
                    alt={client.name}
                    className="h-12 w-auto"
                  />
                </div>
              );
            });
          })()}
        </AutoScrollCarousel>
      </div>
    </section>
  );
}
