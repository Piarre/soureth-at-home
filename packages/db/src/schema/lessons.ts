import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { vocabularyItems } from "./vocabulary-items";
import { userProgress } from "./user-progress";

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  category: text("category", {
    enum: ["alphabet", "vocabulary", "grammar", "phrases"],
  }).notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
});

export const lessonsRelations = relations(lessons, ({ many }) => ({
  vocabularyItems: many(vocabularyItems),
  userProgress: many(userProgress),
}));
