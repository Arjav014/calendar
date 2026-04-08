"use client";

import { DateRange } from "@/hooks/use-calendar";
import { getCalendarDays } from "@/lib/calendar-utils";
import { DateCell } from "./date-cell";
import { motion } from "framer-motion";

interface CalendarGridProps {
  currentMonth: Date;
  selectedRange: DateRange;
  hoveredDate: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  accentColor: string;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({
  currentMonth,
  selectedRange,
  hoveredDate,
  onDateClick,
  onDateHover,
  accentColor,
}: CalendarGridProps) {
  const days = getCalendarDays(currentMonth);

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-7 mb-4 border-b border-border/50 pb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
          >
            {day}
          </div>
        ))}
      </div>

      <motion.div
        key={currentMonth.toISOString()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, staggerChildren: 0.02 }}
        className="grid grid-cols-7 gap-y-1"
      >
        {days.map((date) => (
          <DateCell
            key={date.toISOString()}
            date={date}
            currentMonth={currentMonth}
            selectedRange={selectedRange}
            hoveredDate={hoveredDate}
            onClick={onDateClick}
            onHover={onDateHover}
            accentColor={accentColor}
          />
        ))}
      </motion.div>
    </div>
  );
}
