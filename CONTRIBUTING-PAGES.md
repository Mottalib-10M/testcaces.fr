# Ajouter ou modifier une page

Une page = un fichier `src/content/pages/<id>.ts`, avec sa version française (`fr`) et sa version anglaise (`en`). Le nom du fichier est l'identifiant de la page.

1. Copier `src/content/pages/examen-blanc.ts` sous un nouvel identifiant.
2. Choisir la rubrique (`group` : tests, categories, themes, pratique), l'ordre, l'outil principal (`tool` : quiz, bank, score, finder, validity, cost ou `mini:<spec>`) et le mini-outil (`mini`), parmi ceux de `src/components/Tool.astro` et `src/lib/mini-specs.ts`. Un mini-outil placé dans le corps (`<!--tool:mini:spec-->`) doit être différent de celui de la page.
3. Écrire les deux langues : titre de 50 à 60 caractères et description de 150 à 160 caractères commençant par le terme-clé, sans tiret cadratin ; bloc citable (`resume`) d'un seul paragraphe de 130 mots ou plus ; 3 à 5 questions de FAQ propres à la page, réponses de 40 à 90 mots ; contenu de 560 mots ou plus.
4. Tout chiffre vient de `src/data/params-2026.json` (via `h.P`), des grilles (`h.grid`, `h.pts`, `h.min`), des prix CPF (`h.med`, `h.hrs`, `h.prices`) ou de la banque (`h.count`), jamais tapé dans la page. Un chiffre absent doit d'abord être ajouté à params avec sa source officielle (clé de `sources`).
5. Liens internes avec `h.a('<id>', 'texte')`, liens officiels avec `h.src('<clé>', 'texte')`.
6. Ne jamais recopier 8 mots de suite d'une recommandation (`data/textes-sources/`, hors dépôt) : `check-copie` le refuse.
7. `node scripts/lint-pages.mjs` (contrôle rapide), puis `npm run check` : tout doit être à 0.

## Banque de questions

`src/data/bank/<reco>.json` : questions rédigées par Radif Partners à partir des référentiels de connaissances des recommandations R.489A, R.482B, R.486B, R.490A et R.485A. Chaque question est rattachée à un point de grille (`points`, par recommandation), a 3 ou 4 propositions dont une seule juste, une explication en français et en anglais. Les grilles (`src/data/grilles/`) reprennent le barème de l'annexe 3 de chaque recommandation. Les plaques de charge (`src/data/bank/plaques.json`) sont fictives. `python3 scripts/lint-bank.py` vérifie la couverture de chaque point de grille, la position des bonnes réponses et l'absence de copie ; `npx vitest run` vérifie le tirage de l'examen blanc et les moteurs (dates, CPF, plaques).

## Mise à jour

- Prix CPF : `node scripts/update-data.mjs` relit le catalogue Mon Compte Formation (Caisse des Dépôts, Licence Ouverte) et réécrit `src/data/cpf-caces.json` ; le workflow `.github/workflows/update-data.yml` le lance chaque lundi et republie le site si les prix changent.
- Règles (recommandations, Code du travail, CPF) : relues à la main ; mettre à jour `retrieved_at` dans `params-2026.json` et `LAST_UPDATED` dans `src/data/site-config.ts` à chaque relecture. Aucune mise à jour automatique des règles n'est configurée.
