import { definePage } from '../../lib/guide-types';
import { readPlate, PLAQUES } from '../../lib/engine/physique';
import { GRIDS, type Reco } from '../../lib/engine/exam';

const n = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
/** Diagramme fictif G1 (src/data/bank/plaques.json) : portée en m → charge maximale en kg. */
const G1 = PLAQUES.G1;
const at = (m: number) => readPlate('G1', m, 0)?.kg ?? 0;
const ex = { load: 1400, acc: 150, reach: 8 };

export default definePage({
  id: 'elingage',
  group: 'themes',
  order: 70,
  tool: { kind: 'quiz', props: { reco: 'r490', mode: 'practice', theme: 'elingage', size: 15 } },
  mini: { kind: 'mini:grue' },
  related: ['caces-r490', 'abaque-de-charge', 'fin-de-poste', 'circulation-signalisation', 'caces-r482', 'examen-blanc'],
  sources: ['r490', 'r482'],
  fr: {
    slug: 'elingage',
    nav: 'Élingage et accessoires',
    card: 'Choisir l’élingue, tenir compte de l’angle et du mode, repérer l’usure et guider la manœuvre : le thème élingage de la R490.',
    title: 'Élingage CACES R490 : élingues, CMU, angle et défauts',
    description: 'Élingage au CACES R490 : choisir l’élingue selon la CMU, le mode et l’angle, repérer les défauts qui imposent le rebut, gestes de guidage. Quiz corrigé.',
    h1: 'Élingage : choisir, contrôler et utiliser les accessoires de levage',
    intro: 'Le quiz pioche dans le thème élingage de la R490, grue de chargement. Les mêmes règles valent pour tout levage au crochet, y compris avec un engin de chantier.',
    resume: (h) => `L’élingage relie la charge au crochet de l’appareil de levage, avec des élingues en chaîne, en câble ou en textile, des manilles, un palonnier ou une fourche à palettes. Au test théorique de la R490, il forme un thème à part de ${h.pts('r490', 'elingage')} points sur 100, avec un minimum de ${h.min('r490', 'elingage')} : ${n('r490', 'elingage-regles')} points sur les règles d’élingage et le choix des accessoires, ${n('r490', 'elingage-anomalies')} sur leurs défauts et leur usure. Trois idées dominent. D’abord, la charge maximale d’utilisation (CMU) d’une élingue dépend de sa façon d’être utilisée : en levage droit, en nœud coulant ou en panier, et de l’angle que forment les brins. Ensuite, un accessoire sans marquage lisible ou abîmé est retiré du service, sans discussion. Enfin, la masse des accessoires s’ajoute à celle de la charge quand on lit le diagramme de la grue. La R482 interroge aussi le rôle de l’élingueur et le levage de charges avec un engin de chantier.`,
    faqs: (h) => [
      { q: 'Pourquoi l’angle des brins réduit-il la capacité ?', a: 'Quand deux brins s’écartent, chacun ne tire plus seulement vers le haut mais aussi vers l’intérieur. Pour soulever la même masse, la tension dans chaque brin augmente à mesure que l’angle au sommet s’ouvre. L’étiquette de l’élingue donne la CMU selon l’angle : au-delà de la valeur maximale indiquée, l’élingue ne s’utilise pas. Un palonnier permet de garder les brins presque verticaux.' },
      { q: 'Une élingue à quatre brins porte-t-elle quatre fois plus ?', a: 'Pas forcément. Sur une charge rigide, il est rare que les quatre brins soient tendus de la même façon : la charge peut ne reposer que sur deux d’entre eux. Le fabricant indique une CMU pour l’élingue complète, calculée en tenant compte de ce phénomène. On ne multiplie jamais soi-même la capacité d’un brin par le nombre de brins.' },
      { q: 'Quels défauts imposent de mettre une élingue au rebut ?', a: 'Pour un câble : fils ou torons cassés, écrasement, « cage d’oiseau ». Pour une chaîne : maillon allongé, tordu, fissuré ou usé. Pour un textile : coupure, gaine déchirée laissant voir l’âme, brûlure, contact avec un produit chimique. Pour tous : étiquette ou plaque d’identification illisible ou absente. Un crochet ouvert ou sans linguet est également écarté.' },
      { q: 'Qui donne les ordres pendant un levage à l’aveugle ?', a: `Quand le grutier ne voit pas la charge, un chef de manœuvre ou un signaleur le guide par des gestes conventionnels ou par radio. Un seul guide à la fois, placé en vue du grutier et hors de la trajectoire de la charge. Le test pratique R490 prévoit une dépose dans une zone masquée, avec gestes et consignes radio. Voir la page ${h.a('caces-r490', 'CACES R490')}.` },
    ],
    body: (h) => `
<h2>Les accessoires et leur usage</h2>
${h.table(['Accessoire', 'Usage courant', 'Point d’attention'], [['Élingue chaîne', 'Charges lourdes, arêtes vives, chaleur', 'Maillons et crochets à contrôler un par un'], ['Élingue câble', 'Charges lourdes et régulières', 'Fils cassés, coques, écrasement'], ['Élingue textile (sangle, ronde)', 'Charges fragiles ou peintes', 'Protéger des arêtes, de la chaleur et des produits'], ['Manille', 'Relier élingue et point de levage', 'Axe d’origine, vissé à fond, effort dans l’axe'], ['Palonnier', 'Charges longues ou souples', 'Masse du palonnier à ajouter à la charge'], ['Fourche à palettes', 'Palettes et colis', 'Charge sécurisée contre la chute']], 'Accessoires cités dans le référentiel R490 (accessoires de levage et règles d’élingage).', ['l', 'l', 'l'])}
<p>Chaque accessoire porte un marquage : fabricant, CMU, et pour les élingues à plusieurs brins, la CMU selon l’angle. Une élingue textile se reconnaît aussi à sa couleur, qui renvoie à un code normalisé de capacité ; l’étiquette cousue reste toutefois la seule référence. L’utilisateur, grutier ou élingueur, examine visuellement ses accessoires avant chaque levage.</p>
<h2>Trois modes, trois capacités</h2>
<ul>
<li>Levage droit : un brin vertical entre le crochet et la charge. C’est la capacité de référence de l’élingue.</li>
<li>Nœud coulant (étranglé) : l’élingue serre la charge, utile pour des tubes ou des profilés. La capacité baisse par rapport au levage droit.</li>
<li>Panier : l’élingue passe sous la charge et ses deux extrémités montent au crochet. La capacité dépend alors de l’angle entre les deux brins.</li>
</ul>
<h2>Le thème élingage du test R490</h2>
${h.items('r490', 'elingage')}
<h2>Lire le diagramme de la grue</h2>
${h.table(['Portée', 'Charge maximale'], G1.rows.map(([m, v]) => [`${h.num(m, 1)} m`, `${h.num(v[0])} kg`]), `Diagramme fictif G1 : ${G1.fr}. Exercice uniquement.`, ['l', 'r'])}
<p>Exemple : une charge de ${h.num(ex.load)} kg levée avec ${h.num(ex.acc)} kg d’élingues et de palonnier, à poser à ${h.num(ex.reach)} m. On lit la portée égale ou supérieure, ici ${h.num(10)} m : ${h.num(at(ex.reach))} kg. La masse totale, ${h.num(ex.load + ex.acc)} kg, dépasse : il faut rapprocher le porteur pour travailler à ${h.num(7.5, 1)} m, où le diagramme autorise ${h.num(at(7.5))} kg. Le mini-outil refait ce calcul ; la même logique de lecture s’applique à la plaque d’un chariot, expliquée sur la page ${h.a('abaque-de-charge', 'abaque de charge')}.</p>
<h2>Pendant le levage</h2>
<p>On lève de quelques centimètres pour vérifier l’équilibre de la charge et la tenue de l’élingage, puis on poursuit. Personne ne passe sous une charge suspendue ; on maîtrise le ballant par des mouvements progressifs, au besoin avec une corde de guidage tenue à distance. Les gestes de commandement suivent une norme française commune à la grue, à la nacelle et aux engins de chantier, et la ${h.src('r490', 'recommandation R490')} demande de les comprendre. La ${h.src('r482', 'R482')} consacre ${n('r482', 'expl-levage')} points au levage de charges avec un engin de chantier. Les défauts de la grue elle-même, flexibles et structure, sont traités dans la page ${h.a('fin-de-poste', 'vérifications et fin de poste')}.</p>`,
  },
  en: {
    slug: 'slinging-lifting-accessories',
    nav: 'Slinging and accessories',
    card: 'Choosing the sling, allowing for angle and hitch, spotting wear and guiding the lift: the R490 slinging theme.',
    title: 'CACES R490 slinging: slings, WLL, angles and defects',
    description: 'Slinging for the CACES R490: pick the sling by WLL, hitch and angle, spot the defects that mean scrapping it, hand signals. Corrected quiz on the theme.',
    h1: 'Slinging: choosing, checking and using lifting accessories',
    intro: 'The quiz draws on the slinging theme of R490, the loader crane recommendation. The same rules apply to any hook lift, including with construction machinery.',
    resume: (h) => `Slinging (élingage) connects the load to the hook of the lifting appliance, using chain, wire rope or textile slings, shackles, a spreader beam or pallet forks. In the R490 theory test it is a theme of its own worth ${h.pts('r490', 'elingage')} points out of 100, with a minimum of ${h.min('r490', 'elingage')}: ${n('r490', 'elingage-regles')} points on slinging rules and choosing accessories, ${n('r490', 'elingage-anomalies')} on their defects and wear. Three ideas dominate. First, a sling’s working load limit (WLL, CMU in French) depends on how it is used: straight, choked or in a basket hitch, and on the angle between the legs. Second, an accessory with unreadable marking or visible damage is taken out of service, no argument. Third, the mass of the accessories is added to the load when reading the crane’s chart. R482 also asks about the slinger’s role and lifting loads with construction machinery. In the French test, élingue means sling and manille means shackle.`,
    faqs: (h) => [
      { q: 'Why does the leg angle reduce capacity?', a: 'When two legs spread apart, each one pulls not only upwards but also inwards. To lift the same mass, the tension in each leg rises as the angle at the top opens. The sling label gives the WLL by angle: beyond the maximum value shown, the sling must not be used. A spreader beam keeps the legs close to vertical.' },
      { q: 'Does a four-leg sling carry four times as much?', a: 'Not necessarily. On a rigid load, the four legs are rarely under equal tension: the load may rest on just two of them. The manufacturer states a WLL for the complete sling that allows for this. Never multiply the capacity of one leg by the number of legs yourself.' },
      { q: 'Which defects mean a sling must be scrapped?', a: 'For wire rope: broken wires or strands, crushing, “birdcaging”. For chain: a stretched, bent, cracked or worn link. For textile: a cut, a torn cover showing the core, a burn, contact with a chemical. For all: an identification label or tag that is unreadable or missing. An opened hook or one without its safety catch is also withdrawn.' },
      { q: 'Who gives the orders during a blind lift?', a: `When the crane operator cannot see the load, a lift supervisor or signaller guides them by conventional hand signals or by radio. Only one guide at a time, within the operator’s sight and out of the load’s path. The R490 practical test includes setting a load down in a hidden area, with hand signals and radio instructions. See the ${h.a('caces-r490', 'R490 CACES page')}.` },
    ],
    body: (h) => `
<h2>Accessories and their use</h2>
${h.table(['Accessory', 'Typical use', 'Watch point'], [['Chain sling', 'Heavy loads, sharp edges, heat', 'Check links and hooks one by one'], ['Wire rope sling', 'Heavy, regular loads', 'Broken wires, kinks, crushing'], ['Textile sling (flat, round)', 'Fragile or painted loads', 'Protect from edges, heat and chemicals'], ['Shackle', 'Linking sling and lifting point', 'Original pin, fully screwed, load in line'], ['Spreader beam', 'Long or flexible loads', 'Add the beam’s mass to the load'], ['Pallet forks', 'Pallets and packages', 'Load secured against falling']], 'Accessories named in the R490 syllabus (lifting accessories and slinging rules).', ['l', 'l', 'l'])}
<p>Every accessory carries a marking: manufacturer, WLL and, for multi-leg slings, the WLL by angle. A textile sling can also be recognised by its colour, which refers to a standard capacity code; the sewn label nevertheless remains the only reference. The user, whether crane operator or slinger, inspects the accessories visually before every lift.</p>
<h2>Three hitches, three capacities</h2>
<ul>
<li>Straight lift: one vertical leg between hook and load. This is the sling’s reference capacity.</li>
<li>Choke hitch: the sling tightens around the load, useful for tubes or sections. Capacity drops compared with a straight lift.</li>
<li>Basket hitch: the sling passes under the load and both ends go up to the hook. Capacity then depends on the angle between the two legs.</li>
</ul>
<h2>The R490 slinging theme</h2>
${h.items('r490', 'elingage')}
<h2>Reading the crane chart</h2>
${h.table(['Outreach', 'Maximum load'], G1.rows.map(([m, v]) => [`${h.num(m, 1)} m`, `${h.num(v[0])} kg`]), `Fictitious chart G1: ${G1.en}. For practice only.`, ['l', 'r'])}
<p>Example: a ${h.num(ex.load)} kg load lifted with ${h.num(ex.acc)} kg of slings and spreader beam, to be placed at ${h.num(ex.reach)} m. Read the equal or next greater outreach, here ${h.num(10)} m: ${h.num(at(ex.reach))} kg. The total mass, ${h.num(ex.load + ex.acc)} kg, is too much: move the carrier closer to work at ${h.num(7.5, 1)} m, where the chart allows ${h.num(at(7.5))} kg. The mini tool repeats this calculation; the same reading logic applies to a forklift plate, explained on the ${h.a('abaque-de-charge', 'load chart page')}.</p>
<h2>During the lift</h2>
<p>Lift a few centimetres first to check the load’s balance and the slinging, then carry on. Nobody walks under a suspended load; control swing with gradual movements, using a tag line held at a distance if needed. Hand signals follow a French standard shared by cranes, aerial lifts and construction machinery, and the ${h.src('r490', 'R490 recommendation')} requires operators to understand them. ${h.src('r482', 'R482')} gives ${n('r482', 'expl-levage')} points to lifting loads with construction machinery. Defects of the crane itself, hoses and structure, are covered on the ${h.a('fin-de-poste', 'checks and end of shift page')}.</p>`,
  },
});
