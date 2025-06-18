import { pgTable, bigint, text, pgEnum, timestamp, integer, check, uuid} from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const productStages = pgEnum("product_stages", PRODUCT_STAGES as [string, ...string[]]);

export const teams = pgTable("teams", {
  team_id: bigint({mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  product_name: text().notNull(),
  product_stage: productStages().notNull(),
  team_size: integer().notNull(),
  equity_split: integer().notNull(),
  roles: text().notNull(),
  description: text().notNull(),
  team_leader_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
}, (t) =>[
  check("equity_split", sql`${t.equity_split} >= 0 AND ${t.equity_split} <= 100`),
  check("team_size", sql`${t.team_size} >= 1 AND ${t.team_size} <= 100`),
  check("product_description_check", sql`LENGTH(${t.description}) > 0 AND LENGTH(${t.description}) <= 200`)]
);
