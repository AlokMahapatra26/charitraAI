import { pgTable, uuid, varchar, integer, timestamp, boolean, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  chatsThisMonth: integer("chats_this_month").default(0).notNull(),
  charactersCreated: integer("characters_created").default(0).notNull(),
});

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  characterName: varchar("name", { length: 100 }).notNull(),
  characterDescription: varchar("description", { length: 8000 }),
  avatarUrl: varchar("avatar_url", { length: 2048 }),
  isPublic: boolean("public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const characterReactions = pgTable(
  "character_reactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    characterId: uuid("character_id")
      .notNull()
      .references(() => characters.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reaction: varchar("reaction", { length: 10, enum: ["like", "dislike"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    unq: unique("user_character_reaction_unique").on(t.characterId, t.userId),
  })
);