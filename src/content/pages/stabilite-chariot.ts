import { definePage } from '../../lib/guide-types';
import { GRIDS } from '../../lib/engine/exam';

/** Points du référentiel R489 consacrés au renversement et au basculement, lus dans la grille. */
const n489 = (key: string) => GRIDS.r489.themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
const STAB = ['tech-masse', 'tech-cdg', 'tech-equilibre', 'tech-lateral', 'tech-frontal'];
const stabItems = (lang: 'fr' | 'en') => [...GRIDS.r489.themes.find((t) => t.key === 'tech')!.items.filter((i) => STAB.includes(i.key)).map((i) => ['tech', i[lang], i.n]), ...GRIDS.r489.themes.find((t) => t.key === 'expl')!.items.filter((i) => i.key === 'expl-renversement').map((i) => ['expl', i[lang], i.n])];
const stabPts = ['tech-masse', 'tech-cdg', 'tech-equilibre', 'tech-lateral', 'tech-frontal'].reduce((s, k) => s + n489(k), 0);

export default definePage({
  id: 'stabilite-chariot',
  group: 'themes',
  order: 20,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', theme: 'tech', match: 'stabil|renvers|basculement|centre de gravité', size: 15 } },
  mini: { kind: 'mini:plaque' },
  related: ['abaque-de-charge', 'circulation-signalisation', 'caces-r489', 'caces-3', 'caces-telescopique', 'examen-blanc'],
  sources: ['r489', 'r485', 'r482'],
  fr: {
    slug: 'stabilite-chariot',
    nav: 'Stabilité du chariot',
    card: 'Triangle de stabilité, renversement sur le côté, basculement vers l’avant : les causes, les gestes qui les évitent et un entraînement ciblé.',
    title: 'Stabilité du chariot élévateur : renversement et CACES',
    description: 'Stabilité du chariot élévateur : triangle d’appui, renversement latéral, basculement avant, charge haute, virage et pente. Questions corrigées pour le CACES.',
    h1: 'Stabilité du chariot : pourquoi il se renverse et comment l’éviter',
    intro: 'L’entraînement ci-dessous pioche dans le thème technologie et stabilité de la R489, en privilégiant les questions sur l’équilibre, le centre de gravité et le renversement.',
    resume: (h) => `Un chariot élévateur reste debout tant que le centre de gravité de l’ensemble, chariot plus charge, tombe à l’intérieur de sa base d’appui. Sur un chariot frontal à essieu arrière oscillant, cette base forme un triangle : les deux roues avant et l’articulation centrale de l’essieu arrière. Dès que la verticale du centre de gravité sort de ce triangle, l’engin se couche sur le côté ou bascule vers l’avant. Au test théorique de la R489, le thème technologie et stabilité vaut ${h.pts('r489', 'tech')} points sur 100, dont ${stabPts} portent directement sur la masse de la charge, son centre de gravité, l’équilibre, le renversement latéral (${n489('tech-lateral')} points) et le basculement frontal (${n489('tech-frontal')} points). Il faut au moins ${h.min('r489', 'tech')} points dans ce thème pour réussir. Le thème exploitation ajoute un point de référentiel sur la prévention du renversement. La R485 des gerbeurs accompagnants et la R482 des engins de chantier posent des questions de même nature.`,
    faqs: (h) => [
      { q: 'Que faire si le chariot commence à se renverser ?', a: 'Ne jamais sauter. Restez assis avec la ceinture attachée, tenez fermement le volant, calez les pieds et penchez le buste du côté opposé à la chute. La cabine et le protège-conducteur forment alors un abri. Un conducteur qui saute risque d’être écrasé par le toit de protection, le pire scénario d’un renversement.' },
      { q: 'Pourquoi circuler la charge en position basse ?', a: 'Une charge levée remonte le centre de gravité de tout l’ensemble. La moindre force latérale, dans un virage ou sur un sol irrégulier, suffit alors à faire sortir sa verticale du triangle d’appui. Fourches juste au-dessus du sol et mât incliné vers l’arrière, le chariot garde sa marge de stabilité pendant tout le trajet.' },
      { q: 'Comment monter ou descendre une pente avec une charge ?', a: 'Charge toujours du côté du haut de la pente. En montée, on avance en marche avant ; en descente, on recule en marche arrière, en regardant dans le sens du déplacement. À vide, c’est l’inverse : fourches vers le bas de la pente. On ne tourne jamais sur une pente et on ne la traverse jamais en biais.' },
      { q: 'Un pneu sous-gonflé change-t-il la stabilité ?', a: `Oui. Un pneumatique dégonflé abaisse un coin du chariot et incline le mât : la charge se décale vers ce côté et la marge avant renversement fond. C’est pourquoi l’état des bandages et la pression des pneus font partie des vérifications de prise de poste détaillées dans la page ${h.a('fin-de-poste', 'vérifications et fin de poste')}.` },
    ],
    body: (h) => `
<h2>Le triangle de stabilité</h2>
<p>Imaginez trois points posés au sol : la roue avant gauche, la roue avant droite et l’axe autour duquel pivote l’essieu arrière. Le chariot, contrepoids compris, a son propre centre de gravité situé à l’intérieur de ce triangle. Prendre une charge déplace ce centre vers l’avant ; la lever le fait monter ; tourner le pousse sur le côté par la force centrifuge. Tant que la verticale reste dans le triangle, l’engin tient. Le côté arrière du triangle est étroit : c’est pour cela qu’un chariot frontal se couche plus facilement sur le côté qu’on ne le croit.</p>
<h2>Deux façons de perdre l’équilibre</h2>
${h.table(['Situation', 'Renversement latéral', 'Basculement vers l’avant'], [['Virage', 'Virage serré ou trop rapide, surtout charge haute', '–'], ['Charge', 'Charge décentrée sur les fourches', 'Charge trop lourde ou centre de gravité trop éloigné'], ['Mât', 'Déplacement charge haute', 'Mât incliné vers l’avant charge levée'], ['Sol', 'Trou, bordure, pneu crevé, devers', 'Pente descendue marche avant en charge'], ['Conduite', 'Coup de volant brusque', 'Freinage brutal en marche avant chargée']], 'Causes classiques de perte de stabilité d’un chariot frontal, d’après les thèmes du référentiel R489.', ['l', 'l', 'l'])}
<p>Le renversement sur le côté est le plus fréquent et le plus grave, car il se produit en circulation, à vitesse, souvent sans signe annonciateur. Le basculement vers l’avant survient plutôt pendant la prise ou la dépose, quand la charge dépasse ce que la plaque autorise : la page ${h.a('abaque-de-charge', 'abaque de charge')} montre comment vérifier la case avant de lever.</p>
<h2>Ce que le test vérifie dans ce thème</h2>
${h.table(['Thème du barème', 'Point du référentiel', 'Points'], stabItems('fr').map(([t, l, n]) => [t === 'tech' ? 'Technologie et stabilité' : 'Exploitation', l, n]), 'Points de la grille R489 qui interrogent directement l’équilibre du chariot.', ['l', 'l', 'r'])}
<p>Les points sur la stabilité pèsent ${stabPts} des ${h.pts('r489', 'tech')} points du thème. Les autres portent sur l’énergie, les dispositifs de sécurité, les commandes et le poste de conduite. Une série d’entraînement mêle donc les deux, mais celle de cette page favorise les questions d’équilibre.</p>
<h2>Vitesse et freinage</h2>
<p>La stabilité en virage dépend du carré de la vitesse : à vitesse doublée, la force qui pousse le chariot vers l’extérieur est multipliée par quatre. La distance de freinage suit la même loi. Le mini-outil ci-dessous calcule la distance totale d’arrêt pour une vitesse, un temps de réaction et une décélération que vous choisissez ; la page ${h.a('circulation-signalisation', 'circulation et signalisation')} reprend les règles de vitesse sur site.</p>
<!--tool:mini:freinage-->
<h2>Les mêmes lois sur les autres engins</h2>
<p>Le gerbeur accompagnant de la ${h.src('r485', 'R485')} a une base plus étroite et un conducteur à pied, ce qui change les gestes mais pas la physique. Les chariots télescopiques de la ${h.src('r482', 'R482')} ajoutent la portée de la flèche : plus elle s’allonge, plus la capacité baisse, comme sur la ${h.a('caces-telescopique', 'page du CACES télescopique')}. La ${h.src('r489', 'recommandation R489')} reste la référence du thème pour les chariots à conducteur porté.</p>`,
  },
  en: {
    slug: 'forklift-stability',
    nav: 'Forklift stability',
    card: 'Stability triangle, sideways overturn, forward tip-over: the causes, the habits that prevent them and targeted practice.',
    title: 'Forklift stability: overturning, tipping and the CACES',
    description: 'Forklift stability for the CACES: stability triangle, sideways overturn, forward tip-over, raised loads, bends and slopes, with corrected practice questions.',
    h1: 'Forklift stability: why trucks overturn and how to prevent it',
    intro: 'The practice set below draws on the R489 technology and stability theme, giving priority to questions on balance, load centre and overturning.',
    resume: (h) => `A forklift stays upright as long as the combined centre of gravity of truck and load falls inside its base of support. On a counterbalance truck with a pivoting rear axle, that base is a triangle: the two front wheels and the central pivot of the rear axle. As soon as the vertical line through the centre of gravity leaves the triangle, the truck rolls onto its side or tips forward. In the R489 theory test, the technology and stability theme is worth ${h.pts('r489', 'tech')} points out of 100, of which ${stabPts} deal directly with load mass, load centre, balance, sideways overturn (${n489('tech-lateral')} points) and forward tip-over (${n489('tech-frontal')} points). You need at least ${h.min('r489', 'tech')} points in this theme to pass. The operation theme adds one more syllabus point on preventing overturns. R485 for pedestrian stackers and R482 for construction machinery ask questions of the same kind, with the same physics behind them.`,
    faqs: (h) => [
      { q: 'What should I do if the truck starts to overturn?', a: 'Never jump. Stay seated with the seat belt fastened, grip the steering wheel, brace your feet and lean away from the side it is falling towards. The cab and overhead guard then act as a shelter. A driver who jumps risks being crushed by the overhead guard, the worst outcome of an overturn.' },
      { q: 'Why travel with the load lowered?', a: 'A raised load lifts the centre of gravity of the whole truck. Any sideways force, in a bend or on rough ground, can then push its vertical line out of the support triangle. With the forks just clear of the ground and the mast tilted back, the truck keeps its stability margin for the whole trip.' },
      { q: 'How do I drive up or down a slope with a load?', a: 'Always keep the load on the uphill side. Going up, drive forwards; going down, reverse, looking in the direction of travel. When unladen it is the other way round: forks pointing downhill. Never turn on a slope and never cross it at an angle.' },
      { q: 'Does an underinflated tyre affect stability?', a: `Yes. A soft tyre lowers one corner of the truck and tilts the mast, so the load shifts to that side and the margin before overturning shrinks. That is why tyre condition and pressure belong to the pre-use checks covered on the ${h.a('fin-de-poste', 'checks and end of shift page')}.` },
    ],
    body: (h) => `
<h2>The stability triangle</h2>
<p>Picture three points on the ground: the left front wheel, the right front wheel and the pin around which the rear axle pivots. The truck, counterweight included, has its own centre of gravity inside that triangle. Picking up a load moves it forward; raising the load moves it up; turning pushes it sideways through centrifugal force. While the vertical line stays inside the triangle, the truck stays up. The rear of the triangle is narrow, which is why a counterbalance truck rolls sideways more easily than people think.</p>
<h2>Two ways to lose balance</h2>
${h.table(['Situation', 'Sideways overturn', 'Forward tip-over'], [['Bend', 'Tight or fast turn, especially with a raised load', '–'], ['Load', 'Load off-centre on the forks', 'Load too heavy or centred too far out'], ['Mast', 'Travelling with the load raised', 'Mast tilted forward with the load raised'], ['Ground', 'Pothole, kerb, flat tyre, side slope', 'Driving forwards down a slope when laden'], ['Driving', 'Sudden steering', 'Hard braking when laden and moving forwards']], 'Usual causes of instability on a counterbalance truck, based on the R489 syllabus themes.', ['l', 'l', 'l'])}
<p>Sideways overturn is the most frequent and the most serious, because it happens on the move, at speed, often without warning. Forward tip-over tends to occur when picking up or setting down, when the load exceeds what the plate allows: the ${h.a('abaque-de-charge', 'load chart page')} shows how to check the cell before lifting.</p>
<h2>What the test checks in this theme</h2>
${h.table(['Marking theme', 'Syllabus point', 'Points'], stabItems('en').map(([t, l, n]) => [t === 'tech' ? 'Technology and stability' : 'Operation', l, n]), 'R489 grid points that test the truck’s balance directly.', ['l', 'l', 'r'])}
<p>The stability points weigh ${stabPts} of the theme’s ${h.pts('r489', 'tech')} points. The rest cover energy sources, safety devices, controls and the driving position. A practice set therefore mixes both, but the one on this page favours balance questions. In the French test, look out for renversement (sideways overturn) and basculement (forward tip-over).</p>
<h2>Speed and braking</h2>
<p>Stability in a bend depends on the square of the speed: double the speed and the force pushing the truck outwards is four times greater. Braking distance follows the same law. The mini tool below works out the total stopping distance for a speed, reaction time and deceleration you choose; the ${h.a('circulation-signalisation', 'traffic and signs page')} covers speed rules on site.</p>
<!--tool:mini:freinage-->
<h2>The same laws on other machines</h2>
<p>The pedestrian stacker under ${h.src('r485', 'R485')} has a narrower base and an operator on foot, which changes the habits but not the physics. Telehandlers under ${h.src('r482', 'R482')} add boom outreach: the further it extends, the lower the capacity, as the ${h.a('caces-telescopique', 'telehandler CACES page')} explains. The ${h.src('r489', 'R489 recommendation')} remains the reference for ride-on trucks.</p>`,
  },
});
