import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'financement',
  group: 'pratique',
  order: 30,
  tool: { kind: 'cost', props: { reco: 'r489', cat: '3', status: 'salarie' } },
  mini: { kind: 'mini:cpf' },
  related: ['caces-prix', 'caces-france-travail', 'formation-caces', 'recyclage-caces', 'autorisation-de-conduite'],
  sources: ['sp_cpf', 'sp_participation', 'ft_aif', 'cdc_catalogue'],
  fr: {
    slug: 'financement-caces',
    nav: 'Financer son CACES : CPF, OPCO',
    card: 'CPF, plafond de 1 500 €, participation de 150 €, employeur, OPCO, France Travail : qui paie quoi.',
    title: 'Financement du CACES : CPF, employeur, OPCO, reste à charge',
    description: 'Financer son CACES : plafond CPF de 1 500 €, participation de 150 €, prise en charge par l’employeur, l’OPCO ou France Travail, et calcul du reste à payer.',
    h1: 'Financer son CACES : CPF, employeur, OPCO et France Travail',
    intro: 'Entrez le prix de la formation, vos droits CPF et votre situation : l’outil calcule ce que paie le CPF, la participation forfaitaire et le reste à payer.',
    resume: (h) => `Le CACES peut se financer de quatre façons, qui se combinent. Le compte personnel de formation, d’abord : le CACES est une certification du Répertoire spécifique, et depuis le ${h.date(h.P.cpf.rsCapSince)} le CPF ne prend en charge que ${h.eur(h.P.cpf.rsCap)} au plus pour ce type de certification. Pour toute demande faite depuis le ${h.date(h.P.cpf.participationSince)}, une participation forfaitaire de ${h.eur(h.P.cpf.participation)} reste à la charge du titulaire, sauf s’il est demandeur d’emploi ou si son employeur abonde le compte. L’employeur, ensuite, finance souvent lui-même le CACES de ses salariés, puisqu’il doit leur assurer une formation adéquate avant de les autoriser à conduire ; une entreprise de moins de 50 salariés peut se faire aider par son opérateur de compétences, l’OPCO. France Travail, enfin, peut compléter le financement d’un demandeur d’emploi par l’aide individuelle à la formation. Au ${h.cpfDate}, le prix médian d’un CACES R489 catégorie 3 est de ${h.med('r489', '3')} au catalogue Mon Compte Formation.`,
    faqs: (h) => [
      { q: 'Pourquoi mon CPF ne paie-t-il que 1 500 € pour un CACES ?', a: `Depuis le ${h.date(h.P.cpf.rsCapSince)}, la prise en charge par le CPF est plafonnée à ${h.eur(h.P.cpf.rsCap)} pour les certifications inscrites au Répertoire spécifique, dont le CACES fait partie. Au-delà, le complément vient de vous, de l’employeur ou d’un autre financeur. Pour un CACES de chariot, dont le prix médian est inférieur, le plafond joue rarement.` },
      { q: 'Qui ne paie pas la participation forfaitaire de 150 € ?', a: 'Les demandeurs d’emploi, et les titulaires dont l’employeur abonde le compte pour cette formation, en sont dispensés. Il en va de même quand le compte est abondé au titre du compte professionnel de prévention ou après un accident du travail ou une maladie professionnelle. Les autres titulaires la paient au moment de valider la demande.' },
      { q: 'L’employeur doit-il payer le CACES ?', a: 'L’employeur doit former le salarié qu’il autorise à conduire : quand il exige le CACES pour délivrer l’autorisation, il le finance en général, sur son plan de développement des compétences. Le salarié n’a pas à utiliser son CPF pour une formation que l’employeur impose pour son poste, sauf accord de sa part.' },
      { q: 'Combien de droits CPF ai-je accumulés ?', a: `Un salarié à mi-temps ou plus acquiert ${h.eur(h.P.cpf.annualCredit)} par an, dans la limite de ${h.eur(h.P.cpf.ceiling)}. Sans diplôme de niveau CAP, c’est ${h.eur(h.P.cpf.annualCreditLowQualified)} par an et ${h.eur(h.P.cpf.ceilingLowQualified)} au plus. Le mini-outil de cette page donne une estimation ; le solde exact se lit sur le site Mon Compte Formation.` },
      { q: 'La participation forfaitaire va-t-elle encore augmenter ?', a: `Elle est passée de ${h.eur(h.P.cpf.participation2024)} en 2024 à ${h.eur(h.P.cpf.participationJan2026, 2)} au 1er janvier 2026, puis à ${h.eur(h.P.cpf.participation)} depuis le ${h.date(h.P.cpf.participationSince)}. Le projet de loi de finances pour 2027 prévoit de la relever encore ; tant que le texte n’est pas voté, ce site garde le montant en vigueur.` },
    ],
    body: (h) => `
<h2>Qui paie quoi</h2>
${h.table(['Financeur', 'Pour qui', 'Ce qu’il couvre', 'Texte'], [['CPF', 'Tout actif', `Jusqu’à ${h.eur(h.P.cpf.rsCap)} pour un CACES, moins la participation de ${h.eur(h.P.cpf.participation)}`, h.src('sp_cpf', 'service-public.gouv.fr')], ['Employeur', 'Salarié', 'Tout ou partie, sur le plan de développement des compétences, ou par abondement du CPF', 'Code du travail'], ['OPCO', 'Entreprise de moins de 50 salariés', 'Aide au plan de développement des compétences, selon les règles de chaque OPCO', 'Code du travail'], ['France Travail (AIF)', 'Demandeur d’emploi inscrit', 'Frais pédagogiques non couverts par un autre financeur', h.src('ft_aif', 'francetravail.fr')]], 'Règles vérifiées le ' + h.retrieved + '.', ['l', 'l', 'l', 'l'])}
<h2>Trois exemples chiffrés</h2>
<p>Pour une formation à ${h.eur(1000)} et ${h.eur(1200)} de droits : un salarié paie la participation de ${h.eur(h.P.cpf.participation)}, le CPF paie ${h.eur(1000 - h.P.cpf.participation)}. Un demandeur d’emploi ne paie rien, le CPF paie ${h.eur(1000)}. Pour une formation à ${h.eur(2000)} avec ${h.eur(3000)} de droits, le CPF s’arrête à ${h.eur(h.P.cpf.rsCap)} : il reste ${h.eur(2000 - h.P.cpf.rsCap)} à financer, participation comprise.</p>
<!--tool:mini:droits-->
<h2>Les démarches</h2>
<ol>
<li>Choisir la catégorie avec ${h.a('quel-caces', 'quel CACES pour quel engin')}, puis une offre sur le site Mon Compte Formation.</li>
<li>Envoyer la demande d’inscription, que l’organisme accepte ou refuse.</li>
<li>Valider la demande en payant la participation si elle s’applique, et le reste éventuel.</li>
</ol>
<p>Ce site ne recommande aucun organisme et ne reçoit aucune commission. Les prix médians sont sur la page ${h.a('caces-prix', 'prix du CACES')}.</p>`,
  },
  en: {
    slug: 'caces-funding',
    nav: 'Funding a CACES: CPF, OPCO',
    card: 'CPF, the €1,500 cap, the €150 contribution, employer, OPCO, France Travail: who pays what.',
    title: 'CACES funding: CPF, employer, OPCO and what is left to pay',
    description: 'Funding a CACES: the €1,500 CPF cap, the €150 flat contribution, support from the employer, the OPCO or France Travail, and what is left for you to pay.',
    h1: 'Funding a CACES: CPF, employer, OPCO and France Travail',
    intro: 'Enter the course price, your CPF balance and your situation: the tool works out what the CPF pays, the flat contribution and what is left to pay.',
    resume: (h) => `A CACES can be funded in four ways, which can be combined. First, the personal training account (CPF): the CACES is a Répertoire spécifique certification, and since ${h.date(h.P.cpf.rsCapSince)} the CPF covers at most ${h.eur(h.P.cpf.rsCap)} for that type of certification. For any request made since ${h.date(h.P.cpf.participationSince)}, a flat contribution of ${h.eur(h.P.cpf.participation)} is left for the account holder to pay, unless they are a jobseeker or their employer tops up the account. Second, the employer often pays for its employees’ CACES itself, since it must give them adequate training before authorising them to operate; a company with fewer than 50 staff can get help from its skills operator, the OPCO. Third, France Travail can top up a jobseeker’s funding with the individual training grant. As of ${h.cpfDate}, the median price of an R489 category 3 CACES is ${h.med('r489', '3')} in the Mon Compte Formation catalogue.`,
    faqs: (h) => [
      { q: 'Why does my CPF only pay €1,500 for a CACES?', a: `Since ${h.date(h.P.cpf.rsCapSince)}, CPF funding is capped at ${h.eur(h.P.cpf.rsCap)} for certifications listed in the Répertoire spécifique, which includes the CACES. Beyond that, the balance comes from you, the employer or another funder. For a forklift CACES, whose median price is lower, the cap rarely applies.` },
      { q: 'Who does not pay the €150 flat contribution?', a: 'Jobseekers, and holders whose employer tops up the account for that course, are exempt. The same applies when the account is topped up under the occupational prevention account or after a workplace accident or occupational disease. Other holders pay it when confirming the request.' },
      { q: 'Must the employer pay for the CACES?', a: 'The employer must train the employee it authorises to operate: when it requires the CACES before issuing the authorisation, it usually pays for it from its skills development plan. The employee does not have to use their CPF for training the employer imposes for the job, unless they agree.' },
      { q: 'How much CPF credit have I built up?', a: `An employee working at least half-time earns ${h.eur(h.P.cpf.annualCredit)} a year, up to ${h.eur(h.P.cpf.ceiling)}. Without a CAP-level qualification, it is ${h.eur(h.P.cpf.annualCreditLowQualified)} a year and ${h.eur(h.P.cpf.ceilingLowQualified)} at most. The small tool on this page gives an estimate; the exact balance is on the Mon Compte Formation website.` },
      { q: 'Will the flat contribution rise again?', a: `It went from ${h.eur(h.P.cpf.participation2024)} in 2024 to ${h.eur(h.P.cpf.participationJan2026, 2)} on 1 January 2026, then to ${h.eur(h.P.cpf.participation)} since ${h.date(h.P.cpf.participationSince)}. The 2027 finance bill plans to raise it further; until the text is passed, this site keeps the amount in force.` },
    ],
    body: (h) => `
<h2>Who pays what</h2>
${h.table(['Funder', 'For whom', 'What it covers', 'Text'], [['CPF', 'Anyone in work or seeking work', `Up to ${h.eur(h.P.cpf.rsCap)} for a CACES, minus the ${h.eur(h.P.cpf.participation)} contribution`, h.src('sp_cpf', 'service-public.gouv.fr')], ['Employer', 'Employee', 'All or part, from the skills development plan, or by topping up the CPF', 'Labour Code'], ['OPCO', 'Company with fewer than 50 staff', 'Help with the skills development plan, under each OPCO’s rules', 'Labour Code'], ['France Travail (AIF)', 'Registered jobseeker', 'Course fees not covered by another funder', h.src('ft_aif', 'francetravail.fr')]], 'Rules checked on ' + h.retrieved + '.', ['l', 'l', 'l', 'l'])}
<h2>Three worked examples</h2>
<p>For a ${h.eur(1000)} course and ${h.eur(1200)} of rights: an employee pays the ${h.eur(h.P.cpf.participation)} contribution and the CPF pays ${h.eur(1000 - h.P.cpf.participation)}. A jobseeker pays nothing; the CPF pays ${h.eur(1000)}. For a ${h.eur(2000)} course with ${h.eur(3000)} of rights, the CPF stops at ${h.eur(h.P.cpf.rsCap)}: ${h.eur(2000 - h.P.cpf.rsCap)} remains to be funded, contribution included.</p>
<!--tool:mini:droits-->
<h2>The steps</h2>
<ol>
<li>Choose the category with ${h.a('quel-caces', 'which CACES for which machine')}, then an offer on the Mon Compte Formation website.</li>
<li>Send the registration request, which the provider accepts or declines.</li>
<li>Confirm the request by paying the contribution where it applies, and any balance.</li>
</ol>
<p>This site recommends no provider and receives no commission. Median prices are on the ${h.a('caces-prix', 'CACES price page')}.</p>`,
  },
});
