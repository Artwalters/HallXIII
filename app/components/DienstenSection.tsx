'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import styles from './DienstenSection.module.css';
import { useRouter } from 'next/navigation';

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable, DrawSVGPlugin);
}

// Polaroid frames
const frames = [
  '/assets/frames poloroid/frame 1.webp',
  '/assets/frames poloroid/frame2.webp',
  '/assets/frames poloroid/frame 3.webp',
  '/assets/frames poloroid/frame4.webp',
];

// Text rotations for organic look
const textRotations = [-1.5, 1.2, -0.8];

// 3 cards for desktop momentum hover
const desktopCards = [
  {
    image: '/assets/expertise-1.webp',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 2,
    frameIndex: 0,
    flipFrame: false,
    textRotation: textRotations[0],
    magnetPosition: { top: '3%', left: '8%', rotation: -8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.webp',
    buttonSize: 120,
  },
  {
    image: '/assets/expertise-2.webp',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: -1,
    frameIndex: 2,
    flipFrame: true,
    textRotation: textRotations[1],
    magnetPosition: { top: '5%', right: '5%', rotation: 12 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.webp',
    buttonSize: 120,
  },
  {
    image: '/assets/expertise-3.webp',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: 4,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[2],
    magnetPosition: { top: '2%', left: '6%', rotation: -5 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.webp',
    buttonSize: 138,
  },
];

// 7 cards for mobile flick - ordered to avoid same card on wraparound
const gymCards = [
  {
    image: '/assets/expertise-3.webp',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: 3,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -0.8,
    magnetPosition: { top: '-8%', right: '5%', rotation: -12 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.webp',
    buttonSize: 161,
  },
  {
    image: '/assets/expertise-1.webp',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: -2,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 1.2,
    magnetPosition: { top: '-6%', right: '3%', rotation: 8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.webp',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-2.webp',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: 4,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.5,
    magnetPosition: { top: '-10%', right: '8%', rotation: -15 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.webp',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-3.webp',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: -3,
    frameIndex: 3,
    flipFrame: true,
    textRotation: 1.8,
    magnetPosition: { top: '-5%', right: '6%', rotation: 18 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.webp',
    buttonSize: 161,
  },
  {
    image: '/assets/expertise-1.webp',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 2,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -1.2,
    magnetPosition: { top: '-7%', right: '4%', rotation: -10 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.webp',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-2.webp',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: -4,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 0.9,
    magnetPosition: { top: '-9%', right: '7%', rotation: 14 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.webp',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-1.webp',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 5,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.8,
    magnetPosition: { top: '-6%', right: '5%', rotation: -8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.webp',
    buttonSize: 140,
  },
];

export default function DienstenSection() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [showSwipeHints, setShowSwipeHints] = useState(true);
  const hasSwipedRef = useRef(false);

  // Hide swipe hints after first swipe
  const hideSwipeHints = () => {
    if (!hasSwipedRef.current) {
      hasSwipedRef.current = true;
      setShowSwipeHints(false);
    }
  };

  // Desktop: Momentum-based hover animation with inertia (only on desktop)
  useEffect(() => {
    // If this device can't hover with a fine pointer, stop here
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    // Only initialize on desktop devices (min-width: 1000px)
    const isDesktop = window.matchMedia('(min-width: 1000px)').matches;
    if (!isDesktop) return;

    const root = cardsGridRef.current;
    if (!root) return;

    // Configuration (tweak these for feel)
    const xyMultiplier = 15;  // multiplies pointer velocity for x/y movement (was 30, now 50% less intense)
    const rotationMultiplier = 10;  // multiplies normalized torque for rotation speed (was 20, now 50% less intense)
    const inertiaResistance = 300; // higher = stops sooner (was 200, increased for less movement)

    // Button-specific multipliers (50% of polaroid intensity)
    const buttonXYMultiplier = 7.5;  // 50% of polaroid multiplier
    const buttonRotationMultiplier = 5;  // 50% of polaroid multiplier

    // Pre-build clamp functions for performance
    const clampXY = gsap.utils.clamp(-1080, 1080);
    const clampRot = gsap.utils.clamp(-60, 60);

    let prevX = 0, prevY = 0;
    let velX = 0, velY = 0;
    let rafId: number | null = null;

    // Track pointer velocity (throttled to RAF)
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX;
        velY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rafId = null;
      });
    };

    root.addEventListener('mousemove', handleMouseMove);

    // Attach hover inertia to each child element
    const elements = root.querySelectorAll('[data-momentum-hover-element]');

    elements.forEach(el => {
      const element = el as HTMLElement;

      const handleMouseEnter = (e: MouseEvent) => {
        const target = element.querySelector('[data-momentum-hover-target]') as HTMLElement;
        if (!target) return;

        // Check if this is a button element
        const isButton = element.classList.contains(styles.magnetButton);

        // Use button-specific multipliers if it's a button
        const currentXYMultiplier = isButton ? buttonXYMultiplier : xyMultiplier;
        const currentRotationMultiplier = isButton ? buttonRotationMultiplier : rotationMultiplier;

        // Compute offset from center to pointer
        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Compute raw torque (px²/frame)
        const rawTorque = offsetX * velY - offsetY * velX;

        // Normalize torque so rotation ∝ pointer speed (deg/sec)
        const leverDist = Math.hypot(offsetX, offsetY) || 1;
        const angularForce = rawTorque / leverDist;

        // Calculate and clamp velocities
        const velocityX = clampXY(velX * currentXYMultiplier);
        const velocityY = clampXY(velY * currentXYMultiplier);
        const rotationVelocity = clampRot(angularForce * currentRotationMultiplier);

        // Apply GSAP inertia tween
        gsap.to(target, {
          inertia: {
            x: { velocity: velocityX, end: 0 },
            y: { velocity: velocityY, end: 0 },
            rotation: { velocity: rotationVelocity, end: 0 },
            resistance: inertiaResistance
          }
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Mobile: Flick cards slider
  useEffect(() => {
    // Only initialize on mobile devices (max-width: 999px)
    const isMobile = window.matchMedia('(max-width: 999px)').matches;
    if (!isMobile || !sliderRef.current) return;

    const slider = sliderRef.current;
    const list = slider.querySelector('[data-flick-cards-list]');
    if (!list) return;

    const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]')) as HTMLElement[];
    const total = cards.length;
    let activeIndex = 0;

    const sliderWidth = slider.offsetWidth;
    const threshold = 0.1;

    // Generate draggers inside each card and store references
    const draggers: HTMLElement[] = [];
    cards.forEach(card => {
      const dragger = document.createElement('div');
      dragger.setAttribute('data-flick-cards-dragger', '');
      dragger.className = styles.flickCardsDragger;
      card.appendChild(dragger);
      draggers.push(dragger);
    });

    // Set initial drag status
    slider.setAttribute('data-flick-drag-status', 'grab');

    function getConfig(i: number, currentIndex: number) {
      let diff = i - currentIndex;
      if (diff > total / 2) diff -= total;
      else if (diff < -total / 2) diff += total;

      switch (diff) {
        case  0: return { x: 0,   y: 0,   rot: 0,  s: 1,   o: 1, z: 5 };
        case  1: return { x: 25,  y: 1,   rot: 10, s: 0.9, o: 1, z: 4 };
        case -1: return { x: -25, y: 1,   rot: -10,s: 0.9, o: 1, z: 4 };
        case  2: return { x: 45,  y: 5,   rot: 15, s: 0.8, o: 1, z: 3 };
        case -2: return { x: -45, y: 5,   rot: -15,s: 0.8, o: 1, z: 3 };
        default:
          const dir = diff > 0 ? 1 : -1;
          return { x: 55 * dir, y: 5, rot: 20 * dir, s: 0.6, o: 0, z: 2 };
      }
    }


    function renderCards(currentIndex: number) {
      cards.forEach((card, i) => {
        const cfg = getConfig(i, currentIndex);
        let status;

        if (cfg.x === 0)        status = 'active';
        else if (cfg.x === 25)  status = '2-after';
        else if (cfg.x === -25) status = '2-before';
        else if (cfg.x === 45)  status = '3-after';
        else if (cfg.x === -45) status = '3-before';
        else                    status = 'hidden';

        card.setAttribute('data-flick-cards-item-status', status);
        card.style.zIndex = String(cfg.z);

        gsap.to(card, {
          duration: 0.6,
          ease: 'elastic.out(1.2, 1)',
          xPercent: cfg.x,
          yPercent: cfg.y,
          rotation: cfg.rot,
          scale: cfg.s
        });
      });
    }

    renderCards(activeIndex);

    let pressClientX = 0;
    let pressClientY = 0;

    const draggableInstances = Draggable.create(draggers, {
      type: 'x',
      edgeResistance: 0.8,
      bounds: { minX: -sliderWidth / 2, maxX: sliderWidth / 2 },
      inertia: false,

      onPress() {
        pressClientX = this.pointerEvent.clientX;
        pressClientY = this.pointerEvent.clientY;
        slider.setAttribute('data-flick-drag-status', 'grabbing');
      },

      onDrag() {
        const rawProgress = this.x / sliderWidth;
        const progress = Math.min(1, Math.abs(rawProgress));
        const direction = rawProgress > 0 ? -1 : 1;
        const nextIndex = (activeIndex + direction + total) % total;

        cards.forEach((card, i) => {
          const from = getConfig(i, activeIndex);
          const to = getConfig(i, nextIndex);
          const mix = (prop: keyof typeof from) => from[prop] + (to[prop] - from[prop]) * progress;

          gsap.set(card, {
            xPercent: mix('x'),
            yPercent: mix('y'),
            rotation: mix('rot'),
            scale: mix('s')
          });
        });

      },

      onRelease() {
        slider.setAttribute('data-flick-drag-status', 'grab');

        const releaseClientX = this.pointerEvent.clientX;
        const releaseClientY = this.pointerEvent.clientY;
        const dragDistance = Math.hypot(releaseClientX - pressClientX, releaseClientY - pressClientY);

        const raw = this.x / sliderWidth;
        let shift = 0;
        if (raw > threshold) shift = -1;
        else if (raw < -threshold) shift = 1;

        if (shift !== 0) {
          activeIndex = (activeIndex + shift + total) % total;
          renderCards(activeIndex);
          hideSwipeHints();
        }

        gsap.to(this.target, {
          x: 0,
          duration: 0.3,
          ease: 'power1.out'
        });

        if (dragDistance < 4) {
          // Temporarily allow clicks to pass through
          (this.target as HTMLElement).style.pointerEvents = 'none';

          // Allow the DOM to register pointer-through
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const el = document.elementFromPoint(releaseClientX, releaseClientY);
              if (el) {
                const evt = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true
                });
                el.dispatchEvent(evt);
              }

              // Restore pointer events
              (this.target as HTMLElement).style.pointerEvents = 'auto';
            });
          });
        }
      }
    });

    return () => {
      draggableInstances.forEach(instance => instance.kill());
    };
  }, []);

  // Text Draw Effect
  useEffect(() => {
    const svgVariants = [
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025" stroke="#E55050" stroke-width="10" stroke-linecap="round"/></svg>`
    ];

    function decorateSVG(svgEl: SVGElement) {
      svgEl.setAttribute('preserveAspectRatio', 'none');
      svgEl.querySelectorAll('path').forEach(path => {
        path.setAttribute('stroke', 'currentColor');
      });
    }

    let nextIndex: number | null = null;

    // Helper function to activate the draw effect
    const activateDrawEffect = (box: Element) => {
      if (nextIndex === null) {
        nextIndex = Math.floor(Math.random() * svgVariants.length);
      }

      box.innerHTML = svgVariants[nextIndex];
      const svg = box.querySelector('svg');
      if (svg) {
        decorateSVG(svg);
        const path = svg.querySelector('path');
        if (path) {
          gsap.set(path, { drawSVG: '0%' });
          gsap.to(path, {
            duration: 0.5,
            drawSVG: '100%',
            ease: 'power2.inOut'
          });
        }
      }

      nextIndex = (nextIndex + 1) % svgVariants.length;
    };

    // Helper function to deactivate the draw effect
    const deactivateDrawEffect = (box: Element) => {
      const path = box.querySelector('path');
      if (!path) return;

      gsap.to(path, {
        duration: 0.5,
        drawSVG: '100% 100%',
        ease: 'power2.inOut',
        onComplete: () => {
          box.innerHTML = '';
        }
      });
    };

    // Desktop hover handlers
    document.querySelectorAll('[data-draw-line-trigger]').forEach(trigger => {
      const drawLineElement = trigger.querySelector('[data-draw-line]');
      if (!drawLineElement) return;

      const box = drawLineElement.querySelector('[data-draw-line-box]');
      if (!box) return;

      // Check if this is a mobile flick card
      const isMobileCard = trigger.hasAttribute('data-flick-cards-item');

      if (!isMobileCard) {
        // Desktop: use mouseenter/mouseleave
        let enterTween: gsap.core.Tween | null = null;
        let leaveTween: gsap.core.Tween | null = null;

        trigger.addEventListener('mouseenter', () => {
          if (enterTween && enterTween.isActive()) return;
          if (leaveTween && leaveTween.isActive()) leaveTween.kill();

          if (nextIndex === null) {
            nextIndex = Math.floor(Math.random() * svgVariants.length);
          }

          box.innerHTML = svgVariants[nextIndex];
          const svg = box.querySelector('svg');
          if (svg) {
            decorateSVG(svg);
            const path = svg.querySelector('path');
            if (path) {
              gsap.set(path, { drawSVG: '0%' });
              enterTween = gsap.to(path, {
                duration: 0.5,
                drawSVG: '100%',
                ease: 'power2.inOut',
                onComplete: () => { enterTween = null; }
              });
            }
          }

          nextIndex = (nextIndex + 1) % svgVariants.length;
        });

        trigger.addEventListener('mouseleave', () => {
          const path = box.querySelector('path');
          if (!path) return;

          const playOut = () => {
            if (leaveTween && leaveTween.isActive()) return;
            leaveTween = gsap.to(path, {
              duration: 0.5,
              drawSVG: '100% 100%',
              ease: 'power2.inOut',
              onComplete: () => {
                leaveTween = null;
                box.innerHTML = '';
              }
            });
          };

          if (enterTween && enterTween.isActive()) {
            enterTween.eventCallback('onComplete', playOut);
          } else {
            playOut();
          }
        });
      }
    });

    // Mobile: Activate effect for active card
    const observer = new MutationObserver(() => {
      const activeCard = document.querySelector('[data-flick-cards-item-status="active"]');

      // Clear all non-active cards
      document.querySelectorAll('[data-flick-cards-item]').forEach(item => {
        if (item !== activeCard) {
          const box = item.querySelector('[data-draw-line-box]');
          if (box && box.innerHTML) {
            deactivateDrawEffect(box);
          }
        }
      });

      // Activate effect on active card
      if (activeCard) {
        const box = activeCard.querySelector('[data-draw-line-box]');
        if (box && !box.innerHTML) {
          activateDrawEffect(box);
        }
      }
    });

    // Observe changes to data-flick-cards-item-status attributes
    const flickItems = document.querySelectorAll('[data-flick-cards-item]');
    flickItems.forEach(item => {
      observer.observe(item, { attributes: true, attributeFilter: ['data-flick-cards-item-status'] });
    });

    // ScrollTrigger to activate underline on first active card when scrolling into view (mobile only)
    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const dienstenSection = document.querySelector('[data-diensten-section]');

    if (isMobile && dienstenSection) {
      const st = ScrollTrigger.create({
        trigger: dienstenSection,
        start: 'top 10%',
        once: true,
        onEnter: () => {
          // Find the active card and activate its draw effect
          const activeCard = document.querySelector('[data-flick-cards-item-status="active"]');
          if (activeCard) {
            const box = activeCard.querySelector('[data-draw-line-box]');
            if (box && !box.innerHTML) {
              activateDrawEffect(box);
            }
          }
        }
      });

      return () => {
        observer.disconnect();
        st.kill();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Card click handler
  const handleCardClick = (card: any) => {
    if (card.serviceId) {
      // Navigate to diensten page with service parameter
      router.push(`/diensten?service=${card.serviceId}`);
    } else if (card.link && card.isExternal) {
      // Navigate to external page
      window.location.href = card.link;
    } else if (card.link) {
      // Smooth scroll to anchor with Lenis
      const targetId = card.link.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement && window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.5,
        });
      } else if (targetElement) {
        // Fallback for mobile (no Lenis)
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="diensten" className={styles.section} data-diensten-section="" data-nav-dark>
      <div className={styles.container}>
        {/* Title */}
        <h2 className={styles.title}>
          <span className={styles.titleText}>
            <span className={styles.titleTag} data-text="ontdek onze">ontdek onze</span>
            <span className={styles.mainTitle}>diensten</span>
          </span>
        </h2>

        {/* Desktop: Cards Grid with Momentum Hover (hidden on mobile) */}
        <div
          ref={cardsGridRef}
          className={styles.cardsGrid}
          data-momentum-hover-init
        >
          {desktopCards.map((card, index) => (
            <div
              key={index}
              className={styles.cardItem}
              data-momentum-hover-element
              data-draw-line-trigger
              data-cursor="pointer"
              onClick={() => handleCardClick(card)}
            >
              <div
                className={styles.card}
                data-momentum-hover-target
                style={{ transform: `rotate(${card.rotation}deg)` }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 999px) 320px, 450px"
                    className={styles.cardImage}
                  />
                  {/* Polaroid Frame Overlay */}
                  <div className={styles.frameOverlay}>
                    <Image
                      src={frames[card.frameIndex]}
                      alt=""
                      fill
                      className={styles.frameImage}
                      style={{ transform: card.flipFrame ? 'scaleX(-1)' : 'none' }}
                    />
                  </div>
                  {/* Caption positioned over frame bottom */}
                  <div className={styles.caption}>
                    <a data-draw-line="" className={styles.textDraw} style={{ transform: `rotate(${card.textRotation}deg)` }}>
                      <span className={styles.textDrawSpan}>
                        {card.caption}
                        {card.link && (
                          <svg className={styles.captionArrow} viewBox="0 0 15.86 18.26" fill="none">
                            <path d="M15.84,12.46l-.16-.04c-.06-.07.2-.26.16-.38l-.07-.03-.05-.08s-.09.02-.12.05l-.04.04s-.06.04-.07.02c0,0,0-.02.03-.05l.07-.08c.05-.05.11-.11.08-.13h-.04s.02-.06,0-.07l-.08.06s.11-.14.07-.18h-.01s-.05-.01-.08.02l-.11.14s-.03.03-.04.02h-.02c-.02-.14.13-.25.1-.27v-.02c-.24,0-.29.04-.75.52l-.3.31c-.3.32-.72.74-1.29,1.33l-1.23,1.17v-.27c-.01-.78-.02-1.85-.03-3.3l.11-7.67-2.02-2.06-.09-.11s-.05-.05-.1-.05c-.04-.07-.33-.35-.78-.79-.19-.19-.39-.39-.57-.56-.77.01-1.66.02-2.42.04-.64,0-1.17.03-1.41.04h-.14c-.32-.01-.79-.01-1.18-.02-.35,0-.67.04-.8.19,0,.02-.04.04-.07.04-.18,0-.28.07-.42.11-.11.02-.18.04-.18.06,0,.01.07.01.18.03l.04.02-.04.02h-.11s-.06,0-.06.02h.03c.07.03.29.01.29.05h0s-.29.02-.29.02c-.07,0-.1,0-.13.04t-.04.03l-.11-.03c-.1,0-.17.13-.28.13h-.03l-.03.03s.03.04.07.04h.03s.07,0,.08.02c-.07.05-.29.04-.39.05h-.04s.47.09.58.18h-.67c-.11.01-.22.01-.22.05-.03.01-.1.03-.1.05l.04.04s.11.03.18.03l.38-.04h.11c.11.03.15.05.15.07s-.11.02-.22.02h-.21c-.18,0-.17.06-.35.06h-.18c-.07,0-.1.08-.2.11-.04,0-.08,0-.08-.01l.07-.08-.03-.02c-.08.02-.18.08-.18.15l.04.04s-.07.02-.07.03v.02c.08.05.26.07.5.07l.57-.03.29.02.11.07s-.07.03-.18.03h-.11s-.03.02-.03.02c0,.04.07.08.11.07l.43.02.39-.03c.28.04.57.05.85.05l.46-.03c.07-.02.11-.02.18-.02.11,0,.21.02.32.03.21-.02.46-.04.67-.04.11,0,.22,0,.32.01l.22.02.71-.03c.07-.02.14-.04.21-.04.14,0,.32.03.5.03l.35-.02s.11,0,.14.01l.25.02.33-.02.06-.03h0s.02.04.02.04l.11.11c.42.43,1.19,1.22,1.37,1.4l.08.06.09.11.07.09c.05.05.1.05.17.12l.03.03c.07.11.16.21.25.31l.24.24.02.03v.03s0,.01,0,.01c0,0-.01,0-.01.01v.07s-.03.14-.03.14l.03.5c0,.07,0,.17-.02.25,0,.1-.05.18-.05.32l.02.1v.15s-.01.07.01.1l-.02.11.04.03-.02.11-.02.04h.04v.21s0,.07-.02.11l-.03.14.02.21v.22s.01.32.01.32l-.04.17v.15s.03.67.03.67l-.02.57.02.53c0,.22-.01.39-.05.43v.04s.06.07.06.1l-.02.07.02.29-.06.43.02.39-.02.1.02.14.02.11c0,.11-.03.22-.03.29s.02.14.06.21v.07s0,.32,0,.32q0,.07.02.07h.02v-.15s0-.1.01-.1l.02.03v.39c-.05.08-.06.15-.06.18v.18c0,.07,0,.11.04.11h.03c-.01.07-.01.1-.01.17l.02.36c0-.11.05-.15.05-.22v-.28s0-.11-.02-.11t.02-.03l-.03-.29v-.53s.03-.11.03-.11c.01,0,.03.25.04.57l.02-.29c0-.1,0-.14.02-.14,0,0,.01.14.02.32v.14q-.02.11-.04.11l-.02-.14c.02.61.04,1.49.1,1.55.03,0,.03.04.03.08v.14s0,.03,0,.03c.08,0,.12.23.15.41-.01-.01-.03-.02-.07-.01-.01-.04-.19-.21-.43-.44-.52-.49-1.35-1.26-1.58-1.46l-.06-.05c-.13-.13-.29-.33-.45-.48-.14-.14-.3-.24-.45-.19-.02.02-.04.02-.06,0-.07-.07-.16-.06-.24-.08-.06-.03-.1-.05-.11-.03-.02.01.01.04.04.09v.03s-.02,0-.02,0l-.04-.04s-.03-.03-.04-.02v.03s.11.11.09.13l-.02.02-.11-.11s-.04-.04-.08-.03t-.04,0l-.02-.07s-.16.03-.2,0l-.02-.02h-.04s-.01.05.01.07h.01s.03.04.02.05c-.07.01-.14-.08-.2-.11.02.05.11.24.1.34l-.28-.26c-.04-.05-.08-.09-.11-.06-.03,0-.07-.02-.08,0v.04s.01.07.04.09l.18.13.03.05c.03.06.03.08.02.1-.02,0-.06-.03-.1-.07l-.08-.09c-.07-.06-.11-.03-.18-.09l-.07-.07s-.1.01-.17-.01c-.01-.01-.02-.02-.01-.04l.08-.02v-.03s-.13-.01-.18.04v.04s-.05-.02-.06,0h-.01c-.01.08.05.16.15.25l.24.21.11.12v.1s-.06,0-.11-.05l-.04-.04h-.03s-.02.08,0,.1l.16.17.17.14c.09.14.19.26.31.37l.2.17s.05.02.08.05c.04.04.07.1.1.15.1.07.22.15.3.24.05.04.09.08.12.13l.07.1.3.26s.09.03.12.06c.05.05.1.15.17.22l.16.12s.04.04.04.07l.09.11.32.25.08.11.13.12c.25.23.66.7.76.79l.05.03.05.07s.02.04.05.07c.05.05.1.05.18.12l.02.03c.16.23.38.44.59.65l.42.44.08.07.02.03.2-.16.37-.4c.05-.06.13-.14.19-.18.09-.06.16-.08.27-.19l.08-.1.11-.1s.06-.06.07-.1l.1-.07v-.05l.05-.03h.03l-.03-.02.08-.09s.03-.03.06-.03l.08-.03.07-.1.09-.08.11-.14.1-.05.07-.04.23-.3.25-.21.19-.22c.08-.09.16-.15.21-.14h.01s-.01-.08,0-.09l.04-.02.1-.13.22-.12.13-.17.06-.03.04-.07.03-.06s.11-.06.13-.09c.03-.03.04-.07.05-.12v-.04s.15-.12.15-.12t.01-.04v-.02s-.07.06-.07.06c0,.02-.04.05-.05.03v-.02l.03-.03.13-.12c.06,0,.1-.02.11-.03l.07-.08s.04-.04.02-.06l-.03-.03s.05-.03.08-.06l.13-.16s-.1.02-.13.05l-.11.12s-.04.04-.02.06t-.03,0l-.1.12-.22.21-.05.03s.09-.13.19-.26l-.12.11s-.04.04-.06.04c.01-.03.05-.09.1-.14l.06-.06q.05-.03.07-.02l-.05.07c.22-.24.57-.61.55-.68-.02-.02-.01-.04.01-.05l.06-.05v-.02c-.07-.08.04-.25.09-.33l.04-.04c.09-.09-.02-.14.04-.19l.05-.03c.06-.06.06-.14.09-.2.04-.04.04-.07.01-.09ZM1.8,1.34s-.11-.02-.11-.04l.07-.02c.07,0,.11.02.11.04l-.07.02ZM7.74,1.6c-.73.02-1.53.04-2.3.07-.53,0-1.06-.01-1.56-.04l.64-.02,3.05-.04c.1,0,.16-.01.19,0,.01.01.01.02.01.03h-.03ZM8.13,2l-.19-.22c-.08-.06-.11-.08-.13-.09v-.04s0-.01,0-.01t.1.07l.36.34v.04s-.09-.05-.14-.09ZM8.67,2.52l-.23-.23-.04-.06.06.04.11.13.12.09.04.06-.06-.03ZM10.13,12.14s0,.11-.02.11c-.04-.18-.04-.46-.04-.67v-.32c0-.29-.02-.68.04-.68l.02.03c0,.39-.02.79-.03,1.14l.03.39ZM10.14,4.06l.05.05c.07.06.04.06.04.08h-.03s-.06-.11-.06-.13ZM10.27,12.28l-.03-.11v-.39c-.01-.1-.01-.21.02-.25l.03.5c0,.1,0,.24-.02.25ZM10.45,14.61l-.02-.1v-.15s.05.11.05.11c0,.07-.01.14-.03.14ZM6.46,12.94s-.03-.05-.02-.06h.04s.03.06.02.08l-.04-.02ZM8.73,15.58c-.34-.3-.71-.64-1.06-.96-.22-.21-.42-.43-.6-.64l.27.23,1.24,1.18c.12.11.19.18.19.21l-.04-.02ZM9.14,15.95s-.06-.01-.09-.04l-.11-.12-.11-.09-.02-.03.02-.02.11.09.2.19v.02ZM9.35,16.2l-.13-.12-.02-.04h.04s.06.09.06.09l.07.04.02.04h-.04ZM10.47,17.46s-.08-.14-.08-.15l.05.04c.05.05.09.11.09.14l-.06-.03ZM11.27,15.39s.01-.07.03-.07c0,0,.01.02.01.04l-.04.03ZM14.55,14.44s.08-.09.11-.09l-.02.07-.15.16s-.08.08-.12.07l.18-.21ZM14.76,14.48c-.04.09-.15.21-.23.29l-.13.13c-.11.12-.26.28-.3.24v-.03c.15-.16.33-.29.47-.43l.14-.17s.04-.05.05-.03ZM15.19,12.41s-.04.02-.06.01c0-.02.1-.13.13-.16l.05-.06s.09-.08.11-.06v.03l-.18.16-.05.08ZM15.43,13.36l-.07.04.02-.07s.07-.04.08-.03l-.03.06Z" fill="currentColor"/>
                          </svg>
                        )}
                      </span>
                      <div data-draw-line-box="" className={styles.textDrawBox}></div>
                    </a>
                  </div>
                  {/* Magnet Button */}
                  <div
                    className={styles.magnetButton}
                    data-momentum-hover-element
                    style={{
                      top: card.magnetPosition.top,
                      left: card.magnetPosition.left,
                      right: card.magnetPosition.right,
                    }}
                  >
                    <div
                      data-momentum-hover-target
                      style={{ transform: `rotate(${card.magnetPosition.rotation}deg)` }}
                    >
                      <Image
                        src={card.buttonImage}
                        alt=""
                        width={card.buttonSize}
                        height={card.buttonSize}
                        className={styles.magnetImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Flick Cards Slider (hidden on desktop) */}
        <div
          ref={sliderRef}
          className={styles.flickGroup}
          data-flick-cards-init
          data-flick-drag-status="grab"
        >
          <div className={styles.flickGroupRelativeObject}>
            <div className={styles.flickGroupRelativeObjectBefore}></div>
          </div>
          <div className={styles.flickGroupCollection} data-flick-cards-collection>
            <div className={styles.flickGroupList} data-flick-cards-list>
              {gymCards.map((card, index) => (
                <div
                  key={index}
                  className={styles.flickGroupItem}
                  data-flick-cards-item
                  data-flick-cards-item-status=""
                  data-draw-line-trigger
                  onClick={() => handleCardClick(card)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.flickCard}>
                    <div className={styles.flickCardMedia}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 999px) 350px, 450px"
                        className={styles.coverImage}
                      />
                      {/* Polaroid Frame Overlay */}
                      <div className={styles.flickFrameOverlay}>
                        <Image
                          src={frames[card.frameIndex]}
                          alt=""
                          fill
                          className={styles.flickFrameImage}
                          style={{ transform: card.flipFrame ? 'scaleX(-1)' : 'none' }}
                        />
                      </div>
                      {/* Caption positioned over frame bottom */}
                      <div className={styles.flickCaption}>
                        <a data-draw-line="" className={styles.textDraw} style={{ transform: `rotate(${card.textRotation}deg)` }}>
                          <span className={styles.textDrawSpan}>{card.caption}</span>
                          <div data-draw-line-box="" className={styles.textDrawBox}></div>
                        </a>
                      </div>
                      {/* Magnet Button */}
                      <div
                        className={styles.flickMagnetButton}
                        style={{
                          top: card.magnetPosition.top,
                          right: card.magnetPosition.right,
                          transform: `rotate(${card.magnetPosition.rotation}deg)`
                        }}
                      >
                        <Image
                          src={card.buttonImage}
                          alt=""
                          width={card.buttonSize}
                          height={card.buttonSize}
                          className={styles.flickMagnetImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe Hint Arrows */}
          {showSwipeHints && (
            <>
              <div className={styles.swipeHintLeft}>
                <div className={styles.swipeHintSprite}>
                  <Image src="/assets/stopmotion_icons/right1.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                  <Image src="/assets/stopmotion_icons/right2.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                  <Image src="/assets/stopmotion_icons/right3.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                </div>
              </div>
              <div className={styles.swipeHintRight}>
                <div className={styles.swipeHintSprite}>
                  <Image src="/assets/stopmotion_icons/right1.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                  <Image src="/assets/stopmotion_icons/right2.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                  <Image src="/assets/stopmotion_icons/right3.svg" alt="" width={24} height={24} className={styles.swipeHintIcon} />
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
