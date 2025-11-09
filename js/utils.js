function waitForGSAP(timeout = 5000) {
  return new Promise((resolve, reject) => {
    if (window.gsap) {
      resolve(window.gsap);
      return;
    }

    let attempts = 0;
    const maxAttempts = timeout / 100;

    const checkInterval = setInterval(() => {
      attempts++;
      if (window.gsap) {
        clearInterval(checkInterval);
        resolve(window.gsap);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error('GSAP failed to load'));
      }
    }, 100);
  });
}

function getGSAP() {
  const gsap = window.gsap;
  const SplitText = window.SplitText;
  const ScrollTrigger = window.ScrollTrigger;
  const TextPlugin = window.TextPlugin;

  if (gsap) {
    if (SplitText) gsap.registerPlugin(SplitText);
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (TextPlugin) gsap.registerPlugin(TextPlugin);
  }

  return { gsap, SplitText, ScrollTrigger, TextPlugin };
}

function smoothScroll(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    // Utiliser Lenis si disponible, sinon fallback sur scrollIntoView
    if (window.lenis) {
      window.lenis.scrollTo(element, {
        offset: 0,
        duration: 1.2
      });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

