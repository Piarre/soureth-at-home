import { protectedProcedure, publicProcedure, router } from "../index";
import { lessonsRouter } from "./lessons-router";
import { vocabularyRouter } from "./vocabulary-router";
import { progressRouter } from "./progress-router";
import { flashcardsRouter } from "./flashcards-router";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  lessons: lessonsRouter,
  vocabulary: vocabularyRouter,
  progress: progressRouter,
  flashcards: flashcardsRouter,
});

export type AppRouter = typeof appRouter;
