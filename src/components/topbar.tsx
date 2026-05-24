"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  theme?: "dark" | "light";
}

export function Topbar({ onMenuClick, onThemeToggle, theme = "dark" }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const notificationCount = 5;

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search anything..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={cn(
            "w-full rounded-xl border bg-surface py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all duration-300",
            searchFocused
              ? "border-primary/40 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
              : "border-border"
          )}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] text-text-tertiary hidden sm:inline">
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className="rounded-xl p-2.5 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          {notificationCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white"
            >
              {notificationCount}
            </motion.span>
          )}
        </button>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white cursor-pointer ring-2 ring-transparent hover:ring-primary/40 transition-all">
          JD
        </div>
      </div>
    </header>
  );
}
