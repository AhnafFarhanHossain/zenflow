import { supabase } from "./supabase";

export async function createTask({ taskdata }) {
  const { data, error } = await supabase.from("tasks").insert([taskdata]);

  if (error) {
    console.error("Error creating task:", error);
    return { error };
  }
  return { data };
}
