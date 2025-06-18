CREATE TYPE "public"."event_type" AS ENUM('product_view', 'product_visit', 'profile_view', 'post_view', 'post_visit');--> statement-breakpoint
CREATE TABLE "event" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" "event_type",
	"event_data" jsonb,
	"created_at" timestamp DEFAULT now()
);
