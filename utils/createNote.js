import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const createNote = async ({ noteData }, getToken) => {
  try {
    // Validate required fields
    if (!noteData.title?.trim()) {
      return { error: { message: "Note title is required" } };
    }

    if (!noteData.body?.trim()) {
      return { error: { message: "Note body is required" } };
    }

    if (!noteData.user_id) {
      return { error: { message: "User ID is required" } };
    }

    console.log("Inserting Note Data:", noteData);

    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: noteData.user_id,
          title: noteData.title.trim(),
          body: noteData.body.trim(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error creating note:", error);
      return { error };
    }

    console.log("Note created successfully:", data); // Debug log
    return { data };
  } catch (err) {
    console.error("Unexpected error creating note:", err);
    return { error: { message: "An unexpected error occurred" } };
  }
};
