"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, FolderKanban, Bot, Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { StatCard } from "@/components/stat-card";
import { ChartWidget } from "@/components/chart-widget";
import { ActivityFeed } from "@/components/activity-feed";
import { AIAssistant } from "@/components/ai-assistant";
import { ProjectCard } from "@/components/project-card";
import { DataTable } from "@/components/data-table";
import { Modal } from "@/components/modal";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ToastProvider, useToast } from "@/components/notification-toast";

const stats = [
  { title: "Total Revenue", value: "$124,563", change: 12.4, icon: DollarSign, gradient: "bg-gradient-to-br from-primary to-primary-light" },
  { title: "Active Users", value: "28,472", change: 8.2, icon: Users, gradient: "bg-gradient-to-br from-accent to-cyan-400" },
  { title: "Projects", value: "1,284", change: -2.1, icon: FolderKanban, gradient: "bg-gradient-to-br from-success to-emerald-400" },
  { title: "AI Requests", value: "45.2K", change: 24.8, icon: Bot, gradient: "bg-gradient-to-br from-warning to-amber-400" },
];

const projects = [
  { name: "Project Atlas", description: "AI-powered search engine for enterprise data", progress: 78, status: "active" as const, team: ["JD", "SC", "MK", "LP", "RW"], color: "bg-primary" },
  { name: "Nebula UI", description: "Next-gen component library with AI generation", progress: 92, status: "review" as const, team: ["AK", "TH", "RD"], color: "bg-accent" },
  { name: "Quantum API", description: "High-performance GraphQL gateway", progress: 45, status: "active" as const, team: ["LP", "JD", "MK", "YZ"], color: "bg-success" },
  { name: "Prism Analytics", description: "Real-time business intelligence platform", progress: 100, status: "completed" as const, team: ["SC", "TH", "AK"], color: "bg-warning" },
];

const tableData = [
  { model: "GPT-4 Turbo", requests: "12,847", latency: "120ms", accuracy: "98.2%", cost: "$1,247", status: "Active" },
  { model: "Claude 3 Opus", requests: "8,432", latency: "95ms", accuracy: "97.8%", cost: "$832", status: "Active" },
  { model: "Gemini Pro", requests: "6,218", latency: "110ms", accuracy: "96.5%", cost: "$521", status: "Active" },
  { model: "Llama 3 70B", requests: "4,891", latency: "85ms", accuracy: "95.1%", cost: "$298", status: "Active" },
  { model: "Mistral Large", requests: "3,245", latency: "92ms", accuracy: "94.7%", cost: "$204", status: "Active" },
  { model: "Claude 3 Haiku", requests: "15,632", latency: "45ms", accuracy: "92.3%", cost: "$412", status: "Active" },
  { model: "GPT-3.5 Turbo", requests: "28,103", latency: "55ms", accuracy: "89.4%", cost: "$156", status: "Deprecated" },
  { model: "Cohere Command", requests: "1,847", latency: "105ms", accuracy: "93.2%", cost: "$189", status: "Beta" },
];

const tableColumns = [
  { key: "model", label: "Model", sortable: true },
  { key: "requests", label: "Requests", sortable: true },
  { key: "latency", label: "Latency", sortable: true },
  { key: "accuracy", label: "Accuracy", sortable: true },
  { key: "cost", label: "Cost", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: unknown) => {
      const v = String(value);
      const colors: Record<string, string> = {
        Active: "bg-success/10 text-success border-success/20",
        Deprecated: "bg-error/10 text-error border-error/20",
        Beta: "bg-warning/10 text-warning border-warning/20",
      };
      return (
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colors[v] || ""}`}>
          {v}
        </span>
      );
    },
  },
];

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeItem={activeItem}
        onNavigate={setActiveItem}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={toggleTheme}
          theme={theme}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-text-primary">Dashboard</h1>
                <p className="text-sm text-text-secondary">Welcome back, John. Here&apos;s what&apos;s happening today.</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                New Project
              </button>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.title} {...stat} index={i} />
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ChartWidget title="Revenue Overview" subtitle="Monthly revenue for 2024" type="line" />
              <ChartWidget title="Weekly Activity" subtitle="API requests this week" type="bar" />
            </div>

            {/* Projects */}
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 text-lg font-semibold text-text-primary"
              >
                Active Projects
              </motion.h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {projects.map((project, i) => (
                  <ProjectCard key={project.name} {...project} index={i} />
                ))}
              </div>
            </div>

            {/* Bottom section: Activity + AI */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ActivityFeed />
              <AIAssistant />
            </div>

            {/* Data table */}
            <DataTable columns={tableColumns} data={tableData as unknown as Record<string, unknown>[]} pageSize={5} />

            {/* Bottom spacer */}
            <div className="h-8" />
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Project">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
            <textarea
              rows={3}
              placeholder="Describe your project..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-primary/40 transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setModalOpen(false);
                addToast("success", "Project created", "Your new project has been created successfully.");
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-110"
            >
              Create Project
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
