# Récapitulatif des Animations - West Paris Consulting

## Bibliothèques Utilisées

- **GSAP 3.13.0** (GreenSock Animation Platform)
- **SplitText** (plugin GSAP pour diviser le texte)
- **ScrollTrigger** (plugin GSAP pour déclencher les animations au scroll)

---

## Liste des Animations

### 1. Animation du Titre Hero (Page d'accueil)
**Fichier :** `js/animations.js` - `initHeroTitleAnimation()`

- **Élément ciblé :** `.hero-section__title`
- **Type :** Animation au chargement (pas de ScrollTrigger)
- **Effet :** 
  - SplitText divise le titre en mots
  - Chaque mot apparaît avec un effet de blur (flou) qui se dissipe
  - Opacité : 0 → 1
  - Blur : 20px → 0px
- **Timing :** 
  - Durée : 0.8s par mot
  - Délai entre mots : 0.1s
  - Easing : `power2.out`

---

### 2. Animation de la Description Hero
**Fichier :** `js/animations.js` - `initHeroDescriptionAnimation()`

- **Élément ciblé :** `.hero-section__description`
- **Type :** Animation au chargement (pas de ScrollTrigger)
- **Effet :**
  - Apparition depuis le bas (y: 30 → 0)
  - Opacité : 0 → 1
- **Timing :**
  - Durée : 0.8s
  - Délai : 0.3s (après le titre)
  - Easing : `power2.out`

---

### 3. Animation des Sections de Contenu (ScrollTrigger)
**Fichier :** `js/animations.js` - `initContentSectionsAnimation()`

#### 3.1. Animation des Titres de Section
- **Élément ciblé :** `.content-section__title` (sauf `.content-section--green`)
- **Type :** ScrollTrigger
- **Effet :**
  - SplitText divise le titre en mots
  - Chaque mot apparaît depuis le bas avec un effet de stagger
  - Opacité : 0 → 1
  - Position Y : 40px → 0
- **Timing :**
  - Durée : 0.6s par mot
  - Stagger : 0.05s entre chaque mot
  - Easing : `power3.out`
- **ScrollTrigger :**
  - Trigger : Le titre lui-même
  - Start : `top 85%` (quand le haut du titre atteint 85% de la fenêtre)
  - ToggleActions : `play none none none` (joue une seule fois)

#### 3.2. Animation du Texte de Section
- **Élément ciblé :** `.content-section__text` (sauf dans `.content-section--green`)
- **Type :** ScrollTrigger
- **Effet :**
  - Apparition depuis le bas
  - Opacité : 0 → 1
  - Position Y : 30px → 0
- **Timing :**
  - Durée : 0.4s
  - Délai : 0.1s
  - Easing : `power2.out`
- **ScrollTrigger :**
  - Trigger : Le texte lui-même
  - Start : `top 85%`
  - ToggleActions : `play none none none` (une seule fois)
  - Once : true

---

### 4. Animation "Qui sommes-nous ?" (ScrollTrigger)
**Fichier :** `js/animations.js` - `initQuiSommesNousAnimation()`

#### 4.1. Animation du Titre
- **Élément ciblé :** `.content-section--green .content-section__title--large`
- **Type :** ScrollTrigger
- **Effet :**
  - Apparition depuis le bas
  - Opacité : 0 → 1
  - Position Y : 30px → 0
- **Timing :**
  - Durée : 0.4s
  - Délai : 0.1s
  - Easing : `power2.out`
- **ScrollTrigger :**
  - Trigger : `.content-section--green` (la section complète)
  - Start : `top 85%`
  - ToggleActions : `play none none none`
  - Once : true

#### 4.2. Animation du Texte Intro
- **Élément ciblé :** `.content-section--green .content-section__text--intro`
- **Type :** ScrollTrigger
- **Effet :**
  - Apparition depuis le bas
  - Opacité : 0 → 1
  - Position Y : 30px → 0
- **Timing :**
  - Durée : 0.4s
  - Délai : 0.1s
  - Easing : `power2.out`
- **ScrollTrigger :**
  - Trigger : Le texte intro lui-même
  - Start : `top 80%` (se déclenche un peu plus tôt que le titre)
  - ToggleActions : `play none none none`
  - Once : true

---

### 5. Animation de l'Intro de la Section Domaines (ScrollTrigger)
**Fichier :** `js/animations.js` - `initDomainesIntroAnimation()`

- **Éléments ciblés :**
  - `.domaines-section__intro-label` (label "NOS DOMAINES D'EXPERTISE")
  - `.domaines-section__intro-text` (texte d'introduction)
- **Type :** ScrollTrigger (animation simultanée)
- **Effet :**
  - Apparition simultanée des deux éléments depuis le bas
  - Opacité : 0 → 1
  - Position Y : 30px → 0
- **Timing :**
  - Durée : 0.4s
  - Délai : 0.1s
  - Easing : `power2.out`
- **ScrollTrigger :**
  - Trigger : `.domaines-section__intro` (le container)
  - Start : `top 85%`
  - ToggleActions : `play none none none`
  - Once : true

---

### 6. Animation des Carrés de Domaines (ScrollTrigger)
**Fichier :** `js/animations.js` - `initDomainesItemsAnimation()`

- **Élément ciblé :** `.domaine-item` (tous les carrés de domaines)
- **Type :** ScrollTrigger (chaque carré animé individuellement)
- **Effet :**
  - Apparition depuis le bas
  - Opacité : 0 → 1
  - Position Y : 30px → 0
- **Timing :**
  - Durée : 0.4s
  - Délai : 0.1s
  - Easing : `power2.out`
- **ScrollTrigger :**
  - Trigger : Chaque carré individuellement
  - Start : `top 85%`
  - ToggleActions : `play none none none`
  - Once : true

---

## Paramètres Communs

### Easing Functions Utilisées
- `power2.out` : Utilisé pour la plupart des animations (démarrage rapide, fin douce)
- `power3.out` : Utilisé pour les titres avec SplitText (effet plus prononcé)

### ScrollTrigger - Paramètres Standards
- **Start :** `top 85%` (l'animation se déclenche quand l'élément atteint 85% de la hauteur de la fenêtre)
- **ToggleActions :** `play none none none` (joue une seule fois, ne se répète pas)
- **Once :** `true` (pour certaines animations, garantit une seule exécution)

### Optimisations Performance
- Utilisation de `willChange: 'opacity, transform'` pendant l'animation
- Réinitialisation de `willChange: 'auto'` après l'animation (dans `onComplete`)

---

## Pages Concernées

Toutes les animations sont initialisées sur **toutes les pages** qui chargent `animations.js`, mais elles ne s'activent que si les éléments correspondants sont présents dans le DOM :

- **Page d'accueil (`index.html`) :** Toutes les animations
- **Page Équipe (`equipe.html`) :** Animations hero + sections de contenu
- **Page Contact (`contact.html`) :** Animations hero + sections de contenu
- **Page WPC Lab (`wpc-lab.html`) :** Animations hero + sections de contenu
- **Page Nous Rejoindre (`nous-rejoindre.html`) :** Animations hero + sections de contenu
- **Pages légales :** Animations hero + sections de contenu

---

## Notes Techniques

1. **Gestion des Erreurs :** Le code vérifie la disponibilité de GSAP avant d'initialiser les animations
2. **Compatibilité :** Utilisation de `waitForGSAP()` pour s'assurer que GSAP est chargé avant d'exécuter les animations
3. **Exclusions :** La section `.content-section--green` a ses propres animations et est exclue de l'animation standard des sections
4. **SplitText :** Utilisé uniquement pour les titres hero et les titres de section (pas pour les textes simples)

