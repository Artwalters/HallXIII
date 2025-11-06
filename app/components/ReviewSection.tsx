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

    items.forEach((el) => {
      const target = el.querySelector('[data-momentum-hover-target]') as HTMLElement;
      if (!target) return;

      el.addEventListener('mouseenter', (e: Event) => {
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
              end: 0,
              ease: 'sine.out'
            },
            resistance: inertiaResistance
          },
          duration: 1.8,
          ease: 'power1.out'
        });
      });
    });

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-momentum-hover-init="">
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>Hall of Fame</h2>
          <p className={styles.subtitle}>prestaties waar wij trots op zijn</p>
        </div>

        {/* Klanten Reviews Grid */}
        <div className={styles.gridContainer}>
          {(isMobile ? reviewItems.slice(0, 6) : reviewItems.slice(0, 9)).map((item, index) => (
            <div
              key={item.id}
              className={styles.reviewItem}
              data-momentum-hover-element=""
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
                    <p className={styles.reviewText}>{item.review}</p>
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
