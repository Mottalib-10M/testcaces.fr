import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-r485',
  group: 'categories',
  order: 80,
  tool: { kind: 'quiz', props: { reco: 'r485', mode: 'exam' } },
  mini: { kind: 'mini:r485cat' },
  related: ['caces-1', 'caces-r489', 'abaque-de-charge', 'autorisation-de-conduite', 'caces-prix', 'examen-blanc'],
  sources: ['r485', 'tableau', 'ct56', 'cdc_catalogue'],
  fr: {
    slug: 'caces-r485',
    nav: 'CACES R485 : gerbeurs accompagnants',
    card: 'Test blanc R485 de 100 questions sur les gerbeurs à conducteur accompagnant, catégories 1 et 2, prix médian.',
    title: 'CACES R485 : test blanc gerbeur accompagnant, catégories',
    description: 'CACES R485 : test théorique blanc de 100 questions sur les gerbeurs à conducteur accompagnant, catégories 1 et 2, validité de 5 ans et prix médian CPF.',
    h1: 'CACES R485 : test blanc des gerbeurs à conducteur accompagnant',
    intro: 'Le test ci-dessous suit la fiche d’évaluation de la R485 : 15 points de connaissances générales, 25 de technologie, 10 d’abaque et 50 d’exploitation.',
    resume: (h) => `La recommandation R485 de l’Assurance Maladie encadre la conduite des gerbeurs automoteurs que l’on conduit en marchant à côté, à l’aide d’un timon. Créée en 2020 sans recommandation antérieure, sa version en vigueur est la ${h.P.recos.r485.version}, publiée en juillet 2026. Elle compte deux catégories selon la hauteur de levée : la catégorie 1 de 1,20 m à 2,50 m, la catégorie 2 au-delà de 2,50 m. Le CACES R485 vaut ${h.years('r485')} ans. Son test théorique a la même structure que celui de la R489, avec un thème d’abaque de charges sur ${h.pts('r485', 'abaque')} points, mais ses questions portent sur l’engin accompagnant : position du conducteur, timon, freinage par le timon, risque d’écrasement des pieds. C’est l’un des CACES les moins chers : au ${h.cpfDate}, la formation initiale médiane coûte ${h.med('r485', '1')} en catégorie 1 et ${h.med('r485', '2')} en catégorie 2 au catalogue Mon Compte Formation.`,
    faqs: (h) => [
      { q: 'Faut-il un CACES pour un gerbeur à timon ?', a: 'Pour un gerbeur accompagnant qui lève au-delà de 1,20 m, la recommandation R485 prévoit le CACES de catégorie 1 ou 2 selon la hauteur. En dessous de 1,20 m, pour un transpalette à timon par exemple, aucun CACES n’est demandé : l’employeur forme et autorise le salarié, et un CACES R485 permet aussi de le faire.' },
      { q: 'Le CACES R485 couvre-t-il les gerbeurs à conducteur porté ?', a: 'Non. Dès que le conducteur monte sur l’engin, debout sur une plateforme ou assis, le gerbeur relève de la R489 catégorie 1B. Certains gerbeurs ont une plateforme repliable : conduits plateforme dépliée, ils demandent le CACES R489 ; conduits à pied, le CACES R485.' },
      { q: 'Quelle attestation médicale pour le CACES R485 ?', a: 'Comme pour les autres CACES, l’employeur vérifie avant l’autorisation de conduite que le salarié dispose d’une attestation du médecin du travail de moins de cinq ans. La recommandation R485 parle d’une attestation de suivi, délivrée dans le cadre de la surveillance médicale du salarié.' },
      { q: 'Combien coûte le CACES R485 ?', a: `Au ${h.cpfDate}, le prix médian des offres de formation initiale au catalogue Mon Compte Formation est de ${h.med('r485', '1')} en catégorie 1 et de ${h.med('r485', '2')} en catégorie 2, pour une durée médiane de ${h.hrs('r485', '1')}. Le recyclage médian coûte ${h.med('r485', '2', 'rec')} en catégorie 2.` },
    ],
    body: (h) => `
<h2>Les deux catégories de la R485</h2>
${h.table(['Catégorie', 'Hauteur de levée', 'Prix médian initial', 'Durée médiane', 'Recyclage médian'], [['1', 'De 1,20 m à 2,50 m', h.med('r485', '1'), h.hrs('r485', '1'), h.med('r485', '1', 'rec')], ['2', 'Plus de 2,50 m', h.med('r485', '2'), h.hrs('r485', '2'), h.med('r485', '2', 'rec')]], `Annexe 1 de la recommandation R.485A ; offres Mon Compte Formation au ${h.cpfDate}.`, ['l', 'l', 'r', 'r', 'r'])}
<p>Un titulaire de la catégorie 2 peut aussi conduire les gerbeurs de la catégorie 1. Les deux épreuves pratiques durent chacune ${h.num(h.P.recos.r485.ut['1'], 2)} unité de test.</p>
<h2>Le barème du test théorique</h2>
${h.grid('r485')}
<p>Comme en R489, l’abaque de charges vaut ${h.pts('r485', 'abaque')} points et demande ${h.min('r485', 'abaque')} bonnes réponses. Un gerbeur accompagnant est léger et étroit : en hauteur, sa capacité baisse vite, et la lecture de sa plaque se fait de la même façon que sur un chariot, en croisant hauteur et centre de gravité.</p>
<!--tool:mini:ut-r485-->
<h2>Les risques propres à l’engin accompagnant</h2>
<p>Le conducteur marche à côté de l’engin, ce qui crée des risques que la R489 ne connaît pas : pied écrasé sous le châssis, conducteur coincé entre le timon et un mur en marche arrière, perte de contrôle dans une pente. Le timon sert à la fois à diriger, accélérer et freiner : relâché, il remonte et freine l’engin. Les questions d’exploitation de la banque R485 tournent autour de ces situations. Pour les transpalettes et gerbeurs sur lesquels on monte, voyez la page ${h.a('caces-1', 'CACES 1A et 1B')}.</p>`,
  },
  en: {
    slug: 'caces-r485',
    nav: 'CACES R485: pedestrian stackers',
    card: 'R485 mock test of 100 questions on pedestrian-controlled stackers, categories 1 and 2, median price.',
    title: 'CACES R485: pedestrian stacker mock test and categories',
    description: 'CACES R485: 100-question theory mock test on pedestrian-controlled stackers, categories 1 and 2, the 5-year validity and the median CPF course price 2026.',
    h1: 'CACES R485: pedestrian-controlled stacker mock test',
    intro: 'The test below follows the R485 assessment sheet: 15 points of general knowledge, 25 of technology, 10 on the load chart and 50 of operation.',
    resume: (h) => `Recommendation R485 of the French Health Insurance covers pedestrian-controlled powered stackers, the stackers you drive while walking beside them, steering with a tiller. Created in 2020 with no earlier recommendation, its version in force is ${h.P.recos.r485.version}, published in July 2026. It has two categories by lift height: category 1 from 1.20 m to 2.50 m, category 2 above 2.50 m. The R485 CACES is valid for ${h.years('r485')} years. Its theory test has the same structure as R489, with a load chart theme worth ${h.pts('r485', 'abaque')} points, but its questions are about the pedestrian machine: where the operator stands, the tiller, braking with the tiller, the risk of crushed feet. It is one of the cheapest CACES: as of ${h.cpfDate}, the median initial course costs ${h.med('r485', '1')} for category 1 and ${h.med('r485', '2')} for category 2 in the Mon Compte Formation catalogue.`,
    faqs: (h) => [
      { q: 'Do I need a CACES for a tiller-steered stacker?', a: 'For a pedestrian stacker lifting above 1.20 m, recommendation R485 provides the category 1 or 2 CACES depending on height. Below 1.20 m, for a pedestrian pallet truck for example, no CACES is required: the employer trains and authorises the employee, and an R485 CACES can also be used for that.' },
      { q: 'Does the R485 CACES cover ride-on stackers?', a: 'No. As soon as the operator rides the machine, standing on a platform or seated, the stacker falls under R489 category 1B. Some stackers have a folding platform: driven with the platform down, they require the R489 CACES; driven on foot, the R485 CACES.' },
      { q: 'Which medical certificate for the R485 CACES?', a: 'As with the other CACES, before the operating authorisation the employer checks that the employee holds a certificate from the occupational physician less than five years old. Recommendation R485 refers to a follow-up certificate, issued as part of the employee’s medical monitoring.' },
      { q: 'How much does the R485 CACES cost?', a: `As of ${h.cpfDate}, the median price of initial course offers in the Mon Compte Formation catalogue is ${h.med('r485', '1')} for category 1 and ${h.med('r485', '2')} for category 2, for a median length of ${h.hrs('r485', '1')}. The median refresher costs ${h.med('r485', '2', 'rec')} for category 2.` },
    ],
    body: (h) => `
<h2>The two R485 categories</h2>
${h.table(['Category', 'Lift height', 'Median initial price', 'Median length', 'Median refresher'], [['1', 'From 1.20 m to 2.50 m', h.med('r485', '1'), h.hrs('r485', '1'), h.med('r485', '1', 'rec')], ['2', 'Above 2.50 m', h.med('r485', '2'), h.hrs('r485', '2'), h.med('r485', '2', 'rec')]], `Annex 1 of recommendation R.485A; Mon Compte Formation offers on ${h.cpfDate}.`, ['l', 'l', 'r', 'r', 'r'])}
<p>A category 2 holder can also operate category 1 stackers. Each practical test lasts ${h.num(h.P.recos.r485.ut['1'], 2)} test unit.</p>
<h2>The theory test marking scheme</h2>
${h.grid('r485')}
<p>As in R489, the load chart is worth ${h.pts('r485', 'abaque')} points and requires ${h.min('r485', 'abaque')} correct answers. A pedestrian stacker is light and narrow: at height its capacity drops fast, and its plate is read the same way as a forklift’s, crossing height and load centre.</p>
<!--tool:mini:ut-r485-->
<h2>Risks specific to the pedestrian machine</h2>
<p>The operator walks beside the machine, which creates risks R489 does not have: a foot crushed under the chassis, the operator trapped between the tiller and a wall when reversing, loss of control on a slope. The tiller steers, accelerates and brakes at once: when released, it springs up and brakes the machine. The R485 bank’s operation questions revolve around these situations. For pallet trucks and stackers you ride on, see the ${h.a('caces-1', 'CACES 1A and 1B page')}.</p>`,
  },
});
