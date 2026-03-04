import { eq, asc } from "drizzle-orm";
import { z } from "zod";

import { db } from "@soureth-at-home/db";
import { lessons } from "@soureth-at-home/db/schema";

import { protectedProcedure, publicProcedure, router } from "../index";

export const lessonsRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(lessons).orderBy(asc(lessons.order));
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(lessons)
        .where(eq(lessons.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  byCategory: publicProcedure
    .input(
      z.object({
        category: z.enum(["alphabet", "vocabulary", "grammar", "phrases"]),
      }),
    )
    .query(async ({ input }) => {
      return db
        .select()
        .from(lessons)
        .where(eq(lessons.category, input.category))
        .orderBy(asc(lessons.order));
    }),
});
