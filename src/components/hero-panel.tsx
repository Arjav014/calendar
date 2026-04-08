"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getMonthMetadata } from "@/lib/calendar-utils";
import { format } from "date-fns";
import Image from "next/image";

interface HeroPanelProps {
  currentMonth: Date;
}

export function HeroPanel({ currentMonth }: HeroPanelProps) {
  const monthIndex = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const meta = getMonthMetadata(monthIndex);

  // Map month index to seasons (Northern Hemisphere)
  const seasonMap: Record<number, string> = {
    0: "winter", 1: "winter", 2: "spring",
    3: "spring", 4: "spring", 5: "summer",
    6: "summer", 7: "summer", 8: "autumn",
    9: "autumn", 10: "autumn", 11: "winter"
  };
  const season = seasonMap[monthIndex];

  return (
    <div className={`relative min-h-[300px] lg:min-h-[400px] w-full p-8 flex flex-col justify-between overflow-hidden lg:rounded-tl-2xl rounded-t-2xl lg:rounded-tr-none ${meta.bgAccent} transition-colors duration-700 ease-in-out border-b border-border backdrop-blur-sm shadow-inner`}>
      {/* Background Illustrated Art */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={season} // Animate background swap on season change
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // keep opacity subtle to ensure text readability
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={`/seasons/${season}.png`}
              alt={`${season} illustration`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover scale-105"
              priority
            />
          </motion.div>
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
            className={`font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none ${meta.accentColor}`}
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
