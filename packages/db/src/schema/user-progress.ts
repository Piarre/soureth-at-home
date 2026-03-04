import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { lessons } from "./lessons";

export const userProgress = sqliteTable(
  "user_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }),
    score: integer("score").default(0).notNull(),
    attempts: integer("attempts").default(0).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [unique("user_lesson_unique").on(table.userId, table.lessonId)],
);

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(user, {
    fields: [userProgress.userId],
    references: [user.id],
  }),
  lesson: one(lessons, {
    fields: [userProgress.lessonId],
    references: [lessons.id],
  }),
}));
