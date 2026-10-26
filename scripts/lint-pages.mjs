#!/usr/bin/env node
/**
 * Contrôle rapide des pages de src/content/pages avant le build (RECETTE §11, §21) :
 * titre 50–60 caractères, description 150–160, bloc citable ≥ 120 mots, 3 à 5 FAQ de 40 à 90 mots,
 * pas de tiret cadratin, liens internes connus, mots du contenu.
 * Usage : node scripts/lint-pages.mjs [id…]
 */
import { createJiti } from 'jiti';
import { readdirSync, existsSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = new URL('../src/content/pages/', import.meta.url);
// Banque encore en cours d'écriture : un fichier absent compte, le temps du contrôle, pour une banque vide.
const tmp = [];
for (const r of ['r489', 'r482', 'r486', 'r490', 'r485']) {
  const p = fileURLToPath(new URL(`../src/data/bank/${r}.json`, import.meta.url));
  if (!existsSync(p)) { writeFileSync(p, '[]'); tmp.push(p); }
}
process.on('exit', () => { for (const p of tmp) if (readFileSync(p, 'utf8') === '[]') unlinkSync(p); });
const jiti = createJiti(import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();
globalThis.__PAGE_MODS__ = {};
for (const f of files) globalThis.__PAGE_MODS__[`../content/pages/${f}`] = { default: (await jiti.import(new URL(f, dir).href)).default };
const { helpers } = await jiti.import('../src/lib/helpers.ts');
const only = process.argv.slice(2);
const words = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
let bad = 0;
for (const f of files) {
  const id = f.slice(0, -3);
  if (only.length && !only.includes(id)) continue;
  const page = (await jiti.import(new URL(f, dir).href)).default;
  for (const lang of ['fr', 'en']) {
    const T = page[lang]; const h = helpers(lang, !process.env.LOOSE); const out = [];
    try {
      if (T.title.length < 50 || T.title.length > 60) out.push(`titre ${T.title.length}`);
      if (T.description.length < 150 || T.description.length > 160) out.push(`description ${T.description.length}`);
      const all = [T.title, T.description, T.h1, T.intro, T.resume(h), T.body(h), ...T.faqs(h).flatMap((q) => [q.q, q.a])].join(' ');
      if (/—/.test(all)) out.push('tiret cadratin');
      const r = words(T.resume(h)); if (r < 120) out.push(`résumé ${r} mots`);
      const fq = T.faqs(h); if (fq.length < 3 || fq.length > 5) out.push(`${fq.length} FAQ`);
      fq.forEach((q, i) => { const n = words(q.a); if (n < 40 || n > 90) out.push(`FAQ ${i + 1} ${n} mots`); });
      const total = words(`${T.intro} ${T.resume(h)} ${T.body(h)} ${fq.map((q) => q.q + ' ' + q.a).join(' ')}`);
      if (total < 560) out.push(`contenu ${total} mots`);
      if (out.length) { bad++; console.log(`${id} [${lang}] ${out.join(' · ')}`); } else console.log(`ok ${id} [${lang}] ${total} mots`);
    } catch (e) { bad++; console.log(`${id} [${lang}] ERREUR ${e.message}`); }
  }
}
console.log(`lint-pages : ${bad} défaut(s)`);
process.exit(bad ? 1 : 0);
