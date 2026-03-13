# Dossier `src/utils/` — Fonctions utilitaires

Ce dossier contient des fonctions auxiliaires sans interface graphique,
utilisées par les composants et les pages.

---

## Fichier `geometry.ts`

**Rôle :** Fonctions de calcul géométrique pour le positionnement des nœuds SVG.

**Fonctions exportées :**

| Fonction | Description |
|---|---|
| `polarToXY(cx, cy, r, angleDeg)` | Convertit des coordonnées polaires (rayon + angle en degrés) en coordonnées cartésiennes (x, y) autour d'un centre (cx, cy) |

**Note :** Ces fonctions sont également redéfinies localement dans les composants SVG pour des raisons de lisibilité. La version dans `geometry.ts` est conservée pour référence et réutilisation éventuelle.

---

## Fichier `cn.ts`

**Rôle :** Fonction utilitaire pour composer des noms de classes CSS Tailwind de façon conditionnelle.

**Usage :**
```ts
import { cn } from "../utils/cn";
cn("text-sm", isActive && "font-bold", "text-gray-700")
// → "text-sm font-bold text-gray-700" si isActive est true
```

Cette fonction simplifie l'écriture des classes CSS conditionnelles dans les composants React.
