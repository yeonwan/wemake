import { pgTable, bigint, text, pgEnum, jsonb, timestamp, uuid, primaryKey, type AnyPgColumn} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const topics = pgTable("topics", {
  topic_id: bigint({mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  post_id: bigint({mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  title: text().notNull(),
  content: text().notNull(),
  upvotes: bigint({mode: "number"}).default(0),
  topic_id: bigint({mode: "number"}).references(() => topics.topic_id, {onDelete: "cascade"}).notNull(),
  profile_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const postUpvotes = pgTable("post_upvotes", {
  post_id: bigint({mode: "number"}).references(() => posts.post_id, {onDelete: "cascade"}).notNull(),
  profile_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  created_at: timestamp().notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({columns: [t.post_id, t.profile_id]})
}));

export const postReplies = pgTable("post_replies", {
  reply_id: bigint({mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  post_id: bigint({mode: "number"}).references(() => posts.post_id, {onDelete: "cascade"}),
  profile_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  reply: text().notNull(),
  parent_id: bigint({mode: "number"}).references(():AnyPgColumn => postReplies.reply_id, {onDelete: "cascade"}),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

