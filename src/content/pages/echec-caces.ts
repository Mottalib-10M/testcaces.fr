import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'echec-caces',
  group: 'pratique',
  order: 60,
  tool: { kind: 'validity', props: { reco: 'r489', variant: 'echec' } },
  mini: { kind: 'mini:pass' },
  related: ['test-theorique', 'revision-erreurs', 'examen-blanc', 'formation-caces', 'duree-validite'],
  sources: ['r489', 'r482', 'r486', 'r485', 'r490'],
  fr: {
    slug: 'echec-caces',
    nav: 'Échec au CACES : que garder ?',
    card: 'Théorie réussie, pratique échouée ou l’inverse : ce qui reste acquis 12 mois et la date limite pour repasser.',
    title: 'Échec au CACES : partie acquise 12 mois et date limite',
    description: 'Échec au CACES : la partie réussie, théorique ou pratique, reste acquise 12 mois auprès du même organisme. Calculez la date limite pour repasser l’autre partie.',
    h1: 'Échec au CACES : ce qui reste acquis et jusqu’à quand',
    intro: 'Entrez la date à laquelle vous avez réussi l’une des deux parties : l’outil donne la date limite pour repasser l’autre, et la date de fin du futur CACES.',
    resume: (h) => `Échouer au CACES ne fait pas tout perdre. Les recommandations prévoient que le candidat qui échoue à une seule des deux parties du test, théorique ou pratique, garde le bénéfice de la partie réussie pendant ${h.P.test.keepPassedPartMonths} mois. Dans ce délai, il peut obtenir le CACES en ne repassant que la partie échouée, après une formation adaptée, à condition de rester avec le même organisme testeur certifié. En cas d’échec, l’organisme doit lui remettre une attestation qui dit quelles compétences sont acquises ou non, et quelle formation complémentaire suivre, avec sa durée. Si le second passage réussit, le CACES est daté du jour de cette réussite : sa validité de ${h.years('r489')} ans, ou ${h.years('r482')} ans en R482, part de là. Passé le délai de ${h.P.test.keepPassedPartMonths} mois, ou en changeant d’organisme, les deux parties sont à repasser. Au test théorique, l’échec vient souvent de la règle par thème : il faut ${h.P.test.passScore} points et au moins la moitié de chaque thème.`,
    faqs: (h) => [
      { q: 'Combien de fois peut-on repasser le CACES ?', a: 'Les recommandations ne fixent aucune limite au nombre de tentatives. Chaque nouveau passage suppose en revanche une formation adaptée, dont l’organisme testeur précise le contenu et la durée dans l’attestation d’échec, et chaque passage a un coût. Mieux vaut donc comprendre la cause de l’échec avant de se présenter de nouveau.' },
      { q: 'Peut-on changer d’organisme après un échec ?', a: `Oui, mais la partie réussie n’est conservée ${h.P.test.keepPassedPartMonths} mois que si le candidat poursuit avec le même organisme testeur certifié. Dans un autre organisme, il repasse le test théorique et le test pratique, comme un nouveau candidat, après une formation reconnue par ce nouvel organisme.` },
      { q: 'Pourquoi ai-je échoué avec plus de 70 points ?', a: `Parce qu’il faut aussi au moins la moitié des points de chaque thème. Avec 82 points et 4 sur 10 à l’abaque de charges en R489, le test est échoué. Le simulateur de note par thème montre ce cas, et la révision des erreurs aide à combler le thème faible avant le second passage.` },
      { q: 'Quelle date figure sur le CACES après un second passage ?', a: 'La date de réussite à la seconde des deux épreuves, quelle qu’elle soit. Si la théorie est réussie en mars et la pratique en mai après un échec, le CACES est daté de mai, et c’est de mai que court sa validité.' },
    ],
    body: (h) => `
<h2>Les cas possibles</h2>
${h.table(['Situation', 'Ce qui reste acquis', 'Ce qu’il faut faire'], [['Théorie réussie, pratique échouée', `La théorie, ${h.P.test.keepPassedPartMonths} mois`, 'Formation adaptée, puis test pratique seul, même organisme'], ['Pratique réussie, théorie échouée', `La pratique, ${h.P.test.keepPassedPartMonths} mois`, 'Révision, puis test théorique seul, même organisme'], ['Deux parties échouées', 'Rien', 'Formation, puis les deux tests'], ['Délai de 12 mois dépassé', 'Rien', 'Les deux tests'], ['Changement d’organisme', 'Rien', 'Les deux tests']], 'Recommandations R.489A, R.482B, R.486B, R.490A et R.485A, conditions de délivrance du CACES.', ['l', 'l', 'l'])}
<h2>Réussir le second passage du test théorique</h2>
<p>L’attestation d’échec indique les compétences non validées ; au test théorique, elle correspond en pratique aux thèmes sous la moyenne. Travaillez-les en priorité : une série par thème sur ${h.a('questions-reponses', 'questions et réponses')}, puis la ${h.a('revision-erreurs', 'révision des erreurs')}, puis un ${h.a('examen-blanc', 'examen blanc')} complet chronométré. Visez au moins 80 points sans thème sous la moitié avant de vous présenter de nouveau.</p>
<!--tool:mini:errors-->
<h2>Le cas de l’extension à une autre catégorie</h2>
<p>Une règle voisine s’applique après un CACES réussi : pendant ${h.P.test.extensionTheoryMonths} mois, la théorie reste acquise pour obtenir une autre catégorie de la même recommandation en ne passant que la pratique. Cette nouvelle catégorie expire à la même date que le premier CACES. La page ${h.a('duree-validite', 'durée de validité')} calcule ces échéances.</p>`,
  },
  en: {
    slug: 'failed-caces',
    nav: 'Failed CACES: what you keep',
    card: 'Theory passed, practical failed or the reverse: what you keep for 12 months and the deadline to retake.',
    title: 'Failed CACES: part kept for 12 months and retake deadline',
    description: 'Failed CACES: the part you passed, theory or practical, is kept for 12 months with the same testing body. Work out the deadline to retake the other part.',
    h1: 'Failed CACES: what you keep and until when',
    intro: 'Enter the date you passed one of the two parts: the tool gives the deadline to retake the other, and the end date of the future CACES.',
    resume: (h) => `Failing the CACES does not mean losing everything. The recommendations provide that a candidate who fails only one of the two parts of the test, theory or practical, keeps the benefit of the passed part for ${h.P.test.keepPassedPartMonths} months. Within that time, they can obtain the CACES by retaking only the failed part, after suitable training, provided they stay with the same certified testing body. After a failure, the body must give them a certificate stating the skills validated and not validated, and the content and length of the further training advised. If the second attempt succeeds, the CACES is dated on the day of that pass: its validity of ${h.years('r489')} years, or ${h.years('r482')} years under R482, runs from there. Once the ${h.P.test.keepPassedPartMonths}-month window has passed, or after changing testing body, both parts must be retaken. In the theory test, failure often comes from the per-theme rule: you need ${h.P.test.passScore} points and at least half of each theme.`,
    faqs: (h) => [
      { q: 'How many times can I retake the CACES?', a: 'The recommendations set no limit on the number of attempts. Each new attempt does however require suitable training, whose content and length the testing body states in the failure certificate, and each attempt has a cost. It is therefore better to understand why you failed before trying again.' },
      { q: 'Can I change testing body after failing?', a: `Yes, but the passed part is only kept for ${h.P.test.keepPassedPartMonths} months if the candidate stays with the same certified testing body. At another body, they sit both the theory and practical tests again, like a new candidate, after training accepted by that new body.` },
      { q: 'Why did I fail with more than 70 points?', a: 'Because you also need at least half the points of each theme. With 82 points and 4 out of 10 on the R489 load chart, the test is failed. The per-theme score simulator shows that case, and the mistakes review helps fill the weak theme before the second attempt.' },
      { q: 'Which date goes on the CACES after a second attempt?', a: 'The date the second of the two tests was passed, whichever it is. If the theory is passed in March and the practical in May after a failure, the CACES is dated May, and its validity runs from May, not from the March theory pass.' },
    ],
    body: (h) => `
<h2>The possible cases</h2>
${h.table(['Situation', 'What you keep', 'What to do'], [['Theory passed, practical failed', `The theory, ${h.P.test.keepPassedPartMonths} months`, 'Suitable training, then the practical test alone, same body'], ['Practical passed, theory failed', `The practical, ${h.P.test.keepPassedPartMonths} months`, 'Revision, then the theory test alone, same body'], ['Both parts failed', 'Nothing', 'Training, then both tests'], ['12-month window exceeded', 'Nothing', 'Both tests'], ['Change of testing body', 'Nothing', 'Both tests']], 'Recommendations R.489A, R.482B, R.486B, R.490A and R.485A, conditions for issuing the CACES.', ['l', 'l', 'l'])}
<h2>Passing the theory test at the second attempt</h2>
<p>The failure certificate lists the skills not validated; in the theory test, these are in practice the themes below half. Work on them first: a set by theme in ${h.a('questions-reponses', 'questions and answers')}, then the ${h.a('revision-erreurs', 'mistakes review')}, then a full timed ${h.a('examen-blanc', 'mock exam')}. Aim for at least 80 points with no theme below half before trying again.</p>
<!--tool:mini:errors-->
<h2>Adding another category</h2>
<p>A related rule applies after a passed CACES: for ${h.P.test.extensionTheoryMonths} months, the theory remains valid to obtain another category of the same recommendation by sitting only the practical. That new category expires on the same date as the first CACES. The ${h.a('duree-validite', 'validity page')} works out these deadlines.</p>`,
  },
});
