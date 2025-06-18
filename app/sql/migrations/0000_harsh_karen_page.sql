CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'remote');--> statement-breakpoint
CREATE TYPE "public"."location_type" AS ENUM('on-site', 'remote', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."salary_range" AS ENUM('$0-50,000', '$50,000-100,000', '$100,000-150,000', '$150,000-200,000', '$200,000-250,000', '$250,000+');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('Developer', 'Designer', 'Marketer', 'Founder', 'Product Manager', 'Other');--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" bigint PRIMARY KEY NOT NULL,
	"position" text NOT NULL,
	"overview" text NOT NULL,
	"qualifications" text NOT NULL,
	"responsibilities" text NOT NULL,
	"benefits" text NOT NULL,
	"skills" text NOT NULL,
	"company_name" text NOT NULL,
	"company_logo_url" text NOT NULL,
	"company_location" text NOT NULL,
	"apply_url" text NOT NULL,
	"job_type" "job_type" NOT NULL,
	"location_type" "location_type" NOT NULL,
	"salary_range" "salary_range" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"avatar" text,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"headline" text,
	"bio" text,
	"role" "role" DEFAULT 'Developer' NOT NULL,
	"stats" jsonb,
	"views" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profiles_profile_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profiles_profile_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;