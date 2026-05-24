"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon: LucideIcon;
  gradient: string;
  index?: number;
}

export function StatCard({ title, value, change, changeLabel = "vs last month", icon: Icon, gradient, index = 0 }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface backdrop-blur-xl p-5 transition-all duration-300 hover:border-border-hover hover:shadow-lg hover:shadow-black/20"
    >
      {/* Gradient accent */}
      <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500", gradient)} />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-text-primary">{value}</p>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
                isPositive
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              )}
            >
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-text-tertiary">{changeLabel}</span>
          </div>
        </div>
        <div className={cn("rounded-xl p-2.5", gradient, "bg-opacity-10")}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
