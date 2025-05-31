import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const deleteAllNotes = async (getToken) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    // First, get all notes for the current user to get their IDs
    const { data: userNotes, error: fetchError } = await supabase
      .from("notes")
      .select("id");

    if (fetchError) {
      console.error("Error fetching user notes:", fetchError);
      toast.error(`Failed to fetch notes: ${fetchError.message}`);
      return { error: fetchError };
    }

    if (!userNotes || userNotes.length === 0) {
      toast.info("No notes to delete");
      return { data: [] };
    }

    // Extract the IDs
    const noteIds = userNotes.map((note) => note.id);

    // Delete all notes using the IDs
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .in("id", noteIds)
      .select("*");

    if (error) {
      console.error("Error deleting all notes:", error);
      toast.error(`Failed to delete all notes: ${error.message}`);
      return { error };
    }

    toast.success(`Successfully deleted ${data.length} notes!`);
    return { data }; // data will be array of deleted records
  } catch (err) {
    console.error("Unexpected error deleting notes:", err);
    toast.error(
      err.message || "An unexpected error occurred while deleting all notes."
    );
    return { error: err };
  }
};
