// Smooth scrolling pour les ancres avec Lenis
document.addEventListener('DOMContentLoaded', () => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Utiliser Lenis si disponible, sinon fallback sur scrollIntoView
                if (window.lenis) {
                    window.lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.2
                    });
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Classe active sur les liens de navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-navigation__link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath) return;

        const normalizedCurrent = currentPath === '/' || currentPath.endsWith('/index.html') ? '/' : currentPath;
        const normalizedLink = linkPath === '/' || linkPath === '/index.html' || linkPath === 'index.html' ? '/' : linkPath;

        if (normalizedCurrent === normalizedLink ||
            (normalizedCurrent === '/' && normalizedLink === '/') ||
            (normalizedCurrent.endsWith(normalizedLink) && normalizedLink !== '/')) {
            link.classList.add('active');
        }
    });

    // Gestion des onglets Domaines
    const domaineTabs = document.querySelectorAll('.index-domaines-tab');
    const domaineContents = document.querySelectorAll('.index-domaine-content');
    const beamInstances = {};

    function waitForGSAP() {
        return new Promise((resolve) => {
            if (window.gsap) {
                resolve();
            } else {
                const checkInterval = setInterval(() => {
                    if (window.gsap) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 50);
            }
        });
    }

    /**
     * Crée une animation séquentielle pour les beams du tab "digital"
     * Utilise GSAP Timeline pour une meilleure performance et contrôle
     */
    function createSequentialBeamAnimation(beams) {
        const { personToWpc, wpcToAudit, wpcToWeb, wpcToCollab } = beams;
        const gsap = window.gsap;
        
        // Vérifier que tous les paths sont prêts
        const allReady = [personToWpc, wpcToAudit, wpcToWeb, wpcToCollab].every(
            beam => beam.glowPath && beam.pathLength && beam.pathLength > 0
        );
        
        if (!allReady) {
            setTimeout(() => createSequentialBeamAnimation(beams), 50);
            return null;
        }
        
        // Arrêter toutes les animations automatiques
        [personToWpc, wpcToAudit, wpcToWeb, wpcToCollab].forEach(beam => {
            if (beam.gsapTween) {
                beam.gsapTween.kill();
                beam.gsapTween = null;
            }
        });
        
        // Initialiser tous les paths - les paths gris restent toujours visibles
        [personToWpc, wpcToAudit, wpcToWeb, wpcToCollab].forEach(beam => {
            const glowLength = beam.pathLength * 0.2;
            const totalLength = beam.pathLength + glowLength;
            
            gsap.set(beam.glowPath, {
                attr: {
                    'stroke-dasharray': `${glowLength} ${beam.pathLength}`,
                    'stroke-dashoffset': totalLength
                },
                opacity: 0
            });
            
            // Le path de base (gris) reste toujours visible
            gsap.set(beam.path, { opacity: beam.pathOpacity || 0.3 });
        });
        
        // Créer une timeline pour l'animation séquentielle
        const timeline = gsap.timeline({ repeat: -1 });
        const segmentDuration = 0.8;
        
        // Segment 1: Ligne unique (person -> WPC) - 0 à 0.8s
        timeline.to(personToWpc.glowPath, {
            attr: { 'stroke-dashoffset': personToWpc.pathLength * 0.2 },
            duration: segmentDuration,
            ease: 'none',
            onStart: () => {
                gsap.set(personToWpc.glowPath, { opacity: 0.8 });
                // Le path de base reste toujours visible
            }
        });
        
        // Segment 2: Cacher la ligne unique et montrer les 3 lignes - 0.8s à 1.6s
        timeline.to(personToWpc.glowPath, {
            opacity: 0,
            duration: 0.01,
            onStart: () => {
                // Le path de base reste toujours visible, on ne le cache pas
                gsap.set(personToWpc.glowPath, {
                    attr: { 'stroke-dashoffset': personToWpc.pathLength + personToWpc.pathLength * 0.2 }
                });
            }
        }, segmentDuration);
        
        // Animer les 3 lignes simultanément
        const threeBeams = [wpcToAudit, wpcToWeb, wpcToCollab];
        threeBeams.forEach(beam => {
            const glowLength = beam.pathLength * 0.2;
            const totalLength = beam.pathLength + glowLength;
            
            timeline.to(beam.glowPath, {
                attr: { 'stroke-dashoffset': glowLength },
                duration: segmentDuration,
                ease: 'none',
                onStart: () => {
                    gsap.set(beam.glowPath, { opacity: 0.8 });
                    // Le path de base reste toujours visible
                }
            }, segmentDuration);
        });
        
        // Cacher les 3 lignes à la fin du cycle (seulement le glowPath, pas le path de base)
        timeline.to({}, {
            duration: 0.01,
            onComplete: () => {
                threeBeams.forEach(beam => {
                    const glowLength = beam.pathLength * 0.2;
                    const totalLength = beam.pathLength + glowLength;
                    gsap.set(beam.glowPath, {
                        opacity: 0,
                        attr: { 'stroke-dashoffset': totalLength }
                    });
                    // Le path de base reste toujours visible
                });
            }
        }, segmentDuration * 2);
        
        return timeline;
    }

    function initBeamsForTab(tabName) {
        const containerId = `beam-container-${tabName}`;
        const container = document.getElementById(containerId);
        if (!container || beamInstances[tabName]) return;

        waitForGSAP().then(() => {
            if (tabName === 'strategie') {
                // Animation spéciale pour stratégie (graphique en croissance)
                if (window.initStrategieAnimation) {
                    setTimeout(() => {
                        window.initStrategieAnimation();
                    }, 100);
                }
                beamInstances[tabName] = { type: 'strategie' };
            } else if (tabName === 'juridique') {
                // Animation spéciale pour juridique (document qui se remplit)
                if (window.initJuridiqueAnimation) {
                    setTimeout(() => {
                        window.initJuridiqueAnimation();
                    }, 100);
                }
                beamInstances[tabName] = { type: 'juridique' };
            } else if (tabName === 'digital') {
                // Structure spéciale pour digital : person -> WPC -> 3 icônes
                const person = document.getElementById('beam-digital-person');
                const wpc = document.getElementById('beam-wpc-digital');
                const audit = document.getElementById('beam-digital-audit');
                const web = document.getElementById('beam-digital-web');
                const collab = document.getElementById('beam-digital-collab');

                if (person && wpc && audit && web && collab) {
                    // Créer les beams sans animation automatique
                    const personToWpc = new AnimatedBeam({
                        containerRef: container,
                        fromRef: person,
                        toRef: wpc,
                        duration: 0.8,
                        curvature: 0,
                        delay: 0,
                        autoPlay: false
                    });
                    
                    const wpcToAudit = new AnimatedBeam({
                        containerRef: container,
                        fromRef: wpc,
                        toRef: audit,
                        duration: 0.8,
                        curvature: -30,
                        endYOffset: -5,
                        delay: 0,
                        autoPlay: false
                    });

                    const wpcToWeb = new AnimatedBeam({
                        containerRef: container,
                        fromRef: wpc,
                        toRef: web,
                        duration: 0.8,
                        curvature: 0,
                        delay: 0,
                        autoPlay: false
                    });

                    const wpcToCollab = new AnimatedBeam({
                        containerRef: container,
                        fromRef: wpc,
                        toRef: collab,
                        duration: 0.8,
                        curvature: 30,
                        endYOffset: 5,
                        delay: 0,
                        autoPlay: false
                    });
                    
                    // Attendre que les paths soient calculés puis créer l'animation séquentielle
                    const initSequentialAnimation = () => {
                        const timeline = createSequentialBeamAnimation({
                            personToWpc,
                            wpcToAudit,
                            wpcToWeb,
                            wpcToCollab
                        });
                        
                        if (timeline) {
                            // Stocker la timeline pour pouvoir la détruire plus tard
                            beamInstances[tabName] = {
                                timeline,
                                beams: { personToWpc, wpcToAudit, wpcToWeb, wpcToCollab }
                            };
                        } else {
                            setTimeout(initSequentialAnimation, 50);
                        }
                    };
                    
                    setTimeout(initSequentialAnimation, 100);
                }
            } else {
                // Structure standard pour les autres onglets
                const leftId = `beam-${tabName}-1`;
                const centerId = `beam-wpc-${tabName}`;
                const rightId = `beam-${tabName}-2`;

                const left = document.getElementById(leftId);
                const center = document.getElementById(centerId);
                const right = document.getElementById(rightId);

                if (left && center && right) {
                    // Beam gauche vers centre
                    const beamLeft = new AnimatedBeam({
                        containerRef: container,
                        fromRef: left,
                        toRef: center,
                        duration: 0.8,
                        curvature: -50,
                        endYOffset: -5
                    });

                    // Beam centre vers droite
                    const beamRight = new AnimatedBeam({
                        containerRef: container,
                        fromRef: center,
                        toRef: right,
                        duration: 0.8,
                        curvature: 50,
                        endYOffset: 5,
                        reverse: true
                    });
                    
                    // Stocker les beams pour pouvoir les détruire plus tard
                    beamInstances[tabName] = {
                        beams: [beamLeft, beamRight]
                    };
                } else {
                    beamInstances[tabName] = true;
                }
            }
        });
    }

    domaineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Détruire complètement les animations et beams existants pour tous les onglets
            Object.keys(beamInstances).forEach(tabName => {
                const instance = beamInstances[tabName];
                
                // Animation spéciale pour stratégie
                if (instance && instance.type === 'strategie') {
                    if (window.destroyStrategieAnimation) {
                        window.destroyStrategieAnimation();
                    }
                }
                
                // Animation spéciale pour juridique
                if (instance && instance.type === 'juridique') {
                    if (window.destroyJuridiqueAnimation) {
                        window.destroyJuridiqueAnimation();
                    }
                }
                
                // Détruire la timeline si elle existe (pour l'onglet digital)
                if (instance && instance.timeline) {
                    instance.timeline.kill();
                }
                
                // Détruire tous les beams
                if (instance && instance.beams) {
                    const beamsArray = Array.isArray(instance.beams) 
                        ? instance.beams 
                        : Object.values(instance.beams);
                    
                    beamsArray.forEach(beam => {
                        if (beam && typeof beam.destroy === 'function') {
                            beam.destroy();
                        }
                    });
                }
                
                // Nettoyer le conteneur SVG (uniquement les SVG créés par AnimatedBeam)
                const containerId = `beam-container-${tabName}`;
                const container = document.getElementById(containerId);
                if (container) {
                    // Supprimer uniquement les SVG créés par AnimatedBeam (ceux qui sont des enfants directs du conteneur)
                    // Ne pas toucher aux SVG qui sont dans les divs .animated-beam-circle
                    const beamSvgs = Array.from(container.children).filter(child => 
                        child.tagName === 'svg' && child.style.position === 'absolute'
                    );
                    beamSvgs.forEach(svg => svg.remove());
                }
            });
            
            // Réinitialiser beamInstances
            Object.keys(beamInstances).forEach(key => delete beamInstances[key]);
            
            // Mettre à jour les onglets
            domaineTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Animer la ligne de soulignement
            const nav = document.querySelector('.index-domaines-nav');
            if (nav) {
                const tabRect = tab.getBoundingClientRect();
                const navRect = nav.getBoundingClientRect();
                // Centrer le trait de 80px sur l'onglet
                const tabCenter = tabRect.left - navRect.left + tabRect.width / 2;
                const underlineWidth = 80;
                const left = tabCenter - underlineWidth / 2;
                nav.style.setProperty('--underline-left', left + 'px');
            }
            
            // Mettre à jour le contenu
            domaineContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-content') === targetTab) {
                    content.classList.add('active');
                    // Initialiser les beams pour cet onglet
                    initBeamsForTab(targetTab);
                }
            });
        });
    });

    // Initialiser la position de la ligne et les beams pour l'onglet actif au chargement
    const activeTab = document.querySelector('.index-domaines-tab.active');
    if (activeTab) {
        const nav = document.querySelector('.index-domaines-nav');
        if (nav) {
            setTimeout(() => {
                const tabRect = activeTab.getBoundingClientRect();
                const navRect = nav.getBoundingClientRect();
                // Centrer le trait de 80px sur l'onglet
                const tabCenter = tabRect.left - navRect.left + tabRect.width / 2;
                const underlineWidth = 80;
                const left = tabCenter - underlineWidth / 2;
                nav.style.setProperty('--underline-left', left + 'px');
            }, 100);
        }
        const activeTabName = activeTab.getAttribute('data-tab');
        initBeamsForTab(activeTabName);
    }
});
