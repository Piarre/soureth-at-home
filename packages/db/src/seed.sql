INSERT OR IGNORE INTO lessons (id, title, description, "order", category, content, created_at) VALUES
(
  'lesson-1',
  'Les salutations',
  'Apprenez à dire bonjour, au revoir et à vous présenter',
  1,
  'phrases',
  'Bienvenue dans votre première leçon de Soureth !

Le Soureth est la forme moderne de l''araméen, parlée par les communautés assyriennes et chaldéennes.

Les salutations essentielles :

ܫܠܵܡܵܐ (shlama) — Paix / Bonjour (salutation traditionnelle)
ܒܵܪܟ݂ ܐܲܠܵܗܵܐ (barkh alaha) — Que Dieu te bénisse (réponse à shlama)
ܕܲܪܡܘܼܢ ܒܫܠܵܡܵܐ (darmun b''shlama) — Allez en paix (au revoir)

Pour demander "Comment vas-tu ?" :
ܟܸܦ ܝܘܲܬ? (kef ywat?) — Comment vas-tu ? (à un homme)
ܟܸܦ ܝܘܲܬ‌ܝ? (kef ywati?) — Comment vas-tu ? (à une femme)

Réponses possibles :
ܛܵܒ݂ ܝܘܸܢ (taw ywen) — Je vais bien
ܣܒ݂ܵܪܵܐ ܛܵܒ݂ܵܐ (savara tawa) — Bonne nouvelle / Bien

Note : Le Soureth se lit de droite à gauche, comme l''hébreu et l''arabe.',
  strftime('%s', 'now') * 1000
),
(
  'lesson-2',
  'La famille',
  'Le vocabulaire de la famille en Soureth',
  2,
  'vocabulary',
  'La famille est au cœur de la culture assyrienne. Voici les membres essentiels :

Les parents proches :
ܐܵܒ݂ܵܐ (awa) — père
ܐܸܡܵܐ (ima) — mère
ܐܵܚܵܐ (akha) — frère
ܚܵܬ݂ܵܐ (khata) — sœur
ܒܪܵܐ (bra) — fils
ܒܪܵܬ݂ܵܐ (brata) — fille

Exemple de phrase :
ܐܵܒ݂ܝ ܫܡܹܗ ܝܵܘܣܸܦ — Mon père s''appelle Joseph',
  strftime('%s', 'now') * 1000
),
(
  'lesson-3',
  'Les chiffres de 1 à 10',
  'Comptez en Soureth',
  3,
  'vocabulary',
  '1 — ܚܲܕ (khad) — un
2 — ܬܪܹܝ (trey) — deux
3 — ܬܠܵܬ݂ (tlat) — trois
4 — ܐܲܪܒܲܥ (arba) — quatre
5 — ܚܲܡܫܵܐ (khamsha) — cinq
6 — ܫܬܵܐ (shta) — six
7 — ܫܒ݂ܲܥ (shwa) — sept
8 — ܬܡܵܢܝܵܐ (tmanya) — huit
9 — ܬܫܲܥ (tsha) — neuf
10 — ܥܣܵܪ (sar) — dix',
  strftime('%s', 'now') * 1000
),
(
  'lesson-4',
  'L''alphabet syriaque — Partie 1',
  'Découvrez les 11 premières lettres de l''alphabet',
  4,
  'alphabet',
  'L''alphabet syriaque comporte 22 lettres. Il s''écrit de droite à gauche.

ܐ Alaph — /ʔ/ ou /a/
ܒ Beth — /b/ ou /v/
ܓ Gamal — /g/
ܕ Dalath — /d/
ܗ He — /h/
ܘ Waw — /w/ ou /u/
ܙ Zayn — /z/
ܚ Heth — /ħ/ — son guttural
ܛ Teth — /tˤ/
ܝ Yodh — /j/ ou /i/
ܟ Kaph — /k/ ou /x/',
  strftime('%s', 'now') * 1000
),
(
  'lesson-5',
  'L''alphabet syriaque — Partie 2',
  'Les 11 dernières lettres de l''alphabet',
  5,
  'alphabet',
  'ܠ Lamadh — /l/
ܡ Mim — /m/
ܢ Nun — /n/
ܣ Semkath — /s/
ܥ Ayin — /ʕ/ — son pharyngal
ܦ Pe — /p/ ou /f/
ܨ Sadhe — /sˤ/
ܩ Qaph — /q/
ܪ Resh — /r/
ܫ Shin — /ʃ/ — comme "ch"
ܬ Taw — /t/ ou /θ/',
  strftime('%s', 'now') * 1000
);

INSERT OR IGNORE INTO vocabulary_items (id, soureth_word, latin_transcription, french_translation, example_sentence, category, lesson_id, created_at) VALUES
('v-shlama', 'ܫܠܵܡܵܐ', 'shlama', 'paix / bonjour', 'ܫܠܵܡܵܐ، ܟܸܦ ܝܘܲܬ? — Bonjour, comment vas-tu ?', 'greetings', 'lesson-1', strftime('%s', 'now') * 1000),
('v-taw-ywen', 'ܛܵܒ݂ ܝܘܸܢ', 'taw ywen', 'je vais bien', NULL, 'greetings', 'lesson-1', strftime('%s', 'now') * 1000),
('v-kef-ywat', 'ܟܸܦ ܝܘܲܬ؟', 'kef ywat?', 'comment vas-tu ?', NULL, 'greetings', 'lesson-1', strftime('%s', 'now') * 1000),
('v-basim', 'ܒܵܣܸܡ', 'basim', 'bien / agréable', NULL, 'greetings', NULL, strftime('%s', 'now') * 1000),
('v-shlemta', 'ܫܠܡܬܵܐ', 'shlemta', 'au revoir', NULL, 'greetings', NULL, strftime('%s', 'now') * 1000),
('v-awa', 'ܐܵܒ݂ܵܐ', 'awa', 'père', 'ܐܵܒ݂ܝ ܒܪܝܼܟ ܝܠܹܗ — Mon père est béni', 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-ima', 'ܐܸܡܵܐ', 'ima', 'mère', NULL, 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-akha', 'ܐܵܚܵܐ', 'akha', 'frère', NULL, 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-khata', 'ܚܵܬ݂ܵܐ', 'khata', 'sœur', NULL, 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-bra', 'ܒܪܵܐ', 'bra', 'fils', NULL, 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-brata', 'ܒܪܵܬ݂ܵܐ', 'brata', 'fille', NULL, 'family', 'lesson-2', strftime('%s', 'now') * 1000),
('v-khad', 'ܚܲܕ', 'khad', 'un (1)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-trey', 'ܬܪܹܝ', 'trey', 'deux (2)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-tlat', 'ܬܠܵܬ݂', 'tlat', 'trois (3)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-arba', 'ܐܲܪܒܲܥ', 'arba', 'quatre (4)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-khamsha', 'ܚܲܡܫܵܐ', 'khamsha', 'cinq (5)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-shta', 'ܫܬܵܐ', 'shta', 'six (6)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-shwa', 'ܫܒ݂ܲܥ', 'shwa', 'sept (7)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-tmanya', 'ܬܡܵܢܝܵܐ', 'tmanya', 'huit (8)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-tsha', 'ܬܫܲܥ', 'tsha', 'neuf (9)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-sar', 'ܥܣܵܪ', 'sar', 'dix (10)', NULL, 'numbers', 'lesson-3', strftime('%s', 'now') * 1000),
('v-lakhma', 'ܠܲܚܡܵܐ', 'lakhma', 'pain', 'ܠܲܚܡܵܐ ܒܵܣܸܡ — Le pain est bon', 'food', NULL, strftime('%s', 'now') * 1000),
('v-maya', 'ܡܲܝܵܐ', 'maya', 'eau', NULL, 'food', NULL, strftime('%s', 'now') * 1000),
('v-shimsha', 'ܫܸܡܫܵܐ', 'shimsha', 'soleil', NULL, 'nature', NULL, strftime('%s', 'now') * 1000),
('v-sahra', 'ܣܲܗܪܵܐ', 'sahra', 'lune', NULL, 'nature', NULL, strftime('%s', 'now') * 1000),
('v-nura', 'ܢܘܼܪܵܐ', 'nura', 'feu', NULL, 'nature', NULL, strftime('%s', 'now') * 1000),
('v-azal', 'ܐܵܙܲܠ', 'azal', 'aller', 'ܐܵܙܲܠ ܝܘܸܢ ܠܒܲܝܬܵܐ — Je vais à la maison', 'verbs', NULL, strftime('%s', 'now') * 1000),
('v-ate', 'ܐܵܬܹܐ', 'ate', 'venir', NULL, 'verbs', NULL, strftime('%s', 'now') * 1000),
('v-tawa', 'ܛܵܒ݂ܵܐ', 'tawa', 'bon / bien', 'ܐܵܠܵܗܵܐ ܛܵܒ݂ — Dieu est bon', 'adjectives', NULL, strftime('%s', 'now') * 1000),
('v-bisha', 'ܒܝܼܫܵܐ', 'bisha', 'mauvais', NULL, 'adjectives', NULL, strftime('%s', 'now') * 1000),
('v-alaha', 'ܐܲܠܵܗܵܐ', 'alaha', 'Dieu', 'ܐܲܠܵܗܵܐ ܒܪܝܼܟ — Dieu est béni', 'phrases', NULL, strftime('%s', 'now') * 1000);
