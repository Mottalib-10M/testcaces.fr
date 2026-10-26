import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-5',
  group: 'categories',
  order: 40,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', match: 'rétractable|mât|rayonnage|grande hauteur', size: 20 } },
  mini: { kind: 'mini:plaque' },
  related: ['caces-r489', 'caces-3', 'abaque-de-charge', 'stabilite-chariot', 'caces-prix', 'examen-blanc'],
  sources: ['r489', 'cdc_catalogue'],
  fr: {
    slug: 'caces-5',
    nav: 'CACES 5 : chariot à mât rétractable',
    card: 'Le chariot à mât rétractable des allées de rayonnage : série ciblée, stockage en hauteur, prix médian.',
    title: 'CACES 5 : chariot à mât rétractable, test et rayonnage',
    description: 'CACES 5 (R489) : chariot à mât rétractable et à prise latérale, stockage en grande hauteur, série d’entraînement ciblée, durée du test et prix médian CPF.',
    h1: 'CACES 5 : le chariot à mât rétractable',
    intro: 'Vingt questions orientées stockage en hauteur, mât rétractable et plaque de charge, tirées dans la banque R489.',
    resume: (h) => `La catégorie 5 de la recommandation R489 couvre les chariots élévateurs à mât rétractable, dont le mât avance pour prendre la charge puis recule entre les longerons pour la transporter, ainsi que les chariots à prise latérale, qui charge sur un côté. C’est l’engin des entrepôts à rayonnages hauts et des allées étroites, où un chariot frontal ne pourrait pas tourner. Les chariots bi ou tri-directionnels à poste non élevable en relèvent aussi, avec une formation complémentaire. Le CACES 5 se compose du test théorique R489, le même que pour les autres catégories, et d’un test pratique de ${h.num(h.P.recos.r489.ut['5'], 2)} unité de test. Il vaut ${h.years('r489')} ans. Au ${h.cpfDate}, la formation initiale médiane coûte ${h.med('r489', '5')} au catalogue Mon Compte Formation, pour une durée médiane de ${h.hrs('r489', '5')}. La lecture de la plaque de charge y pèse davantage qu’ailleurs, car la capacité baisse vite avec la hauteur de levée.`,
    faqs: (h) => [
      { q: 'Peut-on passer le CACES 5 sans le CACES 3 ?', a: 'Oui. Les catégories sont indépendantes : aucune n’est un préalable à une autre. Beaucoup de candidats passent pourtant les deux ensemble, parce que les entrepôts emploient souvent des chariots frontaux sur les quais et des chariots à mât rétractable dans les allées. Le test théorique commun ne se passe alors qu’une fois.' },
      { q: 'Pourquoi la capacité baisse-t-elle autant en hauteur sur un chariot à mât rétractable ?', a: 'Parce qu’en hauteur, le mât fléchit, la charge oscille et la moindre inclinaison déplace le centre de gravité. Le constructeur réduit donc la capacité au-delà d’une certaine hauteur, et la plaque l’indique palier par palier. Le mini-outil de cette page lit une plaque fictive de chariot à mât rétractable.' },
      { q: 'Un chariot tri-directionnel relève-t-il du CACES 5 ?', a: 'Oui, s’il a un poste de conduite qui ne s’élève pas, mais la recommandation demande en plus une formation complémentaire sur les allées étroites et l’équipement bi ou tri-directionnel. Si le poste de conduite monte avec la charge, il s’agit d’un chariot combi, qui relève de la catégorie 6.' },
      { q: 'Combien coûte le CACES 5 ?', a: `Au ${h.cpfDate}, le prix médian des offres de formation initiale est de ${h.med('r489', '5')} au catalogue Mon Compte Formation, et celui du recyclage de ${h.med('r489', '5', 'rec')}. Un stage couplé avec la catégorie 3 est souvent proposé, à un prix qui couvre les deux catégories.` },
    ],
    body: (h) => `
<h2>Les engins de la catégorie 5, et ceux qui n’en sont pas</h2>
${h.table(['Engin', 'Catégorie R489', 'Remarque'], [['Chariot à mât rétractable', '5', ''], ['Chariot à prise latérale, qui charge sur un côté', '5', ''], ['Chariot bi ou tri-directionnel, poste non élevable', '5', 'Formation complémentaire'], ['Chariot combi, poste élevable', '6', 'Formation complémentaire'], ['Chariot frontal en porte-à-faux, jusqu’à 6 t', '3', '']], 'Annexe 1 de la recommandation R.489A.', ['l', 'l', 'l'])}
<h2>La hauteur, premier risque de la catégorie</h2>
<p>Au-delà de quelques mètres, une charge mal posée ou un choc contre une lisse peut faire tomber la palette ou des colis sur un piéton dans l’allée. Le cariste vérifie la capacité de la plaque à la hauteur visée, l’état de l’alvéole, et lève puis descend au pas, mât vertical. La circulation se fait charge basse, mât rentré. Ces gestes sont notés à l’épreuve pratique et reviennent dans le thème exploitation du test théorique, qui vaut ${h.pts('r489', 'expl')} points.</p>
<!--tool:mini:ut-r489-->
${h.table(['Catégorie', 'Prix médian initial', 'Durée médiane', 'Recyclage médian'], [['5', h.med('r489', '5'), h.hrs('r489', '5'), h.med('r489', '5', 'rec')], ['6', h.med('r489', '6'), h.hrs('r489', '6'), h.med('r489', '6', 'rec')]], `Offres Mon Compte Formation au ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r', 'r'])}
<p>Pour la méthode de lecture de plaque, voyez ${h.a('abaque-de-charge', 'l’abaque de charge')} ; pour le chariot frontal, la page ${h.a('caces-3', 'CACES 3')}.</p>`,
  },
  en: {
    slug: 'caces-5-reach-truck',
    nav: 'CACES 5: reach truck',
    card: 'The reach truck of racking aisles: a targeted set, high-level storage and the median price.',
    title: 'CACES 5: reach truck, theory test and high-level racking',
    description: 'CACES 5 (R489): reach trucks and single-side loaders, high-level storage, a targeted practice set, the practical test length and the median CPF course price.',
    h1: 'CACES 5: the reach truck',
    intro: 'Twenty questions geared to high-level storage, the reach mast and the capacity plate, drawn from the R489 bank.',
    resume: (h) => `Category 5 of recommendation R489 covers reach trucks, whose mast moves forward to pick up the load and back between the outriggers to carry it, as well as single-side loaders. It is the machine of high-racking warehouses and narrow aisles, where a counterbalance truck could not turn. Multi-directional and turret trucks with a fixed operator position also fall under it, with extra training. The CACES 5 is made of the R489 theory test, the same as for the other categories, and a practical test of ${h.num(h.P.recos.r489.ut['5'], 2)} test unit. It is valid for ${h.years('r489')} years. As of ${h.cpfDate}, the median initial course costs ${h.med('r489', '5')} in the Mon Compte Formation catalogue, for a median length of ${h.hrs('r489', '5')}. Reading the capacity plate weighs more here than elsewhere, as capacity drops quickly with lift height.`,
    faqs: (h) => [
      { q: 'Can I take the CACES 5 without the CACES 3?', a: 'Yes. Categories are independent: none is a prerequisite for another. Many candidates still take both together, because warehouses often use counterbalance trucks on the docks and reach trucks in the aisles. The shared theory test is then sat only once, and both categories end on dates worked out from the same rules.' },
      { q: 'Why does a reach truck lose so much capacity at height?', a: 'Because at height the mast bends, the load sways and the slightest tilt moves the centre of gravity. The manufacturer therefore reduces capacity above a certain height, and the plate shows it step by step. The small tool on this page reads a fictitious reach truck plate.' },
      { q: 'Is a turret truck covered by the CACES 5?', a: 'Yes, if its operator position does not rise, but the recommendation also requires extra training on narrow aisles and multi-directional equipment. If the cab rises with the load, it is a combi truck, which falls under category 6, also with extra narrow-aisle training.' },
      { q: 'How much does the CACES 5 cost?', a: `As of ${h.cpfDate}, the median price of initial course offers is ${h.med('r489', '5')} in the Mon Compte Formation catalogue, and ${h.med('r489', '5', 'rec')} for a refresher. A course combined with category 3 is often offered, at a price covering both categories.` },
    ],
    body: (h) => `
<h2>Category 5 machines, and those that are not</h2>
${h.table(['Machine', 'R489 category', 'Note'], [['Reach truck', '5', ''], ['Single-side loader', '5', ''], ['Multi-directional or turret truck, fixed cab', '5', 'Extra training'], ['Combi truck, rising cab', '6', 'Extra training'], ['Counterbalance truck, up to 6 t', '3', '']], 'Annex 1 of recommendation R.489A.', ['l', 'l', 'l'])}
<h2>Height, the first risk of the category</h2>
<p>Above a few metres, a badly placed load or a knock against a beam can drop the pallet or parcels on a pedestrian in the aisle. The driver checks the plate capacity at the target height and the state of the slot, then lifts and lowers slowly with the mast upright. Travel is done with the load low and the mast retracted. These moves are marked in the practical test and come back in the operation theme of the theory test, worth ${h.pts('r489', 'expl')} points.</p>
<!--tool:mini:ut-r489-->
${h.table(['Category', 'Median initial price', 'Median length', 'Median refresher'], [['5', h.med('r489', '5'), h.hrs('r489', '5'), h.med('r489', '5', 'rec')], ['6', h.med('r489', '6'), h.hrs('r489', '6'), h.med('r489', '6', 'rec')]], `Mon Compte Formation offers on ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r', 'r'])}
<p>Category 5 courses are also where trainers spend the most time on the pick-up and set-down sequence at height: approach square to the rack, stop, raise, extend the mast, lower onto the beam, retract, then lower the forks before moving off. The theory test asks about each step and why it comes in that order.</p>
<p>For the plate-reading method, see the ${h.a('abaque-de-charge', 'load chart page')}; for the counterbalance truck, the ${h.a('caces-3', 'CACES 3 page')}.</p>`,
  },
});
