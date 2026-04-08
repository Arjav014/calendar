"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getMonthMetadata } from "@/lib/calendar-utils";
import { format } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Pin } from "lucide-react";

interface HeroPanelProps {
  currentMonth: Date;
}

export function HeroPanel({ currentMonth }: HeroPanelProps) {
  const monthIndex = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const meta = getMonthMetadata(monthIndex);

  // Generate dynamic, organic SVG paths for the abstract art based on month
  // Just changing control points slightly based on month index for a shifting liquid feel
  const offset = monthIndex * 15;
  const pathData = `M 20 ${80 + offset/2} Q ${50 + offset} ${20 - offset/3} 100 ${50 + offset/4} T 180 ${40 + offset/2} Q 190 120 150 ${160 - offset/2} T 50 180 Q 5 ${150 + offset/3} 20 ${80 + offset/2} Z`;
  const pathData2 = `M 40 ${60 + offset/3} Q ${80 - offset/2} ${10 + offset/2} 130 40 T 170 ${90 - offset/4} Q 150 160 100 ${140 + offset/3} T 30 110 Q 10 80 40 ${60 + offset/3} Z`;

  return (
    <div className={`relative min-h-[300px] lg:min-h-[400px] w-full p-8 flex flex-col justify-between overflow-hidden lg:rounded-tl-2xl rounded-t-2xl lg:rounded-tr-none ${meta.bgAccent} transition-colors duration-700 ease-in-out border-b border-border backdrop-blur-sm shadow-inner`}>
      {/* Background Abstract Art */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply overflow-hidden scale-110 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.svg
            key={monthIndex}
            viewBox="0 0 200 200"
            className="w-[150%] h-[150%] opacity-60 drop-shadow-2xl blur-2xl"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <path d={pathData} fill={meta.stroke} />
            <path d={pathData2} fill={meta.stroke} opacity="0.5" />
          </motion.svg>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col items-start pt-4 lg:pt-12">
        <div className="text-muted-foreground tracking-widest uppercase text-sm font-semibold mb-2">
          {year}
        </div>
        <AnimatePresence mode="wait">
          <motion.h1
            key={monthIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`font-serif text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none ${meta.accentColor}`}
          >
            {format(currentMonth, "MMMM")}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-16 lg:pt-0">
        <div className="flex gap-2 mb-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === monthIndex
                  ? `w-8 ${meta.accentColor.replace("text-", "bg-")}`
                  : "w-1.5 bg-foreground/10"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed font-sans">
            Select a date range and save notes underneath to attach them to {meta.title}.
          </p>
        </div>
      </div>
    </div>
  );
}
