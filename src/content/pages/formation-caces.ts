import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'formation-caces',
  group: 'pratique',
  order: 55,
  tool: { kind: 'mini:ut-r489' },
  mini: { kind: 'mini:cpf' },
  related: ['caces-prix', 'financement', 'test-theorique', 'examen-blanc', 'echec-caces'],
  sources: ['r489', 'r482', 'r486', 'ct55', 'cdc_catalogue'],
  fr: {
    slug: 'formation-caces',
    nav: 'Formation CACES : durée, étapes',
    card: 'Formation, puis tests en unités de test : combien de temps dure un CACES, du premier jour au certificat.',
    title: 'Formation CACES : durée, déroulé et unités de test',
    description: 'Formation CACES : durée médiane des formations par catégorie, attestation de formation, durée des tests en unités de test et maximum de 7 unités par jour.',
    h1: 'Formation CACES : du premier jour au certificat',
    intro: 'Choisissez les catégories que vous visez : l’outil compte les unités de test, théorie comprise, et le nombre de jours de test nécessaires.',
    resume: (h) => `Un CACES se prépare en deux temps : une formation, puis des tests. La formation n’a pas de durée réglementaire : l’organisme l’adapte au niveau du candidat, à son expérience et au nombre de catégories visées. Au ${h.cpfDate}, la médiane des offres du catalogue Mon Compte Formation est de ${h.hrs('r489', '3')} pour une formation initiale en R489 catégorie 3, soit trois journées, et de ${h.hrs('r485', '1')} en R485. Les recommandations exigent qu’elle soit attestée avant le passage des tests, et précisent qu’une formation limitée à la préparation du test ne suffit pas. Les tests, eux, ont une durée fixe, exprimée en unités de test : une unité de test vaut une heure, à dix minutes près. Le test théorique compte pour une unité, chaque test pratique pour une demi-unité à une unité et demie selon la catégorie, et un candidat ne peut pas passer plus de ${h.P.test.maxUtPerDay} unités de test dans la même journée. Le testeur, enfin, ne peut pas être celui qui a assuré la formation.`,
    faqs: (h) => [
      { q: 'Combien de jours dure une formation CACES ?', a: `Aucune durée n’est fixée par les recommandations. La médiane des offres en R489 catégorie 3 est de ${h.hrs('r489', '3')} au catalogue Mon Compte Formation au ${h.cpfDate}. Un candidat expérimenté peut suivre une formation plus courte ; un débutant complet, une formation plus longue avec davantage de pratique sur l’engin.` },
      { q: 'Peut-on passer le CACES sans formation ?', a: 'Non. Les recommandations demandent une attestation de formation, interne à l’entreprise ou délivrée par un organisme, avant le passage des tests. Elles précisent qu’une formation réduite à la préparation au test ne répond pas à cette exigence. Un candidat qui conduit déjà doit donc suivre une formation, même courte.' },
      { q: 'Le formateur peut-il faire passer les tests ?', a: 'Non. Le testeur qui évalue un candidat ne peut pas être la personne qui l’a formé. Un même organisme peut former et tester, à condition d’être certifié comme organisme testeur et de confier les tests à un autre intervenant que le formateur du candidat.' },
      { q: 'Combien de catégories peut-on passer en une journée ?', a: `Au plus ${h.P.test.maxUtPerDay} unités de test par jour, théorie comprise. En R489, la théorie vaut une unité et la catégorie 3 une unité : un candidat peut donc enchaîner théorie, catégorie 3 et catégorie 5 dans la même journée, avec de la marge. L’outil de cette page fait le compte.` },
    ],
    body: (h) => `
<h2>Les unités de test par catégorie</h2>
${h.table(['Recommandation', 'Théorie', 'Test pratique par catégorie'], [['R489', `${h.P.recos.r489.ut.theory} UT`, Object.entries(h.P.recos.r489.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k} : ${h.num(v as number, 2)}`).join(' · ')], ['R485', `${h.P.recos.r485.ut.theory} UT`, Object.entries(h.P.recos.r485.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k} : ${h.num(v as number, 2)}`).join(' · ')], ['R482', `${h.P.recos.r482.ut.theory} UT`, Object.entries(h.P.recos.r482.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k === 'option' ? 'option' : k} : ${h.num(v as number, 2)}`).join(' · ')], ['R486', `${h.P.recos.r486.ut.theory} UT`, Object.entries(h.P.recos.r486.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k} : ${h.num(v as number, 2)}`).join(' · ')], ['R490', `${h.P.recos.r490.ut.theory} UT`, Object.entries(h.P.recos.r490.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k === 'grue' ? 'grue' : k} : ${h.num(v as number, 2)}`).join(' · ')]], 'Durées des épreuves en unités de test (UT), annexes des recommandations de 2026.', ['l', 'r', 'l'])}
<h2>Le déroulé type</h2>
<ol>
<li>Positionnement : l’organisme évalue l’expérience du candidat pour ajuster la durée.</li>
<li>Formation théorique : réglementation, technologie, stabilité, lecture de plaque, risques, signalisation.</li>
<li>Formation pratique sur un engin de la catégorie : vérifications, conduite, manœuvres, prise et dépose de charges.</li>
<li>Attestation de formation, puis tests théorique et pratique avec un testeur différent du formateur.</li>
<li>Délivrance du CACES par l’organisme testeur certifié, pour chaque catégorie réussie.</li>
</ol>
<!--tool:mini:ut-r482-->
<h2>Arriver préparé</h2>
<p>La théorie se travaille avant la formation : un candidat qui a fait deux ou trois ${h.a('examen-blanc', 'examens blancs')} profite davantage du temps passé sur l’engin. Les règles de notation sont détaillées sur la page ${h.a('test-theorique', 'test théorique')}, et les prix des formations sur la page ${h.a('caces-prix', 'prix du CACES')}.</p>`,
  },
  en: {
    slug: 'caces-training',
    nav: 'CACES training: length, steps',
    card: 'Training, then tests counted in test units: how long a CACES takes, from day one to the certificate.',
    title: 'CACES training: length, steps and test units explained',
    description: 'CACES training: median course length by category, the training certificate, test length in test units and the maximum of 7 per day, with a test-day tool.',
    h1: 'CACES training: from day one to the certificate',
    intro: 'Pick the categories you are aiming for: the tool counts the test units, theory included, and the number of test days needed.',
    resume: (h) => `A CACES is prepared in two stages: a course, then tests. The course has no set length: the provider adapts it to the candidate’s level, experience and the number of categories targeted. As of ${h.cpfDate}, the median Mon Compte Formation catalogue offer is ${h.hrs('r489', '3')} for an initial R489 category 3 course, three days, and ${h.hrs('r485', '1')} for R485. The recommendations require the training to be certified before the tests are taken, and specify that a course limited to preparing for the test is not enough. The tests themselves have a fixed length, expressed in test units: one test unit is one hour, give or take ten minutes. The theory test counts as one unit, each practical test as half a unit to one and a half units depending on the category, and a candidate cannot sit more than ${h.P.test.maxUtPerDay} test units in a single day. Finally, the tester cannot be the person who delivered the training.`,
    faqs: (h) => [
      { q: 'How many days does a CACES course last?', a: `The recommendations set no length. The median R489 category 3 offer is ${h.hrs('r489', '3')} in the Mon Compte Formation catalogue as of ${h.cpfDate}. An experienced candidate can follow a shorter course; a complete beginner, a longer one with more practice on the machine.` },
      { q: 'Can I take the CACES without training?', a: 'No. The recommendations require a training certificate, from the company itself or from a provider, before the tests. They specify that a course reduced to test preparation does not meet that requirement. A candidate who already operates machines must therefore follow a course, even a short one.' },
      { q: 'Can the trainer run the tests?', a: 'No. The tester who assesses a candidate cannot be the person who trained them. One organisation can both train and test, provided it is certified as a testing body and gives the tests to someone other than the candidate’s trainer.' },
      { q: 'How many categories can I take in one day?', a: `At most ${h.P.test.maxUtPerDay} test units a day, theory included. Under R489, theory is one unit and category 3 one unit: a candidate can therefore sit theory, category 3 and category 5 on the same day, with room to spare. The tool on this page does the count.` },
    ],
    body: (h) => `
<h2>Test units by category</h2>
${h.table(['Recommendation', 'Theory', 'Practical test per category'], [['R489', `${h.P.recos.r489.ut.theory} TU`, Object.entries(h.P.recos.r489.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k}: ${h.num(v as number, 2)}`).join(' · ')], ['R485', `${h.P.recos.r485.ut.theory} TU`, Object.entries(h.P.recos.r485.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k}: ${h.num(v as number, 2)}`).join(' · ')], ['R482', `${h.P.recos.r482.ut.theory} TU`, Object.entries(h.P.recos.r482.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k}: ${h.num(v as number, 2)}`).join(' · ')], ['R486', `${h.P.recos.r486.ut.theory} TU`, Object.entries(h.P.recos.r486.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k}: ${h.num(v as number, 2)}`).join(' · ')], ['R490', `${h.P.recos.r490.ut.theory} TU`, Object.entries(h.P.recos.r490.ut).filter(([k]) => k !== 'theory').map(([k, v]) => `${k === 'grue' ? 'crane' : k}: ${h.num(v as number, 2)}`).join(' · ')]], 'Test lengths in test units (TU), annexes of the 2026 recommendations.', ['l', 'r', 'l'])}
<h2>A typical course</h2>
<ol>
<li>Assessment: the provider checks the candidate’s experience to adjust the length.</li>
<li>Theory: regulations, technology, stability, reading plates, risks, signs.</li>
<li>Practice on a machine of the category: checks, driving, manoeuvres, picking up and setting down loads.</li>
<li>Training certificate, then theory and practical tests with a tester other than the trainer.</li>
<li>The certified testing body issues the CACES for each category passed.</li>
</ol>
<!--tool:mini:ut-r482-->
<h2>Arriving prepared</h2>
<p>Theory can be worked on before the course: a candidate who has taken two or three ${h.a('examen-blanc', 'mock exams')} gets more out of the time spent on the machine. Marking rules are detailed on the ${h.a('test-theorique', 'theory test page')}, and course prices on the ${h.a('caces-prix', 'CACES price page')}.</p>`,
  },
});
