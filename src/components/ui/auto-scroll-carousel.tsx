"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from "@/lib/utils";

// Import Swiper styles
import 'swiper/css';

interface AutoScrollCarouselProps {
  children: React.ReactNode;
  speed?: "normal" | "slow";
  gap?: string;
  className?: string;
  containerClassName?: string;
  delay?: number; // Delay in milliseconds between slide transitions (0 = continuous)
  equalHeight?: boolean; // Make all slides equal height
}

/**
 * AutoScrollCarousel - Reusable auto-scrolling carousel component using SwiperJS
 * Features:
 * - Auto-scrolling with pause on hover
 * - Drag to scroll functionality
 * - Grab cursor on hover
 * - Infinite loop
 * - Customizable speed and gap
 */
export function AutoScrollCarousel({
  children,
  speed = "normal",
  gap = "gap-12",
  className = "",
  containerClassName = "",
  delay = 0,
  equalHeight = false,
}: AutoScrollCarouselProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);

  // Use custom delay if provided, otherwise default to continuous (0)
  const autoplayDelay = delay;

  // Convert gap string to number (e.g., "gap-12" -> 48px, assuming 1 unit = 4px)
  const spaceBetween = parseInt(gap.replace(/\D/g, '')) * 4 || 48;

  const handleMouseEnter = () => {
    if (swiperInstance?.autoplay) {
      swiperInstance.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance?.autoplay) {
      swiperInstance.autoplay.start();
    }
  };

  // Convert children to array for mapping
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn("overflow-hidden", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        loop={true}
        speed={speed === "slow" ? 3000 : 2000}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: false, // We handle this manually
        }}
        grabCursor={true}
        onSwiper={setSwiperInstance}
        className={cn("!overflow-visible", equalHeight && "!flex !items-stretch", className)}
        style={{
          userSelect: 'none',
        }}
      >
        {childrenArray.map((child, index) => (
          <SwiperSlide
            key={index}
            style={{ width: 'auto' }}
            className={cn("!w-auto", equalHeight && "!h-auto !flex")}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
