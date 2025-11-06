'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import styles from './TeamSection.module.css';

gsap.registerPlugin(Draggable);

const teamMembers = [
  {
    id: 1,
    name: 'Arthur',
    role: 'Head Coach',
    image: '/assets/community-1.jpg',
    quote: 'Ik help je het maximale uit jezelf te halen',
  },
  {
    id: 2,
    name: 'Lisa',
    role: 'Performance Coach',
    image: '/assets/community-2.jpg',
    quote: 'Prestaties beginnen met de juiste mindset',
  },
  {
    id: 3,
    name: 'Mike',
    role: 'Strength & Conditioning',
    image: '/assets/community-3.jpg',
    quote: 'Kracht is meer dan alleen fysiek vermogen',
  },
  {
    id: 4,
    name: 'Sarah',
    role: 'Nutrition Coach',
    image: '/assets/expertise-1.jpg',
    quote: 'Voeding is de basis van je transformatie',
  },
  {
    id: 5,
    name: 'Tom',
    role: 'Personal Trainer',
    image: '/assets/expertise-2.jpg',
    quote: 'Samen maken we jouw doelen werkelijkheid',
  },
  {
    id: 6,
    name: 'Emma',
    role: 'Lifestyle Coach',
    image: '/assets/expertise-3.jpg',
    quote: 'Balans in je leven creëert blijvende resultaten',
  },
  {
    id: 7,
    name: 'David',
    role: 'Mobility Coach',
    image: '/assets/expertise-4.jpg',
    quote: 'Mobiliteit is de sleutel tot vrije beweging',
  },
];

export default function TeamSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const list = slider.querySelector('[data-flick-cards-list]') as HTMLElement;
    const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]')) as HTMLElement[];
    const total = cards.length;
    let activeIndex = 0;

    const sliderWidth = slider.offsetWidth;
    const threshold = 0.1;

    // Generate draggers inside each card
    const draggers: HTMLElement[] = [];
    cards.forEach(card => {
      const dragger = document.createElement('div');
      dragger.setAttribute('data-flick-cards-dragger', '');
      dragger.className = styles.dragger;
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
        case 0: return { x: 0, y: 0, rot: 0, s: 1, o: 1, z: 5 };
        case 1: return { x: 12, y: 0, rot: 3, s: 0.95, o: 0.85, z: 4 };
        case -1: return { x: -12, y: 0, rot: -3, s: 0.95, o: 0.85, z: 4 };
        case 2: return { x: 22, y: 0, rot: 5, s: 0.9, o: 0.7, z: 3 };
        case -2: return { x: -22, y: 0, rot: -5, s: 0.9, o: 0.7, z: 3 };
        default:
          const dir = diff > 0 ? 1 : -1;
          return { x: 32 * dir, y: 0, rot: 7 * dir, s: 0.85, o: 0, z: 2 };
      }
    }

    function renderCards(currentIndex: number) {
      cards.forEach((card, i) => {
        const cfg = getConfig(i, currentIndex);
        let status;

        if (cfg.x === 0) status = 'active';
        else if (cfg.x === 12) status = '2-after';
        else if (cfg.x === -12) status = '2-before';
        else if (cfg.x === 22) status = '3-after';
        else if (cfg.x === -22) status = '3-before';
        else status = 'hidden';

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
    }

    renderCards(activeIndex);

    if (total < 7) {
      console.log('Not minimum of 7 cards');
      return;
    }

    let pressClientX = 0;
    let pressClientY = 0;

    const draggableInstances = Draggable.create(draggers, {
      type: 'x',
      edgeResistance: 0.8,
      bounds: { minX: -sliderWidth / 2, maxX: sliderWidth / 2 },
      inertia: false,

      onPress(this: any) {
        pressClientX = this.pointerEvent.clientX;
        pressClientY = this.pointerEvent.clientY;
        slider.setAttribute('data-flick-drag-status', 'grabbing');
      },

      onDrag(this: any) {
        const rawProgress = this.x / sliderWidth;
        const progress = Math.min(1, Math.abs(rawProgress));
        const direction = rawProgress > 0 ? -1 : 1;
        const nextIndex = (activeIndex + direction + total) % total;

        cards.forEach((card, i) => {
          const from = getConfig(i, activeIndex);
          const to = getConfig(i, nextIndex);
          const mix = (prop: keyof ReturnType<typeof getConfig>) =>
            from[prop] + ((to[prop] as number) - (from[prop] as number)) * progress;

          gsap.set(card, {
            xPercent: mix('x'),
            yPercent: mix('y'),
            rotation: mix('rot'),
            scale: mix('s'),
            opacity: mix('o')
          });
        });
      },

      onRelease(this: any) {
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
          this.target.style.pointerEvents = 'none';

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
              this.target.style.pointerEvents = 'auto';
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
        {/* Title */}
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>Ons Team</h2>
          <p className={styles.subtitle}>maak kennis met onze coaches</p>
        </div>

        {/* Flick Cards */}
        <div ref={sliderRef} data-flick-cards-init="" className={styles.flickGroup}>
          <div className={styles.relativeObject}>
            <div className={styles.relativeObjectBefore} />
          </div>
          <div data-flick-cards-collection="" className={styles.collection}>
            <div data-flick-cards-list="" className={styles.list}>
              {teamMembers.map((member) => (
                <div key={member.id} data-flick-cards-item="" className={styles.item}>
                  <div className={styles.card}>
                    <div className={styles.cardBefore} />
                    <div className={styles.cardMedia}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 320px, 376px"
                        className={styles.image}
                      />
                      <p className={styles.quote}>{member.quote}</p>
                      <h3 className={styles.name}>{member.name}</h3>
                      <div className={styles.roleButton}>
                        <span className={styles.role}>{member.role}</span>
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
