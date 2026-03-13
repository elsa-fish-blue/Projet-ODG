# Dossier `src/components/` — Composants React réutilisables

Ce dossier contient les composants graphiques partagés entre les pages.
Chaque composant a une responsabilité unique et bien définie.

---

## Fichier `MindMapMain.tsx`

**Rôle :** Carte mentale affichée sur la page d'accueil (`/`).

**Ce qu'il affiche :**
- Un grand ovale central contenant la question principale
- Trois ovales secondaires disposés en ligne horizontale en dessous (de gauche à droite dans l'ordre logique : caractéristiques → déviation → explosion)
- Des lignes courbes reliant le centre à chaque sous-question
- Des boutons de navigation sous la carte, un par branche

**Comportement :** Un clic sur un ovale secondaire ou sur un bouton navigue vers la page `/branch/{id}` de la branche correspondante.

**À modifier si :** on souhaite changer la disposition visuelle de la carte principale (positions, tailles, couleurs du fond).

---

## Fichier `MindMapBranch.tsx`

**Rôle :** Carte mentale affichée sur la page de détail d'une branche (`/branch/:id`).

**Ce qu'il affiche :**
- Un grand ovale central contenant la sous-question de la branche
- Les sous-sous-questions disposées en ligne horizontale en dessous (dans l'ordre du tableau `subQuestions`)
- Des lignes courbes reliant le centre à chaque sous-sous-question

**Comportement :** Un clic sur un ovale secondaire appelle le callback `onSubClick(id)`, qui fait défiler la page jusqu'à la section de développement correspondante.

**Propriétés (props) :**
- `branch` : objet `Branch` contenant toutes les données de la branche
- `onSubClick` : fonction appelée avec l'identifiant de la sous-question cliquée

---

## Fichier `BranchLine.tsx`

**Rôle :** Ligne courbe (courbe de Bézier quadratique) dessinée en SVG entre deux points.
Utilisée pour relier les nœuds dans les cartes mentales.

**Propriétés (props) :**
- `x1, y1` : coordonnées du point de départ
- `x2, y2` : coordonnées du point d'arrivée
- `color` : couleur de la ligne (héritée de la branche)
- `strokeWidth` : épaisseur de la ligne
- `animate` : active l'animation d'apparition
- `delay` : délai de l'animation en millisecondes

---

## Fichier `MathFormula.tsx`

**Rôle :** Rendu d'une formule mathématique LaTeX à l'aide de la bibliothèque KaTeX.

**Propriétés (props) :**
- `formula` : chaîne LaTeX à rendre (ex. `"E = mc^2"`)
- `display` : booléen — `true` pour une formule centrée sur sa propre ligne, `false` pour une formule inline
- `color` : couleur du texte de la formule

**À utiliser dans :** les blocs `latex` et `latex-block` du tableau `content` de chaque sous-question (défini dans `src/data/mindmap.ts`).

---

## Fichier `CloudShape.tsx`

**Rôle :** Composant hérité des versions précédentes du projet (forme en nuage).
Non utilisé dans la version actuelle — conservé pour référence. Peut être supprimé sans impact.
