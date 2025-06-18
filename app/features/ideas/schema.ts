import { pgTable, bigint, text, pgEnum, jsonb, timestamp, uuid, integer, primaryKey} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const gptIdeas = pgTable("gpt_ideas", {
  gpt_idea_id: bigint("gpt_idea_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  views: integer("views").notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  claimed_at: timestamp("claimed_at"),
  claimed_by: uuid("claimed_by").references(() => profiles.profile_id, {onDelete: "cascade"}),
})

export const gptIdeaLikes = pgTable("gpt_idea_likes", {
  gpt_idea_id: bigint("gpt_idea_id", {mode: "number"}).references(() => gptIdeas.gpt_idea_id, {onDelete: "cascade"}).notNull(),
  profile_id: uuid("profile_id").references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({columns: [t.gpt_idea_id, t.profile_id]})
}));