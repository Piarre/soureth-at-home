import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("local.db");
const db = drizzle(sqlite, { schema });

const LESSONS = [
  {
    id: "lesson-1",
    title: "Les salutations",
    description: "Apprenez à dire bonjour, au revoir et à vous présenter",
    order: 1,
    category: "phrases" as const,
    content: `Bienvenue dans votre première leçon de Soureth !

Le Soureth est la forme moderne de l'araméen, parlée par les communautés assyriennes et chaldéennes.

Les salutations essentielles :

ܫܠܵܡܵܐ (shlama) — Paix / Bonjour (salutation traditionnelle)
ܒܵܪܟ݂ ܐܲܠܵܗܵܐ (barkh alaha) — Que Dieu te bénisse (réponse à shlama)
ܕܲܪܡܘܼܢ ܒܫܠܵܡܵܐ (darmun b'shlama) — Allez en paix (au revoir)

Pour demander "Comment vas-tu ?" :
ܟܸܦ ܝܘܲܬ? (kef ywat?) — Comment vas-tu ? (à un homme)
ܟܸܦ ܝܘܲܬ‌ܝ? (kef ywati?) — Comment vas-tu ? (à une femme)

Réponses possibles :
ܛܵܒ݂ ܝܘܸܢ (taw ywen) — Je vais bien
ܣܒ݂ܵܪܵܐ ܛܵܒ݂ܵܐ (savara tawa) — Bonne nouvelle / Bien

Note : Le Soureth se lit de droite à gauche, comme l'hébreu et l'arabe.`,
  },
  {
    id: "lesson-2",
    title: "La famille",
    description: "Le vocabulaire de la famille en Soureth",
    order: 2,
    category: "vocabulary" as const,
    content: `La famille est au cœur de la culture assyrienne. Voici les membres essentiels :

Les parents proches :
ܐܵܒ݂ܵܐ (awa) — père
ܐܸܡܵܐ (ima) — mère
ܐܵܚܵܐ (akha) — frère
ܚܵܬ݂ܵܐ (khata) — sœur
ܒܪܵܐ (bra) — fils
ܒܪܵܬ݂ܵܐ (brata) — fille

Les grands-parents :
ܣܸܕ݂ܵܐ (sida) — grand-père (paternel)
ܒܵܒ݂ ܣܸܕ݂ܵܐ (baw sida) — grand-mère (paternelle)
ܚܵܠܵܐ (khala) — grand-père (maternel)
ܗܵܠ (hal) — grand-mère (maternelle)

Les oncles et tantes :
ܥܲܡܵܐ (ama) — oncle paternel
ܥܲܡܬ݂ܵܐ (amta) — tante paternelle
ܕܵܕ݂ܵܐ (dada) — oncle maternel

Exemple de phrase :
ܐܵܒ݂ܝ ܫܡܹܗ ܝܵܘܣܸܦ — Mon père s'appelle Joseph`,
  },
  {
    id: "lesson-3",
    title: "Les chiffres de 1 à 10",
    description: "Comptez en Soureth",
    order: 3,
    category: "vocabulary" as const,
    content: `Les chiffres sont fondamentaux dans toute langue. Voici les chiffres de 1 à 10 en Soureth :

1 — ܚܲܕ (khad) — un
2 — ܬܪܹܝ (trey) — deux
3 — ܬܠܵܬ݂ (tlat) — trois
4 — ܐܲܪܒܲܥ (arba) — quatre
5 — ܚܲܡܫܵܐ (khamsha) — cinq
6 — ܫܬܵܐ (shta) — six
7 — ܫܒ݂ܲܥ (shwa) — sept
8 — ܬܡܵܢܝܵܐ (tmanya) — huit
9 — ܬܫܲܥ (tsha) — neuf
10 — ܥܣܵܪ (sar) — dix

Pour compter :
ܚܲܕ، ܬܪܹܝ، ܬܠܵܬ݂، ܐܲܪܒܲܥ، ܚܲܡܫܵܐ...
(khad, trey, tlat, arba, khamsha...)

Astuce : Les chiffres araméens ont souvent des racines similaires aux chiffres hébreux et arabes, car ces langues sémitiques partagent une origine commune.`,
  },
  {
    id: "lesson-4",
    title: "L'alphabet syriaque — Partie 1",
    description: "Découvrez les 11 premières lettres de l'alphabet",
    order: 4,
    category: "alphabet" as const,
    content: `L'alphabet syriaque comporte 22 lettres consonantiques.
Il s'écrit de droite à gauche.

Les 11 premières lettres :

ܐ Alaph — /ʔ/ ou /a/ — comme le "coup de glotte" en anglais "uh-oh"
ܒ Beth — /b/ ou /v/ — comme "b" ou "v"
ܓ Gamal — /g/ — comme "g" dans "gare"
ܕ Dalath — /d/ — comme "d" dans "dire"
ܗ He — /h/ — comme "h" dans "hotel"
ܘ Waw — /w/ ou /u/ — comme "w" dans "wagon"
ܙ Zayn — /z/ — comme "z" dans "zèbre"
ܚ Heth — /ħ/ — son guttural (du fond de la gorge)
ܛ Teth — /tˤ/ — "t" emphatiqueܝ Yodh — /j/ ou /i/ — comme "y" dans "yoga"
ܟ Kaph — /k/ ou /x/ — comme "k" ou "kh" (jota espagnole)

Conseil : Commence par mémoriser la forme des lettres, puis leur son.
Utilise la page Alphabet pour voir chaque lettre en détail !`,
  },
  {
    id: "lesson-5",
    title: "L'alphabet syriaque — Partie 2",
    description: "Les 11 dernières lettres de l'alphabet",
    order: 5,
    category: "alphabet" as const,
    content: `Suite de l'alphabet syriaque :

ܠ Lamadh — /l/ — comme "l" dans "lune"
ܡ Mim — /m/ — comme "m" dans "mer"
ܢ Nun — /n/ — comme "n" dans "nuit"
ܣ Semkath — /s/ — comme "s" dans "soleil"
ܥ Ayin — /ʕ/ — son pharyngal (très guttural)
ܦ Pe — /p/ ou /f/ — comme "p" ou "f"
ܨ Sadhe — /sˤ/ — "s" emphatique
ܩ Qaph — /q/ — "k" uvulaire (du fond de la gorge)
ܪ Resh — /r/ — comme "r" roulé
ܫ Shin — /ʃ/ — comme "ch" dans "chat"
ܬ Taw — /t/ ou /θ/ — comme "t" ou "th" anglais

Les lettres BGDKPT (ܒ ܓ ܕ ܟ ܦ ܬ) ont deux prononciations :
- En début de syllabe ou après consonne : prononciation "dure" (b, g, d, k, p, t)
- Après voyelle : prononciation "douce" (v, gh, dh, kh, f, th)

Félicitations ! Vous connaissez maintenant les 22 lettres de l'alphabet syriaque.`,
  },
];

const VOCABULARY = [
  // Salutations
  {
    id: "v-shlama",
    sourethWord: "ܫܠܵܡܵܐ",
    latinTranscription: "shlama",
    frenchTranslation: "paix / bonjour",
    exampleSentence: "ܫܠܵܡܵܐ، ܟܸܦ ܝܘܲܬ? — Bonjour, comment vas-tu ?",
    category: "greetings" as const,
    lessonId: "lesson-1",
  },
  {
    id: "v-taw-ywen",
    sourethWord: "ܛܵܒ݂ ܝܘܸܢ",
    latinTranscription: "taw ywen",
    frenchTranslation: "je vais bien",
    exampleSentence: null,
    category: "greetings" as const,
    lessonId: "lesson-1",
  },
  {
    id: "v-kef-ywat",
    sourethWord: "ܟܸܦ ܝܘܲܬ؟",
    latinTranscription: "kef ywat?",
    frenchTranslation: "comment vas-tu ?",
    exampleSentence: null,
    category: "greetings" as const,
    lessonId: "lesson-1",
  },
  {
    id: "v-basim",
    sourethWord: "ܒܵܣܸܡ",
    latinTranscription: "basim",
    frenchTranslation: "bien / agréable",
    exampleSentence: null,
    category: "greetings" as const,
    lessonId: null,
  },
  // Famille
  {
    id: "v-awa",
    sourethWord: "ܐܵܒ݂ܵܐ",
    latinTranscription: "awa",
    frenchTranslation: "père",
    exampleSentence: "ܐܵܒ݂ܝ ܒܪܝܼܟ ܝܠܹܗ — Mon père est béni",
    category: "family" as const,
    lessonId: "lesson-2",
  },
  {
    id: "v-ima",
    sourethWord: "ܐܸܡܵܐ",
    latinTranscription: "ima",
    frenchTranslation: "mère",
    exampleSentence: null,
    category: "family" as const,
    lessonId: "lesson-2",
  },
  {
    id: "v-akha",
    sourethWord: "ܐܵܚܵܐ",
    latinTranscription: "akha",
    frenchTranslation: "frère",
    exampleSentence: null,
    category: "family" as const,
    lessonId: "lesson-2",
  },
  {
    id: "v-khata",
    sourethWord: "ܚܵܬ݂ܵܐ",
    latinTranscription: "khata",
    frenchTranslation: "sœur",
    exampleSentence: null,
    category: "family" as const,
    lessonId: "lesson-2",
  },
  {
    id: "v-bra",
    sourethWord: "ܒܪܵܐ",
    latinTranscription: "bra",
    frenchTranslation: "fils",
    exampleSentence: null,
    category: "family" as const,
    lessonId: "lesson-2",
  },
  {
    id: "v-brata",
    sourethWord: "ܒܪܵܬ݂ܵܐ",
    latinTranscription: "brata",
    frenchTranslation: "fille",
    exampleSentence: null,
    category: "family" as const,
    lessonId: "lesson-2",
  },
  // Chiffres
  {
    id: "v-khad",
    sourethWord: "ܚܲܕ",
    latinTranscription: "khad",
    frenchTranslation: "un (1)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-trey",
    sourethWord: "ܬܪܹܝ",
    latinTranscription: "trey",
    frenchTranslation: "deux (2)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-tlat",
    sourethWord: "ܬܠܵܬ݂",
    latinTranscription: "tlat",
    frenchTranslation: "trois (3)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-arba",
    sourethWord: "ܐܲܪܒܲܥ",
    latinTranscription: "arba",
    frenchTranslation: "quatre (4)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-khamsha",
    sourethWord: "ܚܲܡܫܵܐ",
    latinTranscription: "khamsha",
    frenchTranslation: "cinq (5)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-shta",
    sourethWord: "ܫܬܵܐ",
    latinTranscription: "shta",
    frenchTranslation: "six (6)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-shwa",
    sourethWord: "ܫܒ݂ܲܥ",
    latinTranscription: "shwa",
    frenchTranslation: "sept (7)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-tmanya",
    sourethWord: "ܬܡܵܢܝܵܐ",
    latinTranscription: "tmanya",
    frenchTranslation: "huit (8)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-tsha",
    sourethWord: "ܬܫܲܥ",
    latinTranscription: "tsha",
    frenchTranslation: "neuf (9)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  {
    id: "v-sar",
    sourethWord: "ܥܣܵܪ",
    latinTranscription: "sar",
    frenchTranslation: "dix (10)",
    exampleSentence: null,
    category: "numbers" as const,
    lessonId: "lesson-3",
  },
  // Nourriture
  {
    id: "v-lakhma",
    sourethWord: "ܠܲܚܡܵܐ",
    latinTranscription: "lakhma",
    frenchTranslation: "pain",
    exampleSentence: "ܠܲܚܡܵܐ ܒܵܣܸܡ — Le pain est bon",
    category: "food" as const,
    lessonId: null,
  },
  {
    id: "v-maya",
    sourethWord: "ܡܲܝܵܐ",
    latinTranscription: "maya",
    frenchTranslation: "eau",
    exampleSentence: null,
    category: "food" as const,
    lessonId: null,
  },
  {
    id: "v-khala",
    sourethWord: "ܚܵܠܵܐ",
    latinTranscription: "khala",
    frenchTranslation: "sel",
    exampleSentence: null,
    category: "food" as const,
    lessonId: null,
  },
  // Nature
  {
    id: "v-shimsha",
    sourethWord: "ܫܸܡܫܵܐ",
    latinTranscription: "shimsha",
    frenchTranslation: "soleil",
    exampleSentence: null,
    category: "nature" as const,
    lessonId: null,
  },
  {
    id: "v-sahra",
    sourethWord: "ܣܲܗܪܵܐ",
    latinTranscription: "sahra",
    frenchTranslation: "lune",
    exampleSentence: null,
    category: "nature" as const,
    lessonId: null,
  },
  {
    id: "v-nura",
    sourethWord: "ܢܘܼܪܵܐ",
    latinTranscription: "nura",
    frenchTranslation: "feu",
    exampleSentence: null,
    category: "nature" as const,
    lessonId: null,
  },
  // Verbes
  {
    id: "v-azal",
    sourethWord: "ܐܵܙܲܠ",
    latinTranscription: "azal",
    frenchTranslation: "aller",
    exampleSentence: "ܐܵܙܲܠ ܝܘܸܢ ܠܒܲܝܬܵܐ — Je vais à la maison",
    category: "verbs" as const,
    lessonId: null,
  },
  {
    id: "v-atel",
    sourethWord: "ܐܵܬܹܐ",
    latinTranscription: "ate",
    frenchTranslation: "venir",
    exampleSentence: null,
    category: "verbs" as const,
    lessonId: null,
  },
  {
    id: "v-yatew",
    sourethWord: "ܝܵܬ݂ܸܒ",
    latinTranscription: "yatew",
    frenchTranslation: "s'asseoir",
    exampleSentence: null,
    category: "verbs" as const,
    lessonId: null,
  },
  // Adjectifs
  {
    id: "v-tawa",
    sourethWord: "ܛܵܒ݂ܵܐ",
    latinTranscription: "tawa",
    frenchTranslation: "bon / bien",
    exampleSentence: "ܐܵܠܵܗܵܐ ܛܵܒ݂ — Dieu est bon",
    category: "adjectives" as const,
    lessonId: null,
  },
  {
    id: "v-bisha",
    sourethWord: "ܒܝܼܫܵܐ",
    latinTranscription: "bisha",
    frenchTranslation: "mauvais",
    exampleSentence: null,
    category: "adjectives" as const,
    lessonId: null,
  },
  // Phrases
  {
    id: "v-alaha",
    sourethWord: "ܐܲܠܵܗܵܐ",
    latinTranscription: "alaha",
    frenchTranslation: "Dieu",
    exampleSentence: "ܐܲܠܵܗܵܐ ܒܪܝܼܟ — Dieu est béni",
    category: "phrases" as const,
    lessonId: null,
  },
  {
    id: "v-shlemta",
    sourethWord: "ܫܠܡܬܵܐ",
    latinTranscription: "shlemta",
    frenchTranslation: "au revoir",
    exampleSentence: null,
    category: "phrases" as const,
    lessonId: null,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  // Insert lessons
  console.log("📖 Inserting lessons...");
  for (const lesson of LESSONS) {
    await db
      .insert(schema.lessons)
      .values(lesson)
      .onConflictDoNothing();
  }

  // Insert vocabulary
  console.log("💬 Inserting vocabulary...");
  for (const item of VOCABULARY) {
    await db
      .insert(schema.vocabularyItems)
      .values(item)
      .onConflictDoNothing();
  }

  console.log(`✅ Seeded ${LESSONS.length} lessons and ${VOCABULARY.length} vocabulary items`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
