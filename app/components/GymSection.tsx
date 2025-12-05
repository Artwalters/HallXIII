'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import styles from './GymSection.module.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

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
    title: 'TRAINEN?',
    caption: 'Dagpas aanvragen',
    rotation: 2,
    frameIndex: 0,
    flipFrame: false,
    textRotation: textRotations[0],
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'LID WORDEN?',
    caption: 'Lid worden',
    rotation: -1,
    frameIndex: 2,
    flipFrame: true,
    textRotation: textRotations[1],
  },
  {
    image: '/assets/expertise-3.jpg',
    title: 'COACHING?',
    caption: 'Coaching traject starten',
    rotation: 4,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[2],
  },
];

// 7 cards for mobile flick - ordered to avoid same card on wraparound
const gymCards = [
  {
    image: '/assets/expertise-3.jpg',
    title: 'COACHING?',
    caption: 'Coaching traject starten',
    rotation: 3,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -0.8,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'TRAINEN?',
    caption: 'Dagpas aanvragen',
    rotation: -2,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 1.2,
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'LID WORDEN?',
    caption: 'Lid worden',
    rotation: 4,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.5,
  },
  {
    image: '/assets/expertise-3.jpg',
    title: 'COACHING?',
    caption: 'Coaching traject starten',
    rotation: -3,
    frameIndex: 3,
    flipFrame: true,
    textRotation: 1.8,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'TRAINEN?',
    caption: 'Dagpas aanvragen',
    rotation: 2,
    frameIndex: 1,
    flipFrame: false,
    textRotation: -1.2,
  },
  {
    image: '/assets/expertise-2.jpg',
    title: 'LID WORDEN?',
    caption: 'Lid worden',
    rotation: -4,
    frameIndex: 0,
    flipFrame: true,
    textRotation: 0.9,
  },
  {
    image: '/assets/expertise-1.jpg',
    title: 'TRAINEN?',
    caption: 'Dagpas aanvragen',
    rotation: 5,
    frameIndex: 2,
    flipFrame: false,
    textRotation: -1.8,
  },
];

export default function GymSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);

  // Desktop: Momentum-based hover animation with inertia (only on desktop)
  useEffect(() => {
    // If this device can't hover with a fine pointer, stop here
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    // Only initialize on desktop devices (min-width: 769px)
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    if (!isDesktop) return;

    const root = cardsGridRef.current;
    if (!root) return;

    // Configuration (tweak these for feel)
    const xyMultiplier = 30;  // multiplies pointer velocity for x/y movement
    const rotationMultiplier = 20;  // multiplies normalized torque for rotation speed
    const inertiaResistance = 200; // higher = stops sooner

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
        const velocityX = clampXY(velX * xyMultiplier);
        const velocityY = clampXY(velY * xyMultiplier);
        const rotationVelocity = clampRot(angularForce * rotationMultiplier);

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
    // Only initialize on mobile devices (max-width: 768px)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Subtitle */}
        <p className={styles.subtitle}>welkom bij</p>

        {/* Title */}
        <h2 className={styles.title}>hal13</h2>

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
            >
              <div
                className={styles.card}
                data-momentum-hover-target
                style={{ transform: `rotate(${card.rotation}deg)` }}
              >
                <div className={styles.cardBefore}></div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 320px, 450px"
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
                    <p
                      className={styles.captionText}
                      style={{ transform: `rotate(${card.textRotation}deg)` }}
                    >
                      {card.caption}
                    </p>
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
                >
                  <div className={styles.flickCard}>
                    <div className={styles.flickCardBefore}></div>
                    <div className={styles.flickCardMedia}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 350px, 450px"
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
                        <p
                          className={styles.flickCaptionText}
                          style={{ transform: `rotate(${card.textRotation}deg)` }}
                        >
                          {card.caption}
                        </p>
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
