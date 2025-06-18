import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const createPost = async (client: SupabaseClient<Database>,
  {
    title, category, content, userId
  }:
    {
      title: string, category: string, content: string, userId: string
    }) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();
  if (categoryError) {
    throw categoryError;
  }
  const { data, error } = await client.from("posts")
    .insert({
      title,
      content,
      topic_id: categoryData.topic_id,
      profile_id: userId,
    }).select().single();
  if (error) {
    throw error;
  }
  return data;
}

export const createReply = async (client: SupabaseClient<Database>,
  {
    reply, userId, postId, parentReplyId
  }:
    {
      reply: string, userId: string, postId: string, parentReplyId?: number
    }) => {
  const { error } = await client.from("post_replies")
    .insert({
      reply,
      profile_id: userId,
      ...(parentReplyId ? { parent_id: parentReplyId } : {post_id: Number(postId)})
    });
  if (error) {
    throw error;
  }
}