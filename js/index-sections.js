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

  const aboutTitle = document.querySelector('.index-section--about .index-stacked-title');
  const aboutText = document.querySelector('.index-section--about .index-stacked-text');

  if (aboutTitle && SplitText) {
    const split = new SplitText(aboutTitle, { type: 'words' });
    if (split.words && split.words.length > 0) {
      gsap.set(split.words, { opacity: 0, y: 40 });

      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: aboutTitle,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  if (aboutText) {
    gsap.set(aboutText, { opacity: 0, y: 30 });
    gsap.to(aboutText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutText,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  const ancrageTitle = document.querySelector('.index-section--ancrage .index-stacked-title');
  const ancrageText = document.querySelector('.index-section--ancrage .index-stacked-text');

  if (ancrageTitle && SplitText) {
    const split = new SplitText(ancrageTitle, { type: 'words' });
    if (split.words && split.words.length > 0) {
      gsap.set(split.words, { opacity: 0, y: 40 });
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: ancrageTitle,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  if (ancrageText) {
    gsap.set(ancrageText, { opacity: 0, y: 30 });
    gsap.to(ancrageText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ancrageText,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  const domaineTitle = document.querySelector('.index-section--domaines .index-domaines-main-title');
  const domaineSubtitle = document.querySelector('.index-section--domaines .index-section__subtitle');

  if (domaineTitle && SplitText) {
    const split = new SplitText(domaineTitle, { type: 'words' });
    if (split.words && split.words.length > 0) {
      gsap.set(split.words, { opacity: 0, y: 40 });

      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: domaineTitle,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  if (domaineSubtitle) {
    gsap.set(domaineSubtitle, { opacity: 0, y: 30 });
    gsap.to(domaineSubtitle, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: domaineSubtitle,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: 0.2
    });
  }

  const domaineCards = document.querySelectorAll('.index-domaine-card');
  domaineCards.forEach((card, index) => {
    const cardTitle = card.querySelector('.index-domaine-card__title');
    const cardList = card.querySelector('.index-domaine-card__list');

    if (cardTitle && SplitText) {
      const split = new SplitText(cardTitle, { type: 'words' });
      if (split.words && split.words.length > 0) {
        gsap.set(split.words, { opacity: 0, y: 30 });
        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: index * 0.1
        });
      }
    }

    if (cardList) {
      const listItems = cardList.querySelectorAll('li');
      gsap.set(listItems, { opacity: 0, x: -20 });
      gsap.to(listItems, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.1 + 0.2
      });
    }
  });

  const processusTitle = document.querySelector('.index-section--processus .index-section__title');

  if (processusTitle && SplitText) {
    const split = new SplitText(processusTitle, { type: 'words' });
    if (split.words && split.words.length > 0) {
      gsap.set(split.words, { opacity: 0, y: 40 });

      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: processusTitle,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  const processusItems = document.querySelectorAll('.index-section--processus .index-stacked-item');
  processusItems.forEach((item, index) => {
    const itemTitle = item.querySelector('.index-stacked-title');
    const itemText = item.querySelector('.index-stacked-text');

    if (itemTitle && SplitText) {
      const split = new SplitText(itemTitle, { type: 'words' });
      if (split.words && split.words.length > 0) {
        gsap.set(split.words, { opacity: 0, y: 40 });
        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    }

    if (itemText) {
      gsap.set(itemText, { opacity: 0, y: 20 });
      gsap.to(itemText, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: 0.1
      });
    }
  });

  const ctaTitle = document.querySelector('.index-section--cta .index-section__title');
  const ctaText = document.querySelector('.index-section--cta .index-section__text');
  const ctaButtons = document.querySelectorAll('.index-section--cta .index-button');

  if (ctaTitle && SplitText) {
    const split = new SplitText(ctaTitle, { type: 'words' });
    if (split.words && split.words.length > 0) {
      gsap.set(split.words, { opacity: 0, y: 40 });
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: ctaTitle,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  if (ctaText) {
    gsap.set(ctaText, { opacity: 0, y: 30 });
    gsap.to(ctaText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ctaText,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: 0.2
    });
  }

  ctaButtons.forEach((button, index) => {
    gsap.set(button, { opacity: 0, y: 20 });
    gsap.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: button,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: 0.4 + index * 0.1
    });
  });
});

