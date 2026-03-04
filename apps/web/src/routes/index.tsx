import { Link, createFileRoute } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const features = [
  {
    to: "/alphabet",
    icon: "ܐ",
    title: "Alphabet",
    description: "Apprends les 22 lettres de l'alphabet syriaque",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  },
  {
    to: "/lessons",
    icon: "📖",
    title: "Leçons",
    description: "Cours structurés du débutant à l'avancé",
    color: "from-green-500/20 to-green-600/10 border-green-500/30",
  },
  {
    to: "/vocabulary",
    icon: "💬",
    title: "Vocabulaire",
    description: "Mots et phrases essentiels du quotidien",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  },
  {
    to: "/flashcards",
    icon: "🃏",
    title: "Flashcards",
    description: "Révision espacée pour mémoriser durablement",
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  },
] as const;

function HomeComponent() {
  const session = authClient.useSession();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-5xl font-bold tracking-tight">
          <span className="font-serif text-6xl">ܫܠܡܐ</span>
        </h1>
        <p className="mb-1 text-2xl font-semibold">Apprends le Soureth</p>
        <p className="text-muted-foreground">
          L'araméen moderne — la langue de tes ancêtres
        </p>
      </div>

      {session.data?.user && (
        <div className="mb-6 rounded-lg border bg-muted/30 px-4 py-3 text-center text-sm">
          Bienvenue,{" "}
          <span className="font-semibold">{session.data.user.name}</span> ! Continue
          ton apprentissage.{" "}
          <Link to="/progress" className="text-primary underline underline-offset-2">
            Voir ma progression →
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.to}
            to={feature.to}
            className={`group rounded-xl border bg-gradient-to-br p-6 transition-all hover:scale-[1.02] hover:shadow-lg ${feature.color}`}
          >
            <div className="mb-3 text-4xl">{feature.icon}</div>
            <h2 className="mb-1 text-xl font-semibold">{feature.title}</h2>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Link>
        ))}
      </div>

      {!session.data?.user && (
        <div className="mt-8 rounded-xl border bg-muted/20 p-6 text-center">
          <p className="mb-3 text-muted-foreground">
            Crée un compte pour sauvegarder ta progression et utiliser les flashcards
          </p>
          <Link
            to="/login"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Commencer gratuitement
          </Link>
        </div>
      )}
    </main>
  );
}
