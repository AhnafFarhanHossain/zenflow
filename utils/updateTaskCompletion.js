import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const updateTaskCompletion = async (getToken, taskId, completed) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    const { data, error } = await supabase
      .from("tasks")
      .update({
        status: completed ? "done" : "todo",
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task completion:", error);
      toast.error(`Failed to update task: ${error.message}`);
      return { error };
    }

    toast.success(
      completed ? "Task marked as complete!" : "Task marked as incomplete"
    );
    return { data: data[0] };
  } catch (error) {
    console.error("Unexpected error updating task completion:", error);
    toast.error("An unexpected error occurred");
    return { error };
  }
};
