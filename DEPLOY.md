# Guide de déploiement sur GitHub Pages

## Déploiement depuis la branche `main`

Avec un projet HTML/CSS/JS pur, le déploiement est simple : on utilise directement la branche `main`.

### Configuration GitHub Pages

1. Dans les **Settings** du repository → **Pages** :
   - Source : **Deploy from a branch**
   - Branch : **main**
   - Folder : **/ (root)**

2. Le site sera disponible sur : `https://frd100.github.io/wpc-site-astro/`

### Déploiement

Pour déployer, il suffit de **push sur `main`** :

```bash
git add .
git commit -m "Deploy: mise à jour du site"
git push origin main
```

GitHub Pages se mettra à jour automatiquement après chaque push sur `main`.

### Structure du projet

Le projet est organisé comme suit :
```
wpc-site-astro/
├── index.html
├── equipe.html
├── contact.html
├── nous-rejoindre.html
├── mentions-legales.html
├── confidentialite.html
├── exercer-mes-droits.html
├── css/
│   ├── global.css
│   └── custom.css
├── js/
│   ├── utils.js
│   ├── button-animation.js
│   ├── header.js
│   ├── hero.js
│   ├── domaines-cards.js
│   └── timeline.js
└── public/
    ├── icons/
    ├── images/
    └── models/
```

### Développement local

Les fichiers HTML à la racine fonctionnent aussi bien en local qu'en production grâce à :
- `<base href='/wpc-site-astro/'>` dans chaque fichier HTML
- Chemins relatifs (`css/`, `js/`, `public/`) qui fonctionnent avec le base href

Pour tester en local, ouvrez simplement `index.html` dans votre navigateur ou utilisez un serveur local.
