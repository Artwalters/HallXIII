'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import styles from './DienstenSection.module.css';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, Draggable, DrawSVGPlugin);

// Polaroid frames
const frames = [
  '/assets/frames poloroid/frame 1.png',
  '/assets/frames poloroid/frame2.png',
  '/assets/frames poloroid/frame 3.png',
  '/assets/frames poloroid/frame4.png',
];

// Text rotations for organic look
const textRotations = [-1.5, 1.2, -0.8];

// 3 cards for desktop momentum hover
const desktopCards = [
  {
    image: '/assets/expertise-1.jpg',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 2,
    frameIndex: 0,
    flipFrame: false,
    textRotation: textRotations[0],
    magnetPosition: { top: '3%', left: '8%', rotation: -8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.png',
    buttonSize: 120,
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: -1,
    frameIndex: 2,
    flipFrame: true,
    textRotation: textRotations[1],
    magnetPosition: { top: '5%', right: '5%', rotation: 12 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.png',
    buttonSize: 120,
  },
  {
    image: '/assets/expertise-3.jpg',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: 4,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[2],
    magnetPosition: { top: '2%', left: '6%', rotation: -5 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.png',
    buttonSize: 138,
  },
];

// 7 cards for mobile flick - ordered to avoid same card on wraparound
const gymCards = [
  {
    image: '/assets/expertise-3.jpg',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: 3,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -0.8,
    magnetPosition: { top: '-8%', right: '5%', rotation: -12 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.png',
    buttonSize: 161,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: -2,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 1.2,
    magnetPosition: { top: '-6%', right: '3%', rotation: 8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.png',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: 4,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.5,
    magnetPosition: { top: '-10%', right: '8%', rotation: -15 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.png',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-3.jpg',
    title: 'coaching trajecten',
    caption: 'coaching trajecten',
    rotation: -3,
    frameIndex: 3,
    flipFrame: true,
    textRotation: 1.8,
    magnetPosition: { top: '-5%', right: '6%', rotation: 18 },
    link: '#coaching-trajecten',
    isExternal: false,
    buttonImage: '/assets/buttons/MAE_button.png',
    buttonSize: 161,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 2,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -1.2,
    magnetPosition: { top: '-7%', right: '4%', rotation: -10 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.png',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'lid worden (opengym)',
    caption: 'lid worden (opengym)',
    rotation: -4,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 0.9,
    magnetPosition: { top: '-9%', right: '7%', rotation: 14 },
    serviceId: 'open-gym',
    buttonImage: '/assets/buttons/XIII_button.png',
    buttonSize: 140,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'dagpas (opengym)',
    caption: 'dagpas (opengym)',
    rotation: 5,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.8,
    magnetPosition: { top: '-6%', right: '5%', rotation: -8 },
    serviceId: 'dagpas-opengym',
    buttonImage: '/assets/buttons/XIII_button_red.png',
    buttonSize: 140,
  },
];

export default function DienstenSection() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);

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
        <h2 className={styles.title}>diensten</h2>

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
              onClick={() => handleCardClick(card)}
              style={{ cursor: 'pointer' }}
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
                      <span className={styles.textDrawSpan}>{card.caption}</span>
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

        </div>
      </div>
    </section>
  );
}
