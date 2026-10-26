import { definePage } from '../../lib/guide-types';
import { RECOS } from '../../lib/engine/exam';

export default definePage({
  id: 'examen-blanc',
  group: 'tests',
  order: 10,
  tool: { kind: 'quiz', props: { reco: 'r489', mode: 'exam', recoSelect: true } },
  mini: { kind: 'mini:errors' },
  related: ['test-theorique', 'revision-erreurs', 'questions-reponses', 'caces-r489', 'caces-r482', 'caces-r486'],
  sources: ['r489', 'r482', 'r486', 'r490', 'r485', 'tableau'],
  fr: {
    slug: 'examen-blanc',
    nav: 'Examen blanc CACES',
    card: 'Cent questions tirées selon le barème officiel de chaque recommandation, une heure de chronomètre, notation à 70 et par thème.',
    title: 'Examen blanc CACES : test théorique de 100 questions',
    description: 'Examen blanc CACES gratuit : 100 questions tirées selon la fiche d’évaluation officielle de la R489, R482, R486, R490 ou R485, une heure, note par thème.',
    h1: 'Examen blanc CACES : le test théorique en conditions réelles',
    intro: 'Choisissez votre recommandation, répondez aux 100 questions : le chronomètre d’une heure démarre à la première réponse et la note suit les deux règles officielles.',
    resume: (h) => `L’examen blanc reproduit le test théorique d’un CACES tel que le décrivent les recommandations de l’Assurance Maladie. Il compte ${h.P.test.questions} questions notées 1 ou 0, tirées point par point selon la fiche d’évaluation des connaissances théoriques de la recommandation choisie : chaque point du référentiel apporte exactement le nombre de questions de son barème. Le chronomètre est réglé sur ${h.P.test.minutes} minutes, la durée d’une unité de test, et démarre à votre première réponse. À la fin, la note est calculée comme le jour du test : il faut ${h.P.test.passScore} points sur 100 et au moins la moitié des points dans chaque thème, faute de quoi le test est échoué même avec une bonne note globale. La correction peut venir à la fin, comme en salle, ou après chaque question si vous préférez apprendre en avançant. Les questions viennent de notre banque de ${h.num(h.count.all)} questions écrites à partir des référentiels officiels ; ce ne sont pas les questions de l’organisme testeur, qui ne sont pas publiées.`,
    faqs: (h) => [
      { q: 'Combien de temps dure le test théorique du CACES ?', a: `Une unité de test, que les recommandations fixent à une heure plus ou moins dix minutes. Notre chronomètre est réglé sur ${h.P.test.minutes} minutes et s’arrête à zéro en notant le test tel qu’il est. Cent questions en une heure laissent environ trente-six secondes par question : les questions d’abaque demandent plus de temps, les questions de signalisation beaucoup moins.` },
      { q: 'L’examen blanc est-il le même pour toutes les catégories ?', a: 'Oui, comme le vrai test : dans une recommandation, la théorie est commune à toutes les catégories. Un candidat R489 catégorie 1A et un candidat catégorie 5 passent le même barème de 100 points. Ce qui change avec la catégorie, c’est l’épreuve pratique, passée sur un engin représentatif de la catégorie.' },
      { q: 'Faut-il viser plus que 70 à l’examen blanc ?', a: `Oui. Visez au moins 80 plusieurs fois de suite, sans thème sous la moyenne, avant le test réel : le jour J, la fatigue, le stress et la formulation des questions coûtent souvent quelques points. Si un thème tombe régulièrement près de la moitié, travaillez-le en mode entraînement : c’est la règle par thème qui fait échouer le plus de candidats bien notés.` },
      { q: 'Puis-je refaire le même examen blanc plus tard ?', a: 'Oui. Quand vous lancez un nouvel examen, l’adresse de la page garde le numéro du tirage : en la gardant dans vos favoris, vous retrouverez exactement les mêmes 100 questions dans le même ordre. Les questions manquées sont aussi gardées dans votre navigateur, pour la révision des erreurs.' },
    ],
    body: (h) => `
<h2>Le barème des cinq recommandations</h2>
<p>Toutes les recommandations ont 100 points, mais pas les mêmes thèmes. L’examen blanc suit le barème de celle que vous choisissez dans la liste : en changeant de recommandation, la répartition des questions change avec elle.</p>
${h.table(['Recommandation', 'Thèmes et points'], RECOS.map((r) => [r.toUpperCase(), h.themesLine(r)]), 'Fiches d’évaluation des connaissances théoriques, annexe 3 de chaque recommandation (versions de 2026).', ['l', 'l'])}
<p>Le thème d’exploitation est partout le plus lourd : 50 points en R489 et R485, 44 en R482, 54 en R486, 38 en R490. C’est lui qui contient les causes d’accident, les risques, la circulation et la signalisation. Les thèmes plus courts, comme l’abaque de charges (10 points) ou l’entretien (6 à 10 points selon l’engin), sont ceux où la règle de la moitié joue le plus souvent : quelques erreurs suffisent à passer sous la barre.</p>
<!--tool:mini:pass-->
<h2>Comment utiliser l’examen blanc</h2>
<ol>
<li>Faites un premier examen sans préparation particulière, correction à la fin. Il montre où vous en êtes, thème par thème.</li>
<li>Travaillez les thèmes faibles en ${h.a('questions-reponses', 'questions-réponses')} ou en série d’entraînement, avec la correction après chaque question.</li>
<li>Passez à la ${h.a('revision-erreurs', 'révision des erreurs')} : elle ne repose que les questions manquées, jusqu’à ce que vous y répondiez juste.</li>
<li>Refaites un examen complet tous les deux ou trois jours, toujours chronométré, jusqu’à dépasser 80 sans thème sous la moyenne.</li>
</ol>
<h2>Ce qui change le jour du test</h2>
<p>Le test réel se passe dans un organisme testeur certifié, sur papier ou sur écran selon l’organisme, en français. Si vous avez du mal à lire, les questions peuvent être lues à voix haute. Le testeur ne peut pas être votre formateur. La théorie et la pratique se passent dans l’ordre choisi par l’organisme ; si vous échouez à une seule des deux, la partie réussie reste acquise ${h.P.test.keepPassedPartMonths} mois auprès du même organisme, comme l’explique la page ${h.a('echec-caces', 'échec au CACES')}.</p>
<h2>D’où viennent les questions</h2>
<p>Chaque question est écrite par Radif Partners à partir d’un point du référentiel de connaissances publié dans la recommandation, et la correction indique ce point. Les grilles officielles de questions, utilisées par les organismes testeurs, ne sont pas publiques : nous ne les reproduisons pas et ne prétendons pas les donner. Les recommandations elles-mêmes sont téléchargeables gratuitement sur ${h.src('tableau', 'le site de l’Assurance Maladie')}.</p>`,
  },
  en: {
    slug: 'mock-exam',
    nav: 'CACES mock exam',
    card: 'One hundred questions drawn with each recommendation’s official weighting, a one-hour timer, marked at 70 and by theme.',
    title: 'CACES mock exam: 100-question theory test, one hour',
    description: 'Free CACES mock exam: 100 questions drawn from the official R489, R482, R486, R490 or R485 assessment sheet, one hour on the clock and a score for every theme.',
    h1: 'CACES mock exam: the theory test in real conditions',
    intro: 'Pick your recommendation and answer the 100 questions: the one-hour timer starts at your first answer and the marking follows both official rules.',
    resume: (h) => `The mock exam reproduces the theory test of a CACES (the French safe operation certificate) as the French Health Insurance recommendations describe it. It has ${h.P.test.questions} questions scoring 1 or 0, drawn point by point from the theory assessment sheet of the recommendation you pick: each syllabus point brings exactly the number of questions its marking gives it. The timer is set to ${h.P.test.minutes} minutes, the length of one test unit, and starts at your first answer. At the end, the score is worked out as on test day: you need ${h.P.test.passScore} points out of 100 and at least half the points in every theme, otherwise the test is failed even with a good overall score. Marking can come at the end, as in the exam room, or after each question if you prefer to learn as you go. The questions come from our bank of ${h.num(h.count.all)} questions written from the official syllabuses; they are not the testing body’s questions, which are not published. The real test is in French; this English version helps you understand the rules and the vocabulary.`,
    faqs: (h) => [
      { q: 'How long is the CACES theory test?', a: `One test unit, which the recommendations set at one hour give or take ten minutes. Our timer is set to ${h.P.test.minutes} minutes and stops at zero, marking the test as it stands. One hundred questions in an hour leaves about thirty-six seconds each: load chart questions take longer, sign questions much less.` },
      { q: 'Is the mock exam the same for every category?', a: 'Yes, as in the real test: within a recommendation the theory is shared by all categories. An R489 category 1A candidate and a category 5 candidate sit the same 100-point scheme. What changes with the category is the practical test, sat on a machine representative of that category.' },
      { q: 'Should I practise in English or in French?', a: 'Both. The real test is in French only, and the questions can be read aloud to you in French if reading is hard. Use the English version to understand each rule and the explanation behind it, then switch to French with the language link and practise until you clear 80 there, so the wording on the day is familiar.' },
      { q: 'Can I take the same mock exam again later?', a: 'Yes. When you start a new exam, the page address keeps the draw number: bookmark it and you will get exactly the same 100 questions in the same order. Missed questions are also kept in your browser for the mistakes review.' },
    ],
    body: (h) => `
<h2>The marking scheme of the five recommendations</h2>
<p>Every recommendation has 100 points, but not the same themes. The mock exam follows the scheme of the one you pick in the list: switch recommendation and the spread of questions changes with it.</p>
${h.table(['Recommendation', 'Themes and points'], RECOS.map((r) => [r.toUpperCase(), h.themesLine(r)]), 'Theory assessment sheets, annex 3 of each recommendation (2026 versions).', ['l', 'l'])}
<p>Operation is the heaviest theme everywhere: 50 points in R489 and R485, 44 in R482, 54 in R486, 38 in R490. It holds the causes of accidents, the risks, traffic rules and signs. The shorter themes, such as the load chart (10 points) or maintenance (6 to 10 points depending on the machine), are where the half-marks rule bites most often: a few mistakes are enough to drop below the line.</p>
<!--tool:mini:pass-->
<h2>How to use the mock exam</h2>
<ol>
<li>Take a first exam with no special preparation, marked at the end. It shows where you stand, theme by theme.</li>
<li>Work on weak themes in ${h.a('questions-reponses', 'questions and answers')} or in a practice set, marked after each question.</li>
<li>Move on to the ${h.a('revision-erreurs', 'mistakes review')}: it only asks the questions you missed, until you get them right.</li>
<li>Sit a full exam every two or three days, always timed, until you clear 80 with no theme below half.</li>
</ol>
<h2>What is different on test day</h2>
<p>The real test is sat at a certified testing body, on paper or on screen depending on the body, in French. If reading is hard, the questions can be read aloud. The tester cannot be your trainer. Theory and practical are sat in the order the body chooses; if you fail only one of them, the part you passed is kept for ${h.P.test.keepPassedPartMonths} months with the same body, as the ${h.a('echec-caces', 'failed CACES page')} explains.</p>
<h2>Where the questions come from</h2>
<p>Every question is written by Radif Partners from one point of the knowledge syllabus published in the recommendation, and the marking shows that point. The official question grids used by testing bodies are not public: we do not reproduce them and do not claim to give them. The recommendations themselves can be downloaded free of charge from ${h.src('tableau', 'the French Health Insurance website')}.</p>`,
  },
});

