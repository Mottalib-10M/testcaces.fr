import { definePage } from '../../lib/guide-types';
import { GRIDS, type Reco } from '../../lib/engine/exam';

const item = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key);
const n = (r: Reco, key: string) => item(r, key)?.n ?? 0;
const ROWS: Array<[Reco, string]> = [['r489', 'expl-chargement'], ['r485', 'expl-chargement'], ['r485', 'expl-chute-quai'], ['r482', 'expl-porte-engins'], ['r490', 'expl-arrimage']];

export default definePage({
  id: 'chargement-camion',
  group: 'themes',
  order: 60,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', match: 'camion|quai|remorque|hayon', size: 15 } },
  mini: { kind: 'mini:plaque' },
  related: ['caces-r489', 'caces-r485', 'caces-3', 'stabilite-chariot', 'securite-risques', 'abaque-de-charge'],
  sources: ['r489', 'r485', 'r482', 'r490'],
  fr: {
    slug: 'chargement-camion',
    nav: 'Charger un camion',
    card: 'Quai, pont de liaison, semi-remorque dételée, chargement par le côté : la procédure que le test et l’épreuve pratique attendent.',
    title: 'Chargement camion au chariot : quai, remorque et CACES',
    description: 'Charger un camion au chariot élévateur : protocole de sécurité, calage, pont de liaison, remorque dételée, chargement par le côté. Règles du CACES, quiz.',
    h1: 'Charger et décharger un camion au chariot en sécurité',
    intro: 'Le quiz rassemble les questions de la banque R489 qui parlent de camion, de quai, de remorque ou de hayon. Chaque correction explique le geste attendu.',
    resume: (h) => `Charger ou décharger un poids lourd est l’une des opérations les plus risquées du cariste : le camion peut partir alors que le chariot est encore dans la remorque, le pont de liaison peut glisser, le plancher peut céder, une semi-remorque dételée peut piquer du nez. En R489, le point « charger et décharger un véhicule, protocole de sécurité » vaut à lui seul ${n('r489', 'expl-chargement')} points du thème exploitation, le plus lourd du test avec ${h.pts('r489', 'expl')} points. La R485 des gerbeurs accompagnants lui donne ${n('r485', 'expl-chargement')} points, plus ${n('r485', 'expl-chute-quai')} pour la chute depuis un quai ou un hayon. Le test pratique R489 comprend aussi un chargement à quai par l’arrière et un chargement depuis le sol. Le fil conducteur est toujours le même : un véhicule immobilisé et vérifié, un accès sûr à la plate-forme, une vitesse lente dans l’axe et une répartition équilibrée des charges, conforme au plan de chargement prévu par l’entreprise.`,
    faqs: (h) => [
      { q: 'Qu’est-ce que le protocole de sécurité de chargement ?', a: 'C’est un document écrit, établi entre l’entreprise d’accueil et le transporteur, qui décrit les risques de l’opération et les mesures prises : lieu de livraison, consignes de quai, matériel utilisé, qui fait quoi. Le cariste doit en connaître le contenu pour son poste. Il ne remplace pas les vérifications faites sur place avant chaque entrée dans le véhicule.' },
      { q: 'Comment vérifier que le camion ne partira pas ?', a: 'Selon le site : cale de roue posée, frein de parc serré, clé confiée au quai, feu de quai au vert ou système de blocage du véhicule engagé. L’essentiel est de ne jamais se fier à une parole du chauffeur. Si l’immobilisation n’est pas visible, on n’entre pas. Un départ inopiné fait tomber le chariot entre le quai et la remorque.' },
      { q: 'Pourquoi vérifier le support avant d’une semi-remorque dételée ?', a: 'Sans tracteur, l’avant de la semi-remorque repose sur ses béquilles. Le poids du chariot qui avance vers l’avant de la caisse peut la faire basculer si elles sont mal posées, abîmées ou sur un sol mou. Une chandelle de sécurité ajoutée sous l’avant supprime ce risque. Le contrôle se fait avant la première entrée.' },
      { q: 'Peut-on monter avec le chariot sur un hayon élévateur ?', a: `Seulement si le hayon est conçu et dimensionné pour cela : sa capacité doit couvrir la masse du chariot et de la charge, indications du constructeur à l’appui. Dans le doute, on ne monte pas. En R485, la chute depuis un quai, un hayon ou un pont de liaison pèse ${n('r485', 'expl-chute-quai')} points : la question revient souvent.` },
    ],
    body: (h) => `
<h2>À quai, par l’arrière : la check-list</h2>
${h.table(['Étape', 'Ce que l’on vérifie', 'Pourquoi'], [['1. Véhicule', 'Immobilisé, moteur coupé, calé ou bloqué', 'Éviter un départ avec le chariot à bord'], ['2. Remorque dételée', 'Béquilles en bon état, chandelle sous l’avant', 'Éviter le basculement vers l’avant'], ['3. Pont de liaison', 'Bien posé, lèvre en appui, capacité suffisante', 'Éviter la chute entre quai et caisse'], ['4. Plancher', 'Planches saines, pas de trou, charge admissible', 'Éviter l’enfoncement d’une roue'], ['5. Éclairage', 'Lumière dans la caisse ou sur le chariot', 'Voir les charges et les parois'], ['6. Entrée', 'Lente, dans l’axe, fourches basses', 'Ne pas heurter les ridelles ou raidisseurs']], 'Procédure type issue des savoir-faire du référentiel R489 (chargement d’un véhicule à quai).', ['l', 'l', 'l'])}
<p>Le gabarit du chariot compte aussi : hauteur du protège-conducteur par rapport au toit de la caisse, largeur par rapport aux portes, masse totale par rapport à ce que le plancher supporte. Certains chariots, trop hauts ou trop lourds, ne doivent jamais entrer dans une remorque. La plaque de charge reste valable dans la caisse : une palette lourde prise au fond, fourches levées pour passer une autre charge, peut sortir de la capacité. Le mini-outil de la page vérifie une case de plaque d’exercice.</p>
<h2>Depuis le sol, par le côté</h2>
<p>Un plateau ou une remorque à bâche coulissante se charge souvent depuis le sol, par le côté. Le véhicule est garé sur un sol plat et porteur, à l’endroit le plus dégagé possible. On alterne les déposes de part et d’autre pour que le camion ne penche pas, et on corrige la hauteur des fourches à mesure que la suspension s’enfonce. Le chariot ne roule pas sur les bâches ni sur les sangles posées au sol.</p>
<h2>Les points du référentiel, engin par engin</h2>
${h.table(['Recommandation', 'Point du référentiel', 'Points'], ROWS.map(([r, k]) => [r.toUpperCase(), item(r, k)!.fr, n(r, k)]), 'Points des fiches d’évaluation théorique (annexe 3) qui portent sur les véhicules et le chargement.', ['l', 'l', 'r'])}
<p>La ${h.src('r489', 'R489')} et la ${h.src('r485', 'R485')} visent la manutention des palettes vers un véhicule. La ${h.src('r482', 'R482')} s’intéresse au chargement d’un engin sur un porte-engins, et la ${h.src('r490', 'R490')} à l’arrimage des charges sur le plateau du porteur avant le départ.</p>
<h2>Les charges particulières</h2>
<ul>
<li>Charge longue : la prendre au centre, fourches écartées au maximum, et prévoir l’encombrement dans les virages et aux portes.</li>
<li>Fût ou cuve de liquide : le contenu bouge au freinage, on freine tôt et en douceur ; on vérifie les pictogrammes de danger (voir ${h.a('panneaux-pictogrammes', 'panneaux et pictogrammes')}).</li>
<li>Sac souple ou big bag : il se déforme et peut glisser des fourches, on utilise un accessoire adapté si le constructeur le prévoit.</li>
</ul>
<p>Entrer dans une remorque, c’est aussi rouler sur une pente, souvent celle du pont de liaison : la page ${h.a('stabilite-chariot', 'stabilité du chariot')} rappelle de garder la charge du côté du haut.</p>`,
  },
  en: {
    slug: 'loading-a-lorry',
    nav: 'Loading a lorry',
    card: 'Dock, dock plate, uncoupled trailer, side loading: the procedure the theory and practical tests expect.',
    title: 'Loading a lorry by forklift: docks, trailers and CACES',
    description: 'Loading a lorry by forklift: safety protocol, wheel chocks, dock plate, uncoupled trailer and side loading from the ground. CACES rules and a corrected quiz.',
    h1: 'Loading and unloading a lorry safely with a forklift',
    intro: 'The quiz gathers the R489 bank questions about lorries, docks, trailers and tail lifts. Each correction explains the expected action.',
    resume: (h) => `Loading or unloading a heavy goods vehicle is one of a forklift driver’s riskiest tasks: the lorry may pull away while the truck is still inside, the dock plate may slip, the floor may give way, an uncoupled semi-trailer may tip onto its nose. In R489, the syllabus point “loading and unloading a vehicle, safety protocol” alone is worth ${n('r489', 'expl-chargement')} points of the operation theme, the heaviest in the test with ${h.pts('r489', 'expl')} points. R485 for pedestrian stackers gives it ${n('r485', 'expl-chargement')} points, plus ${n('r485', 'expl-chute-quai')} for falls from a dock or tail lift. The R489 practical test also includes loading at a dock from the rear and loading from the ground. The thread is always the same: a vehicle secured and checked, safe access to the platform, slow driving in line with the trailer, and a balanced spread of loads that follows the loading plan set by the company. In the French test, look for the words quai (dock), remorque (trailer) and pont de liaison (dock plate).`,
    faqs: (h) => [
      { q: 'What is the loading safety protocol?', a: 'It is a written document (protocole de sécurité) drawn up between the host company and the haulier, describing the risks of the operation and the measures taken: delivery point, dock rules, equipment used, who does what. The driver must know its content for their post. It does not replace the checks made on the spot before each entry into the vehicle.' },
      { q: 'How do I make sure the lorry will not drive off?', a: 'Depending on the site: wheel chock in place, parking brake on, key handed to the dock, dock light on green or vehicle restraint engaged. The key point is never to rely on the driver’s word. If the restraint cannot be seen, do not go in. An unexpected departure drops the forklift between dock and trailer.' },
      { q: 'Why check the front support of an uncoupled trailer?', a: 'Without its tractor unit, the front of a semi-trailer rests on its landing legs. The weight of a forklift moving towards the front of the box can tip it if the legs are poorly set, damaged or on soft ground. A safety stand added under the front removes this risk. The check is done before the first entry.' },
      { q: 'May I drive the forklift onto a tail lift?', a: `Only if the tail lift is designed and rated for it: its capacity must cover the mass of the truck and its load, as stated by the manufacturer. When in doubt, do not drive on. In R485, falling from a dock, tail lift or dock plate is worth ${n('r485', 'expl-chute-quai')} points: the question comes up often.` },
    ],
    body: (h) => `
<h2>At a dock, from the rear: the checklist</h2>
${h.table(['Step', 'What to check', 'Why'], [['1. Vehicle', 'Secured, engine off, chocked or restrained', 'Avoid driving off with the forklift inside'], ['2. Uncoupled trailer', 'Landing legs sound, stand under the front', 'Avoid tipping forward'], ['3. Dock plate', 'Properly seated, lip resting, enough capacity', 'Avoid falling between dock and trailer'], ['4. Floor', 'Sound boards, no holes, rated load', 'Avoid a wheel breaking through'], ['5. Lighting', 'Light inside the trailer or on the truck', 'See loads and walls'], ['6. Entry', 'Slow, in line, forks low', 'Avoid hitting side boards or stiffeners']], 'Typical procedure based on the R489 practical skills (loading a vehicle at a dock).', ['l', 'l', 'l'])}
<p>The truck’s dimensions matter too: overhead guard height against the trailer roof, width against the doors, total mass against what the floor can take. Some trucks, too tall or too heavy, must never enter a trailer. The capacity plate still applies inside: a heavy pallet taken from the far end, forks raised to clear another load, may exceed capacity. The mini tool on this page checks a cell on a practice plate.</p>
<h2>From the ground, from the side</h2>
<p>A flatbed or curtain-sided trailer is often loaded from the ground, from the side. The vehicle stands on flat, firm ground, in the clearest place available. Alternate drops on each side so the lorry does not lean, and adjust fork height as the suspension settles. The forklift never drives over sheets or straps lying on the ground.</p>
<h2>Syllabus points, machine by machine</h2>
${h.table(['Recommendation', 'Syllabus point', 'Points'], ROWS.map(([r, k]) => [r.toUpperCase(), item(r, k)!.en, n(r, k)]), 'Points of the theory assessment sheets (annex 3) that deal with vehicles and loading.', ['l', 'l', 'r'])}
<p>${h.src('r489', 'R489')} and ${h.src('r485', 'R485')} cover moving pallets to and from a vehicle. ${h.src('r482', 'R482')} looks at loading a machine onto a low loader, and ${h.src('r490', 'R490')} at securing loads on the carrier’s deck before departure.</p>
<h2>Awkward loads</h2>
<ul>
<li>Long load: pick it up at the middle with the forks spread as wide as possible, and allow for its length in bends and doorways.</li>
<li>Drum or tank of liquid: the contents surge when braking, so brake early and gently; check the hazard pictograms (see ${h.a('panneaux-pictogrammes', 'signs and pictograms')}).</li>
<li>Soft sack or big bag: it deforms and can slide off the forks, so use a suitable attachment if the manufacturer provides one.</li>
</ul>
<p>Entering a trailer also means driving up a slope, often the dock plate itself: the ${h.a('stabilite-chariot', 'forklift stability page')} reminds you to keep the load on the uphill side.</p>`,
  },
});
