# Checklist de Vérification Post-Installation

Une fois Node.js installé et `npm install` exécuté, suivez cette checklist pour vérifier que tout fonctionne.

## ✅ Installation

- [ ] Node.js installé (v18+)
- [ ] Dépendances installées : `npm install`
- [ ] Pas d'erreurs lors de l'installation

## ✅ Développement

- [ ] Serveur de dev démarre : `npm run dev`
- [ ] Site accessible sur http://localhost:4321
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Pas d'erreurs dans le terminal

## ✅ Vérifications Visuelles

### Page d'accueil (/)
- [ ] Hero section s'affiche correctement
- [ ] Animation SplitText du titre hero fonctionne
- [ ] Image banner avec effet parallaxe
- [ ] Section Expertise visible
- [ ] Section Domaines Cards visible (3 cartes)
- [ ] Section Timeline "NOS PROCESSUS" visible
- [ ] Footer présent

### Menu Navigation
- [ ] Logo cliquable (retour à l'accueil)
- [ ] Menu desktop visible (4 liens)
- [ ] Menu mobile : bouton hamburger visible sur mobile
- [ ] Menu mobile s'ouvre/ferme avec animation GSAP
- [ ] Menu mobile : liens fonctionnels
- [ ] Fermeture du menu au clic sur un lien

### Page Équipe (/equipe)
- [ ] Hero section "Notre Équipe"
- [ ] Texte intro animé au scroll
- [ ] 5 membres de l'équipe visibles
- [ ] Animations SplitText sur les noms des membres
- [ ] Liens LinkedIn fonctionnels

### Page Contact (/contact)
- [ ] Hero section "Contact"
- [ ] Informations de contact (adresse, email)
- [ ] Bouton "Voir sur Google Maps" fonctionnel
- [ ] Formulaire Tally chargé (iframe)
- [ ] Animation fade-in du formulaire au scroll

### Page Nous Rejoindre (/nous-rejoindre)
- [ ] Hero section "Carrière"
- [ ] Texte intro animé
- [ ] Formulaire Tally chargé (iframe)
- [ ] Animation fade-in du formulaire

### Pages Légales
- [ ] `/mentions-legales` : contenu visible
- [ ] `/confidentialite` : contenu visible
- [ ] `/exercer-mes-droits` : contenu visible + bouton email

## ✅ Animations GSAP

- [ ] Hero : SplitText titre fonctionne
- [ ] Hero : Parallaxe banner fonctionne
- [ ] Hero : Effet hover sur l'image (desktop)
- [ ] Expertise : Animation SplitText au scroll
- [ ] Domaines Cards : Animation fade-in au scroll
- [ ] Timeline : Animation séquentielle des étapes
- [ ] Équipe : Animation SplitText sur les noms
- [ ] Menu mobile : Animation slide reveal

## ✅ Responsive

- [ ] Mobile (< 768px) : Layout correct
- [ ] Tablet (768px - 1024px) : Layout correct
- [ ] Desktop (> 1024px) : Layout correct
- [ ] Menu mobile apparaît sur mobile
- [ ] Menu desktop apparaît sur desktop

## ✅ Build Production

- [ ] Build réussit : `npm run build`
- [ ] Dossier `dist/` créé
- [ ] Tous les fichiers générés
- [ ] Preview fonctionne : `npm run preview`
- [ ] Pas d'erreurs dans le build

## ✅ Performance

- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

## ⚠️ Points d'Attention

- [ ] Vérifier que GSAP charge depuis le CDN (dans la console réseau)
- [ ] Vérifier qu'il n'y a pas d'erreurs GSAP dans la console
- [ ] Tester sur Chrome, Firefox, Safari
- [ ] Vérifier les formulaires Tally (contact + candidature)

## 🐛 En cas d'erreur

### GSAP ne charge pas
- Vérifier la connexion internet
- Vérifier dans DevTools > Network que les scripts CDN se chargent
- Vérifier la console pour les erreurs CORS

### Animations ne fonctionnent pas
- Ouvrir la console du navigateur
- Vérifier que `waitForGSAP()` trouve GSAP
- Vérifier que les plugins sont bien enregistrés

### Styles Tailwind manquants
- Vérifier que Tailwind est dans `astro.config.mjs`
- Vérifier que `global.css` est importé dans `BaseLayout`
- Reconstruire : `npm run build`

### Build échoue
- Vérifier les erreurs dans le terminal
- Vérifier que tous les imports sont corrects
- Vérifier les chemins des images dans `public/`

