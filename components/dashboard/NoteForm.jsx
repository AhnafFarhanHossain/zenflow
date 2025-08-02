"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const NoteForm = ({ handleClose, editingNote = null, onNoteCreated }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    body: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if editing a note
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setBody(editingNote.body || "");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors first
    setErrors({
      title: "",
      body: "",
    });

    // Validate form fields
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Note title is required" }));
      return;
    }

    if (!body.trim()) {
      setErrors((prev) => ({ ...prev, body: "Note body is required" }));
      return;
    }

    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission for static frontend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        editingNote
          ? "Note updated successfully!"
          : "Note created successfully!"
      );

      // Reset form
      setTitle("");
      setBody("");

      // Trigger callback if provided
      if (onNoteCreated) {
        onNoteCreated({
          id: Date.now(),
          title: title.trim(),
          body: body.trim(),
          user_id: user.id,
        });
      }
      handleClose();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Failed to save note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-lg w-full p-5 sm:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {editingNote ? "Edit Note" : "Create New Note"}
          </h2>
          <X
            onClick={handleClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div>
            <label
              htmlFor="note-title"
              className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
            >
              Note Title
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="note-title"
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
              placeholder="Enter note title..."
              required
            />
            {errors.title && (
              <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
                {errors.title}
              </p>
            )}
          </div>

          {/* Body Field */}
          <div>
            <label
              htmlFor="note-body"
              className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
            >
              Note Content
            </label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              value={body}
              id="note-body"
              rows={6}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm resize-vertical"
              placeholder="Write your note content here..."
              required
            />
            {errors.body && (
              <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
                {errors.body}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting}
            className="flex-1 w-full mt-2 cursor-pointer"
          >
            {isSubmitting
              ? editingNote
                ? "Updating..."
                : "Creating..."
              : editingNote
              ? "Update Note"
              : "Create Note"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
