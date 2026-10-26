import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-france-travail',
  group: 'pratique',
  order: 35,
  tool: { kind: 'cost', props: { reco: 'r489', cat: '3', status: 'chomeur' } },
  mini: { kind: 'mini:droits' },
  related: ['financement', 'caces-prix', 'quel-caces', 'caces-chariot-elevateur', 'formation-caces'],
  sources: ['ft_aif', 'sp_cpf', 'sp_participation', 'cdc_catalogue'],
  fr: {
    slug: 'caces-france-travail',
    nav: 'CACES avec France Travail',
    card: 'Demandeur d’emploi : CPF sans participation, aide individuelle à la formation, et ce qui reste à payer.',
    title: 'CACES France Travail : financer son CACES au chômage',
    description: 'CACES et France Travail : sans participation forfaitaire pour un demandeur d’emploi, CPF complété par l’aide individuelle à la formation, reste à payer calculé.',
    h1: 'CACES avec France Travail : le financement d’un demandeur d’emploi',
    intro: 'Le simulateur part du statut de demandeur d’emploi : pas de participation forfaitaire. Entrez le prix de l’offre et vos droits pour voir ce qui reste à financer.',
    resume: (h) => `Un demandeur d’emploi inscrit à France Travail qui veut passer un CACES a deux atouts. Il est dispensé de la participation forfaitaire de ${h.eur(h.P.cpf.participation)} qui s’applique aux autres titulaires du compte personnel de formation : le CPF peut donc couvrir tout le prix de la formation, dans la limite de ses droits et du plafond de ${h.eur(h.P.cpf.rsCap)} fixé pour les certifications du Répertoire spécifique. Et si ses droits ne suffisent pas, France Travail peut compléter par l’aide individuelle à la formation, l’AIF, qui prend en charge les frais pédagogiques qu’aucun autre financeur ne couvre, lorsque la formation sert un projet de retour à l’emploi validé avec son conseiller. Pour un complément demandé via Mon Compte Formation, France Travail indique répondre sous ${h.P.cpf.ftReplyDays} jours. Au ${h.cpfDate}, un CACES R489 catégorie 3 coûte ${h.med('r489', '3')} en valeur médiane au catalogue : deux années de droits acquis comme salarié à mi-temps ou plus suffisent à le couvrir.`,
    faqs: (h) => [
      { q: 'France Travail paie-t-il le CACES en entier ?', a: 'Pas systématiquement. France Travail intervient en complément, quand le CPF et les autres financeurs ne couvrent pas tout le prix, et quand la formation correspond au projet professionnel validé avec le conseiller, par exemple un métier de cariste qui recrute dans le bassin d’emploi. Aucun montant fixe n’est publié : la décision se prend dossier par dossier.' },
      { q: 'Faut-il passer par son conseiller France Travail ?', a: 'Pour l’aide individuelle à la formation, oui : c’est le conseiller qui valide le projet. Pour utiliser seulement son CPF, non, la demande se fait directement sur le site Mon Compte Formation ; le statut de demandeur d’emploi y est reconnu et la participation forfaitaire n’est pas demandée.' },
      { q: 'Un intérimaire peut-il faire financer son CACES ?', a: 'Un intérimaire en mission est salarié de l’agence d’emploi : il utilise son CPF comme tout salarié, et paie alors la participation forfaitaire sauf abondement. Les agences d’emploi financent aussi parfois des CACES pour les intérimaires qu’elles placent, sur leurs propres fonds de formation. Entre deux missions, s’il est inscrit comme demandeur d’emploi, il bénéficie de la dispense.' },
      { q: 'Combien de temps faut-il pour obtenir le financement ?', a: `L’organisme dispose d’un délai pour accepter la demande sur Mon Compte Formation, puis France Travail indique répondre sous ${h.P.cpf.ftReplyDays} jours à une demande de complément. Comptez donc quelques semaines entre le choix de l’offre et l’entrée en formation, davantage si la session est complète.` },
    ],
    body: (h) => `
<h2>Salarié ou demandeur d’emploi : la différence chiffrée</h2>
${h.table(['', 'Salarié', 'Demandeur d’emploi'], [['Prix de la formation', h.eur(900), h.eur(900)], ['Droits CPF', h.eur(1500), h.eur(1500)], ['Participation forfaitaire', h.eur(h.P.cpf.participation), h.eur(0)], ['Payé par le CPF', h.eur(900 - h.P.cpf.participation), h.eur(900)], ['Reste à payer', h.eur(h.P.cpf.participation), h.eur(0)]], `Règles du CPF en vigueur au ${h.retrieved} (service-public.gouv.fr).`, ['l', 'r', 'r'])}
<p>Avec des droits insuffisants, le reste à financer est le même pour les deux, moins la participation pour le demandeur d’emploi : c’est ce reste que l’AIF de France Travail peut prendre en charge.</p>
<!--tool:mini:cpf-->
<h2>Avant de demander un financement</h2>
<ul>
<li>Choisir la bonne catégorie avec ${h.a('quel-caces', 'quel CACES pour quel engin')} : les offres d’emploi de cariste demandent le plus souvent la R489 catégorie 3.</li>
<li>Vérifier l’aptitude médicale : sans attestation, l’employeur ne pourra pas délivrer l’autorisation de conduite.</li>
<li>S’entraîner au ${h.a('examen-blanc', 'test théorique')} avant la formation, pour arriver avec les bases.</li>
</ul>
<h2>Après la formation</h2>
<p>Le CACES obtenu appartient au candidat : il le présente à chaque employeur ou agence, qui délivre ensuite sa propre autorisation de conduite. Gardez une copie du certificat et notez sa date de fin, puisqu’il faudra repasser les tests à l’échéance. Un CACES obtenu pendant une période de chômage vaut exactement autant qu’un CACES payé par un employeur : rien n’y indique le financeur.</p>
<p>Le détail des règles du CPF est sur la page ${h.a('financement', 'financement')}.</p>`,
  },
  en: {
    slug: 'caces-france-travail',
    nav: 'CACES with France Travail',
    card: 'Jobseekers: CPF with no contribution, the individual training grant, and what is left to pay.',
    title: 'CACES and France Travail: funding a CACES while jobless',
    description: 'CACES and France Travail: no flat contribution for jobseekers, CPF rights topped up by the individual training grant (AIF), and what is left for you to pay.',
    h1: 'CACES with France Travail: funding for jobseekers',
    intro: 'The simulator starts from jobseeker status: no flat contribution. Enter the offer price and your rights to see what remains to be funded.',
    resume: (h) => `A jobseeker registered with France Travail, the French public employment service, who wants to take a CACES has two advantages. They are exempt from the ${h.eur(h.P.cpf.participation)} flat contribution other personal training account holders pay: the CPF can therefore cover the whole course price, within their rights and the ${h.eur(h.P.cpf.rsCap)} cap set for Répertoire spécifique certifications. And if their rights fall short, France Travail can top up with the individual training grant, the AIF, which covers course fees no other funder pays, when the course serves a return-to-work plan agreed with their adviser. For a top-up requested through Mon Compte Formation, France Travail says it replies within ${h.P.cpf.ftReplyDays} days. As of ${h.cpfDate}, an R489 category 3 CACES costs a median of ${h.med('r489', '3')} in the catalogue: two years of rights earned as an employee working at least half-time are enough to cover it.`,
    faqs: (h) => [
      { q: 'Does France Travail pay for the whole CACES?', a: 'Not automatically. France Travail steps in as a top-up, when the CPF and other funders do not cover the whole price, and when the course fits the career plan agreed with the adviser, for example a forklift job in demand locally. No fixed amount is published: each case is decided on its own file.' },
      { q: 'Do I have to go through my France Travail adviser?', a: 'For the individual training grant, yes: the adviser approves the plan. To use only your CPF, no: the request is made directly on the Mon Compte Formation website, where jobseeker status is recognised and the flat contribution is not charged.' },
      { q: 'Can a temp worker get a CACES funded?', a: 'A temp worker on assignment is employed by the agency: they use their CPF like any employee and then pay the flat contribution unless it is topped up. Agencies also sometimes pay for CACES for the workers they place, from their own training budgets. Between assignments, if registered as a jobseeker, the exemption applies.' },
      { q: 'How long does it take to get funding?', a: `The provider has a deadline to accept the request on Mon Compte Formation, then France Travail says it replies to a top-up request within ${h.P.cpf.ftReplyDays} days. Allow a few weeks between choosing the offer and starting the course, more if the session is full.` },
    ],
    body: (h) => `
<h2>Employee or jobseeker: the difference in figures</h2>
${h.table(['', 'Employee', 'Jobseeker'], [['Course price', h.eur(900), h.eur(900)], ['CPF rights', h.eur(1500), h.eur(1500)], ['Flat contribution', h.eur(h.P.cpf.participation), h.eur(0)], ['Paid by the CPF', h.eur(900 - h.P.cpf.participation), h.eur(900)], ['Left to pay', h.eur(h.P.cpf.participation), h.eur(0)]], `CPF rules in force on ${h.retrieved} (service-public.gouv.fr).`, ['l', 'r', 'r'])}
<p>With insufficient rights, the amount left to fund is the same for both, minus the contribution for the jobseeker: that remainder is what the France Travail AIF can cover.</p>
<!--tool:mini:cpf-->
<h2>Before asking for funding</h2>
<ul>
<li>Choose the right category with ${h.a('quel-caces', 'which CACES for which machine')}: forklift job ads most often ask for R489 category 3.</li>
<li>Check medical fitness: without a certificate, the employer cannot issue the operating authorisation.</li>
<li>Practise the ${h.a('examen-blanc', 'theory test')} before the course, to arrive with the basics.</li>
</ul>
<h2>After the course</h2>
<p>The CACES belongs to the candidate: they show it to each employer or agency, which then issues its own operating authorisation. Keep a copy of the certificate and note its end date, since the tests must be taken again when it expires. A CACES obtained while out of work is worth exactly as much as one paid for by an employer: nothing on it shows who funded it.</p>
<p>The CPF rules in detail are on the ${h.a('financement', 'funding page')}.</p>`,
  },
});
