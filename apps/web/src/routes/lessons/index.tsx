import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/lessons/")({
  component: LessonsPage,
});

const CATEGORY_LABELS: Record<string, string> = {
  alphabet: "Alphabet",
  vocabulary: "Vocabulaire",
  grammar: "Grammaire",
  phrases: "Phrases",
};

const CATEGORY_ICONS: Record<string, string> = {
  alphabet: "ܐ",
  vocabulary: "💬",
  grammar: "📝",
  phrases: "🗣️",
};

function LessonsPage() {
  const lessons = useQuery(trpc.lessons.list.queryOptions());

  const grouped = lessons.data?.reduce(
    (acc, lesson) => {
      if (!acc[lesson.category]) acc[lesson.category] = [];
      acc[lesson.category].push(lesson);
      return acc;
    },
    {} as Record<string, typeof lessons.data>,
  );

  if (lessons.isLoading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </main>
    );
  }

  if (!lessons.data || lessons.data.length === 0) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Leçons</h1>
        <div className="rounded-xl border bg-muted/20 p-8 text-center text-muted-foreground">
          Les leçons arrivent bientôt ! Lance le seed pour charger le contenu.
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Leçons</h1>
        <p className="text-muted-foreground">
          Progresse étape par étape dans l'apprentissage du Soureth
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped ?? {}).map(([category, categoryLessons]) => (
          <section key={category}>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
              <h2 className="text-xl font-semibold">{CATEGORY_LABELS[category] ?? category}</h2>
            </div>
            <div className="grid gap-3">
              {categoryLessons?.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to="/lessons/$lessonId"
                  params={{ lessonId: lesson.id }}
                  className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
                    {lesson.order}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  </div>
                  <span className="text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
