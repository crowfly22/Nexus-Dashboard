"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  FolderKanban,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "ai-assistant", label: "AI Assistant", icon: Bot },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isOpen, onToggle, activeItem = "dashboard", onNavigate }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 256 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-background/80 backdrop-blur-xl",
          "lg:relative lg:z-auto",
          !isOpen && "max-lg:-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-bold tracking-tight gradient-text whitespace-nowrap"
              >
                Nexus AI
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={onToggle}
            className="ml-auto hidden rounded-md p-1.5 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors lg:flex"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          <button
            onClick={onToggle}
            className="ml-auto rounded-md p-1.5 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary-light"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className={cn("relative z-10 h-5 w-5 shrink-0", isActive && "text-primary-light")} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isOpen && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-3 rounded-md bg-surface px-2.5 py-1.5 text-xs text-text-primary border border-border shadow-lg whitespace-nowrap z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border p-3">
          <div className={cn("flex items-center gap-3 rounded-xl p-3", isOpen ? "glass" : "")}>
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-tertiary truncate">john@nexus.ai</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
