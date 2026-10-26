import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-telescopique',
  group: 'categories',
  order: 55,
  tool: { kind: 'quiz', props: { reco: 'r482', mode: 'practice', match: 'télescopique|T1|tout-terrain|flèche|portée', size: 20 } },
  mini: { kind: 'mini:r482cat' },
  related: ['caces-r482', 'caces-chariot-elevateur', 'abaque-de-charge', 'stabilite-chariot', 'caces-prix'],
  sources: ['r482', 'cdc_catalogue'],
  fr: {
    slug: 'caces-telescopique',
    nav: 'CACES télescopique : R482 catégorie F',
    card: 'Le chariot télescopique relève de la R482 catégorie F : série ciblée, abaque de portée et prix médian.',
    title: 'CACES télescopique : R482 catégorie F, test et abaque',
    description: 'CACES télescopique : le chariot télescopique relève de la R482 catégorie F, valable 10 ans. Série ciblée, abaque de portée, durée du test et prix médian.',
    h1: 'CACES télescopique : la catégorie F de la R482',
    intro: 'Vingt questions centrées sur le chariot télescopique, sa flèche, ses stabilisateurs et son abaque de portée, tirées dans la banque R482.',
    resume: (h) => `Le chariot télescopique, souvent appelé manitou du nom d’un fabricant, ne relève pas de la recommandation des chariots d’entrepôt mais de la R482, celle des engins de chantier, en catégorie F. Cette catégorie couvre aussi les chariots à mât tout-terrain. Le CACES F vaut donc ${h.years('r482')} ans, comme tous les CACES R482, et son test théorique est celui de la R482 : ${h.P.test.questions} questions, dont ${h.pts('r482', 'tech')} points de technologie et stabilité et ${h.pts('r482', 'circ')} points de circulation. Le test pratique dure ${h.num(h.P.recos.r482.ut.F)} unité de test. Au ${h.cpfDate}, la formation initiale médiane en catégorie F coûte ${h.med('r482', 'F')} au catalogue Mon Compte Formation, pour une durée médiane de ${h.hrs('r482', 'F')}. Ce qui distingue cet engin, c’est l’abaque de charge : la capacité dépend à la fois de la hauteur et de la portée de la flèche, et de l’usage ou non des stabilisateurs.`,
    faqs: (h) => [
      { q: 'Le CACES 3 suffit-il pour un chariot télescopique ?', a: 'Non. Le chariot télescopique relève de la R482 catégorie F, pas de la R489. Un cariste titulaire du CACES R489 catégorie 3 doit donc passer le CACES R482 F, test théorique compris, puisque les deux recommandations n’ont pas le même barème. L’inverse vaut aussi : le CACES F ne couvre pas les chariots frontaux d’entrepôt.' },
      { q: 'Un chariot télescopique rotatif relève-t-il de la catégorie F ?', a: 'Le chariot télescopique rotatif, dont la tourelle pivote, peut servir d’engin de levage ou de nacelle selon ses équipements. La recommandation R482 traite le chariot télescopique ; pour un usage en levage de personnes avec nacelle, la recommandation des nacelles et la notice du constructeur s’appliquent en plus. L’employeur précise les usages dans l’autorisation.' },
      { q: 'Combien coûte le CACES télescopique ?', a: `Au ${h.cpfDate}, le prix médian des offres de formation initiale en catégorie F est de ${h.med('r482', 'F')}, et celui du recyclage de ${h.med('r482', 'F', 'rec')}, au catalogue Mon Compte Formation. Il vaut ${h.years('r482')} ans, ce qui ramène le coût annuel en dessous de celui d’un CACES de chariot d’entrepôt.` },
      { q: 'Qu’est-ce que l’abaque d’un chariot télescopique ?', a: 'C’est un diagramme qui donne la charge maximale selon la hauteur de levée et la portée, c’est-à-dire la distance horizontale entre la charge et l’engin. Les courbes changent selon que les stabilisateurs sont posés ou non. La série de cette page contient des questions sur une plaque fictive de ce type, repérée T1.' },
    ],
    body: (h) => `
<h2>Chariot télescopique et chariot frontal : deux CACES différents</h2>
${h.table(['', 'Chariot frontal', 'Chariot télescopique'], [['Recommandation', 'R489, catégorie 3 ou 4', 'R482, catégorie F'], ['Validité', `${h.years('r489')} ans`, `${h.years('r482')} ans`], ['Thèmes du test théorique', `${h.P.recos.r489.themes}`, `${h.P.recos.r482.themes}`], ['Lecture de charge', 'Plaque : hauteur et centre de gravité', 'Abaque : hauteur et portée, avec ou sans stabilisateurs'], ['Prix médian initial', h.med('r489', '3'), h.med('r482', 'F')]], `Recommandations R.489A et R.482B ; offres Mon Compte Formation au ${h.cpfDate}.`, ['l', 'l', 'l'])}
<h2>Les risques propres au télescopique</h2>
<p>Le renversement vers l’avant est le premier danger : en sortant la flèche, la charge s’éloigne et le moment de renversement augmente, même sans lever plus haut. Les engins récents coupent les mouvements aggravants quand la limite approche, mais ce dispositif ne dispense pas de lire l’abaque avant la manœuvre. Le terrain compte aussi : un sol meuble ou en pente déplace le centre de gravité, d’où la règle de travailler sur un sol plan et portant, stabilisateurs posés si l’engin en a.</p>
${h.items('r482', 'tech')}
<!--tool:mini:ut-r482-->
<p>La lecture d’un abaque suit la même logique que celle d’une plaque de chariot frontal, expliquée sur la page ${h.a('abaque-de-charge', 'abaque de charge')}. Pour l’ensemble des catégories d’engins de chantier, voyez la page ${h.a('caces-r482', 'CACES R482')}.</p>`,
  },
  en: {
    slug: 'telehandler-caces',
    nav: 'Telehandler CACES: R482 category F',
    card: 'The telehandler falls under R482 category F: a targeted set, the outreach chart and the median price.',
    title: 'Telehandler CACES: R482 category F, test and load chart',
    description: 'Telehandler CACES: telehandlers fall under R482 category F, valid for 10 years. A targeted practice set, the outreach load chart and the median price.',
    h1: 'Telehandler CACES: R482 category F',
    intro: 'Twenty questions focused on the telehandler, its boom, its stabilisers and its outreach chart, drawn from the R482 bank.',
    resume: (h) => `The telehandler, often called a manitou in France after one maker, does not fall under the warehouse forklift recommendation but under R482, the construction machinery one, in category F. That category also covers rough-terrain masted forklifts. The category F CACES is therefore valid for ${h.years('r482')} years, like every R482 CACES, and its theory test is the R482 one: ${h.P.test.questions} questions, including ${h.pts('r482', 'tech')} points of technology and stability and ${h.pts('r482', 'circ')} points of traffic. The practical test lasts ${h.num(h.P.recos.r482.ut.F)} test unit. As of ${h.cpfDate}, the median initial category F course costs ${h.med('r482', 'F')} in the Mon Compte Formation catalogue, for a median length of ${h.hrs('r482', 'F')}. What sets this machine apart is the load chart: capacity depends on both the height and the outreach of the boom, and on whether the stabilisers are down.`,
    faqs: (h) => [
      { q: 'Is the CACES 3 enough for a telehandler?', a: 'No. The telehandler falls under R482 category F, not R489. A forklift driver holding the R489 category 3 CACES must therefore take the R482 F CACES, theory test included, since the two recommendations have different marking schemes. The reverse also applies: the F CACES does not cover warehouse counterbalance trucks.' },
      { q: 'Is a rotating telehandler covered by category F?', a: 'A rotating telehandler, whose turret swivels, can be used as a lifting machine or as an aerial platform depending on its attachments. Recommendation R482 covers the telehandler; for lifting people with a basket, the aerial platform recommendation and the manufacturer’s manual apply as well. The employer states the uses in the authorisation.' },
      { q: 'How much does a telehandler CACES cost?', a: `As of ${h.cpfDate}, the median price of initial category F course offers is ${h.med('r482', 'F')}, and ${h.med('r482', 'F', 'rec')} for a refresher, in the Mon Compte Formation catalogue. It is valid for ${h.years('r482')} years, which brings the yearly cost below that of a warehouse forklift CACES.` },
      { q: 'What is a telehandler load chart?', a: 'It is a diagram giving the maximum load by lift height and outreach, the horizontal distance between the load and the machine. The curves change depending on whether the stabilisers are down. The practice set on this page includes questions on a fictitious chart of this kind, labelled T1.' },
    ],
    body: (h) => `
<h2>Counterbalance truck and telehandler: two different CACES</h2>
${h.table(['', 'Counterbalance truck', 'Telehandler'], [['Recommendation', 'R489, category 3 or 4', 'R482, category F'], ['Validity', `${h.years('r489')} years`, `${h.years('r482')} years`], ['Theory test themes', `${h.P.recos.r489.themes}`, `${h.P.recos.r482.themes}`], ['Reading capacity', 'Plate: height and load centre', 'Chart: height and outreach, with or without stabilisers'], ['Median initial price', h.med('r489', '3'), h.med('r482', 'F')]], `Recommendations R.489A and R.482B; Mon Compte Formation offers on ${h.cpfDate}.`, ['l', 'l', 'l'])}
<h2>Risks specific to the telehandler</h2>
<p>Tipping forwards is the first danger: as the boom extends, the load moves away and the overturning moment grows, even without lifting higher. Recent machines cut aggravating movements as the limit approaches, but that device does not replace reading the chart before the manoeuvre. Ground matters too: soft or sloping ground shifts the centre of gravity, hence the rule of working on level, firm ground, with stabilisers down where fitted.</p>
${h.items('r482', 'tech')}
<!--tool:mini:ut-r482-->
<p>Reading a chart follows the same logic as reading a counterbalance truck plate, explained on the ${h.a('abaque-de-charge', 'load chart page')}. For every construction machinery category, see the ${h.a('caces-r482', 'R482 CACES page')}.</p>`,
  },
});
