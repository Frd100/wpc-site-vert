document.addEventListener('DOMContentLoaded', async () => {
  try {
    await waitForGSAP();
  } catch (error) {
    return;
  }

  const { gsap, SplitText, ScrollTrigger } = getGSAP();
  
  if (!gsap || !SplitText || !ScrollTrigger) {
    return;
  }

  const subtitle = document.querySelector('.wpc-domaines-cards-subtitle');
  if (subtitle) {
    const split = new SplitText(subtitle, { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });

    tl.from(split.words, {
      duration: 0.5,
      opacity: 0,
      y: 40,
      ease: 'power3.out',
      stagger: 0.03
    });
  }

  const cards = document.querySelectorAll('.wpc-domaine-card');
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

