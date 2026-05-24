"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="flex items-center justify-center"
    >
      <Loader2 className={`${sizeMap[size]} text-primary-light`} />
    </motion.div>
  );
}

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface backdrop-blur-xl p-5 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-8 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
        <div className="skeleton h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}
