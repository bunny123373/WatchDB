"use client";

import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "purple" | "green" | "default" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    gold: "bg-primary-gold/20 text-primary-gold border-primary-gold/30",
    purple: "bg-secondary-purple/20 text-secondary-purple border-secondary-purple/30",
    green: "bg-accent-green/20 text-accent-green border-accent-green/30",
    default: "bg-card text-text-muted border-border",
    outline: "bg-transparent text-text-muted border-border",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium border",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
