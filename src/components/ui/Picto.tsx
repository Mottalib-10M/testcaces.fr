/**
 * Panneaux et pictogrammes dessinés par Radif Partners pour l'entraînement, d'après les formes et
 * couleurs de l'arrêté du 4 novembre 1993 (signalisation de santé et de sécurité au travail) et du
 * règlement CLP (pictogrammes de danger). Dessins simplifiés : ils apprennent à reconnaître une
 * famille de panneaux, ils ne remplacent pas les panneaux normalisés. Le libellé accessible ne donne
 * jamais la réponse (la question porte sur le sens du panneau).
 */
import type { ReactNode } from 'react';

const RED = '#C8102E', YEL = '#F6B40E', BLUE = '#1E5AA8', GREEN = '#0B7A4B', K = '#111';

const forklift = (c: string) => (
  <g fill={c} stroke={c}>
    <rect x="30" y="48" width="26" height="16" rx="2" />
    <path d="M36 48 V34 H50 L54 48" fill="none" strokeWidth="4" />
    <circle cx="43" cy="30" r="4" stroke="none" />
    <rect x="58" y="26" width="4" height="38" stroke="none" />
    <rect x="62" y="58" width="16" height="4" stroke="none" />
    <circle cx="36" cy="67" r="5" stroke="none" /><circle cx="54" cy="67" r="5" stroke="none" />
  </g>
);
const walker = (c: string) => (
  <g stroke={c} strokeWidth="5" strokeLinecap="round" fill="none">
    <circle cx="50" cy="24" r="6" fill={c} stroke="none" />
    <path d="M50 32 L48 52 M48 52 L40 70 M48 52 L58 70 M49 38 L38 48 M49 38 L60 46" />
  </g>
);
const flame = (c: string, s = 1, dx = 0, dy = 0) => (
  <path transform={`translate(${dx} ${dy}) scale(${s})`} fill={c} d="M50 22 C58 36 66 42 64 56 C63 66 56 72 50 72 C43 72 36 66 36 56 C36 48 42 44 44 36 C47 44 50 46 52 46 C54 38 52 30 50 22 Z" />
);
const prohibit = (inner: ReactNode) => (
  <>
    <circle cx="50" cy="50" r="44" fill="#fff" stroke={RED} strokeWidth="9" />
    {inner}
    <line x1="19" y1="19" x2="81" y2="81" stroke={RED} strokeWidth="9" />
  </>
);
const warning = (inner: ReactNode) => (
  <>
    <path d="M50 8 L94 88 H6 Z" fill={YEL} stroke={K} strokeWidth="6" strokeLinejoin="round" />
    <g transform="translate(18 30) scale(0.64)">{inner}</g>
  </>
);
const mandatory = (inner: ReactNode) => (<><circle cx="50" cy="50" r="46" fill={BLUE} />{inner}</>);
const rescue = (inner: ReactNode) => (<><rect x="4" y="4" width="92" height="92" rx="6" fill={GREEN} />{inner}</>);
const ghs = (inner: ReactNode) => (
  <>
    <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#fff" stroke={RED} strokeWidth="7" strokeLinejoin="round" />
    <g transform="translate(20 20) scale(0.6)">{inner}</g>
  </>
);

const DRAW: Record<string, ReactNode> = {
  'interdit-pietons': prohibit(walker(K)),
  'interdit-chariots': prohibit(<g transform="translate(-4 0)">{forklift(K)}</g>),
  'interdit-fumer': prohibit(<g><rect x="22" y="50" width="48" height="10" fill={K} /><rect x="70" y="50" width="8" height="10" fill="#d33" /><path d="M76 44 C72 38 80 34 76 26" stroke={K} strokeWidth="3" fill="none" /></g>),
  'interdit-flamme': prohibit(flame(K, 0.8, 10, 10)),
  'interdit-acces': prohibit(<g fill={K}><path d="M38 72 V44 C38 40 44 40 44 44 V30 C44 26 50 26 50 30 V28 C50 24 56 24 56 28 V32 C56 28 62 28 62 32 V58 C62 66 56 72 48 72 Z" /></g>),
  'danger-general': warning(<g fill={K}><rect x="44" y="18" width="12" height="40" rx="3" /><circle cx="50" cy="70" r="7" /></g>),
  'danger-chariots': warning(forklift(K)),
  'danger-charges-suspendues': warning(<g fill={K} stroke={K}><line x1="50" y1="8" x2="50" y2="30" strokeWidth="4" /><path d="M50 30 C42 30 42 40 50 40" fill="none" strokeWidth="4" /><rect x="34" y="44" width="32" height="26" /></g>),
  'danger-electrique': warning(<path fill={K} d="M56 10 L34 52 H50 L42 90 L68 42 H52 Z" />),
  'danger-inflammable': warning(flame(K)),
  'danger-obstacle': warning(<g fill={K}><circle cx="34" cy="26" r="6" /><path d="M34 34 L46 50 L62 54" stroke={K} strokeWidth="6" fill="none" strokeLinecap="round" /><rect x="58" y="60" width="26" height="14" /></g>),
  'danger-chute-niveau': warning(<g fill={K}><path d="M10 52 H52 V82 H90" stroke={K} strokeWidth="6" fill="none" /><circle cx="60" cy="30" r="6" /><path d="M58 38 L66 56 M62 44 L74 40 M64 56 L58 70" stroke={K} strokeWidth="5" strokeLinecap="round" /></g>),
  'obligation-casque': mandatory(<path fill="#fff" d="M24 62 C24 40 36 30 50 30 C64 30 76 40 76 62 H82 V70 H18 V62 Z" />),
  'obligation-chaussures': mandatory(<path fill="#fff" d="M34 26 H52 V54 L74 60 C80 62 80 72 74 72 H30 C28 72 28 70 28 68 V30 Z" />),
  'obligation-gants': mandatory(<path fill="#fff" d="M36 76 V44 C36 40 41 40 41 44 V28 C41 24 47 24 47 28 V26 C47 22 53 22 53 26 V30 C53 26 59 26 59 30 V48 L64 42 C67 38 72 42 69 46 L60 62 V76 Z" />),
  'obligation-gilet': mandatory(<g fill="#fff"><path d="M34 26 L44 26 L50 40 L56 26 L66 26 L70 76 H30 Z" /><rect x="30" y="52" width="40" height="5" fill={BLUE} /><rect x="30" y="62" width="40" height="5" fill={BLUE} /></g>),
  'obligation-auditive': mandatory(<g fill="#fff"><path d="M28 56 C28 30 72 30 72 56" stroke="#fff" strokeWidth="6" fill="none" /><rect x="20" y="50" width="16" height="24" rx="6" /><rect x="64" y="50" width="16" height="24" rx="6" /></g>),
  'obligation-harnais': mandatory(<g stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round"><circle cx="50" cy="22" r="6" fill="#fff" stroke="none" /><path d="M50 30 V58 M50 58 L42 78 M50 58 L58 78 M50 36 L36 50 M50 36 L64 50" /><path d="M40 32 L60 56 M60 32 L40 56" strokeWidth="3" /><path d="M50 30 C50 18 70 14 72 10" strokeWidth="3" /></g>),
  'obligation-lunettes': mandatory(<g fill="#fff"><rect x="20" y="42" width="26" height="18" rx="8" /><rect x="54" y="42" width="26" height="18" rx="8" /><rect x="44" y="46" width="12" height="5" /></g>),
  'secours-sortie': rescue(<g fill="#fff"><rect x="60" y="20" width="24" height="60" fill="none" stroke="#fff" strokeWidth="5" /><circle cx="38" cy="26" r="6" /><path d="M38 34 L34 52 L22 64 M34 52 L46 60 L50 74 M36 40 L24 44 M36 40 L50 46" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" /></g>),
  'secours-premiers': rescue(<g fill="#fff"><rect x="40" y="20" width="20" height="60" /><rect x="20" y="40" width="60" height="20" /></g>),
  'incendie-extincteur': (<><rect x="4" y="4" width="92" height="92" rx="6" fill={RED} /><g fill="#fff"><rect x="38" y="34" width="22" height="48" rx="6" /><rect x="44" y="24" width="10" height="10" /><path d="M54 26 H70 L74 34" stroke="#fff" strokeWidth="4" fill="none" /></g></>),
  sgh01: ghs(<g fill={K}><circle cx="50" cy="56" r="20" /><path d="M50 10 L54 30 L46 30 Z M86 30 L68 42 L64 36 Z M14 30 L32 36 L28 42 Z M50 84 L44 76 H56 Z" /></g>),
  sgh02: ghs(<g>{flame(K, 1, 0, 0)}<rect x="24" y="78" width="52" height="6" fill={K} /></g>),
  sgh03: ghs(<g><circle cx="50" cy="62" r="16" fill="none" stroke={K} strokeWidth="6" />{flame(K, 0.7, 15, -4)}<rect x="24" y="82" width="52" height="6" fill={K} /></g>),
  sgh04: ghs(<g fill={K}><rect x="18" y="44" width="62" height="22" rx="11" transform="rotate(-20 50 55)" /><rect x="78" y="30" width="10" height="12" transform="rotate(-20 50 55)" /></g>),
  sgh05: ghs(<g fill={K}><path d="M22 18 L32 42 H24 Z M52 18 L62 42 H54 Z" /><circle cx="27" cy="52" r="3" /><circle cx="57" cy="52" r="3" /><rect x="16" y="62" width="26" height="6" /><path d="M50 62 H82 V70 C78 70 76 74 70 74 H54 Z" /></g>),
  sgh06: ghs(<g fill={K}><circle cx="50" cy="38" r="20" /><circle cx="42" cy="36" r="5" fill="#fff" /><circle cx="58" cy="36" r="5" fill="#fff" /><path d="M20 66 L80 84 M80 66 L20 84" stroke={K} strokeWidth="8" strokeLinecap="round" /></g>),
  sgh07: ghs(<g fill={K}><rect x="42" y="12" width="16" height="52" rx="4" /><circle cx="50" cy="80" r="8" /></g>),
  sgh08: ghs(<g fill={K}><circle cx="50" cy="20" r="10" /><path d="M30 86 V44 C30 36 70 36 70 44 V86 Z" /><path d="M50 50 L54 60 L64 60 L56 66 L60 76 L50 70 L40 76 L44 66 L36 60 L46 60 Z" fill="#fff" /></g>),
  sgh09: ghs(<g fill={K}><path d="M30 62 V24 M30 34 L18 24 M30 40 L42 28" stroke={K} strokeWidth="5" fill="none" /><rect x="14" y="62" width="72" height="5" /><path d="M48 80 C58 70 74 70 82 80 C74 90 58 90 48 80 Z M48 80 L40 72 V88 Z" /></g>),
  'route-stop': (<><path d="M30 4 H70 L96 30 V70 L70 96 H30 L4 70 V30 Z" fill={RED} stroke="#fff" strokeWidth="4" /><text x="50" y="60" textAnchor="middle" fontSize="27" fontWeight="700" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">STOP</text></>),
  'route-cedez': (<path d="M6 12 H94 L50 92 Z" fill="#fff" stroke={RED} strokeWidth="10" strokeLinejoin="round" />),
  'route-sens-interdit': (<><circle cx="50" cy="50" r="46" fill={RED} /><rect x="18" y="42" width="64" height="16" fill="#fff" /></>),
  'route-vitesse-10': (<><circle cx="50" cy="50" r="44" fill="#fff" stroke={RED} strokeWidth="9" /><text x="50" y="64" textAnchor="middle" fontSize="40" fontWeight="700" fill={K} fontFamily="Arial, Helvetica, sans-serif">10</text></>),
};
export const PICTOS = Object.keys(DRAW);

export default function Picto({ id, size = 96, label }: { id: string; size?: number; label: string }) {
  const d = DRAW[id];
  if (!d) return null;
  return <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={label} className="shrink-0">{d}</svg>;
}
