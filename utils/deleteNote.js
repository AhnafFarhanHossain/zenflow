import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const deleteNote = async (noteId, getToken) => {
  try {
    if (!noteId) {
      console.error("Note ID is required for deletion");
      toast.error("Invalid note ID");
      return { error: { message: "Note ID is required" } };
    }

    console.log("Deleting note with ID:", noteId);

    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .select("*");

    if (error) {
      console.error("Supabase error deleting note:", error);
      toast.error("Failed to delete note: " + error.message);
      return { error };
    }

    console.log("Note deleted successfully:", data);
    toast.success("Note deleted successfully!");
    return { data };
  } catch (err) {
    console.error("Unexpected error deleting note:", err);
    toast.error("An unexpected error occurred while deleting the note");
    return { error: { message: "An unexpected error occurred" } };
  }
};
