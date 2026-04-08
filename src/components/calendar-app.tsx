"use client";

import { useCalendar } from "@/hooks/use-calendar";
import { HeroPanel } from "./hero-panel";
import { CalendarGrid } from "./calendar-grid";
import { NotesSection } from "./notes-section";
import { MonthNavigation } from "./month-navigation";
import { getMonthMetadata } from "@/lib/calendar-utils";
import { format } from "date-fns";

export function CalendarApp() {
  const {
    currentMonth,
    selectedRange,
    hoveredDate,
    handleNextMonth,
    handlePrevMonth,
    handleJumpToToday,
    handleDateClick,
    handleDateHover,
    clearSelection,
  } = useCalendar();

  const meta = getMonthMetadata(currentMonth.getMonth());

  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-border/80 overflow-hidden min-h-[800px]">
      {/* Left Panel: Hero */}
      <HeroPanel currentMonth={currentMonth} />

      {/* Right Panel: Calendar & Notes */}
      <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-12 z-10 bg-card rounded-2xl lg:rounded-none lg:rounded-r-2xl border-l-0 lg:border-l border-border relative">
        <MonthNavigation
          currentMonth={currentMonth}
          onNext={handleNextMonth}
          onPrev={handlePrevMonth}
          onToday={handleJumpToToday}
          accentColor={meta.accentColor}
        />

        <div className="flex-1 flex flex-col">
          <CalendarGrid
            currentMonth={currentMonth}
            selectedRange={selectedRange}
            hoveredDate={hoveredDate}
            onDateClick={handleDateClick}
            onDateHover={handleDateHover}
            accentColor={meta.accentColor}
          />

          <div className="mt-auto">
            {/* Range Selection Status */}
            <div className="h-4 flex items-center justify-between text-xs text-muted-foreground font-sans tracking-wide">
              <span>
                {selectedRange.start
                  ? `Selected: ${format(selectedRange.start, "MMM d")}` + (selectedRange.end ? ` - ${format(selectedRange.end, "MMM d")}` : " - ...")
                  : "No range selected"}
              </span>
              {(selectedRange.start || selectedRange.end) && (
                <button
                  onClick={clearSelection}
                  className="hover:text-foreground underline decoration-border underline-offset-4"
                >
                  Clear
                </button>
              )}
            </div>
            
            <NotesSection currentMonth={currentMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}
