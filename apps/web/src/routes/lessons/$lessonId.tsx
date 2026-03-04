import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonDetailPage,
});

function LessonDetailPage() {
  const { lessonId } = Route.useParams();
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const lesson = useQuery(trpc.lessons.byId.queryOptions({ id: lessonId }));
  const vocabulary = useQuery(trpc.vocabulary.byLesson.queryOptions({ lessonId }));

  const markComplete = useMutation({
    ...trpc.progress.markComplete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.progress.myProgress.queryKey() });
      queryClient.invalidateQueries({ queryKey: trpc.progress.stats.queryKey() });
    },
  });

  if (lesson.isLoading) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (!lesson.data) return notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link to="/lessons" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          ← Toutes les leçons
        </Link>
        <h1 className="mb-2 text-3xl font-bold">{lesson.data.title}</h1>
        <p className="text-muted-foreground">{lesson.data.description}</p>
      </div>

      <div className="mb-8 rounded-xl border bg-card p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
            {lesson.data.content}
          </pre>
        </div>
      </div>

      {vocabulary.data && vocabulary.data.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Vocabulaire de la leçon</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {vocabulary.data.map((item) => (
              <div key={item.id} className="rounded-lg border bg-card p-4">
                <div className="mb-1 flex items-baseline gap-3">
                  <span className="font-serif text-2xl">{item.sourethWord}</span>
                  <span className="text-sm text-muted-foreground">{item.latinTranscription}</span>
                </div>
                <p className="font-medium">{item.frenchTranslation}</p>
                {item.exampleSentence && (
                  <p className="mt-1 text-sm text-muted-foreground italic">{item.exampleSentence}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {session.data?.user && (
        <div className="flex justify-end">
          <button
            onClick={() =>
              markComplete.mutate({ lessonId: lesson.data!.id, score: 100 })
            }
            disabled={markComplete.isPending}
            className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {markComplete.isPending ? "Enregistrement..." : "Marquer comme terminé ✓"}
          </button>
        </div>
      )}
    </main>
  );
}
