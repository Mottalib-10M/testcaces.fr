import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'autorisation-de-conduite',
  group: 'pratique',
  order: 50,
  tool: { kind: 'mini:autorisation' },
  mini: { kind: 'mini:validite' },
  related: ['duree-validite', 'caces-chariot-elevateur', 'securite-risques', 'quel-caces', 'formation-caces'],
  sources: ['ct55', 'ct56', 'arrete2025', 'r489', 'r482'],
  fr: {
    slug: 'autorisation-de-conduite',
    nav: 'Autorisation de conduite ou CACES',
    card: 'CACES et autorisation de conduite ne sont pas la même chose : qui délivre quoi, sur quelles bases, pour combien de temps.',
    title: 'Autorisation de conduite et CACES : ce que dit le Code',
    description: 'Autorisation de conduite ou CACES : ce qu’exige le Code du travail, le rôle de l’employeur, l’attestation médicale de 5 ans et la connaissance du site.',
    h1: 'Autorisation de conduite et CACES : deux documents différents',
    intro: 'Indiquez l’âge de votre CACES et de votre attestation médicale : l’outil dit si l’employeur peut vous autoriser à conduire en l’état.',
    resume: (h) => `Le CACES et l’autorisation de conduite sont souvent confondus, mais ils ne viennent pas de la même personne et ne disent pas la même chose. Le CACES est un certificat délivré par un organisme testeur certifié : il atteste que le titulaire a réussi les tests d’une recommandation de l’Assurance Maladie, pour une catégorie d’engins, pendant ${h.years('r489')} ans, ou ${h.years('r482')} ans en R482. L’autorisation de conduite est un document de l’employeur, exigé par l’article R4323-56 du Code du travail pour conduire certains équipements mobiles automoteurs et de levage. L’employeur la délivre après une évaluation qui tient compte de trois éléments : une attestation d’absence de contre-indications médicales de moins de ${h.P.medical.attestationYears} ans, une vérification de ce que le conducteur sait et sait faire, que le CACES permet de faire, et la connaissance des lieux et des consignes du site. Le CACES suit le salarié d’un employeur à l’autre ; l’autorisation, elle, ne vaut que chez l’employeur qui l’a signée.`,
    faqs: (h) => [
      { q: 'Le CACES remplace-t-il l’autorisation de conduite ?', a: 'Non. Même avec un CACES valable, un salarié ne peut conduire que si son employeur lui a délivré une autorisation écrite. Le CACES sert à l’employeur de preuve que ce que le conducteur sait et sait faire a bien été vérifié ; il ne dispense ni de l’attestation médicale ni de la formation aux règles du site.' },
      { q: 'L’employeur peut-il autoriser un salarié sans CACES ?', a: 'Le Code du travail exige une formation adéquate et une évaluation, pas le CACES lui-même. Un employeur peut donc évaluer un salarié par d’autres moyens. Les recommandations de l’Assurance Maladie font toutefois du CACES la méthode de référence pour les engins qu’elles couvrent, et la plupart des entreprises s’y tiennent.' },
      { q: 'Qui délivre l’autorisation à un intérimaire ?', a: 'L’entreprise utilisatrice, chez qui l’intérimaire conduit. L’agence d’emploi vérifie en amont le CACES et la situation médicale ; l’entreprise utilisatrice forme le salarié aux lieux, aux engins et aux consignes du site, puis signe l’autorisation. Une nouvelle mission dans une autre entreprise demande une nouvelle autorisation.' },
      { q: 'Combien de temps vaut une autorisation de conduite ?', a: `Aucune durée fixe n’est imposée, mais elle ne tient que tant que ses bases tiennent : un CACES expiré ou une attestation médicale de plus de ${h.P.medical.attestationYears} ans oblige l’employeur à la revoir. Un changement de site ou d’engin peut aussi demander une nouvelle évaluation et une nouvelle autorisation.` },
    ],
    body: (h) => `
<h2>CACES et autorisation, côte à côte</h2>
${h.table(['', 'CACES', 'Autorisation de conduite'], [['Délivré par', 'Un organisme testeur certifié', 'L’employeur'], ['Base', 'Tests d’une recommandation de l’Assurance Maladie', h.src('ct56', 'Article R4323-56') + ' du Code du travail'], ['Durée', `${h.years('r489')} ans, ${h.years('r482')} ans en R482`, 'Tant que ses bases sont valables'], ['Suit le salarié', 'Oui, d’un employeur à l’autre', 'Non, propre à l’employeur'], ['Obligatoire', 'Non, mais méthode de référence', 'Oui, pour les engins visés']], 'Code du travail et recommandations R.489A à R.490A.', ['l', 'l', 'l'])}
<h2>Les trois éléments de l’évaluation</h2>
<ol>
<li><strong>L’attestation médicale</strong> : depuis le 1er octobre 2025, une attestation d’absence de contre-indications médicales, délivrée par le service de santé au travail et valable ${h.P.medical.attestationYears} ans.</li>
<li><strong>Les connaissances et le savoir-faire</strong> : le CACES en est la preuve habituelle, en application de l’${h.src('ct55', 'article R4323-55')} sur la formation des conducteurs.</li>
<li><strong>La connaissance du site</strong> : plan de circulation, zones interdites, consignes, engins réellement utilisés.</li>
</ol>
<h2>Ce que le test théorique en retient</h2>
<p>Le rôle de l’autorisation de conduite fait partie des connaissances générales évaluées dans toutes les recommandations : une ou deux questions de l’${h.a('examen-blanc', 'examen blanc')} portent dessus. Les autres acteurs, inspection du travail, service de santé au travail, caisse régionale, sont traités sur la page ${h.a('securite-risques', 'sécurité et risques')}.</p>`,
  },
  en: {
    slug: 'operating-authorisation',
    nav: 'Operating authorisation vs CACES',
    card: 'The CACES and the operating authorisation are not the same: who issues what, on what basis, for how long.',
    title: 'Operating authorisation and CACES: what French law says',
    description: 'Operating authorisation or CACES: what the French Labour Code requires, the employer’s role, the 5-year medical certificate and knowledge of the site.',
    h1: 'Operating authorisation and CACES: two different documents',
    intro: 'Enter the age of your CACES and of your medical certificate: the tool says whether the employer can authorise you to operate as things stand.',
    resume: (h) => `The CACES and the operating authorisation are often confused, but they come from different people and say different things. The CACES is a certificate issued by a certified testing body: it shows the holder passed the tests of a French Health Insurance recommendation, for one category of machines, for ${h.years('r489')} years, or ${h.years('r482')} years under R482. The operating authorisation is an employer’s document, required by article R4323-56 of the Labour Code to operate certain self-propelled mobile and lifting equipment. The employer issues it after an assessment that takes three things into account: a certificate of no medical contraindication less than ${h.P.medical.attestationYears} years old, a check of the operator’s knowledge and skills, which the CACES provides, and knowledge of the site’s premises and instructions. The CACES follows the employee from one employer to the next; the authorisation is only valid with the employer who signed it.`,
    faqs: (h) => [
      { q: 'Does the CACES replace the operating authorisation?', a: 'No. Even with a valid CACES, an employee can only operate if the employer has issued a written authorisation. The CACES gives the employer proof that knowledge and skills were checked; it does not replace the medical certificate or training on the site’s rules.' },
      { q: 'Can an employer authorise an employee without a CACES?', a: 'The Labour Code requires adequate training and an assessment, not the CACES itself. An employer can therefore assess an employee by other means. The French Health Insurance recommendations nonetheless make the CACES the reference method for the machines they cover, and most companies stick to it.' },
      { q: 'Who issues the authorisation to a temp worker?', a: 'The user company, where the temp worker operates. The agency checks the CACES and the medical position beforehand; the user company trains the worker on the premises, machines and site instructions, then signs the authorisation. A new assignment in another company needs a new authorisation.' },
      { q: 'How long is an operating authorisation valid?', a: `No fixed period is imposed, but it only holds as long as its basis holds: an expired CACES or a medical certificate over ${h.P.medical.attestationYears} years old means the employer must review it. A change of site or machine may also call for a new assessment and a new authorisation.` },
    ],
    body: (h) => `
<h2>CACES and authorisation side by side</h2>
${h.table(['', 'CACES', 'Operating authorisation'], [['Issued by', 'A certified testing body', 'The employer'], ['Basis', 'Tests of a French Health Insurance recommendation', 'Labour Code ' + h.src('ct56', 'article R4323-56')], ['Duration', `${h.years('r489')} years, ${h.years('r482')} years under R482`, 'As long as its basis is valid'], ['Follows the employee', 'Yes, from one employer to the next', 'No, specific to the employer'], ['Compulsory', 'No, but the reference method', 'Yes, for the machines concerned']], 'Labour Code and recommendations R.489A to R.490A.', ['l', 'l', 'l'])}
<h2>The three parts of the assessment</h2>
<ol>
<li><strong>The medical certificate</strong>: since 1 October 2025, a certificate of no medical contraindication, issued by the occupational health service and valid for ${h.P.medical.attestationYears} years.</li>
<li><strong>Knowledge and skills</strong>: the CACES is the usual proof, under ${h.src('ct55', 'article R4323-55')} on operator training.</li>
<li><strong>Knowledge of the site</strong>: traffic plan, no-go areas, instructions, the machines actually used.</li>
</ol>
<h2>What the theory test takes from this</h2>
<p>The role of the operating authorisation is part of the general knowledge assessed in every recommendation: one or two questions in the ${h.a('examen-blanc', 'mock exam')} cover it. The other parties, labour inspectorate, occupational health service, regional health insurance fund, are covered on the ${h.a('securite-risques', 'safety and risks page')}.</p>`,
  },
});
