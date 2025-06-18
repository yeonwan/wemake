import { DateTime } from "luxon";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const getTopics = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async (client: SupabaseClient<Database>,
  { limit,
    sorting = "newest",
    period = "all-time",
    keyword,
    topic
  }:
    {
      limit: number,
      sorting?: "newest" | "popular",
      period?: "all-time" | "today" | "week" | "month" | "year",
      keyword?: string,
      topic?: string
    }) => {
  const baseQuery = client
    .from("community_post_list_view")
    .select("*")
    .limit(limit);

  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else {
    const today = DateTime.now();
    if (period === "today") {
      baseQuery.gte("created_at", today.startOf("day").toISO());
    } else if (period === "week") {
      baseQuery.gte("created_at", today.startOf("week").toISO());
    } else if (period === "month") {
      baseQuery.gte("created_at", today.startOf("month").toISO());
    } else if (period === "year") {
      baseQuery.gte("created_at", today.startOf("year").toISO());
    }
    baseQuery.order("upvotes", { ascending: false })
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (client: SupabaseClient<Database>, { postId }: { postId: number }) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getReplies = async (client: SupabaseClient<Database>, { postId }: { postId: number }) => {
  const replyQuery = `
    reply_id,
    reply,
    created_at,
    user: profiles(
      username,
      name,
      avatar
    )
  `;

  const { data, error } = await client
    .from("post_replies")
    .select(`
      ${replyQuery},
      post_replies(
        ${replyQuery}
      )
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

