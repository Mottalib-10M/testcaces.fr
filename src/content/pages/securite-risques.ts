import { definePage } from '../../lib/guide-types';
import { GRIDS, RECOS, type Reco } from '../../lib/engine/exam';

const n = (r: Reco, key: string) => GRIDS[r].themes.flatMap((t) => t.items).find((i) => i.key === key)?.n ?? 0;
/** Points « acteurs de la prévention » de chaque recommandation (clé différente selon la grille). */
const acteurs = (r: Reco) => n(r, 'cg-acteurs') || n(r, 'cg-acteurs-prevention');

export default definePage({
  id: 'securite-risques',
  group: 'themes',
  order: 50,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'practice', theme: 'cg', size: 15 } },
  mini: { kind: 'mini:quota-r486' },
  related: ['autorisation-de-conduite', 'panneaux-pictogrammes', 'fin-de-poste', 'caces-r489', 'caces-r486', 'examen-blanc'],
  sources: ['r489', 'r486', 'r482', 'ct55', 'ct56', 'arrete2025'],
  fr: {
    slug: 'securite-risques',
    nav: 'Sécurité et prévention',
    card: 'Qui fait quoi en prévention, droit d’alerte et de retrait, causes d’accident et protections individuelles : le thème connaissances générales.',
    title: 'Sécurité CACES : acteurs, droit de retrait et risques',
    description: 'Sécurité au CACES : rôle de l’employeur et du conducteur, droit d’alerte et de retrait, Carsat, médecin du travail, accidents et EPI, avec un quiz corrigé.',
    h1: 'Sécurité et prévention : ce que le conducteur doit savoir',
    intro: 'Le quiz tire ses questions du thème connaissances générales de la R489 : responsabilités, acteurs de la prévention, catégories et règles du CACES.',
    resume: (h) => `Le premier thème de chaque test théorique porte sur les responsabilités de chacun. En R489, il vaut ${h.pts('r489', 'cg')} points sur 100, avec un minimum de ${h.min('r489', 'cg')}, dont ${n('r489', 'cg-roles-conducteur')} pour le seul rôle du conducteur : son devoir d’alerter, son droit de se retirer d’une situation dangereuse, son obligation de ne pas neutraliser un dispositif de sécurité. Le Code du travail confie à l’employeur la formation des conducteurs (article R4323-55) et la délivrance d’une autorisation de conduite écrite (article R4323-56). Le cadre de cette formation est fixé, depuis le ${h.date(h.P.medical.since)}, par l’arrêté du 26 septembre 2025, qui a remplacé le texte de 1998. L’aptitude médicale est attestée par le médecin du travail pour ${h.P.medical.attestationYears} ans. Les connaissances générales pèsent ${h.pts('r486', 'cg')} points en R486, ${h.pts('r482', 'cg')} en R482 et ${h.pts('r490', 'cg')} en R490. Ce thème court se perd vite : quelques erreurs suffisent à passer sous la moitié.`,
    faqs: (h) => [
      { q: 'Quand peut-on exercer son droit de retrait ?', a: 'Quand on a un motif raisonnable de penser qu’une situation présente un danger grave et imminent pour sa vie ou sa santé : freins défaillants, charge instable au-dessus d’une zone occupée, orage sur une nacelle. Il faut alerter l’employeur immédiatement. Le retrait ne doit pas créer un nouveau danger pour d’autres, par exemple en laissant une charge suspendue.' },
      { q: 'Le CACES suffit-il pour conduire au travail ?', a: `Non. Le CACES prouve des connaissances et un savoir-faire à une date donnée. Pour conduire, il faut en plus une autorisation de conduite écrite de l’employeur, qui tient compte de l’aptitude médicale et de la connaissance des lieux et des consignes du site. La page ${h.a('autorisation-de-conduite', 'autorisation de conduite')} détaille les trois conditions.` },
      { q: 'Quel rôle joue la Carsat pour le CACES ?', a: 'La Carsat (Cramif en Île-de-France, CGSS outre-mer) est la caisse régionale de l’Assurance Maladie chargée des risques professionnels. Son service prévention conseille les entreprises, contrôle les conditions de travail et peut recevoir une réclamation contre un organisme testeur. Les recommandations CACES sont adoptées au niveau national et diffusées par ce réseau, avec l’appui technique de l’INRS.' },
      { q: 'Quels EPI pour un cariste ou un conducteur d’engin ?', a: 'Ceux que l’analyse des risques impose : chaussures de sécurité presque partout, gilet haute visibilité en zone de circulation, casque sous les charges ou sur chantier, gants pour la manutention, harnais attaché au point prévu dans une nacelle à bras. La ceinture de l’engin n’est pas un EPI mais un dispositif de retenue : on l’attache dès qu’elle existe.' },
    ],
    body: (h) => `
<h2>Qui fait quoi dans la prévention</h2>
${h.table(['Acteur', 'Rôle pour le conducteur d’engin'], [['Employeur', 'Fournit un engin conforme et vérifié, forme, délivre l’autorisation de conduite, organise le travail'], ['Constructeur', 'Livre un engin conforme et une notice d’instructions en français'], ['Conducteur', 'Prend soin de sa sécurité et de celle des autres, signale les anomalies, alerte, peut se retirer'], ['Médecin du travail', 'Vérifie l’absence de contre-indication médicale à la conduite'], ['Inspection du travail', 'Contrôle l’application du Code du travail, peut dresser procès-verbal'], ['Carsat, Cramif, CGSS', 'Conseil et contrôle en prévention, suivi du dispositif CACES en région'], ['INRS', 'Études, guides et outils techniques en santé et sécurité'], ['CSE', 'Représente les salariés, peut être consulté sur les conditions de travail']], 'Acteurs cités dans le thème connaissances générales des recommandations CACES.', ['l', 'l'])}
<p>Une question type demande qui délivre tel document : l’autorisation de conduite vient de l’employeur, l’attestation médicale du médecin du travail, le CACES de l’organisme testeur certifié. Une autre demande ce que fait le conducteur face à une anomalie : il ne s’en accommode pas, il la signale, et il n’utilise pas l’engin si elle touche la sécurité.</p>
<h2>Le poids du thème selon l’engin</h2>
${h.table(['Recommandation', 'Connaissances générales', 'Minimum', 'Dont acteurs de la prévention'], RECOS.map((r) => [r.toUpperCase(), h.pts(r, 'cg'), h.min(r, 'cg'), acteurs(r)]), 'Grilles des fiches d’évaluation théorique, annexe 3 de chaque recommandation.', ['l', 'r', 'r', 'r'])}
<p>Deux conditions datées pèsent sur l’autorisation que signe l’employeur : un CACES encore valable et une attestation médicale de moins de ${h.P.medical.attestationYears} ans. Le mini-outil suivant vérifie les deux pour la recommandation choisie.</p>
<!--tool:mini:autorisation-->
<h2>Pourquoi les accidents arrivent</h2>
<p>Les analyses d’accidents d’engins retrouvent souvent les mêmes enchaînements, que le thème exploitation interroge en détail : conducteur non formé ou non autorisé qui « dépanne », anomalie connue mais non signalée, vitesse inadaptée à une zone sans visibilité, capacité dépassée faute d’avoir lu la plaque, piétons et engins qui partagent la même allée. La plupart relèvent de l’organisation autant que du geste. La page ${h.a('circulation-signalisation', 'circulation et signalisation')} reprend les règles de déplacement, et la page ${h.a('fin-de-poste', 'vérifications et fin de poste')} les contrôles qui évitent de partir avec un engin défaillant.</p>
<h2>Substances, téléphone et fatigue</h2>
<p>Chaque recommandation consacre des points à l’alcool, aux drogues et aux médicaments, et un autre aux distractions comme le téléphone ou la musique. La règle est simple : on ne conduit pas sous l’emprise d’une substance qui altère la vigilance, et un médicament dont la boîte porte un pictogramme de conduite se signale au médecin du travail. Un appel ou un message attend que l’engin soit arrêté.</p>
<h2>Les textes de référence</h2>
<p>Les articles ${h.src('ct55', 'R4323-55')} et ${h.src('ct56', 'R4323-56')} du Code du travail posent la formation et l’autorisation de conduite. L’${h.src('arrete2025', 'arrêté du 26 septembre 2025')} encadre la formation à la conduite des équipements mobiles et de levage. Les recommandations ${h.src('r489', 'R489')}, ${h.src('r486', 'R486')} et ${h.src('r482', 'R482')} décrivent le test et son barème.</p>`,
  },
  en: {
    slug: 'safety-prevention',
    nav: 'Safety and prevention',
    card: 'Who does what in prevention, the right to alert and withdraw, accident causes and protective equipment: the general knowledge theme.',
    title: 'CACES safety: prevention roles, right to withdraw, risks',
    description: 'CACES safety: employer and operator duties, the right to alert and withdraw, Carsat, occupational doctor, accident causes and PPE, with a corrected quiz.',
    h1: 'Safety and prevention: what every operator should know',
    intro: 'The quiz draws on the R489 general knowledge theme: responsibilities, prevention bodies, categories and CACES rules.',
    resume: (h) => `The first theme of every theory test covers who is responsible for what. In R489 it is worth ${h.pts('r489', 'cg')} points out of 100, with a minimum of ${h.min('r489', 'cg')}, of which ${n('r489', 'cg-roles-conducteur')} cover the driver’s own role: the duty to raise the alarm, the right to withdraw from a dangerous situation (droit de retrait), the obligation never to disable a safety device. The French Labour Code makes the employer responsible for operator training (article R4323-55) and for a written operating authorisation (article R4323-56). Since ${h.date(h.P.medical.since)}, the training framework has been set by the order of 26 September 2025, which replaced the 1998 text. Medical fitness is certified by the occupational health service for ${h.P.medical.attestationYears} years. General knowledge carries ${h.pts('r486', 'cg')} points in R486, ${h.pts('r482', 'cg')} in R482 and ${h.pts('r490', 'cg')} in R490. This short theme is easy to lose: a few mistakes are enough to drop below half.`,
    faqs: (h) => [
      { q: 'When can I use the right to withdraw?', a: 'When you have reasonable grounds to believe a situation poses a serious and imminent danger to your life or health: failing brakes, an unstable load above an occupied area, a storm while in an aerial lift. You must alert your employer at once. Withdrawing must not create a new danger for others, for instance by leaving a load hanging.' },
      { q: 'Is the CACES enough to operate at work?', a: `No. The CACES proves knowledge and skills on a given date. To operate, you also need a written operating authorisation (autorisation de conduite) from your employer, which takes account of medical fitness and knowledge of the site and its rules. The ${h.a('autorisation-de-conduite', 'operating authorisation page')} details the three conditions.` },
      { q: 'What does the Carsat do for the CACES?', a: 'The Carsat (Cramif in the Paris region, CGSS overseas) is the regional French Health Insurance fund that handles occupational risks. Its prevention service advises companies, inspects working conditions and can receive a complaint about a testing body. CACES recommendations are adopted nationally and spread through this network, with technical support from the INRS research institute.' },
      { q: 'What protective equipment does an operator need?', a: 'Whatever the risk assessment requires: safety shoes almost everywhere, a high-visibility vest in traffic areas, a helmet under loads or on building sites, gloves for handling, a harness clipped to the anchor point in a boom lift. The machine’s seat belt is not personal equipment but a restraint device: fasten it whenever one is fitted.' },
    ],
    body: (h) => `
<h2>Who does what in prevention</h2>
${h.table(['Party', 'Role for the machine operator'], [['Employer', 'Supplies a compliant, inspected machine, trains, issues the operating authorisation, organises the work'], ['Manufacturer', 'Delivers a compliant machine and instructions in French'], ['Operator', 'Looks after their own safety and others’, reports defects, raises the alarm, may withdraw'], ['Occupational doctor', 'Checks there is no medical reason against operating'], ['Labour inspectorate', 'Enforces the Labour Code, may issue an official report'], ['Carsat, Cramif, CGSS', 'Prevention advice and inspection, regional follow-up of the CACES scheme'], ['INRS', 'Research, guides and technical tools on health and safety'], ['CSE (staff committee)', 'Represents employees, may be consulted on working conditions']], 'Parties named in the general knowledge theme of the CACES recommendations.', ['l', 'l'])}
<p>A typical question asks who issues a given document: the operating authorisation comes from the employer, the medical certificate from the occupational doctor, the CACES from the certified testing body. Another asks what the operator does about a defect: never put up with it, report it, and do not use the machine if it affects safety.</p>
<h2>Weight of the theme by machine</h2>
${h.table(['Recommendation', 'General knowledge', 'Minimum', 'Of which prevention bodies'], RECOS.map((r) => [r.toUpperCase(), h.pts(r, 'cg'), h.min(r, 'cg'), acteurs(r)]), 'Grids of the theory assessment sheets, annex 3 of each recommendation.', ['l', 'r', 'r', 'r'])}
<p>Two dated conditions weigh on the authorisation the employer signs: a CACES still in force and a medical certificate less than ${h.P.medical.attestationYears} years old. The next mini tool checks both for the recommendation you pick.</p>
<!--tool:mini:autorisation-->
<h2>Why accidents happen</h2>
<p>Analyses of machine accidents often find the same chains of events, which the operation theme examines in detail: an untrained or unauthorised driver “helping out”, a known defect left unreported, speed too high for an area with no visibility, capacity exceeded because the plate was not read, pedestrians and machines sharing the same aisle. Most are about organisation as much as driving. The ${h.a('circulation-signalisation', 'site traffic page')} covers movement rules, and the ${h.a('fin-de-poste', 'checks and end of shift page')} covers the checks that stop you setting off with a faulty machine.</p>
<h2>Substances, phones and tiredness</h2>
<p>Every recommendation gives points to alcohol, drugs and medicines, and others to distractions such as phones or music. The rule is simple: never operate under the influence of anything that dulls alertness, and tell the occupational doctor about any medicine whose box carries a driving warning pictogram. Calls and messages wait until the machine is parked.</p>
<h2>Reference texts</h2>
<p>Articles ${h.src('ct55', 'R4323-55')} and ${h.src('ct56', 'R4323-56')} of the Labour Code set out training and the operating authorisation. The ${h.src('arrete2025', 'order of 26 September 2025')} governs training for mobile and lifting equipment. The ${h.src('r489', 'R489')}, ${h.src('r486', 'R486')} and ${h.src('r482', 'R482')} recommendations describe the test and its marking. Keep in mind the French terms the test uses: employeur, conducteur, droit de retrait, autorisation de conduite.</p>`,
  },
});
