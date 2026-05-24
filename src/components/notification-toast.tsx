"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  addToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const iconMap = {
  success: { icon: CheckCircle2, className: "text-success", bg: "bg-success/10" },
  error: { icon: AlertCircle, className: "text-error", bg: "bg-error/10" },
  info: { icon: Info, className: "text-accent", bg: "bg-accent/10" },
  warning: { icon: AlertTriangle, className: "text-warning", bg: "bg-warning/10" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const config = iconMap[toast.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="pointer-events-auto rounded-xl border border-border bg-background/95 backdrop-blur-xl p-4 shadow-xl shadow-black/20"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.className)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
                    {toast.message && <p className="text-xs text-text-tertiary mt-0.5">{toast.message}</p>}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="rounded-md p-1 text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
