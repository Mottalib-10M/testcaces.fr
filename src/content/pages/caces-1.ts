import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-1',
  group: 'categories',
  order: 20,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', match: 'transpalette|gerbeur|préparateur|palette|1A|1B', size: 20 } },
  mini: { kind: 'mini:r489cat' },
  related: ['caces-r489', 'caces-r485', 'caces-3', 'quel-caces', 'caces-prix', 'examen-blanc'],
  sources: ['r489', 'r485', 'cdc_catalogue'],
  fr: {
    slug: 'caces-1a-1b',
    nav: 'CACES 1A et 1B : transpalettes, gerbeurs',
    card: 'Transpalette à conducteur porté ou gerbeur : la différence entre 1A et 1B, le test et le prix médian.',
    title: 'CACES 1A et 1B : transpalette, gerbeur et test théorique',
    description: 'CACES 1A et 1B (R489) : transpalettes et préparateurs à levée basse, gerbeurs au-delà de 1,20 m, série d’entraînement, durée du test et prix médian CPF.',
    h1: 'CACES 1A et 1B : transpalettes et gerbeurs à conducteur porté',
    intro: 'Vingt questions orientées préparation de commandes et gerbage, tirées dans la banque R489 : le test théorique est le même que pour les autres catégories.',
    resume: (h) => `La catégorie 1 de la recommandation R489 regroupe les transpalettes et les gerbeurs à conducteur porté, c’est-à-dire ceux sur lesquels le conducteur monte, debout ou assis. Elle se divise en deux. La catégorie 1A couvre les engins dont la levée ne dépasse pas 1,20 m : transpalette électrique à plateforme, préparateur de commandes au sol. La catégorie 1B couvre les gerbeurs qui lèvent plus haut que 1,20 m. Un titulaire de la 1B peut aussi être autorisé sur un engin de la 1A. Le test théorique est commun à toute la R489 et compte 100 questions ; seul le test pratique change, d’une durée de ${h.num(h.P.recos.r489.ut['1A'], 2)} unité de test en 1A et ${h.num(h.P.recos.r489.ut['1B'], 2)} en 1B. Au ${h.cpfDate}, la formation initiale médiane coûte ${h.med('r489', '1A')} en 1A et ${h.med('r489', '1B')} en 1B au catalogue Mon Compte Formation. Les transpalettes à timon, conduits à pied, ne relèvent pas de la R489 mais de la R485 ou d’une simple formation.`,
    faqs: (h) => [
      { q: 'Faut-il un CACES pour un transpalette électrique ?', a: 'Pas toujours. Un transpalette sur lequel le conducteur monte relève du CACES R489 catégorie 1A. Un transpalette conduit à pied, au timon, avec une levée de 1,20 m au plus, ne demande pas de CACES : l’employeur forme et autorise lui-même, et un CACES R485 permet aussi de l’autoriser.' },
      { q: 'Quelle différence entre le CACES 1A et le CACES 1B ?', a: 'La hauteur de levée : 1,20 m au plus en 1A, au-delà en 1B. La 1B couvre donc les gerbeurs qui stockent en hauteur, avec les risques de chute de charge et d’instabilité qui vont avec. Son test pratique dure un peu plus longtemps, et un titulaire de la 1B peut conduire un engin de la 1A.' },
      { q: 'Un gerbeur à double fourche demande-t-il une formation de plus ?', a: 'Oui. Pour le gerbeur à double fourche à conducteur porté, la recommandation demande, en plus du CACES 1B, une formation complémentaire sur la lecture du tableau de charges, parce que la charge se répartit sur deux niveaux de fourches. L’employeur en tient compte avant de délivrer l’autorisation de conduite.' },
      { q: 'Combien coûte un CACES 1A ou 1B ?', a: `Au ${h.cpfDate}, le prix médian des offres du catalogue Mon Compte Formation est de ${h.med('r489', '1A')} en 1A et de ${h.med('r489', '1B')} en 1B, pour une durée médiane de ${h.hrs('r489', '1A')}. Une offre peut regrouper plusieurs catégories ; son prix est alors celui de l’ensemble.` },
    ],
    body: (h) => `
<h2>Quel engin pour quelle catégorie</h2>
${h.table(['Engin', 'Catégorie', 'Remarque'], [['Transpalette électrique à plateforme, debout ou assis', '1A', 'Couvert aussi par la 1B'], ['Préparateur de commandes au sol, levée jusqu’à 1,20 m', '1A', 'Couvert aussi par la 1B'], ['Préparateur à poste élevable, plancher jusqu’à 1,20 m', '1A', 'Formation complémentaire sur l’élévation de personnes'], ['Gerbeur à conducteur porté, levée au-delà de 1,20 m', '1B', ''], ['Gerbeur à double fourche à conducteur porté', '1B', 'Formation complémentaire sur le tableau de charges'], ['Transpalette ou gerbeur à timon, conduit à pied', 'Hors R489', 'Voir R485 ou formation par l’employeur']], 'Annexe 1 des recommandations R.489A et R.485A.', ['l', 'l', 'l'])}
<p>La frontière entre 1A et 1B tient donc à la hauteur de levée, et celle entre R489 et R485 à la position du conducteur : porté sur l’engin ou marchant à côté. La page ${h.a('caces-r485', 'CACES R485')} traite des gerbeurs accompagnants.</p>
<h2>Les prix des deux catégories</h2>
${h.table(['Catégorie', 'Prix médian initial', 'Durée médiane', 'Recyclage médian'], [['1A', h.med('r489', '1A'), h.hrs('r489', '1A'), h.med('r489', '1A', 'rec')], ['1B', h.med('r489', '1B'), h.hrs('r489', '1B'), h.med('r489', '1B', 'rec')]], `Offres du catalogue Mon Compte Formation au ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r', 'r'])}
<!--tool:mini:ut-r489-->
<h2>Ce que le test théorique demande au préparateur</h2>
<p>Le préparateur de commandes passe le même test que le cariste d’un chariot frontal : il doit donc lire une plaque de charge, connaître la stabilité d’un engin en charge et les règles de circulation dans l’entrepôt. La série ci-dessus met en avant les questions sur la palette, le gerbage et la préparation, puis complète avec le reste de la banque. Pour s’entraîner dans les conditions du jour, passez ensuite à l’${h.a('examen-blanc', 'examen blanc R489')}.</p>`,
  },
  en: {
    slug: 'caces-1a-1b',
    nav: 'CACES 1A and 1B: pallet trucks, stackers',
    card: 'Ride-on pallet truck or stacker: the difference between 1A and 1B, the test and the median price.',
    title: 'CACES 1A and 1B: pallet truck, stacker and theory test',
    description: 'CACES 1A and 1B (R489): low-lift pallet trucks and order pickers, stackers lifting above 1.20 m, a practice set, practical test length and median CPF prices.',
    h1: 'CACES 1A and 1B: ride-on pallet trucks and stackers',
    intro: 'Twenty questions geared to order picking and stacking, drawn from the R489 bank: the theory test is the same as for the other categories.',
    resume: (h) => `Category 1 of recommendation R489 covers ride-on pallet trucks and stackers, those the operator stands or sits on. It is split in two. Category 1A covers machines lifting no higher than 1.20 m: electric pallet trucks with a platform, low-level order pickers. Category 1B covers stackers lifting above 1.20 m. A 1B holder can also be authorised on a 1A machine. The theory test is shared by all of R489 and has 100 questions; only the practical test changes, lasting ${h.num(h.P.recos.r489.ut['1A'], 2)} test unit in 1A and ${h.num(h.P.recos.r489.ut['1B'], 2)} in 1B. As of ${h.cpfDate}, the median initial course costs ${h.med('r489', '1A')} for 1A and ${h.med('r489', '1B')} for 1B in the Mon Compte Formation catalogue. Pedestrian pallet trucks, driven on foot with a tiller, are not covered by R489 but by R485 or by simple in-house training.`,
    faqs: (h) => [
      { q: 'Do I need a CACES for an electric pallet truck?', a: 'Not always. A pallet truck the operator rides on falls under the R489 CACES category 1A. A pedestrian pallet truck, steered with a tiller and lifting 1.20 m at most, needs no CACES: the employer trains and authorises the operator directly, and an R485 CACES can also be used for that authorisation.' },
      { q: 'What is the difference between CACES 1A and 1B?', a: 'Lift height: 1.20 m at most for 1A, above that for 1B. Category 1B therefore covers stackers storing at height, with the risks of falling loads and instability that come with it. Its practical test lasts slightly longer, and a 1B holder can operate a 1A machine.' },
      { q: 'Does a double-deck stacker need extra training?', a: 'Yes. For a ride-on double-deck stacker, the recommendation requires, on top of the 1B CACES, extra training on reading the load chart, because the load is spread across two sets of forks. The employer takes it into account before issuing the operating authorisation.' },
      { q: 'How much does a 1A or 1B CACES cost?', a: `As of ${h.cpfDate}, the median price of Mon Compte Formation catalogue offers is ${h.med('r489', '1A')} for 1A and ${h.med('r489', '1B')} for 1B, for a median length of ${h.hrs('r489', '1A')}. One offer may bundle several categories; its price is then that of the whole course.` },
    ],
    body: (h) => `
<h2>Which machine for which category</h2>
${h.table(['Machine', 'Category', 'Note'], [['Electric pallet truck with platform, standing or seated', '1A', 'Also covered by 1B'], ['Low-level order picker, lift up to 1.20 m', '1A', 'Also covered by 1B'], ['Order picker with raising platform, floor up to 1.20 m', '1A', 'Extra training on lifting people'], ['Ride-on stacker, lift above 1.20 m', '1B', ''], ['Ride-on double-deck stacker', '1B', 'Extra training on the load chart'], ['Pedestrian pallet truck or stacker with tiller', 'Not R489', 'See R485 or employer training']], 'Annex 1 of recommendations R.489A and R.485A.', ['l', 'l', 'l'])}
<p>The line between 1A and 1B is lift height, and the line between R489 and R485 is where the operator stands: riding the machine or walking beside it. The ${h.a('caces-r485', 'R485 CACES page')} covers pedestrian stackers.</p>
<h2>Prices for the two categories</h2>
${h.table(['Category', 'Median initial price', 'Median length', 'Median refresher'], [['1A', h.med('r489', '1A'), h.hrs('r489', '1A'), h.med('r489', '1A', 'rec')], ['1B', h.med('r489', '1B'), h.hrs('r489', '1B'), h.med('r489', '1B', 'rec')]], `Mon Compte Formation catalogue offers on ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r', 'r'])}
<!--tool:mini:ut-r489-->
<h2>What the theory test asks of an order picker</h2>
<p>An order picker sits the same test as a counterbalance forklift driver: they must read a capacity plate, know how a loaded machine stays stable and follow warehouse traffic rules. The set above puts forward questions on pallets, stacking and picking, then fills up from the rest of the bank. To practise in test-day conditions, move on to the ${h.a('examen-blanc', 'R489 mock exam')}.</p>`,
  },
});
