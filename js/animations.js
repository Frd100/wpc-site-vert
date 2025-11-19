/**
 * Animations simplifiées pour le site WPC
 * Compatible avec le design actuel (hero-section, content-section)
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await waitForGSAP();
    } catch (error) {
        console.warn('GSAP non disponible, animations désactivées');
        return;
    }

    const { gsap, SplitText, ScrollTrigger } = getGSAP();

    if (!gsap || !ScrollTrigger) {
        return;
    }

    // Enregistrer ScrollTrigger
    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    /**
     * Animation du titre hero avec effet blur
     */
    function initHeroTitleAnimation() {
        const heroTitle = document.querySelector('.hero-section__title');
        if (!heroTitle || !SplitText) return;

        const split = new SplitText(heroTitle, { type: 'words' });
        if (!split.words || split.words.length === 0) return;

        const allWords = [];
        allWords.push(...split.words);

        gsap.set(split.words, {
            filter: 'blur(20px)',
            opacity: 0
        });

        const tl = gsap.timeline({
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

    /**
     * Animation de la description hero
     */
    function initHeroDescriptionAnimation() {
        const heroDescription = document.querySelector('.hero-section__description');
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
        const contentSections = document.querySelectorAll('.content-section');

        contentSections.forEach((section, index) => {
            // Exclure la section "Qui sommes-nous ?" (content-section--green) de l'animation SplitText
            const isGreenSection = section.classList.contains('content-section--green');

            const title = section.querySelector('.content-section__title');
            const text = section.querySelector('.content-section__text');

            // Animation du titre (sauf pour la section verte)
            if (title && SplitText && !isGreenSection) {
                const split = new SplitText(title, { type: 'words' });
                if (split.words && split.words.length > 0) {
                    gsap.set(split.words, { opacity: 0, y: 40 });

                    gsap.to(split.words, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            }

            // Animation du texte
            if (text) {
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

        // Animation simultanée du titre et du texte avec le même trigger
        const elementsToAnimate = [];

        if (quiSommesNousTitle) {
            gsap.set(quiSommesNousTitle, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            elementsToAnimate.push(quiSommesNousTitle);
        }

        if (quiSommesNousText) {
            gsap.set(quiSommesNousText, { opacity: 0, y: 30, willChange: 'opacity, transform' });
            elementsToAnimate.push(quiSommesNousText);
        }

        if (elementsToAnimate.length === 0) return;

        gsap.to(elementsToAnimate, {
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
                elementsToAnimate.forEach(el => {
                    gsap.set(el, { willChange: 'auto' });
                });
            }
        });
    }

    /**
     * Animation du texte d'intro de la section domaines
     */
    function initDomainesIntroAnimation() {
        const domainesIntroLabel = document.querySelector('.domaines-section__intro-label');
        const domainesIntro = document.querySelector('.domaines-section__intro-text');
        const domainesIntroContainer = document.querySelector('.domaines-section__intro');

        if (!domainesIntroContainer) return;

        // Animation simultanée du label et du texte avec le même trigger
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

    // Initialiser les animations
    initHeroTitleAnimation();
    initHeroDescriptionAnimation();
    initContentSectionsAnimation();
    initQuiSommesNousAnimation();
    initDomainesIntroAnimation();
    initDomainesItemsAnimation();
});

