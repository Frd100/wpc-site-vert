# 🧹 Nettoyage des Fichiers Anciens

## ✅ Fichiers à SUPPRIMER (migration complète vers Astro)

### 📄 Fichiers HTML originaux (remplacés par `.astro`)
Ces fichiers ne sont plus utilisés, tout est maintenant dans `src/pages/*.astro` :

- `index.html` → `src/pages/index.astro`
- `equipe.html` → `src/pages/equipe.astro`
- `contact.html` → `src/pages/contact.astro`
- `nous-rejoindre.html` → `src/pages/nous-rejoindre.astro`
- `mentions-legales.html` → `src/pages/mentions-legales.astro`
- `confidentialite.html` → `src/pages/confidentialite.astro`
- `exercer-mes-droits.html` → `src/pages/exercer-mes-droits.astro`

### 📜 Fichiers JS/CSS originaux (remplacés par composants Astro)
- `main.js` → Fonctionnalités migrées dans `src/components/*.astro` et `src/scripts/*.ts`
- `style.css` → Styles migrés vers Tailwind + `src/styles/custom.css` et `src/styles/global.css`

### 📁 Dossiers en double (déjà dans `public/`)
- `icons/` → Déjà dans `public/icons/`
- `images/` → Déjà dans `public/images/`

### 📋 Fichiers en double à la racine
- `robots.txt` → Déjà dans `public/robots.txt`
- `sitemap.xml` → Déjà dans `public/sitemap.xml`

## ⚠️ Fichiers à CONSERVER

- `GUIDE_MIGRATION_ASTRO_TAILWIND_VITE.md` - Documentation de migration
- `README.md` - Documentation du projet
- Tous les fichiers dans `src/` - Code source Astro
- Tous les fichiers dans `public/` - Assets statiques
- `package.json`, `package-lock.json` - Dépendances
- `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json` - Configurations
- `.gitignore` - Configuration Git (si présent)
- Tous les fichiers `.md` de documentation

## 🚀 Commandes pour supprimer

```bash
# Supprimer les fichiers HTML originaux
rm index.html equipe.html contact.html nous-rejoindre.html mentions-legales.html confidentialite.html exercer-mes-droits.html

# Supprimer les fichiers JS/CSS originaux
rm main.js style.css

# Supprimer les dossiers/fichiers en double
rm -rf icons/ images/ robots.txt sitemap.xml
```

## ✨ Après nettoyage

Le projet ne contiendra plus que :
- ✅ Code source Astro (`src/`)
- ✅ Assets publics (`public/`)
- ✅ Configurations et dépendances
- ✅ Documentation

