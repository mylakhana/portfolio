"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AppScreenshotProps {
  screenshots: string[];
  projectTitle: string;
  className?: string;
}

export const AppScreenshot = ({ screenshots, projectTitle, className }: AppScreenshotProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const handleThumbnailClick = (newIndex: number) => {
    setDirection(newIndex > selectedIndex ? 1 : -1);
    setSelectedIndex(newIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 order-2 md:order-1 w-full md:w-auto scrollbar-hide max-h-[400px] md:max-h-[500px]">
          {screenshots.map((screenshot, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={cn(
                "flex-shrink-0 w-12 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                selectedIndex === idx
                  ? "border-gray-900 dark:border-white shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={screenshot}
                alt={`${projectTitle} screenshot ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* iPhone Frame Viewer */}
        <div className="flex-shrink-0 order-1 md:order-2 mx-auto">
          <div className="relative w-[280px] sm:w-[320px] md:w-[400px]">
            {/* Screenshot with Slide Animation */}
            <div className="absolute inset-0 p-[12px] sm:p-[13px] md:p-[14px] overflow-hidden rounded-[38px] sm:rounded-[42px] md:rounded-[45px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={screenshots[selectedIndex]}
                  alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full h-full object-cover rounded-[38px] sm:rounded-[42px] md:rounded-[45px]"
                />
              </AnimatePresence>
            </div>

            {/* iPhone Frame */}
            <img
              src="/images/iphone-frame.png"
              alt="iPhone frame"
              className="relative z-10 w-full h-auto"
            />
          </div>
        </div>

        {/* Screenshot Info */}
        <div className="order-3 text-center md:text-left w-full md:w-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedIndex + 1} / {screenshots.length}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Click thumbnails to view
          </p>
        </div>
      </div>
    </div>
  );
};
