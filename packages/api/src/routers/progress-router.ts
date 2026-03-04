import { eq, and, count } from "drizzle-orm";
import { z } from "zod";

import { db } from "@soureth-at-home/db";
import { userProgress, lessons } from "@soureth-at-home/db/schema";

import { protectedProcedure, router } from "../index";

export const progressRouter = router({
  myProgress: protectedProcedure.query(async ({ ctx }) => {
    return db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, ctx.session.user.id));
  }),

  markComplete: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        score: z.number().min(0).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, ctx.session.user.id),
            eq(userProgress.lessonId, input.lessonId),
          ),
        )
        .limit(1);

      if (existing[0]) {
        await db
          .update(userProgress)
          .set({
            score: Math.max(existing[0].score, input.score),
            attempts: existing[0].attempts + 1,
            completedAt: new Date(),
          })
          .where(eq(userProgress.id, existing[0].id));
      } else {
        await db.insert(userProgress).values({
          id: crypto.randomUUID(),
          userId: ctx.session.user.id,
          lessonId: input.lessonId,
          score: input.score,
          attempts: 1,
          completedAt: new Date(),
        });
      }

      return { success: true };
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    const [completedResult, totalResult] = await Promise.all([
      db
        .select({ count: count() })
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, ctx.session.user.id),
            // completedAt is not null means lesson was completed
          ),
        ),
      db.select({ count: count() }).from(lessons),
    ]);

    const completedCount = completedResult[0]?.count ?? 0;
    const totalCount = totalResult[0]?.count ?? 0;

    return {
      completedLessons: completedCount,
      totalLessons: totalCount,
      progressPercent: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    };
  }),
});
