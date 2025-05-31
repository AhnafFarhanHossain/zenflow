import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner"; // Added toast import

export const deleteTask = async (getToken, id) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .select() // Optionally select to confirm what was deleted or if needed by UI
      .single(); // Assuming we are deleting one task and want its details if successful

    if (error) {
      console.error("Error deleting task:", error);
      toast.error(`Failed to delete task: ${error.message}`);
      return { error };
    }

    toast.success("Task deleted successfully!"); // It's often better to show success from the calling component
    return { data }; // data will be the deleted record if .select().single() is used
  } catch (err) {
    console.error("Unexpected error deleting task:", err);
    toast.error(
      err.message || "An unexpected error occurred while deleting the task."
    );
    return { error: err };
  }
};
