import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-3',
  group: 'categories',
  order: 30,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', match: 'frontal|porte-à-faux|contrepoids|P1', size: 20 } },
  mini: { kind: 'mini:plaque' },
  related: ['caces-r489', 'caces-5', 'caces-chariot-elevateur', 'abaque-de-charge', 'stabilite-chariot', 'caces-prix'],
  sources: ['r489', 'cdc_catalogue'],
  fr: {
    slug: 'caces-3',
    nav: 'CACES 3 : chariot frontal',
    card: 'Le chariot élévateur frontal jusqu’à 6 tonnes : série ciblée, plaque de charge, durée du test et prix médian.',
    title: 'CACES 3 : chariot élévateur frontal, test et prix médian',
    description: 'CACES 3 (R489) : chariot élévateur frontal jusqu’à 6 tonnes, série d’entraînement ciblée, lecture de la plaque de charge, durée du test et prix médian CPF.',
    h1: 'CACES 3 : le chariot élévateur frontal jusqu’à 6 tonnes',
    intro: 'Vingt questions centrées sur le chariot frontal, son contrepoids et sa plaque de charge, tirées dans la banque R489.',
    resume: (h) => `La catégorie 3 de la recommandation R489 couvre les chariots élévateurs frontaux en porte-à-faux dont la capacité nominale ne dépasse pas 6 tonnes. C’est le chariot le plus courant des entrepôts, des quais et des ateliers : la charge est portée en avant des roues avant, équilibrée par un contrepoids à l’arrière, d’où le terme de porte-à-faux. Au-delà de 6 tonnes, le même type de chariot relève de la catégorie 4. Le CACES 3 se compose du test théorique R489, commun à toutes les catégories, et d’un test pratique d’une durée de ${h.num(h.P.recos.r489.ut['3'])} unité de test sur un chariot de la catégorie. Il vaut ${h.years('r489')} ans. C’est aussi la catégorie la plus proposée au catalogue Mon Compte Formation, avec ${h.num(h.offers('r489', '3'))} offres de formation initiale au ${h.cpfDate}, pour un prix médian de ${h.med('r489', '3')} et une durée médiane de ${h.hrs('r489', '3')}.`,
    faqs: (h) => [
      { q: 'Le CACES 3 permet-il de conduire un chariot de 8 tonnes ?', a: 'Non. La catégorie 3 s’arrête à 6 tonnes de capacité nominale. Un chariot frontal plus lourd relève de la catégorie 4, avec son propre test pratique. Le test théorique, lui, reste le même : si vous l’avez réussi depuis moins de 12 mois, seule la pratique de la catégorie 4 est à passer.' },
      { q: 'Un chariot frontal thermique et un chariot électrique relèvent-ils de la même catégorie ?', a: 'Oui. La catégorie dépend du type de chariot et de sa capacité, pas de son énergie. Un chariot frontal diesel, gaz ou électrique de 2,5 tonnes relève de la catégorie 3. Le test théorique porte en revanche sur les risques propres à chaque énergie, comme la charge des batteries ou le plein de gaz.' },
      { q: 'Combien coûte le CACES 3 ?', a: `Le prix médian des ${h.num(h.offers('r489', '3'))} offres de formation initiale du catalogue Mon Compte Formation est de ${h.med('r489', '3')} au ${h.cpfDate}, et celui du recyclage de ${h.med('r489', '3', 'rec')}. La moitié des offres se situe dans une fourchette indiquée sur la page des prix, région par région.` },
      { q: 'Le chariot télescopique relève-t-il du CACES 3 ?', a: 'Non. Le chariot télescopique, avec sa flèche qui s’allonge, relève de la recommandation R482 catégorie F, celle des engins de chantier, même quand il sert en entrepôt ou en exploitation agricole. Le chariot à mât tout-terrain relève aussi de cette catégorie F.' },
    ],
    body: (h) => `
<h2>Pourquoi la plaque de charge compte autant en catégorie 3</h2>
<p>Un chariot frontal tient debout grâce à l’équilibre entre sa charge et son contrepoids, autour de l’essieu avant. Plus le centre de gravité de la charge est loin du talon des fourches, plus le levier est grand, et moins le chariot peut lever. Plus il lève haut, plus il se renverse facilement. La plaque de charge indique cette capacité réelle selon la hauteur et le centre de gravité ; le mini-outil ci-dessus la lit sur une plaque fictive de chariot frontal.</p>
${h.table(['Catégorie R489', 'Engin', 'Prix médian initial', 'Recyclage médian'], [['3', 'Frontal en porte-à-faux, jusqu’à 6 t', h.med('r489', '3'), h.med('r489', '3', 'rec')], ['4', 'Frontal en porte-à-faux, plus de 6 t', h.med('r489', '4'), h.med('r489', '4', 'rec')], ['5', 'Mât rétractable', h.med('r489', '5'), h.med('r489', '5', 'rec')]], `Offres Mon Compte Formation au ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'l', 'r', 'r'])}
<h2>Les points du test les plus liés au chariot frontal</h2>
${h.items('r489', 'tech')}
<p>La stabilité et la plaque de charge reviennent dans deux thèmes : technologie et stabilité, sur 25 points, et tableau et abaque de charges, sur 10 points. Les pages ${h.a('stabilite-chariot', 'stabilité du chariot')} et ${h.a('abaque-de-charge', 'abaque de charge')} les détaillent.</p>
<!--tool:mini:ut-r489-->
<p>Beaucoup de caristes passent les catégories 3 et 5 ensemble : la ${h.a('caces-5', 'catégorie 5')} couvre le chariot à mât rétractable des allées de rayonnage.</p>`,
  },
  en: {
    slug: 'caces-3-counterbalance',
    nav: 'CACES 3: counterbalance forklift',
    card: 'The counterbalance forklift up to 6 tonnes: a targeted set, the capacity plate, test length and median price.',
    title: 'CACES 3: counterbalance forklift, test and median price',
    description: 'CACES 3 (R489): counterbalance forklift up to 6 tonnes, a targeted practice set, reading the capacity plate, practical test length and the median CPF price.',
    h1: 'CACES 3: the counterbalance forklift up to 6 tonnes',
    intro: 'Twenty questions focused on the counterbalance forklift, its counterweight and its capacity plate, drawn from the R489 bank.',
    resume: (h) => `Category 3 of recommendation R489 covers counterbalance forklift trucks with a rated capacity of 6 tonnes or less. It is the most common truck in warehouses, loading bays and workshops: the load is carried ahead of the front wheels and balanced by a counterweight at the back. Above 6 tonnes, the same kind of truck falls under category 4. The CACES 3 is made of the R489 theory test, shared by all categories, and a practical test lasting ${h.num(h.P.recos.r489.ut['3'])} test unit on a truck of the category. It is valid for ${h.years('r489')} years. It is also the category most offered in the Mon Compte Formation catalogue, with ${h.num(h.offers('r489', '3'))} initial course offers as of ${h.cpfDate}, at a median price of ${h.med('r489', '3')} and a median length of ${h.hrs('r489', '3')}. The practice set above puts the counterbalance truck first.`,
    faqs: (h) => [
      { q: 'Does the CACES 3 allow me to drive an 8-tonne truck?', a: 'No. Category 3 stops at a rated capacity of 6 tonnes. A heavier counterbalance truck falls under category 4, with its own practical test. The theory test stays the same: if you passed it less than 12 months ago, only the category 4 practical remains.' },
      { q: 'Are diesel and electric counterbalance trucks in the same category?', a: 'Yes. The category depends on the type of truck and its capacity, not its energy. A 2.5-tonne diesel, gas or electric counterbalance truck is category 3. The theory test does however cover the risks specific to each energy, such as charging batteries or changing gas bottles.' },
      { q: 'How much does the CACES 3 cost?', a: `The median price of the ${h.num(h.offers('r489', '3'))} initial course offers in the Mon Compte Formation catalogue is ${h.med('r489', '3')} as of ${h.cpfDate}, and ${h.med('r489', '3', 'rec')} for a refresher. The middle half of offers sits within a range shown on the price page, region by region.` },
      { q: 'Is a telehandler covered by the CACES 3?', a: 'No. A telehandler, with its extending boom, falls under recommendation R482 category F, the construction machinery one, even when used in a warehouse or on a farm. Rough-terrain masted forklifts also belong to that category F, which is valid for ten years instead of five.' },
    ],
    body: (h) => `
<h2>Why the capacity plate matters so much in category 3</h2>
<p>A counterbalance truck stays upright thanks to the balance between its load and its counterweight, around the front axle. The further the load centre is from the fork heel, the longer the lever, and the less the truck can lift. The higher it lifts, the more easily it tips. The capacity plate gives the real capacity by height and load centre; the small tool above reads it on a fictitious counterbalance truck plate.</p>
${h.table(['R489 category', 'Machine', 'Median initial price', 'Median refresher'], [['3', 'Counterbalance, up to 6 t', h.med('r489', '3'), h.med('r489', '3', 'rec')], ['4', 'Counterbalance, above 6 t', h.med('r489', '4'), h.med('r489', '4', 'rec')], ['5', 'Reach truck', h.med('r489', '5'), h.med('r489', '5', 'rec')]], `Mon Compte Formation offers on ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'l', 'r', 'r'])}
<h2>The test points most linked to the counterbalance truck</h2>
${h.items('r489', 'tech')}
<p>Stability and the capacity plate come up in two themes: technology and stability, worth 25 points, and the load chart, worth 10 points. The ${h.a('stabilite-chariot', 'truck stability')} and ${h.a('abaque-de-charge', 'load chart')} pages go into detail.</p>
<!--tool:mini:ut-r489-->
<p>Many drivers take categories 3 and 5 together: ${h.a('caces-5', 'category 5')} covers the reach truck used in racking aisles.</p>`,
  },
});
