import { getSupabaseWithAuth } from "./supabaseWithAuth";

export const createSchedule = async ({ scheduleData }, getToken) => {
  try {
    // Validate required fields
    if (!scheduleData.title?.trim()) {
      return { error: { message: "Schedule title is required" } };
    }

    if (!scheduleData.user_id) {
      return { error: { message: "User ID is required" } };
    }

    console.log("Inserting Schedule Data:", scheduleData);

    const supabase = await getSupabaseWithAuth(getToken);
    const { data, error } = await supabase
      .from("schedules")
      .insert([
        {
          user_id: scheduleData.user_id,
          title: scheduleData.title.trim(),
          date: scheduleData.date,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error creating schedule:", error);
      return { error };
    }

    console.log("Schedule created successfully:", data); // Debug log
    return { data };
  } catch (err) {
    console.error("Unexpected error creating schedule:", err);
    return { error: { message: "An unexpected error occurred" } };
  }
};
