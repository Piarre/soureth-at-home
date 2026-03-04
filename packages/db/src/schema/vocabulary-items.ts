import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { lessons } from "./lessons";
import { flashcardReviews } from "./flashcard-reviews";

export const vocabularyItems = sqliteTable("vocabulary_items", {
  id: text("id").primaryKey(),
  sourethWord: text("soureth_word").notNull(),
  latinTranscription: text("latin_transcription").notNull(),
  frenchTranslation: text("french_translation").notNull(),
  exampleSentence: text("example_sentence"),
  category: text("category", {
    enum: ["greetings", "family", "numbers", "food", "nature", "verbs", "adjectives", "phrases"],
  }).notNull(),
  lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
});

export const vocabularyItemsRelations = relations(vocabularyItems, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [vocabularyItems.lessonId],
    references: [lessons.id],
  }),
  flashcardReviews: many(flashcardReviews),
}));
