# Guide de Migration : Site Statique → Astro + Tailwind CSS + Vite

**Projet** : West Paris Consulting (wpc-site)  
**Date de création** : 2025  
**Objectif** : Migrer le site statique HTML/CSS/JS vers Astro + Tailwind CSS + Vite  
**Destinataire** : Future IA chargée d'exécuter la migration

---

## 📋 Table des matières

1. [Contexte et Objectifs](#contexte-et-objectifs)
2. [Architecture Actuelle](#architecture-actuelle)
3. [Architecture Cible](#architecture-cible)
4. [Stratégie de Migration](#stratégie-de-migration)
5. [Analyse du Code Inutilisé](#analyse-du-code-inutilisé)
6. [Gestion de GSAP](#gestion-de-gsap)
7. [Migration CSS → Tailwind](#migration-css--tailwind)
8. [Migration JavaScript](#migration-javascript)
9. [Migration HTML → Composants Astro](#migration-html--composants-astro)
10. [Optimisations et Performances](#optimisations-et-performances)
11. [Validation et Tests](#validation-et-tests)
12. [Checklist Opérationnelle](#checklist-opérationnelle)

---

## 1. Contexte et Objectifs

### 1.1 État Actuel

- **Type** : Site statique HTML/CSS/JS (7 pages HTML)
- **CSS** : `style.css` (~112 Kio, ~4740 lignes) avec variables CSS personnalisées
- **JavaScript** : `main.js` (~1100 lignes) avec GSAP 3.13.0 + plugins (SplitText, ScrollTrigger)
- **Structure** : Architecture plate (pas de build system)
- **Déploiement** : GitHub Pages

### 1.2 Objectifs de la Migration

- ✅ **Performance** : Réduire la taille du CSS de 15-20 Kio (112 Kio → ~92-97 Kio)
- ✅ **Maintenabilité** : Composer avec Astro (islands architecture, zéro JS par défaut)
- ✅ **Styles** : Migrer vers Tailwind CSS (utilitaires, cohérence, réduction code)
- ✅ **Build** : Intégrer Vite (HMR, optimisations automatiques)
- ✅ **Animations** : Conserver GSAP pour les animations complexes (SplitText, parallaxe)
- ✅ **Compatibilité** : Maintenir toutes les fonctionnalités existantes (animations, formulaires, responsive)

---

## 2. Architecture Actuelle

### 2.1 Structure des Fichiers

```
wpc-site/
├── index.html
├── equipe.html
├── contact.html
├── nous-rejoindre.html
├── confidentialite.html
├── mentions-legales.html
├── exercer-mes-droits.html
├── style.css (112 Kio, ~4740 lignes)
├── main.js (~1100 lignes)
├── images/
│   └── banner.webp
├── icons/
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── robots.txt
└── sitemap.xml
```

### 2.2 Technologies Utilisées

- **HTML5** : 7 pages statiques
- **CSS** : Variables CSS personnalisées (`--primary-blue`, `--spacing-*`, etc.)
- **JavaScript** : Vanilla JS avec GSAP 3.13.0
  - SplitText (plugin premium) pour découpage de texte
  - ScrollTrigger pour animations au scroll
  - TextPlugin pour animations de texte
- **Google Fonts** : Inter (300, 400, 500, 600, 700, 800)
- **Material Icons** : Icônes

### 2.3 Dépendances GSAP

```html
<!-- CDN GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/TextPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
```

### 2.4 Utilisations Principales de GSAP

1. **SplitText** (Hero, Expertise, Équipe)
   - Découpage de texte par mots/caractères
   - Animations d'apparition progressive

2. **ScrollTrigger** (Parallaxe, Timeline, Cartes)
   - Animations déclenchées au scroll
   - Parallaxe sur l'image banner hero
   - Timeline processus (étapes animées)

3. **Menu Mobile** (Slide reveal)
   - Animation de slide depuis la gauche
   - Stagger des liens du menu

4. **Boutons Flair** (Hover ripple effect)
   - Animation de cercle qui suit la souris

---

## 3. Architecture Cible

### 3.1 Structure Astro Recommandée

```
wpc-site-astro/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── HeroMinimal.astro
│   │   ├── Expertise.astro
│   │   ├── DomainesCards.astro
│   │   ├── Timeline.astro
│   │   ├── MobileMenu.astro
│   │   ├── Button.astro
│   │   └── TeamCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── equipe.astro
│   │   ├── contact.astro
│   │   ├── nous-rejoindre.astro
│   │   ├── confidentialite.astro
│   │   ├── mentions-legales.astro
│   │   └── exercer-mes-droits.astro
│   ├── styles/
│   │   └── global.css (Tailwind + custom CSS pour GSAP)
│   ├── scripts/
│   │   ├── gsap-init.ts
│   │   ├── animations.ts
│   │   └── utils.ts
│   └── assets/
│       ├── images/
│       └── icons/
├── public/
│   ├── images/
│   ├── icons/
│   ├── robots.txt
│   └── sitemap.xml
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

### 3.2 Configuration Recommandée

**Astro** : Mode statique (`output: 'static'`)  
**Tailwind CSS** : Mode JIT, purge automatique  
**Vite** : Optimisations d'assets (images, CSS, JS)  
**TypeScript** : Optionnel mais recommandé pour meilleure DX

---

## 4. Stratégie de Migration

### 4.1 Approche Progressive (Recommandée)

**NE PAS** migrer toutes les pages d'un coup. Procéder composant par composant :

1. **Phase 1** : Setup Astro + Tailwind + BaseLayout
2. **Phase 2** : Migrer les composants simples (Footer, Header)
3. **Phase 3** : Migrer les composants avec GSAP (Hero, Expertise, Timeline)
4. **Phase 4** : Migrer les pages (une par une, en commençant par la plus simple)
5. **Phase 5** : Optimisations et nettoyage

### 4.2 Ordre de Migration des Pages

| Priorité | Page | Complexité | Raison |
|----------|------|------------|--------|
| 1 | `mentions-legales.html` | ⭐ Faible | Pas d'animations GSAP, layout simple |
| 2 | `confidentialite.html` | ⭐ Faible | Similaire à mentions-legales |
| 3 | `exercer-mes-droits.html` | ⭐⭐ Moyenne | Formulaire à migrer |
| 4 | `contact.html` | ⭐⭐ Moyenne | Formulaire + animations simples |
| 5 | `nous-rejoindre.html` | ⭐⭐⭐ Élevée | Sections complexes |
| 6 | `equipe.html` | ⭐⭐⭐ Élevée | Animations GSAP (noms membres) |
| 7 | `index.html` | ⭐⭐⭐⭐ Très élevée | Hero complexe + toutes les sections |

### 4.3 Règle d'Or : Une Page = Un Commit

Chaque page migrée doit être :
- ✅ Fonctionnelle visuellement
- ✅ Testée sur mobile/tablet/desktop
- ✅ Animations GSAP vérifiées
- ✅ Committée séparément

**Ne pas** faire un commit monolithique "migration complète".

---

## 5. Analyse du Code Inutilisé

### 5.1 Objectif : Réduire le CSS de 15-20 Kio

**Avant migration** : Analyser et nettoyer le code inutilisé pour :
- Réduire la taille de `style.css` de 112 Kio à ~92-97 Kio
- Supprimer les fonctions JS non appelées
- Nettoyer les éléments HTML masqués

### 5.2 Méthode Recommandée : Analyse Croisée

**Étape 1** : Extraction des inventaires

Créer 3 fichiers JSON :

1. **`css-inventory.json`** : Tous les sélecteurs CSS (classes, IDs, attributs)
2. **`html-inventory.json`** : Toutes les classes/IDs utilisés dans les 7 HTML
3. **`js-inventory.json`** : Tous les sélecteurs utilisés dans `main.js`

**Étape 2** : Comparaison croisée

Classer les sélecteurs CSS en 4 catégories :

- ✅ **SAFE_TO_KEEP** : Trouvé dans HTML ou JS
- ⚠️ **PROBABLY_DYNAMIC** : Référencé uniquement dans JS (classe générée au runtime)
- ⚠️ **NEEDS_MANUAL_CHECK** : Usage ambigu ou conditionnel
- ❌ **LIKELY_UNUSED** : Absent de HTML ET JS, pas de parent actif

### 5.3 Zones Protégées (À NE JAMAIS SUPPRIMER)

#### 5.3.1 Classes GSAP Générées au Runtime

**Classes SplitText** (ajouter à whitelist) :
```css
.split-chars      /* Conteneurs de caractères */
.split-words      /* Conteneurs de mots */
.split-lines      /* Conteneurs de lignes */
.is-word          /* Marqueur sémantique (si activé) */
```

**Protection PurgeCSS** :
```javascript
safelist: {
  standard: ['split-chars', 'split-words', 'split-lines', 'is-word'],
  greedy: [/^split-/, /gsap/, /data-gsap/]
}
```

#### 5.3.2 Classes d'État JavaScript

**Classes ajoutées dynamiquement** (analyser `main.js` pour liste exhaustive) :
- `.active` : États d'interaction
- `.scroll-animation--in-viewport` : Marqueur de visibilité

**Méthode** : Rechercher toutes les occurrences de `classList.add`, `classList.remove`, `classList.toggle` dans `main.js`.

#### 5.3.3 Sélecteurs Conditionnels par Page

**Sélecteurs avec `body#page-*`** :
```css
body#page-wpc-index .hero { /* ... */ }
body#page-wpc-equipe .team-card { /* ... */ }
```

**Risque** : Si l'analyse ne charge qu'une page HTML, elle marquera les sélecteurs des autres pages comme inutilisés.

**Protection** : Marquer comme "à conserver" tous les sélecteurs avec `body#page-wpc-*`.

#### 5.3.4 Pseudo-classes et Pseudo-éléments

**Toujours conserver** :
- `:hover`, `:focus`, `:active`, `:checked`, `:disabled`
- `::before`, `::after`, `::placeholder`

**Raison** : Les outils d'analyse statique ne simulent pas les interactions utilisateur.

#### 5.3.5 Attributs GSAP

**Sélecteurs d'attributs utilisés par GSAP** :
```css
[animation-direction="below-custom"] { /* ... */ }
[data-speed] { /* parallax */ }
```

**Protection** : Vérifier manuellement l'usage dans `main.js` et les fichiers HTML.

### 5.4 Outils Recommandés pour l'Analyse

#### 5.4.1 PurgeCSS (Avant Migration)

**Configuration minimale** :
```javascript
// purgecss.config.js
module.exports = {
  content: [
    'index.html',
    'equipe.html',
    'contact.html',
    'nous-rejoindre.html',
    'confidentialite.html',
    'mentions-legales.html',
    'exercer-mes-droits.html',
    'main.js'
  ],
  css: ['style.css'],
  safelist: {
    standard: [
      'split-chars', 'split-words', 'split-lines', 'is-word',
      'active', 'scroll-animation--in-viewport'
    ],
    greedy: [/^split-/, /^gsap/, /data-gsap/, /^page-wpc-/]
  }
};
```

**Exécution** :
```bash
npx purgecss --config ./purgecss.config.js --output temp/
```

#### 5.4.2 Chrome DevTools Coverage

**Procédure** :
1. Ouvrir DevTools (F12)
2. Coverage (Cmd+Shift+P → "Show Coverage")
3. Recharger la page
4. Interagir (hover, scroll, clic)
5. Analyser : barres rouges = inutilisé, vertes = utilisé

**Important** : Tester chaque page HTML individuellement (7 enregistrements).

#### 5.4.3 Analyse AST JavaScript (Babel)

**Script d'analyse** :
```javascript
// analyze-unused-js.js
const fs = require('fs');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

const code = fs.readFileSync('main.js', 'utf-8');
const ast = babelParser.parse(code, { sourceType: 'module' });

const declared = new Set();
const referenced = new Set();

babelTraverse(ast, {
  FunctionDeclaration(path) {
    if (path.node.id) declared.add(path.node.id.name);
  },
  Identifier(path) {
    if (path.isReferencedIdentifier()) {
      referenced.add(path.node.name);
    }
  }
});

const unused = [...declared].filter(name => !referenced.has(name));
console.log('Fonctions/variables potentiellement inutilisées :', unused);
```

### 5.5 Checklist de Nettoyage Pré-Migration

- [ ] Extraire inventaire CSS (`css-inventory.json`)
- [ ] Extraire inventaire HTML (`html-inventory.json`)
- [ ] Extraire inventaire JS (`js-inventory.json`)
- [ ] Comparer les inventaires (générer `unused-code-analysis.json`)
- [ ] Créer whitelist GSAP exhaustive
- [ ] Identifier classes JS dynamiques (`classList.add/remove/toggle`)
- [ ] Exécuter PurgeCSS (test dans `temp/`)
- [ ] Valider visuellement (7 pages × 3 résolutions)
- [ ] Analyser `main.js` avec AST (identifier fonctions non appelées)
- [ ] Appliquer nettoyage (remplacer `style.css` et `main.js`)
- [ ] Tests Lighthouse avant/après

---

## 6. Gestion de GSAP

### 6.1 Stratégie : Approche Hybride

**Garder GSAP pour** :
- ✅ SplitText (hero, expertise, équipe) - **IRREMPLAÇABLE**
- ✅ ScrollTrigger avec scrub (parallaxe banner)
- ✅ Animations séquentielles complexes (timeline processus)
- ✅ Menu mobile (slide reveal)

**Migrer vers CSS natif pour** :
- ✅ Fade-in simples (cartes domaines)
- ✅ Apparitions au scroll basiques
- ✅ Hover effects simples
- ✅ États CSS (`:hover`, `:focus`)

### 6.2 Installation GSAP avec Astro

#### Option 1 : GSAP via npm (Recommandé)

```bash
npm install gsap
```

**Dans un composant Astro** :
```astro
---
// src/components/Hero.astro
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText'; // Si licence premium
import { ScrollTrigger } from 'gsap/ScrollTrigger';
---

<script>
  import { onMounted } from 'astro';
  
  onMounted(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    // Code GSAP existant
    const heroTitle = document.querySelector('.hero-title');
    // ...
  });
</script>
```

**Avantages** :
- ✅ Tree-shaking (Vite supprime le code inutilisé)
- ✅ Meilleure gestion des versions
- ✅ Intégration TypeScript

#### Option 2 : GSAP via CDN (Fallback)

Si SplitText n'est pas disponible via npm (licence premium) :
```astro
---
// src/layouts/BaseLayout.astro
---

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
</head>
```

### 6.3 Migration des Animations GSAP

#### Exemple : Hero Section avec SplitText

**Avant** (main.js) :
```javascript
function initNewHeroSplitText() {
    const dataText = document.querySelectorAll('.hero-title .line .text');
    const split = new SplitText(dataText, { type: 'words' });
    
    gsap.from(split.words, {
        duration: 0.6,
        opacity: 0,
        y: 40,
        ease: 'power3.out',
        stagger: 0.03
    });
}
```

**Après** (src/components/Hero.astro) :
```astro
---
// Hero.astro
---

<h1 class="hero-title">
  <span class="line">
    <span class="text">Texte animé</span>
  </span>
</h1>

<script>
  import { onMounted } from 'astro';
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  
  onMounted(() => {
    gsap.registerPlugin(SplitText);
    
    const dataText = document.querySelectorAll('.hero-title .line .text');
    if (dataText.length === 0) return;
    
    const split = new SplitText(dataText, { type: 'words' });
    
    gsap.from(split.words, {
        duration: 0.6,
        opacity: 0,
        y: 40,
        ease: 'power3.out',
        stagger: 0.03
    });
  });
</script>

<style>
  /* Styles Tailwind + custom pour GSAP */
  .hero-title {
    @apply text-4xl md:text-6xl font-bold;
  }
  
  /* Protection classes GSAP */
  .split-chars,
  .split-words,
  .split-lines {
    display: inline-block;
  }
</style>
```

### 6.4 Protection des Classes GSAP dans Tailwind

**tailwind.config.mjs** :
```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    // Classes GSAP
    'split-chars',
    'split-words',
    'split-lines',
    'is-word',
    // Classes d'état JS
    'active',
    'scroll-animation--in-viewport',
    // Patterns
    {
      pattern: /^split-/,
      pattern: /^gsap-/,
    }
  ],
  theme: {
    extend: {
      // Vos variables CSS existantes
      colors: {
        'primary-blue': '#1B86FF',
        // ...
      },
      spacing: {
        // Vos espacements existants
      },
    },
  },
};
```

---

## 7. Migration CSS → Tailwind

### 7.1 Conversion des Variables CSS

**Avant** (`style.css`) :
```css
:root {
    --primary-blue: #1B86FF;
    --spacing-xs: 0.25rem;
    --spacing-md: 1rem;
    --font-family-primary: 'Inter', sans-serif;
}
```

**Après** (`tailwind.config.mjs`) :
```javascript
export default {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1B86FF',
        'wpc-white': '#FFFFFF',
        'wpc-black': '#000000',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        // ... (reprendre toutes vos variables)
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        // ... (reprendre toutes vos tailles)
      },
    },
  },
};
```

### 7.2 Migration Progressive : Composant par Composant

**Règle** : Ne pas migrer tout `style.css` d'un coup. Migrer composant par composant.

#### Exemple : Footer

**Avant** (`style.css`) :
```css
.cmp-footer {
    background: #212529;
    padding: var(--spacing-xl) 0;
    color: var(--text-white);
}
```

**Après** (`src/components/Footer.astro`) :
```astro
<footer class="bg-gray-900 py-8 text-white">
  <!-- Contenu -->
</footer>
```

**Avantage** : Plus besoin de maintenir `.cmp-footer` dans le CSS.

### 7.3 Cas Spécifiques : Utiliser `@apply` ou CSS Custom

Pour les styles complexes ou récurrents :

**Option 1 : `@apply` (Tailwind)**
```astro
<style>
  .hero-title {
    @apply text-4xl md:text-6xl font-bold;
    /* Styles custom qui ne sont pas dans Tailwind */
    letter-spacing: 2px;
  }
</style>
```

**Option 2 : CSS Custom (si trop complexe)**
```astro
<style>
  .hero-title {
    font-size: clamp(2.4rem, 9vw, 5.2rem);
    /* Garder en CSS custom si Tailwind ne gère pas clamp() facilement */
  }
</style>
```

### 7.4 Classes BEM → Tailwind Utilities

**Avant** :
```html
<div class="cmp-domain-card">
  <div class="cmp-domain-card__header">
    <h3 class="cmp-domain-card__title">Titre</h3>
  </div>
</div>
```

**Après** :
```astro
<div class="relative bg-gray-800 rounded-2xl p-8">
  <div class="mb-4">
    <h3 class="text-xl font-medium text-white text-center">Titre</h3>
  </div>
</div>
```

**Ou avec composants Astro** :
```astro
---
// DomainCard.astro
const { title, description } = Astro.props;
---

<div class="relative bg-gray-800 rounded-2xl p-8">
  <div class="mb-4">
    <h3 class="text-xl font-medium text-white text-center">{title}</h3>
  </div>
  <p class="text-gray-300">{description}</p>
</div>
```

### 7.5 Garder du CSS Custom pour GSAP

**Fichier** : `src/styles/custom.css`

```css
/* Classes GSAP - NE PAS SUPPRIMER */
.split-chars {
    display: inline-block;
}

.split-words {
    display: inline-block;
    white-space: nowrap;
}

.split-lines {
    display: block;
    overflow: hidden;
}

/* Animations CSS personnalisées si besoin */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* États initiaux pour GSAP */
.huge-letters__title[animation-direction="below-custom"] .is-word:nth-of-type(odd) i:nth-child(odd) {
    transform: translateY(10rem);
}
```

**Importer dans BaseLayout** :
```astro
---
// src/layouts/BaseLayout.astro
---

<head>
  <link rel="stylesheet" href="/styles/custom.css">
</head>
```

---

## 8. Migration JavaScript

### 8.1 Conversion `main.js` → Modules Astro

**Stratégie** : Extraire chaque fonctionnalité en module/composant Astro.

#### Exemple : Menu Mobile

**Avant** (`main.js`) :
```javascript
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    // ... 100+ lignes de code
}
```

**Après** (`src/components/MobileMenu.astro`) :
```astro
---
// MobileMenu.astro
---

<button id="mobile-menu-toggle" class="md:hidden">
  <!-- Hamburger icon -->
</button>

<nav id="mobile-menu" class="hidden md:hidden">
  <!-- Menu items -->
</nav>

<script>
  import { onMounted } from 'astro';
  import { gsap } from 'gsap';
  
  onMounted(() => {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Code GSAP existant
    // ...
  });
</script>
```

### 8.2 Scripts Utilitaires

**Créer** : `src/scripts/utils.ts`

```typescript
// src/scripts/utils.ts

export function smoothScroll(target: string) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

### 8.3 Initialisation GSAP Centralisée

**Créer** : `src/scripts/gsap-init.ts`

```typescript
// src/scripts/gsap-init.ts

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGSAP() {
  gsap.registerPlugin(SplitText, ScrollTrigger);
  return { gsap, SplitText, ScrollTrigger };
}
```

**Utilisation dans un composant** :
```astro
<script>
  import { onMounted } from 'astro';
  import { initGSAP } from '../scripts/gsap-init';
  
  onMounted(() => {
    const { gsap, SplitText } = initGSAP();
    // Utiliser gsap et SplitText
  });
</script>
```

### 8.4 Migrer les Animations Simples vers CSS + IntersectionObserver

**Avant** (GSAP) :
```javascript
gsap.set(cards, { opacity: 0, y: 40 });
gsap.to(cards, {
    opacity: 1,
    y: 0,
    scrollTrigger: { trigger: '.container', start: 'top 50%' }
});
```

**Après** (CSS + IntersectionObserver) :
```astro
---
// DomainesCards.astro
---

<div class="domaines-container">
  {domaines.map((domaine) => (
    <div 
      class="opacity-0 translate-y-10 transition-all duration-800 ease-out"
      data-scroll-animate
    >
      <!-- Contenu -->
    </div>
  ))}
</div>

<script>
  import { onMounted } from 'astro';
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('[data-scroll-animate]').forEach(el => {
      observer.observe(el);
    });
  });
</script>
```

**Avantage** : 70% moins de code, meilleures performances.

---

## 9. Migration HTML → Composants Astro

### 9.1 Création du BaseLayout

**Fichier** : `src/layouts/BaseLayout.astro`

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = "West Paris Consulting - Association étudiante de conseil" } = Astro.props;
---

<!DOCTYPE html>
<html lang="fr-FR" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/icons/favicon.ico">
  
  <!-- Custom CSS for GSAP -->
  <link rel="stylesheet" href="/styles/custom.css">
</head>
<body>
  <Header />
  
  <main>
    <slot />
  </main>
  
  <Footer />
</body>
</html>

<style is:global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  /* Variables CSS globales si nécessaire */
  :root {
    /* ... */
  }
</style>
```

### 9.2 Exemple : Migration d'une Page Simple

**Avant** (`mentions-legales.html`) :
```html
<!DOCTYPE html>
<html lang="fr-FR">
<head>
  <!-- Head complet -->
</head>
<body id="page-wpc-mentions-legales">
  <!-- Navigation, contenu, footer -->
</body>
</html>
```

**Après** (`src/pages/mentions-legales.astro`) :
```astro
---
// src/pages/mentions-legales.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="Mentions Légales - West Paris Consulting"
  description="Mentions légales de West Paris Consulting"
>
  <section class="py-12 px-4 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-primary-blue">Mentions Légales</h1>
    <!-- Contenu -->
  </section>
</BaseLayout>
```

### 9.3 Migration des Formulaires

**Avant** (`contact.html`) :
```html
<form action="..." method="post">
  <input type="text" name="nom" class="form-input">
</form>
```

**Après** (`src/pages/contact.astro`) :
```astro
---
// src/pages/contact.astro
---

<form action="..." method="post" class="space-y-4">
  <input 
    type="text" 
    name="nom" 
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
  />
</form>
```

**Ou créer un composant** :
```astro
---
// src/components/FormInput.astro
interface Props {
  name: string;
  type?: string;
  label?: string;
  required?: boolean;
}

const { name, type = 'text', label, required = false } = Astro.props;
---

<div class="space-y-2">
  {label && (
    <label for={name} class="block text-sm font-medium text-gray-700">
      {label}
      {required && <span class="text-red-500">*</span>}
    </label>
  )}
  <input
    type={type}
    id={name}
    name={name}
    required={required}
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
  />
</div>
```

**Utilisation** :
```astro
<FormInput name="nom" label="Nom" required />
<FormInput name="email" type="email" label="Email" required />
```

---

## 10. Optimisations et Performances

### 10.1 Optimisation des Images

**Astro Image** :
```astro
---
// src/components/Hero.astro
import { Image } from 'astro:assets';
import bannerImage from '../../public/images/banner.webp';
---

<Image 
  src={bannerImage} 
  alt="West Paris Consulting"
  class="w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
/>
```

**Avantages** :
- ✅ Génération automatique de formats optimisés (WebP, AVIF)
- ✅ Responsive images automatiques
- ✅ Lazy loading par défaut

### 10.2 Optimisation des Fonts

**Preloading** (déjà fait dans BaseLayout) :
```astro
<link rel="preload" href="..." as="style">
```

**Font-display** :
```css
@font-face {
  font-family: 'Inter';
  font-display: swap;
}
```

### 10.3 Minification et Compression

**Vite** s'occupe automatiquement de :
- ✅ Minification CSS/JS
- ✅ Tree-shaking JavaScript
- ✅ Compression des assets
- ✅ Code splitting (si nécessaire)

### 10.4 Métriques Lighthouse Cibles

| Métrique | Avant | Objectif | Priorité |
|----------|-------|----------|----------|
| Performance Score | ~75-85 | ≥90 | 🔴 Critique |
| FCP (First Contentful Paint) | ? | <1.8s | 🔴 Critique |
| LCP (Largest Contentful Paint) | ? | <2.5s | 🔴 Critique |
| TBT (Total Blocking Time) | ? | <200ms | 🟡 Important |
| CLS (Cumulative Layout Shift) | ? | <0.1 | 🟡 Important |
| Unused CSS | ~40-50 Kio | <10 Kio | 🔴 Critique |
| Unused JS | ? | <5 Kio | 🟡 Important |

---

## 11. Validation et Tests

### 11.1 Checklist de Validation par Page

Pour chaque page migrée, vérifier :

#### Tests Visuels
- [ ] Layout identique (desktop, tablet, mobile)
- [ ] Typographie correcte (Inter, tailles, poids)
- [ ] Couleurs conformes (primary-blue, gris, etc.)
- [ ] Espacements cohérents

#### Tests d'Interaction
- [ ] Animations GSAP fonctionnent (si présentes)
- [ ] États `:hover` visibles
- [ ] États `:focus` sur formulaires
- [ ] Navigation responsive (menu mobile)

#### Tests Fonctionnels
- [ ] Liens internes/externes fonctionnels
- [ ] Formulaires soumissibles (si présents)
- [ ] Pas d'erreurs console JavaScript
- [ ] Pas d'erreurs réseau (404, etc.)

#### Tests Performance
- [ ] Lighthouse Performance ≥90 (mobile)
- [ ] Pas de régression FCP/LCP
- [ ] Images optimisées (WebP, dimensions)

### 11.2 Tests Automatisés (Optionnel mais Recommandé)

**Script Puppeteer pour Screenshots** :
```javascript
// scripts/take-screenshots.js
const puppeteer = require('puppeteer');
const fs = require('fs');

const pages = [
  'index',
  'equipe',
  'contact',
  // ...
];

(async () => {
  const browser = await puppeteer.launch();
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];
  
  for (const page of pages) {
    for (const viewport of viewports) {
      const pageObj = await browser.newPage();
      await pageObj.setViewport(viewport);
      await pageObj.goto(`http://localhost:4321/${page}`);
      await pageObj.waitForTimeout(2000); // Attendre animations GSAP
      await pageObj.screenshot({
        path: `screenshots/${page}-${viewport.name}.png`,
        fullPage: true,
      });
      await pageObj.close();
    }
  }
  
  await browser.close();
})();
```

**Comparaison avant/après** :
```bash
# Avant migration
npm run screenshots -- --output screenshots/before/

# Après migration
npm run screenshots -- --output screenshots/after/

# Comparer visuellement
```

### 11.3 Plan de Rollback

**En cas de régression** :

1. **Rollback Git** :
```bash
git revert HEAD
git push origin main
```

2. **Rollback Partiel** (CSS uniquement) :
```bash
git checkout <commit-avant> -- style.css
git commit -m "Rollback CSS suite à régressions"
```

3. **Backup Préventif** :
```bash
git checkout -b backup-before-migration
git push origin backup-before-migration
```

---

## 12. Checklist Opérationnelle

### 12.1 Phase 1 : Setup Initial

- [ ] Créer nouveau repo GitHub (`wpc-site-astro`)
- [ ] Initialiser Astro : `npm create astro@latest`
- [ ] Installer Tailwind : `npx astro add tailwind`
- [ ] Configurer `tailwind.config.mjs` (variables CSS → Tailwind)
- [ ] Créer `src/layouts/BaseLayout.astro`
- [ ] Configurer GSAP (npm ou CDN)
- [ ] Créer `src/styles/custom.css` (classes GSAP)
- [ ] Tester build : `npm run build`

### 12.2 Phase 2 : Composants de Base

- [ ] Créer `src/components/Header.astro`
- [ ] Créer `src/components/Footer.astro`
- [ ] Migrer styles Header → Tailwind
- [ ] Migrer styles Footer → Tailwind
- [ ] Tester Header/Footer sur toutes les pages

### 12.3 Phase 3 : Composants avec GSAP

- [ ] Créer `src/components/Hero.astro` (SplitText)
- [ ] Créer `src/components/HeroMinimal.astro` (parallaxe)
- [ ] Créer `src/components/MobileMenu.astro` (slide reveal)
- [ ] Créer `src/components/Timeline.astro` (ScrollTrigger)
- [ ] Tester toutes les animations GSAP

### 12.4 Phase 4 : Migration des Pages

**Page 1** : `mentions-legales.astro`
- [ ] Créer page Astro
- [ ] Migrer contenu HTML
- [ ] Migrer styles → Tailwind
- [ ] Tester visuellement (desktop, tablet, mobile)
- [ ] Commit : `feat: migrate mentions-legales page`

**Page 2** : `confidentialite.astro`
- [ ] Idem page 1
- [ ] Commit séparé

**Page 3** : `exercer-mes-droits.astro`
- [ ] Migrer formulaire RGPD
- [ ] Tester soumission
- [ ] Commit séparé

**Page 4** : `contact.astro`
- [ ] Migrer formulaire de contact
- [ ] Tester animations simples
- [ ] Commit séparé

**Page 5** : `nous-rejoindre.astro`
- [ ] Migrer sections complexes
- [ ] Commit séparé

**Page 6** : `equipe.astro`
- [ ] Migrer cartes équipe
- [ ] Tester animations GSAP (noms membres)
- [ ] Commit séparé

**Page 7** : `index.astro`
- [ ] Migrer hero complexe
- [ ] Migrer toutes les sections
- [ ] Tester toutes les animations GSAP
- [ ] Lighthouse audit (Performance ≥90)
- [ ] Commit séparé

### 12.5 Phase 5 : Optimisations Finales

- [ ] Nettoyer code inutilisé (analyse croisée)
- [ ] Optimiser images (Astro Image)
- [ ] Vérifier preloading fonts
- [ ] Lighthouse audit final (toutes les pages)
- [ ] Tests cross-browser (Chrome, Firefox, Safari)
- [ ] Déploiement test (Cloudflare Pages / Netlify)
- [ ] Validation finale
- [ ] Déploiement production (GitHub Pages)

---

## 13. Commandes Essentielles

### 13.1 Développement

```bash
# Démarrer le serveur de dev
npm run dev

# Build production
npm run build

# Preview build local
npm run preview
```

### 13.2 Nettoyage Code Inutilisé

```bash
# Analyse PurgeCSS
npm run purge-css

# Analyse JS (AST)
node scripts/analyze-unused-js.js

# Screenshots
npm run screenshots
```

### 13.3 Lighthouse

```bash
# Audit d'une page
lighthouse http://localhost:4321/index.html --view

# Audit toutes les pages (script)
npm run lighthouse:all
```

---

## 14. Ressources et Documentation

### 14.1 Documentation Officielle

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Vite Documentation](https://vitejs.dev/)

### 14.2 Guides Spécifiques

- [Astro + Tailwind Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [GSAP with Astro](https://greensock.com/docs/v3/Installation)

### 14.3 Outils Utiles

- [PurgeCSS](https://purgecss.com/)
- [Chrome DevTools Coverage](https://developer.chrome.com/docs/devtools/coverage/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Puppeteer](https://pptr.dev/)

---

## 15. Notes Importantes pour l'IA

### 15.1 Règles d'Or

1. **NE JAMAIS supprimer les classes GSAP** : `.split-chars`, `.split-words`, `.split-lines`, `.is-word`
2. **TOUJOURS tester visuellement** après chaque modification
3. **UN COMMIT PAR PAGE** : Ne pas faire de commit monolithique
4. **VALIDER AVANT DE CONTINUER** : Si une page est cassée, corriger avant de passer à la suivante
5. **GARDER LE CODE ACTUEL FONCTIONNEL** : Le repo original `wpc-site` ne doit jamais être modifié

### 15.2 Points d'Attention

- ⚠️ **SplitText est premium** : Vérifier la licence avant d'utiliser via npm
- ⚠️ **Les animations GSAP sont critiques** : Tester chaque animation individuellement
- ⚠️ **Les formulaires doivent fonctionner** : Tester la soumission réelle
- ⚠️ **Le responsive est obligatoire** : Tester mobile/tablet/desktop
- ⚠️ **Les performances sont un objectif** : Lighthouse ≥90 sur mobile

### 15.3 Ordre de Priorité des Erreurs

| Niveau | Type d'Erreur | Action |
|--------|---------------|--------|
| 🔴 **Critique** | Site ne s'affiche pas, erreurs JS bloquantes | **STOP** - Corriger immédiatement |
| 🟡 **Important** | Animations GSAP cassées, layout brisé | **ATTENTION** - Corriger avant de continuer |
| 🟢 **Mineur** | Styles légèrement différents, espacements | **NOTE** - Corriger en fin de migration |

---

**Fin du Guide**

Ce document doit servir de référence complète pour la migration. En cas de doute, revenir à ce guide et suivre les étapes dans l'ordre.

**Bonne migration ! 🚀**

