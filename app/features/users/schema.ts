import { pgTable, pgSchema, uuid, text, pgEnum, jsonb, timestamp, bigint, primaryKey, boolean} from "drizzle-orm/pg-core";
import { products } from "../products/schema";
import { posts } from "../community/schema";


const users = pgSchema("auth").table("users", {
  id: uuid("id").primaryKey()
})

export const roles = pgEnum("role", ["Developer", "Designer", "Marketer", "Founder", "Product Manager", "Other"]);

export const profiles = pgTable("profiles", {
  profile_id: uuid().primaryKey().references(() => users.id, {onDelete: "cascade"}),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().default("Developer").notNull(),
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable("follows", {
  follower_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}),
  following_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}),
  created_at: timestamp().notNull().defaultNow(),
});

export const notificationTypes = pgEnum("notification_type",
   ["follow", "review", "reply", "mention"]);

export const notifications = pgTable("notifications", {
  notification_id: bigint("notification_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  source_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}),
  product_id: bigint("product_id", {mode: "number"}).references(() => products.product_id, {onDelete: "cascade"}),
  post_id: bigint("post_id", {mode: "number"}).references(() => posts.post_id, {onDelete: "cascade"}),
  target_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}).notNull(),
  type: notificationTypes().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRooms = pgTable("message_rooms", {
  message_room_id: bigint("message_room_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable("message_room_members", {
  message_room_id: bigint("message_room_id", {mode: "number"}).references(() => messageRooms.message_room_id, {onDelete: "cascade"}),
  profile_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}),
  created_at: timestamp().notNull().defaultNow(),
}, (t) => [
  primaryKey({columns: [t.message_room_id, t.profile_id]})
]);

export const messages = pgTable("messages", {
  message_id: bigint("message_id", {mode: "number"}).primaryKey().generatedByDefaultAsIdentity(),
  message_room_id: bigint("message_room_id", {mode: "number"}).references(() => messageRooms.message_room_id, {onDelete: "cascade"}),
  sender_id: uuid().references(() => profiles.profile_id, {onDelete: "cascade"}),
  content: text().notNull(),
  seen: boolean().notNull().default(false), // only works for two people in the room
  created_at: timestamp().notNull().defaultNow(),
});