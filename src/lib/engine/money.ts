/**
 * Financement d'un CACES par le CPF (service-public.gouv.fr, fiche F10705 vérifiée le 27 juin 2026,
 * actualité A17364 du 2 avril 2026) :
 * - certifications du Répertoire spécifique (CACES compris) : 1 500 € de droits CPF au plus, plafond
 *   appliqué aux droits issus de l'alimentation annuelle, pas aux cofinancements ;
 * - participation forfaitaire obligatoire de 150 € (demandes à compter du 2 avril 2026), sauf demandeur
 *   d'emploi, abondement de l'employeur, points C2P ou abondement accident du travail / maladie
 *   professionnelle ; l'OPCO ou l'employeur peut la prendre en charge ;
 * - le reste se finance par un tiers (employeur, OPCO, France Travail, région…) ou par le titulaire.
 * Prix et durées constatés : catalogue Mon Compte Formation (cpf-caces.json, Licence Ouverte).
 */
import P from '../../data/params-2026.json';
import CPF from '../../data/cpf-caces.json';
import type { Reco } from './exam';

export interface CpfInput { price: number; rights: number; exempt: boolean; other?: number }
export interface CpfOut { cpf: number; participation: number; other: number; rest: number; capped: boolean }
export function cpfShare({ price, rights, exempt, other = 0 }: CpfInput): CpfOut {
  const p = Math.max(0, price);
  const participation = exempt || p === 0 ? 0 : Math.min(P.cpf.participation, p);
  const cap = P.cpf.rsCap;
  const room = Math.max(0, p - participation);
  const cpf = Math.max(0, Math.min(rights, cap, room));
  const capped = rights > cap && room > cap;
  const left = Math.max(0, p - cpf);
  const o = Math.min(Math.max(0, other), left);
  return { cpf, participation, other: o, rest: left - o, capped };
}

/** Droits CPF accumulés après n années pleines à temps plein (500 €/an, plafond 5 000 € ; 800/8 000 € sans qualification de niveau 3). */
export const cpfRightsAfter = (years: number, lowQualified = false) => Math.min(Math.max(0, years) * (lowQualified ? P.cpf.annualCreditLowQualified : P.cpf.annualCredit), lowQualified ? P.cpf.ceilingLowQualified : P.cpf.ceiling);

type Q = { n: number; q1: number; med: number; q3: number } | null;
export interface CertStats { code: string; reco: Reco; cat: string; ini: { prix: Q; heures: Q; regions: Record<string, Q> } | null; rec: { prix: Q; heures: Q; regions: Record<string, Q> } | null }
export const CERTS = CPF.certs as CertStats[];
export const REGIONS = CPF.regions as Record<string, string>;
export const CPF_DATE = CPF.date_extract;
export const certOf = (reco: Reco, cat: string) => CERTS.find((c) => c.reco === reco && c.cat === cat);
/** Prix médian (et quartiles) pour une catégorie, initial ou recyclage, national ou d'une région (si assez d'offres). */
export function priceOf(reco: Reco, cat: string, type: 'ini' | 'rec', region?: string) {
  const c = certOf(reco, cat);
  const s = c?.[type];
  if (!s) return null;
  const reg = region ? s.regions[region] : null;
  return { prix: reg ?? s.prix, heures: s.heures, national: !reg, offers: (reg ?? s.prix)?.n ?? 0 };
}
