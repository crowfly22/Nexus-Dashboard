"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  progress: number;
  status: "active" | "review" | "completed" | "paused";
  team: string[];
  color: string;
  index?: number;
}

const statusConfig = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  review: { label: "In Review", className: "bg-warning/10 text-warning border-warning/20" },
  completed: { label: "Completed", className: "bg-accent/10 text-accent border-accent/20" },
  paused: { label: "Paused", className: "bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20" },
};

export function ProjectCard({ name, description, progress, status, team, color, index = 0 }: ProjectCardProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface backdrop-blur-xl p-5 transition-all duration-300 hover:border-border-hover hover:shadow-lg hover:shadow-black/20 cursor-pointer"
    >
      {/* Accent line */}
      <div className={cn("absolute left-0 top-0 h-full w-1 rounded-l-2xl", color)} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">{name}</h4>
          <p className="text-xs text-text-tertiary mt-0.5 line-clamp-1">{description}</p>
        </div>
        <button className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-text-tertiary">Progress</span>
          <span className="text-xs font-medium text-text-secondary">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            className={cn("h-full rounded-full", color)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Team avatars */}
        <div className="flex -space-x-2">
          {team.slice(0, 4).map((member, i) => (
            <div
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-surface-hover text-[9px] font-bold text-text-secondary"
            >
              {member}
            </div>
          ))}
          {team.length > 4 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-surface-hover text-[9px] font-medium text-text-tertiary">
              +{team.length - 4}
            </div>
          )}
        </div>

        {/* Status badge */}
        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", config.className)}>
          {config.label}
        </span>
      </div>
    </motion.div>
  );
}
