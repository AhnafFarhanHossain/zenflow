import { toast } from "sonner";
import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const updateTaskStatus = async (getToken, taskId, currentStatus) => {
  const newStatus = currentStatus === "done" ? "todo" : "done";

  try {
    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId)
      .select()
      .single();

    if (error) {
      console.error("Error updating task status:", error);
      toast.error(`Failed to update task: ${error.message}`);
      return { error };
    }
    return { data };
  } catch (err) {
    console.error("Unexpected error updating task status:", err);
    toast.error(
      err.message || "An unexpected error occurred while updating task status."
    );
    return { error: err };
  }
};
