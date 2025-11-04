# 🎯 Améliorations Prioritaires - Octobre 2025

Basé sur les bonnes pratiques 2025, voici les améliorations à apporter au site WPC par ordre de priorité.

## 🔴 Priorité Haute (Impact Critique)

### 1. Accessibilité - Skip Links
**Problème :** Les utilisateurs au clavier doivent tabuler à travers toute la navigation.

**Solution :**
```astro
<!-- À ajouter dans BaseLayout.astro, juste après <body> -->
<a href="#main-content" class="skip-link sr-only focus:not-sr-only">
  Aller au contenu principal
</a>
```

```css
/* À ajouter dans custom.css */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #1B86FF;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 8px;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 2. Accessibilité - Contraste des Couleurs
**Action :** Vérifier tous les contrastes avec [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Zones à vérifier :**
- Navigation (fond #202229, texte blanc)
- Boutons
- Liens hover

### 3. Performance - Preconnect pour GSAP CDN
**Fichier :** `src/layouts/BaseLayout.astro`

**Ajouter avant les scripts GSAP :**
```astro
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
```

### 4. SEO - Sitemap Dynamique
**Installation :**
```bash
npm install @astrojs/sitemap
```

**Configuration :** `astro.config.mjs`
```javascript
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
  // ...
});
```

### 5. Sécurité - Headers de Sécurité
**Si hébergé sur Vercel/Netlify :** Configurer via fichiers de configuration.

**Vercel (`vercel.json`) :**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 🟡 Priorité Moyenne (Impact Important)

### 6. Accessibilité - Attributs ARIA Manquants
**À ajouter dans Header.astro :**
```astro
<nav class="main-navigation bg-gray-900 w-full" role="navigation" aria-label="Menu principal">
  <div class="main-navigation__container w-full mx-0 px-6 md:px-6">
    <div class="main-navigation__content flex justify-start items-center m-0 py-4 pl-8 gap-12 relative" role="menubar">
      <!-- ... -->
    </div>
  </div>
</nav>
```

### 7. Performance - Images avec astro:assets
**Migration progressive :** Remplacer les balises `<img>` par `<Image>` d'Astro.

**Exemple Hero.astro :**
```astro
---
import { Image } from 'astro:assets';
import banner from '../../public/images/banner.webp';
---

<Image src={banner} alt="..." loading="eager" fetchpriority="high" />
```

### 8. SEO - Meta Tags Twitter Card
**Fichier :** `src/layouts/BaseLayout.astro`

**Ajouter :**
```astro
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content={title}>
<meta name="twitter:description" content={description}>
<meta name="twitter:image" content={ogImage}>
```

### 9. SEO - Canonical URL
**Fichier :** `src/layouts/BaseLayout.astro`

**Ajouter dans `<head>` :**
```astro
<link rel="canonical" href={ogUrl}>
```

### 10. Accessibilité - Reduced Motion
**Fichier :** `src/styles/custom.css`

**Ajouter :**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Désactiver animations GSAP si possible */
  [data-gsap] {
    animation: none !important;
  }
}
```

### 11. Performance - Audit des Dependencies
**Action immédiate :**
```bash
npm audit
npm audit fix
```

**Action récurrente :** Mettre à jour régulièrement les dépendances.

---

## 🟢 Priorité Basse (Améliorations Futures)

### 12. Structured Data - Breadcrumbs
Ajouter des breadcrumbs sur chaque page avec Schema.org.

### 13. Performance - Service Worker (PWA)
Transformer en PWA pour cache offline et performance.

### 14. Écoconception - Métriques Carbon
Mesurer l'empreinte carbone du site avec [Website Carbon Calculator](https://www.websitecarbon.com/).

### 15. SEO - Rich Snippets
Ajouter des rich snippets pour FAQ, Reviews, etc.

---

## ✅ Déjà Bien Fait

- ✅ Structured Data Organization
- ✅ Meta tags Open Graph
- ✅ Lazy loading images
- ✅ GSAP via CDN avec defer
- ✅ Tailwind purgé automatiquement
- ✅ Fonts optimisées avec preload
- ✅ Architecture Astro optimale (islands)
- ✅ Mobile-first design
- ✅ Animations optimisées (transform/opacity)

---

## 📝 Plan d'Action Recommandé

### Semaine 1
1. Skip links (15 min)
2. Preconnect GSAP (5 min)
3. Audit npm (10 min)
4. Vérification contrastes (30 min)

### Semaine 2
5. Sitemap dynamique (30 min)
6. Meta Twitter Card (10 min)
7. Canonical URL (5 min)
8. Reduced motion CSS (15 min)

### Semaine 3
9. Headers de sécurité (selon hébergeur)
10. Attributs ARIA (1h)
11. Migration images vers astro:assets (progressive)

---

**Note :** Les améliorations prioritaires ont été sélectionnées pour leur impact élevé sur l'accessibilité, le SEO et la performance, avec un effort minimal d'implémentation.

