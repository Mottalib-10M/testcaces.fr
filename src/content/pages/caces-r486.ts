import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-r486',
  group: 'categories',
  order: 60,
  tool: { kind: 'quiz', props: { reco: 'r486', mode: 'exam' } },
  mini: { kind: 'mini:pemp' },
  related: ['caces-nacelle', 'fin-de-poste', 'securite-risques', 'caces-prix', 'duree-validite', 'examen-blanc'],
  sources: ['r486', 'tableau', 'cdc_catalogue'],
  fr: {
    slug: 'caces-r486',
    nav: 'CACES R486 : nacelles (PEMP)',
    card: 'Test blanc R486 de 100 questions sur les plateformes élévatrices, catégories A, B et C, prix médian.',
    title: 'CACES R486 : test blanc nacelle PEMP de 100 questions',
    description: 'CACES R486 : test théorique blanc de 100 questions sur le barème des nacelles (PEMP), catégories A, B et C, validité de 5 ans et prix médian CPF 2026.',
    h1: 'CACES R486 : test blanc des plateformes élévatrices mobiles',
    intro: 'Le test ci-dessous suit la fiche d’évaluation de la R486 : 14 points de connaissances générales, 26 de technologie, 54 d’exploitation et 6 d’entretien.',
    resume: (h) => `La recommandation R486 de l’Assurance Maladie encadre l’utilisation des plateformes élévatrices mobiles de personnes, les PEMP, appelées couramment nacelles. Sa version en vigueur est la ${h.P.recos.r486.version}, publiée en juillet 2026, sans changement du mode d’évaluation en place depuis le 1er janvier 2020. Elle compte trois catégories : A pour les nacelles à élévation verticale, comme les nacelles ciseaux, B pour les nacelles à élévation multidirectionnelle, articulées ou télescopiques, et C pour la conduite hors production. Le CACES R486 vaut ${h.years('r486')} ans. Son test théorique est celui où le thème d’exploitation pèse le plus lourd de tous, ${h.pts('r486', 'expl')} points sur 100, parce que la nacelle élève des personnes : chute, écrasement contre une structure, renversement, lignes électriques. Au ${h.cpfDate}, la formation initiale médiane coûte ${h.med('r486', 'A')} en catégorie A et ${h.med('r486', 'B')} en catégorie B au catalogue Mon Compte Formation.`,
    faqs: (h) => [
      { q: 'Quelle différence entre les catégories A et B du CACES nacelle ?', a: 'La catégorie A couvre les nacelles dont la plateforme monte à la verticale, comme les ciseaux et les mâts verticaux. La catégorie B couvre les nacelles dont la plateforme peut aussi se déporter, comme les articulées et les télescopiques, y compris les nacelles sur camion. Chaque catégorie a son test pratique.' },
      { q: 'Que veulent dire les types 1, 2 et 3 d’une nacelle ?', a: 'Ils décrivent la translation. Type 1 : la nacelle ne se déplace qu’en position de transport. Type 2 : elle se déplace plateforme levée, commandée depuis le châssis. Type 3 : elle se déplace plateforme levée, commandée depuis la plateforme. Le type ne change pas la catégorie du CACES, mais il change les risques.' },
      { q: 'Faut-il un harnais dans une nacelle ?', a: 'Dans une nacelle de type B, articulée ou télescopique, le port d’un harnais relié à un point d’ancrage de la plateforme est la règle, parce qu’un mouvement brusque peut éjecter l’opérateur. Dans une nacelle ciseaux, le garde-corps protège en principe de la chute ; la notice et l’analyse des risques du site précisent le reste.' },
      { q: 'Combien coûte le CACES nacelle ?', a: `Au ${h.cpfDate}, le prix médian des offres de formation initiale est de ${h.med('r486', 'A')} en catégorie A, ${h.med('r486', 'B')} en catégorie B et ${h.med('r486', 'C')} en catégorie C au catalogue Mon Compte Formation. Les stages couplés A et B sont fréquents et couvrent les deux catégories.` },
    ],
    body: (h) => `
<h2>Les catégories de la R486</h2>
${h.table(['Catégorie', 'Nacelles', 'Prix médian initial', 'Durée médiane'], [['A', 'Élévation verticale : ciseaux, mâts verticaux', h.med('r486', 'A'), h.hrs('r486', 'A')], ['B', 'Élévation multidirectionnelle : articulées, télescopiques, sur camion', h.med('r486', 'B'), h.hrs('r486', 'B')], ['C', 'Conduite hors production : déplacement, chargement, essais', h.med('r486', 'C'), h.hrs('r486', 'C')]], `Annexe 1 de la recommandation R.486B ; offres Mon Compte Formation au ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<h2>Le barème du test théorique</h2>
${h.grid('r486')}
<p>Avec ${h.pts('r486', 'expl')} points, l’exploitation domine : il est possible d’atteindre ${h.P.test.passScore} points avec ce seul thème et les connaissances générales, mais la règle de la moitié impose aussi ${h.min('r486', 'tech')} points en technologie et ${h.min('r486', 'maint')} sur les ${h.pts('r486', 'maint')} points d’entretien. Ce dernier thème, très court, est celui où deux erreurs de trop font échouer.</p>
<!--tool:mini:ut-r486-->
<h2>Les risques que le test vérifie</h2>
<p>Les questions d’exploitation portent sur ce qui provoque les accidents graves en nacelle : coincement de l’opérateur entre la plateforme et une poutre, renversement sur un sol qui cède ou en dévers, approche d’une ligne électrique, vent au-dessus de la limite du constructeur, secours d’une personne bloquée en hauteur. La page ${h.a('caces-nacelle', 'CACES nacelle')} propose une série centrée sur ces situations, et la page ${h.a('fin-de-poste', 'fin de poste')} sur les vérifications avant et après utilisation.</p>`,
  },
  en: {
    slug: 'caces-r486',
    nav: 'CACES R486: aerial work platforms',
    card: 'R486 mock test of 100 questions on mobile elevating work platforms, categories A, B and C, median price.',
    title: 'CACES R486: aerial lift (MEWP) mock test of 100 questions',
    description: 'CACES R486: 100-question theory mock test on the aerial work platform (MEWP) marking scheme, categories A, B and C, 5-year validity and median prices.',
    h1: 'CACES R486: mobile elevating work platform mock test',
    intro: 'The test below follows the R486 assessment sheet: 14 points of general knowledge, 26 of technology, 54 of operation and 6 of maintenance.',
    resume: (h) => `Recommendation R486 of the French Health Insurance covers mobile elevating work platforms, MEWPs, known in French as PEMP or nacelles. The version in force is ${h.P.recos.r486.version}, published in July 2026, with no change to the assessment method in place since 1 January 2020. It has three categories: A for vertical lifts such as scissor lifts, B for multi-directional lifts, articulated or telescopic booms, and C for non-production driving. The R486 CACES is valid for ${h.years('r486')} years. Its theory test gives the operation theme the heaviest weight of all, ${h.pts('r486', 'expl')} points out of 100, because the platform lifts people: falls, crushing against a structure, tipping over, power lines. As of ${h.cpfDate}, the median initial course costs ${h.med('r486', 'A')} in category A and ${h.med('r486', 'B')} in category B in the Mon Compte Formation catalogue.`,
    faqs: (h) => [
      { q: 'What is the difference between categories A and B of the aerial lift CACES?', a: 'Category A covers platforms that rise vertically, such as scissor lifts and vertical masts. Category B covers platforms that can also reach outwards, such as articulated and telescopic booms, including truck-mounted lifts. Each category has its own practical test, sat on a machine of that category.' },
      { q: 'What do types 1, 2 and 3 of a platform mean?', a: 'They describe travel. Type 1: the platform only travels in the stowed position. Type 2: it travels raised, controlled from the chassis. Type 3: it travels raised, controlled from the platform. The type does not change the CACES category, but it changes the risks.' },
      { q: 'Do I need a harness in an aerial lift?', a: 'In a category B platform, articulated or telescopic, wearing a harness clipped to an anchor point in the basket is the rule, because a sudden movement can throw the operator out. In a scissor lift, the guardrail normally prevents falls; the manual and the site risk assessment cover the rest.' },
      { q: 'How much does the aerial lift CACES cost?', a: `As of ${h.cpfDate}, the median price of initial course offers is ${h.med('r486', 'A')} for category A, ${h.med('r486', 'B')} for category B and ${h.med('r486', 'C')} for category C in the Mon Compte Formation catalogue. Combined A and B courses are common and cover both categories.` },
    ],
    body: (h) => `
<h2>The R486 categories</h2>
${h.table(['Category', 'Platforms', 'Median initial price', 'Median length'], [['A', 'Vertical lift: scissors, vertical masts', h.med('r486', 'A'), h.hrs('r486', 'A')], ['B', 'Multi-directional lift: articulated, telescopic, truck-mounted', h.med('r486', 'B'), h.hrs('r486', 'B')], ['C', 'Non-production driving: moving, loading, testing', h.med('r486', 'C'), h.hrs('r486', 'C')]], `Annex 1 of recommendation R.486B; Mon Compte Formation offers on ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<h2>The theory test marking scheme</h2>
${h.grid('r486')}
<p>At ${h.pts('r486', 'expl')} points, operation dominates: you could reach ${h.P.test.passScore} points with that theme and general knowledge alone, but the half-marks rule also requires ${h.min('r486', 'tech')} points in technology and ${h.min('r486', 'maint')} out of the ${h.pts('r486', 'maint')} maintenance points. That very short theme is where two mistakes too many fail you.</p>
<!--tool:mini:ut-r486-->
<h2>The risks the test checks</h2>
<p>Operation questions cover what causes serious platform accidents: the operator trapped between the basket and a beam, tipping on ground that gives way or slopes, approaching a power line, wind above the maker’s limit, rescuing someone stuck at height. The ${h.a('caces-nacelle', 'aerial lift CACES page')} offers a set built around these situations, and the ${h.a('fin-de-poste', 'end-of-shift page')} one on checks before and after use.</p>`,
  },
});
