"use client";

import { useState } from "react";
import { addMonths, subMonths, isSameDay } from "date-fns";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));
  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleJumpToToday = () => setCurrentMonth(new Date());

  const handleDateClick = (date: Date) => {
    // If we have both, reset and start over
    if (selectedRange.start && selectedRange.end) {
      setSelectedRange({ start: date, end: null });
      return;
    }

    // If we only have start
    if (selectedRange.start && !selectedRange.end) {
      // If clicking the same date, reset
      if (isSameDay(selectedRange.start, date)) {
        setSelectedRange({ start: null, end: null });
        return;
      }
      
      // Let the range be start..end regardless of order, we normalize it in rendering
      setSelectedRange({
        start: selectedRange.start,
        end: date,
      });
      return;
    }

    // If we have nothing, set start
    setSelectedRange({ start: date, end: null });
  };

  const handleDateHover = (date: Date | null) => {
    setHoveredDate(date);
  };

  const clearSelection = () => {
    setSelectedRange({ start: null, end: null });
  };

  return {
    currentMonth,
    selectedRange,
    hoveredDate,
    handleNextMonth,
    handlePrevMonth,
    handleJumpToToday,
    handleDateClick,
    handleDateHover,
    clearSelection,
  };
}
