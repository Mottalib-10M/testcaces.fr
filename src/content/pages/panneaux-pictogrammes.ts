import { definePage } from '../../lib/guide-types';
import { GRIDS, type Reco } from '../../lib/engine/exam';

/** Points d'un item du référentiel, lus dans la grille (jamais tapés). */
const n = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
const PICTO_ITEMS: Array<[Reco, string[]]> = [
  ['r489', ['expl-pictos', 'expl-produits-pictos', 'expl-produits-risques']],
  ['r485', ['expl-pictos', 'expl-produits-pictos', 'expl-produits-risques']],
  ['r486', ['expl-pictos']],
  ['r482', ['tech-pictogrammes', 'circ-panneaux']],
];
const sum = (r: Reco, ks: string[]) => ks.reduce((s, k) => s + n(r, k), 0);

export default definePage({
  id: 'panneaux-pictogrammes',
  group: 'themes',
  order: 30,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', match: 'panneau|pictogramme|SGH', size: 15 } },
  mini: { kind: 'mini:quota-r486' },
  related: ['circulation-signalisation', 'securite-risques', 'caces-r489', 'caces-nacelle', 'questions-reponses', 'examen-blanc'],
  sources: ['signalisation', 'clp', 'r489', 'r485', 'r486', 'r482'],
  fr: {
    slug: 'panneaux-pictogrammes',
    nav: 'Panneaux et pictogrammes',
    card: 'Formes et couleurs des panneaux de sécurité, neuf pictogrammes de danger des produits chimiques : la méthode pour les reconnaître au test.',
    title: 'Panneaux et pictogrammes CACES : signalisation et SGH',
    description: 'Panneaux et pictogrammes du CACES : interdiction, danger, obligation, secours, incendie, les neuf pictogrammes SGH des produits chimiques, avec un quiz corrigé.',
    h1: 'Panneaux et pictogrammes : les reconnaître du premier coup d’œil',
    intro: 'Le quiz mélange des questions de signalisation et de produits dangereux tirées de la banque R489. Les panneaux sont décrits par leur forme, leur couleur et leur symbole.',
    resume: (h) => `Au test théorique, la signalisation se joue en quelques secondes par question, à condition de connaître le code. Deux familles reviennent. Les panneaux de santé et de sécurité au travail, fixés par l’arrêté du 4 novembre 1993, combinent une forme et une couleur : rond barré de rouge pour une interdiction, triangle jaune bordé de noir pour un danger, rond bleu pour une obligation, carré ou rectangle vert pour le secours, rouge pour le matériel d’incendie. Les pictogrammes de danger des produits chimiques, imposés par le règlement européen CLP qui applique le système général harmonisé (SGH), sont des losanges à bord rouge sur fond blanc, au nombre de neuf. En R489, ces sujets valent ${sum('r489', PICTO_ITEMS[0][1])} points du thème exploitation, qui en compte ${h.pts('r489', 'expl')} ; en R486, les panneaux et pictogrammes pèsent à eux seuls ${n('r486', 'expl-pictos')} points. Les questions de cette page ont été rédigées par nous et décrivent chaque signe en mots.`,
    faqs: (h) => [
      { q: 'Comment distinguer un panneau d’interdiction d’un panneau d’obligation ?', a: 'Les deux sont ronds, mais leurs couleurs s’opposent. L’interdiction montre un symbole noir sur fond blanc, entouré d’un cercle rouge et barré d’une diagonale rouge. L’obligation présente un symbole blanc sur un disque bleu plein, sans bordure rouge. Si vous voyez du bleu, il faut faire quelque chose ; si vous voyez du rouge barré, il faut s’en abstenir.' },
      { q: 'Que veut dire « SGH » sur une étiquette ?', a: 'C’est le système général harmonisé de classification des produits chimiques, défini à l’échelle mondiale. L’Union européenne l’applique avec le règlement CLP. Chaque pictogramme porte un code, de SGH01 à SGH09, et s’accompagne d’une mention d’avertissement, « Danger » ou « Attention », ainsi que de phrases qui précisent le risque et les précautions.' },
      { q: 'Le pictogramme « point d’exclamation » est-il un danger mineur ?', a: 'Il signale des effets moins graves que la tête de mort ou la silhouette humaine abîmée : irritation de la peau ou des yeux, somnolence, sensibilisation cutanée, nocivité. Moins grave ne veut pas dire sans risque : on porte les gants et les lunettes prévus par la fiche de données de sécurité et on évite toute fuite en manutention.' },
      { q: 'Que signifient les pictogrammes imprimés sur les cartons ?', a: `Ce sont des consignes de manutention destinées à celui qui déplace le colis : verre pour fragile, flèches vers le haut pour le sens de pose, parapluie pour craindre l’humidité, pile barrée pour interdire le gerbage. La R489 demande de savoir les interpréter, car ils influent sur la façon de prendre et de stocker la charge, comme sur la page ${h.a('chargement-camion', 'chargement d’un camion')}.` },
    ],
    body: (h) => `
<h2>Les panneaux de sécurité au travail</h2>
${h.table(['Famille', 'Forme', 'Couleurs', 'Exemples sur site'], [['Interdiction', 'Ronde', 'Symbole noir, fond blanc, bord et barre rouges', 'Interdit aux piétons, défense de fumer'], ['Avertissement (danger)', 'Triangulaire', 'Symbole noir, fond jaune, bord noir', 'Chariots en circulation, charges suspendues'], ['Obligation', 'Ronde', 'Symbole blanc sur fond bleu', 'Casque, chaussures de sécurité, gilet'], ['Sauvetage, secours', 'Carrée ou rectangulaire', 'Symbole blanc sur fond vert', 'Issue de secours, premiers secours, douche'], ['Matériel d’incendie', 'Carrée ou rectangulaire', 'Symbole blanc sur fond rouge', 'Extincteur, robinet d’incendie armé']], 'D’après l’annexe I de l’arrêté du 4 novembre 1993 relatif à la signalisation de sécurité et de santé au travail.', ['l', 'l', 'l', 'l'])}
<p>Retenez la forme avant le dessin : un triangle annonce toujours un danger, un rond une règle (interdite en rouge, imposée en bleu), un carré une information utile. La couleur seule suffit à répondre à beaucoup de questions. Le texte de référence est l’${h.src('signalisation', 'arrêté du 4 novembre 1993')}, qui transpose la directive européenne sur la signalisation au travail. Les panneaux routiers rencontrés sur les chantiers et les voies de circulation sont traités dans la page ${h.a('circulation-signalisation', 'circulation et signalisation')}.</p>
<h2>Les neuf pictogrammes de danger des produits</h2>
${h.table(['Code', 'Symbole', 'Ce qu’il signale'], [['SGH01', 'Bombe qui explose', 'Produit explosif'], ['SGH02', 'Flamme', 'Produit inflammable'], ['SGH03', 'Flamme au-dessus d’un cercle', 'Produit comburant, qui active un feu'], ['SGH04', 'Bouteille de gaz', 'Gaz sous pression'], ['SGH05', 'Liquide qui ronge une main et une surface', 'Produit corrosif'], ['SGH06', 'Tête de mort sur tibias croisés', 'Toxicité aiguë'], ['SGH07', 'Point d’exclamation', 'Irritant, nocif, effet narcotique'], ['SGH08', 'Silhouette au torse étoilé', 'Danger grave pour la santé (cancérogène, mutagène…)'], ['SGH09', 'Arbre mort et poisson', 'Danger pour le milieu aquatique']], 'Pictogrammes du règlement (CE) n° 1272/2008, dit CLP : losange à bord rouge, symbole noir sur fond blanc.', ['l', 'l', 'l'])}
<p>Un cariste croise ces étiquettes sur des fûts, des bidons, des cuves de carburant ou des batteries. Le ${h.src('clp', 'règlement CLP')} impose le losange rouge sur tous les emballages vendus dans l’Union. Pour la manutention, deux réflexes : vérifier l’étanchéité et l’arrimage avant de lever, et savoir quoi faire en cas d’épandage. Un produit corrosif qui s’écoule sur une palette ne se nettoie pas à mains nues ; un produit inflammable s’éloigne de toute source de chaleur, y compris d’un moteur thermique.</p>
<h2>Combien de points selon la recommandation</h2>
${h.table(['Recommandation', 'Points du référentiel concernés', 'Points au test'], PICTO_ITEMS.map(([r, ks]) => [r.toUpperCase(), ks.map((k) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === k)!.fr).join(' ; '), sum(r, ks)]), 'Grilles des fiches d’évaluation théorique (annexe 3) des recommandations en vigueur.', ['l', 'l', 'r'])}
<p>Le mini-outil ci-dessous montre, thème par thème, le poids de chaque partie du test R489 et le minimum à y obtenir. Ces quelques points de signalisation sont parmi les plus faciles à sécuriser : quelques séances suffisent pour ne plus en perdre aucun. Les recommandations ${h.src('r489', 'R489')}, ${h.src('r485', 'R485')}, ${h.src('r486', 'R486')} et ${h.src('r482', 'R482')} les placent toutes dans leur référentiel.</p>
<!--tool:mini:quota-r489-->
<h2>Méthode pour le jour du test</h2>
<ol>
<li>Lisez la forme : triangle, rond, carré ou losange. Elle élimine la moitié des réponses.</li>
<li>Lisez la couleur : rouge barré, bleu, jaune, vert ou rouge plein.</li>
<li>Seulement ensuite, regardez le symbole pour choisir entre les réponses restantes.</li>
</ol>
<p>Pour vous entraîner sur l’ensemble de la banque, passez par les ${h.a('questions-reponses', 'questions-réponses')} ou par l’${h.a('examen-blanc', 'examen blanc')} de la recommandation qui vous concerne.</p>`,
  },
  en: {
    slug: 'safety-signs-pictograms',
    nav: 'Signs and pictograms',
    card: 'Shapes and colours of safety signs and the nine chemical hazard pictograms: the method to recognise them in the test.',
    title: 'CACES safety signs and pictograms: workplace and GHS',
    description: 'CACES safety signs and pictograms: prohibition, warning, mandatory, rescue and fire signs, the nine GHS hazard pictograms for chemicals, with a corrected quiz.',
    h1: 'Safety signs and pictograms: recognise them at a glance',
    intro: 'The quiz mixes sign and hazardous product questions from the R489 bank. Signs are described by their shape, colour and symbol.',
    resume: (h) => `In the theory test, signs are answered in a few seconds each, provided you know the code. Two families come up. Workplace health and safety signs, set by the French order of 4 November 1993, combine a shape and a colour: a circle crossed in red for a prohibition, a yellow triangle edged in black for a hazard, a blue circle for something mandatory, a green square or rectangle for first aid and escape, a red one for firefighting equipment. Hazard pictograms for chemicals, required by the European CLP regulation that applies the Globally Harmonised System (GHS, SGH in French), are red-bordered diamonds on a white background, nine in all. In R489, these topics are worth ${sum('r489', PICTO_ITEMS[0][1])} points of the operation theme, which totals ${h.pts('r489', 'expl')}; in R486, signs and pictograms alone carry ${n('r486', 'expl-pictos')} points. The questions on this page were written by us and describe each sign in words.`,
    faqs: (h) => [
      { q: 'How do I tell a prohibition sign from a mandatory sign?', a: 'Both are round, but their colours are opposites. A prohibition shows a black symbol on white, inside a red ring with a red diagonal bar. A mandatory sign shows a white symbol on a solid blue disc, with no red edge. If you see blue, you must do something; if you see red with a bar, you must not.' },
      { q: 'What does GHS (SGH) mean on a label?', a: 'It is the Globally Harmonised System for classifying chemicals, agreed worldwide. The European Union applies it through the CLP regulation. Each pictogram carries a code from GHS01 to GHS09 (SGH01 to SGH09 in French) and comes with a signal word, Danger or Warning (Attention in French), plus statements describing the hazard and the precautions.' },
      { q: 'Is the exclamation mark pictogram a minor hazard?', a: 'It flags effects less serious than the skull or the damaged human silhouette: skin or eye irritation, drowsiness, skin sensitisation, harmfulness. Less serious does not mean harmless: wear the gloves and goggles the safety data sheet requires and avoid any spill when handling.' },
      { q: 'What do the symbols printed on boxes mean?', a: `They are handling instructions for whoever moves the package: a glass for fragile, upward arrows for the right way up, an umbrella for keep dry, a crossed-out stack for do not stack. R489 expects you to interpret them, because they affect how the load is picked up and stored, as on the ${h.a('chargement-camion', 'lorry loading page')}.` },
    ],
    body: (h) => `
<h2>Workplace safety signs</h2>
${h.table(['Family', 'Shape', 'Colours', 'Examples on site'], [['Prohibition', 'Round', 'Black symbol, white background, red edge and bar', 'No pedestrians, no smoking'], ['Warning (hazard)', 'Triangular', 'Black symbol, yellow background, black edge', 'Forklift traffic, suspended loads'], ['Mandatory', 'Round', 'White symbol on blue', 'Helmet, safety shoes, high-visibility vest'], ['Rescue, first aid', 'Square or rectangular', 'White symbol on green', 'Emergency exit, first aid, safety shower'], ['Firefighting equipment', 'Square or rectangular', 'White symbol on red', 'Extinguisher, fire hose reel']], 'Based on annex I of the French order of 4 November 1993 on safety and health signs at work.', ['l', 'l', 'l', 'l'])}
<p>Read the shape before the drawing: a triangle always announces a hazard, a circle a rule (forbidden in red, required in blue), a square useful information. Colour alone answers many questions. The reference text is the ${h.src('signalisation', 'order of 4 November 1993')}, which transposes the European directive on workplace signs. Road signs found on building sites and traffic routes are covered on the ${h.a('circulation-signalisation', 'traffic and signs page')}.</p>
<h2>The nine hazard pictograms for chemicals</h2>
${h.table(['Code', 'Symbol', 'What it means'], [['GHS01', 'Exploding bomb', 'Explosive'], ['GHS02', 'Flame', 'Flammable'], ['GHS03', 'Flame over a circle', 'Oxidising, feeds a fire'], ['GHS04', 'Gas cylinder', 'Gas under pressure'], ['GHS05', 'Liquid eating into a hand and a surface', 'Corrosive'], ['GHS06', 'Skull and crossbones', 'Acute toxicity'], ['GHS07', 'Exclamation mark', 'Irritant, harmful, narcotic effect'], ['GHS08', 'Silhouette with a starburst chest', 'Serious health hazard (carcinogenic, mutagenic…)'], ['GHS09', 'Dead tree and fish', 'Hazardous to aquatic life']], 'Pictograms of Regulation (EC) No 1272/2008, known as CLP: red-bordered diamond, black symbol on white.', ['l', 'l', 'l'])}
<p>A forklift driver meets these labels on drums, cans, fuel tanks and batteries. The ${h.src('clp', 'CLP regulation')} requires the red diamond on every package sold in the Union. For handling, two habits: check that containers are sealed and secured before lifting, and know what to do after a spill. A corrosive leaking onto a pallet is never cleaned with bare hands; a flammable product is kept away from heat, including a combustion engine.</p>
<h2>How many points, recommendation by recommendation</h2>
${h.table(['Recommendation', 'Syllabus points concerned', 'Points in the test'], PICTO_ITEMS.map(([r, ks]) => [r.toUpperCase(), ks.map((k) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === k)!.en).join('; '), sum(r, ks)]), 'Grids of the theory assessment sheets (annex 3) of the recommendations in force.', ['l', 'l', 'r'])}
<p>The mini tool below shows, theme by theme, the weight of each part of the R489 test and the minimum to score in it. These few sign points are among the easiest to secure: a handful of sessions is enough to stop dropping any. The ${h.src('r489', 'R489')}, ${h.src('r485', 'R485')}, ${h.src('r486', 'R486')} and ${h.src('r482', 'R482')} recommendations all include them in their syllabus.</p>
<!--tool:mini:quota-r489-->
<h2>Method for test day</h2>
<ol>
<li>Read the shape: triangle, circle, square or diamond. It rules out half the answers.</li>
<li>Read the colour: red with a bar, blue, yellow, green or solid red.</li>
<li>Only then look at the symbol to choose between the remaining answers.</li>
</ol>
<p>The real test is in French, so learn the key words: interdiction (prohibition), obligation (mandatory), danger (warning), secours (first aid). To practise across the whole bank, use the ${h.a('questions-reponses', 'questions and answers')} or the ${h.a('examen-blanc', 'mock exam')} for your recommendation.</p>`,
  },
});
