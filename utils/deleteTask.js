import { supabase } from "./supabase";

export const deleteTask = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    return { error };
  }

  return { data };
}