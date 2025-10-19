"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CometProps {
  className?: string;
  delay?: number;
}

const Comet = ({ className, delay = 0 }: CometProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, 100, 200],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute h-0.5 w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent",
        className
      )}
    >
      <div className="absolute right-0 h-1 w-1 rounded-full bg-blue-500 blur-sm" />
    </motion.div>
  );
};

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CometCard = ({
  children,
  className,
  containerClassName,
}: CometCardProps) => {
  return (
    <div className={cn("relative group", containerClassName)}>
      {/* Animated border glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-500" />

      {/* Comet trails */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        <Comet className="top-[20%] left-0" delay={0} />
        <Comet className="top-[50%] left-0" delay={1} />
        <Comet className="top-[80%] left-0" delay={2} />
      </div>

      {/* Main content */}
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};
