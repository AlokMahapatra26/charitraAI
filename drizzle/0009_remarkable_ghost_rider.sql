ALTER TABLE "character_reactions" DROP CONSTRAINT "character_reactions_user_id_character_id_unique";--> statement-breakpoint
ALTER TABLE "character_reactions" DROP CONSTRAINT "character_reactions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "character_reactions" DROP CONSTRAINT "character_reactions_character_id_characters_id_fk";
--> statement-breakpoint
ALTER TABLE "characters" DROP CONSTRAINT "characters_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "character_reactions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_premium" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "chats_this_month" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "characters_created" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "character_reactions" ADD COLUMN "reaction" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "character_reactions" ADD CONSTRAINT "character_reactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_reactions" ADD CONSTRAINT "character_reactions_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_reactions" DROP COLUMN "is_like";--> statement-breakpoint
ALTER TABLE "character_reactions" ADD CONSTRAINT "user_character_reaction_unique" UNIQUE("character_id","user_id");