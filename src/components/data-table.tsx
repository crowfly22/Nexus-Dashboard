"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, pageSize = 5 }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!filter) return data;
    return data.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(filter.toLowerCase()))
    );
  }, [data, filter]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="rounded-2xl border border-border bg-surface backdrop-blur-xl overflow-hidden"
    >
      {/* Filter bar */}
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Search className="h-4 w-4 text-text-tertiary" />
        <input
          type="text"
          placeholder="Filter records..."
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(0); }}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
        />
        <span className="text-xs text-text-tertiary">{sorted.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "px-5 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider",
                    col.sortable && "cursor-pointer hover:text-text-secondary select-none"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      sortKey === col.key ? (
                        sortDir === "asc" ? <ArrowUp className="h-3 w-3 text-primary-light" /> : <ArrowDown className="h-3 w-3 text-primary-light" />
                      ) : <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <motion.tr
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "border-b border-border/50 transition-colors",
                  hoveredRow === i && "bg-surface-hover"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-sm text-text-primary whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-xs text-text-tertiary">
          Page {page + 1} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
