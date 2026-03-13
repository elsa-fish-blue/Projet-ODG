# Dossier `src/pages/` — Pages complètes du site

Ce dossier contient les deux pages principales du site.
Chaque page correspond à une URL définie dans `src/App.tsx`.

---

## Fichier `HomePage.tsx`

**URL associée :** `/` (page d'accueil)

**Structure de la page (de haut en bas) :**

1. **En-tête** : sous-titre discret ("Projet de Physique — Carte Mentale Interactive"), question principale en grand titre
2. **Introduction** : trois paragraphes de texte présentant le contexte du projet
3. **Encadré "Conseils de lecture"** : texte indiquant l'ordre logique de lecture des branches
4. **Instruction d'interaction** : conseil avec icône 💡 pour inviter à cliquer sur les bulles
5. **Carte mentale principale** : composant `MindMapMain` (question centrale + 3 sous-questions + boutons)
6. **Pied de page** : noms des membres du groupe, mention du projet et mention IA

**Données utilisées depuis `mindmap.ts` :**
- `MAIN_QUESTION` : question principale
- `READING_ORDER` : texte des conseils de lecture
- `GROUP_MEMBERS` : noms des membres

---

## Fichier `BranchPage.tsx`

**URL associée :** `/branch/:branchId` (page de détail d'une branche)

**Paramètre d'URL :** `branchId` prend l'une des trois valeurs : `caracteristiques`, `deviation`, `explosion`.

**Structure de la page (de haut en bas) :**

1. **En-tête** : titre de la branche et ligne décorative
2. **Boutons de navigation** : trois boutons pour passer d'une branche à l'autre (au-dessus de la carte)
3. **Carte mentale de la branche** : composant `MindMapBranch` (sous-question centrale + sous-sous-questions)
4. **Bouton retour** : lien vers la page d'accueil (sous la carte)
5. **Section "Développement des sous-questions"** : une carte par sous-sous-question, dans l'ordre du tableau (gauche → droite dans la carte, haut → bas dans la liste)
6. **Pied de page** : identique à la page d'accueil

**Fonctionnement du scroll automatique :**
Un clic sur un ovale dans la carte mentale appelle `scrollToSection(id)`, qui fait défiler la page jusqu'à la `<div>` correspondante grâce aux `useRef`. L'URL peut aussi contenir une ancre (`#masse` par exemple) pour naviguer directement vers une section au chargement.

**Gestion des erreurs :**
Si `branchId` ne correspond à aucune branche connue, la page affiche un message d'erreur et un bouton de retour à l'accueil.
