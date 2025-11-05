'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExpertiseSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftColumnRef.current || !middleColumnRef.current || !rightColumnRef.current) return;

    // Check screen size for responsive values
    const getAnimationValues = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        return {
          leftRightStart: -200,
          leftRightEnd: -100,
          middleStart: -50,
          middleEnd: -150,
        };
      } else if (width < 1024) {
        // Medium
        return {
          leftRightStart: -350,
          leftRightEnd: -150,
          middleStart: -100,
          middleEnd: -300,
        };
      } else {
        // Large+
        return {
          leftRightStart: -450,
          leftRightEnd: -250,
          middleStart: -150,
          middleEnd: -550,
        };
      }
    };

    const values = getAnimationValues();

    const ctx = gsap.context(() => {
      // Set initial positions immediately
      gsap.set(leftColumnRef.current, { y: values.leftRightStart });
      gsap.set(middleColumnRef.current, { y: values.middleStart });
      gsap.set(rightColumnRef.current, { y: values.leftRightStart });

      // Left column - scroll down
      gsap.to(leftColumnRef.current, {
        y: values.leftRightEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Middle column - scroll up
      gsap.to(middleColumnRef.current, {
        y: values.middleEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Right column - scroll down
      gsap.to(rightColumnRef.current, {
        y: values.leftRightEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title & Description */}
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            een sportschool met diverse expertises
          </h2>
          <p className={styles.description}>
            Hal 13 is de sportschool waar je verschillende disciplines kunt ontdekken, van krachtsport en powerlifting tot atletische doelen. Onze coaches en externe experts staan klaar om je te helpen bij het optimaal ontwikkelen van jouw sportieve ambities.
          </p>
        </div>

        {/* Image Grid Container - Overflow Hidden for Animation */}
        <div ref={containerRef} className={styles.imageContainer}>
          {/* Top Gradient Overlay */}
          <div className={styles.topGradient} />

          {/* Bottom Gradient Overlay */}
          <div className={styles.bottomGradient} />

          <div className={styles.columnsContainer}>
            {/* Left Column - Scrolls Down */}
            <div ref={leftColumnRef} className={styles.column}>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            </div>

            {/* Middle Column - Scrolls Up */}
            <div ref={middleColumnRef} className={styles.column}>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            </div>

            {/* Right Column - Scrolls Down */}
            <div ref={rightColumnRef} className={styles.column}>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
