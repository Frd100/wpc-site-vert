document.addEventListener('DOMContentLoaded', async () => {

  try {
    await waitForGSAP();
  } catch (error) {
    return;
  }

  const { gsap, SplitText, ScrollTrigger } = getGSAP();

  if (!gsap || !SplitText) {
    return;
  }


  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && SplitText) {
    const dataText = document.querySelectorAll('.hero-title .line .text');
    if (dataText.length > 0) {
      const allWords = [];
      const tl = gsap.timeline({
        onComplete: () => {
          allWords.forEach(word => {
            word.style.opacity = '1';
            word.style.filter = 'blur(0px)';
          });
        }
      });

      dataText.forEach((textElement, lineIndex) => {
        const split = new SplitText(textElement, { type: 'words' });

        if (split.words && split.words.length > 0) {
          allWords.push(...split.words);
          gsap.set(split.words, {
            filter: 'blur(20px)',
            opacity: 0
          });

          split.words.forEach((word, wordIndex) => {
            tl.to(word, {
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out'
            }, 0.3 + lineIndex * 0.3 + wordIndex * 0.1);
          });
        }
      });
    }
  }

  const marqueeContainer = document.querySelector('.hero-marquee-container');
  const heroSection = document.querySelector('.hero-minimal');
  const heroContent = document.querySelector('.hero-container');
  const isMainPage = document.body.id === 'page-wpc-main';

  // Effet parallaxe sur la hero section (uniquement sur la page d'accueil)
  if (heroSection && heroContent && gsap && ScrollTrigger && isMainPage) {
    let parallaxTimelines = [];

    // Fonction pour calculer et appliquer l'effet parallaxe
    const setupParallax = () => {
      // Nettoyer les animations existantes
      parallaxTimelines.forEach(tl => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      });
      parallaxTimelines = [];

      // Calculer la hauteur de la hero section pour l'effet parallaxe
      const heroHeight = heroSection.offsetHeight;

      // Animation parallaxe pour le contenu principal
      const contentTl = gsap.to(heroContent, {
        y: heroHeight * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      parallaxTimelines.push(contentTl);

      // Animation parallaxe pour la bande défilante (plus rapide)
      if (marqueeContainer) {
        // S'assurer que la position initiale est bien à 0 avant de créer l'animation
        gsap.set(marqueeContainer, { y: 0 });
        const marqueeTl = gsap.to(marqueeContainer, {
          y: heroHeight * 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
        parallaxTimelines.push(marqueeTl);
      }
    };

    // Animation d'entrée de la bande défilante
    if (marqueeContainer && gsap) {
      gsap.set(marqueeContainer, { y: 15, opacity: 0 });
      const marqueeEntranceTl = gsap.to(marqueeContainer, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.5,
        onComplete: () => {
          marqueeContainer.style.opacity = '1';
          // S'assurer que la position y est bien à 0 avant de configurer l'effet parallaxe
          gsap.set(marqueeContainer, { y: 0 });
          // Attendre un court délai pour que le DOM soit complètement mis à jour
          setTimeout(() => {
            ScrollTrigger.refresh();
            setupParallax();
          }, 50);
        }
      });
    } else {
      // Si la bande défilante n'existe pas, configurer l'effet parallaxe immédiatement
      setupParallax();
    }

    // Recalculer lors du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupParallax();
      }, 250);
    });
  } else if (marqueeContainer && gsap) {
    // Animation d'entrée de la bande défilante (sans effet parallaxe si pas sur la page principale)
    gsap.set(marqueeContainer, { y: 15, opacity: 0 });
    gsap.to(marqueeContainer, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.5,
      onComplete: () => {
        marqueeContainer.style.opacity = '1';
        marqueeContainer.style.transform = 'translateY(0)';
      }
    });
  }
});

