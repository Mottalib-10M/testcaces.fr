/** Registry of pages: every file of `src/content/pages/` is loaded here. */
import type { PageDef } from './guide-types';
let mods: Record<string, { default: PageDef }>;
// Hors de Vite (scripts/lint-pages.mjs), import.meta.glob n'existe pas : le script fournit les pages.
try { mods = import.meta.glob<{ default: PageDef }>('../content/pages/*.ts', { eager: true }); } catch { mods = (globalThis as any).__PAGE_MODS__ ?? {}; }
export const PAGES: PageDef[] = Object.entries(mods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.id !== base) throw new Error(`${file}: id “${g.id}” differs from the file name`);
    return g;
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
