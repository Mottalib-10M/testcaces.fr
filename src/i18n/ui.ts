import type { Locale } from './routes';
const fr = {
  updatedOn: 'Règles et prix vérifiés le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Questions, corrigés et calculs par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions des caristes et des candidats', relatedCalculators: 'Pour continuer', sourcesTitle: 'Textes officiels consultés pour cette page', writtenBy: 'Rédigé par',
  asOf: 'Règles du CACES', lastUpdated: 'relues dans les recommandations de l’Assurance Maladie et le Code du travail, dernière vérification le',
  footerValidated: 'Chaque règle renvoie au texte officiel où elle a été lue',
  footerBrowser: 'Tests et calculs faits dans votre navigateur · rien de ce que vous saisissez n’est transmis · progression gardée sur votre appareil seulement · gratuit, sans compte',
  footerDisclaimer: 'Test CACES est un site indépendant publié par Radif Partners. Ce n’est ni l’Assurance Maladie, ni l’INRS, ni un organisme testeur certifié, ni un centre de formation : il ne délivre aucun CACES, n’inscrit à aucun test et ne recommande aucun organisme. Les questions sont écrites par nous pour l’entraînement ; le site ne remplace ni la formation ni le test officiel, qui se passe dans un organisme testeur certifié. Les prix et dates affichés sont indicatifs.',
  footerPopular: 'Tests blancs',
  notFound: 'Aucune page à cette adresse. Le test CACES blanc gratuit est sur la page d’accueil.',
  readMore: 'Lire la suite', back: 'Accueil',
  independent: 'Site indépendant, sans lien avec l’Assurance Maladie, l’INRS, les organismes testeurs ni les centres de formation.',
};
const en: typeof fr = {
  updatedOn: 'Rules and prices checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions, explanations and calculations by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions operators and candidates ask', relatedCalculators: 'Keep going', sourcesTitle: 'Official texts behind this page', writtenBy: 'Written by',
  asOf: 'CACES rules', lastUpdated: 'read in the French Health Insurance recommendations and the Labour Code, last checked on',
  footerValidated: 'Every rule links to the official text it was read in',
  footerBrowser: 'Tests and calculations run in your browser · nothing you type is sent · progress kept on your device only · free, no account',
  footerDisclaimer: 'Test CACES is an independent site published by Radif Partners. It is not the French Health Insurance (Assurance Maladie), the INRS, a certified testing body or a training centre: it issues no CACES, books no test and recommends no provider. The questions are written by us for practice; the site does not replace the training or the official test, which is sat at a certified testing body, in French. Prices and dates shown are estimates only.',
  footerPopular: 'Mock tests',
  notFound: 'There is no page at this address. The free CACES mock test is on the home page.',
  readMore: 'Read more', back: 'Home',
  independent: 'Independent site, not linked to the French Health Insurance (Assurance Maladie), the INRS, testing bodies or training centres.',
};
export function t(lang: Locale) { return lang === 'fr' ? fr : en; }
