import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-r482',
  group: 'categories',
  order: 50,
  tool: { kind: 'quiz', props: { reco: 'r482', mode: 'exam' } },
  mini: { kind: 'mini:r482cat' },
  related: ['caces-telescopique', 'circulation-signalisation', 'fin-de-poste', 'caces-prix', 'duree-validite', 'examen-blanc'],
  sources: ['r482', 'tableau', 'cdc_catalogue'],
  fr: {
    slug: 'caces-r482',
    nav: 'CACES R482 : engins de chantier',
    card: 'Test blanc R482 de 100 questions, catégories A à G, validité de 10 ans et prix médian par catégorie.',
    title: 'CACES R482 : test blanc engins de chantier, catégories A à G',
    description: 'CACES R482 : test théorique blanc de 100 questions sur le barème des engins de chantier, catégories A à G, validité de 10 ans et prix médian CPF 2026.',
    h1: 'CACES R482 : test blanc et catégories d’engins de chantier',
    intro: 'Le test ci-dessous suit la fiche d’évaluation de la R482 : 12 points de connaissances générales, 28 de technologie, 44 d’exploitation, 12 de circulation et 4 de fin de poste.',
    resume: (h) => `La recommandation R482 de l’Assurance Maladie encadre la conduite des engins de chantier mobiles : pelles, chargeuses, tombereaux, compacteurs, bouteurs, niveleuses, chariots télescopiques. Sa version en vigueur est la ${h.P.recos.r482.version}, publiée en septembre 2026, qui ne change pas le mode d’évaluation en place depuis le 1er janvier 2020. C’est la seule des cinq recommandations de ce site dont le CACES vaut ${h.years('r482')} ans, contre 5 pour les autres. Le test théorique, commun à toutes les catégories, a un barème en cinq thèmes, dont un thème de circulation sur ${h.pts('r482', 'circ')} points et un thème de fin de poste et maintenance sur ${h.pts('r482', 'maint')} points seulement : deux erreurs y sont tolérées, pas trois. Les formations y sont plus chères que pour les chariots : au ${h.cpfDate}, le prix médian d’une formation initiale en catégorie A est de ${h.med('r482', 'A')} au catalogue Mon Compte Formation, et de ${h.med('r482', 'B1')} en catégorie B1.`,
    faqs: (h) => [
      { q: 'Quelle est la durée de validité du CACES R482 ?', a: `${h.years('r482')} ans à compter de la date de réussite du second test. C’est le double des autres CACES de ce site. L’aptitude médicale, elle, reste à attester tous les ${h.P.medical.attestationYears} ans : un conducteur d’engin peut donc avoir un CACES valable mais ne plus pouvoir être autorisé faute d’attestation médicale à jour.` },
      { q: 'La catégorie A couvre-t-elle tous les engins compacts ?', a: 'Elle couvre les engins compacts jusqu’à 6 tonnes : mini-pelles, mini-chargeuses, petits dumpers, petits compacteurs, et les tracteurs agricoles jusqu’à 100 chevaux utilisés sur chantier. Au-delà de 6 tonnes, chaque type d’engin a sa propre catégorie, de B1 à F, avec son propre test pratique.' },
      { q: 'Qu’est-ce que la catégorie G du CACES R482 ?', a: 'C’est la conduite hors production : déplacer un engin, le charger sur un porte-engins ou le décharger, faire des essais, sans réaliser de travaux. Elle sert par exemple aux mécaniciens, aux chauffeurs de porte-engins et aux loueurs qui livrent les machines sur les chantiers.' },
      { q: 'Faut-il le permis de conduire pour le CACES R482 ?', a: 'Le CACES ne demande pas le permis. En revanche, un engin qui circule sur la voie publique doit être conduit par un titulaire du permis de la catégorie prévue par le Code de la route pour cet engin. L’employeur le vérifie avant de délivrer l’autorisation de conduite.' },
    ],
    body: (h) => `
<h2>Les catégories de la R482</h2>
${h.table(['Catégorie', 'Engins', 'Prix médian initial', 'Offres'], [['A', 'Engins compacts jusqu’à 6 t', h.med('r482', 'A'), h.num(h.offers('r482', 'A'))], ['B1', 'Pelles de plus de 6 t, extraction à déplacement séquentiel', h.med('r482', 'B1'), h.num(h.offers('r482', 'B1'))], ['B2', 'Engins de sondage ou de forage', h.med('r482', 'B2'), h.num(h.offers('r482', 'B2'))], ['B3', 'Pelles rail-route', h.med('r482', 'B3'), h.num(h.offers('r482', 'B3'))], ['C1', 'Chargeuses de plus de 6 t', h.med('r482', 'C1'), h.num(h.offers('r482', 'C1'))], ['C2', 'Bouteurs, engins de réglage à déplacement alternatif', h.med('r482', 'C2'), h.num(h.offers('r482', 'C2'))], ['C3', 'Niveleuses', h.med('r482', 'C3'), h.num(h.offers('r482', 'C3'))], ['D', 'Compacteurs de plus de 6 t', h.med('r482', 'D'), h.num(h.offers('r482', 'D'))], ['E', 'Tombereaux, dumpers et tracteurs de plus de 6 t ou 100 ch', h.med('r482', 'E'), h.num(h.offers('r482', 'E'))], ['F', 'Chariots télescopiques et chariots tout-terrain', h.med('r482', 'F'), h.num(h.offers('r482', 'F'))], ['G', 'Conduite hors production', h.med('r482', 'G'), h.num(h.offers('r482', 'G'))]], `Annexe 1 de la recommandation R.482B ; offres Mon Compte Formation au ${h.cpfDate}. Peu d’offres en B2, B3 et C3 : médiane peu fiable.`, ['l', 'l', 'r', 'r'])}
<h2>Le barème du test théorique</h2>
${h.grid('r482')}
<p>Le thème de circulation est propre à la R482 : il porte sur les déplacements sur chantier et sur la voie publique, la signalisation temporaire et les gestes de guidage. Le thème de fin de poste et maintenance, sur ${h.pts('r482', 'maint')} points, est le plus court de toutes les recommandations : ${h.min('r482', 'maint')} bonnes réponses au moins.</p>
<!--tool:mini:ut-r482-->
<h2>Les engins hors CACES</h2>
<p>Certains engins de chantier ne relèvent d’aucune catégorie, comme les finisseurs, les raboteuses ou les pelles araignées. Leur conducteur suit une formation adaptée à l’engin, évaluée par l’employeur avant l’autorisation de conduite. L’outil de la page ${h.a('quel-caces', 'quel CACES pour quel engin')} les signale.</p>`,
  },
  en: {
    slug: 'caces-r482',
    nav: 'CACES R482: construction machinery',
    card: 'R482 mock test of 100 questions, categories A to G, 10-year validity and median price per category.',
    title: 'CACES R482: construction machinery mock test, A to G',
    description: 'CACES R482: 100-question theory mock test on the construction machinery marking scheme, categories A to G, the 10-year validity and median CPF prices.',
    h1: 'CACES R482: mock test and construction machinery categories',
    intro: 'The test below follows the R482 assessment sheet: 12 points of general knowledge, 28 of technology, 44 of operation, 12 of traffic and 4 of end of shift.',
    resume: (h) => `Recommendation R482 of the French Health Insurance covers mobile construction machinery: excavators, loaders, dump trucks, compactors, bulldozers, graders and telehandlers. The version in force is ${h.P.recos.r482.version}, published in September 2026, which keeps the assessment method in place since 1 January 2020. It is the only one of this site’s five recommendations whose CACES is valid for ${h.years('r482')} years, against 5 for the others. The theory test, shared by all categories, has a five-theme marking scheme, including a traffic theme worth ${h.pts('r482', 'circ')} points and an end-of-shift and maintenance theme worth only ${h.pts('r482', 'maint')} points: two mistakes are tolerated there, not three. Courses cost more than for forklifts: as of ${h.cpfDate}, the median price of an initial category A course is ${h.med('r482', 'A')} in the Mon Compte Formation catalogue, and ${h.med('r482', 'B1')} for category B1.`,
    faqs: (h) => [
      { q: 'How long is the R482 CACES valid?', a: `${h.years('r482')} years from the date the second test was passed. That is twice as long as the other CACES on this site. Medical fitness must still be certified every ${h.P.medical.attestationYears} years: a machine operator can therefore hold a valid CACES but no longer be authorised for lack of an up-to-date medical certificate.` },
      { q: 'Does category A cover all compact machines?', a: 'It covers compact machines up to 6 tonnes: mini excavators, compact loaders, small dumpers, small compactors, and farm tractors up to 100 hp used on a site. Above 6 tonnes, each type of machine has its own category, from B1 to F.' },
      { q: 'What is R482 category G?', a: 'It is non-production driving: moving a machine, loading it onto a transporter or unloading it, running tests, without doing any work. It is used for example by mechanics, transporter drivers and rental firms that deliver machines to sites, but never for earthmoving or other production work.' },
      { q: 'Do I need a driving licence for the R482 CACES?', a: 'The CACES does not require a licence. However, a machine travelling on a public road must be driven by someone holding the licence category the Highway Code sets for that machine. The employer checks it before issuing the operating authorisation.' },
    ],
    body: (h) => `
<h2>The R482 categories</h2>
${h.table(['Category', 'Machines', 'Median initial price', 'Offers'], [['A', 'Compact machines up to 6 t', h.med('r482', 'A'), h.num(h.offers('r482', 'A'))], ['B1', 'Excavators above 6 t, sequential-travel extraction', h.med('r482', 'B1'), h.num(h.offers('r482', 'B1'))], ['B2', 'Drilling and boring rigs', h.med('r482', 'B2'), h.num(h.offers('r482', 'B2'))], ['B3', 'Road-rail excavators', h.med('r482', 'B3'), h.num(h.offers('r482', 'B3'))], ['C1', 'Loaders above 6 t', h.med('r482', 'C1'), h.num(h.offers('r482', 'C1'))], ['C2', 'Bulldozers, alternating-travel levelling machines', h.med('r482', 'C2'), h.num(h.offers('r482', 'C2'))], ['C3', 'Graders', h.med('r482', 'C3'), h.num(h.offers('r482', 'C3'))], ['D', 'Compactors above 6 t', h.med('r482', 'D'), h.num(h.offers('r482', 'D'))], ['E', 'Dump trucks, dumpers and tractors above 6 t or 100 hp', h.med('r482', 'E'), h.num(h.offers('r482', 'E'))], ['F', 'Telehandlers and rough-terrain forklifts', h.med('r482', 'F'), h.num(h.offers('r482', 'F'))], ['G', 'Non-production driving', h.med('r482', 'G'), h.num(h.offers('r482', 'G'))]], `Annex 1 of recommendation R.482B; Mon Compte Formation offers on ${h.cpfDate}. Few offers in B2, B3 and C3: the median is unreliable.`, ['l', 'l', 'r', 'r'])}
<h2>The theory test marking scheme</h2>
${h.grid('r482')}
<p>The traffic theme is specific to R482: it covers moving on site and on public roads, temporary signs and guiding signals. The end-of-shift and maintenance theme, worth ${h.pts('r482', 'maint')} points, is the shortest of all recommendations: at least ${h.min('r482', 'maint')} correct answers.</p>
<!--tool:mini:ut-r482-->
<h2>Machines outside the CACES</h2>
<p>Some construction machines fall under no category, such as pavers, cold planers or walking excavators. Their operator follows training specific to the machine, assessed by the employer before the operating authorisation. The tool on the ${h.a('quel-caces', 'which CACES for which machine')} page flags them.</p>`,
  },
});
