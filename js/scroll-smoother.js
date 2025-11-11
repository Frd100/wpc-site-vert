document.addEventListener('DOMContentLoaded', () => {
  // Vérifier la préférence utilisateur pour les animations réduites
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return;
  }

  // Vérifier si Lenis est disponible
  if (typeof Lenis === 'undefined') {
    return;
  }

  // Initialiser Lenis avec un scroll plus lourd
  const lenis = new Lenis({
    duration: 2.0, // Durée du smooth scroll (plus élevé = plus lent/lourd)
    easing: (t) => {
      // Courbe d'easing très lourde avec beaucoup d'inertie
      return 1 - Math.pow(1 - t, 4); // ease-out quartic (plus lourd que cubic)
    },
    smooth: true, // Activer le smooth scroll
    lerp: 0.06, // Linear interpolation - plus bas = plus lourd (0.06 = très lourd, défaut: 0.1)
    smoothTouch: 0.15, // Lourdeur sur mobile aussi
    touchMultiplier: 0.8, // Réduire la réactivité tactile pour plus de lourdeur
    wheelMultiplier: 0.5, // Réduire significativement la vitesse de scroll à la molette
    infinite: false, // Pas de scroll infini
  });

  // Fonction de raf pour Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Intégration avec GSAP ScrollTrigger si disponible
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // Synchroniser avec ScrollTrigger si disponible
    if (window.ScrollTrigger) {
      window.ScrollTrigger.update();
    }
  });

  // Exposer lenis globalement pour utilisation dans d'autres scripts
  window.lenis = lenis;

  // Méthode pour scroller vers un élément (pour les ancres)
  window.scrollToElement = (target, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: options.offset || 0,
        duration: options.duration || 1.2,
        easing: options.easing || (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };
});

