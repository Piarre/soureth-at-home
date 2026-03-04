import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/alphabet/")({
  component: AlphabetPage,
});

type Letter = {
  syriac: string;
  name: string;
  latinName: string;
  transcription: string;
  example: string;
  exampleTranslation: string;
};

const ALPHABET: Letter[] = [
  { syriac: "ܐ", name: "ܐܵܠܲܦ", latinName: "Alaph", transcription: "/ʔ/ ou /a/", example: "ܐܵܒ݂ܵܐ", exampleTranslation: "père" },
  { syriac: "ܒ", name: "ܒܹܝܬ݂", latinName: "Beth", transcription: "/b/ ou /v/", example: "ܒܲܝܬܵܐ", exampleTranslation: "maison" },
  { syriac: "ܓ", name: "ܓܵܡܲܠ", latinName: "Gamal", transcription: "/g/", example: "ܓܵܢܵܐ", exampleTranslation: "âme/soi" },
  { syriac: "ܕ", name: "ܕܵܠܲܬ݂", latinName: "Dalath", transcription: "/d/", example: "ܕܲܪܵܐ", exampleTranslation: "maison (génération)" },
  { syriac: "ܗ", name: "ܗܹܐ", latinName: "He", transcription: "/h/", example: "ܗܵܘ", exampleTranslation: "lui" },
  { syriac: "ܘ", name: "ܘܵܘ", latinName: "Waw", transcription: "/w/ ou /u/", example: "ܘܲܪܕܵܐ", exampleTranslation: "rose" },
  { syriac: "ܙ", name: "ܙܲܝܢ", latinName: "Zayn", transcription: "/z/", example: "ܙܲܒ݂ܢܵܐ", exampleTranslation: "temps" },
  { syriac: "ܚ", name: "ܚܹܝܬ݂", latinName: "Heth", transcription: "/ħ/", example: "ܚܲܕ", exampleTranslation: "un" },
  { syriac: "ܛ", name: "ܛܹܝܬ݂", latinName: "Teth", transcription: "/tˤ/", example: "ܛܵܒ݂ܵܐ", exampleTranslation: "bon" },
  { syriac: "ܝ", name: "ܝܘܼܕ݂", latinName: "Yodh", transcription: "/j/ ou /i/", example: "ܝܲܠܕܵܐ", exampleTranslation: "enfant" },
  { syriac: "ܟ", name: "ܟܵܦ", latinName: "Kaph", transcription: "/k/ ou /x/", example: "ܟܠܒܵܐ", exampleTranslation: "chien" },
  { syriac: "ܠ", name: "ܠܵܡܲܕ݂", latinName: "Lamadh", transcription: "/l/", example: "ܠܸܫܵܢܵܐ", exampleTranslation: "langue" },
  { syriac: "ܡ", name: "ܡܝܼܡ", latinName: "Mim", transcription: "/m/", example: "ܡܲܝܵܐ", exampleTranslation: "eau" },
  { syriac: "ܢ", name: "ܢܘܼܢ", latinName: "Nun", transcription: "/n/", example: "ܢܘܼܪܵܐ", exampleTranslation: "feu" },
  { syriac: "ܣ", name: "ܣܸܡܟܲܬ݂", latinName: "Semkath", transcription: "/s/", example: "ܣܲܗܪܵܐ", exampleTranslation: "lune" },
  { syriac: "ܥ", name: "ܥܲܝܢ", latinName: "Ayin", transcription: "/ʕ/", example: "ܥܲܝܢܵܐ", exampleTranslation: "œil" },
  { syriac: "ܦ", name: "ܦܹܐ", latinName: "Pe", transcription: "/p/ ou /f/", example: "ܦܲܓ݂ܪܵܐ", exampleTranslation: "corps" },
  { syriac: "ܨ", name: "ܨܵܕܹܐ", latinName: "Sadhe", transcription: "/sˤ/", example: "ܨܠܘܼܬ݂ܵܐ", exampleTranslation: "prière" },
  { syriac: "ܩ", name: "ܩܘܼܦ", latinName: "Qaph", transcription: "/q/", example: "ܩܵܠܵܐ", exampleTranslation: "voix" },
  { syriac: "ܪ", name: "ܪܹܝܫ", latinName: "Resh", transcription: "/r/", example: "ܪܹܫܵܐ", exampleTranslation: "tête" },
  { syriac: "ܫ", name: "ܫܝܼܢ", latinName: "Shin", transcription: "/ʃ/", example: "ܫܸܡܫܵܐ", exampleTranslation: "soleil" },
  { syriac: "ܬ", name: "ܬܵܘ", latinName: "Taw", transcription: "/t/ ou /θ/", example: "ܬܲܪܥܵܐ", exampleTranslation: "porte" },
];

function LetterCard({ letter, isSelected, onClick }: { letter: Letter; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-center transition-all hover:scale-105 hover:shadow-md ${
        isSelected
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="mb-1 font-serif text-5xl">{letter.syriac}</div>
      <div className="text-xs font-medium text-muted-foreground">{letter.latinName}</div>
    </button>
  );
}

function AlphabetPage() {
  const [selected, setSelected] = useState<Letter | null>(null);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Alphabet Syriaque</h1>
        <p className="text-muted-foreground">
          L'écriture syriaque se lit de droite à gauche. Clique sur une lettre pour l'explorer.
        </p>
      </div>

      {selected && (
        <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 text-center">
              <div className="mb-1 font-serif text-8xl">{selected.syriac}</div>
              <div className="font-serif text-xl text-muted-foreground">{selected.name}</div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom latin</span>
                <p className="text-lg font-semibold">{selected.latinName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Prononciation</span>
                <p className="font-mono text-lg">{selected.transcription}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Exemple</span>
                <p>
                  <span className="font-serif text-2xl">{selected.example}</span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    — {selected.exampleTranslation}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
        {ALPHABET.map((letter) => (
          <LetterCard
            key={letter.latinName}
            letter={letter}
            isSelected={selected?.latinName === letter.latinName}
            onClick={() => setSelected(selected?.latinName === letter.latinName ? null : letter)}
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong>Note :</strong> Le Soureth utilise l'écriture syriaque orientale (Madnhaya). Les
        lettres ܒ, ܓ, ܕ, ܟ, ܦ, ܬ ont deux prononciations selon leur position dans le mot.
      </div>
    </main>
  );
}
