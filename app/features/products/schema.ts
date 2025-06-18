import { primaryKey, pgTable, bigint, text, pgEnum, jsonb, timestamp, uuid, integer, check} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  product_id: bigint("product_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  how_it_works: jsonb("how_it_works").notNull(),
  icon: text("icon").notNull(),
  url: text("url").notNull(),
  stats: jsonb("stats").notNull().default({
    views: 0,
    reviews: 0,
    upvotes: 0,
  }),
  profile_id: uuid("profile_id").references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  category_id: bigint("category_id", {mode: "number"}).references(() => categories.category_id, {onDelete: "cascade"}).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  category_id: bigint("category_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const product_upvotes = pgTable("product_upvotes", {
  product_id: bigint("product_id", {mode: "number"}).references(() => products.product_id, {onDelete: "cascade"}).notNull(),
  profile_id: uuid("profile_id").references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({columns: [t.product_id, t.profile_id]})
}));

export const product_reviews = pgTable("product_reviews", {
  review_id: bigint("review_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  product_id: bigint("product_id", {mode: "number"}).references(() => products.product_id, {onDelete: "cascade"}).notNull(),
  profile_id: uuid("profile_id").references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [check("rating_check", sql`rating >= 1 AND rating <= 5`)]);


