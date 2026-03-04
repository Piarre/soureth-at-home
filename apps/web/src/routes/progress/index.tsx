import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/progress/")({
  component: ProgressPage,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      redirect({ to: "/login", throw: true });
    }
  },
});

function ProgressPage() {
  const stats = useQuery(trpc.progress.stats.queryOptions());
  const myProgress = useQuery(trpc.progress.myProgress.queryOptions());
  const lessons = useQuery(trpc.lessons.list.queryOptions());

  const completedIds = new Set(myProgress.data?.map((p) => p.lessonId) ?? []);

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ma progression</h1>
        <p className="text-muted-foreground">Suis ton avancement dans l'apprentissage du Soureth</p>
      </div>

      {stats.data && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-4xl font-bold text-green-500">{stats.data.completedLessons}</div>
            <div className="mt-1 text-sm text-muted-foreground">Leçons terminées</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-4xl font-bold">{stats.data.totalLessons}</div>
            <div className="mt-1 text-sm text-muted-foreground">Total des leçons</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-4xl font-bold text-primary">{stats.data.progressPercent}%</div>
            <div className="mt-1 text-sm text-muted-foreground">Progression globale</div>
          </div>
        </div>
      )}

      {stats.data && (
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>Progression</span>
            <span>{stats.data.progressPercent}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted">
            <div
              className="h-3 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${stats.data.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-4 text-xl font-semibold">Toutes les leçons</h2>
        {lessons.isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {lessons.data?.map((lesson) => {
              const isCompleted = completedIds.has(lesson.id);
              const progress = myProgress.data?.find((p) => p.lessonId === lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to="/lessons/$lessonId"
                  params={{ lessonId: lesson.id }}
                  className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/50"
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "✓" : lesson.order}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCompleted ? "text-green-600 dark:text-green-400" : ""}`}>
                      {lesson.title}
                    </p>
                    {progress && (
                      <p className="text-xs text-muted-foreground">
                        Score : {progress.score}/100 · {progress.attempts} tentative{progress.attempts > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  <span className="text-muted-foreground">→</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
