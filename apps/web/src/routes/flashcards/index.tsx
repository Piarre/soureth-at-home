import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/flashcards/")({
  component: FlashcardsPage,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      redirect({ to: "/login", throw: true });
    }
  },
});

const RATINGS = [
  { value: 1, label: "Raté", color: "bg-red-600 hover:bg-red-700" },
  { value: 3, label: "Difficile", color: "bg-orange-500 hover:bg-orange-600" },
  { value: 4, label: "Bien", color: "bg-blue-600 hover:bg-blue-700" },
  { value: 5, label: "Parfait", color: "bg-green-600 hover:bg-green-700" },
] as const;

function FlashcardsPage() {
  const queryClient = useQueryClient();
  const [revealed, setRevealed] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const dueCards = useQuery(trpc.flashcards.dueCards.queryOptions());

  const submitRating = useMutation({
    ...trpc.flashcards.submitRating.mutationOptions(),
    onSuccess: () => {
      setRevealed(false);
      setCardIndex((i) => i + 1);
      queryClient.invalidateQueries({ queryKey: trpc.flashcards.dueCards.queryKey() });
    },
  });

  const cards = dueCards.data ?? [];
  const current = cards[cardIndex % Math.max(cards.length, 1)];
  const done = cardIndex >= cards.length;

  if (dueCards.isLoading) {
    return (
      <main className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16">
        <div className="h-64 w-full animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  if (cards.length === 0) {
    return (
      <main className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="mb-3 text-2xl font-bold">Tout est à jour !</h1>
        <p className="mb-6 text-muted-foreground">
          Toutes tes cartes ont été révisées. Reviens plus tard ou ajoute de nouveaux mots depuis le
          vocabulaire.
        </p>
        <Link
          to="/vocabulary"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ajouter des mots
        </Link>
      </main>
    );
  }

  if (done) {
    return (
      <main className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="mb-3 text-2xl font-bold">Session terminée !</h1>
        <p className="mb-6 text-muted-foreground">
          Tu as révisé {cards.length} carte{cards.length > 1 ? "s" : ""} aujourd'hui. Bravo !
        </p>
        <button
          onClick={() => {
            setCardIndex(0);
            queryClient.invalidateQueries({ queryKey: trpc.flashcards.dueCards.queryKey() });
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Recommencer
        </button>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex max-w-lg flex-col items-center px-4 py-8">
      <div className="mb-6 w-full flex items-center justify-between text-sm text-muted-foreground">
        <span>Flashcards</span>
        <span>
          {cardIndex + 1} / {cards.length}
        </span>
      </div>

      <div className="mb-6 w-full">
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-1.5 rounded-full bg-primary transition-all"
            style={{ width: `${(cardIndex / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <div
        className="mb-8 flex w-full min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md"
        onClick={() => setRevealed(true)}
      >
        <div className="mb-4 font-serif text-7xl">{current?.item.sourethWord}</div>
        <div className="text-lg text-muted-foreground">{current?.item.latinTranscription}</div>

        {!revealed && (
          <div className="mt-6 text-sm text-muted-foreground">
            Clique pour révéler la traduction
          </div>
        )}

        {revealed && (
          <div className="mt-6">
            <p className="text-2xl font-semibold">{current?.item.frenchTranslation}</p>
            {current?.item.exampleSentence && (
              <p className="mt-2 text-sm text-muted-foreground italic">
                {current.item.exampleSentence}
              </p>
            )}
          </div>
        )}
      </div>

      {revealed && current && (
        <div className="grid w-full grid-cols-4 gap-2">
          {RATINGS.map((rating) => (
            <button
              key={rating.value}
              onClick={() =>
                submitRating.mutate({
                  vocabularyItemId: current.item.id,
                  rating: rating.value,
                })
              }
              disabled={submitRating.isPending}
              className={`rounded-lg py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 ${rating.color}`}
            >
              {rating.label}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
