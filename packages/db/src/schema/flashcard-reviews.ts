import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { vocabularyItems } from "./vocabulary-items";

export const flashcardReviews = sqliteTable("flashcard_reviews", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  vocabularyItemId: text("vocabulary_item_id")
    .notNull()
    .references(() => vocabularyItems.id, { onDelete: "cascade" }),
  easeFactor: real("ease_factor").default(2.5).notNull(),
  interval: integer("interval").default(1).notNull(),
  repetitions: integer("repetitions").default(0).notNull(),
  nextReviewAt: integer("next_review_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  lastRating: integer("last_rating"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const flashcardReviewsRelations = relations(flashcardReviews, ({ one }) => ({
  user: one(user, {
    fields: [flashcardReviews.userId],
    references: [user.id],
  }),
  vocabularyItem: one(vocabularyItems, {
    fields: [flashcardReviews.vocabularyItemId],
    references: [vocabularyItems.id],
  }),
}));
