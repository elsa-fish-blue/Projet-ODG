# Dossier `src/` — Code source de l'application

Ce dossier contient l'intégralité du code source du site. Chaque fichier est décrit ci-dessous.

---

## Fichiers à la racine de `src/`

### `main.tsx`
Point d'entrée JavaScript de l'application. Ce fichier est exécuté en premier : il monte le composant racine `<App />` dans la balise `<div id="root">` du fichier `index.html`. Il ne doit pas être modifié.

### `App.tsx`
Routeur principal de l'application. Ce fichier définit les deux routes du site :
- `/` → affiche la page d'accueil (`HomePage`)
- `/branch/:branchId` → affiche la page de détail d'une branche (`BranchPage`)

Il utilise React Router v6. Modifier ce fichier uniquement pour ajouter de nouvelles pages.

### `index.css`
Feuille de styles globale. Contient :
- L'import des polices (Lora, Inter via Google Fonts)
- Les règles Tailwind CSS
- L'animation `fadeInCloud` utilisée par les nœuds SVG des cartes mentales

---

## Sous-dossiers

| Dossier | Rôle |
|---|---|
| `data/` | Toutes les données du projet (textes, couleurs, formules) |
| `components/` | Composants SVG et React réutilisables |
| `pages/` | Pages complètes du site |
| `utils/` | Fonctions utilitaires (géométrie, classes CSS) |

Chaque sous-dossier possède son propre fichier `README.md` détaillant son contenu.
