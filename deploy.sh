#!/bin/bash

# Script de déploiement sur GitHub Pages

set -e

echo "🚀 Déploiement sur GitHub Pages..."

# 1. Builder le projet
echo "📦 Build du projet..."
npm run build

# 2. Sauvegarder la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)

# 3. Vérifier si gh-pages existe localement
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📂 Basculage sur gh-pages..."
    git checkout gh-pages
else
    echo "📂 Création de la branche gh-pages..."
    git checkout --orphan gh-pages
    git rm -rf --cached . 2>/dev/null || true
fi

# 4. Copier le contenu de dist/
echo "📋 Copie des fichiers..."
cp -r dist/* .
rm -rf dist

# 5. Commit et push
echo "💾 Commit et push..."
git add -A
git commit -m "Deploy: mise à jour du site $(date +%Y-%m-%d)" || echo "Aucun changement à commit"
git push origin gh-pages --force

# 6. Retourner sur la branche précédente
echo "↩️  Retour sur $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo "✅ Déploiement terminé !"
echo "🌐 Site disponible sur : https://frd100.github.io/wpc-site-astro/"

