import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-nacelle',
  group: 'categories',
  order: 65,
  tool: { kind: 'quiz', props: { reco: 'r486', mode: 'practice', theme: 'expl', size: 20 } },
  mini: { kind: 'mini:pemp' },
  related: ['caces-r486', 'securite-risques', 'fin-de-poste', 'financement', 'recyclage-caces'],
  sources: ['r486', 'ct55', 'cdc_catalogue'],
  fr: {
    slug: 'caces-nacelle',
    nav: 'CACES nacelle : série d’exploitation',
    card: 'Vingt questions d’exploitation de nacelle : coincement, renversement, vent, lignes électriques, secours.',
    title: 'CACES nacelle : questions d’exploitation et catégorie',
    description: 'CACES nacelle : 20 questions sur l’exploitation des PEMP (coincement, vent, sol, lignes électriques, secours), catégorie A ou B et coût de la formation.',
    h1: 'CACES nacelle : s’entraîner sur l’exploitation',
    intro: 'Vingt questions tirées du thème d’exploitation de la R486, le plus lourd du test : 54 points sur 100.',
    resume: (h) => `Le CACES nacelle est le nom courant du CACES R486, qui couvre les plateformes élévatrices mobiles de personnes. Dans son test théorique, le thème d’exploitation vaut à lui seul ${h.pts('r486', 'expl')} points sur 100, et il faut au moins ${h.min('r486', 'expl')} bonnes réponses dans ce thème pour réussir. Il regroupe les situations qui causent les accidents graves : un opérateur coincé entre le garde-corps et une structure en hauteur, une nacelle qui se renverse sur un sol meuble, en pente ou au bord d’une tranchée, un vent qui dépasse la limite inscrite sur la plaque, une approche trop près d’une ligne électrique, ou une personne bloquée en hauteur qu’il faut redescendre avec les commandes de secours. La série ci-dessus tire vingt questions de ce thème, avec la correction après chaque réponse. Pour choisir la catégorie, A pour une élévation verticale ou B pour une élévation multidirectionnelle, le mini-outil part du type de nacelle. Le CACES R486 vaut ${h.years('r486')} ans.`,
    faqs: (h) => [
      { q: 'À partir de quelle vitesse de vent faut-il arrêter une nacelle ?', a: 'La limite est celle que le constructeur inscrit sur la plaque de la nacelle, souvent autour de 12,5 m/s pour les modèles utilisables à l’extérieur ; certaines nacelles sont prévues pour l’intérieur seulement et ne supportent aucun vent. Un anémomètre ou une information météo locale aide à décider, et une rafale compte autant que le vent moyen.' },
      { q: 'Qui peut redescendre une nacelle en cas de malaise de l’opérateur ?', a: 'Une personne restée au sol, formée aux commandes de secours de la nacelle utilisée. C’est pourquoi l’opérateur ne travaille pas seul en hauteur : quelqu’un au sol connaît l’emplacement des commandes de secours et la manœuvre de descente. Les recommandations font de cette organisation des secours une connaissance évaluée au test.' },
      { q: 'Peut-on sortir de la nacelle en hauteur ?', a: 'Non, sauf procédure particulière prévue par l’analyse des risques et la notice, avec un point d’ancrage extérieur. En règle générale, l’opérateur reste dans la plateforme, ne monte pas sur le garde-corps et n’ajoute ni échelle ni escabeau dans le panier pour gagner de la hauteur.' },
      { q: 'Combien de questions d’exploitation faut-il réussir au CACES nacelle ?', a: `Au moins ${h.min('r486', 'expl')} sur ${h.pts('r486', 'expl')}, soit la moitié du thème arrondie, en plus d’un total d’au moins ${h.P.test.passScore} points sur 100. Le thème étant long, un candidat solide l’atteint sans peine ; ce sont les thèmes courts qui font échouer, notamment l’entretien sur ${h.pts('r486', 'maint')} points.` },
    ],
    body: (h) => `
<h2>Le thème d’exploitation, point par point</h2>
${h.items('r486', 'expl')}
<p>Le référentiel de ce thème est long, mais il tourne autour de quatre questions : la nacelle peut-elle se renverser, l’opérateur peut-il tomber ou être écrasé, quelque chose peut-il tomber sur quelqu’un au sol, et comment secourir l’opérateur en hauteur. Chaque question de la série se rattache à l’une d’elles.</p>
<h2>Avant de monter</h2>
<ul>
<li>Vérifier le sol : portance, pente, tranchées, regards, et caler les stabilisateurs sur des plaques de répartition si la nacelle en a.</li>
<li>Baliser la zone au sol pour que personne ne passe sous la plateforme.</li>
<li>Repérer les obstacles en hauteur : poutres, lignes électriques, ponts roulants.</li>
<li>Contrôler le vent par rapport à la limite de la plaque, et la charge admissible dans la plateforme, personnes et outils compris.</li>
</ul>
<!--tool:mini:cpf-->
<h2>Coût et financement</h2>
${h.table(['Catégorie', 'Prix médian initial', 'Recyclage médian'], [['A', h.med('r486', 'A'), h.med('r486', 'A', 'rec')], ['B', h.med('r486', 'B'), h.med('r486', 'B', 'rec')], ['C', h.med('r486', 'C'), h.med('r486', 'C', 'rec')]], `Offres Mon Compte Formation au ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r'])}
<p>Le CACES nacelle se finance par le compte personnel de formation, comme les autres : la page ${h.a('financement', 'financement')} calcule ce qui reste à payer. Pour le barème complet et le test blanc de 100 questions, voyez la page ${h.a('caces-r486', 'CACES R486')}.</p>`,
  },
  en: {
    slug: 'aerial-lift-caces',
    nav: 'Aerial lift CACES: operation set',
    card: 'Twenty aerial lift operation questions: entrapment, tipping, wind, power lines, rescue.',
    title: 'Aerial lift CACES: operation questions and category',
    description: 'Aerial lift CACES: 20 questions on operating MEWPs (entrapment, wind, ground, power lines, rescue), choosing category A or B and the cost of the course.',
    h1: 'Aerial lift CACES: practising operation',
    intro: 'Twenty questions drawn from the R486 operation theme, the heaviest in the test: 54 points out of 100.',
    resume: (h) => `The aerial lift CACES is the common name of the R486 CACES, which covers mobile elevating work platforms. In its theory test, the operation theme alone is worth ${h.pts('r486', 'expl')} points out of 100, and you need at least ${h.min('r486', 'expl')} correct answers in it to pass. It gathers the situations behind serious accidents: an operator trapped between the guardrail and a structure overhead, a platform tipping on soft ground, on a slope or at the edge of a trench, wind above the limit on the plate, getting too close to a power line, or a person stuck at height who has to be brought down with the emergency controls. The set above draws twenty questions from that theme, marked after each answer. To choose the category, A for vertical lift or B for multi-directional lift, the small tool starts from the type of platform. The R486 CACES is valid for ${h.years('r486')} years.`,
    faqs: (h) => [
      { q: 'At what wind speed must an aerial lift stop?', a: 'The limit is the one the manufacturer writes on the platform’s plate, often around 12.5 m/s for models usable outdoors; some platforms are designed for indoor use only and tolerate no wind at all. An anemometer or local weather data helps decide, and a gust counts as much as the average wind.' },
      { q: 'Who can bring a platform down if the operator is taken ill?', a: 'Someone on the ground trained on the emergency controls of the platform in use. That is why the operator does not work alone at height: someone on the ground knows where the emergency controls are and how to lower the basket. The recommendations make this rescue organisation knowledge that the test assesses.' },
      { q: 'Can I climb out of the basket at height?', a: 'No, except under a specific procedure set by the risk assessment and the manual, with an external anchor point. As a rule, the operator stays inside the platform, does not climb on the guardrail and adds neither ladder nor stepladder in the basket to gain height.' },
      { q: 'How many operation questions must I get right in the aerial lift CACES?', a: `At least ${h.min('r486', 'expl')} out of ${h.pts('r486', 'expl')}, half the theme rounded up, on top of an overall total of at least ${h.P.test.passScore} points out of 100. As the theme is long, a well-prepared candidate reaches it easily; it is the short themes that fail people, especially maintenance at ${h.pts('r486', 'maint')} points.` },
    ],
    body: (h) => `
<h2>The operation theme, point by point</h2>
${h.items('r486', 'expl')}
<p>The syllabus of this theme is long, but it revolves around four questions: can the platform tip over, can the operator fall or be crushed, can something fall on someone below, and how do you rescue the operator at height. Every question in the set ties back to one of them.</p>
<h2>Before going up</h2>
<ul>
<li>Check the ground: bearing capacity, slope, trenches, manholes, and set outriggers on spreader plates where fitted.</li>
<li>Cordon off the area below so nobody walks under the basket.</li>
<li>Spot overhead obstacles: beams, power lines, overhead cranes.</li>
<li>Check the wind against the plate limit, and the rated load in the basket, people and tools included.</li>
</ul>
<!--tool:mini:cpf-->
<h2>Cost and funding</h2>
${h.table(['Category', 'Median initial price', 'Median refresher'], [['A', h.med('r486', 'A'), h.med('r486', 'A', 'rec')], ['B', h.med('r486', 'B'), h.med('r486', 'B', 'rec')], ['C', h.med('r486', 'C'), h.med('r486', 'C', 'rec')]], `Mon Compte Formation offers on ${h.cpfDate} (Caisse des Dépôts, Licence Ouverte).`, ['l', 'r', 'r'])}
<p>The aerial lift CACES can be funded through the personal training account like the others: the ${h.a('financement', 'funding page')} works out what is left to pay. For the full marking scheme and the 100-question mock test, see the ${h.a('caces-r486', 'R486 CACES page')}.</p>`,
  },
});
