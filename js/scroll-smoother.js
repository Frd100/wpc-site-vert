document.addEventListener('DOMContentLoaded', () => {
  // Lenis smooth scroll désactivé - scroll natif du navigateur utilisé
  
  // Méthode pour scroller vers un élément (pour les ancres) - fallback natif
  window.scrollToElement = function(target, options = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };
});

