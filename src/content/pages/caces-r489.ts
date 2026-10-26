import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-r489',
  group: 'categories',
  order: 10,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'exam' } },
  mini: { kind: 'mini:r489cat' },
  related: ['caces-1', 'caces-3', 'caces-5', 'caces-chariot-elevateur', 'abaque-de-charge', 'stabilite-chariot'],
  sources: ['r489', 'tableau', 'ct55', 'cdc_catalogue'],
  fr: {
    slug: 'caces-r489',
    nav: 'CACES R489 : chariots élévateurs',
    card: 'Test blanc R489 de 100 questions, les sept catégories de chariots, le barème et le prix médian par catégorie.',
    title: 'CACES R489 : test blanc chariot et catégories 1A à 7',
    description: 'CACES R489 : test théorique blanc de 100 questions sur le barème officiel, catégories 1A à 7 expliquées, validité de 5 ans et prix médian CPF par catégorie.',
    h1: 'CACES R489 : test blanc et catégories de chariots',
    intro: 'Le test ci-dessous suit la fiche d’évaluation de la R489 : 15 points de connaissances générales, 25 de technologie, 10 d’abaque et 50 d’exploitation.',
    resume: (h) => `La recommandation R489 de l’Assurance Maladie encadre la conduite des chariots automoteurs de manutention à conducteur porté : transpalettes et gerbeurs sur lesquels on monte, chariots frontaux, chariots à mât rétractable, chariots à poste élevable. Sa version en vigueur est la ${h.P.recos.r489.version}, publiée en juillet 2026, qui ne change pas le mode d’évaluation appliqué depuis le 1er janvier 2020. Le CACES R489 se compose d’un test théorique commun à toutes les catégories et d’un test pratique par catégorie, passés dans un organisme testeur certifié. Il vaut ${h.years('r489')} ans à compter de la date de réussite du second test. Au catalogue Mon Compte Formation, la formation initiale la plus demandée, la catégorie 3, coûte ${h.med('r489', '3')} en valeur médiane pour une durée médiane de ${h.hrs('r489', '3')}, au ${h.cpfDate}. Le test blanc ci-dessus suit exactement le barème de la recommandation, thème par thème.`,
    faqs: (h) => [
      { q: 'Quelles sont les catégories du CACES R489 ?', a: 'Elles sont sept : 1A transpalettes et préparateurs à levée basse, 1B gerbeurs à levée de plus de 1,20 m, 2A chariots à plateau, 2B tracteurs industriels, 3 chariots frontaux jusqu’à 6 tonnes, 4 chariots frontaux de plus de 6 tonnes, 5 chariots à mât rétractable, 6 chariots à poste élevable, 7 conduite hors production. La catégorie 2 se divise en 2A et 2B.' },
      { q: 'Le test théorique R489 change-t-il selon la catégorie ?', a: 'Non. Le même test de 100 questions vaut pour toutes les catégories. Si vous passez plusieurs catégories dans l’année qui suit, la théorie réussie reste valable 12 mois pour une nouvelle catégorie, mais la nouvelle catégorie expire à la même date que le CACES obtenu en premier.' },
      { q: 'Combien de temps dure une formation CACES R489 ?', a: `La médiane des offres du catalogue Mon Compte Formation est de ${h.hrs('r489', '3')} pour une catégorie 3 en formation initiale et de ${h.hrs('r489', '3', 'rec')} en recyclage. La recommandation ne fixe pas de durée de formation : l’organisme l’adapte au niveau du candidat. Seule la durée des tests est fixée, en unités de test.` },
      { q: 'Le CACES R389 est-il encore valable ?', a: `Un CACES R389 délivré avant 2020 reste valable jusqu’à sa date de fin, soit cinq ans après son obtention. Il est donc désormais expiré dans tous les cas : le recyclage se passe dans le cadre de la R489, avec ses nouvelles catégories et son barème à quatre thèmes.` },
    ],
    body: (h) => `
<h2>Les catégories de la R489</h2>
${h.table(['Catégorie', 'Engins', 'Prix médian initial', 'Durée médiane'], [['1A', 'Transpalettes et préparateurs à conducteur porté, levée jusqu’à 1,20 m', h.med('r489', '1A'), h.hrs('r489', '1A')], ['1B', 'Gerbeurs à conducteur porté, levée de plus de 1,20 m', h.med('r489', '1B'), h.hrs('r489', '1B')], ['2A', 'Chariots à plateau porteur, jusqu’à 2 tonnes', h.med('r489', '2A'), h.hrs('r489', '2A')], ['2B', 'Tracteurs industriels, jusqu’à 25 tonnes tractées', h.med('r489', '2B'), h.hrs('r489', '2B')], ['3', 'Chariots frontaux en porte-à-faux, jusqu’à 6 tonnes', h.med('r489', '3'), h.hrs('r489', '3')], ['4', 'Chariots frontaux en porte-à-faux, plus de 6 tonnes', h.med('r489', '4'), h.hrs('r489', '4')], ['5', 'Chariots à mât rétractable, à prise latérale', h.med('r489', '5'), h.hrs('r489', '5')], ['6', 'Chariots à poste de conduite élevable', h.med('r489', '6'), h.hrs('r489', '6')], ['7', 'Conduite hors production (déplacement, essai)', h.med('r489', '7'), h.hrs('r489', '7')]], `Annexe 1 de la recommandation R.489A ; prix des offres Mon Compte Formation au ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<p>Le cariste d’un entrepôt passe le plus souvent la catégorie 3, puis la 5 s’il travaille en grande hauteur dans des allées de rayonnage. Les catégories 1A et 1B sont celles des préparateurs de commandes. Les pages ${h.a('caces-1', 'CACES 1A et 1B')}, ${h.a('caces-3', 'CACES 3')} et ${h.a('caces-5', 'CACES 5')} donnent un test ciblé pour chacune.</p>
<h2>Le barème du test théorique</h2>
${h.grid('r489')}
<p>Le thème le plus lourd est l’exploitation, avec 50 points : risques, circulation, signalisation, prise et dépose des charges, stockage en hauteur. L’abaque de charges, sur 10 points seulement, fait pourtant échouer beaucoup de candidats : il faut ${h.min('r489', 'abaque')} réponses justes sur 10, et une lecture de plaque se joue au millimètre près sur le centre de gravité. La page ${h.a('abaque-de-charge', 'abaque de charge')} explique la méthode avec des plaques d’exemple.</p>
<!--tool:mini:ut-r489-->
<h2>Après le CACES</h2>
<p>Le CACES ne suffit pas pour conduire : l’employeur délivre une autorisation de conduite écrite, après avoir vérifié l’aptitude médicale et la connaissance du site. La page ${h.a('autorisation-de-conduite', 'autorisation de conduite')} détaille ces trois conditions, et la page ${h.a('duree-validite', 'durée de validité')} calcule la date à partir de laquelle il faut repasser les tests.</p>`,
  },
  en: {
    slug: 'caces-r489',
    nav: 'CACES R489: forklift trucks',
    card: 'R489 mock test of 100 questions, the seven truck categories, the marking scheme and the median price per category.',
    title: 'CACES R489: forklift mock test and categories 1A to 7',
    description: 'CACES R489: 100-question theory mock test on the official marking scheme, categories 1A to 7 explained, 5-year validity and median CPF price per category.',
    h1: 'CACES R489: mock test and forklift categories',
    intro: 'The test below follows the R489 assessment sheet: 15 points of general knowledge, 25 of technology, 10 on the load chart and 50 of operation.',
    resume: (h) => `Recommendation R489 of the French Health Insurance covers ride-on powered industrial trucks: pallet trucks and stackers you stand or sit on, counterbalance forklifts, reach trucks and trucks with an elevating operator position. The version in force is ${h.P.recos.r489.version}, published in July 2026, which keeps the assessment method used since 1 January 2020. The R489 CACES is made of one theory test shared by all categories and one practical test per category, both sat at a certified testing body. It is valid for ${h.years('r489')} years from the date the second test was passed. In the Mon Compte Formation catalogue, the most requested initial course, category 3, costs a median of ${h.med('r489', '3')} for a median length of ${h.hrs('r489', '3')}, as of ${h.cpfDate}. The mock test above follows the recommendation’s marking exactly, theme by theme.`,
    faqs: (h) => [
      { q: 'What are the R489 CACES categories?', a: 'There are seven: 1A low-lift pallet trucks and order pickers, 1B stackers lifting above 1.20 m, 2A platform trucks, 2B tow tractors, 3 counterbalance trucks up to 6 tonnes, 4 counterbalance trucks above 6 tonnes, 5 reach trucks, 6 trucks with an elevating operator position, 7 non-production driving. Category 2 is split into 2A and 2B.' },
      { q: 'Does the R489 theory test change with the category?', a: 'No. The same 100-question test covers every category. If you add categories within the following year, the passed theory remains valid for 12 months for a new category, but that new category expires on the same date as the CACES you obtained first.' },
      { q: 'How long is an R489 CACES course?', a: `The median of Mon Compte Formation offers is ${h.hrs('r489', '3')} for an initial category 3 course and ${h.hrs('r489', '3', 'rec')} for a refresher. The recommendation does not set a training length: the provider adapts it to the candidate’s level. Only the length of the tests is fixed, in test units.` },
      { q: 'Is an old R389 CACES still valid?', a: 'An R389 CACES issued before 2020 stayed valid until its end date, five years after it was obtained. It has therefore expired in every case by now: the refresher is taken under R489, with its new categories and its four-theme marking scheme.' },
    ],
    body: (h) => `
<h2>The R489 categories</h2>
${h.table(['Category', 'Machines', 'Median initial price', 'Median length'], [['1A', 'Ride-on pallet trucks and order pickers, lift up to 1.20 m', h.med('r489', '1A'), h.hrs('r489', '1A')], ['1B', 'Ride-on stackers, lift above 1.20 m', h.med('r489', '1B'), h.hrs('r489', '1B')], ['2A', 'Platform trucks, up to 2 tonnes', h.med('r489', '2A'), h.hrs('r489', '2A')], ['2B', 'Industrial tow tractors, up to 25 tonnes towed', h.med('r489', '2B'), h.hrs('r489', '2B')], ['3', 'Counterbalance forklifts, up to 6 tonnes', h.med('r489', '3'), h.hrs('r489', '3')], ['4', 'Counterbalance forklifts, above 6 tonnes', h.med('r489', '4'), h.hrs('r489', '4')], ['5', 'Reach trucks, side loaders', h.med('r489', '5'), h.hrs('r489', '5')], ['6', 'Trucks with an elevating operator position', h.med('r489', '6'), h.hrs('r489', '6')], ['7', 'Non-production driving (moving, testing)', h.med('r489', '7'), h.hrs('r489', '7')]], `Annex 1 of recommendation R.489A; Mon Compte Formation offer prices on ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<p>A warehouse forklift driver most often takes category 3, then category 5 when working at height in racking aisles. Categories 1A and 1B are those of order pickers. The ${h.a('caces-1', 'CACES 1A and 1B')}, ${h.a('caces-3', 'CACES 3')} and ${h.a('caces-5', 'CACES 5')} pages give a targeted test for each.</p>
<h2>The theory test marking scheme</h2>
${h.grid('r489')}
<p>The heaviest theme is operation, at 50 points: risks, traffic, signs, picking up and setting down loads, high-level storage. The load chart, worth only 10 points, still fails many candidates: you need ${h.min('r489', 'abaque')} correct answers out of 10, and reading a capacity plate depends on the load centre to the millimetre. The ${h.a('abaque-de-charge', 'load chart page')} explains the method with sample plates.</p>
<!--tool:mini:ut-r489-->
<h2>After the CACES</h2>
<p>The CACES alone does not allow you to drive: the employer issues a written operating authorisation after checking medical fitness and knowledge of the site. The ${h.a('autorisation-de-conduite', 'operating authorisation page')} details these three conditions, and the ${h.a('duree-validite', 'validity page')} works out the date from which the tests must be taken again.</p>`,
  },
});
