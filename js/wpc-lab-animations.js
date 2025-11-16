document.addEventListener('DOMContentLoaded', async () => {
  try {
    await waitForGSAP();
  } catch (error) {
    return;
  }

  const { gsap, SplitText, ScrollTrigger } = getGSAP();

  if (!gsap || !ScrollTrigger) {
    return;
  }

  // Vérifier qu'on est bien sur la page lab
  if (document.body.id !== 'page-wpc-lab') {
    return;
  }

  // Animation de l'intro (titre et texte) - style index page
  const introSection = document.querySelector('.wpc-lab-intro');
  if (introSection) {
    const introTitle = introSection.querySelector('h2');
    const introText = introSection.querySelector('p');

    // Animation du titre avec effet blur (comme index-sections.js)
    if (introTitle && SplitText) {
      const split = new SplitText(introTitle, { 
        type: 'words',
        wordsClass: 'word'
      });
      if (split.words && split.words.length > 0) {
        const allWords = [];
        allWords.push(...split.words);

        gsap.set(split.words, {
          filter: 'blur(20px)',
          opacity: 0
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: introTitle,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            allWords.forEach(word => {
              word.style.opacity = '1';
              word.style.filter = 'blur(0px)';
            });
          }
        });

        split.words.forEach((word, wordIndex) => {
          tl.to(word, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          }, wordIndex * 0.1);
        });
      }
    }

    // Animation du texte (comme index-sections.js)
    if (introText) {
      gsap.set(introText, { opacity: 0, y: 30 });
      gsap.to(introText, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: introText,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  // Animation des cartes (comme domaines-cards.js)
  const cards = document.querySelectorAll('.wpc-lab-card');
  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.1
    });
  });
});

