import { eq, and, lte, asc } from "drizzle-orm";
import { z } from "zod";

import { db } from "@soureth-at-home/db";
import { flashcardReviews, vocabularyItems } from "@soureth-at-home/db/schema";

import { protectedProcedure, router } from "../index";

// Algorithme SM-2 simplifié
function calculateNextReview(
  rating: number,
  easeFactor: number,
  interval: number,
  repetitions: number,
) {
  if (rating < 3) {
    return { interval: 1, repetitions: 0, easeFactor };
  }

  const newEaseFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02),
  );

  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * newEaseFactor);
  }

  return {
    interval: newInterval,
    repetitions: repetitions + 1,
    easeFactor: newEaseFactor,
  };
}

export const flashcardsRouter = router({
  dueCards: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const dueReviews = await db
      .select({
        review: flashcardReviews,
        item: vocabularyItems,
      })
      .from(flashcardReviews)
      .innerJoin(vocabularyItems, eq(flashcardReviews.vocabularyItemId, vocabularyItems.id))
      .where(
        and(
          eq(flashcardReviews.userId, ctx.session.user.id),
          lte(flashcardReviews.nextReviewAt, now),
        ),
      )
      .orderBy(asc(flashcardReviews.nextReviewAt))
      .limit(20);

    return dueReviews;
  }),

  submitRating: protectedProcedure
    .input(
      z.object({
        vocabularyItemId: z.string(),
        rating: z.number().min(0).max(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .select()
        .from(flashcardReviews)
        .where(
          and(
            eq(flashcardReviews.userId, ctx.session.user.id),
            eq(flashcardReviews.vocabularyItemId, input.vocabularyItemId),
          ),
        )
        .limit(1);

      const current = existing[0];
      const { interval, repetitions, easeFactor } = calculateNextReview(
        input.rating,
        current?.easeFactor ?? 2.5,
        current?.interval ?? 1,
        current?.repetitions ?? 0,
      );

      const nextReviewAt = new Date();
      nextReviewAt.setDate(nextReviewAt.getDate() + interval);

      if (current) {
        await db
          .update(flashcardReviews)
          .set({ easeFactor, interval, repetitions, nextReviewAt, lastRating: input.rating })
          .where(eq(flashcardReviews.id, current.id));
      } else {
        await db.insert(flashcardReviews).values({
          id: crypto.randomUUID(),
          userId: ctx.session.user.id,
          vocabularyItemId: input.vocabularyItemId,
          easeFactor,
          interval,
          repetitions,
          nextReviewAt,
          lastRating: input.rating,
        });
      }

      return { nextReviewAt, interval };
    }),

  addCard: protectedProcedure
    .input(z.object({ vocabularyItemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .select()
        .from(flashcardReviews)
        .where(
          and(
            eq(flashcardReviews.userId, ctx.session.user.id),
            eq(flashcardReviews.vocabularyItemId, input.vocabularyItemId),
          ),
        )
        .limit(1);

      if (existing[0]) return { alreadyAdded: true };

      await db.insert(flashcardReviews).values({
        id: crypto.randomUUID(),
        userId: ctx.session.user.id,
        vocabularyItemId: input.vocabularyItemId,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewAt: new Date(),
      });

      return { alreadyAdded: false };
    }),
});
