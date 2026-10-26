import { definePage } from '../../lib/guide-types';
import { readPlate, maxHeight, PLAQUES } from '../../lib/engine/physique';

/** Valeurs lues sur les plaques fictives (src/data/bank/plaques.json), jamais tapées. */
const kg = (id: string, m: number, mm: number) => readPlate(id, m, mm)?.kg ?? 0;
const P1 = PLAQUES.P1, P2 = PLAQUES.P2;
const nominal = (id: string) => PLAQUES[id].rows[0][1][0];
const ex = { mass: 1900, cdg: 650, h: 4 };

export default definePage({
  id: 'abaque-de-charge',
  group: 'themes',
  order: 10,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', theme: 'abaque', size: 15 } },
  mini: { kind: 'mini:plaque' },
  related: ['stabilite-chariot', 'caces-r489', 'caces-3', 'caces-5', 'caces-r485', 'examen-blanc'],
  sources: ['r489', 'r485', 'r486', 'r490'],
  fr: {
    slug: 'abaque-de-charge',
    nav: 'Abaque de charge',
    card: 'Lire une plaque de charge ligne par ligne : capacité selon la hauteur et le centre de gravité, avec des plaques d’exercice.',
    title: 'Abaque de charge CACES : lire la plaque d’un chariot',
    description: 'Abaque de charge au CACES : lire la capacité selon la hauteur et le centre de gravité, la règle de la ligne supérieure, exercices sur plaques fictives corrigés.',
    h1: 'Abaque de charge : lire la plaque d’un chariot sans se tromper',
    intro: 'Les questions ci-dessous viennent du thème « tableau et abaque de charges » de la R489. Chacune s’appuie sur une plaque fictive, affichée avec la question.',
    resume: (h) => `L’abaque de charge, ou plaque de charge, indique la masse qu’un chariot peut lever selon deux variables : la hauteur de levée et la distance entre le talon des fourches et le centre de gravité de la charge. Au test théorique de la R489, ce thème pèse ${h.pts('r489', 'abaque')} points sur 100, répartis en deux points du référentiel : trouver la capacité pour une hauteur et un centre de gravité donnés, et trouver la hauteur permise pour une masse donnée. La règle de réussite exige au moins ${h.min('r489', 'abaque')} bonnes réponses sur ${h.pts('r489', 'abaque')} dans ce thème, quelle que soit la note globale. La R485 des gerbeurs accompagnants note ce thème de la même façon, avec ${h.pts('r485', 'abaque')} points. La capacité nominale, écrite en tête de plaque, ne vaut qu’au centre de gravité de référence et à la hauteur la plus basse : sur notre plaque d’exercice P1, ${h.num(nominal('P1'))} kg à ${h.num(P1.cols[0])} mm, mais ${h.num(kg('P1', 5.5, 800))} kg seulement à ${h.num(5.5, 1)} m avec une charge centrée à ${h.num(800)} mm. Toutes nos plaques sont fictives.`,
    faqs: (h) => [
      { q: 'Quelle différence entre capacité nominale et capacité effective ?', a: `La capacité nominale est fixée par le constructeur pour un centre de gravité de référence et une hauteur de levée standard. La capacité effective est celle de l’engin tel qu’il est équipé : mât, tablier, accessoire monté. Elle se lit sur la plaque fixée au chariot et elle est toujours égale ou inférieure. Sur la plaque fictive P1, elle descend jusqu’à ${h.num(kg('P1', 5.5, 800))} kg.` },
      { q: 'Que faire si la hauteur cherchée n’est pas sur la plaque ?', a: `On lit la ligne de hauteur égale ou immédiatement supérieure, jamais celle du dessous. Pour lever à ${h.num(ex.h)} m avec la plaque P1, on lit donc la ligne ${h.num(4.5, 1)} m. Même logique pour le centre de gravité : ${h.num(ex.cdg)} mm se lit dans la colonne ${h.num(700)} mm. On n’interpole jamais vers une valeur plus favorable.` },
      { q: 'Comment estimer le centre de gravité d’une palette ?', a: 'Pour une charge homogène bien centrée, il se trouve au milieu de sa longueur, mesurée depuis le talon des fourches. Une palette posée dans le sens long, ou une charge dont la partie lourde est à l’avant, le repousse vers l’extérieur. Plus il s’éloigne du mât, plus la capacité baisse, même à faible hauteur.' },
      { q: 'Un accessoire monté sur le chariot change-t-il la lecture ?', a: 'Oui. Un accessoire comme un tablier à déplacement latéral, une pince ou un pousseur a sa propre masse et avance souvent le centre de gravité. Le constructeur fournit alors une plaque propre à cette configuration, qui remplace celle du chariot nu. Au test, une question peut préciser l’accessoire : c’est un indice qu’il faut lire une autre plaque.' },
    ],
    body: (h) => `
<h2>Ce que mesure la plaque</h2>
<p>Un chariot frontal fonctionne comme une balance dont le pivot est l’essieu avant. D’un côté, la charge tire vers l’avant avec un bras de levier égal à la distance de son centre de gravité ; de l’autre, le contrepoids et la masse du chariot le retiennent. Plus la charge est éloignée, plus son effet de basculement augmente : c’est pourquoi chaque colonne de la plaque vers la droite donne une valeur plus faible. La hauteur joue aussi, car un mât déployé fléchit et rend l’ensemble plus sensible aux inclinaisons. La page ${h.a('stabilite-chariot', 'stabilité du chariot')} détaille ces mécanismes.</p>
<h2>La plaque d’exercice P1, ligne par ligne</h2>
${h.table(['Hauteur de levée', ...P1.cols.map((c) => `${h.num(c)} mm`)], P1.rows.map(([m, v]) => [`${h.num(m, 1)} m`, ...v.map((x) => `${h.num(x)} kg`)]), `Plaque fictive P1 : ${P1.fr}. Exercice uniquement, elle ne correspond à aucun chariot réel.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Méthode en trois temps, pour une palette de ${h.num(ex.mass)} kg centrée à ${h.num(ex.cdg)} mm, à poser à ${h.num(ex.h)} m. D’abord la ligne : ${h.num(ex.h)} m n’existe pas, on prend celle de ${h.num(4.5, 1)} m. Ensuite la colonne : ${h.num(ex.cdg)} mm se lit dans celle de ${h.num(700)} mm. Enfin la case : ${h.num(kg('P1', ex.h, ex.cdg))} kg. La palette pèse plus : la manutention est refusée à cette hauteur. En descendant à ${h.num(3.3, 1)} m, la case donne ${h.num(kg('P1', 3.3, ex.cdg))} kg et la pose devient possible. Le mini-outil de la page refait ce calcul pour toutes les combinaisons.</p>
<h2>Les deux questions types du test</h2>
${h.items('r489', 'abaque')}
<p>La première demande une masse : « quelle charge maximale à telle hauteur, avec tel centre de gravité ? ». La seconde part de la masse et demande la hauteur la plus élevée accessible. Avec la plaque P2 d’un chariot à mât rétractable, une charge de ${h.num(1250)} kg centrée à ${h.num(800)} mm peut monter jusqu’à ${h.num(maxHeight('P2', 800, 1250) ?? 0, 1)} m, pas plus. Ces deux exercices font l’objet du même nombre de points.</p>
<h2>Les pièges les plus fréquents</h2>
<ul>
<li>Lire la capacité nominale en haut de plaque au lieu de la case qui correspond à la situation.</li>
<li>Prendre la ligne inférieure parce qu’elle est plus proche de la hauteur cherchée.</li>
<li>Oublier la masse de la palette ou de l’emballage dans la masse totale.</li>
<li>Confondre centre de gravité et longueur de la charge : une palette de ${h.num(1200)} mm bien centrée a son centre à ${h.num(600)} mm.</li>
</ul>
<p>Les plaques des nacelles (${h.src('r486', 'R486')}) et des grues de chargement (${h.src('r490', 'R490')}) se lisent avec la même logique, sous forme de courbes ou de diagrammes de portée : la page ${h.a('elingage', 'élingage')} en donne un exemple. Pour mesurer ce thème dans les conditions du jour J, enchaînez avec l’${h.a('examen-blanc', 'examen blanc')}, qui tire ${h.pts('r489', 'abaque')} questions d’abaque comme le barème de la ${h.src('r489', 'recommandation R489')}.</p>`,
  },
  en: {
    slug: 'load-chart',
    nav: 'Load chart',
    card: 'Reading a capacity plate row by row: capacity by lift height and load centre, with practice plates.',
    title: 'CACES load chart: how to read a forklift capacity plate',
    description: 'CACES load chart (abaque de charge): read capacity by lift height and load centre, the row above rule, and practise on fictitious plates with full corrections.',
    h1: 'Load chart: reading a forklift capacity plate without mistakes',
    intro: 'The questions below come from the R489 “load chart and capacity diagram” theme. Each one is built on a fictitious plate shown with the question.',
    resume: (h) => `The load chart, called abaque de charge or plaque de charge in French, gives the mass a truck may lift according to two variables: the lift height and the distance from the fork heel to the centre of gravity of the load. In the R489 theory test, this theme carries ${h.pts('r489', 'abaque')} points out of 100, split between two syllabus points: finding the capacity for a given height and load centre, and finding the highest permitted height for a given mass. The pass rule demands at least ${h.min('r489', 'abaque')} correct answers out of ${h.pts('r489', 'abaque')} in this theme, whatever the overall score. R485 for pedestrian stackers marks the theme the same way, with ${h.pts('r485', 'abaque')} points. The rated capacity printed at the top of the plate only applies at the reference load centre and the lowest height: on our practice plate P1, ${h.num(nominal('P1'))} kg at ${h.num(P1.cols[0])} mm, but only ${h.num(kg('P1', 5.5, 800))} kg at ${h.num(5.5, 1)} m with a load centred at ${h.num(800)} mm. All our plates are fictitious.`,
    faqs: (h) => [
      { q: 'What is the difference between rated and actual capacity?', a: `Rated capacity is set by the manufacturer for a reference load centre and a standard lift height. Actual capacity (capacité effective) belongs to the truck as fitted: mast, carriage, attachment. It is read on the plate fixed to the truck and is always equal or lower. On the fictitious plate P1, it falls as low as ${h.num(kg('P1', 5.5, 800))} kg.` },
      { q: 'What if the height I need is not on the plate?', a: `You read the row for the equal or next higher height, never the one below. To lift to ${h.num(ex.h)} m with plate P1, you therefore read the ${h.num(4.5, 1)} m row. Same logic for the load centre: ${h.num(ex.cdg)} mm is read in the ${h.num(700)} mm column. You never interpolate towards a more favourable value.` },
      { q: 'How do I estimate the load centre of a pallet?', a: 'For an even load that sits squarely, it lies halfway along its length, measured from the fork heel. A pallet carried lengthwise, or a load with its heavy part at the front, pushes it further out. The further it moves from the mast, the lower the capacity, even at a low height.' },
      { q: 'Does an attachment on the truck change the reading?', a: 'Yes. An attachment such as a side shift, a clamp or a push-pull has its own mass and often moves the load centre forward. The manufacturer then supplies a plate for that configuration, which replaces the one for the bare truck. In the test, a question may name the attachment: that is a hint that a different plate applies.' },
    ],
    body: (h) => `
<h2>What the plate measures</h2>
<p>A counterbalance truck works like a see-saw pivoting on the front axle. On one side, the load pulls forward with a lever arm equal to the distance of its centre of gravity; on the other, the counterweight and the truck’s own mass hold it back. The further out the load sits, the stronger its tipping effect: that is why each column to the right of the plate gives a lower figure. Height matters too, because an extended mast flexes and makes the whole truck more sensitive to tilting. The ${h.a('stabilite-chariot', 'truck stability page')} explains these mechanisms.</p>
<h2>Practice plate P1, row by row</h2>
${h.table(['Lift height', ...P1.cols.map((c) => `${h.num(c)} mm`)], P1.rows.map(([m, v]) => [`${h.num(m, 1)} m`, ...v.map((x) => `${h.num(x)} kg`)]), `Fictitious plate P1: ${P1.en}. For practice only, it matches no real truck.`, ['l', 'r', 'r', 'r', 'r'])}
<p>A three-step method, for a ${h.num(ex.mass)} kg pallet centred at ${h.num(ex.cdg)} mm, to be placed at ${h.num(ex.h)} m. First the row: there is no ${h.num(ex.h)} m row, so take the ${h.num(4.5, 1)} m one. Then the column: ${h.num(ex.cdg)} mm falls in the ${h.num(700)} mm column. Finally the cell: ${h.num(kg('P1', ex.h, ex.cdg))} kg. The pallet is heavier, so the lift is refused at that height. Coming down to ${h.num(3.3, 1)} m, the cell gives ${h.num(kg('P1', 3.3, ex.cdg))} kg and the placement becomes possible. The mini tool on this page repeats the calculation for any combination.</p>
<h2>The two standard test questions</h2>
${h.items('r489', 'abaque')}
<p>The first asks for a mass: “what is the maximum load at this height, with this load centre?”. The second starts from the mass and asks for the highest reachable height. With plate P2 for a reach truck, a ${h.num(1250)} kg load centred at ${h.num(800)} mm can go up to ${h.num(maxHeight('P2', 800, 1250) ?? 0, 1)} m and no higher. Both exercises carry the same number of points.</p>
<h2>The most common traps</h2>
<ul>
<li>Reading the rated capacity at the top of the plate instead of the cell matching the situation.</li>
<li>Taking the lower row because it is closer to the height you need.</li>
<li>Forgetting the mass of the pallet or packaging in the total mass.</li>
<li>Mixing up load centre and load length: a well-centred ${h.num(1200)} mm pallet has its centre at ${h.num(600)} mm.</li>
</ul>
<p>Charts for aerial lifts (${h.src('r486', 'R486')}) and loader cranes (${h.src('r490', 'R490')}) are read with the same logic, as curves or outreach diagrams: the ${h.a('elingage', 'slinging page')} gives an example. To test yourself on this theme in exam conditions, move on to the ${h.a('examen-blanc', 'mock exam')}, which draws ${h.pts('r489', 'abaque')} load chart questions as the ${h.src('r489', 'R489 recommendation')} marking requires. Remember that the real test is in French: learn the words hauteur de levée (lift height) and centre de gravité (load centre).</p>`,
  },
});
