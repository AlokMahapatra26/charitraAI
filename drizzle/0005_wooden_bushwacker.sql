ALTER TABLE "users" ADD COLUMN "is_subscribed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "message_count" integer DEFAULT 0 NOT NULL;