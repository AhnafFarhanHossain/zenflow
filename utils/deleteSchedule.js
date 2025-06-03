import { getSupabaseWithAuth } from "./supabaseWithAuth";
import { toast } from "sonner";

export const deleteSchedule = async (getToken, scheduleId) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    const { data, error } = await supabase
      .from("schedules")
      .delete()
      .eq("id", scheduleId)
      .select();

    if (error) {
      console.error("Error deleting schedule:", error);
      toast.error(`Failed to delete schedule: ${error.message}`);
      return { error };
    }

    toast.success("Schedule deleted successfully");
    return { data: data[0] };
  } catch (error) {
    console.error("Unexpected error deleting schedule:", error);
    toast.error("An unexpected error occurred");
    return { error };
  }
};
