import { eq, asc } from "drizzle-orm";
import { z } from "zod";

import { db } from "@soureth-at-home/db";
import { vocabularyItems } from "@soureth-at-home/db/schema";

import { publicProcedure, router } from "../index";

export const vocabularyRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(vocabularyItems).orderBy(asc(vocabularyItems.category));
  }),

  byCategory: publicProcedure
    .input(
      z.object({
        category: z.enum([
          "greetings",
          "family",
          "numbers",
          "food",
          "nature",
          "verbs",
          "adjectives",
          "phrases",
        ]),
      }),
    )
    .query(async ({ input }) => {
      return db
        .select()
        .from(vocabularyItems)
        .where(eq(vocabularyItems.category, input.category));
    }),

  byLesson: publicProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input }) => {
      return db
        .select()
        .from(vocabularyItems)
        .where(eq(vocabularyItems.lessonId, input.lessonId));
    }),
});
