import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'recyclage-caces',
  group: 'pratique',
  order: 45,
  tool: { kind: 'validity', props: { reco: 'r486', variant: 'validity' } },
  mini: { kind: 'mini:validite' },
  related: ['duree-validite', 'caces-prix', 'financement', 'examen-blanc', 'caces-r490'],
  sources: ['r489', 'r486', 'r490', 'cdc_catalogue'],
  fr: {
    slug: 'recyclage-caces',
    nav: 'Recyclage du CACES',
    card: 'Quand repasser les tests, combien coûte et dure un recyclage, et ce qui change par rapport à la formation initiale.',
    title: 'Recyclage CACES : quand repasser les tests et à quel prix',
    description: 'Recyclage CACES : date limite pour repasser les tests, durée et prix médian du recyclage par catégorie, et ce qui change par rapport à la formation initiale.',
    h1: 'Recyclage du CACES : repasser les tests avant l’échéance',
    intro: 'Entrez la date d’obtention de votre CACES : l’outil donne la date de fin et la date conseillée pour vous inscrire au recyclage.',
    resume: (h) => `Le recyclage, que les recommandations appellent actualisation, est le passage des tests théorique et pratique en fin de validité du CACES, précédé d’une formation qui remet à jour les connaissances et les gestes. Il n’existe pas de CACES « renouvelé » sans tests : le titulaire repasse exactement les mêmes épreuves que la première fois, avec le même barème, et obtient un nouveau CACES valable ${h.years('r489')} ans, ou ${h.years('r482')} ans en R482, à compter de la nouvelle date de réussite. La formation qui précède est plus courte : au ${h.cpfDate}, la médiane des offres de recyclage en R489 catégorie 3 est de ${h.hrs('r489', '3', 'rec')}, contre ${h.hrs('r489', '3')} pour une formation initiale, et son prix médian de ${h.med('r489', '3', 'rec')} contre ${h.med('r489', '3')}. En R490, le conducteur qui justifie de ${h.P.recos.r490.extendedDaysPerYear} jours de grue par an peut ne repasser que la théorie au bout de ${h.years('r490')} ans. Le recyclage se finance comme une formation initiale, CPF compris.`,
    faqs: (h) => [
      { q: 'Le recyclage du CACES est-il obligatoire ?', a: 'Pour continuer à s’appuyer sur le CACES, oui : passé la date de fin, il ne prouve plus la formation du conducteur, et l’employeur doit faire repasser les tests ou évaluer le salarié autrement avant de maintenir l’autorisation. Les recommandations demandent de réactualiser les connaissances et de repasser les épreuves au moins à chaque échéance.' },
      { q: 'Peut-on faire le recyclage après la date de fin ?', a: 'Oui, mais entre la date de fin et la réussite aux nouveaux tests, le conducteur n’a plus de CACES valable. Certains organismes proposent alors une formation plus longue, proche de l’initiale, si l’expérience récente manque. Mieux vaut s’inscrire assez tôt : l’outil propose trois mois avant l’échéance.' },
      { q: 'Faut-il repasser toutes les catégories au recyclage ?', a: 'Seulement celles dont vous avez besoin. Le test théorique, commun à la recommandation, se passe une fois ; un test pratique se passe par catégorie à recycler. Une catégorie qui n’est pas repassée expire simplement à sa date de fin, sans effet sur les autres.' },
      { q: 'Combien coûte un recyclage CACES ?', a: `Au ${h.cpfDate}, le prix médian des offres de recyclage est de ${h.med('r489', '3', 'rec')} en R489 catégorie 3, ${h.med('r486', 'B', 'rec')} en R486 catégorie B et ${h.med('r482', 'A', 'rec')} en R482 catégorie A, au catalogue Mon Compte Formation. Le CPF s’utilise comme pour une formation initiale.` },
    ],
    body: (h) => `
<h2>Formation initiale et recyclage comparés</h2>
${h.table(['Catégorie', 'Initial : prix médian', 'Initial : durée', 'Recyclage : prix médian', 'Recyclage : durée'], [['R489 cat. 3', h.med('r489', '3'), h.hrs('r489', '3'), h.med('r489', '3', 'rec'), h.hrs('r489', '3', 'rec')], ['R489 cat. 5', h.med('r489', '5'), h.hrs('r489', '5'), h.med('r489', '5', 'rec'), h.hrs('r489', '5', 'rec')], ['R485 cat. 2', h.med('r485', '2'), h.hrs('r485', '2'), h.med('r485', '2', 'rec'), h.hrs('r485', '2', 'rec')], ['R486 cat. B', h.med('r486', 'B'), h.hrs('r486', 'B'), h.med('r486', 'B', 'rec'), h.hrs('r486', 'B', 'rec')], ['R482 cat. A', h.med('r482', 'A'), h.hrs('r482', 'A'), h.med('r482', 'A', 'rec'), h.hrs('r482', 'A', 'rec')], ['R490', h.med('r490', 'grue'), h.hrs('r490', 'grue'), h.med('r490', 'grue', 'rec'), h.hrs('r490', 'grue', 'rec')]], `Offres Mon Compte Formation au ${h.cpfDate} ; une offre est classée en recyclage si son intitulé l’annonce.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>Préparer le test théorique du recyclage</h2>
<p>Un conducteur expérimenté échoue rarement à la pratique, plus souvent à la théorie : les questions portent sur des règles qu’on n’applique pas tous les jours, comme la lecture d’une plaque, les pictogrammes de produits chimiques ou le rôle des acteurs de la prévention. Faire un ${h.a('examen-blanc', 'examen blanc')} deux semaines avant le recyclage montre les thèmes à revoir. Les recommandations ont aussi été republiées en 2026 : le barème n’a pas changé, mais certains points du référentiel ont été reformulés.</p>
<!--tool:mini:cpf-->
<p>Avant de réserver, vérifiez que votre attestation médicale sera encore valable à la date des tests : un recyclage réussi avec une attestation échue donne un CACES valable, mais l’employeur ne peut pas vous autoriser à conduire tant que le service de santé au travail n’en a pas délivré une nouvelle.</p>
<p>Le calcul des échéances, attestation médicale comprise, est sur la page ${h.a('duree-validite', 'durée de validité')}. Pour la grue de chargement et sa validité étendue, voyez la page ${h.a('caces-r490', 'CACES R490')}.</p>`,
  },
  en: {
    slug: 'caces-refresher',
    nav: 'CACES refresher',
    card: 'When to retake the tests, what a refresher costs and how long it lasts, and how it differs from the initial course.',
    title: 'CACES refresher: when to retake the tests and at what price',
    description: 'CACES refresher: the deadline to retake the tests, the length and median price of refreshers by category, and how it differs from the initial course in 2026.',
    h1: 'CACES refresher: retaking the tests before expiry',
    intro: 'Enter the date you obtained your CACES: the tool gives the end date and the recommended date to book your refresher.',
    resume: (h) => `The refresher, which the recommendations call an update, means sitting the theory and practical tests again when the CACES reaches its end date, after a course that brings knowledge and skills up to date. There is no “renewed” CACES without tests: the holder sits exactly the same tests as the first time, with the same marking scheme, and gets a new CACES valid for ${h.years('r489')} years, or ${h.years('r482')} years under R482, from the new pass date. The course beforehand is shorter: as of ${h.cpfDate}, the median refresher offer for R489 category 3 lasts ${h.hrs('r489', '3', 'rec')}, against ${h.hrs('r489', '3')} for an initial course, and its median price is ${h.med('r489', '3', 'rec')} against ${h.med('r489', '3')}. Under R490, an operator who proves ${h.P.recos.r490.extendedDaysPerYear} days of crane work a year may only retake the theory after ${h.years('r490')} years. A refresher is funded like an initial course, CPF included.`,
    faqs: (h) => [
      { q: 'Is the CACES refresher compulsory?', a: 'To keep relying on the CACES, yes: after the end date it no longer proves the operator’s training, and the employer must have the tests retaken or assess the employee another way before keeping the authorisation. The recommendations ask for knowledge to be updated and the tests retaken at least at every expiry.' },
      { q: 'Can I do the refresher after the end date?', a: 'Yes, but between the end date and passing the new tests, the operator has no valid CACES. Some providers then offer a longer course, closer to the initial one, if recent experience is lacking. It is better to book early enough: the tool suggests three months before expiry.' },
      { q: 'Must I retake every category at the refresher?', a: 'Only those you need. The theory test, shared across the recommendation, is sat once; one practical test is sat per category being renewed. A category that is not retaken simply expires on its end date, with no effect on the others.' },
      { q: 'How much does a CACES refresher cost?', a: `As of ${h.cpfDate}, the median refresher offer price is ${h.med('r489', '3', 'rec')} for R489 category 3, ${h.med('r486', 'B', 'rec')} for R486 category B and ${h.med('r482', 'A', 'rec')} for R482 category A, in the Mon Compte Formation catalogue. The CPF can be used as for an initial course.` },
    ],
    body: (h) => `
<h2>Initial course and refresher compared</h2>
${h.table(['Category', 'Initial: median price', 'Initial: length', 'Refresher: median price', 'Refresher: length'], [['R489 cat. 3', h.med('r489', '3'), h.hrs('r489', '3'), h.med('r489', '3', 'rec'), h.hrs('r489', '3', 'rec')], ['R489 cat. 5', h.med('r489', '5'), h.hrs('r489', '5'), h.med('r489', '5', 'rec'), h.hrs('r489', '5', 'rec')], ['R485 cat. 2', h.med('r485', '2'), h.hrs('r485', '2'), h.med('r485', '2', 'rec'), h.hrs('r485', '2', 'rec')], ['R486 cat. B', h.med('r486', 'B'), h.hrs('r486', 'B'), h.med('r486', 'B', 'rec'), h.hrs('r486', 'B', 'rec')], ['R482 cat. A', h.med('r482', 'A'), h.hrs('r482', 'A'), h.med('r482', 'A', 'rec'), h.hrs('r482', 'A', 'rec')], ['R490', h.med('r490', 'grue'), h.hrs('r490', 'grue'), h.med('r490', 'grue', 'rec'), h.hrs('r490', 'grue', 'rec')]], `Mon Compte Formation offers on ${h.cpfDate}; an offer counts as a refresher when its title says so.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>Preparing the refresher theory test</h2>
<p>Experienced operators rarely fail the practical, more often the theory: questions cover rules not applied every day, such as reading a plate, chemical hazard pictograms or the role of prevention bodies. Taking a ${h.a('examen-blanc', 'mock exam')} two weeks before the refresher shows which themes to review. The recommendations were also republished in 2026: the marking scheme is unchanged, but some syllabus points were reworded.</p>
<!--tool:mini:cpf-->
<p>Before booking, check that your medical certificate will still be valid on the test date: a refresher passed with an expired certificate gives a valid CACES, but the employer still cannot authorise you to operate until the occupational health service issues a new one.</p>
<p>Deadlines, medical certificate included, are worked out on the ${h.a('duree-validite', 'validity page')}. For the lorry loader crane and its extended validity, see the ${h.a('caces-r490', 'R490 CACES page')}.</p>`,
  },
});
