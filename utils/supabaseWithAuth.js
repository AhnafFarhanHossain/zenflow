import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseClient = (clerkToken = null) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: clerkToken ? { Authorization: `Bearer ${clerkToken}` } : {},
    },
  });

  return supabase;
};

// For use in client components with Clerk's useAuth hook
export const getSupabaseWithAuth = async (getToken) => {
  const token = await getToken({ template: "supabase" });
  return createSupabaseClient(token);
};
