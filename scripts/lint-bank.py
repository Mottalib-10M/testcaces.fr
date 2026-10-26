"""Contrôle de la banque de questions CACES (écrite par Radif Partners).

Usage : python3 scripts/lint-bank.py [--reco r489] [--quiet]

Vérifie :
- les grilles (src/data/grilles/<reco>.json) : 100 points, somme des points par thème ;
- chaque question (src/data/bank/*.json, sauf plaques.json) : schéma, identifiant unique,
  3 ou 4 propositions distinctes, une seule bonne réponse, fr + en, explication, points
  de grille existants, image et plaque connues, apostrophe typographique en français ;
- la couverture : pour chaque point de grille, assez de questions pour tirer un examen
  blanc varié (n + 1 si n <= 2, sinon ceil(1,5 n)) ;
- l'équilibre de la position de la bonne réponse ;
- la règle de non-copie : aucune suite de 8 mots identique à un texte de
  data/textes-sources/*.txt (mêmes règles de découpe que scripts/check-copie.mjs).
Code de sortie 1 au moindre défaut.
"""
import glob, json, math, os, re, sys, unicodedata
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUIET = "--quiet" in sys.argv
ONLY = sys.argv[sys.argv.index("--reco") + 1] if "--reco" in sys.argv else None
N = 8

IMGS = set("""interdit-pietons interdit-chariots interdit-fumer interdit-flamme interdit-acces
danger-general danger-chariots danger-charges-suspendues danger-electrique danger-inflammable danger-obstacle danger-chute-niveau
obligation-casque obligation-chaussures obligation-gants obligation-gilet obligation-auditive obligation-harnais obligation-lunettes
secours-sortie secours-premiers incendie-extincteur
sgh01 sgh02 sgh03 sgh04 sgh05 sgh06 sgh07 sgh08 sgh09
route-stop route-cedez route-sens-interdit route-vitesse-10""".split())

defauts = []
def err(m):
    defauts.append(m)

def mots(s):
    t = unicodedata.normalize("NFKD", s)
    t = "".join(c for c in t if not unicodedata.combining(c)).lower()
    t = re.sub(r"[’'`´]", " ", t)
    t = re.sub(r"[^\w]+|_", " ", t)
    return [w for w in t.split() if w]

# Grilles
grilles = {}
for f in sorted(glob.glob(f"{ROOT}/src/data/grilles/*.json")):
    g = json.load(open(f, encoding="utf-8"))
    reco = g.get("reco")
    tot = 0
    items = {}
    for th in g["themes"]:
        s = sum(i["n"] for i in th["items"])
        if s != th["points"]:
            err(f"grille {reco} thème {th['key']} : items = {s} ≠ {th['points']}")
        tot += th["points"]
        for i in th["items"]:
            if i["key"] in items:
                err(f"grille {reco} : point {i['key']} en double")
            if not i.get("fr") or not i.get("en"):
                err(f"grille {reco} : point {i['key']} sans libellé fr/en")
            items[i["key"]] = i["n"]
    if tot != 100:
        err(f"grille {reco} : total {tot} ≠ 100")
    grilles[reco] = items

plaques = json.load(open(f"{ROOT}/src/data/bank/plaques.json", encoding="utf-8"))

# Index anti-copie
index = set()
for f in glob.glob(f"{ROOT}/data/textes-sources/*.txt"):
    toks = mots(open(f, encoding="utf-8").read())
    for i in range(len(toks) - N + 1):
        index.add(" ".join(toks[i:i + N]))
autorises = set()
lst = f"{ROOT}/data/textes-sources/autorises.lst"
if os.path.exists(lst):
    for l in open(lst, encoding="utf-8"):
        l = re.sub(r"#.*", "", l).strip()
        if l:
            autorises.add(" ".join(mots(l)))

def copie(txt):
    toks = mots(txt)
    for i in range(len(toks) - N + 1):
        g = " ".join(toks[i:i + N])
        if g in index and not any(g in a for a in autorises):
            return g
    return None

ids = set()
cover = defaultdict(Counter)
pos = defaultdict(Counter)
nq = Counter()
for f in sorted(glob.glob(f"{ROOT}/src/data/bank/*.json")):
    if f.endswith("plaques.json"):
        continue
    try:
        bank = json.load(open(f, encoding="utf-8"))
    except Exception as e:
        err(f"{os.path.basename(f)} : JSON invalide ({e})")
        continue
    for q in bank:
        qid = q.get("id", "?")
        where = f"{os.path.basename(f)} {qid}"
        if qid in ids:
            err(f"{where} : identifiant en double")
        ids.add(qid)
        pts = q.get("points") or {}
        if not pts:
            err(f"{where} : aucun point de grille")
        for reco, key in pts.items():
            if reco not in grilles:
                err(f"{where} : grille {reco} inconnue")
            elif key not in grilles[reco]:
                err(f"{where} : point {key} absent de la grille {reco}")
            else:
                cover[reco][key] += 1
                nq[reco] += 1
        a = q.get("answer")
        for lang in ("fr", "en"):
            t = q.get(lang) or {}
            o = t.get("o") or []
            if not t.get("q") or not t.get("x"):
                err(f"{where} : question ou explication {lang} manquante")
            if not 3 <= len(o) <= 4:
                err(f"{where} : {len(o)} propositions en {lang} (3 ou 4)")
            if len(set(o)) != len(o):
                err(f"{where} : propositions identiques en {lang}")
            if not isinstance(a, int) or not 0 <= a < len(o):
                err(f"{where} : réponse hors bornes")
            nx = len(mots(t.get("x", "")))
            if nx < 12 or nx > 110:
                err(f"{where} : explication {lang} de {nx} mots (12 à 110)")
            for part in [t.get("q", ""), t.get("x", "")] + o:
                if lang == "fr" and "'" in part:
                    err(f"{where} : apostrophe droite en français : {part[:50]}")
                c = copie(part)
                if c:
                    err(f"{where} : 8 mots copiés d'un texte source ({lang}) : « {c} »")
        if len((q.get("fr") or {}).get("o") or []) != len((q.get("en") or {}).get("o") or []):
            err(f"{where} : nombre de propositions différent fr/en")
        if q.get("img") and q["img"] not in IMGS:
            err(f"{where} : image inconnue {q['img']}")
        if q.get("plaque") and q["plaque"] not in plaques:
            err(f"{where} : plaque inconnue {q['plaque']}")
        if isinstance(a, int):
            for reco in pts:
                pos[reco][a] += 1

for reco, items in grilles.items():
    if ONLY and reco != ONLY:
        continue
    manque = []
    for key, n in items.items():
        need = n + 1 if n <= 2 else math.ceil(1.5 * n)
        have = cover[reco][key]
        if have < need:
            manque.append(f"{key} {have}/{need}")
    if manque:
        err(f"couverture {reco} insuffisante : " + ", ".join(manque))
    tot = sum(pos[reco].values())
    if tot:
        top = max(pos[reco].values()) / tot
        if top > 0.4:
            err(f"{reco} : la même position de bonne réponse revient {round(top * 100)} % du temps (40 % au plus)")
    if not QUIET:
        print(f"{reco} : {nq[reco]} questions, positions {dict(sorted(pos[reco].items()))}")

for d in defauts:
    print("!!", d)
print(f"lint-bank : {len(ids)} questions, {len(grilles)} grilles, {len(defauts)} défaut(s)")
sys.exit(1 if defauts else 0)
