import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const deleteAllTasks = async (getToken) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    // First, get all tasks for the current user to get their IDs
    const { data: userTasks, error: fetchError } = await supabase
      .from("tasks")
      .select("id");

    if (fetchError) {
      console.error("Error fetching user tasks:", fetchError);
      toast.error(`Failed to fetch tasks: ${fetchError.message}`);
      return { error: fetchError };
    }

    if (!userTasks || userTasks.length === 0) {
      toast.info("No tasks to delete");
      return { data: [] };
    }

    // Extract the IDs
    const taskIds = userTasks.map((task) => task.id);

    // Delete all tasks using the IDs
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .in("id", taskIds)
      .select("*");

    if (error) {
      console.error("Error deleting all tasks:", error);
      toast.error(`Failed to delete all tasks: ${error.message}`);
      return { error };
    }

    toast.success(`Successfully deleted ${data.length} tasks!`);
    return { data }; // data will be array of deleted records
  } catch (err) {
    console.error("Unexpected error deleting tasks:", err);
    toast.error(
      err.message || "An unexpected error occurred while deleting all tasks."
    );
    return { error: err };
  }
};
