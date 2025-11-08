document.addEventListener('DOMContentLoaded', async () => {

  try {
    await waitForGSAP();
  } catch (error) {
    console.warn('GSAP not loaded, animations skipped');
    return;
  }

  const { gsap, SplitText } = getGSAP();

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
});

