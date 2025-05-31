import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const getNotes = async (getToken, userId = null) => {
  try {
    console.log("Fetching notes for user:", userId); // Debug log

    const supabase = await getSupabaseWithAuth(getToken);
    let query = supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    // If userId is provided, filter by it (for additional security)
    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching notes:", error);
      return [];
    }

    console.log("Fetched notes:", data); // Debug log
    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching notes:", err);
    return [];
  }
};
