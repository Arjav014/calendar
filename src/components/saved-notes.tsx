"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { SavedNote } from "@/lib/calendar-utils";
import { format } from "date-fns";
import { format as formatIso, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, CalendarRange, Trash2 } from "lucide-react";
import { DateRange } from "@/hooks/use-calendar";
import { useEffect, useState } from "react";

interface SavedNotesListProps {
  currentMonth: Date;
  onNoteClick: (range: DateRange) => void;
}

export function SavedNotesList({ currentMonth, onNoteClick }: SavedNotesListProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const monthKey = format(currentMonth, "yyyy-MM");
  const [savedNotes, setSavedNotes] = useLocalStorage<SavedNote[]>(`calendar-notes-list-${monthKey}`, []);

  const handleNoteClick = (note: SavedNote) => {
    onNoteClick({
      start: note.range.start ? parseISO(note.range.start) : null,
      end: note.range.end ? parseISO(note.range.end) : null,
    });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedNotes(savedNotes.filter((n) => n.id !== id));
    
    // Also clear selection if they delete a note while it's highlighted
    // But this is optional. We just delete the note for now.
  };

  const getRangeText = (range: SavedNote["range"]) => {
    if (!range.start) return "No date selected";
    const startObj = parseISO(range.start);
    const endObj = range.end ? parseISO(range.end) : null;

    if (!endObj) {
      return format(startObj, "MMM d, yyyy");
    }
    
    // Same day
    if (format(startObj, "yyyy-MM-dd") === format(endObj, "yyyy-MM-dd")) {
      return format(startObj, "MMM d, yyyy");
    }

    return `${format(startObj, "MMM d")} - ${format(endObj, "MMM d, yyyy")}`;
  };

  if (!isMounted || savedNotes.length === 0) return null;

  return (
    <div className="flex-1 w-full p-6 lg:p-8 overflow-y-auto bg-stone-100/50 border-r border-border">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Saved Notes ({savedNotes.length})
      </h3>
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {savedNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => handleNoteClick(note)}
              className="p-4 rounded-xl bg-card border border-border/60 shadow-sm relative overflow-hidden group cursor-pointer hover:border-primary/40 hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={(e) => handleDelete(e, note.id)} 
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-destructive/70 transition-all"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                  <Pin className="w-3.5 h-3.5" />
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary/80 mb-2">
                <CalendarRange className="w-3.5 h-3.5" />
                {getRangeText(note.range)}
              </div>
              
              <p className="text-sm font-sans text-foreground/90 whitespace-pre-wrap leading-relaxed line-clamp-4">
                {note.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
