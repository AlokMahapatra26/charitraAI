ALTER TABLE "chat_logs" ADD COLUMN "user_message" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_logs" ADD COLUMN "ai_response" text NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_logs" DROP COLUMN "is_from_user";--> statement-breakpoint
ALTER TABLE "chat_logs" DROP COLUMN "message";