import { definePage } from '../../lib/guide-types';
import { GRIDS, type Reco } from '../../lib/engine/exam';

const n = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
const circ489 = ['expl-circ-int', 'expl-circ-ext', 'expl-freinage-distance', 'expl-freinage-facteurs', 'expl-heurts'];
const sum489 = circ489.reduce((s, k) => s + n('r489', k), 0);

export default definePage({
  id: 'circulation-signalisation',
  group: 'themes',
  order: 40,
  tool: { kind: 'quiz', props: { reco: 'r482', mode: 'practice', theme: 'circ', size: 15 } },
  mini: { kind: 'mini:quota-r482' },
  related: ['panneaux-pictogrammes', 'stabilite-chariot', 'caces-r482', 'caces-r489', 'securite-risques', 'examen-blanc'],
  sources: ['r482', 'r489', 'signalisation'],
  fr: {
    slug: 'circulation-signalisation',
    nav: 'Circulation et signalisation',
    card: 'Plan de circulation, piétons, marche arrière, rampes, voie publique et gestes de guidage : les règles que le test interroge.',
    title: 'Circulation CACES : règles sur site et signalisation',
    description: 'Circulation au CACES : vitesse, piétons, marche arrière, pente, charge basse, dépassement, voie publique et gestes de guidage, avec un quiz R482 corrigé.',
    h1: 'Circulation sur site : les règles du cariste et du conducteur d’engin',
    intro: 'Les questions viennent du thème « circulation des engins de chantier » de la R482. Les règles valent aussi pour un chariot dans un entrepôt ou sur une cour.',
    resume: (h) => `Circuler avec un engin de manutention ou de chantier, c’est partager l’espace avec des piétons, des camions et d’autres engins, souvent avec une visibilité réduite par la charge ou la structure. La R482 consacre un thème entier du test théorique à la circulation : ${h.pts('r482', 'circ')} points sur 100, avec un minimum de ${h.min('r482', 'circ')}, répartis entre les panneaux, les gestes de guidage, la conduite en charge, les distances de sécurité, le dépassement et la voie publique. En R489, la circulation est rangée dans l’exploitation : conduite dans les bâtiments et à l’extérieur, distance de freinage et heurts de personnes y totalisent ${sum489} points. Les règles de fond sont les mêmes partout : respecter le plan de circulation du site, adapter la vitesse au sol et à la charge, garder la charge basse, reculer quand elle masque la vue, ne jamais faire monter un passager non prévu et signaler sa présence aux intersections. Le calculateur de distance d’arrêt, plus bas, montre à quel point elle grandit avec la vitesse.`,
    faqs: (h) => [
      { q: 'Quand faut-il conduire en marche arrière ?', a: 'Chaque fois que la charge empêche de voir devant soi, et en descente lorsque l’engin est chargé. On se retourne pour regarder dans le sens du déplacement, sans se contenter des rétroviseurs ou de la caméra. Si même en reculant la vue reste masquée, on se fait guider par une personne placée à distance, en vue du conducteur.' },
      { q: 'Le piéton a-t-il toujours la priorité ?', a: 'Le plan de circulation du site fixe les priorités, mais le conducteur reste responsable de ne heurter personne. Face à un piéton, on ralentit, on cherche son regard, on s’arrête si besoin. Les allées réservées aux piétons, matérialisées au sol, ne s’empruntent pas avec un engin. Un piéton n’entend pas toujours un chariot électrique arriver.' },
      { q: 'Peut-on dépasser un autre engin sur le site ?', a: 'Seulement si les consignes du site l’autorisent, sur une voie assez large, avec une bonne visibilité et loin des intersections, des portes, des virages et des zones de chargement. Le dépassement d’un engin arrêté demande la même prudence, car son conducteur peut repartir ou un piéton peut en surgir. La R482 interroge ce point dans son thème circulation.' },
      { q: 'Un engin de chantier peut-il rouler sur la route ?', a: `Oui, sous conditions : le conducteur doit détenir le permis exigé par le Code de la route pour cet engin, qui doit porter les équipements prévus (éclairage, signalisation, plaque). Les engins hors gabarit suivent des règles propres. Le CACES ne remplace jamais le permis : il atteste une aptitude à conduire en sécurité, pas un droit de circuler. Voir la page ${h.a('caces-r482', 'CACES R482')}.` },
    ],
    body: (h) => `
<h2>Les règles de base</h2>
${h.table(['Situation', 'Bonne pratique', 'Erreur fréquente'], [['Intersection, porte, angle mort', 'Ralentir, avertisseur sonore, regarder', 'Passer sans s’arrêter parce que « personne n’arrive »'], ['Charge masquant la vue', 'Rouler en marche arrière ou se faire guider', 'Avancer en se penchant sur le côté'], ['Pente chargée', 'Charge du côté du haut, sans virer', 'Descendre en marche avant, fourches devant'], ['Sol mouillé ou gras', 'Réduire la vitesse, freiner tôt', 'Garder l’allure habituelle'], ['Approche d’un quai', 'Vérifier le véhicule et la passerelle', 'Entrer sans contrôle dans la remorque'], ['Personne qui demande à monter', 'Refuser : aucun passager hors siège prévu', 'Accepter « pour un mètre »']], 'Synthèse des comportements attendus dans les référentiels R482 et R489.', ['l', 'l', 'l'])}
<p>Le plan de circulation est le document de référence : il fixe les sens, les vitesses, les zones piétonnes et les points de croisement. Le conducteur le reçoit à son arrivée sur le site, et la R482 demande de savoir l’exploiter. En entrepôt, un marquage au sol sépare souvent les allées piétonnes des voies d’engins ; sur un chantier, la signalisation temporaire, sur fond jaune, prend le pas sur la signalisation habituelle.</p>
<h2>Ce que la R482 évalue sur la circulation</h2>
${h.items('r482', 'circ')}
<p>Six points de référentiel de poids égal. Les panneaux comprennent ceux du Code de la route : série A pour les dangers, série B pour les interdictions et obligations, feux et panneaux de priorité aux intersections, marquages au sol. Les gestes de commandement sont les signes conventionnels qu’un guide adresse au conducteur pour arrêter, avancer, reculer ou lever ; ils sont aussi interrogés en R490 pour la grue de chargement. Les pictogrammes de sécurité au travail sont détaillés dans la page ${h.a('panneaux-pictogrammes', 'panneaux et pictogrammes')}.</p>
<h2>Freiner à temps</h2>
<p>La distance d’arrêt se compose de deux parties : la distance parcourue pendant le temps de réaction, proportionnelle à la vitesse, et la distance de freinage, qui croît avec le carré de la vitesse. Un sol glissant, une pente descendante, des bandages usés ou une charge lourde l’allongent ; la fatigue, l’alcool ou le téléphone allongent le temps de réaction. Les deux points du référentiel R489 sur le freinage, ${n('r489', 'expl-freinage-distance')} et ${n('r489', 'expl-freinage-facteurs')} points, portent exactement sur ces facteurs.</p>
<!--tool:mini:freinage-->
<h2>Charge basse, virages lents</h2>
<p>La circulation et la stabilité sont liées : beaucoup de renversements surviennent pendant un déplacement, dans un virage pris trop vite ou avec la charge levée. La page ${h.a('stabilite-chariot', 'stabilité du chariot')} explique pourquoi. Les références à jour sont la ${h.src('r482', 'recommandation R482')}, la ${h.src('r489', 'recommandation R489')} et, pour les panneaux propres au lieu de travail, l’${h.src('signalisation', 'arrêté du 4 novembre 1993')}.</p>`,
  },
  en: {
    slug: 'site-traffic-rules',
    nav: 'Site traffic and signs',
    card: 'Traffic plan, pedestrians, reversing, ramps, public roads and guiding signals: the rules the test asks about.',
    title: 'CACES site traffic rules: speed, pedestrians and signs',
    description: 'CACES site traffic rules: speed, pedestrians, reversing, slopes, low loads, overtaking, public roads and hand signals, with a corrected R482 quiz on traffic.',
    h1: 'Site traffic: the rules for forklift and plant operators',
    intro: 'The questions come from the R482 “moving machines on site and on the road” theme. The rules also apply to a forklift in a warehouse or a yard.',
    resume: (h) => `Driving a handling or construction machine means sharing space with pedestrians, lorries and other machines, often with visibility reduced by the load or the structure. R482 gives traffic a whole theme in the theory test: ${h.pts('r482', 'circ')} points out of 100, with a minimum of ${h.min('r482', 'circ')}, spread across signs, guiding signals, travelling with a load, safe distances, overtaking and public roads. In R489, traffic sits inside the operation theme: driving indoors and outdoors, braking distance and striking people add up to ${sum489} points there. The core rules are the same everywhere: follow the site traffic plan, match speed to the ground and the load, keep the load low, reverse when it blocks the view, never carry a passenger where no seat is provided, and announce yourself at junctions. The stopping distance calculator further down works out the figure from your own inputs, which shows how fast it grows with speed.`,
    faqs: (h) => [
      { q: 'When should I drive in reverse?', a: 'Whenever the load stops you seeing ahead, and when going downhill with a load. Turn round to look in the direction of travel rather than relying on mirrors or a camera alone. If the view is still blocked when reversing, get a banksman to guide you from a safe distance, within your sight.' },
      { q: 'Do pedestrians always have priority?', a: 'The site traffic plan sets priorities, but the driver remains responsible for not hitting anyone. Facing a pedestrian, slow down, make eye contact and stop if needed. Walkways marked on the floor are never used by machines. A pedestrian does not always hear an electric truck coming.' },
      { q: 'May I overtake another machine on site?', a: 'Only if site rules allow it, on a wide enough route with good visibility, away from junctions, doors, bends and loading areas. Passing a stationary machine calls for the same care, because its driver may move off or someone may step out from behind it. R482 asks about this in its traffic theme.' },
      { q: 'Can a construction machine be driven on the road?', a: `Yes, with conditions: the driver must hold the licence the Highway Code requires for that machine, which must carry the required equipment (lights, signals, plate). Oversized machines follow their own rules. The CACES never replaces a driving licence: it certifies safe operation skills, not a right to use the road. See the ${h.a('caces-r482', 'R482 CACES page')}.` },
    ],
    body: (h) => `
<h2>The basic rules</h2>
${h.table(['Situation', 'Good practice', 'Common mistake'], [['Junction, door, blind spot', 'Slow down, sound the horn, look', 'Going through because “nobody is coming”'], ['Load blocking the view', 'Reverse or get guided', 'Driving forwards leaning out to the side'], ['Slope when laden', 'Load on the uphill side, no turning', 'Driving forwards downhill, forks first'], ['Wet or oily floor', 'Lower the speed, brake early', 'Keeping the usual pace'], ['Approaching a dock', 'Check the vehicle and the dock plate', 'Entering the trailer without checks'], ['Someone asks for a lift', 'Refuse: no passenger without a seat provided', 'Agreeing “just for a metre”']], 'Summary of the expected behaviour in the R482 and R489 syllabuses.', ['l', 'l', 'l'])}
<p>The traffic plan (plan de circulation) is the reference document: it sets directions, speeds, pedestrian zones and crossing points. Drivers receive it on arrival, and R482 expects them to use it. In warehouses, floor markings often separate walkways from machine routes; on building sites, temporary signs on a yellow background override the usual ones.</p>
<h2>What R482 assesses on traffic</h2>
${h.items('r482', 'circ')}
<p>Six syllabus points of equal weight. Signs include those of the French Highway Code: series A for hazards, series B for prohibitions and obligations, junction lights and priority signs, floor markings. Guiding signals (gestes de commandement) are the conventional hand signs a banksman uses to stop, advance, reverse or lift; R490 also tests them for loader cranes. Workplace safety pictograms are covered on the ${h.a('panneaux-pictogrammes', 'signs and pictograms page')}.</p>
<h2>Stopping in time</h2>
<p>Stopping distance has two parts: the distance covered during your reaction time, which grows with speed, and the braking distance, which grows with the square of speed. A slippery floor, a downhill slope, worn tyres or a heavy load make it longer; tiredness, alcohol or a phone make reaction time longer. The two R489 syllabus points on braking, worth ${n('r489', 'expl-freinage-distance')} and ${n('r489', 'expl-freinage-facteurs')} points, deal with exactly these factors.</p>
<!--tool:mini:freinage-->
<h2>Low load, slow bends</h2>
<p>Traffic and stability go together: many overturns happen on the move, in a bend taken too fast or with the load raised. The ${h.a('stabilite-chariot', 'forklift stability page')} explains why. The current references are the ${h.src('r482', 'R482 recommendation')}, the ${h.src('r489', 'R489 recommendation')} and, for workplace signs, the ${h.src('signalisation', 'order of 4 November 1993')}. As the test is in French, learn marche arrière (reverse), piéton (pedestrian) and plan de circulation (traffic plan).</p>`,
  },
});
