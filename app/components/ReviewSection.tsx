'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import styles from './ReviewSection.module.css';

gsap.registerPlugin(InertiaPlugin);

const frames = [
  '/assets/frames poloroid/frame 1.png',
  '/assets/frames poloroid/frame2.png',
  '/assets/frames poloroid/frame 3.png',
  '/assets/frames poloroid/frame4.png',
];

const pins = [
  '/assets/pins/pin1.png',
  '/assets/pins/pin2.png',
];

const textRotations = [
  -1.5,
  2,
  -0.8,
  1.2,
  -2.2,
  1.8,
  -1.2,
  0.9,
  -1.8,
  1.5,
  -0.5,
  2.2,
];

const reviewItems = [
  {
    id: 1,
    title: 'Brand Campaign',
    client: 'Naïf',
    review: 'Geweldige samenwerking! De training heeft mij enorm geholpen.',
    image: '/assets/community-1.jpg',
    rotation: 2,
    frameIndex: 2,
    flipFrame: false,
    textRotation: textRotations[0],
    pinIndex: 0,
  },
  {
    id: 2,
    title: 'Brand Campaign',
    client: 'Oxxio',
    review: 'Top coach, ik heb mijn doelen bereikt en voel me fantastisch!',
    image: '/assets/community-2.jpg',
    rotation: -5,
    frameIndex: 0,
    flipFrame: true,
    textRotation: textRotations[1],
    pinIndex: 1,
  },
  {
    id: 3,
    title: 'Netflix Socials',
    client: 'Netflix',
    review: 'Professionele begeleiding en persoonlijke aandacht. Aanrader!',
    image: '/assets/expertise-1.jpg',
    rotation: 4,
    frameIndex: 3,
    flipFrame: false,
    textRotation: textRotations[2],
    pinIndex: 1,
  },
  {
    id: 4,
    title: 'Smoothiebox',
    client: 'Smoothiebox',
    review: 'De beste investering in mezelf. Resultaten zijn zichtbaar!',
    image: '/assets/gym-1.png',
    rotation: -2,
    frameIndex: 1,
    flipFrame: true,
    textRotation: textRotations[3],
    pinIndex: 0,
  },
  {
    id: 5,
    title: 'Kipsalon',
    client: 'KFC',
    review: 'Sterke motivatie en uitstekende trainingsplannen. Top!',
    image: '/assets/gym-2.png',
    rotation: 6,
    frameIndex: 0,
    flipFrame: false,
    textRotation: textRotations[4],
    pinIndex: 1,
  },
  {
    id: 6,
    title: 'Squid Game',
    client: 'Netflix',
    review: 'Ik ben sterker en gezonder dan ooit. Dank jullie wel!',
    image: '/assets/expertise-2.jpg',
    rotation: -3,
    frameIndex: 2,
    flipFrame: true,
    textRotation: textRotations[5],
    pinIndex: 0,
  },
  {
    id: 7,
    title: 'Lava wings',
    client: 'KFC',
    review: 'Persoonlijke aanpak en echte resultaten. Highly recommended!',
    image: '/assets/gym-3.png',
    rotation: 3,
    frameIndex: 3,
    flipFrame: true,
    textRotation: textRotations[6],
    pinIndex: 1,
  },
  {
    id: 8,
    title: 'Your Next Story',
    client: 'Cheaptickets',
    review: 'De coaches zijn gepassioneerd en betrokken. Super ervaring!',
    image: '/assets/expertise-3.jpg',
    rotation: -4,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[7],
    pinIndex: 0,
  },
  {
    id: 9,
    title: 'Jumbo Socials',
    client: 'Jumbo',
    review: 'Goede sfeer, professionele begeleiding. Ik kom hier met plezier!',
    image: '/assets/community-3.jpg',
    rotation: 1,
    frameIndex: 2,
    flipFrame: false,
    textRotation: textRotations[8],
    pinIndex: 1,
  },
  {
    id: 10,
    title: 'Hema socials',
    client: 'Hema',
    review: 'Mijn conditie is verbeterd en ik voel me zelfverzekerder.',
    image: '/assets/expertise-4.jpg',
    rotation: -6,
    frameIndex: 3,
    flipFrame: true,
    textRotation: textRotations[9],
    pinIndex: 0,
  },
  {
    id: 11,
    title: 'KFC Socials',
    client: 'KFC',
    review: 'Eindelijk een gym waar ik me thuis voel. Geweldig team!',
    image: '/assets/expertise-5.jpg',
    rotation: 5,
    frameIndex: 0,
    flipFrame: true,
    textRotation: textRotations[10],
    pinIndex: 1,
  },
  {
    id: 12,
    title: 'Skibidi school',
    client: 'Hema',
    review: 'De begeleiding is persoonlijk en de resultaten spreken voor zich!',
    image: '/assets/expertise-6.jpg',
    rotation: -1,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[11],
    pinIndex: 0,
  },
];

export default function ReviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reviewCount, setReviewCount] = useState(9);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setReviewCount(4); // Mobile: 1 kolom x 4 rijen
      } else if (width < 1024) {
        setReviewCount(6); // Tablet: 2 kolommen x 3 rijen
      } else {
        setReviewCount(9); // Desktop: 3 kolommen x 3 rijen
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Only run on devices with fine pointer (desktop/mouse)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    // Configuration (tweak these for feel)
    const rotationMultiplier = 15;  // multiplies normalized torque for rotation speed
    const inertiaResistance = 1500; // higher = stops sooner (natuurlijke pendulum afname)

    // Pre-build clamp functions for performance
    const clampRot = gsap.utils.clamp(-35, 35); // beperk de maximale rotatie voor subtiele schommel

    // Velocity tracking
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

    section.addEventListener('mousemove', handleMouseMove);

    // Attach hover inertia to each polaroid element
    const items = section.querySelectorAll('[data-momentum-hover-element]');

    const handleMouseEnter = (el: Element) => (e: Event) => {
      const target = el.querySelector('[data-momentum-hover-target]') as HTMLElement;
      if (!target) return;

      const mouseEvent = e as MouseEvent;

      // Compute offset from center to pointer
      const { left, top, width, height } = target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const offsetX = mouseEvent.clientX - centerX;
      const offsetY = mouseEvent.clientY - centerY;

      // Compute raw torque (px²/frame)
      const rawTorque = offsetX * velY - offsetY * velX;

      // Normalize torque so rotation ∝ pointer speed (deg/sec)
      const leverDist = Math.hypot(offsetX, offsetY) || 1;
      const angularForce = rawTorque / leverDist;

      // Calculate and clamp rotation velocity only (pendulum effect)
      const rotationVelocity = clampRot(angularForce * rotationMultiplier);

      // Apply GSAP inertia tween - only rotation for pendulum/swing effect
      gsap.to(target, {
        inertia: {
          rotation: {
            velocity: rotationVelocity,
            end: 0
          },
          resistance: inertiaResistance
        },
        duration: 1.8,
        ease: 'power1.out'
      });
    };

    // Store event handlers for cleanup
    const handlers: Array<{ el: Element; handler: (e: Event) => void }> = [];

    items.forEach((el) => {
      const handler = handleMouseEnter(el);
      el.addEventListener('mouseenter', handler);
      handlers.push({ el, handler });
    });

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      handlers.forEach(({ el, handler }) => {
        el.removeEventListener('mouseenter', handler);
      });
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-momentum-hover-init="">
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleWrapper}>
          <div className={styles.categoryTag}>
            <div className={styles.titleCircle}>
              <div className={styles.titleCircleSprite}>
                <svg viewBox="0 0 12 12" className={styles.titleCircleSvg}>
                  <circle cx="6" cy="6" r="5" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 12 12" className={styles.titleCircleSvg}>
                  <ellipse cx="6" cy="6" rx="5.3" ry="4.7" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 12 12" className={styles.titleCircleSvg}>
                  <ellipse cx="6" cy="6" rx="4.7" ry="5.3" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className={styles.categoryText}>reviews</span>
          </div>
          <h2 className={styles.sectionTitle}>Hal of Fame</h2>
        </div>

        {/* Klanten Reviews Grid */}
        <div className={styles.gridContainer}>
          {reviewItems.slice(0, reviewCount).map((item, index) => (
            <div
              key={item.id}
              className={styles.reviewItem}
              data-momentum-hover-element=""
              data-frame-index={item.frameIndex}
            >
              <div
                className={styles.polaroid}
                data-momentum-hover-target=""
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                {/* Pin */}
                <div className={styles.pinWrapper}>
                  <Image
                    src={pins[item.pinIndex]}
                    alt=""
                    width={60}
                    height={60}
                    className={styles.pinImage}
                  />
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 320px, 450px"
                    className={styles.image}
                  />
                  {/* Polaroid Frame Overlay */}
                  <div className={styles.frameOverlay}>
                    <Image
                      src={frames[item.frameIndex]}
                      alt=""
                      fill
                      className={styles.frameImage}
                      style={{ transform: item.flipFrame ? 'scaleX(-1)' : 'none' }}
                    />
                  </div>
                  {/* Caption positioned over frame bottom */}
                  <div className={styles.caption}>
                    <p className={styles.reviewText} style={{ transform: `rotate(${item.textRotation}deg)` }}>{item.review}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJN7BgM8mXwEcRPNFHxmPl6co"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleBadge}
        >
          <svg className={styles.googleBadgeLogo} viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#000000" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#000000" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#000000" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#000000" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
            <path fill="#000000" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
          </svg>
          <div className={styles.googleBadgeRating}>
            <div className={styles.ratingCircleWrapper}>
              <div className={styles.ratingCircleSprite}>
                <svg viewBox="0 0 50 50" className={styles.ratingCircleSvg}>
                  <circle cx="25" cy="25" r="23" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg viewBox="0 0 50 50" className={styles.ratingCircleSvg}>
                  <ellipse cx="25" cy="25" rx="24" ry="22" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg viewBox="0 0 50 50" className={styles.ratingCircleSvg}>
                  <ellipse cx="25" cy="25" rx="22" ry="24" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <span className={styles.googleBadgeScore}>5/5</span>
          </div>
        </a>
      </div>
    </section>
  );
}
