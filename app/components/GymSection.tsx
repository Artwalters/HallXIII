'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import styles from './GymSection.module.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

// 7 cards - ordered to avoid same card on wraparound
const gymCards = [
  { image: '/HallXIII/assets/expertise-3.jpg', title: 'COACHING?' },
  { image: '/HallXIII/assets/expertise-1.jpg', title: 'TRAINEN?' },
  { image: '/HallXIII/assets/expertise-2.jpg', title: 'LID WORDEN?' },
  { image: '/HallXIII/assets/expertise-3.jpg', title: 'COACHING?' },
  { image: '/HallXIII/assets/expertise-1.jpg', title: 'TRAINEN?' },
  { image: '/HallXIII/assets/expertise-2.jpg', title: 'LID WORDEN?' },
  { image: '/HallXIII/assets/expertise-1.jpg', title: 'TRAINEN?' },
];

export default function GymSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);

  // Desktop: Wave animation on scroll
  useEffect(() => {
    if (!cardsGridRef.current) return;

    const cards = cardsGridRef.current.querySelectorAll(`.${styles.card}`);

    const ctx = gsap.context(() => {
      // Set initial position - cards always start below
      gsap.set(cards, { y: 400 });

      // Create timeline with stagger for wave effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 2,
        }
      });

      // Animate cards up with stagger (wave from left to right)
      tl.to(cards, {
        y: 0,
        duration: 2,
        ease: 'power1.out',
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile: Flick cards slider
  useEffect(() => {
    // Only initialize on mobile devices (max-width: 768px)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile || !sliderRef.current || !titlesRef.current) return;

    const slider = sliderRef.current;
    const list = slider.querySelector('[data-flick-cards-list]');
    if (!list) return;

    const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]')) as HTMLElement[];
    const titles = Array.from(titlesRef.current.querySelectorAll('[data-title-item]')) as HTMLElement[];
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

    function getTitleConfig(i: number, currentIndex: number) {
      let diff = i - currentIndex;
      if (diff > total / 2) diff -= total;
      else if (diff < -total / 2) diff += total;

      switch (diff) {
        case  0: return { x: 0,   y: 0,  rot: 0,   s: 1,   o: 1, z: 5 };
        case  1: return { x: 120, y: 30, rot: 25,  s: 0.7, o: 0, z: 4 };
        case -1: return { x: -120, y: 30, rot: -25, s: 0.7, o: 0, z: 4 };
        default:
          const dir = diff > 0 ? 1 : -1;
          return { x: 150 * dir, y: 50, rot: 35 * dir, s: 0.5, o: 0, z: 2 };
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
          scale: cfg.s,
          opacity: cfg.o
        });
      });

      // Animate titles
      titles.forEach((title, i) => {
        const cfg = getTitleConfig(i, currentIndex);
        title.style.zIndex = String(cfg.z);

        gsap.to(title, {
          duration: 0.6,
          ease: 'elastic.out(1.2, 1)',
          xPercent: cfg.x,
          yPercent: cfg.y,
          rotation: cfg.rot,
          scale: cfg.s
        });

        // Opacity animates separately - only visible when active
        gsap.to(title, {
          duration: 0.15,
          ease: 'power2.out',
          opacity: cfg.o
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
            scale: mix('s'),
            opacity: mix('o')
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

        {/* Desktop: Cards Grid (hidden on mobile) */}
        <div ref={cardsGridRef} className={styles.cardsGrid}>
          {gymCards.slice(0, 3).map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className={styles.cardImage}
                />
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
                        className={styles.coverImage}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Title Slider */}
          <div ref={titlesRef} className={styles.titleSlider}>
            {gymCards.map((card, index) => (
              <h3
                key={index}
                className={styles.titleSliderItem}
                data-title-item
              >
                {card.title}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
