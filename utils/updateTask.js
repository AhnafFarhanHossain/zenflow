import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const updateTask = async (getToken, taskId, updates) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task:", error);
      return { error };
    }

    return { data: data[0] };
  } catch (error) {
    console.error("Unexpected error updating task:", error);
    return { error };
  }
};
