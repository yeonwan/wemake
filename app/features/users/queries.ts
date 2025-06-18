import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";
import type { Database } from "~/supa-client";

const productSelect = `
  product_id,
  name,
  tagline,
  upvotes: stats->>upvotes,
  views: stats->>views,
  reviews: stats->>reviews
`;

export const getUserProfile = async (client: SupabaseClient<Database>, { username }: { username: string }) => {
  const { data, error } = await client
    .from("profiles")
    .select(`
      profile_id,
      avatar,
      name,
      username,
      headline,
      role,
      bio
    `)
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
}

export const getUserById = async (client: SupabaseClient<Database>, { profileId }: { profileId: string }) => {
  const { data, error } = await client
    .from("profiles")
    .select(`
      profile_id,
      avatar,
      name,
      username
    `)
    .eq("profile_id", profileId)
    .single();

  if (error) throw error;
  return data;
}

export const getUserProducts = async(client: SupabaseClient<Database>, { username }: { username: string }) => { 
  const { data, error } = await client
    .from("products")
    .select(`
      ${productSelect},
      profiles!products_profile_id_profiles_profile_id_fk(profile_id)
    `)
    .eq("profiles.username", username)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export const getUserPosts = async(client: SupabaseClient<Database>, { username }: { username: string }) => {
  const { data, error } = await client
  .from("community_post_list_view")
  .select("*")
  .eq("author_username", username)
  .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export const getLoggedInUserId =  async (client: SupabaseClient<Database>) => {
  const { data: { user }, error } = await client.auth.getUser();
  if (error || user === null ){
    throw redirect("/auth/login");
  } 
  return user.id;
}

