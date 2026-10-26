import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-r490',
  group: 'categories',
  order: 70,
  tool: { kind: 'quiz', props: { reco: 'r490', mode: 'exam' } },
  mini: { kind: 'mini:grue' },
  related: ['elingage', 'chargement-camion', 'duree-validite', 'recyclage-caces', 'caces-prix', 'examen-blanc'],
  sources: ['r490', 'tableau', 'cdc_catalogue'],
  fr: {
    slug: 'caces-r490',
    nav: 'CACES R490 : grue de chargement',
    card: 'Test blanc R490 de 100 questions, élingage, diagramme de charge, validité étendue à 10 ans et prix médian.',
    title: 'CACES R490 : test blanc grue de chargement, 100 questions',
    description: 'CACES R490 : test théorique blanc de 100 questions sur la grue de chargement, élingage et diagramme de charge, validité de 5 ou 10 ans et prix médian.',
    h1: 'CACES R490 : test blanc de la grue de chargement',
    intro: 'Le test ci-dessous suit la fiche d’évaluation de la R490 : 14 points de connaissances générales, 28 de technologie, 38 d’exploitation, 10 d’élingage et 10 d’entretien.',
    resume: (h) => `La recommandation R490 de l’Assurance Maladie encadre la conduite des grues de chargement, ces grues auxiliaires montées sur un camion qui servent à le charger et le décharger, ou à livrer des matériaux sur un chantier. Sa version en vigueur est la ${h.P.recos.r490.version}, publiée en juillet 2026. Il n’y a qu’une catégorie, complétée par une option télécommande quand la grue se manœuvre depuis un boîtier déporté. Le CACES R490 vaut ${h.years('r490')} ans, avec une particularité : la validité de la partie pratique peut être portée à ${h.P.recos.r490.practicalExtendedYears} ans si le titulaire justifie d’au moins ${h.P.recos.r490.extendedDaysPerYear} jours de conduite par an pendant cinq ans et repasse le test théorique. Le barème théorique est le seul à compter un thème d’élingage, sur ${h.pts('r490', 'elingage')} points, et un thème d’entretien sur ${h.pts('r490', 'maint')} points. Au ${h.cpfDate}, la formation initiale médiane coûte ${h.med('r490', 'grue')} au catalogue Mon Compte Formation.`,
    faqs: (h) => [
      { q: 'Comment prolonger le CACES R490 à 10 ans ?', a: `À l’échéance des ${h.years('r490')} ans, le titulaire qui justifie d’au moins ${h.P.recos.r490.extendedDaysPerYear} jours de conduite de grue de chargement par an sur les cinq années repasse le test théorique ; la partie pratique est alors prolongée pour atteindre ${h.P.recos.r490.practicalExtendedYears} ans. Les justificatifs viennent de l’employeur. Sans eux, les deux tests sont à repasser.` },
      { q: 'Qu’est-ce que l’option télécommande ?', a: 'Une grue de chargement peut se commander depuis les leviers fixés sur le camion ou depuis une télécommande portée par l’opérateur. Le CACES R490 de base couvre la conduite aux leviers ; l’option télécommande ajoute une épreuve pratique d’une demi-unité de test et autorise la conduite à distance.' },
      { q: 'Le CACES R490 couvre-t-il les grues mobiles ?', a: 'Non. La grue mobile automotrice relève de la recommandation R483, la grue à tour de la R487 et le pont roulant de la R484. La R490 ne couvre que la grue de chargement, montée sur un porteur dont la fonction principale est le transport.' },
      { q: 'Faut-il savoir élinguer pour le CACES R490 ?', a: `Oui. L’élingage vaut ${h.pts('r490', 'elingage')} points au test théorique, avec un minimum de ${h.min('r490', 'elingage')}, et il est évalué à l’épreuve pratique. Le conducteur de grue de chargement est souvent seul et élingue lui-même : choix de l’élingue selon la charge et l’angle, contrôle des accessoires, gestes de commandement.` },
    ],
    body: (h) => `
<h2>Le barème du test théorique</h2>
${h.grid('r490')}
<p>Deux thèmes de ${h.pts('r490', 'elingage')} points, élingage et entretien, demandent chacun ${h.min('r490', 'elingage')} bonnes réponses au moins. L’élingage se joue sur quelques notions précises : la charge maximale d’utilisation d’une élingue baisse quand l’angle entre les brins s’ouvre, et un accessoire abîmé est retiré du service, pas réparé sur place. La page ${h.a('elingage', 'élingage')} les reprend en détail.</p>
<h2>Lire un diagramme de charge de grue</h2>
<p>La capacité d’une grue de chargement dépend de la portée : plus la flèche s’étend loin du camion, moins elle lève. Le diagramme, affiché sur la grue, donne la charge maximale par tranche de portée. Il suppose le camion calé sur ses stabilisateurs, sur un sol portant. Le mini-outil de cette page lit un diagramme fictif, repéré G1, utilisé aussi dans les questions de la banque.</p>
<!--tool:mini:ut-r490-->
${h.table(['', 'Valeur', 'Source'], [['Validité du CACES', `${h.years('r490')} ans`, 'R.490A'], ['Validité étendue de la pratique', `${h.P.recos.r490.practicalExtendedYears} ans, avec ${h.P.recos.r490.extendedDaysPerYear} jours de conduite par an`, 'R.490A'], ['Prix médian initial', h.med('r490', 'grue'), `Mon Compte Formation au ${h.cpfDate}`], ['Recyclage médian', h.med('r490', 'grue', 'rec'), `Mon Compte Formation au ${h.cpfDate}`], ['Durée médiane de formation', h.hrs('r490', 'grue'), `Mon Compte Formation au ${h.cpfDate}`]], 'Chiffres clés du CACES R490.', ['l', 'l', 'l'])}
<p>Pour calculer votre propre échéance, la page ${h.a('duree-validite', 'durée de validité')} applique ces règles à vos dates.</p>`,
  },
  en: {
    slug: 'caces-r490',
    nav: 'CACES R490: lorry loader crane',
    card: 'R490 mock test of 100 questions, slinging, load diagram, validity extended to 10 years and median price.',
    title: 'CACES R490: lorry loader crane mock test, 100 questions',
    description: 'CACES R490: 100-question theory mock test on the lorry loader crane, slinging and the load diagram, the 5 or 10-year validity and the median CPF price.',
    h1: 'CACES R490: lorry loader crane mock test',
    intro: 'The test below follows the R490 assessment sheet: 14 points of general knowledge, 28 of technology, 38 of operation, 10 of slinging and 10 of maintenance.',
    resume: (h) => `Recommendation R490 of the French Health Insurance covers lorry loader cranes, the auxiliary cranes mounted on a truck that load and unload it or deliver materials to a site. The version in force is ${h.P.recos.r490.version}, published in July 2026. There is only one category, with a remote-control option when the crane is operated from a remote box. The R490 CACES is valid for ${h.years('r490')} years, with one particularity: the practical part can be extended to ${h.P.recos.r490.practicalExtendedYears} years if the holder proves at least ${h.P.recos.r490.extendedDaysPerYear} days of operating per year for five years and retakes the theory test. Its theory scheme is the only one with a slinging theme, worth ${h.pts('r490', 'elingage')} points, and a maintenance theme worth ${h.pts('r490', 'maint')} points. As of ${h.cpfDate}, the median initial course costs ${h.med('r490', 'grue')} in the Mon Compte Formation catalogue.`,
    faqs: (h) => [
      { q: 'How do I extend the R490 CACES to 10 years?', a: `When the ${h.years('r490')} years run out, a holder who proves at least ${h.P.recos.r490.extendedDaysPerYear} days of lorry loader crane operation per year over the five years retakes the theory test; the practical part is then extended to reach ${h.P.recos.r490.practicalExtendedYears} years. The evidence comes from the employer. Without it, both tests must be taken again.` },
      { q: 'What is the remote-control option?', a: 'A lorry loader crane can be operated from levers fixed to the truck or from a remote control carried by the operator. The basic R490 CACES covers lever operation; the remote-control option adds a practical test of half a test unit and allows remote operation.' },
      { q: 'Does the R490 CACES cover mobile cranes?', a: 'No. Self-propelled mobile cranes fall under recommendation R483, tower cranes under R487 and overhead cranes under R484. R490 covers only the lorry loader crane, mounted on a carrier whose main purpose is transport. Each of those other machines needs its own CACES and its own theory test.' },
      { q: 'Do I need to know slinging for the R490 CACES?', a: `Yes. Slinging is worth ${h.pts('r490', 'elingage')} points in the theory test, with a minimum of ${h.min('r490', 'elingage')}, and it is assessed in the practical test. A lorry loader crane operator often works alone and slings the load themselves: choosing the sling by load and angle, checking accessories, hand signals.` },
    ],
    body: (h) => `
<h2>The theory test marking scheme</h2>
${h.grid('r490')}
<p>Two ${h.pts('r490', 'elingage')}-point themes, slinging and maintenance, each require at least ${h.min('r490', 'elingage')} correct answers. Slinging comes down to a few precise ideas: a sling’s working load limit drops as the angle between the legs widens, and a damaged accessory is taken out of service, not repaired on the spot. The ${h.a('elingage', 'slinging page')} covers them in detail.</p>
<h2>Reading a crane load diagram</h2>
<p>A lorry loader crane’s capacity depends on outreach: the further the boom extends from the truck, the less it lifts. The diagram, displayed on the crane, gives the maximum load by outreach band. It assumes the truck is set on its stabilisers, on firm ground. The small tool on this page reads a fictitious diagram, labelled G1, also used in the bank’s questions.</p>
<!--tool:mini:ut-r490-->
${h.table(['', 'Value', 'Source'], [['CACES validity', `${h.years('r490')} years`, 'R.490A'], ['Extended practical validity', `${h.P.recos.r490.practicalExtendedYears} years, with ${h.P.recos.r490.extendedDaysPerYear} days of operation per year`, 'R.490A'], ['Median initial price', h.med('r490', 'grue'), `Mon Compte Formation on ${h.cpfDate}`], ['Median refresher', h.med('r490', 'grue', 'rec'), `Mon Compte Formation on ${h.cpfDate}`], ['Median course length', h.hrs('r490', 'grue'), `Mon Compte Formation on ${h.cpfDate}`]], 'Key figures of the R490 CACES.', ['l', 'l', 'l'])}
<p>To work out your own expiry date, the ${h.a('duree-validite', 'validity page')} applies these rules to your dates.</p>`,
  },
});
