/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://fr-caces.example";
export const SITE_NAMES: Record<string, string> = {"fr": "FR CACES", "en": "FR CACES"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "CACES";
export const LANG_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-FR"};
export const OG_LOCALES: Record<string, string> = {"fr": "fr_FR", "en": "en_GB"};
export const LOCALE_TAG = 'fr-FR';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-26';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"fr": "Éditeur indépendant de tests théoriques CACES d'entraînement, gratuits et sans compte, écrits à partir des recommandations de l'Assurance Maladie", "en": "Independent publisher of free CACES theory practice tests, with no account, written from the French Health Insurance recommendations"};
export const AUTHOR_DESC: Record<string, string> = {"fr": "Radif Partners lit les recommandations CACES R.489, R.482, R.486, R.490 et R.485 publiées par l'Assurance Maladie, le Code du travail et l'arrêté du 26 septembre 2025, puis écrit ses propres questions d'entraînement, chacune rattachée au point du référentiel qu'elle travaille. Ce n'est ni un organisme testeur certifié, ni un centre de formation.", "en": "Radif Partners reads the CACES recommendations R.489, R.482, R.486, R.490 and R.485 published by the French Health Insurance, the Labour Code and the order of 26 September 2025, then writes its own practice questions, each tied to the point of the syllabus it trains. It is neither a certified testing body nor a training centre."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"fr": ["CACES R.489 chariots de manutention à conducteur porté", "CACES R.482 engins de chantier", "CACES R.486 plates-formes élévatrices mobiles de personnes", "CACES R.490 grues de chargement", "CACES R.485 gerbeurs à conducteur accompagnant", "Autorisation de conduite (article R.4323-56 du Code du travail)"], "en": ["CACES R.489 ride-on industrial trucks", "CACES R.482 construction machinery", "CACES R.486 mobile elevating work platforms", "CACES R.490 loader cranes", "CACES R.485 pedestrian-controlled stackers", "French operating authorisation (Labour Code article R.4323-56)"]};
export const CONTACT_EMAIL = "contact@fr-caces.example";
export const THEME_COLOR = '#0B4F8A';
export const LOGO_SYMBOL = 'C';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '695ac88e8eb5d96e3e6bb2cc44b94bb5';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme sur les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
