"use client";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

interface MonthNavigationProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
  accentColor?: string;
}

export function MonthNavigation({
  currentMonth,
  onNext,
  onPrev,
  onToday,
  accentColor = "text-primary",
}: MonthNavigationProps) {
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        return;
      }
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "t") onToday();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onToday]);

  return (
    <div className="flex items-center justify-between py-4 mb-6 sm:mb-8 border-b border-border/50">
      <div className="flex flex-col">
        <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <span className="text-xs text-muted-foreground font-sans uppercase tracking-wider mt-1">
          Calendar Overview
        </span>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={onToday}
          className="mr-2 md:mr-4 flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-border/60 text-xs font-semibold uppercase tracking-wider bg-card hover:bg-stone-50 transition-colors tooltip-trigger group"
          title="Jump to today (T)"
        >
          <CalendarDays className={`w-4 h-4 ${accentColor}`} />
          <span className="hidden sm:inline">Today</span>
        </button>

        <button
          onClick={onPrev}
          className="p-2 md:p-3 rounded-full hover:bg-black/5 transition-colors group"
          title="Previous Month (←)"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button
          onClick={onNext}
          className="p-2 md:p-3 rounded-full hover:bg-black/5 transition-colors group"
          title="Next Month (→)"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
}
