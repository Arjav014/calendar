"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { PenLine, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface NotesSectionProps {
  currentMonth: Date;
}

export function NotesSection({ currentMonth }: NotesSectionProps) {
  const monthKey = format(currentMonth, "yyyy-MM");
  const [syncedNotes, setSyncedNotes] = useLocalStorage<string>(`calendar-notes-${monthKey}`, "");
  const [localNotes, setLocalNotes] = useState(syncedNotes);
  const [isSaved, setIsSaved] = useState(true);

  // Sync state when month changes or when syncedNotes updates externally
  useEffect(() => {
    setLocalNotes(syncedNotes);
    setIsSaved(true);
  }, [syncedNotes, monthKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    setIsSaved(e.target.value === syncedNotes);
  };

  const handleSave = () => {
    setSyncedNotes(localNotes);
    setIsSaved(true);
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
        className="w-full h-24 resize-none bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 font-sans text-sm leading-relaxed"
        spellCheck="false"
      />
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-md transition-all duration-200 ${
            isSaved 
              ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          {isSaved ? "Saved" : "Save Note"}
        </button>
      </div>
    </div>
  );
}
