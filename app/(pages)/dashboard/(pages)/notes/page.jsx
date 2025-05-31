"use client";

import { useState, useEffect } from "react";
import { ActionButton } from "@/components/dashboard/ActionButtons";
import { Plus, Trash2, Edit3, FileText } from "lucide-react";
import { getNotes } from "@/utils/getNotes";
import { deleteNote } from "@/utils/deleteNote";
import { deleteAllNotes } from "@/utils/deleteAllNotes";
import { toast } from "sonner";
import { useUser, useAuth } from "@clerk/nextjs";
import { useNoteForm } from "@/contexts/NoteFormContext";
import SearchBar from "@/components/Searchbar";

const Notes = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { openNoteForm } = useNoteForm();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const fetchNotes = async () => {
    if (!isLoaded || !user?.id) return;

    try {
      setLoading(true);
      const fetchedNotes = await getNotes(getToken, user.id);
      setNotes(fetchedNotes || []);
      setSearchQuery(""); // Reset search when fetching new notes
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchNotes();
    } else if (isLoaded && !user) {
      setLoading(false);
      setNotes([]);
    }
  }, [user?.id, isLoaded]);

  const handleNoteCreated = (newNote) => {
    // Refresh notes after note creation/update
    if (user?.id) {
      fetchNotes();
    }
  };
  const handleDeleteNote = async (noteId) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    const result = await deleteNote(noteId, getToken);
    if (result.data) {
      // Remove note from local state
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteId)
      );
    }
  };

  const handleDeleteAllNotes = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    if (notes.length === 0) {
      toast.info("No notes to delete");
      return;
    }

    // Show confirmation
    if (
      !window.confirm(
        `Are you sure you want to delete all ${notes.length} notes? This action cannot be undone.`
      )
    ) {
      return;
    }
    const result = await deleteAllNotes(getToken);
    if (result.data) {
      setNotes([]);
      setCurrentPage(1);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotes = filteredNotes.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div
        className="space-y-6"
        style={{ fontFamily: "var(--font-baiJamjuree)" }}
      >
        <div className="mb-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse"
            >
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "var(--font-baiJamjuree)" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Notes
        </h1>
        <p className="text-sm sm:text-base lg:text-sm text-gray-600 dark:text-gray-400">
          Keep track of your thoughts and ideas
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <SearchBar
            placeholder="Search through your notes..."
            onSearch={handleSearch}
          />
          <ActionButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="hidden sm:flex"
            onClick={() => openNoteForm(handleNoteCreated)}
          >
            New Note
          </ActionButton>
          {notes.length > 0 && (
            <ActionButton
              variant="danger"
              icon={<Trash2 className="w-4 h-4" />}
              className="hidden sm:flex"
              onClick={handleDeleteAllNotes}
            >
              Delete All Notes
            </ActionButton>
          )}
        </div>
        <div className="flex gap-2 sm:hidden w-full">
          <button
            className="flex-1 p-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-sm border border-gray-700 dark:border-gray-600 rounded-md"
            onClick={() => openNoteForm(handleNoteCreated)}
            aria-label="New Note"
          >
            <Plus className="w-4 h-4 mx-auto" />
          </button>
          {notes.length > 0 && (
            <button
              className="flex-1 p-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white shadow-sm border border-red-500 dark:border-red-600 rounded-md"
              onClick={handleDeleteAllNotes}
              aria-label="Delete All Notes"
            >
              <Trash2 className="w-4 h-4 mx-auto" />
            </button>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      {currentNotes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">
                    {note.title}
                  </h3>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => openNoteForm(handleNoteCreated, note)}
                      className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      aria-label="Edit note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                  {note.body}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {formatDate(note.created_at)}
                  {note.updated_at && note.updated_at !== note.created_at && (
                    <span className="block">
                      Updated: {formatDate(note.updated_at)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <span className="font-medium text-gray-200 dark:text-gray-100">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredNotes.length)} of{" "}
                  {filteredNotes.length} notes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center flex-col">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm text-center mb-6">
              {searchQuery
                ? `No notes match "${searchQuery}". Try adjusting your search terms.`
                : "Create your first note to start organizing your thoughts and ideas."}
            </p>
            <div className="flex justify-center">
              <ActionButton
                onClick={() => openNoteForm(handleNoteCreated)}
                variant="secondary"
              >
                <Plus className="w-4 h-4" />
                Create Note
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
