"use client";

import { cn } from "@/lib/utils";
import { isSameDay, isSameMonth, isToday, isWeekend } from "date-fns";
import { motion } from "framer-motion";
import { isInRange } from "@/lib/calendar-utils";
import { DateRange } from "@/hooks/use-calendar";

interface DateCellProps {
  date: Date;
  currentMonth: Date;
  selectedRange: DateRange;
  hoveredDate: Date | null;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
  accentColor: string;
}

export function DateCell({
  date,
  currentMonth,
  selectedRange,
  hoveredDate,
  onClick,
  onHover,
  accentColor,
}: DateCellProps) {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isDateToday = isToday(date);
  const isDateWeekend = isWeekend(date);

  const { start, end } = selectedRange;
  const isStart = start && isSameDay(date, start);
  const isEnd = end && isSameDay(date, end);
  
  // Calculate if date is in the selected range
  const inRange = isInRange(date, start, end);
  
  // Calculate hover preview range (if we have start but no end)
  const isHoverPreview = 
    start && 
    !end && 
    hoveredDate && 
    isInRange(date, start, hoveredDate) && 
    !isSameDay(date, start);

  // Base classes for the cell button
  const cellClasses = cn(
    "relative w-full h-14 md:h-20 sm:h-16 flex flex-col items-center justify-start py-2 sm:py-3 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring z-10",
    {
      // Text color logic
      "text-foreground": isCurrentMonth && !isDateWeekend,
      "text-muted-foreground": !isCurrentMonth,
      "text-primary font-medium": isDateToday && !isStart && !isEnd,
      "text-destructive/80": isDateWeekend && isCurrentMonth && !isStart && !isEnd,

      // Base interaction
      "cursor-pointer hover:bg-black/5": isCurrentMonth,
      "cursor-default pointer-events-none": !isCurrentMonth, // Optionally disable clicking outside month
      
      // Selected states text override
      "text-white z-20": isStart || isEnd,
    }
  );

  return (
    <button
      className={cellClasses}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => isCurrentMonth && onHover(date)}
      onMouseLeave={() => isCurrentMonth && onHover(null)}
      aria-label={date.toDateString()}
      type="button"
    >
      <span className="relative z-20 text-sm md:text-base">{date.getDate()}</span>
      
      {/* Today Marker */}
      {isDateToday && !isStart && !isEnd && (
        <span className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" />
      )}

      {/* Start/End Highlight with actual background styling */}
      {(isStart || isEnd) && (
        <motion.div
          layoutId={isStart ? "start-date" : "end-date"}
          className="absolute inset-2 sm:inset-3 rounded-full bg-primary shadow-sm z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}

      {/* In-range Highlight */}
      {(inRange && !isStart && !isEnd) && (
        <div className="absolute inset-y-2 sm:inset-y-3 inset-x-0 bg-primary/10 z-0" />
      )}

      {/* Hover Preview Highlight */}
      {isHoverPreview && (
        <div className="absolute inset-y-2 sm:inset-y-3 inset-x-0 bg-primary/5 z-0" />
      )}
      
      {/* Connection graphics for rounded ends */}
      {isStart && end && start < end && (
        <div className="absolute inset-y-2 sm:inset-y-3 right-0 w-1/2 bg-primary/10 z-0" />
      )}
      {isStart && end && start > end && (
        <div className="absolute inset-y-2 sm:inset-y-3 left-0 w-1/2 bg-primary/10 z-0" />
      )}
      {isEnd && start && start < end && (
        <div className="absolute inset-y-2 sm:inset-y-3 left-0 w-1/2 bg-primary/10 z-0" />
      )}
      {isEnd && start && start > end && (
        <div className="absolute inset-y-2 sm:inset-y-3 right-0 w-1/2 bg-primary/10 z-0" />
      )}
    </button>
  );
}
