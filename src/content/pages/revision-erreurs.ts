import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'revision-erreurs',
  group: 'tests',
  order: 40,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'errors', recoSelect: true } },
  mini: { kind: 'mini:pass' },
  related: ['examen-blanc', 'questions-reponses', 'test-theorique', 'echec-caces', 'abaque-de-charge'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485'],
  fr: {
    slug: 'revision-erreurs',
    nav: 'Révision des erreurs',
    card: 'Seules les questions manquées reviennent, jusqu’à la bonne réponse : la progression reste dans votre navigateur.',
    title: 'Révision CACES : refaire les questions manquées au test',
    description: 'Révision CACES : les questions manquées à l’examen blanc reviennent jusqu’à la bonne réponse, progression gardée dans votre navigateur, jamais envoyée.',
    h1: 'Révision des erreurs : refaire les questions manquées',
    intro: 'Chaque question manquée à l’examen blanc ou à l’entraînement revient ici. Elle sort de la liste dès que vous y répondez juste.',
    resume: (h) => `La révision des erreurs ne repose que les questions que vous avez déjà manquées, sur l’examen blanc ou sur une série d’entraînement par thème. C’est la façon la plus rapide de gagner des points avant le test théorique : sur une banque de ${h.num(h.count.all)} questions, un candidat moyen en rate rarement plus d’une soixantaine, et ce sont toujours les mêmes notions qui reviennent. Une question quitte la liste dès que vous y répondez juste ; si vous la manquez de nouveau, elle reste. Les erreurs sont rangées par recommandation, et le tableau de bord affiche, pour chaque thème du barème, combien de questions il vous reste à revoir. Tout est enregistré dans le stockage local de votre navigateur, sur votre appareil uniquement : rien n’est envoyé, aucun compte n’est demandé. Le bouton d’effacement vide la liste. Quand elle est vide, refaites un examen blanc complet, chronométré sur ${h.P.test.minutes} minutes.`,
    faqs: (h) => [
      { q: 'Où sont gardées mes erreurs ?', a: 'Dans le stockage local de votre navigateur, sur l’appareil que vous utilisez. Elles ne sont jamais envoyées à un serveur, et aucun compte n’existe sur ce site. En conséquence, vos erreurs ne vous suivent pas d’un téléphone à un ordinateur, et une navigation privée les efface à la fermeture de la fenêtre.' },
      { q: 'Pourquoi ma liste d’erreurs est-elle vide ?', a: 'Soit vous n’avez encore fait aucun examen blanc ni aucune série sur cet appareil et ce navigateur, soit vous avez répondu juste à toutes les questions manquées, soit le stockage local a été effacé. Faites un examen blanc ou une série par thème : chaque mauvaise réponse alimente la liste.' },
      { q: 'Faut-il vider la liste avant le test ?', a: `C’est un bon objectif. Une liste vide veut dire que chaque notion manquée au moins une fois a été comprise. Refaites ensuite un examen blanc complet : s’il dépasse 80 points sans thème sous la moitié, vous êtes au-dessus du seuil de ${h.P.test.passScore} avec une marge raisonnable pour le jour du test.` },
      { q: 'Une erreur revient-elle si je me trompe de nouveau ?', a: 'Oui. Une question sort de la liste uniquement quand vous y répondez juste. Si elle réapparaît plusieurs fois, relisez son explication et le point du référentiel qu’elle cite, puis la page du thème concerné : c’est le signe d’une règle mal comprise plutôt que d’une simple étourderie.' },
    ],
    body: (h) => `
<h2>Une méthode en trois temps</h2>
<ol>
<li><strong>Repérer</strong> : un ${h.a('examen-blanc', 'examen blanc')} complet, ou une série de vingt questions par thème, alimente la liste.</li>
<li><strong>Comprendre</strong> : ici, chaque question manquée revient avec son explication après votre réponse.</li>
<li><strong>Vérifier</strong> : quand la liste est vide, un nouvel examen blanc dit si la note tient.</li>
</ol>
<p>Les erreurs ne se valent pas : une erreur dans un thème court pèse plus qu’une erreur dans un thème long, parce que la règle de la moitié s’applique à chaque thème. Le tableau ci-dessous dit combien d’erreurs chaque thème de la R489 tolère au maximum, toutes les autres réponses étant justes.</p>
${h.table(['Thème R489', 'Points', 'Minimum', 'Erreurs tolérées dans le thème'], [['Connaissances générales', h.pts('r489', 'cg'), h.min('r489', 'cg'), h.pts('r489', 'cg') - h.min('r489', 'cg')], ['Technologie et stabilité', h.pts('r489', 'tech'), h.min('r489', 'tech'), h.pts('r489', 'tech') - h.min('r489', 'tech')], ['Abaque de charges', h.pts('r489', 'abaque'), h.min('r489', 'abaque'), h.pts('r489', 'abaque') - h.min('r489', 'abaque')], ['Exploitation', h.pts('r489', 'expl'), h.min('r489', 'expl'), h.pts('r489', 'expl') - h.min('r489', 'expl')]], 'Calculé à partir du barème de la recommandation R.489A ; au total, 30 erreurs au plus.', ['l', 'r', 'r', 'r'])}
<!--tool:mini:errors-->
<h2>Ce que la page garde, et ce qu’elle ne garde pas</h2>
<p>La page garde l’identifiant des questions manquées, la date de vos examens blancs et leur note par thème. Elle ne garde ni nom, ni adresse, ni réponse à un formulaire. Aucune mesure d’audience ne reçoit vos réponses. Si vous changez d’appareil, la liste repart de zéro.</p>
<p>Quand une même erreur revient, la page du thème aide à la régler : ${h.a('abaque-de-charge', 'abaque de charge')} pour les plaques, ${h.a('test-theorique', 'test théorique')} pour les règles de notation.</p>`,
  },
  en: {
    slug: 'mistakes-review',
    nav: 'Mistakes review',
    card: 'Only the questions you missed come back, until you get them right: progress stays in your browser.',
    title: 'CACES review: retake the questions you missed in tests',
    description: 'CACES review: questions you missed in the mock exam come back until you answer them right, with your progress kept in your browser and never sent out.',
    h1: 'Mistakes review: retake the questions you missed',
    intro: 'Every question missed in the mock exam or in practice comes back here. It leaves the list as soon as you answer it correctly.',
    resume: (h) => `The mistakes review only asks again the questions you have already missed, in the mock exam or in a practice set by theme. It is the quickest way to gain points before the theory test: in a bank of ${h.num(h.count.all)} questions, an average candidate rarely misses more than sixty or so, and the same topics keep coming back. A question leaves the list as soon as you answer it correctly; if you miss it again, it stays. Mistakes are sorted by recommendation, and the dashboard shows, for each theme of the marking scheme, how many questions you still have to review. Everything is stored in your browser’s local storage, on your device only: nothing is sent and no account is needed. The clear button empties the list. Once it is empty, sit a full mock exam again, timed at ${h.P.test.minutes} minutes, to check the score holds.`,
    faqs: (h) => [
      { q: 'Where are my mistakes kept?', a: 'In your browser’s local storage, on the device you are using. They are never sent to a server, and there is no account on this site. As a result, your mistakes do not follow you from a phone to a computer, and a private browsing window erases them when it closes.' },
      { q: 'Why is my mistakes list empty?', a: 'Either you have not yet taken a mock exam or a practice set on this device and browser, or you have answered every missed question correctly, or local storage was cleared. Take a mock exam or a practice set by theme: every wrong answer feeds the list.' },
      { q: 'Should I empty the list before the test?', a: `It is a good goal. An empty list means every topic you missed at least once has been understood. Then sit another full mock exam: if it clears 80 points with no theme below half, you are above the ${h.P.test.passScore} threshold with a reasonable margin for test day.` },
      { q: 'Does a mistake come back if I get it wrong again?', a: 'Yes. A question only leaves the list when you answer it correctly. If it comes back several times, reread its explanation and the syllabus point it quotes, then the page of the theme concerned: it usually signals a rule that was misunderstood rather than a slip.' },
    ],
    body: (h) => `
<h2>A three-step method</h2>
<ol>
<li><strong>Spot</strong>: a full ${h.a('examen-blanc', 'mock exam')}, or a twenty-question set by theme, feeds the list.</li>
<li><strong>Understand</strong>: here, each missed question comes back with its explanation after you answer.</li>
<li><strong>Check</strong>: once the list is empty, a new mock exam tells you whether the score holds.</li>
</ol>
<p>Mistakes are not equal: a mistake in a short theme weighs more than one in a long theme, because the half-marks rule applies to each theme. The table below gives the most mistakes each R489 theme tolerates, all other answers being correct.</p>
${h.table(['R489 theme', 'Points', 'Minimum', 'Mistakes tolerated in the theme'], [['General knowledge', h.pts('r489', 'cg'), h.min('r489', 'cg'), h.pts('r489', 'cg') - h.min('r489', 'cg')], ['Technology and stability', h.pts('r489', 'tech'), h.min('r489', 'tech'), h.pts('r489', 'tech') - h.min('r489', 'tech')], ['Load chart', h.pts('r489', 'abaque'), h.min('r489', 'abaque'), h.pts('r489', 'abaque') - h.min('r489', 'abaque')], ['Operation', h.pts('r489', 'expl'), h.min('r489', 'expl'), h.pts('r489', 'expl') - h.min('r489', 'expl')]], 'Worked out from the R.489A marking scheme; 30 mistakes at most overall.', ['l', 'r', 'r', 'r'])}
<!--tool:mini:errors-->
<h2>What the page keeps, and what it does not</h2>
<p>The page keeps the identifiers of missed questions, the date of your mock exams and their score by theme. It keeps no name, no address and no form answer. No audience measurement receives your answers. If you switch devices, the list starts from zero.</p>
<p>When the same mistake keeps coming back, the theme page helps fix it: the ${h.a('abaque-de-charge', 'load chart page')} for plates, the ${h.a('test-theorique', 'theory test page')} for the marking rules.</p>`,
  },
});
