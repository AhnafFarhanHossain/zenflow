import { supabase } from "./supabase";

export const getTasks = async (userId = null) => {
  try {
    if (!userId) {
      console.warn("No user ID provided to getTasks");
      return [];
    }

    console.log("Fetching tasks for user:", userId); // Debug log

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }

    console.log("Fetched tasks:", data); // Debug log
    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching tasks:", err);
    return [];
  }
};
