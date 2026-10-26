/**
 * « Quel CACES pour quel engin ? » : chaque engin courant, sa recommandation et sa catégorie, lus dans
 * l'annexe 1 de chaque recommandation (R.489A, R.485A, R.482B, R.486B, R.490A). `extra` : formation
 * complémentaire exigée en plus du CACES ; `none` : engin hors CACES (formation adaptée à l'engin).
 */
import type { Reco } from '../lib/engine/exam';
export type Famille = 'entrepot' | 'chantier' | 'hauteur' | 'levage';
export interface Engin {
  id: string; famille: Famille; fr: string; en: string;
  reco: Reco | null; cat: string | null;
  /** autres CACES qui autorisent aussi cet engin (dispense) */
  aussi?: string[];
  note?: { fr: string; en: string };
}
export const ENGINS: Engin[] = [
  { id: 'transpalette-porte', famille: 'entrepot', fr: 'Transpalette électrique à conducteur porté (debout ou assis)', en: 'Ride-on electric pallet truck (standing or seated)', reco: 'r489', cat: '1A', aussi: ['R489 1B'] },
  { id: 'preparateur-sol', famille: 'entrepot', fr: 'Préparateur de commandes au sol, levée jusqu’à 1,20 m', en: 'Low-level order picker, lift up to 1.20 m', reco: 'r489', cat: '1A', aussi: ['R489 1B'] },
  { id: 'preparateur-eleve-bas', famille: 'entrepot', fr: 'Préparateur de commandes à poste élevable, plancher jusqu’à 1,20 m', en: 'Order picker with raising platform, floor up to 1.20 m', reco: 'r489', cat: '1A', note: { fr: 'En plus du CACES 1A : formation complémentaire sur l’élévation de personnes (chute, instabilité).', en: 'On top of the 1A CACES: extra training on lifting people (falls, instability).' } },
  { id: 'gerbeur-porte', famille: 'entrepot', fr: 'Gerbeur à conducteur porté, levée de plus de 1,20 m', en: 'Ride-on stacker, lift above 1.20 m', reco: 'r489', cat: '1B' },
  { id: 'gerbeur-double', famille: 'entrepot', fr: 'Gerbeur à double fourche à conducteur porté', en: 'Ride-on double-deck stacker', reco: 'r489', cat: '1B', note: { fr: 'En plus du CACES 1B : formation complémentaire sur la lecture du tableau de charges.', en: 'On top of the 1B CACES: extra training on reading the load chart.' } },
  { id: 'plateau', famille: 'entrepot', fr: 'Chariot à plateau porteur, jusqu’à 2 tonnes', en: 'Platform truck, up to 2 tonnes', reco: 'r489', cat: '2A', aussi: ['R489 2B'] },
  { id: 'tracteur-industriel', famille: 'entrepot', fr: 'Tracteur industriel (remorques), traction jusqu’à 25 tonnes', en: 'Industrial tow tractor, up to 25 tonnes towed', reco: 'r489', cat: '2B' },
  { id: 'frontal-6', famille: 'entrepot', fr: 'Chariot élévateur frontal en porte-à-faux, jusqu’à 6 tonnes', en: 'Counterbalance forklift, up to 6 tonnes', reco: 'r489', cat: '3' },
  { id: 'frontal-plus6', famille: 'entrepot', fr: 'Chariot élévateur frontal en porte-à-faux, plus de 6 tonnes', en: 'Counterbalance forklift, above 6 tonnes', reco: 'r489', cat: '4' },
  { id: 'retractable', famille: 'entrepot', fr: 'Chariot à mât rétractable', en: 'Reach truck', reco: 'r489', cat: '5' },
  { id: 'prise-laterale', famille: 'entrepot', fr: 'Chariot à prise latérale, qui charge sur un côté', en: 'Single-side loader (side-loading truck)', reco: 'r489', cat: '5' },
  { id: 'tridirectionnel', famille: 'entrepot', fr: 'Chariot bi ou tri-directionnel, poste non élevable', en: 'Multi-directional or turret truck, fixed operator position', reco: 'r489', cat: '5', note: { fr: 'En plus du CACES 5 : formation complémentaire (allées étroites, équipement bi ou tri-directionnel).', en: 'On top of the cat. 5 CACES: extra training (narrow aisles, multi-directional equipment).' } },
  { id: 'poste-eleve', famille: 'entrepot', fr: 'Chariot à poste de conduite élevable, plancher au-dessus de 1,20 m', en: 'Truck with elevating operator position, floor above 1.20 m', reco: 'r489', cat: '6' },
  { id: 'combi', famille: 'entrepot', fr: 'Chariot « combi » (bi ou tri-directionnel à poste élevable)', en: '“Combi” truck (multi-directional with elevating cab)', reco: 'r489', cat: '6', note: { fr: 'En plus du CACES 6 : formation complémentaire (allées étroites, équipement bi ou tri-directionnel).', en: 'On top of the cat. 6 CACES: extra training (narrow aisles, multi-directional equipment).' } },
  { id: 'hors-production-chariot', famille: 'entrepot', fr: 'Déplacer, charger sur porte-engins ou essayer un chariot, sans production', en: 'Moving, loading onto a transporter or testing a truck, no production work', reco: 'r489', cat: '7' },
  { id: 'gerbeur-accomp-1', famille: 'entrepot', fr: 'Gerbeur à conducteur accompagnant, levée de 1,20 m à 2,50 m', en: 'Pedestrian stacker, lift from 1.20 m to 2.50 m', reco: 'r485', cat: '1', aussi: ['R485 2'] },
  { id: 'gerbeur-accomp-2', famille: 'entrepot', fr: 'Gerbeur à conducteur accompagnant, levée de plus de 2,50 m', en: 'Pedestrian stacker, lift above 2.50 m', reco: 'r485', cat: '2' },
  { id: 'transpalette-accomp', famille: 'entrepot', fr: 'Transpalette à conducteur accompagnant (timon), levée jusqu’à 1,20 m', en: 'Pedestrian pallet truck, lift up to 1.20 m', reco: null, cat: null, aussi: ['R485 1', 'R485 2'], note: { fr: 'Hors CACES : recommandation R.366 (formation et autorisation par l’employeur). Un CACES R.485 de catégorie 1 ou 2 permet aussi d’en autoriser la conduite.', en: 'No CACES: recommendation R.366 (training and employer authorisation). A cat. 1 or 2 R.485 CACES also allows the employer to authorise it.' } },
  { id: 'pelle-compacte', famille: 'chantier', fr: 'Mini-pelle ou pelle hydraulique jusqu’à 6 tonnes', en: 'Mini or hydraulic excavator up to 6 tonnes', reco: 'r482', cat: 'A' },
  { id: 'chargeuse-compacte', famille: 'chantier', fr: 'Chargeuse ou chargeuse-pelleteuse jusqu’à 6 tonnes', en: 'Loader or backhoe loader up to 6 tonnes', reco: 'r482', cat: 'A' },
  { id: 'dumper-compact', famille: 'chantier', fr: 'Moto-basculeur (dumper), charge utile jusqu’à 6 tonnes', en: 'Site dumper, payload up to 6 tonnes', reco: 'r482', cat: 'A' },
  { id: 'compacteur-compact', famille: 'chantier', fr: 'Compacteur jusqu’à 6 tonnes', en: 'Compactor up to 6 tonnes', reco: 'r482', cat: 'A' },
  { id: 'tracteur-agricole-petit', famille: 'chantier', fr: 'Tracteur agricole jusqu’à 100 ch (73,6 kW) sur chantier', en: 'Farm tractor up to 100 hp (73.6 kW) on a site', reco: 'r482', cat: 'A' },
  { id: 'pelle', famille: 'chantier', fr: 'Pelle hydraulique de plus de 6 tonnes, pelle multifonction', en: 'Hydraulic excavator above 6 tonnes, multi-purpose excavator', reco: 'r482', cat: 'B1' },
  { id: 'forage', famille: 'chantier', fr: 'Machine automotrice de sondage ou de forage', en: 'Self-propelled drilling or boring rig', reco: 'r482', cat: 'B2' },
  { id: 'rail-route', famille: 'chantier', fr: 'Pelle hydraulique rail-route', en: 'Road-rail excavator', reco: 'r482', cat: 'B3' },
  { id: 'chargeuse', famille: 'chantier', fr: 'Chargeuse sur pneus ou chargeuse-pelleteuse de plus de 6 tonnes', en: 'Wheel loader or backhoe loader above 6 tonnes', reco: 'r482', cat: 'C1' },
  { id: 'bouteur', famille: 'chantier', fr: 'Bouteur (bulldozer), chargeuse à chenilles de plus de 6 tonnes', en: 'Bulldozer, tracked loader above 6 tonnes', reco: 'r482', cat: 'C2' },
  { id: 'niveleuse', famille: 'chantier', fr: 'Niveleuse automotrice', en: 'Motor grader', reco: 'r482', cat: 'C3' },
  { id: 'compacteur', famille: 'chantier', fr: 'Compacteur de plus de 6 tonnes (cylindres, pneus, pieds dameurs)', en: 'Compactor above 6 tonnes (drum, pneumatic, padfoot)', reco: 'r482', cat: 'D' },
  { id: 'tombereau', famille: 'chantier', fr: 'Tombereau, dumper de plus de 6 tonnes, tracteur agricole de plus de 100 ch', en: 'Dump truck, dumper above 6 tonnes, farm tractor above 100 hp', reco: 'r482', cat: 'E' },
  { id: 'telescopique', famille: 'chantier', fr: 'Chariot télescopique ou chariot à mât tout-terrain', en: 'Telehandler or rough-terrain masted forklift', reco: 'r482', cat: 'F' },
  { id: 'hors-production-engin', famille: 'chantier', fr: 'Déplacer ou charger sur porte-engins un engin de chantier, sans production', en: 'Moving or loading construction machinery onto a transporter, no production work', reco: 'r482', cat: 'G' },
  { id: 'finisseur', famille: 'chantier', fr: 'Finisseur, raboteuse, trancheuse, pelle araignée', en: 'Paver, cold planer, trencher, walking excavator', reco: null, cat: null, note: { fr: 'Hors CACES R.482 : formation adaptée à l’engin, évaluée par l’employeur avant l’autorisation de conduite.', en: 'Outside the R.482 CACES: training specific to the machine, assessed by the employer before the operating authorisation.' } },
  { id: 'ciseaux', famille: 'hauteur', fr: 'Nacelle ciseaux, mât vertical (élévation verticale)', en: 'Scissor lift or vertical mast lift', reco: 'r486', cat: 'A' },
  { id: 'articulee', famille: 'hauteur', fr: 'Nacelle articulée ou télescopique (élévation multidirectionnelle)', en: 'Articulated or telescopic boom lift', reco: 'r486', cat: 'B' },
  { id: 'nacelle-camion', famille: 'hauteur', fr: 'Nacelle sur camion, déplacement depuis la cabine en position basse', en: 'Truck-mounted boom lift, driven from the cab when stowed', reco: 'r486', cat: 'B' },
  { id: 'hors-production-pemp', famille: 'hauteur', fr: 'Déplacer ou charger sur porte-engins une nacelle, sans production', en: 'Moving or loading a lift onto a transporter, no production work', reco: 'r486', cat: 'C' },
  { id: 'grue-chargement', famille: 'levage', fr: 'Grue de chargement sur camion (grue auxiliaire)', en: 'Lorry loader crane (truck-mounted crane)', reco: 'r490', cat: 'grue', note: { fr: 'Option télécommande en plus si la grue se conduit avec un boîtier déporté.', en: 'Add the remote-control option if the crane is driven from a remote control box.' } },
  { id: 'grue-mobile', famille: 'levage', fr: 'Grue mobile automotrice', en: 'Self-propelled mobile crane', reco: null, cat: null, note: { fr: 'CACES R.483 (grues mobiles), hors du périmètre de ce site.', en: 'R.483 CACES (mobile cranes), outside this site’s scope.' } },
  { id: 'grue-tour', famille: 'levage', fr: 'Grue à tour', en: 'Tower crane', reco: null, cat: null, note: { fr: 'CACES R.487 (grues à tour), hors du périmètre de ce site.', en: 'R.487 CACES (tower cranes), outside this site’s scope.' } },
  { id: 'pont-roulant', famille: 'levage', fr: 'Pont roulant, portique', en: 'Overhead or gantry crane', reco: null, cat: null, note: { fr: 'CACES R.484 (ponts roulants et portiques), hors du périmètre de ce site.', en: 'R.484 CACES (overhead and gantry cranes), outside this site’s scope.' } },
];
export const FAMILLES: Famille[] = ['entrepot', 'chantier', 'hauteur', 'levage'];
