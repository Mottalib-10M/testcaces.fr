import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'caces-prix',
  group: 'pratique',
  order: 20,
  tool: { kind: 'cost', props: { reco: 'r489', cat: '3' } },
  mini: { kind: 'mini:droits' },
  related: ['financement', 'caces-france-travail', 'formation-caces', 'recyclage-caces', 'quel-caces'],
  sources: ['cdc_catalogue', 'sp_cpf', 'sp_participation'],
  fr: {
    slug: 'prix-caces',
    nav: 'Prix du CACES',
    card: 'Prix médian et fourchette de chaque catégorie, initial et recyclage, par région, d’après le catalogue CPF.',
    title: 'Prix du CACES : médiane par catégorie et par région',
    description: 'Prix du CACES par catégorie et par région : médiane et fourchette des offres du catalogue CPF, formation initiale ou recyclage, et reste à charge selon droits.',
    h1: 'Prix du CACES : ce que coûtent les formations, catégorie par catégorie',
    intro: 'Choisissez la recommandation, la catégorie et votre région : l’outil donne le prix médian des offres et ce qui reste à payer avec votre CPF.',
    resume: (h) => `Le prix d’un CACES n’est fixé par aucun texte : chaque organisme de formation fixe le sien. Pour donner un ordre de grandeur fiable, ce site lit le catalogue Mon Compte Formation publié en données ouvertes par la Caisse des Dépôts, garde les offres rattachées aux certifications CACES du Répertoire spécifique et calcule la médiane et la fourchette centrale des prix, séparément pour la formation initiale et le recyclage. Au ${h.cpfDate}, la catégorie la plus proposée, la R489 catégorie 3, a un prix médian de ${h.med('r489', '3')} sur ${h.num(h.offers('r489', '3'))} offres, pour ${h.hrs('r489', '3')} de formation. Les gerbeurs accompagnants R485 sont les moins chers, autour de ${h.med('r485', '1')}, et les engins de chantier R482 les plus chers, ${h.med('r482', 'A')} en catégorie A. Une offre peut regrouper plusieurs catégories : son prix est alors celui du stage entier, ce qui tire certaines médianes vers le haut. Les prix sont relus chaque semaine.`,
    faqs: (h) => [
      { q: 'Pourquoi les prix varient-ils autant d’un organisme à l’autre ?', a: 'La durée de formation n’est pas fixée par les recommandations : l’organisme l’adapte au niveau des candidats, d’une journée à plusieurs. Le prix dépend aussi du nombre de catégories du stage, de la location des engins, de la région et du financement visé. La fourchette centrale affichée par l’outil élimine les offres les plus extrêmes.' },
      { q: 'Le recyclage coûte-t-il moins cher ?', a: `Oui, en général, parce qu’il est plus court. En R489 catégorie 3, le recyclage médian coûte ${h.med('r489', '3', 'rec')} pour ${h.hrs('r489', '3', 'rec')} de formation, contre ${h.med('r489', '3')} pour une formation initiale. Les tests passés à la fin sont pourtant les mêmes : théorique et pratique.` },
      { q: 'Les prix incluent-ils le passage des tests ?', a: 'Les offres du catalogue Mon Compte Formation sont des formations certifiantes : le passage des tests théorique et pratique par un testeur certifié en fait partie. Vérifiez néanmoins sur la fiche de l’offre ce qui est compris, notamment en cas d’échec à un test et de nouveau passage.' },
      { q: 'D’où viennent ces prix ?', a: `Du catalogue des offres Mon Compte Formation, publié en données ouvertes par la Caisse des Dépôts sous Licence Ouverte, extrait au ${h.cpfDate}. Chaque offre est comptée une fois ; aucun nom d’organisme n’est gardé ni affiché. Un prix régional n’est donné qu’au-delà de huit offres dans la région.` },
    ],
    body: (h) => `
<h2>Les prix médians, recommandation par recommandation</h2>
${h.prices('r489')}
${h.prices('r485')}
${h.prices('r482')}
${h.prices('r486')}
${h.prices('r490')}
<p>La « moitié des offres » est l’intervalle entre le premier et le troisième quartile : un quart des offres coûte moins, un quart coûte plus. Quand une catégorie compte peu d’offres, comme les engins de forage ou les niveleuses la médiane devient fragile : le nombre d’offres est indiqué à côté.</p>
<!--tool:mini:cpf-->
<h2>Du prix affiché au reste à payer</h2>
<p>Avec le compte personnel de formation, le reste à payer dépend de vos droits, du plafond de ${h.eur(h.P.cpf.rsCap)} applicable aux certifications du Répertoire spécifique comme le CACES, et de la participation forfaitaire de ${h.eur(h.P.cpf.participation)}. La page ${h.a('financement', 'financement')} détaille ces règles ; la page ${h.a('caces-france-travail', 'CACES avec France Travail')} traite le cas des demandeurs d’emploi.</p>`,
  },
  en: {
    slug: 'caces-price',
    nav: 'CACES price',
    card: 'Median price and range for each category, initial and refresher, by region, from the CPF catalogue.',
    title: 'CACES price: median by category and by region in France',
    description: 'CACES price by category and region: median and range of CPF catalogue offers, initial course or refresher, and what is left to pay once your rights are used.',
    h1: 'CACES price: what courses cost, category by category',
    intro: 'Pick the recommendation, the category and your region: the tool gives the median offer price and what is left to pay with your CPF.',
    resume: (h) => `No text sets the price of a CACES: each training provider sets its own. To give a reliable order of magnitude, this site reads the Mon Compte Formation catalogue published as open data by the Caisse des Dépôts, keeps the offers linked to the CACES certifications of the Répertoire spécifique and computes the median and the middle range of prices, separately for initial courses and refreshers. As of ${h.cpfDate}, the most offered category, R489 category 3, has a median price of ${h.med('r489', '3')} across ${h.num(h.offers('r489', '3'))} offers, for ${h.hrs('r489', '3')} of training. R485 pedestrian stackers are the cheapest, around ${h.med('r485', '1')}, and R482 construction machinery the most expensive, ${h.med('r482', 'A')} for category A. One offer may bundle several categories: its price is then that of the whole course, which pushes some medians up. Prices are re-read every week.`,
    faqs: (h) => [
      { q: 'Why do prices vary so much between providers?', a: 'The recommendations do not set the course length: the provider adapts it to the candidates’ level, from a single day to several. Price also depends on the number of categories in the course, machine hire, the region and the funding targeted. The middle range shown by the tool leaves out the most extreme offers.' },
      { q: 'Is a refresher cheaper?', a: `Yes, usually, because it is shorter. For R489 category 3, the median refresher costs ${h.med('r489', '3', 'rec')} for ${h.hrs('r489', '3', 'rec')} of training, against ${h.med('r489', '3')} for an initial course. The tests taken at the end are the same, though: theory and practical, with the same marking scheme as the first time.` },
      { q: 'Do the prices include sitting the tests?', a: 'Mon Compte Formation catalogue offers are certifying courses: sitting the theory and practical tests with a certified tester is part of them. Still check on the offer page what is included, especially if you fail a test and need to sit it again, which some providers charge for separately.' },
      { q: 'Where do these prices come from?', a: `From the Mon Compte Formation offer catalogue, published as open data by the Caisse des Dépôts under the Licence Ouverte, extracted on ${h.cpfDate}. Each offer is counted once; no provider name is kept or shown. A regional price is only given above eight offers in the region.` },
    ],
    body: (h) => `
<h2>Median prices, recommendation by recommendation</h2>
${h.prices('r489')}
${h.prices('r485')}
${h.prices('r482')}
${h.prices('r486')}
${h.prices('r490')}
<p>The “middle half” is the range between the first and third quartiles: a quarter of offers cost less, a quarter cost more. When a category has few offers, such as drilling rigs or graders the median becomes fragile: the number of offers is shown next to it.</p>
<!--tool:mini:cpf-->
<h2>From the listed price to what you pay</h2>
<p>With the personal training account, what you pay depends on your rights, the ${h.eur(h.P.cpf.rsCap)} cap for Répertoire spécifique certifications such as the CACES, and the flat contribution of ${h.eur(h.P.cpf.participation)}. The ${h.a('financement', 'funding page')} details these rules; the ${h.a('caces-france-travail', 'CACES with France Travail page')} covers jobseekers.</p>`,
  },
});
