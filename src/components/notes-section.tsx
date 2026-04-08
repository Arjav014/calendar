"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

interface NotesSectionProps {
  currentMonth: Date;
}

export function NotesSection({ currentMonth }: NotesSectionProps) {
  const monthKey = format(currentMonth, "yyyy-MM");
  const [syncedNotes, setSyncedNotes] = useLocalStorage<string>(`calendar-notes-${monthKey}`, "");
  const [localNotes, setLocalNotes] = useState(syncedNotes);

  // Sync state when month changes
  useEffect(() => {
    setLocalNotes(syncedNotes);
  }, [syncedNotes, monthKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    setSyncedNotes(e.target.value);
  };

  return (
    <div className="w-full mt-6 bg-stone-50/50 rounded-xl p-6 border border-border/60 shadow-sm flex flex-col gap-3 group transition-all duration-300 hover:shadow-md hover:bg-stone-50">
      <div className="flex items-center gap-2 text-muted-foreground pb-2 border-b border-border/50">
        <PenLine className="w-4 h-4 opacity-70" />
        <h3 className="text-sm font-medium tracking-wide uppercase">Notes & Memos</h3>
        <span className="ml-auto text-xs opacity-50 font-sans">
          {format(currentMonth, "MMMM yyyy")}
        </span>
      </div>
      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder={`Add notes for ${format(currentMonth, "MMMM")}...`}
        className="w-full h-32 resize-none bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 font-sans text-sm leading-relaxed"
        spellCheck="false"
      />
    </div>
  );
}
