import subprocess
import sys
import os
import time
import webbrowser

# Dossier racine du projet (là où se trouve ce fichier)
dossier = os.path.dirname(os.path.abspath(__file__))

print("=================================================")
print("   Lancement du site - Projet de Physique 2026  ")
print("=================================================")
print()

# Étape 1 : vérifier que npm est installé sur l'ordinateur
print("Étape 1/3 : Vérification de npm...")
try:
    subprocess.run(["npm", "--version"], check=True, capture_output=True)
    print("  → npm est bien installé.")
except FileNotFoundError:
    print()
    print("ERREUR : npm n'est pas installé sur cet ordinateur.")
    print("Veuillez installer Node.js depuis : https://nodejs.org")
    print("Puis relancez ce fichier.")
    input("\nAppuyez sur Entrée pour fermer...")
    sys.exit(1)

print()

# Étape 2 : installer les dépendances (node_modules) si elles sont absentes
print("Étape 2/3 : Installation des dépendances (npm install)...")
if not os.path.exists(os.path.join(dossier, "node_modules")):
    print("  → Dossier node_modules absent, installation en cours...")
    print("  (Cela peut prendre 1 à 2 minutes la première fois)")
    resultat = subprocess.run(
        ["npm", "install"],
        cwd=dossier
    )
    if resultat.returncode != 0:
        print()
        print("ERREUR : L'installation des dépendances a échoué.")
        input("\nAppuyez sur Entrée pour fermer...")
        sys.exit(1)
    print("  → Dépendances installées avec succès.")
else:
    print("  → Dépendances déjà installées, étape ignorée.")

print()

# Étape 3 : lancer le serveur de développement Vite
print("Étape 3/3 : Lancement du serveur...")
print("  → Le site sera accessible à l'adresse : http://localhost:5173")
print()
print("  (Pour arrêter le serveur, fermez cette fenêtre)")
print()
print("=================================================")

# Attendre 3 secondes puis ouvrir automatiquement le navigateur
time.sleep(3)
webbrowser.open("http://localhost:5173")

# Lancer npm run dev (bloquant : le terminal reste ouvert tant que le serveur tourne)
subprocess.run(
    ["npm", "run", "dev"],
    cwd=dossier
)
