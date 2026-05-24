"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, UserPlus, MessageSquare, Star, FileText, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  timestamp: string;
}

const activities: ActivityItem[] = [
  { id: "1", icon: Star, iconColor: "text-warning", iconBg: "bg-warning/10", title: "New feature deployed", description: "AI model v3.2 pushed to production", timestamp: "2 min ago" },
  { id: "2", icon: UserPlus, iconColor: "text-accent", iconBg: "bg-accent/10", title: "Team member joined", description: "Sarah Chen joined the ML team", timestamp: "15 min ago" },
  { id: "3", icon: CheckCircle2, iconColor: "text-success", iconBg: "bg-success/10", title: "Pipeline completed", description: "CI/CD pipeline passed all 48 tests", timestamp: "32 min ago" },
  { id: "4", icon: MessageSquare, iconColor: "text-primary-light", iconBg: "bg-primary/10", title: "New comment", description: "Alex left feedback on Project Atlas", timestamp: "1 hr ago" },
  { id: "5", icon: GitCommit, iconColor: "text-accent", iconBg: "bg-accent/10", title: "Code merged", description: "PR #127 merged into main branch", timestamp: "2 hr ago" },
  { id: "6", icon: AlertCircle, iconColor: "text-warning", iconBg: "bg-warning/10", title: "Rate limit warning", description: "API requests at 85% of quota", timestamp: "3 hr ago" },
  { id: "7", icon: FileText, iconColor: "text-text-secondary", iconBg: "bg-surface-hover", title: "Report generated", description: "Monthly analytics report ready", timestamp: "4 hr ago" },
  { id: "8", icon: Zap, iconColor: "text-primary-light", iconBg: "bg-primary/10", title: "AI training complete", description: "GPT fine-tuning finished 2.4x faster", timestamp: "5 hr ago" },
];

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-2xl border border-border bg-surface backdrop-blur-xl p-5"
    >
      <h3 className="mb-4 text-base font-semibold text-text-primary">Recent Activity</h3>
      <div className="space-y-1">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-hover cursor-pointer"
          >
            <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", activity.iconBg)}>
              <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{activity.title}</p>
              <p className="text-xs text-text-tertiary truncate">{activity.description}</p>
            </div>
            <span className="shrink-0 text-xs text-text-tertiary mt-0.5">{activity.timestamp}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
