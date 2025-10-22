"use client";

import { PortfolioData } from "@/types/portfolio";
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";

interface TestimonialsSectionProps {
  data: PortfolioData;
  resolvedTheme: string;
}

export default function TestimonialsSection({ data, resolvedTheme }: TestimonialsSectionProps) {
  if (!data.testimonials || data.testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            Kind Words
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            What colleagues, clients, and collaborators have to say about working with me.
          </p>
        </div>

        <AutoScrollCarousel
          speed="slow"
          gap="gap-8"
          delay={5000}
          containerClassName="pb-8"
          equalHeight={true}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...data.testimonials, ...data.testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex-shrink-0 w-[500px] h-full flex flex-col"
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonial.contactAvatarUrl}
                  alt={testimonial.contactPerson}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.contactPerson}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.contactTitle}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Re: {testimonial.projectName}
                  </p>
                </div>
              </div>

              <blockquote className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </AutoScrollCarousel>
      </div>
    </section>
  );
}
