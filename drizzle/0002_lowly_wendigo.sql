ALTER TABLE "characters" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "description" SET DATA TYPE varchar(2000);--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "avatar_url" SET DATA TYPE varchar(2048);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "gender" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "likes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "public" boolean DEFAULT false NOT NULL;