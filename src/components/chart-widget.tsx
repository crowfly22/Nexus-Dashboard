"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  type?: "line" | "bar";
}

const monthlyData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5800 },
  { month: "Mar", value: 5100 },
  { month: "Apr", value: 7200 },
  { month: "May", value: 6800 },
  { month: "Jun", value: 8900 },
  { month: "Jul", value: 8200 },
  { month: "Aug", value: 9600 },
  { month: "Sep", value: 9100 },
  { month: "Oct", value: 11200 },
  { month: "Nov", value: 10800 },
  { month: "Dec", value: 12400 },
];

const weeklyData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 63 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 45 },
  { day: "Sun", value: 38 },
];

function LineChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...monthlyData.map((d) => d.value));
  const minVal = Math.min(...monthlyData.map((d) => d.value));

  const points = monthlyData.map((d, i) => ({
    x: padding.left + (i / (monthlyData.length - 1)) * chartW,
    y: padding.top + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH,
    ...d,
  }));

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) / 3;
    const cpx2 = p.x - (p.x - prev.x) / 3;
    return `${acc} C ${cpx1} ${prev.y} ${cpx2} ${p.y} ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padding.top + chartH * (1 - t);
        return (
          <line key={t} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
        );
      })}

      {/* Area fill */}
      <motion.path
        d={areaD}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? 5 : 3}
            fill={hoveredIndex === i ? "#A78BFA" : "#7C3AED"}
            stroke="#09090B"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.05 }}
            className="cursor-pointer"
          />
          {hoveredIndex === i && (
            <g>
              <rect
                x={p.x - 40}
                y={p.y - 36}
                width={80}
                height={26}
                rx={6}
                fill="rgba(9,9,11,0.9)"
                stroke="rgba(255,255,255,0.1)"
              />
              <text x={p.x} y={p.y - 18} textAnchor="middle" fill="#FAFAFA" fontSize={11} fontWeight={600}>
                ${p.value.toLocaleString()}
              </text>
            </g>
          )}
        </g>
      ))}

      {/* X-axis labels */}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 5} textAnchor="middle" fill="#71717A" fontSize={10}>
          {p.month}
        </text>
      ))}
    </svg>
  );
}

function BarChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...weeklyData.map((d) => d.value));
  const barW = chartW / weeklyData.length * 0.5;
  const gap = chartW / weeklyData.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padding.top + chartH * (1 - t);
        return (
          <line key={t} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
        );
      })}

      {/* Bars */}
      {weeklyData.map((d, i) => {
        const barH = (d.value / maxVal) * chartH;
        const x = padding.left + i * gap + (gap - barW) / 2;
        const y = padding.top + chartH - barH;
        return (
          <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
            <motion.rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              fill={hoveredIndex === i ? "#06B6D4" : "url(#barGrad)"}
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1}
              initial={{ height: 0, y: padding.top + chartH }}
              animate={{ height: barH, y }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className="cursor-pointer"
            />
            {hoveredIndex === i && (
              <g>
                <rect
                  x={x + barW / 2 - 25}
                  y={y - 30}
                  width={50}
                  height={22}
                  rx={5}
                  fill="rgba(9,9,11,0.9)"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text x={x + barW / 2} y={y - 14} textAnchor="middle" fill="#FAFAFA" fontSize={11} fontWeight={600}>
                  {d.value}
                </text>
              </g>
            )}
            <text x={x + barW / 2} y={height - 5} textAnchor="middle" fill="#71717A" fontSize={10}>
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ChartWidget({ title, subtitle, type = "line" }: ChartWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl border border-border bg-surface backdrop-blur-xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {subtitle && <p className="text-sm text-text-tertiary mt-0.5">{subtitle}</p>}
      </div>
      {type === "line" ? <LineChart /> : <BarChart />}
    </motion.div>
  );
}
