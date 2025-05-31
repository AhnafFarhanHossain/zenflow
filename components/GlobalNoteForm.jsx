"use client";

import { useNoteForm } from "@/contexts/NoteFormContext";
import NoteForm from "@/components/dashboard/NoteForm";

const GlobalNoteForm = () => {
  const { showNoteForm, closeNoteForm, handleNoteCreated, editingNote } =
    useNoteForm();

  if (!showNoteForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl w-full max-w-lg relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <NoteForm
          onClose={closeNoteForm}
          handleClose={closeNoteForm}
          onNoteCreated={handleNoteCreated}
          editingNote={editingNote}
        />
      </div>
    </div>
  );
};

export default GlobalNoteForm;
