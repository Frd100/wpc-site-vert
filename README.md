# WPC Site Astro

Site web de West Paris Consulting migré vers Astro + Tailwind CSS + Vite.

## 🚀 Technologies

- **Astro** : Framework web moderne pour sites statiques
- **Tailwind CSS** : Framework CSS utility-first
- **GSAP** : Bibliothèque d'animations (via CDN)
- **Vite** : Build tool rapide

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:4321`

## 🏗️ Build

```bash
npm run build
```

Le build de production sera généré dans le dossier `dist/`

## 📄 Structure

```
├── src/
│   ├── components/      # Composants Astro réutilisables
│   ├── layouts/         # Layouts de base
│   ├── pages/           # Pages du site (routing automatique)
│   ├── scripts/         # Scripts utilitaires
│   └── styles/          # Styles globaux
├── public/              # Assets statiques (images, icons, etc.)
└── astro.config.mjs     # Configuration Astro
```

## 📝 Pages

- `/` - Page d'accueil
- `/equipe` - Notre équipe
- `/contact` - Contact
- `/nous-rejoindre` - Carrière
- `/mentions-legales` - Mentions légales
- `/confidentialite` - Politique de confidentialité
- `/exercer-mes-droits` - Exercer ses droits RGPD

## 🎨 Styles

Les styles utilisent Tailwind CSS avec des variables personnalisées définies dans `tailwind.config.mjs`.

Les classes GSAP (`.split-chars`, `.split-words`, etc.) sont protégées dans la safelist de Tailwind.

## ⚡ Performance

- Images optimisées automatiquement par Astro
- CSS purgé automatiquement par Tailwind
- JavaScript minimal (islands architecture d'Astro)
- GSAP chargé via CDN (SplitText premium)

## 📚 Documentation

Voir `GUIDE_MIGRATION_ASTRO_TAILWIND_VITE.md` pour les détails complets de la migration.

