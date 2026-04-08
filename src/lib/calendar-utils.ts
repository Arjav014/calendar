import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  format,
} from "date-fns";

export interface SavedNote {
  id: string;
  text: string;
  range: {
    start: string | null;
    end: string | null;
  };
  createdAt: string;
}

export function getCalendarDays(month: Date): Date[] {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  
  // Get the start of the week for the first day of the month (defaulting to Sunday start)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // 0 = Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  
  // Normalize the order in case user selected backwards
  const minDate = start < end ? start : end;
  const maxDate = start > end ? start : end;
  
  return isWithinInterval(date, { start: minDate, end: maxDate }) || isSameDay(date, start) || isSameDay(date, end);
}

// Generate aesthetic metadata for a month (0-11)
export function getMonthMetadata(monthIndex: number) {
  const metadata = [
    { title: "January", accentColor: "text-stone-700", bgAccent: "bg-stone-100", stroke: "#2C2C2C" },
    { title: "February", accentColor: "text-terracotta", bgAccent: "bg-[#FDF6F4]", stroke: "#C4684A" },
    { title: "March", accentColor: "text-sage", bgAccent: "bg-[#F7FAF6]", stroke: "#7A8B6F" },
    { title: "April", accentColor: "text-stone-700", bgAccent: "bg-stone-50", stroke: "#555" },
    { title: "May", accentColor: "text-terracotta", bgAccent: "bg-stone-50", stroke: "#C4684A" },
    { title: "June", accentColor: "text-sage", bgAccent: "bg-stone-50", stroke: "#7A8B6F" },
    { title: "July", accentColor: "text-stone-700", bgAccent: "bg-stone-100", stroke: "#2C2C2C" },
    { title: "August", accentColor: "text-terracotta", bgAccent: "bg-[#FDF6F4]", stroke: "#C4684A" },
    { title: "September", accentColor: "text-sage", bgAccent: "bg-[#F7FAF6]", stroke: "#7A8B6F" },
    { title: "October", accentColor: "text-terracotta", bgAccent: "bg-[#FDF6F4]", stroke: "#C4684A" },
    { title: "November", accentColor: "text-stone-700", bgAccent: "bg-stone-100", stroke: "#555" },
    { title: "December", accentColor: "text-sage", bgAccent: "bg-stone-50", stroke: "#7A8B6F" },
  ];
  return metadata[monthIndex];
}
