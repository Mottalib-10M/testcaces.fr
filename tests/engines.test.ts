import { describe, it, expect } from 'vitest';
import { BANK } from '../src/lib/bank';
import { RECOS, GRIDS, buildExam, buildPractice, score, verdict, themeMin, themeKeyOf, inReco, errorsAllowed } from '../src/lib/engine/exam';
import { caceEnd, medicalEnd, validity, authorisation, keepPartUntil, extensionUntil, r490Extended, addMonths } from '../src/lib/engine/dates';
import { cpfShare, cpfRightsAfter, priceOf } from '../src/lib/engine/money';
import { readPlate, canLift, maxHeight, stopping } from '../src/lib/engine/physique';
import P from '../src/data/params-2026.json';

describe('grilles et banque', () => {
  it('chaque barème fait 100 points', () => {
    for (const r of RECOS) expect(GRIDS[r].themes.reduce((s, t) => s + t.points, 0)).toBe(100);
  });
  it('les identifiants de questions sont uniques', () => {
    expect(new Set(BANK.map((q) => q.id)).size).toBe(BANK.length);
  });
  it('chaque question a une bonne réponse dans ses options, en français et en anglais', () => {
    for (const q of BANK) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.fr.o.length);
      expect(q.en.o.length).toBe(q.fr.o.length);
      expect(q.fr.x.length).toBeGreaterThan(20);
    }
  });
});

describe('examen blanc', () => {
  for (const r of RECOS) {
    it(`${r} : 100 questions, chaque point du référentiel au nombre de son barème`, () => {
      const qs = buildExam(BANK, r, 12345);
      expect(qs.length).toBe(100);
      expect(new Set(qs.map((q) => q.id)).size).toBe(100);
      for (const t of GRIDS[r].themes) expect(qs.filter((q) => themeKeyOf(q, r) === t.key).length).toBe(t.points);
      for (const t of GRIDS[r].themes) for (const i of t.items) expect(qs.filter((q) => q.points[r] === i.key).length).toBe(i.n);
    });
  }
  it('même graine, même examen', () => {
    expect(buildExam(BANK, 'r489', 7).map((q) => q.id)).toEqual(buildExam(BANK, 'r489', 7).map((q) => q.id));
  });
  it('série par thème : uniquement des questions du thème', () => {
    const qs = buildPractice(BANK, 'r482', 'circ', 3, 15);
    expect(qs.length).toBe(15);
    expect(qs.every((q) => inReco(q, 'r482') && themeKeyOf(q, 'r482') === 'circ')).toBe(true);
  });
});

describe('notation', () => {
  it('70 sur 100 avec tous les thèmes à la moitié : réussi', () => {
    const qs = buildExam(BANK, 'r489', 1);
    // une erreur sur trois dans chaque thème donne environ 67 : on rend juste 70 réponses bien réparties
    const answers = qs.map((q, i) => (i % 10 < 7 ? q.answer : (q.answer + 1) % q.fr.o.length));
    const s = score(qs, answers, 'r489');
    expect(s.got).toBe(70);
  });
  it('86 points avec 4 sur 10 à l’abaque : échoué', () => {
    const v = verdict('r489', [15, 25, 4, 42]);
    expect(v.total).toBe(86);
    expect(v.pass).toBe(false);
    expect(v.failed.map((x) => x.key)).toEqual(['abaque']);
  });
  it('70 points, thèmes à la moitié : réussi', () => {
    expect(verdict('r489', [8, 13, 5, 44]).pass).toBe(true);
    expect(verdict('r489', [8, 13, 5, 43]).pass).toBe(false);
  });
  it('minimum de thème arrondi au point supérieur', () => {
    expect(themeMin(15)).toBe(8);
    expect(themeMin(10)).toBe(5);
    expect(themeMin(4)).toBe(2);
    expect(errorsAllowed()).toBe(30);
  });
});

describe('dates', () => {
  it('échéance à la date anniversaire, 5 ou 10 ans', () => {
    expect(caceEnd('r489', '2022-03-14')).toBe('2027-03-14');
    expect(caceEnd('r482', '2022-03-14')).toBe('2032-03-14');
    expect(caceEnd('r486', '2024-02-29')).toBe('2029-02-28');
  });
  it('attestation médicale : 5 ans, ancien avis compris', () => {
    expect(medicalEnd('2026-01-10')).toBe('2031-01-10');
    expect(medicalEnd('2024-06-01')).toBe('2029-06-01');
  });
  it('état et date d’inscription au recyclage', () => {
    const v = validity('r489', '2022-03-14', '2026-10-26');
    expect(v.end).toBe('2027-03-14');
    expect(v.bookBy).toBe('2026-12-14');
    expect(v.state).toBe('valid');
    expect(validity('r489', '2021-01-01', '2026-10-26').state).toBe('expired');
  });
  it('l’autorisation s’arrête à la plus proche des deux échéances', () => {
    const a = authorisation('r482', '2020-05-01', '2023-01-01');
    expect(a.limit).toBe('2028-01-01');
    expect(a.limitedBy).toBe('medical');
  });
  it('partie gardée 12 mois, extension 12 mois, 31 du mois', () => {
    expect(keepPartUntil('2026-09-15')).toBe('2027-09-15');
    expect(extensionUntil('2026-01-31')).toBe('2027-01-31');
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
  });
  it('R490 : pratique à 10 ans seulement avec 50 jours par an sur 5 ans', () => {
    expect(r490Extended('2021-04-01', [60, 55, 80, 50, 70]).practicalBy).toBe('2031-04-01');
    expect(r490Extended('2021-04-01', [60, 55, 49, 50, 70]).practicalBy).toBe('2026-04-01');
  });
});

describe('CPF', () => {
  it('salarié : participation forfaitaire, le CPF paie le reste', () => {
    const o = cpfShare({ price: 1000, rights: 1200, exempt: false });
    expect(o.participation).toBe(P.cpf.participation);
    expect(o.cpf).toBe(1000 - P.cpf.participation);
    expect(o.rest).toBe(P.cpf.participation);
  });
  it('demandeur d’emploi : pas de participation', () => {
    const o = cpfShare({ price: 1000, rights: 1200, exempt: true });
    expect(o.cpf).toBe(1000);
    expect(o.rest).toBe(0);
  });
  it('plafond de 1 500 € pour une certification du Répertoire spécifique', () => {
    const o = cpfShare({ price: 2000, rights: 3000, exempt: false });
    expect(o.cpf).toBe(P.cpf.rsCap);
    expect(o.capped).toBe(true);
    expect(o.rest).toBe(2000 - P.cpf.rsCap);
  });
  it('droits : 500 € par an, plafond 5 000 €', () => {
    expect(cpfRightsAfter(3, false)).toBe(1500);
    expect(cpfRightsAfter(20, false)).toBe(5000);
    expect(cpfRightsAfter(20, true)).toBe(8000);
  });
  it('prix médians lus dans les données CPF', () => {
    const p = priceOf('r489', '3', 'ini');
    expect(p?.prix?.med).toBeGreaterThan(300);
    expect(p?.national).toBe(true);
  });
});

describe('plaques et freinage', () => {
  it('lecture de plaque : ligne et colonne égales ou supérieures', () => {
    expect(readPlate('P1', 3.3, 500)?.kg).toBe(2500);
    expect(readPlate('P1', 4, 650)?.kg).toBe(1800);
    expect(readPlate('P1', 6, 500)).toBeNull();
    expect(canLift('P1', 4, 650, 1900).ok).toBe(false);
    expect(maxHeight('P1', 650, 1700)).toBe(4.5);
  });
  it('distance d’arrêt = réaction + freinage', () => {
    const s = stopping(10.8, 1, 1.5);
    expect(s.reaction).toBeCloseTo(3);
    expect(s.braking).toBeCloseTo(3);
    expect(s.total).toBeCloseTo(6);
  });
});
