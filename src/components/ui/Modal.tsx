"use client";

import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizes = {
    sm: "max-w-sm sm:max-w-md",
    md: "max-w-sm sm:max-w-lg",
    lg: "max-w-sm sm:max-w-2xl",
    xl: "max-w-sm sm:max-w-4xl",
    full: "w-full h-full max-w-full max-h-full",
  };

  if (!mounted) {
    return <div style={{ display: 'none' }} />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              size === "full" 
                ? "fixed inset-0 z-50" 
                : "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full",
              sizes[size]
            )}
          >
            <div className={cn(
              "bg-card border border-border shadow-2xl overflow-hidden",
              size === "full" ? "h-full rounded-none" : "rounded-2xl mx-4"
            )}>
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-border transition-colors text-text-muted hover:text-text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
