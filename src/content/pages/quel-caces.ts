import { definePage } from '../../lib/guide-types';
import { ENGINS } from '../../data/engins';

const hors = ENGINS.filter((e) => !e.reco).length;

export default definePage({
  id: 'quel-caces',
  group: 'pratique',
  order: 10,
  tool: { kind: 'finder', props: { start: 'telescopique' } },
  mini: { kind: 'mini:r482cat' },
  related: ['caces-chariot-elevateur', 'caces-r482', 'caces-r486', 'caces-r490', 'caces-r485', 'caces-prix'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485', 'tableau'],
  fr: {
    slug: 'quel-caces',
    nav: 'Quel CACES pour quel engin ?',
    card: 'De l’engin réel à la bonne recommandation et à la bonne catégorie, avec les formations complémentaires.',
    title: 'CACES par engin : quelle recommandation, quelle catégorie',
    description: 'Quel CACES pour quel engin : choisissez le chariot, l’engin de chantier, la nacelle ou la grue, et obtenez la recommandation, la catégorie et la validité.',
    h1: 'Quel CACES pour quel engin ?',
    intro: 'Choisissez la famille puis l’engin : l’outil donne la recommandation, la catégorie, les autres CACES qui le couvrent et les formations à ajouter.',
    resume: (h) => `Le CACES ne se demande pas en général : il se passe pour une recommandation et une catégorie précises, qui dépendent de l’engin. Un chariot télescopique relève de la R482 catégorie F et non de la R489, une nacelle articulée de la R486 catégorie B, une grue sur camion de la R490, un gerbeur conduit à pied de la R485. Se tromper coûte une formation inutile : au ${h.cpfDate}, le prix médian d’une formation initiale va de ${h.med('r485', '1')} pour un gerbeur accompagnant à ${h.med('r482', 'A')} pour les engins compacts de chantier, au catalogue Mon Compte Formation. L’outil ci-dessus classe ${ENGINS.length} engins courants d’après l’annexe 1 de chaque recommandation, dont ${hors} qui ne relèvent d’aucun CACES de ce site : grues mobiles, grues à tour, ponts roulants, ou engins de chantier sans catégorie comme les finisseurs. Pour certains engins, la recommandation exige une formation complémentaire en plus du CACES, par exemple sur les allées étroites ; l’outil la signale.`,
    faqs: (h) => [
      { q: 'Un même engin peut-il relever de deux CACES ?', a: 'Oui, dans quelques cas. Un transpalette à conducteur porté relève de la catégorie 1A de la R489, mais un titulaire de la catégorie 1B peut aussi être autorisé à le conduire. Un transpalette à timon ne demande aucun CACES, mais un CACES R485 permet d’en autoriser la conduite. L’outil indique ces équivalences.' },
      { q: 'Quel CACES pour conduire un manitou ?', a: 'Le chariot télescopique, souvent appelé manitou, relève de la recommandation R482 catégorie F, celle des engins de chantier, et non du CACES cariste R489. Le CACES F vaut dix ans. Si la machine est rotative et équipée d’une nacelle, l’employeur vérifie en plus les règles propres au levage de personnes.' },
      { q: 'Quel CACES pour une mini-pelle ?', a: 'La mini-pelle jusqu’à 6 tonnes relève de la catégorie A de la R482, qui couvre les engins compacts. Au-delà de 6 tonnes, une pelle hydraulique relève de la catégorie B1. La même catégorie A couvre aussi les mini-chargeuses, les petits dumpers et les petits compacteurs, ce qui en fait la catégorie de chantier la plus polyvalente.' },
      { q: 'Que faire si mon engin n’est pas dans la liste ?', a: 'Regardez la plaque du constructeur et la notice : elles indiquent le type d’engin et sa capacité, qui suffisent souvent à trouver la catégorie dans l’annexe 1 de la recommandation. Si l’engin ne relève d’aucune catégorie, l’employeur organise une formation adaptée et évalue lui-même le conducteur avant l’autorisation.' },
    ],
    body: (h) => `
<h2>Les cinq recommandations en un tableau</h2>
${h.table(['Famille', 'Recommandation', 'Catégories', 'Validité'], [['Chariots à conducteur porté', 'R489', h.P.recos.r489.cats.join(', '), `${h.years('r489')} ans`], ['Gerbeurs à conducteur accompagnant', 'R485', h.P.recos.r485.cats.join(', '), `${h.years('r485')} ans`], ['Engins de chantier', 'R482', h.P.recos.r482.cats.join(', '), `${h.years('r482')} ans`], ['Plateformes élévatrices (nacelles)', 'R486', h.P.recos.r486.cats.join(', '), `${h.years('r486')} ans`], ['Grues de chargement', 'R490', 'une catégorie, option télécommande', `${h.years('r490')} ans`]], 'Annexe 1 des recommandations R.489A, R.485A, R.482B, R.486B et R.490A.', ['l', 'l', 'l', 'r'])}
<h2>Les pièges les plus fréquents</h2>
<ul>
<li><strong>Télescopique</strong> : R482 catégorie F, pas R489.</li>
<li><strong>Gerbeur</strong> : R489 1B si l’on monte dessus, R485 si l’on marche à côté.</li>
<li><strong>Nacelle sur camion</strong> : R486 catégorie B, même si le camion se conduit avec le permis.</li>
<li><strong>Tracteur agricole sur chantier</strong> : R482 catégorie A jusqu’à 100 chevaux, catégorie E au-delà.</li>
<li><strong>Chariot tri-directionnel</strong> : catégorie 5 ou 6 de la R489, plus une formation complémentaire.</li>
</ul>
<!--tool:mini:r489cat-->
<h2>Après le choix de la catégorie</h2>
<p>Une fois la catégorie connue, la page de la recommandation propose un test blanc : ${h.a('caces-r489', 'R489')}, ${h.a('caces-r485', 'R485')}, ${h.a('caces-r482', 'R482')}, ${h.a('caces-r486', 'R486')} ou ${h.a('caces-r490', 'R490')}. La page ${h.a('caces-prix', 'prix du CACES')} compare ensuite les tarifs par catégorie et par région.</p>`,
  },
  en: {
    slug: 'which-caces',
    nav: 'Which CACES for which machine?',
    card: 'From the actual machine to the right recommendation and category, with any extra training required.',
    title: 'CACES by machine: which recommendation and which category',
    description: 'Which CACES for which machine: pick the forklift, construction machine, aerial lift or crane and get the recommendation, the category and the validity.',
    h1: 'Which CACES for which machine?',
    intro: 'Pick the family, then the machine: the tool gives the recommendation, the category, other CACES that cover it and any training to add.',
    resume: (h) => `You never take a CACES in general: you take it for a specific recommendation and category, which depend on the machine. A telehandler falls under R482 category F, not R489; an articulated boom lift under R486 category B; a lorry-mounted crane under R490; a pedestrian stacker under R485. Getting it wrong means paying for a useless course: as of ${h.cpfDate}, the median initial course ranges from ${h.med('r485', '1')} for a pedestrian stacker to ${h.med('r482', 'A')} for compact construction machines in the Mon Compte Formation catalogue. The tool above sorts ${ENGINS.length} common machines according to annex 1 of each recommendation, including ${hors} that fall under none of this site’s CACES: mobile cranes, tower cranes, overhead cranes, or construction machines with no category such as pavers. For some machines, the recommendation requires extra training on top of the CACES, for example for narrow aisles; the tool flags it.`,
    faqs: (h) => [
      { q: 'Can one machine fall under two CACES?', a: 'Yes, in a few cases. A ride-on pallet truck falls under R489 category 1A, but a category 1B holder can also be authorised to drive it. A pedestrian pallet truck needs no CACES, but an R485 CACES can be used to authorise its operation. The tool shows these equivalences.' },
      { q: 'Which CACES do I need for a telehandler?', a: 'The telehandler falls under recommendation R482 category F, the construction machinery one, not the R489 forklift CACES. The category F CACES is valid for ten years. If the machine rotates and carries a personnel basket, the employer also checks the rules specific to lifting people.' },
      { q: 'Which CACES do I need for a mini excavator?', a: 'A mini excavator up to 6 tonnes falls under R482 category A, which covers compact machines. Above 6 tonnes, a hydraulic excavator falls under category B1. The same category A also covers compact loaders, small dumpers and small compactors, which makes it the most versatile construction category.' },
      { q: 'What if my machine is not in the list?', a: 'Look at the maker’s plate and the manual: they give the type of machine and its capacity, which is often enough to find the category in annex 1 of the recommendation. If the machine fits no category, the employer arranges suitable training and assesses the operator before the authorisation.' },
    ],
    body: (h) => `
<h2>The five recommendations in one table</h2>
${h.table(['Family', 'Recommendation', 'Categories', 'Validity'], [['Ride-on industrial trucks', 'R489', h.P.recos.r489.cats.join(', '), `${h.years('r489')} years`], ['Pedestrian-controlled stackers', 'R485', h.P.recos.r485.cats.join(', '), `${h.years('r485')} years`], ['Construction machinery', 'R482', h.P.recos.r482.cats.join(', '), `${h.years('r482')} years`], ['Mobile elevating work platforms', 'R486', h.P.recos.r486.cats.join(', '), `${h.years('r486')} years`], ['Lorry loader cranes', 'R490', 'one category, remote-control option', `${h.years('r490')} years`]], 'Annex 1 of recommendations R.489A, R.485A, R.482B, R.486B and R.490A.', ['l', 'l', 'l', 'r'])}
<h2>The most common traps</h2>
<ul>
<li><strong>Telehandler</strong>: R482 category F, not R489.</li>
<li><strong>Stacker</strong>: R489 1B if you ride it, R485 if you walk beside it.</li>
<li><strong>Truck-mounted lift</strong>: R486 category B, even though the truck is driven on a road licence.</li>
<li><strong>Farm tractor on site</strong>: R482 category A up to 100 hp, category E above.</li>
<li><strong>Turret truck</strong>: R489 category 5 or 6, plus extra training.</li>
</ul>
<!--tool:mini:r489cat-->
<h2>Once the category is chosen</h2>
<p>Once you know the category, the recommendation page offers a mock test: ${h.a('caces-r489', 'R489')}, ${h.a('caces-r485', 'R485')}, ${h.a('caces-r482', 'R482')}, ${h.a('caces-r486', 'R486')} or ${h.a('caces-r490', 'R490')}. The ${h.a('caces-prix', 'CACES price page')} then compares rates by category and region.</p>`,
  },
});
