#!/usr/bin/env node
/**
 * Met à jour src/data/cpf-caces.json : prix et durées des formations CACES du catalogue Mon Compte Formation.
 *
 * Source : jeu de données « moncompteformation_catalogueformation » de la Caisse des Dépôts
 * (opendata.caissedesdepots.fr), Licence Ouverte v2.0 (Etalab). Une ligne = une offre × un département.
 * On ne garde que les certifications CACES du Répertoire spécifique (codes RS listés dans CODES), on
 * compte chaque offre une fois au niveau national (numero_formation) et une fois par région, et on
 * calcule médiane et quartiles du prix TTC moyen et de la durée, séparément pour la formation initiale
 * et pour le recyclage (intitulé contenant « recyclage », « renouvellement », « actualisation »…).
 * Aucun nom d'organisme n'est conservé.
 *
 * Usage : node scripts/update-data.mjs [fichier.json]   (sans argument : téléchargement de l'API)
 * Lancé chaque lundi par .github/workflows/update-data.yml, qui republie le site si le fichier change.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'data', 'cpf-caces.json');

export const CODES = {
  '6866': ['r489', '1A'], '6867': ['r489', '1B'], '6800': ['r489', '2A'], '6868': ['r489', '2B'], '6869': ['r489', '3'],
  '6871': ['r489', '4'], '6870': ['r489', '5'], '6872': ['r489', '6'], '6873': ['r489', '7'],
  '7040': ['r482', 'A'], '7041': ['r482', 'B1'], '7042': ['r482', 'B2'], '7043': ['r482', 'B3'], '7044': ['r482', 'C1'],
  '7045': ['r482', 'C2'], '7046': ['r482', 'C3'], '7047': ['r482', 'D'], '7048': ['r482', 'E'], '7049': ['r482', 'F'], '7023': ['r482', 'G'],
  '7000': ['r486', 'A'], '7001': ['r486', 'B'], '7002': ['r486', 'C'],
  '6997': ['r490', 'grue'],
  '6937': ['r485', '1'], '6938': ['r485', '2'],
};
const RECYCLAGE = /recycl|renouvel|actualis|remise [àa] niveau|maintien des comp/i;
const MIN_REGION = 8; // en dessous, pas de chiffre régional (trop peu d'offres)

const URL = 'https://opendata.caissedesdepots.fr/api/explore/v2.1/catalog/datasets/moncompteformation_catalogueformation/exports/json'
  + '?where=' + encodeURIComponent('search("CACES")')
  + '&select=' + encodeURIComponent('date_extract,code_inventaire,intitule_formation,code_region,nom_region,nombre_heures_total_mean,frais_ttc_tot_mean,numero_formation');

export function quart(arr) {
  const a = arr.filter((x) => Number.isFinite(x) && x > 0).sort((x, y) => x - y);
  if (!a.length) return null;
  const q = (p) => {
    const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
    return a[lo] + (a[hi] - a[lo]) * (i - lo);
  };
  const r = (x) => Math.round(x);
  return { n: a.length, q1: r(q(0.25)), med: r(q(0.5)), q3: r(q(0.75)) };
}

export function aggregate(rows) {
  const date = rows.reduce((m, r) => (r.date_extract && r.date_extract > m ? r.date_extract : m), '');
  const nat = new Map(); // code|type → Map(numero → {prix, h})
  const reg = new Map(); // code|type|region → Map(numero → prix)
  const regions = new Map();
  for (const r of rows) {
    const c = CODES[r.code_inventaire];
    if (!c || !r.numero_formation) continue;
    const type = RECYCLAGE.test(r.intitule_formation || '') ? 'rec' : 'ini';
    const k = `${r.code_inventaire}|${type}`;
    if (!nat.has(k)) nat.set(k, new Map());
    if (!nat.get(k).has(r.numero_formation)) nat.get(k).set(r.numero_formation, { prix: r.frais_ttc_tot_mean, h: r.nombre_heures_total_mean });
    if (r.code_region && r.nom_region) {
      regions.set(r.code_region, r.nom_region);
      const kr = `${k}|${r.code_region}`;
      if (!reg.has(kr)) reg.set(kr, new Map());
      reg.get(kr).set(r.numero_formation, r.frais_ttc_tot_mean);
    }
  }
  const certs = [];
  for (const [code, [reco, cat]] of Object.entries(CODES)) {
    const out = { code, reco, cat };
    for (const type of ['ini', 'rec']) {
      const m = nat.get(`${code}|${type}`);
      if (!m) { out[type] = null; continue; }
      const v = [...m.values()];
      const regionsOut = {};
      for (const rc of regions.keys()) {
        const mr = reg.get(`${code}|${type}|${rc}`);
        if (mr && mr.size >= MIN_REGION) regionsOut[rc] = quart([...mr.values()]);
      }
      out[type] = { prix: quart(v.map((x) => x.prix)), heures: quart(v.map((x) => x.h)), regions: regionsOut };
    }
    certs.push(out);
  }
  return {
    source: 'Caisse des Dépôts, catalogue Mon Compte Formation (moncompteformation_catalogueformation)',
    url: 'https://opendata.caissedesdepots.fr/explore/dataset/moncompteformation_catalogueformation/',
    licence: 'Licence Ouverte v2.0 (Etalab)',
    date_extract: date,
    regions: Object.fromEntries([...regions.entries()].sort((a, b) => a[1].localeCompare(b[1], 'fr'))),
    certs,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  let rows;
  if (process.argv[2]) rows = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  else {
    const res = await fetch(URL);
    if (!res.ok) { console.error(`update-data : API ${res.status}`); process.exit(1); }
    rows = await res.json();
  }
  if (!Array.isArray(rows) || rows.length < 1000) { console.error(`update-data : ${rows?.length} lignes, données refusées`); process.exit(1); }
  const data = aggregate(rows);
  if (data.certs.filter((c) => c.ini?.prix).length < 15) { console.error('update-data : trop peu de certifications, données refusées'); process.exit(1); }
  writeFileSync(OUT, JSON.stringify(data, null, 1) + '\n');
  console.log(`update-data : ${rows.length} lignes du ${data.date_extract} → ${OUT}`);
}
