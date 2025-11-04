# Bonnes Pratiques Web - Octobre 2025

## 📋 Table des matières
1. [Performance & Core Web Vitals](#performance--core-web-vitals)
2. [Accessibilité (WCAG 2.2)](#accessibilité-wcag-22)
3. [SEO & Référencement](#seo--référencement)
4. [Écoconception Web](#écoconception-web)
5. [Sécurité](#sécurité)
6. [Astro - Bonnes Pratiques](#astro---bonnes-pratiques)
7. [Tailwind CSS - Optimisations](#tailwind-css---optimisations)
8. [GSAP - Performance](#gsap---performance)
9. [Responsive Design & Mobile-First](#responsive-design--mobile-first)
10. [Structured Data & Schema.org](#structured-data--schemaorg)

---

## 🚀 Performance & Core Web Vitals

### Objectifs 2025

**Core Web Vitals (Google) :**
- **LCP (Largest Contentful Paint)** : < 2.5s
- **FID (First Input Delay)** / **INP (Interaction to Next Paint)** : < 100ms
- **CLS (Cumulative Layout Shift)** : < 0.1

### Bonnes Pratiques Implémentables

#### 1. Optimisation des Images
```astro
<!-- ✅ BONNE PRATIQUE -->
<img 
  src="/images/banner.webp"
  alt="Description"
  loading="lazy" 
  decoding="async"
  fetchpriority="high" <!-- Pour les images hero uniquement -->
/>
```

**Actions à prendre :**
- ✅ Utiliser le format WebP avec fallback
- ✅ Lazy loading pour toutes les images hors viewport
- ✅ `fetchpriority="high"` uniquement pour les images hero critiques
- ✅ Dimensions explicites (`width` et `height`) pour éviter CLS
- ✅ Utiliser `astro:assets` pour l'optimisation automatique

#### 2. Font Loading
```astro
<!-- ✅ OPTIMISATION FONTS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Amélioration recommandée :**
```css
/* Ajouter font-display: swap dans CSS personnalisé */
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Charge la police système en attendant */
}
```

#### 3. Script Loading
- ✅ GSAP chargé via CDN avec `defer` (déjà fait)
- ✅ Scripts inline déplacés en fin de body ou avec `defer`
- ⚠️ **À améliorer** : Précharger uniquement les scripts critiques

#### 4. CSS Optimization
- ✅ Tailwind purge automatiquement les classes inutilisées
- ✅ `safelist` pour protéger les classes GSAP dynamiques
- 💡 **Recommandation** : Minifier CSS en production (déjà géré par Astro)

#### 5. JavaScript Bundle Size
- ✅ Astro isole le JavaScript par composant (islands architecture)
- ✅ GSAP via CDN (pas de bundle)
- ⚠️ **À vérifier** : Vérifier que les composants Astro n'hydratent pas inutilement

---

## ♿ Accessibilité (WCAG 2.2)

### Niveau de Conformité : WCAG 2.2 AA (Minimum)

### Points Critiques à Vérifier

#### 1. Contraste des Couleurs
**Minimum requis :**
- Texte normal : Ratio 4.5:1
- Texte large (>18px) : Ratio 3:1
- Éléments non-textuels (boutons) : Ratio 3:1

**À vérifier sur le site :**
- ✅ Logo et navigation
- ✅ Texte sur fond coloré
- ✅ Boutons et liens

#### 2. Navigation au Clavier
**Checklist :**
- ✅ Tous les éléments interactifs accessibles au clavier
- ✅ Ordre de tabulation logique
- ✅ Indicateurs de focus visibles
- ⚠️ **À ajouter** : Skip links pour navigation rapide

**Amélioration recommandée :**
```html
<!-- Ajouter en début de body -->
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
```

#### 3. Attributs ARIA
**À implémenter :**
```astro
<!-- Navigation -->
<nav aria-label="Menu principal" role="navigation">
  <ul role="menubar">
    <li role="menuitem"><a href="/">Accueil</a></li>
  </ul>
</nav>

<!-- Sections -->
<section aria-labelledby="hero-title">
  <h1 id="hero-title">...</h1>
</section>

<!-- Formulaires -->
<form aria-labelledby="form-title">
  <label for="email">Email</label>
  <input type="email" id="email" aria-required="true" />
  <span role="alert" aria-live="polite" id="email-error"></span>
</form>
```

#### 4. Alternatives Textuelles
- ✅ Toutes les images doivent avoir `alt` descriptif
- ✅ Images décoratives : `alt=""`
- ⚠️ **À vérifier** : Toutes les images du site

#### 5. Landmarks Sémantiques
```html
<!-- Structure recommandée -->
<header role="banner">
<nav role="navigation" aria-label="Menu principal">
<main role="main" id="main-content">
  <article>...</article>
  <section aria-labelledby="section-title">...</section>
</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">
```

#### 6. Réduction de Mouvement
```css
/* Respecter prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🔍 SEO & Référencement

### Stratégies 2025 : GSEO (Generative SEO)

#### 1. Optimisation pour Moteurs de Recherche Génératifs

**Stratégie recommandée :**
- ✅ Contenu structuré et informatif (déjà bien fait)
- ✅ Structured Data JSON-LD (déjà implémenté)
- 💡 **À améliorer** : Ajouter plus de données structurées par page

**Structured Data à ajouter :**
```json
// Pour chaque page
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Titre de la page",
  "description": "Description",
  "url": "https://westparisconsulting.fr/page",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  }
}
```

#### 2. Contenu de Qualité

**Stratégie 2025 :**
- ✅ Privilégier 50-200 pages de haute qualité plutôt que quantité
- ✅ Mise à jour régulière du contenu
- ✅ Structure thématique en piliers (4-6 thèmes principaux)

**Votre site actuel :**
- ✅ Contenu structuré autour de votre expertise
- ✅ Pages ciblées et pertinentes
- ✅ Mises à jour régulières recommandées

#### 3. Meta Tags Optimisés

**Actuellement implémenté :**
```astro
<!-- ✅ Déjà bien fait -->
<meta property="og:title" content={title}>
<meta property="og:description" content={description}>
<meta property="og:image" content={ogImage}>
<meta property="og:url" content={ogUrl}>
```

**À ajouter :**
```astro
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content={title}>
<meta name="twitter:description" content={description}>
<meta name="twitter:image" content={ogImage}>

<!-- Canonical URL -->
<link rel="canonical" href={ogUrl}>

<!-- hreflang si version multilingue -->
<link rel="alternate" hreflang="fr" href="https://westparisconsulting.fr/" />
```

#### 4. Robots.txt & Sitemap

**À vérifier :**
- ✅ `robots.txt` présent
- ✅ `sitemap.xml` à jour
- ⚠️ **À améliorer** : Ajouter un sitemap dynamique généré par Astro

**Recommandation Astro :**
```bash
npm install @astrojs/sitemap
```

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

---

## 🌱 Écoconception Web

### Référentiel : "Écoconception web : les 115 bonnes pratiques" (5e édition, juin 2025)

### Principes Clés

#### 1. Optimisation des Ressources

**Images :**
- ✅ Format WebP (plus léger)
- ✅ Lazy loading
- 💡 **À améliorer** : Serveur de calcul côté serveur avec dimensions adaptatives

**CSS/JS :**
- ✅ Tailwind purge automatique
- ✅ GSAP via CDN (partagé entre sites)
- ✅ Minification automatique Astro

#### 2. Élimination des Fonctionnalités Non Essentielles
- ✅ Site épuré, pas de tracking excessif
- ✅ Animations légères (GSAP optimisé)
- ⚠️ **À éviter** : Ajout de bibliothèques lourdes inutiles

#### 3. Hébergement Écoresponsable
- 💡 **Recommandation** : Choisir un hébergeur vert (énergie renouvelable)
- ✅ Astro génère du statique (serveur léger)

#### 4. Mesures à Implémenter

**Métriques à surveiller :**
- Poids total de la page : < 500KB
- Nombre de requêtes HTTP : Minimiser
- Temps de chargement : < 2s

**Outils de mesure :**
- [Website Carbon Calculator](https://www.websitecarbon.com/)
- [GreenIT-Analysis](https://chrome.google.com/webstore/detail/greenit-analysis/mofbfhffeklkbebfclfaiifefjflcpad)

---

## 🔒 Sécurité

### OWASP Top 10 (2025)

#### 1. Protection des Données

**Formulaires :**
- ✅ Validation côté client ET serveur (si backend)
- ✅ Protection CSRF si formulaire backend
- ✅ Sanitisation des entrées

**Recommandation pour formulaires iframe (Tally) :**
- ✅ Vérifier que Tally utilise HTTPS
- ✅ Vérifier la politique de sécurité du iframe

#### 2. HTTPS
- ✅ Site en HTTPS obligatoire
- ✅ HSTS header recommandé

**À ajouter dans les headers :**
```javascript
// astro.config.mjs (si serveur)
export default defineConfig({
  output: 'static',
  // Headers via CDN/hébergeur
});
```

**Headers recommandés (via CDN/Vercel/Netlify) :**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
```

#### 3. Dependencies Security
**Action à faire régulièrement :**
```bash
npm audit
npm audit fix
```

**Outils recommandés :**
- [Snyk](https://snyk.io/)
- [Dependabot](https://github.com/dependabot) (GitHub)

#### 4. Content Security Policy (CSP)

**À ajouter pour sécuriser :**
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
           script-src 'self' https://cdnjs.cloudflare.com; 
           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
           font-src 'self' https://fonts.gstatic.com; 
           img-src 'self' data: https:; 
           connect-src 'self' https://tally.so;">
```

⚠️ **Attention** : Tester après ajout pour vérifier que tout fonctionne.

---

## ⚡ Astro - Bonnes Pratiques

### Architecture Islands

**Principe :** Astro envoie 0 JavaScript par défaut.

#### 1. Pas d'Hydratation Inutile

**Actuellement :**
- ✅ Scripts client dans `<script>` (pas d'hydratation)
- ✅ GSAP chargé via CDN

**À éviter :**
```astro
<!-- ❌ ÉVITER -->
<Component client:load /> <!-- Charge JS immédiatement -->
```

**À utiliser seulement si nécessaire :**
```astro
<!-- ✅ Si vraiment nécessaire -->
<Component client:visible /> <!-- Charge quand visible -->
<Component client:idle /> <!-- Charge quand idle -->
```

#### 2. Optimisation des Assets

**Astro Assets :**
```astro
---
import { Image } from 'astro:assets';
import banner from '../images/banner.webp';
---

<!-- ✅ Optimisation automatique -->
<Image src={banner} alt="Banner" />
```

**Avantages :**
- Format adaptatif (WebP, AVIF)
- Dimensions responsives
- Lazy loading automatique

**Recommandation :** Migrer progressivement vers `astro:assets`.

#### 3. Configuration Astro

**Actuelle :**
```javascript
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://westparisconsulting.fr',
});
```

**Améliorations possibles :**
```javascript
export default defineConfig({
  integrations: [
    tailwind(),
    // sitemap(), // Recommandé
  ],
  output: 'static',
  site: 'https://westparisconsulting.fr',
  
  // Compression
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined, // Astro gère automatiquement
        },
      },
    },
  },
  
  // Build optimisé
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto', // Inline les petits CSS
  },
});
```

#### 4. Prefetch & Preconnect

**Déjà bien fait :**
```astro
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**À ajouter pour CDN GSAP :**
```astro
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
```

---

## 🎨 Tailwind CSS - Optimisations

### Configuration Actuelle : ✅ Bien configurée

#### 1. Purge Automatique

**Actuellement :**
```javascript
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
safelist: [
  'split-chars',
  'split-words',
  // ...
],
```

**✅ Parfait** : Tailwind supprime automatiquement les classes inutilisées.

#### 2. JIT Mode (Just-In-Time)

**Par défaut activé dans Tailwind 3+** : Génère uniquement les classes utilisées.

#### 3. Extensions Personnalisées

**Votre configuration :**
- ✅ Couleurs personnalisées
- ✅ Espacements personnalisés
- ✅ Fonts personnalisées

**Recommandation :** Continuer à utiliser les extensions plutôt que des classes inline complexes.

#### 4. Production Build

**Vérifier la taille du CSS final :**
```bash
npm run build
# Vérifier dist/_astro/...css
```

**Objectif :** < 20KB CSS minifié (sans fonts).

---

## 🎬 GSAP - Performance

### Bonnes Pratiques d'Animation

#### 1. Chargement GSAP

**Actuel :**
```astro
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer></script>
```

**✅ Bien fait** : CDN avec `defer`.

**Amélioration possible :**
```astro
<!-- Preconnect pour CDN -->
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
```

#### 2. Optimisation des Animations

**Utiliser `will-change` avec parcimonie :**
```css
.element-animé {
  will-change: transform, opacity; /* ✅ Bon pour éléments animés */
}

/* ⚠️ Éviter sur trop d'éléments */
```

**GSAP best practices :**
```javascript
// ✅ BON : Utiliser transform plutôt que top/left
gsap.to(element, {
  x: 100, // ✅ Utilise transform
  // top: 100 // ❌ Éviter (reflow)
});

// ✅ BON : Kill les animations inutiles
gsap.killTweensOf(element);

// ✅ BON : Utiliser ScrollTrigger efficacement
ScrollTrigger.refresh(); // Si contenu dynamique
```

#### 3. Performance des Animations

**Checklist :**
- ✅ Utiliser `transform` et `opacity` uniquement
- ✅ Éviter d'animer `width`, `height`, `top`, `left`
- ✅ Utiliser `requestAnimationFrame` (GSAP le fait automatiquement)
- ✅ Réduire les animations sur `prefers-reduced-motion`

**Implémenté :**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### 4. Lazy Loading des Animations

**Actuel :** IntersectionObserver pour déclencher animations au scroll.

**✅ Bien fait** : Animations déclenchées seulement quand visibles.

---

## 📱 Responsive Design & Mobile-First

### Approche Mobile-First

**Principe :** Concevoir d'abord pour mobile, puis adapter pour desktop.

#### 1. Breakpoints Tailwind

**Par défaut :**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**✅ Votre site utilise déjà mobile-first.**

#### 2. Touch Targets

**Recommandation WCAG :**
- Minimum 44x44px pour éléments interactifs

**À vérifier :**
```css
/* Boutons et liens */
button, a {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem; /* Au minimum */
}
```

#### 3. Viewport Meta Tag

**Actuel :**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**✅ Correct.**

**Amélioration possible (si besoin) :**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

---

## 🏗️ Structured Data & Schema.org

### Données Structurées Actuelles

**Implémenté :**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "West Paris Consulting",
  // ...
}
```

### À Ajouter

#### 1. WebPage Schema (par page)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Titre de la page",
  "description": "Description",
  "url": "https://westparisconsulting.fr/page",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://westparisconsulting.fr/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Page actuelle",
        "item": "https://westparisconsulting.fr/page"
      }
    ]
  }
}
```

#### 2. FAQPage (si FAQ)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Question ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Réponse..."
    }
  }]
}
```

#### 3. LocalBusiness (si applicable)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "West Paris Consulting",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "200 Avenue de la République",
    "addressLocality": "Nanterre",
    "postalCode": "92000",
    "addressCountry": "FR"
  }
}
```

---

## 📊 Checklist de Vérification

### Performance
- [ ] LCP < 2.5s
- [ ] FID/INP < 100ms
- [ ] CLS < 0.1
- [ ] TTFB < 600ms
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Fonts optimisées (preload, font-display: swap)
- [ ] JavaScript minifié et optimisé
- [ ] CSS purgé et minifié

### Accessibilité
- [ ] Contraste 4.5:1 minimum
- [ ] Navigation clavier fonctionnelle
- [ ] Attributs ARIA appropriés
- [ ] Alternatives textuelles pour images
- [ ] Landmarks sémantiques
- [ ] Skip links
- [ ] Respect de prefers-reduced-motion

### SEO
- [ ] Meta tags optimisés
- [ ] Structured Data JSON-LD
- [ ] Sitemap.xml à jour
- [ ] Robots.txt correct
- [ ] URLs propres et descriptives
- [ ] Contenu structuré avec headings hiérarchiques

### Sécurité
- [ ] HTTPS activé
- [ ] Headers de sécurité (CSP, HSTS, etc.)
- [ ] Dependencies à jour (npm audit)
- [ ] Validation des formulaires
- [ ] Protection CSRF si backend

### Écoconception
- [ ] Poids total < 500KB
- [ ] Nombre de requêtes minimisé
- [ ] Hébergement écoresponsable
- [ ] Métriques carbon mesurées

---

## 🔗 Ressources Utiles

### Outils de Test
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Checker](https://wave.webaim.org/)
- [Website Carbon Calculator](https://www.websitecarbon.com/)

### Documentation
- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Docs](https://greensock.com/docs/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [Google Search Central](https://developers.google.com/search)

### Standards 2025
- [Écoconception Web - 115 bonnes pratiques](https://www.greenit.fr/2025/06/23/le-collectif-green-it-publie-la-5eme-edition-du-referentiel-ecoconception-web-les-115-bonnes-pratiques/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Dernière mise à jour :** Octobre 2025


