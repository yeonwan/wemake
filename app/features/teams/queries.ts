import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTeams = async (client: SupabaseClient<Database>, { limit }: { limit: number }) => {
  const { data, error } = await client
    .from("teams")
    .select(`
      team_id,
      roles, 
      description,
      team_leader:profiles(username, avatar)
      `)
    .limit(limit);
  if (error) throw new Error(error.message);
  return data;
};  

export const getTeamById = async (client: SupabaseClient<Database>, { teamId }: { teamId: number }) => {
  const { data, error } = await client
    .from("teams")
    .select(`
      *,
      team_leader:profiles!inner(name, avatar, role)
      `)
    .eq("team_id", teamId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};