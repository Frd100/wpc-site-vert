/**
 * Utility functions for GSAP and general helpers
 */

/**
 * Wait for GSAP to be loaded from CDN
 */
export function waitForGSAP(timeout = 5000): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).gsap) {
      resolve((window as any).gsap);
      return;
    }

    let attempts = 0;
    const maxAttempts = timeout / 100;

    const checkInterval = setInterval(() => {
      attempts++;
      if ((window as any).gsap) {
        clearInterval(checkInterval);
        resolve((window as any).gsap);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error('GSAP failed to load'));
      }
    }, 100);
  });
}

/**
 * Get GSAP and plugins from window
 */
export function getGSAP() {
  const gsap = (window as any).gsap;
  const SplitText = (window as any).SplitText;
  const ScrollTrigger = (window as any).ScrollTrigger;
  const TextPlugin = (window as any).TextPlugin;

  if (gsap) {
    if (SplitText) gsap.registerPlugin(SplitText);
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (TextPlugin) gsap.registerPlugin(TextPlugin);
  }

  return { gsap, SplitText, ScrollTrigger, TextPlugin };
}

/**
 * Smooth scroll to element
 */
export function smoothScroll(target: string) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

