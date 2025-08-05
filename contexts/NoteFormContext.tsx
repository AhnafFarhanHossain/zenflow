"use client";

import { createContext, useContext, useState, useRef } from "react";

const NoteFormContext = createContext();

export const useNoteForm = () => {
  const context = useContext(NoteFormContext);
  if (!context) {
    throw new Error("useNoteForm must be used within a NoteFormProvider");
  }
  return context;
};

export const NoteFormProvider = ({ children }) => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const noteCreatedCallbackRef = useRef(null);

  const openNoteForm = (onNoteCreated, noteToEdit = null) => {
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

  const handleNoteCreated = (newNote) => {
    if (noteCreatedCallbackRef.current) {
      noteCreatedCallbackRef.current(newNote);
    }
    closeNoteForm();
  };

  const value = {
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
