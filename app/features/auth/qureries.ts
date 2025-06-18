import type { SupabaseClient } from "@supabase/supabase-js";

export const checkUsernameExists = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { error } = await client
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();
  return error === null;
}