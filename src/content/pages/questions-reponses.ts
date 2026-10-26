import { definePage } from '../../lib/guide-types';
import { RECOS } from '../../lib/engine/exam';

export default definePage({
  id: 'questions-reponses',
  group: 'tests',
  order: 30,
  tool: { kind: 'bank', props: { reco: 'r489', theme: 'cg' } },
  mini: { kind: 'mini:quota-r489' },
  related: ['examen-blanc', 'revision-erreurs', 'test-theorique', 'abaque-de-charge', 'panneaux-pictogrammes', 'securite-risques'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485', 'tableau'],
  fr: {
    slug: 'questions-reponses',
    nav: 'Questions et réponses CACES',
    card: 'Toute la banque, rangée par recommandation et par thème, avec la bonne réponse et son explication.',
    title: 'Questions CACES : réponses expliquées par thème et par R',
    description: 'Questions CACES avec réponses : toute notre banque par recommandation, R489, R482, R486, R490, R485, et par thème, chaque réponse expliquée et sourcée.',
    h1: 'Questions et réponses du CACES, expliquées',
    intro: 'Choisissez une recommandation et un thème : chaque question s’ouvre sur sa bonne réponse, l’explication et le point du référentiel qu’elle entraîne.',
    resume: (h) => `Cette page ouvre toute notre banque de questions du test théorique CACES, soit ${h.num(h.count.all)} questions rédigées par Radif Partners à partir des référentiels de connaissances publiés dans les recommandations de l’Assurance Maladie. Elles se répartissent ainsi : ${h.count.per.r489} questions servent la R489, ${h.count.per.r482} la R482, ${h.count.per.r486} la R486, ${h.count.per.r490} la R490 et ${h.count.per.r485} la R485, une question générale pouvant servir plusieurs recommandations. Chacune est rangée dans un thème de la fiche d’évaluation et rattachée à un point précis du référentiel, que la correction affiche. Lire les réponses expliquées sert à comprendre la règle avant de s’entraîner ; l’entraînement lui-même se fait ensuite à l’examen blanc, où les questions sont tirées selon le barème. Ce ne sont pas les questions des organismes testeurs, qui ne sont pas publiées : ce sont des questions d’entraînement sur les mêmes connaissances.`,
    faqs: (h) => [
      { q: 'Ces questions sont-elles celles du vrai test ?', a: 'Non. Les organismes testeurs utilisent des grilles de questions qu’ils ne publient pas. Nos questions sont écrites à partir des mêmes référentiels de connaissances : elles portent sur les mêmes notions, dans les mêmes proportions, mais leur formulation est la nôtre. Un candidat qui comprend nos explications sait répondre à une question formulée autrement.' },
      { q: 'Combien de questions faut-il travailler avant le test ?', a: `Il n’y a pas de nombre officiel. Lire une fois toutes les questions de votre recommandation, ${h.count.per.r489} pour la R489 par exemple, puis faire trois ou quatre examens blancs complets donne une bonne idée du niveau. L’important est de comprendre l’explication de chaque erreur plutôt que de mémoriser la lettre de la bonne réponse.` },
      { q: 'Pourquoi une même question apparaît-elle dans plusieurs recommandations ?', a: 'Une partie des connaissances générales est commune : rôle de l’inspection du travail, droit de retrait, conditions pour conduire, signalisation de sécurité. Une même question peut alors entraîner un point de la R489 et un point de la R482. Elle est comptée dans les deux banques mais n’apparaît qu’une fois par examen.' },
      { q: 'Puis-je signaler une réponse que je crois fausse ?', a: 'Oui, par la page Contact, en donnant l’identifiant de la question affiché sous l’explication. Chaque signalement est relu par rapport à la recommandation concernée. Si la question est ambiguë ou dépassée par une nouvelle version du texte, elle est corrigée ou retirée de la banque à la mise à jour suivante.' },
    ],
    body: (h) => `
<h2>La banque, recommandation par recommandation</h2>
${h.table(['Recommandation', 'Questions', 'Thèmes'], RECOS.map((r) => [r.toUpperCase(), h.count.per[r], h.themesLine(r)]), `Banque Radif Partners au ${h.retrieved}.`, ['l', 'r', 'l'])}
<p>Chaque thème contient au moins une fois et demie le nombre de questions que le barème lui attribue, de façon qu’un examen blanc tiré deux fois ne soit jamais identique. Les points du référentiel qui valent beaucoup, comme les risques liés à la circulation ou la lecture d’une plaque de charge, ont le plus de questions.</p>
<h2>Comment lire une question</h2>
<p>Sous chaque question figurent la bonne réponse, l’explication et le point du référentiel concerné. L’explication dit pourquoi la bonne réponse est juste, et souvent pourquoi la réponse la plus tentante est fausse. Les questions d’abaque renvoient à une plaque de charge dessinée pour l’exercice : ces plaques sont fictives, mais se lisent comme celles des engins réels. Les pictogrammes et panneaux sont dessinés par nous selon les formes et couleurs réglementaires.</p>
<!--tool:mini:errors-->
<h2>De la lecture à l’entraînement</h2>
<p>Une fois les réponses lues, passez à l’${h.a('examen-blanc', 'examen blanc')} pour vérifier que vous les retrouvez sans aide, dans le temps imparti. Les questions manquées partent dans votre ${h.a('revision-erreurs', 'révision des erreurs')}. Pour un thème qui pose problème, les pages ${h.a('abaque-de-charge', 'abaque de charge')}, ${h.a('panneaux-pictogrammes', 'panneaux et pictogrammes')} et ${h.a('securite-risques', 'sécurité et risques')} proposent une série ciblée.</p>`,
  },
  en: {
    slug: 'questions-answers',
    nav: 'CACES questions and answers',
    card: 'The whole bank, sorted by recommendation and theme, with the right answer and its explanation.',
    title: 'CACES questions: answers explained by theme and by R',
    description: 'CACES questions with answers: our whole bank by recommendation R489, R482, R486, R490, R485 and by theme, each answer explained and tied to the syllabus.',
    h1: 'CACES questions and answers, explained',
    intro: 'Pick a recommendation and a theme: each question opens on its right answer, the explanation and the syllabus point it trains.',
    resume: (h) => `This page opens our whole CACES theory question bank: ${h.num(h.count.all)} questions written by Radif Partners from the knowledge syllabuses published in the French Health Insurance recommendations. They are spread as follows: ${h.count.per.r489} questions serve R489, ${h.count.per.r482} R482, ${h.count.per.r486} R486, ${h.count.per.r490} R490 and ${h.count.per.r485} R485, since a general question can serve several recommendations. Each sits in a theme of the assessment sheet and is tied to a precise syllabus point, shown with the answer. Reading the explained answers helps you understand each rule before practising; the practice itself then happens in the mock exam, where questions are drawn by the marking scheme. They are not the testing bodies’ questions, which are not published: they are practice questions on the same knowledge. The real test is in French, so switch to the French page once the rules are clear.`,
    faqs: (h) => [
      { q: 'Are these the questions of the real test?', a: 'No. Testing bodies use question grids they do not publish. Our questions are written from the same knowledge syllabuses: they cover the same topics in the same proportions, but the wording is ours. A candidate who understands our explanations can answer a question worded differently, which is what the real test requires.' },
      { q: 'How many questions should I work through before the test?', a: `There is no official number. Reading every question of your recommendation once, ${h.count.per.r489} for R489 for example, then sitting three or four full mock exams gives a good idea of your level. What matters is understanding the explanation of each mistake rather than memorising the letter of the right answer.` },
      { q: 'Why does the same question appear in several recommendations?', a: 'Part of the general knowledge is shared: the role of the labour inspectorate, the right to withdraw from danger, the conditions for operating, safety signs. One question can then train a point of R489 and a point of R482. It counts in both banks but appears only once per exam.' },
      { q: 'Can I report an answer I think is wrong?', a: 'Yes, through the Contact page, quoting the question identifier shown under the explanation. Each report is checked against the recommendation concerned. If the question is ambiguous or outdated by a new version of the text, it is corrected or removed from the bank at the next update.' },
    ],
    body: (h) => `
<h2>The bank, recommendation by recommendation</h2>
${h.table(['Recommendation', 'Questions', 'Themes'], RECOS.map((r) => [r.toUpperCase(), h.count.per[r], h.themesLine(r)]), `Radif Partners bank as of ${h.retrieved}.`, ['l', 'r', 'l'])}
<p>Each theme holds at least one and a half times the number of questions its marking gives it, so that two mock exams are never identical. Syllabus points worth a lot, such as traffic risks or reading a capacity plate, have the most questions.</p>
<h2>How to read a question</h2>
<p>Under each question you find the right answer, the explanation and the syllabus point concerned. The explanation says why the right answer is right, and often why the most tempting answer is wrong. Load chart questions refer to a capacity plate drawn for the exercise: these plates are fictitious but read like those of real machines. Pictograms and signs are drawn by us following the regulatory shapes and colours.</p>
<!--tool:mini:errors-->
<h2>From reading to practice</h2>
<p>Once you have read the answers, move to the ${h.a('examen-blanc', 'mock exam')} to check that you find them without help, against the clock. Missed questions go into your ${h.a('revision-erreurs', 'mistakes review')}. For a theme that causes trouble, the ${h.a('abaque-de-charge', 'load chart')}, ${h.a('panneaux-pictogrammes', 'signs and pictograms')} and ${h.a('securite-risques', 'safety and risks')} pages offer a targeted set.</p>`,
  },
});
