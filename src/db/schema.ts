import { pgTable , uuid , text , integer,  timestamp } from "drizzle-orm/pg-core";



export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"), 
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
