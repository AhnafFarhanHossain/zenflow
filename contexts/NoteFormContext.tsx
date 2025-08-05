"use client";

import { createContext, useContext, useState, useRef } from "react";
import { Note, NoteFormContextType, ChildrenProps } from "@/types";

const NoteFormContext = createContext<NoteFormContextType | undefined>(undefined);

export const useNoteForm = (): NoteFormContextType => {
  const context = useContext(NoteFormContext);
  if (!context) {
    throw new Error("useNoteForm must be used within a NoteFormProvider");
  }
  return context;
};

export const NoteFormProvider = ({ children }: ChildrenProps) => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const noteCreatedCallbackRef = useRef<((note: Note) => void) | null>(null);

  const openNoteForm = (onNoteCreated?: (note: Note) => void, noteToEdit: Note | null = null) => {
    if (onNoteCreated) {
      noteCreatedCallbackRef.current = onNoteCreated;
    }
    setEditingNote(noteToEdit);
    setShowNoteForm(true);
  };

  const closeNoteForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
    noteCreatedCallbackRef.current = null;
  };

  const handleNoteCreated = (newNote: Note) => {
    if (noteCreatedCallbackRef.current) {
      noteCreatedCallbackRef.current(newNote);
    }
    closeNoteForm();
  };

  const value: NoteFormContextType = {
    showNoteForm,
    editingNote,
    openNoteForm,
    closeNoteForm,
    handleNoteCreated,
  };

  return (
    <NoteFormContext.Provider value={value}>
      {children}
    </NoteFormContext.Provider>
  );
};
