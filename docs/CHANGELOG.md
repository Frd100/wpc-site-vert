# Changelog

## Migration vers Astro + Tailwind CSS + Vite

### ✅ Optimisations effectuées

1. **GSAP via CDN**
   - Retrait de GSAP de package.json (utilisation CDN)
   - Ajout de `defer` sur les scripts GSAP pour meilleur chargement
   - Création de fonctions utilitaires `waitForGSAP()` et `getGSAP()` pour gérer le chargement asynchrone
   - Fallback pour menu mobile si GSAP ne charge pas

2. **Images optimisées**
   - Ajout de `loading="eager"` et `fetchpriority="high"` sur l'image banner hero
   - Images dans le dossier `public/` pour servir directement

3. **Code organisé**
   - Séparation des styles custom dans `custom.css`
   - Création de `utils.ts` avec fonctions utilitaires réutilisables
   - Amélioration de la gestion d'erreurs pour GSAP

4. **Structure**
   - Tous les composants utilisent maintenant `waitForGSAP()` pour s'assurer que GSAP est chargé
   - Gestion d'erreurs améliorée dans tous les scripts
   - Code plus maintenable et robuste

### 📝 Notes

- GSAP est maintenant gratuit depuis avril 2024 (plus besoin de licence premium)
- Tous les scripts attendent le chargement de GSAP depuis le CDN avant de s'exécuter
- Le menu mobile fonctionne même si GSAP ne charge pas (fallback CSS)

