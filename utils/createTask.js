import { supabase } from "./supabase";

export async function createTask({ taskdata }) {
  try {
    // Validate required fields
    if (!taskdata.user_id) {
      return { error: { message: "User ID is required" } };
    }

    if (!taskdata.title?.trim()) {
      return { error: { message: "Task title is required" } };
    }

    if (!taskdata.priority) {
      return { error: { message: "Priority is required" } };
    }

    console.log("Inserting task data:", taskdata); // Debug log

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id: taskdata.user_id,
          title: taskdata.title.trim(),
          priority: taskdata.priority,
          due_date: taskdata.due_date,
          status: taskdata.status || "todo",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error creating task:", error);
      return { error };
    }

    console.log("Task created successfully:", data); // Debug log
    return { data };
  } catch (err) {
    console.error("Unexpected error creating task:", err);
    return { error: { message: "An unexpected error occurred" } };
  }
}