import { supabase } from "./supabase";
import { toast } from "sonner"; // Added toast import

export const deleteAllTasks = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("user_id", userId)
      .select("*"); // Delete all tasks for the user
    if (error) {
      console.error("Error deleting all tasks:", error);
      toast.error(`Failed to delete all tasks: ${error.message}`);
      return { error };
    }

    toast.success("All tasks deleted successfully!");
    return { data }; // data will be array of deleted records
  } catch (err) {
    console.error("Unexpected error deleting tasks:", err);
    toast.error(
      err.message || "An unexpected error occurred while deleting all tasks."
    );
    return { error: err };
  }
};
