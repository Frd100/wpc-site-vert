/**
 * Animated Beam - Version optimisée avec GSAP Timeline
 * Crée des faisceaux animés entre des éléments avec une meilleure performance
 * 
 * OPTIONS:
 * - containerRef: Référence au conteneur (requis)
 * - fromRef: Élément de départ (requis)
 * - toRef: Élément d'arrivée (requis)
 * - curvature: Courbure du path (défaut: 0)
 * - reverse: Inverser la direction (défaut: false)
 * - duration: Durée de l'animation en secondes (défaut: 5)
 * - delay: Délai avant le démarrage en secondes (défaut: 0)
 * - pathColor: Couleur du path (défaut: '#e5e7eb')
 * - pathWidth: Largeur du path (défaut: 1.5)
 * - pathOpacity: Opacité du path (défaut: 0.3)
 * - gradientStartColor: Couleur de départ du gradient (défaut: '#3b82f6')
 * - gradientStopColor: Couleur de fin du gradient (défaut: '#8b5cf6')
 * - startXOffset, startYOffset: Offset de départ (défaut: 0)
 * - endXOffset, endYOffset: Offset d'arrivée (défaut: 0)
 * - autoPlay: Démarrer l'animation automatiquement (défaut: true)
 */
class AnimatedBeam {
  constructor(options = {}) {
    this.containerRef = options.containerRef;
    this.fromRef = options.fromRef;
    this.toRef = options.toRef;
    this.curvature = options.curvature || 0;
    this.reverse = options.reverse || false;
    this.duration = options.duration || 5;
    this.delay = options.delay || 0;
    this.pathColor = options.pathColor || '#6b7280';
    this.pathWidth = options.pathWidth || 1.5;
    this.pathOpacity = options.pathOpacity || 0.3;
    this.gradientStartColor = options.gradientStartColor || '#3b82f6';
    this.gradientStopColor = options.gradientStopColor || '#8b5cf6';
    this.startXOffset = options.startXOffset || 0;
    this.startYOffset = options.startYOffset || 0;
    this.endXOffset = options.endXOffset || 0;
    this.endYOffset = options.endYOffset || 0;
    this.autoPlay = options.autoPlay !== false;
    
    this.svg = null;
    this.path = null;
    this.glowPath = null;
    this.gradient = null;
    this.pathLength = 0;
    this.gsapTimeline = null;
    this.gsapTween = null;
    
    this.init();
  }
  
  init() {
    if (!this.containerRef || !this.fromRef || !this.toRef) {
      console.warn('AnimatedBeam: containerRef, fromRef, and toRef are required');
      return;
    }
    
    this.createSVG();
    
    // Attendre que le DOM soit prêt
    requestAnimationFrame(() => {
      this.updatePath();
    });
    
    // Mettre à jour lors du redimensionnement avec debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updatePath();
      }, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    this.resizeHandler = handleResize;
  }
  
  createSVG() {
    // Créer le conteneur SVG
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('aria-hidden', 'true');
    this.svg.style.position = 'absolute';
    this.svg.style.top = '0';
    this.svg.style.left = '0';
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';
    this.svg.style.pointerEvents = 'none';
    this.svg.style.overflow = 'visible';
    this.svg.setAttribute('preserveAspectRatio', 'none');
    
    // Optimisation performance
    this.svg.style.willChange = 'transform';
    
    // Créer les définitions (gradients, etc.)
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Gradient pour le path (ID unique)
    this.gradientId = `beam-gradient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    this.gradient.setAttribute('id', this.gradientId);
    this.gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', this.gradientStartColor);
    stop1.setAttribute('stop-opacity', '0');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', this.gradientStartColor);
    stop2.setAttribute('stop-opacity', '1');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', this.gradientStopColor);
    stop3.setAttribute('stop-opacity', '1');
    
    this.gradient.appendChild(stop1);
    this.gradient.appendChild(stop2);
    this.gradient.appendChild(stop3);
    defs.appendChild(this.gradient);
    
    // Créer le path de base (fade)
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke', this.pathColor);
    this.path.setAttribute('stroke-width', this.pathWidth);
    this.path.setAttribute('opacity', this.pathOpacity);
    this.path.setAttribute('stroke-linecap', 'round');
    this.path.setAttribute('stroke-linejoin', 'round');
    
    // Créer le path avec lueur animée
    this.glowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.glowPath.setAttribute('fill', 'none');
    this.glowPath.setAttribute('stroke', `url(#${this.gradientId})`);
    this.glowPath.setAttribute('stroke-width', this.pathWidth + 1);
    this.glowPath.setAttribute('opacity', '0');
    this.glowPath.setAttribute('stroke-linecap', 'round');
    this.glowPath.setAttribute('stroke-linejoin', 'round');
    
    // Optimisation performance
    this.glowPath.style.willChange = 'stroke-dashoffset, opacity';
    
    this.svg.appendChild(defs);
    this.svg.appendChild(this.path);
    this.svg.appendChild(this.glowPath);
    
    // Ajouter le SVG au conteneur
    this.containerRef.appendChild(this.svg);
  }
  
  getElementPosition(element) {
    const containerRect = this.containerRef.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2
    };
  }
  
  calculatePath(from, to) {
    const startX = from.x + this.startXOffset;
    const startY = from.y + this.startYOffset;
    const endX = to.x + this.endXOffset;
    const endY = to.y + this.endYOffset;
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Calculer le point de contrôle pour la courbure
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return null;
    
    // Point de contrôle perpendiculaire
    const perpX = -dy / distance * this.curvature;
    const perpY = dx / distance * this.curvature;
    
    const controlX = midX + perpX;
    const controlY = midY + perpY;
    
    return {
      startX,
      startY,
      endX,
      endY,
      controlX,
      controlY
    };
  }
  
  updatePath() {
    if (!this.fromRef || !this.toRef || !this.path || !this.glowPath) return;
    
    const fromPos = this.getElementPosition(this.fromRef);
    const toPos = this.getElementPosition(this.toRef);
    
    const pathData = this.calculatePath(fromPos, toPos);
    if (!pathData) return;
    
    // Créer le path SVG (courbe quadratique)
    const d = `M ${pathData.startX} ${pathData.startY} Q ${pathData.controlX} ${pathData.controlY} ${pathData.endX} ${pathData.endY}`;
    this.path.setAttribute('d', d);
    this.glowPath.setAttribute('d', d);
    
    // Mettre à jour le gradient
    this.gradient.setAttribute('x1', pathData.startX);
    this.gradient.setAttribute('y1', pathData.startY);
    this.gradient.setAttribute('x2', pathData.endX);
    this.gradient.setAttribute('y2', pathData.endY);
    
    // Stocker les données du path
    this.pathData = pathData;
    
    // Calculer la longueur du path
    requestAnimationFrame(() => {
      this.pathLength = this.path.getTotalLength();
      
      // Si autoPlay est activé et que l'animation n'a pas encore démarré
      if (this.autoPlay && !this.gsapTween && this.pathLength > 0) {
        this.startAnimation();
      }
    });
  }
  
  startAnimation() {
    if (!this.path || !this.pathLength || this.pathLength === 0) {
      requestAnimationFrame(() => this.startAnimation());
      return;
    }
    
    // Utiliser GSAP si disponible
    if (typeof window !== 'undefined' && window.gsap) {
      this.startGSAPAnimation();
    } else {
      console.warn('AnimatedBeam: GSAP not available, animation will not start');
    }
  }
  
  startGSAPAnimation() {
    const gsap = window.gsap;
    
    // Longueur de la lueur (20% de la longueur totale)
    const glowLength = this.pathLength * 0.2;
    const totalLength = this.pathLength + glowLength;
    
    // Initialiser stroke-dasharray et stroke-dashoffset
    gsap.set(this.glowPath, {
      attr: {
        'stroke-dasharray': `${glowLength} ${this.pathLength}`,
        'stroke-dashoffset': totalLength
      },
      opacity: 0
    });
    
    // Créer l'animation avec GSAP
    const progressObj = { value: 0 };
    
    this.gsapTween = gsap.to(progressObj, {
      value: 1,
      duration: this.duration,
      repeat: -1,
      ease: 'none',
      delay: this.delay,
      onUpdate: () => {
        const currentProgress = this.reverse ? 1 - progressObj.value : progressObj.value;
        const offset = (1 - currentProgress) * totalLength;
        this.glowPath.setAttribute('stroke-dashoffset', offset);
      }
    });
  }
  
  // Méthodes pour contrôler l'animation manuellement
  play() {
    if (this.gsapTween) {
      this.gsapTween.play();
    } else if (this.pathLength > 0) {
      this.startAnimation();
    }
  }
  
  pause() {
    if (this.gsapTween) {
      this.gsapTween.pause();
    }
  }
  
  setOpacity(opacity) {
    if (this.glowPath) {
      window.gsap?.set(this.glowPath, { opacity });
    }
    if (this.path) {
      window.gsap?.set(this.path, { opacity: opacity > 0 ? this.pathOpacity : 0 });
    }
  }
  
  setStrokeDashoffset(offset) {
    if (this.glowPath && this.pathLength > 0) {
      const glowLength = this.pathLength * 0.2;
      const totalLength = this.pathLength + glowLength;
      this.glowPath.setAttribute('stroke-dashoffset', offset !== undefined ? offset : totalLength);
    }
  }
  
  destroy() {
    // Arrêter l'animation GSAP
    if (this.gsapTween) {
      this.gsapTween.kill();
      this.gsapTween = null;
    }
    
    if (this.gsapTimeline) {
      this.gsapTimeline.kill();
      this.gsapTimeline = null;
    }
    
    // Supprimer le listener de resize
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Supprimer le SVG
    if (this.svg && this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
  }
  
  // Méthode pour mettre à jour le path (utile lors du redimensionnement)
  refresh() {
    this.updatePath();
  }
}

// Export pour utilisation globale
if (typeof window !== 'undefined') {
  window.AnimatedBeam = AnimatedBeam;
}
