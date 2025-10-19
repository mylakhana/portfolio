"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ExpandableCardContextType {
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}

const ExpandableCardContext = createContext<ExpandableCardContextType | undefined>(undefined);

export const ExpandableCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ExpandableCardContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </ExpandableCardContext.Provider>
  );
};

export const useExpandableCard = () => {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error("useExpandableCard must be used within ExpandableCardProvider");
  }
  return context;
};

interface ExpandableCardProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ExpandableCard = ({ id, children, className }: ExpandableCardProps) => {
  const { expanded, setExpanded } = useExpandableCard();
  const isExpanded = expanded === id;

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isExpanded]);

  return (
    <>
      {/* Card in Grid */}
      <motion.div
        layoutId={`card-${id}`}
        onClick={() => setExpanded(id)}
        className={cn(
          "cursor-pointer",
          isExpanded ? "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" : "",
          className
        )}
      >
        {!isExpanded && children}
      </motion.div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 cursor-default"
              onClick={() => setExpanded(null)}
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${id}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto relative"
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(null);
                  }}
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardThumbnail = ({ children, className }: CardContentProps) => {
  const { expanded } = useExpandableCard();

  if (expanded) return null;

  return <div className={className}>{children}</div>;
};

export const CardExpanded = ({ children, className }: CardContentProps) => {
  const { expanded } = useExpandableCard();

  if (!expanded) return null;

  return <div className={className}>{children}</div>;
};
