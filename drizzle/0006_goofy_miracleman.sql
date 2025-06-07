ALTER TABLE "users" ADD COLUMN "chats_this_month" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "characters_created" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "is_subscribed";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "message_count";