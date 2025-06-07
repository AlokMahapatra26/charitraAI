import { pgTable, uuid, varchar, integer, timestamp, boolean  } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isPremium: boolean("is_premium").default(false),
  chatsThisMonth: integer("chats_this_month").default(0),
  charactersCreated: integer("characters_created").default(0),
});

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  characterName: varchar("name", { length: 100 }).notNull(),
  characterDescription: varchar("description", { length: 8000 }),
  avatarUrl: varchar("avatar_url", { length: 2048 }),
  isPublic: boolean("public").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
 