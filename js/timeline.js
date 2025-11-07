document.addEventListener('DOMContentLoaded', async () => {
  try {
    await waitForGSAP();
  } catch (error) {
    return;
  }

  const { gsap, ScrollTrigger } = getGSAP();
  
  if (!gsap || !ScrollTrigger) {
    return;
  }

  const hugeLetters = document.querySelectorAll('.huge-letters__title');
  
  hugeLetters.forEach((title) => {
    const words = title.querySelectorAll('.is-word');
    
    words.forEach((word) => {
      const letters = word.querySelectorAll('i');
      
      letters.forEach((letter, index) => {
        if (index % 2 === 0) {
          gsap.set(letter, { transform: 'translateY(10rem)' });
        } else {
          gsap.set(letter, { transform: 'translateY(20rem)' });
        }
      });
    });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => {
        words.forEach((word) => {
          const letters = word.querySelectorAll('i');
          letters.forEach((letter, index) => {
            gsap.to(letter, {
              transform: 'translateY(0)',
              duration: index % 2 === 0 ? 0.5 : 0.6,
              ease: 'ease-out'
            });
          });
        });
        title.classList.add('scroll-animation--in-viewport');
      }
    });
  });
});

