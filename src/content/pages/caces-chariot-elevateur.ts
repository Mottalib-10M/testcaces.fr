import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-chariot-elevateur',
  group: 'categories',
  order: 15,
  tool: { kind: 'finder', props: { start: 'frontal-6' } },
  mini: { kind: 'mini:r489cat' },
  related: ['caces-r489', 'caces-3', 'caces-5', 'caces-1', 'caces-telescopique', 'formation-caces'],
  sources: ['r489', 'ct55', 'ct56', 'cdc_catalogue'],
  fr: {
    slug: 'caces-cariste',
    nav: 'CACES cariste : chariot élévateur',
    card: 'Quel CACES pour devenir cariste : l’engin, la catégorie, la durée de validité et le prix médian.',
    title: 'CACES cariste : quel CACES pour conduire un chariot ?',
    description: 'CACES cariste : quel CACES pour conduire un chariot élévateur, catégorie par engin, validité, aptitude médicale, autorisation de l’employeur et prix médian.',
    h1: 'CACES cariste : quel CACES pour quel chariot élévateur',
    intro: 'Choisissez le chariot que vous conduirez : l’outil donne la recommandation, la catégorie, la durée de validité et le prix médian de la formation.',
    resume: (h) => `Pour conduire un chariot élévateur en France, le Code du travail exige une formation adéquate (article R4323-55) et une autorisation de conduite délivrée par l’employeur. Le CACES, certificat d’aptitude à la conduite en sécurité, est la façon la plus répandue de prouver cette formation : l’Assurance Maladie le décrit dans la recommandation R489 pour les chariots à conducteur porté, et la plupart des offres d’emploi de cariste le demandent. Un cariste d’entrepôt passe le plus souvent la catégorie 3, chariot frontal jusqu’à 6 tonnes, parfois complétée par la catégorie 5, chariot à mât rétractable. Le CACES R489 vaut ${h.years('r489')} ans. Au ${h.cpfDate}, le prix médian d’une formation initiale en catégorie 3 est de ${h.med('r489', '3')} au catalogue Mon Compte Formation. L’outil ci-dessus part de l’engin réel pour donner la bonne catégorie, ce qui évite de payer une formation qui ne couvre pas le chariot de l’emploi visé.`,
    faqs: (h) => [
      { q: 'Le CACES est-il obligatoire pour être cariste ?', a: 'Le Code du travail n’impose pas le CACES en tant que tel : il impose une formation adéquate et une autorisation de conduite de l’employeur. Mais la recommandation de l’Assurance Maladie fait du CACES le moyen de référence pour vérifier cette formation, et la quasi-totalité des employeurs et agences d’intérim le demandent.' },
      { q: 'Quelle catégorie de CACES demander pour un premier emploi de cariste ?', a: 'La catégorie 3, chariot frontal en porte-à-faux jusqu’à 6 tonnes, est la plus demandée. Ajoutez la 5 si l’entrepôt a des rayonnages hauts desservis par des chariots à mât rétractable, et la 1A ou la 1B pour la préparation de commandes. Lisez l’offre d’emploi : elle cite en général les catégories attendues.' },
      { q: 'Le CACES cariste suffit-il pour conduire chez n’importe quel employeur ?', a: 'Non. Chaque employeur délivre sa propre autorisation de conduite, après avoir vérifié votre aptitude médicale et votre connaissance des lieux, des consignes et des engins du site. Le CACES prouve la formation, l’autorisation donne le droit de conduire sur ce site-là.' },
      { q: 'Combien de temps dure le CACES cariste ?', a: `Il vaut ${h.years('r489')} ans à partir de la date de réussite du dernier des deux tests, théorique ou pratique. À l’échéance, il faut repasser les deux tests ; une formation de recyclage, plus courte, les prépare. La médiane des recyclages en catégorie 3 est de ${h.hrs('r489', '3', 'rec')} au catalogue.` },
    ],
    body: (h) => `
<h2>Les trois conditions pour conduire un chariot</h2>
${h.table(['Condition', 'Qui la remplit', 'Texte'], [['Formation adéquate, prouvée en pratique par le CACES', 'Le salarié, auprès d’un organisme testeur certifié', `${h.src('ct55', 'Article R4323-55')} du Code du travail ; recommandation R.489`], ['Aptitude médicale, attestée tous les 5 ans', 'Le médecin du travail', `${h.src('ct56', 'Article R4323-56')} du Code du travail`], ['Connaissance du site et des consignes', 'L’employeur', 'Article R4323-56 du Code du travail']], 'Les trois éléments que vérifie l’employeur avant l’autorisation de conduite.', ['l', 'l', 'l'])}
<p>Le CACES suit le cariste d’un employeur à l’autre, l’autorisation non. Un intérimaire reçoit une autorisation de l’entreprise utilisatrice pour chaque mission. La page ${h.a('autorisation-de-conduite', 'autorisation de conduite')} détaille ce partage.</p>
<h2>Les catégories qui intéressent un cariste</h2>
${h.table(['Engin', 'Catégorie', 'Prix médian initial', 'Durée médiane'], [['Transpalette ou préparateur à conducteur porté', '1A', h.med('r489', '1A'), h.hrs('r489', '1A')], ['Gerbeur à conducteur porté', '1B', h.med('r489', '1B'), h.hrs('r489', '1B')], ['Chariot frontal jusqu’à 6 t', '3', h.med('r489', '3'), h.hrs('r489', '3')], ['Chariot frontal de plus de 6 t', '4', h.med('r489', '4'), h.hrs('r489', '4')], ['Chariot à mât rétractable', '5', h.med('r489', '5'), h.hrs('r489', '5')]], `Recommandation R.489A ; offres Mon Compte Formation au ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<!--tool:mini:validite-->
<h2>Préparer le test théorique</h2>
<p>Le test théorique est le même pour toutes les catégories R489 : ${h.P.test.questions} questions, réussite à ${h.P.test.passScore} points avec au moins la moitié de chaque thème. L’${h.a('examen-blanc', 'examen blanc')} le reproduit, et les pages ${h.a('caces-3', 'CACES 3')} et ${h.a('caces-5', 'CACES 5')} proposent des séries ciblées.</p>`,
  },
  en: {
    slug: 'forklift-caces',
    nav: 'Forklift CACES: which one?',
    card: 'Which CACES to become a forklift driver: the machine, the category, the validity and the median price.',
    title: 'Forklift CACES: which CACES to drive a lift truck in France',
    description: 'Forklift CACES in France: which CACES to drive a lift truck, category by machine, validity, medical fitness, the employer’s authorisation and median price.',
    h1: 'Forklift CACES: which CACES for which truck',
    intro: 'Pick the truck you will drive: the tool gives the recommendation, the category, the validity period and the median course price.',
    resume: (h) => `To drive a forklift truck in France, the Labour Code requires adequate training (article R4323-55) and an operating authorisation issued by the employer. The CACES, a certificate of fitness to operate safely, is the most widespread way to prove that training: the French Health Insurance describes it in recommendation R489 for ride-on trucks, and most forklift driver job ads ask for it. A warehouse forklift driver most often takes category 3, counterbalance truck up to 6 tonnes, sometimes with category 5, reach truck. The R489 CACES is valid for ${h.years('r489')} years. As of ${h.cpfDate}, the median price of an initial category 3 course is ${h.med('r489', '3')} in the Mon Compte Formation catalogue. The tool above starts from the actual machine to give the right category, which avoids paying for a course that does not cover the truck of the job you want.`,
    faqs: (h) => [
      { q: 'Is the CACES compulsory to work as a forklift driver?', a: 'The Labour Code does not require the CACES as such: it requires adequate training and an operating authorisation from the employer. But the French Health Insurance recommendation makes the CACES the reference way to check that training, and almost every employer and temp agency asks for it.' },
      { q: 'Which CACES category should I take for a first forklift job?', a: 'Category 3, counterbalance truck up to 6 tonnes, is the most requested. Add category 5 if the warehouse has high racking served by reach trucks, and 1A or 1B for order picking. Read the job ad: it usually names the categories expected.' },
      { q: 'Does the forklift CACES let me drive for any employer?', a: 'No. Each employer issues its own operating authorisation, after checking your medical fitness and your knowledge of the premises, the instructions and the site’s machines. The CACES proves the training; the authorisation gives the right to drive on that particular site.' },
      { q: 'How long does a forklift CACES last?', a: `It is valid for ${h.years('r489')} years from the date the later of the two tests, theory or practical, was passed. At the end, both tests must be taken again; a shorter refresher course prepares for them. The median category 3 refresher in the catalogue lasts ${h.hrs('r489', '3', 'rec')}.` },
    ],
    body: (h) => `
<h2>The three conditions to drive a forklift</h2>
${h.table(['Condition', 'Who meets it', 'Text'], [['Adequate training, proved in practice by the CACES', 'The employee, with a certified testing body', `Labour Code ${h.src('ct55', 'article R4323-55')}; recommendation R.489`], ['Medical fitness, certified every 5 years', 'The occupational physician', `Labour Code ${h.src('ct56', 'article R4323-56')}`], ['Knowledge of the site and instructions', 'The employer', 'Labour Code article R4323-56']], 'The three items the employer checks before the operating authorisation.', ['l', 'l', 'l'])}
<p>The CACES follows the driver from one employer to the next; the authorisation does not. A temp worker gets an authorisation from the user company for each assignment. The ${h.a('autorisation-de-conduite', 'operating authorisation page')} explains this split.</p>
<h2>The categories that matter to a forklift driver</h2>
${h.table(['Machine', 'Category', 'Median initial price', 'Median length'], [['Ride-on pallet truck or order picker', '1A', h.med('r489', '1A'), h.hrs('r489', '1A')], ['Ride-on stacker', '1B', h.med('r489', '1B'), h.hrs('r489', '1B')], ['Counterbalance truck up to 6 t', '3', h.med('r489', '3'), h.hrs('r489', '3')], ['Counterbalance truck above 6 t', '4', h.med('r489', '4'), h.hrs('r489', '4')], ['Reach truck', '5', h.med('r489', '5'), h.hrs('r489', '5')]], `Recommendation R.489A; Mon Compte Formation offers on ${h.cpfDate}.`, ['l', 'l', 'r', 'r'])}
<!--tool:mini:validite-->
<h2>Preparing for the theory test</h2>
<p>The theory test is the same for every R489 category: ${h.P.test.questions} questions, passed with ${h.P.test.passScore} points and at least half of each theme. The ${h.a('examen-blanc', 'mock exam')} reproduces it, and the ${h.a('caces-3', 'CACES 3')} and ${h.a('caces-5', 'CACES 5')} pages offer targeted sets.</p>`,
  },
});
