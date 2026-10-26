import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'duree-validite',
  group: 'pratique',
  order: 40,
  tool: { kind: 'validity', props: { reco: 'r489', variant: 'validity' } },
  mini: { kind: 'mini:autorisation' },
  related: ['recyclage-caces', 'autorisation-de-conduite', 'echec-caces', 'caces-r482', 'caces-r490'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485', 'ct56', 'arrete2025'],
  fr: {
    slug: 'duree-validite-caces',
    nav: 'Durée de validité du CACES',
    card: 'Date de fin du CACES, date conseillée pour le recyclage et validité de l’attestation médicale.',
    title: 'Durée de validité du CACES : 5 ou 10 ans, date de fin',
    description: 'Durée de validité du CACES : 5 ans, ou 10 ans en R482, comptés depuis la réussite au second test. Calculez la date de fin, le recyclage et l’échéance médicale.',
    h1: 'Durée de validité du CACES : calculer la date de fin',
    intro: 'Entrez la date d’obtention de votre CACES et celle de votre attestation médicale : l’outil donne les deux échéances et la date conseillée pour le recyclage.',
    resume: (h) => `Un CACES vaut ${h.years('r489')} ans pour les chariots R489, les gerbeurs accompagnants R485, les nacelles R486 et les grues de chargement R490, et ${h.years('r482')} ans pour les engins de chantier R482. La durée court à partir de la date d’obtention, c’est-à-dire la date de réussite au second des deux tests, théorique ou pratique, et non la date de la formation. Le CACES expire à la date anniversaire : obtenu le 14 mars 2022 en R489, il vaut jusqu’au 14 mars 2027. Pour continuer à conduire, il faut repasser les deux tests avant cette date, après une formation de recyclage. Une seconde échéance compte autant : l’attestation d’absence de contre-indications médicales, délivrée par le service de santé au travail, vaut ${h.P.medical.attestationYears} ans selon l’article R4323-56 du Code du travail dans sa rédaction en vigueur depuis le 1er octobre 2025. Un avis d’aptitude délivré avant cette date en tient lieu pendant ${h.P.medical.oldAvisUntilYears} ans à compter de sa délivrance. L’employeur ne peut autoriser la conduite que si les deux sont valables.`,
    faqs: (h) => [
      { q: 'Le CACES se renouvelle-t-il automatiquement ?', a: 'Non. À l’échéance, le titulaire repasse les tests théorique et pratique dans un organisme testeur certifié. Une formation de recyclage, plus courte que la formation initiale, les précède en général. Si les tests sont réussis, un nouveau CACES est délivré pour la même durée, à compter de la nouvelle date de réussite.' },
      { q: 'Peut-on conduire avec un CACES expiré ?', a: 'Un CACES expiré ne prouve plus la formation. L’employeur qui s’appuie sur le CACES pour délivrer l’autorisation de conduite doit donc la suspendre ou faire repasser les tests. En pratique, conduire avec un CACES expiré expose l’employeur en cas d’accident, puisque la formation adéquate exigée par le Code du travail n’est plus démontrée.' },
      { q: 'Combien de temps avant l’échéance faut-il s’inscrire au recyclage ?', a: 'Les recommandations ne fixent pas de délai. Les sessions étant souvent pleines plusieurs semaines à l’avance, l’outil propose de s’inscrire trois mois avant la date de fin. Repasser les tests avant l’échéance évite toute période sans CACES, la nouvelle validité partant de la date de réussite.' },
      { q: 'Un CACES R389 ou R372m est-il encore valable ?', a: 'Les anciens CACES, délivrés selon les recommandations remplacées en 2020, restaient valables jusqu’à leur date de fin. Un R389 a été obtenu au plus tard fin 2019 et vaut cinq ans : il est expiré. Un R372m, qui valait dix ans, peut encore être valable jusqu’en 2029 au plus tard.' },
    ],
    body: (h) => `
<h2>Les durées, recommandation par recommandation</h2>
${h.table(['Recommandation', 'Engins', 'Validité du CACES', 'Ancienne recommandation'], [['R489', 'Chariots à conducteur porté', `${h.years('r489')} ans`, h.P.recos.r489.replaces], ['R485', 'Gerbeurs accompagnants', `${h.years('r485')} ans`, 'aucune'], ['R482', 'Engins de chantier', `${h.years('r482')} ans`, h.P.recos.r482.replaces], ['R486', 'Nacelles', `${h.years('r486')} ans`, h.P.recos.r486.replaces], ['R490', 'Grues de chargement', `${h.years('r490')} ans (pratique jusqu’à ${h.P.recos.r490.practicalExtendedYears} ans sous conditions)`, h.P.recos.r490.replaces]], 'Recommandations de l’Assurance Maladie, versions de 2026.', ['l', 'l', 'l', 'l'])}
<h2>Trois cas de calcul</h2>
<ul>
<li><strong>Échec puis réussite</strong> : théorie réussie le 10 juin, pratique échouée puis réussie le 2 septembre. Le CACES est obtenu le 2 septembre ; il expire cinq ans plus tard, un 2 septembre.</li>
<li><strong>Nouvelle catégorie</strong> : un cariste titulaire de la catégorie 3 ajoute la catégorie 5 dans l’année qui suit, sans repasser la théorie. La catégorie 5 expire à la même date que la catégorie 3.</li>
<li><strong>29 février</strong> : un CACES obtenu un 29 février expire le 28 février de l’année d’échéance si elle n’est pas bissextile.</li>
</ul>
<!--tool:mini:validite-->
<h2>L’attestation médicale</h2>
<p>Depuis le 1er octobre 2025, l’${h.src('ct56', 'article R4323-56')} du Code du travail demande une attestation d’absence de contre-indications médicales, valable ${h.P.medical.attestationYears} ans, à la place de l’ancien examen d’aptitude ; à la même date, l’${h.src('arrete2025', 'arrêté du 26 septembre 2025')} a remplacé l’arrêté de 1998 sur la formation des conducteurs. L’outil l’ajoute au calcul : l’autorisation de conduite tient jusqu’à la plus proche des deux échéances. Les étapes du recyclage sont sur la page ${h.a('recyclage-caces', 'recyclage du CACES')}, et le rôle de l’employeur sur la page ${h.a('autorisation-de-conduite', 'autorisation de conduite')}.</p>`,
  },
  en: {
    slug: 'caces-validity',
    nav: 'CACES validity period',
    card: 'CACES end date, the recommended date to book a refresher and the medical certificate validity.',
    title: 'CACES validity: 5 or 10 years, and the exact end date',
    description: 'CACES validity: 5 years, or 10 years for R482, counted from passing the second test. Work out the end date, the refresher date and the medical expiry date.',
    h1: 'CACES validity: working out the end date',
    intro: 'Enter the date you obtained your CACES and the date of your medical certificate: the tool gives both expiry dates and the date to book a refresher.',
    resume: (h) => `A CACES is valid for ${h.years('r489')} years for R489 forklifts, R485 pedestrian stackers, R486 aerial lifts and R490 lorry loader cranes, and ${h.years('r482')} years for R482 construction machinery. The period runs from the date obtained, meaning the date the second of the two tests, theory or practical, was passed, not the date of the course. The CACES expires on the anniversary: obtained on 14 March 2022 under R489, it is valid until 14 March 2027. To keep operating, both tests must be taken again before that date, after a refresher course. A second deadline matters just as much: the certificate of no medical contraindication, issued by the occupational health service, is valid for ${h.P.medical.attestationYears} years under article R4323-56 of the Labour Code as worded since 1 October 2025. A fitness opinion issued before that date stands in for it for ${h.P.medical.oldAvisUntilYears} years from its issue. The employer can only authorise operation while both are valid.`,
    faqs: (h) => [
      { q: 'Does the CACES renew automatically?', a: 'No. At expiry, the holder sits the theory and practical tests again at a certified testing body. A refresher course, shorter than the initial one, usually comes first. If the tests are passed, a new CACES is issued for the same period, counted from the new pass date.' },
      { q: 'Can I operate with an expired CACES?', a: 'An expired CACES no longer proves training. An employer relying on the CACES to issue the operating authorisation must therefore suspend it or have the tests retaken. In practice, operating with an expired CACES exposes the employer if there is an accident, since the adequate training required by the Labour Code is no longer shown.' },
      { q: 'How long before expiry should I book the refresher?', a: 'The recommendations set no deadline. As sessions are often full several weeks ahead, the tool suggests booking three months before the end date. Retaking the tests before expiry avoids any gap without a CACES, since the new validity runs from the pass date.' },
      { q: 'Is an old R389 or R372m CACES still valid?', a: 'Old CACES, issued under the recommendations replaced in 2020, stayed valid until their end date. An R389 was obtained by the end of 2019 at the latest and lasts five years: it has expired. An R372m, which lasted ten years, may still be valid until 2029 at the latest.' },
    ],
    body: (h) => `
<h2>Periods, recommendation by recommendation</h2>
${h.table(['Recommendation', 'Machines', 'CACES validity', 'Former recommendation'], [['R489', 'Ride-on industrial trucks', `${h.years('r489')} years`, h.P.recos.r489.replaces], ['R485', 'Pedestrian stackers', `${h.years('r485')} years`, 'none'], ['R482', 'Construction machinery', `${h.years('r482')} years`, h.P.recos.r482.replaces], ['R486', 'Aerial lifts', `${h.years('r486')} years`, h.P.recos.r486.replaces], ['R490', 'Lorry loader cranes', `${h.years('r490')} years (practical up to ${h.P.recos.r490.practicalExtendedYears} years under conditions)`, h.P.recos.r490.replaces]], 'French Health Insurance recommendations, 2026 versions.', ['l', 'l', 'l', 'l'])}
<h2>Three worked cases</h2>
<ul>
<li><strong>Fail then pass</strong>: theory passed on 10 June, practical failed then passed on 2 September. The CACES is obtained on 2 September; it expires five years later, on a 2 September.</li>
<li><strong>New category</strong>: a driver holding category 3 adds category 5 within the following year, without retaking the theory. Category 5 expires on the same date as category 3.</li>
<li><strong>29 February</strong>: a CACES obtained on 29 February expires on 28 February of the expiry year if it is not a leap year.</li>
</ul>
<!--tool:mini:validite-->
<h2>The medical certificate</h2>
<p>Since 1 October 2025, Labour Code ${h.src('ct56', 'article R4323-56')} requires a certificate of no medical contraindication, valid for ${h.P.medical.attestationYears} years, instead of the former fitness examination; on the same date, the ${h.src('arrete2025', 'order of 26 September 2025')} replaced the 1998 order on operator training. The tool adds it to the calculation: the operating authorisation holds until the nearer of the two deadlines. Refresher steps are on the ${h.a('recyclage-caces', 'CACES refresher page')}, and the employer’s role on the ${h.a('autorisation-de-conduite', 'operating authorisation page')}.</p>`,
  },
});
