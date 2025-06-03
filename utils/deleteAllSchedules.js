import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const deleteAllSchedules = async (getToken) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    // First, get all schedules for the current user to get their IDs
    const { data: userSchedules, error: fetchError } = await supabase
      .from("schedules")
      .select("id");

    if (fetchError) {
      console.error("Error fetching user schedules:", fetchError);
      toast.error(`Failed to fetch schedules: ${fetchError.message}`);
      return { error: fetchError };
    }

    if (!userSchedules || userSchedules.length === 0) {
      toast.info("No schedules to delete");
      return { data: [] };
    }

    // Extract the IDs
    const scheduleIds = userSchedules.map((schedule) => schedule.id);

    // Delete all schedules using the IDs
    const { data, error } = await supabase
      .from("schedules")
      .delete()
      .in("id", scheduleIds)
      .select();

    if (error) {
      console.error("Error deleting schedules:", error);
      toast.error(`Failed to delete schedules: ${error.message}`);
      return { error };
    }

    toast.success(`Successfully deleted ${userSchedules.length} schedule(s)`);
    return { data };
  } catch (error) {
    console.error("Unexpected error deleting schedules:", error);
    toast.error("An unexpected error occurred");
    return { error };
  }
};
