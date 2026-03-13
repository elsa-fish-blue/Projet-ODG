# Dossier `src/data/` — Données du projet

Ce dossier contient un seul fichier qui centralise toutes les données du site.
C'est **le seul fichier à modifier** pour mettre à jour les textes, les formules ou les membres du groupe.

---

## Fichier `mindmap.ts`

Fichier TypeScript exportant toutes les constantes utilisées dans les pages et composants.

### Interfaces TypeScript (structures de données)

| Interface | Description |
|---|---|
| `SubSubQuestion` | Représente une sous-sous-question : identifiant, libellé, angle de positionnement (inutilisé depuis la mise en ligne horizontale), tableau de blocs de contenu |
| `ContentBlock` | Union de trois types : `text` (texte brut), `latex` (formule inline), `latex-block` (formule centrée) |
| `Branch` | Représente une branche principale : identifiant, libellé, couleurs (principale, claire, foncée), angle (inutilisé), tableau de sous-sous-questions |

### Constantes exportées

| Constante | Type | Description |
|---|---|---|
| `MAIN_QUESTION` | `string` | Texte de la question centrale affichée en haut de la page d'accueil et dans la carte mentale principale |
| `READING_ORDER` | `string` | Texte de conseil de lecture affiché dans l'encadré "Conseils de lecture" |
| `GROUP_MEMBERS` | `Array<{ name: string }>` | Noms des membres du groupe, affichés dans le pied de page de chaque page |
| `BRANCHES` | `Branch[]` | Tableau des trois branches principales. L'ordre des éléments dans `subQuestions` détermine l'ordre d'affichage de gauche à droite dans la carte mentale et de haut en bas dans le développement |

### Ajouter un bloc de contenu dans une sous-question

```ts
// Texte en prose
{ type: "text", value: "Mon texte explicatif." }

// Formule LaTeX centrée (sur sa propre ligne, dans un encadré)
{ type: "latex-block", value: "E_c = \\frac{1}{2}mv^2" }

// Formule LaTeX inline (dans le fil du texte)
{ type: "latex", value: "v \\approx 20\\,\\text{km/s}" }
```

### Modifier l'ordre de lecture des sous-questions

L'ordre des objets dans le tableau `subQuestions` de chaque branche détermine :
1. L'ordre d'affichage de gauche à droite dans la carte mentale de la branche
2. L'ordre d'affichage de haut en bas dans la section "Développement des sous-questions"
