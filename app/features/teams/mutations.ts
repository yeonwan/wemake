import type { SupabaseClient } from "@supabase/supabase-js";
import type { z } from "zod";
import type { Database } from "~/supa-client";
import type { formSchema } from "./pages/submit-team-page";


export const createTeam = async (client: SupabaseClient<Database>,
  userId: string,
   data :z.infer<typeof formSchema>) => {
  const {data: teamData, error} = await client
  .from("teams")
  .insert(
    {
      product_name: data.productName,
      product_stage: data.productStage as "Idea" | "MVP" | "Beta" | "Launched" | "Scaling",
      team_size: data.teamSize,
      equity_split: data.equity,
      team_leader_id: userId,
      roles: data.roles ,
      description: data.productDescription,
    }
  )
  .select("team_id").single();
  if (error) {
    throw error;
  }
  return teamData.team_id;
}