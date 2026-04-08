"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { PenLine, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { SavedNote } from "@/lib/calendar-utils";
import { DateRange } from "@/hooks/use-calendar";

interface NotesSectionProps {
  currentMonth: Date;
  selectedRange: DateRange;
  clearSelection: () => void;
}

export function NotesSection({ currentMonth, selectedRange, clearSelection }: NotesSectionProps) {
  const monthKey = format(currentMonth, "yyyy-MM");
  const [savedNotes, setSavedNotes] = useLocalStorage<SavedNote[]>(`calendar-notes-list-${monthKey}`, []);
  const [localNotes, setLocalNotes] = useState("");
  const [isSaved, setIsSaved] = useState(true);

  // Sync state when month changes
  useEffect(() => {
    setLocalNotes("");
    setIsSaved(true);
  }, [monthKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    setIsSaved(e.target.value.trim() === "");
  };

  const handleSave = () => {
    if (!localNotes.trim()) return;

    const newNote: SavedNote = {
      id: crypto.randomUUID(),
      text: localNotes,
      range: {
        start: selectedRange.start ? selectedRange.start.toISOString() : null,
        end: selectedRange.end ? selectedRange.end.toISOString() : null,
      },
      createdAt: new Date().toISOString()
    };

    setSavedNotes([...savedNotes, newNote]);
    setLocalNotes("");
    setIsSaved(true);
    
    // Clear highlighting as requested
    clearSelection();
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
