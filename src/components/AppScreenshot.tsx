"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AppScreenshotProps {
  screenshots: string[];
  projectTitle: string;
  className?: string;
}

// Helper function to determine if a file is a video
const isVideoFile = (filename: string): boolean => {
  const videoExtensions = ['.mp4', '.mkv', '.webm', '.mov', '.avi'];
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <svg
      className="animate-spin h-8 w-8 text-gray-400 dark:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);

export const AppScreenshot = ({ screenshots, projectTitle, className }: AppScreenshotProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>(
    Object.fromEntries(screenshots.map((_, idx) => [idx, true]))
  );
  const [thumbnailLoadingStates, setThumbnailLoadingStates] = useState<{ [key: number]: boolean }>(
    Object.fromEntries(screenshots.map((_, idx) => [idx, true]))
  );

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const handleThumbnailClick = (newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  const handleMainMediaLoad = (index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const handleThumbnailMediaLoad = (index: number) => {
    setThumbnailLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const slideVariants = {
    enter: {
      scale: 0.8,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.8,
      opacity: 0,
    },
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
                "flex-shrink-0 w-12 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 relative",
                selectedIndex === idx
                  ? "border-gray-900 dark:border-white shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 opacity-60 hover:opacity-100"
              )}
            >
              {thumbnailLoadingStates[idx] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <svg
                    className="animate-spin h-4 w-4 text-gray-400 dark:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
              {isVideoFile(screenshot) ? (
                <video
                  src={screenshot}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onLoadedData={() => handleThumbnailMediaLoad(idx)}
                />
              ) : (
                <img
                  src={screenshot}
                  alt={`${projectTitle} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => handleThumbnailMediaLoad(idx)}
                />
              )}
            </button>
          ))}
        </div>

        {/* iPhone Frame Viewer */}
        <div className="flex-shrink-0 order-1 md:order-2 mx-auto">
          <div className="relative w-[280px] sm:w-[320px] md:w-[400px]">
            {/* Screenshot with Slide Animation */}
            <div className="absolute inset-0 p-[12px] sm:p-[13px] md:p-[14px] overflow-hidden rounded-[38px] sm:rounded-[42px] md:rounded-[45px]">
              {loadingStates[selectedIndex] && <LoadingSpinner />}
              <AnimatePresence initial={false} mode="wait">
                {isVideoFile(screenshots[selectedIndex]) ? (
                  <motion.video
                    key={selectedIndex}
                    src={screenshots[selectedIndex]}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      scale: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="w-full h-full object-cover rounded-[38px] sm:rounded-[42px] md:rounded-[45px]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => handleMainMediaLoad(selectedIndex)}
                  />
                ) : (
                  <motion.img
                    key={selectedIndex}
                    src={screenshots[selectedIndex]}
                    alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      scale: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="w-full h-full object-cover rounded-[38px] sm:rounded-[42px] md:rounded-[45px]"
                    onLoad={() => handleMainMediaLoad(selectedIndex)}
                  />
                )}
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
