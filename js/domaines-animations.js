/**
 * Animations spécifiques pour les onglets Domaines
 * Regroupe les animations pour juridique et stratégie
 */

document.addEventListener('DOMContentLoaded', () => {
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
     * Animation pour l'onglet Juridique
     * Document qui se remplit progressivement avec du texte
     */
    function initJuridiqueAnimation() {
        const container = document.getElementById('beam-container-juridique');
        if (!container) return;

        waitForGSAP().then(() => {
            const gsap = window.gsap;
            
            // Créer le SVG pour le document
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('aria-hidden', 'true');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            svg.style.overflow = 'visible';
            
            // Utiliser viewBox pour centrer automatiquement
            svg.setAttribute('viewBox', '0 0 400 400');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            const centerX = 200;
            const centerY = 200;
            
            // Créer le groupe principal
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('transform', `translate(${centerX}, ${centerY})`);
            
            // Dimensions du document (centré)
            const docWidth = 200;
            const docHeight = 280;
            
            // Fond du document (rectangle avec coins arrondis)
            const docBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            docBg.setAttribute('x', -docWidth / 2);
            docBg.setAttribute('y', -docHeight / 2);
            docBg.setAttribute('width', docWidth);
            docBg.setAttribute('height', docHeight);
            docBg.setAttribute('rx', '4');
            docBg.setAttribute('fill', '#ffffff');
            docBg.setAttribute('stroke', '#CDCFD6');
            docBg.setAttribute('stroke-width', '1.5');
            docBg.setAttribute('opacity', '1');
            
            // Lignes de texte (simulation de texte)
            const lines = [];
            const lineCount = 8;
            const lineHeight = 20;
            const lineWidth = docWidth - 40;
            const startY = -docHeight / 2 + 30;
            
            for (let i = 0; i < lineCount; i++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                const y = startY + i * lineHeight;
                const lineLength = lineWidth * (0.6 + Math.random() * 0.4); // Longueur variable
                
                line.setAttribute('x1', -lineWidth / 2);
                line.setAttribute('y1', y);
                line.setAttribute('x2', -lineWidth / 2 + lineLength);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', '#6b7280');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('stroke-linecap', 'round');
                line.setAttribute('opacity', '0');
                line.setAttribute('stroke-dasharray', lineLength);
                line.setAttribute('stroke-dashoffset', lineLength);
                
                lines.push(line);
                group.appendChild(line);
            }
            
            // Ajouter le fond du document
            group.insertBefore(docBg, group.firstChild);
            
            svg.appendChild(group);
            container.appendChild(svg);
            
            // Animation avec GSAP Timeline
            const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
            
            // Le document reste toujours visible, on n'anime que les lignes
            
            // Animer chaque ligne de texte séquentiellement
            lines.forEach((line, index) => {
                const lineLength = parseFloat(line.getAttribute('stroke-dasharray'));
                
                timeline.to(line, {
                    opacity: 1,
                    duration: 0.1,
                    ease: 'none'
                }, index * 0.15);
                
                timeline.to(line, {
                    attr: { 'stroke-dashoffset': 0 },
                    duration: 0.4,
                    ease: 'power2.out'
                }, index * 0.15);
            });
            
            // Faire disparaître les lignes progressivement
            timeline.to({}, {
                duration: 0.5
            });
            
            timeline.to(lines, {
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    // Réinitialiser les lignes pour le prochain cycle
                    lines.forEach(line => {
                        const lineLength = parseFloat(line.getAttribute('stroke-dasharray'));
                        line.setAttribute('stroke-dashoffset', lineLength);
                    });
                }
            });
            
            // Stocker la timeline pour pouvoir la détruire plus tard
            svg._timeline = timeline;
        });
    }

    /**
     * Animation pour l'onglet Stratégie
     * Graphique en barres qui se remplissent progressivement
     */
    function initStrategieAnimation() {
        const container = document.getElementById('beam-container-strategie');
        if (!container) return;

        waitForGSAP().then(() => {
            const gsap = window.gsap;
            
            // Créer le SVG pour le graphique
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('aria-hidden', 'true');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            svg.style.overflow = 'visible';
            
            // Utiliser viewBox pour centrer automatiquement
            svg.setAttribute('viewBox', '0 0 400 400');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            const centerX = 200;
            const centerY = 200;
            
            // Créer le groupe principal
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('transform', `translate(${centerX}, ${centerY})`);
            
            // Dimensions du graphique
            const graphWidth = 260;
            const graphHeight = 180;
            const graphX = -graphWidth / 2;
            const graphY = -graphHeight / 2;
            
            // Fond du graphique (rectangle avec coins arrondis)
            const graphBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            graphBg.setAttribute('x', graphX);
            graphBg.setAttribute('y', graphY);
            graphBg.setAttribute('width', graphWidth);
            graphBg.setAttribute('height', graphHeight);
            graphBg.setAttribute('rx', '4');
            graphBg.setAttribute('fill', '#ffffff');
            graphBg.setAttribute('stroke', '#CDCFD6');
            graphBg.setAttribute('stroke-width', '1.5');
            graphBg.setAttribute('opacity', '1');
            
            // Lignes de grille supprimées
            
            // Données pour les barres (hauteurs en pourcentage)
            const barData = [0.35, 0.55, 0.75, 0.65, 0.90];
            const barCount = barData.length;
            const barWidth = 35;
            const barGap = (graphWidth - (barWidth * barCount)) / (barCount + 1);
            const maxBarHeight = graphHeight - 40;
            const barBaseY = graphY + graphHeight - 20;
            
            // Créer les barres
            const bars = [];
            barData.forEach((heightPercent, index) => {
                const barX = graphX + barGap + index * (barWidth + barGap);
                const barHeight = maxBarHeight * heightPercent;
                
                // Barre de fond (gris clair)
                const barBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                barBg.setAttribute('x', barX);
                barBg.setAttribute('y', barBaseY - maxBarHeight);
                barBg.setAttribute('width', barWidth);
                barBg.setAttribute('height', maxBarHeight);
                barBg.setAttribute('rx', '2');
                barBg.setAttribute('fill', '#f3f4f6');
                barBg.setAttribute('opacity', '1');
                
                // Barre de remplissage (bleue)
                const barFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                barFill.setAttribute('x', barX);
                barFill.setAttribute('y', barBaseY);
                barFill.setAttribute('width', barWidth);
                barFill.setAttribute('height', '0');
                barFill.setAttribute('rx', '2');
                barFill.setAttribute('fill', '#3b82f6');
                barFill.setAttribute('opacity', '1');
                
                // Gradient pour la barre (optionnel, plus joli)
                const gradientId = `bar-gradient-${index}`;
                const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!svg.querySelector('defs')) {
                    svg.appendChild(defs);
                }
                
                const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.setAttribute('id', gradientId);
                gradient.setAttribute('x1', '0%');
                gradient.setAttribute('y1', '0%');
                gradient.setAttribute('x2', '0%');
                gradient.setAttribute('y2', '100%');
                
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', '#60a5fa');
                stop1.setAttribute('stop-opacity', '1');
                
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '100%');
                stop2.setAttribute('stop-color', '#3b82f6');
                stop2.setAttribute('stop-opacity', '1');
                
                gradient.appendChild(stop1);
                gradient.appendChild(stop2);
                defs.appendChild(gradient);
                
                barFill.setAttribute('fill', `url(#${gradientId})`);
                
                bars.push({
                    bg: barBg,
                    fill: barFill,
                    height: barHeight,
                    y: barBaseY - barHeight
                });
                
                group.appendChild(barBg);
                group.appendChild(barFill);
            });
            
            // Ajouter les éléments dans l'ordre
            group.insertBefore(graphBg, group.firstChild);
            
            svg.appendChild(group);
            container.appendChild(svg);
            
            // Animation avec GSAP Timeline
            const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
            
            // Animer chaque barre qui se remplit séquentiellement
            bars.forEach((bar, index) => {
                timeline.to(bar.fill, {
                    attr: {
                        height: bar.height,
                        y: bar.y
                    },
                    duration: 0.6,
                    ease: 'power2.out'
                }, index * 0.15);
            });
            
            // Faire disparaître progressivement
            timeline.to({}, {
                duration: 0.8
            });
            
            timeline.to(bars.map(b => b.fill), {
                attr: {
                    height: 0,
                    y: barBaseY
                },
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    // Réinitialiser pour le prochain cycle
                    bars.forEach(bar => {
                        bar.fill.setAttribute('height', '0');
                        bar.fill.setAttribute('y', barBaseY);
                    });
                }
            });
            
            // Stocker la timeline pour pouvoir la détruire plus tard
            svg._timeline = timeline;
        });
    }

    // Fonctions de destruction
    function destroyJuridiqueAnimation() {
        const container = document.getElementById('beam-container-juridique');
        if (!container) return;
        
        const svg = container.querySelector('svg');
        if (svg && svg._timeline) {
            svg._timeline.kill();
        }
        if (svg) {
            svg.remove();
        }
    }

    function destroyStrategieAnimation() {
        const container = document.getElementById('beam-container-strategie');
        if (!container) return;
        
        const svg = container.querySelector('svg');
        if (svg && svg._timeline) {
            svg._timeline.kill();
        }
        if (svg) {
            svg.remove();
        }
    }

    // Exposer les fonctions globalement
    window.initJuridiqueAnimation = initJuridiqueAnimation;
    window.destroyJuridiqueAnimation = destroyJuridiqueAnimation;
    window.initStrategieAnimation = initStrategieAnimation;
    window.destroyStrategieAnimation = destroyStrategieAnimation;
});

