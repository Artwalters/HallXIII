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

const handwritingFonts = [
  '"Handlee", cursive',
  '"Gochi Hand", cursive',
  '"Edu NSW ACT Cursive", cursive',
  '"Shadows Into Light", cursive',
  '"Gloria Hallelujah", cursive',
  '"Reenie Beanie", cursive',
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
    fontFamily: handwritingFonts[0],
    textRotation: textRotations[0],
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
    fontFamily: handwritingFonts[1],
    textRotation: textRotations[1],
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
    fontFamily: handwritingFonts[2],
    textRotation: textRotations[2],
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
    fontFamily: handwritingFonts[3],
    textRotation: textRotations[3],
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
    fontFamily: handwritingFonts[4],
    textRotation: textRotations[4],
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
    fontFamily: handwritingFonts[5],
    textRotation: textRotations[5],
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
    fontFamily: handwritingFonts[0],
    textRotation: textRotations[6],
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
    fontFamily: handwritingFonts[1],
    textRotation: textRotations[7],
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
    fontFamily: handwritingFonts[2],
    textRotation: textRotations[8],
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
    fontFamily: handwritingFonts[3],
    textRotation: textRotations[9],
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
    fontFamily: handwritingFonts[4],
    textRotation: textRotations[10],
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
    fontFamily: handwritingFonts[5],
    textRotation: textRotations[11],
  },
];

export default function ReviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
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
  }, [isMobile]);

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
          <h2 className={styles.sectionTitle}>Hall of Fame</h2>
        </div>

        {/* Klanten Reviews Grid */}
        <div className={styles.gridContainer}>
          {(isMobile ? reviewItems.slice(0, 6) : reviewItems.slice(0, 9)).map((item, index) => (
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
                    <p className={styles.reviewText} style={{ fontFamily: item.fontFamily, transform: `rotate(${item.textRotation}deg)` }}>{item.review}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
