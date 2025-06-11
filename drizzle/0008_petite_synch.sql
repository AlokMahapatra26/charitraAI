CREATE TABLE "character_reactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"character_id" uuid NOT NULL,
	"is_like" boolean NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "character_reactions_user_id_character_id_unique" UNIQUE("user_id","character_id")
);
--> statement-breakpoint
ALTER TABLE "character_reactions" ADD CONSTRAINT "character_reactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_reactions" ADD CONSTRAINT "character_reactions_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;