# Carte Mentale Interactive — Projet de Physique 2026

Site web interactif présentant une carte mentale sur la question :
**« Est-ce crédible de dévier ou faire exploser avec une bombe atomique un astéroïde de la taille du Texas qui se précipite vers la Terre ? »**

---

## Contenu du dépôt

| Dossier / Fichier | Description |
|---|---|
| `index.html` | Point d'entrée HTML unique du site (chargé par le navigateur) |
| `src/` | Tout le code source du site (TypeScript/React) |
| `src/App.tsx` | Routeur principal : associe chaque URL à une page |
| `src/index.css` | Feuille de styles globale (polices, animations, couleurs de fond) |
| `src/main.tsx` | Point d'entrée JavaScript : monte l'application React dans le HTML |
| `src/data/` | Données du projet (questions, contenus, membres du groupe) |
| `src/components/` | Composants SVG réutilisables (cartes mentales, ovales, lignes) |
| `src/pages/` | Pages React complètes (accueil et page de branche) |
| `src/utils/` | Fonctions utilitaires (géométrie, classes CSS) |
| `package.json` | Liste de toutes les dépendances Node.js du projet |

---

## Prérequis

- **Node.js version 18 ou supérieure** doit être installé sur la machine.
  Vérification : ouvrir un terminal et taper `node --version`.
  Téléchargement si nécessaire : [https://nodejs.org](https://nodejs.org) (choisir la version LTS).

---

## Installation et lancement

1. **Ouvrir un terminal** dans le dossier racine du projet (celui qui contient ce fichier `README.md`).

2. **Installer les dépendances** (à faire une seule fois) :
   ```
   npm install
   ```
   Cette commande lit le fichier `package.json` et télécharge automatiquement toutes les bibliothèques nécessaires dans le dossier `node_modules/`.

3. **Démarrer le serveur local** :
   ```
   npm run dev
   ```

4. **Ouvrir le site** dans un navigateur à l'adresse affichée dans le terminal, généralement :
   ```
   http://localhost:5173
   ```

Le site fonctionne entièrement en local, aucune connexion Internet n'est nécessaire après l'installation.

---

## Modifier le contenu du site

### Noms des membres du groupe

Ouvrir le fichier `src/data/mindmap.ts` et modifier le tableau `GROUP_MEMBERS` :

```ts
export const GROUP_MEMBERS = [
  { name: "Prénom Nom 1" },
  { name: "Prénom Nom 2" },
  { name: "Prénom Nom 3" },
];
```

### Ajouter ou modifier le développement d'une sous-question

Dans `src/data/mindmap.ts`, chaque sous-sous-question possède un tableau `content`.
Deux types de blocs sont disponibles :

```ts
{ type: "text", value: "Texte explicatif en prose." }

{ type: "latex-block", value: "E = mc^2" }   // formule mathématique centrée

{ type: "latex", value: "v \\approx 20" }     // formule mathématique inline
```

---

## Notes techniques

- **Framework** : React 18 + Vite + TypeScript
- **Styles** : Tailwind CSS
- **Rendu LaTeX** : bibliothèque KaTeX (rendu côté client, sans serveur)
- **Routage** : React Router v6 (navigation entre pages sans rechargement)
- Le fichier `package.json` à la racine recense toutes les dépendances. La commande `npm install` suffit à tout installer.
