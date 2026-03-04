import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/vocabulary/")({
  component: VocabularyPage,
});

const CATEGORIES = [
  { value: "greetings", label: "Salutations", icon: "👋" },
  { value: "family", label: "Famille", icon: "👨‍👩‍👧" },
  { value: "numbers", label: "Chiffres", icon: "🔢" },
  { value: "food", label: "Nourriture", icon: "🍞" },
  { value: "nature", label: "Nature", icon: "🌿" },
  { value: "verbs", label: "Verbes", icon: "⚡" },
  { value: "adjectives", label: "Adjectifs", icon: "✨" },
  { value: "phrases", label: "Phrases", icon: "💭" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

function VocabularyPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("greetings");
  const session = authClient.useSession();

  const items = useQuery(
    trpc.vocabulary.byCategory.queryOptions({ category: activeCategory }),
  );

  const addCard = useMutation(trpc.flashcards.addCard.mutationOptions());

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Vocabulaire</h1>
        <p className="text-muted-foreground">
          Parcours le vocabulaire par catégorie et ajoute des mots à tes flashcards
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {items.isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : items.data?.length === 0 ? (
        <div className="rounded-xl border bg-muted/20 p-8 text-center text-muted-foreground">
          Pas de mots dans cette catégorie pour l'instant.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.data?.map((item) => (
            <div key={item.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <span className="font-serif text-3xl">{item.sourethWord}</span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {item.latinTranscription}
                  </span>
                </div>
                {session.data?.user && (
                  <button
                    onClick={() => addCard.mutate({ vocabularyItemId: item.id })}
                    disabled={addCard.isPending}
                    title="Ajouter aux flashcards"
                    className="flex-shrink-0 rounded-md border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                  >
                    🃏 +
                  </button>
                )}
              </div>
              <p className="font-semibold">{item.frenchTranslation}</p>
              {item.exampleSentence && (
                <p className="mt-1 text-sm text-muted-foreground italic">{item.exampleSentence}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
