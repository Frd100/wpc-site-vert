# Audit Technique & SEO - West Paris Consulting

**Date de l'audit :** 19 Novembre 2025  
**URL du site :** https://westparisconsulting.fr/

---

## 1. Résumé Exécutif

Le site de West Paris Consulting présente une base technique solide avec une structure HTML sémantique propre et une attention portée au design responsive. L'expérience utilisateur est fluide, et les animations (GSAP) sont intégrées sans nuire à la navigation.

Cependant, des améliorations sont possibles en termes de **maintenance du code** (duplication des en-têtes/pieds de page), d'**optimisation des images** (absence de formats modernes/responsive) et de **SEO avancé** (données structurées manquantes sur certaines pages, liens canoniques absents).

---

## 2. Audit Technique

### 2.1. Structure HTML & Sémantique
*   ✅ **DocType & Langue :** Le `<!DOCTYPE html>` est présent et l'attribut `lang="fr-FR"` est correctement défini sur toutes les pages.
*   ✅ **Balises Sémantiques :** Utilisation appropriée des balises `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` et `<footer>`. Cela favorise l'accessibilité et le SEO.
*   ✅ **Hiérarchie des Titres :** La structure des titres (`h1` -> `h2` -> `h3`) semble respectée sur la majorité des pages.
*   ⚠️ **Duplication de Code :** Le code du menu de navigation (`<nav>`) et du pied de page (`<footer>`) est copié-collé sur chaque page HTML. Cela rend la maintenance difficile (une modification nécessite de changer tous les fichiers).

### 2.2. CSS & Design Responsif
*   ✅ **Méthodologie :** Le fichier `wpc-design.css` utilise des variables CSS (`:root`) pour la gestion des couleurs et des espacements, ce qui facilite la maintenance du design system.
*   ✅ **Responsivité :** L'utilisation des Media Queries est cohérente. Le site s'adapte bien aux mobiles (menu burger, redimensionnement des grilles).
*   ✅ **Nommage :** La convention de nommage semble inspirée de BEM (Block Element Modifier), ce qui est une bonne pratique.

### 2.3. JavaScript & Performance
*   ✅ **Chargement des Scripts :** Les scripts sont chargés en fin de `<body>`, ce qui ne bloque pas l'affichage initial de la page.
*   ✅ **Modularité :** Utilisation de `common-template.js` pour le code partagé (menu mobile).
*   ⚠️ **Dépendances :** Le site dépend de GSAP (chargé via CDN). Assurez-vous que la version utilisée (3.13.0) reste compatible et performante.
*   ⚠️ **Images :** Les images sont servies via la balise `<img>` standard.
    *   *Recommandation :* Utiliser l'attribut `srcset` pour servir des images de tailles différentes selon l'écran, ou la balise `<picture>` pour le format WebP.
    *   *Note :* La gestion de la vidéo d'accueil (changement de source selon la largeur) est une excellente pratique de performance.

---

## 3. Audit SEO (Search Engine Optimization)

### 3.1. Balises Meta & Contenu
*   ✅ **Titres & Descriptions :** Toutes les pages auditées possèdent un `<title>` et une `<meta name="description">` uniques et pertinents.
*   ✅ **Open Graph :** Les balises Open Graph (`og:title`, `og:image`, etc.) sont présentes pour un bon affichage sur les réseaux sociaux (LinkedIn, etc.).
*   ⚠️ **Canoniques :** Aucune balise `<link rel="canonical" href="...">` n'est présente. C'est important pour éviter le contenu dupliqué (ex: `westparisconsulting.fr` vs `www.westparisconsulting.fr`).

### 3.2. Indexation
*   ✅ **Robots.txt :** Le fichier `robots.txt` est présent et valide. Il pointe correctement vers le sitemap.
*   ✅ **Sitemap.xml :** Le fichier `sitemap.xml` liste les pages principales avec leur fréquence de mise à jour.

### 3.3. Données Structurées (Schema.org)
*   ✅ **Page d'accueil :** Présence de données structurées `Organization` (JSON-LD) sur la page d'accueil.
*   ⚠️ **Autres pages :** Les pages comme "Contact" ou "Équipe" pourraient bénéficier de données structurées spécifiques (`ContactPage`, `Person`).

---

## 4. Accessibilité (A11y)

*   ✅ **Navigation Clavier :** Les éléments interactifs (liens, boutons) semblent accessibles au clavier.
*   ✅ **Attributs ARIA :** Le bouton du menu mobile utilise correctement `aria-label` et `aria-expanded`.
*   ✅ **Textes Alternatifs :** Les images possèdent des attributs `alt`.
*   ⚠️ **Contraste :** Vérifier le contraste du texte blanc sur fond vert (`--teal-light`) pour s'assurer qu'il respecte le ratio WCAG AA (4.5:1), surtout pour les petits textes.

---

## 5. Recommandations Prioritaires

1.  **Ajouter les balises Canoniques :**
    *   Ajouter `<link rel="canonical" href="https://westparisconsulting.fr/page-actuelle.html">` dans le `<head>` de chaque page.

2.  **Optimisation des Images :**
    *   Convertir les images (PNG) en format WebP pour réduire leur poids.
    *   Utiliser l'attribut `loading="lazy"` sur les images en dessous de la ligne de flottaison.

3.  **Maintenance (Refactoring) :**
    *   Si le site grossit, envisager d'utiliser un générateur de site statique (comme Jekyll, Hugo, ou même un simple script PHP/JS de build) pour inclure le Header et le Footer dynamiquement et éviter la duplication de code.

4.  **Sécurité :**
    *   Vérifier les en-têtes de sécurité (HSTS, X-Content-Type-Options) au niveau de la configuration serveur/Cloudflare (hors du scope de l'analyse de code source, mais crucial).

5.  **Mentions Légales & RGPD :**
    *   Le bandeau cookie est géré en JS (`common-template.js`). S'assurer que le blocage des traceurs est effectif tant que l'utilisateur n'a pas accepté (si des traceurs tiers comme Google Analytics sont ajoutés à l'avenir).

