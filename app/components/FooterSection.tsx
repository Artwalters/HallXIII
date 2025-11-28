'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FooterSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const basePath = process.env.NODE_ENV === 'production' ? '/HallXIII' : '';

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter Animation
    if (sectionRef.current && digit1Ref.current && digit2Ref.current && digit3Ref.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'center center',
            scrub: 3,
          }
        });

        // Set initial positions
        tl.set(digit1Ref.current, { yPercent: 0 });
        tl.set(digit2Ref.current, { yPercent: -10 });
        tl.set(digit3Ref.current, { yPercent: -30 });

        // Cijfer 1: blijft op 0 (geen animatie nodig)
        tl.to(digit1Ref.current, {
          yPercent: 0,
          duration: 1,
        }, 0)
        // Cijfer 2: van 1 naar 0 (terugtellen)
        .to(digit2Ref.current, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, 0)
        // Cijfer 3: van 3 naar 0 (terugtellen)
        .to(digit3Ref.current, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, 0);
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
    <section className={styles.section} ref={sectionRef}>
      {/* Texture Overlay */}
      <div
        className={styles.overlay}
        style={{
          backgroundImage: `url(${basePath}/assets/overlays/noise_repeat_texture.webp)`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }}
      />

      {/* Shadow/Light Overlay */}
      <div className={styles.shadowOverlay}>
        <Image
          src={`${basePath}/assets/overlays/shadow_overlay.png`}
          alt=""
          fill
          className={styles.shadowOverlayImage}
        />
      </div>

      <div className={styles.container}>
        {/* Content Wrapper - centered */}
        <div className={styles.contentWrapper}>
          {/* 013 Number with Counter Animation */}
          <div className={styles.numberContainer}>
            <div className={`${styles.numberGroup} ${styles.digit1}`}>
              <div className={styles.numberWrap} ref={digit1Ref}>
                <span className={styles.number}>0</span>
              </div>
            </div>
            <div className={`${styles.numberGroup} ${styles.digit2}`}>
              <div className={styles.numberWrap} ref={digit2Ref}>
                <span className={styles.number}>0</span>
                <span className={styles.number}>1</span>
                <span className={styles.number}>2</span>
                <span className={styles.number}>3</span>
                <span className={styles.number}>4</span>
                <span className={styles.number}>5</span>
                <span className={styles.number}>6</span>
                <span className={styles.number}>7</span>
                <span className={styles.number}>8</span>
                <span className={styles.number}>9</span>
              </div>
            </div>
            <div className={`${styles.numberGroup} ${styles.digit3}`}>
              <div className={styles.numberWrap} ref={digit3Ref}>
                <span className={styles.number}>0</span>
                <span className={styles.number}>1</span>
                <span className={styles.number}>2</span>
                <span className={styles.number}>3</span>
                <span className={styles.number}>4</span>
                <span className={styles.number}>5</span>
                <span className={styles.number}>6</span>
                <span className={styles.number}>7</span>
                <span className={styles.number}>8</span>
                <span className={styles.number}>9</span>
              </div>
            </div>
          </div>

          {/* Main Text */}
          <div className={styles.mainTextWrapper}>
            <p className={styles.mainText}>excuses meer</p>
            <p className={styles.mainText}>het is tijd</p>
            <p className={styles.mainText}>voor actie</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
