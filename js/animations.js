/**
 * Animations simplifiées pour le site WPC
 * Utilise GSAP avec ScrollTrigger (sans SplitText)
 * Compatible avec le design actuel (hero-section, content-section)
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await waitForGSAP();
    } catch (error) {
        console.warn('GSAP non disponible, animations désactivées');
        return;
    }

    const { gsap, ScrollTrigger } = getGSAP();

    if (!gsap || !ScrollTrigger) {
        return;
    }

    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    /**
     * Animation du titre hero avec ScrollTrigger
     */
    function initHeroTitleAnimation() {
        const heroTitle = document.querySelector('.hero-section__title');
        if (!heroTitle) return;

        gsap.set(heroTitle, { opacity: 0, y: 30, willChange: 'opacity, transform' });

        // Vérifier si l'élément est déjà visible dans le viewport
        const rect = heroTitle.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;

        if (isVisible) {
            // Si déjà visible, animer immédiatement
            gsap.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(heroTitle, { willChange: 'auto' });
                }
            });
        } else {
            // Sinon, utiliser ScrollTrigger
            gsap.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heroTitle,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    once: true
                },
                onComplete: () => {
                    gsap.set(heroTitle, { willChange: 'auto' });
                }
            });
        }
    }

    /**
     * Animation de la description hero (uniquement sur la page index)
     */
    function initHeroDescriptionAnimation() {
        const heroSection = document.querySelector('.hero-section--home');
        if (!heroSection) return;

        const heroDescription = heroSection.querySelector('.hero-section__description');
        if (!heroDescription) return;

        gsap.set(heroDescription, { opacity: 0, y: 30 });
        gsap.to(heroDescription, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
    }

    /**
     * Animation des sections de contenu au scroll
     */
    function initContentSectionsAnimation() {
        // Ne pas animer les sections sur les pages légales
        if (document.body.classList.contains('page-legal')) {
            return;
        }

        const contentSections = document.querySelectorAll('.content-section');

        contentSections.forEach((section, index) => {
            const isGreenSection = section.classList.contains('content-section--green');

            const title = section.querySelector('.content-section__title');
            const text = section.querySelector('.content-section__text');
            if (title && !isGreenSection) {
                gsap.set(title, { opacity: 0, y: 40, willChange: 'opacity, transform' });
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    onComplete: () => {
                        gsap.set(title, { willChange: 'auto' });
                    }
                });
            }

            if (text && !isGreenSection) {
                gsap.set(text, { opacity: 0, y: 30, willChange: 'opacity, transform' });
                gsap.to(text, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: text,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    delay: 0.1,
                    onComplete: () => {
                        gsap.set(text, { willChange: 'auto' });
                    }
                });
            }
        });
    }

    /**
     * Animation du titre "Qui sommes-nous ?"
     */
    function initQuiSommesNousAnimation() {
        const quiSommesNousTitle = document.querySelector('.content-section--green .content-section__title--large');
        const quiSommesNousText = document.querySelector('.content-section--green .content-section__text--intro');
        const quiSommesNousContainer = document.querySelector('.content-section--green');

        if (!quiSommesNousContainer) return;

        if (quiSommesNousTitle) {
            gsap.set(quiSommesNousTitle, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            gsap.to(quiSommesNousTitle, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: quiSommesNousContainer,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                delay: 0.1,
                onComplete: () => {
                    gsap.set(quiSommesNousTitle, { willChange: 'auto' });
                }
            });
        }

        if (quiSommesNousText) {
            gsap.set(quiSommesNousText, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            gsap.to(quiSommesNousText, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: quiSommesNousText,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                delay: 0.1,
                onComplete: () => {
                    gsap.set(quiSommesNousText, { willChange: 'auto' });
                }
            });
        }
    }

    /**
     * Animation du texte d'intro de la section domaines
     */
    function initDomainesIntroAnimation() {
        const domainesIntroLabel = document.querySelector('.domaines-section__intro-label');
        const domainesIntro = document.querySelector('.domaines-section__intro-text');
        const domainesIntroContainer = document.querySelector('.domaines-section__intro');

        if (!domainesIntroContainer) return;

        const elementsToAnimate = [];

        if (domainesIntroLabel) {
            gsap.set(domainesIntroLabel, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            elementsToAnimate.push(domainesIntroLabel);
        }

        if (domainesIntro) {
            gsap.set(domainesIntro, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            elementsToAnimate.push(domainesIntro);
        }

        if (elementsToAnimate.length === 0) return;

        gsap.to(elementsToAnimate, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: domainesIntroContainer,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
            },
            delay: 0.1,
            onComplete: () => {
                elementsToAnimate.forEach(el => {
                    gsap.set(el, { willChange: 'auto' });
                });
            }
        });
    }

    /**
     * Animation des carrés de domaines
     */
    function initDomainesItemsAnimation() {
        const domainesItems = document.querySelectorAll('.domaine-item');
        if (!domainesItems || domainesItems.length === 0) return;

        domainesItems.forEach((item) => {
            gsap.set(item, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                delay: 0.1,
                onComplete: () => {
                    gsap.set(item, { willChange: 'auto' });
                }
            });
        });
    }

    initHeroTitleAnimation();
    initHeroDescriptionAnimation();
    initContentSectionsAnimation();
    initQuiSommesNousAnimation();
    initDomainesIntroAnimation();
    initDomainesItemsAnimation();
});

