import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const updateSchedule = async (getToken, scheduleId, updates) => {
  try {
    const supabase = await getSupabaseWithAuth(getToken);

    const { data, error } = await supabase
      .from("schedules")
      .update(updates)
      .eq("id", scheduleId)
      .select();

    if (error) {
      console.error("Error updating schedule:", error);
      return { error };
    }

    return { data: data[0] };
  } catch (error) {
    console.error("Unexpected error updating schedule:", error);
    return { error };
  }
};
