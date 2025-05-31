import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const updateNote = async (noteId, { title, body }, getToken) => {
  try {
    // Validate required fields
    if (!noteId) {
      return { error: { message: "Note ID is required" } };
    }

    if (!title?.trim()) {
      return { error: { message: "Note title is required" } };
    }

    if (!body?.trim()) {
      return { error: { message: "Note body is required" } };
    }

    console.log("Updating note:", noteId, { title, body });

    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: title.trim(),
        body: body.trim(),
      })
      .eq("id", noteId)
      .select();

    if (error) {
      console.error("Supabase error updating note:", error);
      return { error };
    }

    console.log("Note updated successfully:", data);
    return { data };
  } catch (err) {
    console.error("Unexpected error updating note:", err);
    return { error: { message: "An unexpected error occurred" } };
  }
};
