'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './ReviewSection.module.css';

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(InertiaPlugin, DrawSVGPlugin, ScrollTrigger, SplitText);
}

const frames = [
  '/assets/frames poloroid/frame 1.webp',
  '/assets/frames poloroid/frame2.webp',
  '/assets/frames poloroid/frame 3.webp',
  '/assets/frames poloroid/frame4.webp',
];

const pins = [
  '/assets/pins/pin1v2.webp',
  '/assets/pins/pin2v2.webp',
  '/assets/pins/pin3v2.webp',
  '/assets/pins/pin4v2.webp',
  '/assets/pins/pin5v2.webp',
];

const textRotations = [
  -0.75,
  1,
  -0.4,
  0.6,
  -1.1,
  0.9,
  -0.6,
  0.45,
  -0.9,
  0.75,
  -0.25,
  1.1,
];

const reviewItems = [
  {
    id: 1,
    title: 'Brand Campaign',
    client: 'Naïf',
    review: 'Geweldige samenwerking! De training heeft mij enorm geholpen.',
    image: '/assets/community-1.webp',
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
    image: '/assets/community-2.webp',
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
    image: '/assets/expertise-1.webp',
    rotation: 4,
    frameIndex: 3,
    flipFrame: false,
    textRotation: textRotations[2],
    pinIndex: 2,
  },
  {
    id: 4,
    title: 'Smoothiebox',
    client: 'Smoothiebox',
    review: 'De beste investering in mezelf. Resultaten zijn zichtbaar!',
    image: '/assets/gym-1.webp',
    rotation: -2,
    frameIndex: 1,
    flipFrame: true,
    textRotation: textRotations[3],
    pinIndex: 3,
  },
  {
    id: 5,
    title: 'Kipsalon',
    client: 'KFC',
    review: 'Sterke motivatie en uitstekende trainingsplannen. Top!',
    image: '/assets/gym-2.webp',
    rotation: 6,
    frameIndex: 0,
    flipFrame: false,
    textRotation: textRotations[4],
    pinIndex: 4,
  },
  {
    id: 6,
    title: 'Squid Game',
    client: 'Netflix',
    review: 'Ik ben sterker en gezonder dan ooit. Dank jullie wel!',
    image: '/assets/expertise-2.webp',
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
    image: '/assets/gym-3.webp',
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
    image: '/assets/expertise-3.webp',
    rotation: -4,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[7],
    pinIndex: 2,
  },
  {
    id: 9,
    title: 'Jumbo Socials',
    client: 'Jumbo',
    review: 'Goede sfeer, professionele begeleiding. Ik kom hier met plezier!',
    image: '/assets/community-3.webp',
    rotation: 1,
    frameIndex: 2,
    flipFrame: false,
    textRotation: textRotations[8],
    pinIndex: 3,
  },
  {
    id: 10,
    title: 'Hema socials',
    client: 'Hema',
    review: 'Mijn conditie is verbeterd en ik voel me zelfverzekerder.',
    image: '/assets/expertise-4.webp',
    rotation: -6,
    frameIndex: 3,
    flipFrame: true,
    textRotation: textRotations[9],
    pinIndex: 4,
  },
  {
    id: 11,
    title: 'KFC Socials',
    client: 'KFC',
    review: 'Eindelijk een gym waar ik me thuis voel. Geweldig team!',
    image: '/assets/expertise-5.webp',
    rotation: 5,
    frameIndex: 0,
    flipFrame: true,
    textRotation: textRotations[10],
    pinIndex: 0,
  },
  {
    id: 12,
    title: 'Skibidi school',
    client: 'Hema',
    review: 'De begeleiding is persoonlijk en de resultaten spreken voor zich!',
    image: '/assets/expertise-6.webp',
    rotation: -1,
    frameIndex: 1,
    flipFrame: false,
    textRotation: textRotations[11],
    pinIndex: 1,
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

  // Red underline draw effect on scroll
  useEffect(() => {
    const svgVariants = [
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
      `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`
    ];

    function decorateSVG(svgEl: SVGElement) {
      svgEl.setAttribute('preserveAspectRatio', 'none');
      svgEl.querySelectorAll('path').forEach(path => {
        path.setAttribute('stroke', 'currentColor');
      });
    }

    const trigger = document.querySelector('[data-cta-scroll-trigger]');
    if (!trigger) return;

    const box = trigger.querySelector('[data-cta-draw-box]');
    if (!box) return;

    let nextIndex = Math.floor(Math.random() * svgVariants.length);

    // Pick a random SVG variant and set it up
    box.innerHTML = svgVariants[nextIndex];

    const svg = box.querySelector('svg');
    if (!svg) return;

    decorateSVG(svg);
    let path = svg.querySelector('path');
    if (!path) return;

    // Set initial state - line not drawn
    gsap.set(path, { drawSVG: '0%' });

    // Create scroll trigger animation - draws once on scroll
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: 'top 85%',
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to(path, {
          duration: 0.8,
          drawSVG: '100%',
          ease: 'power2.inOut'
        });
      }
    });

    // Hover effect - animate out old line, then draw new line on hover
    let enterTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      if (enterTween && enterTween.isActive()) return;

      // First animate out the current line
      enterTween = gsap.to(path, {
        duration: 0.5,
        drawSVG: '100% 100%',
        ease: 'power2.inOut',
        onComplete: () => {
          // Then pick next SVG variant and draw it in
          nextIndex = (nextIndex + 1) % svgVariants.length;
          box.innerHTML = svgVariants[nextIndex];

          const newSvg = box.querySelector('svg');
          if (newSvg) {
            decorateSVG(newSvg);
            const newPath = newSvg.querySelector('path');
            if (newPath) {
              path = newPath;
              gsap.set(path, { drawSVG: '0%' });
              enterTween = gsap.to(path, {
                duration: 0.5,
                drawSVG: '100%',
                ease: 'power2.inOut',
                onComplete: () => { enterTween = null; }
              });
            }
          }
        }
      });
    };

    trigger.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      st.kill();
      trigger.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Category label animation: circle pops in first, then text reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const labels = section.querySelectorAll(`.${styles.categoryTag}`);
    const splits: SplitText[] = [];

    labels.forEach((label) => {
      const circle = label.querySelector(`.${styles.titleCircle}`);
      const text = label.querySelector(`.${styles.categoryText}`);

      if (!circle || !text) return;

      // Circle stays visible, only hide text initially
      gsap.set(text, { autoAlpha: 0 });

      const split = SplitText.create(text, {
        type: 'lines, words, chars',
        mask: 'lines',
        autoSplit: true,
        onSplit: (instance) => {
          // Set chars to starting position (below the mask)
          gsap.set(instance.chars, { yPercent: 110 });

          // Create timeline for sequenced animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none reset',
              invalidateOnRefresh: true
            }
          });

          // Text reveals smoothly from behind mask
          tl.set(text, { autoAlpha: 1 })
          .to(instance.chars, {
            yPercent: 0,
            duration: 0.53,
            stagger: 0.012,
            ease: 'power3.out'
          });

          return tl;
        }
      });

      splits.push(split);
    });

    return () => {
      splits.forEach(split => split.revert());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-momentum-hover-init="" data-nav-dark="">
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
      </div>

      {/* Call to Action */}
      <div className={styles.ctaWrapper}>
        {/* Google Badge above text */}
        <div className={styles.googleBadge}>
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
          <svg className={styles.googleBadgeLogo} viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#000000" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#000000" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#000000" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#000000" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
            <path fill="#000000" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
          </svg>
        </div>
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJN7BgM8mXwEcRPNFHxmPl6co"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaText}
        >
Zelf ervaring bij Hal 13?
          <br />
          <span className={styles.ctaUnderlineText} data-cta-scroll-trigger="">Laat een review achter<span className={styles.ctaDrawBox} data-cta-draw-box=""></span></span>
        </a>
      </div>
    </section>
  );
}
