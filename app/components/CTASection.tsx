'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CTASection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !digit1Ref.current || !digit2Ref.current || !digit3Ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 10%',
          end: 'center center',
          scrub: 1.5,
        }
      });

      // Cijfer 1: blijft op 0 (geen animatie nodig)
      tl.to(digit1Ref.current, {
        y: '1%', // Blijft op 0
        duration: 1,
      }, 0)
      // Cijfer 2: van 1 naar 0 (terugtellen)
      .fromTo(digit2Ref.current, {
        y: '-9%', // Start op 1
      }, {
        y: '1%', // Gaat naar 0
        duration: 1,
        ease: 'none',
      }, 0)
      // Cijfer 3: van 3 naar 0 (terugtellen)
      .fromTo(digit3Ref.current, {
        y: '-29%', // Start op 3
      }, {
        y: '1%', // Gaat naar 0
        duration: 1,
        ease: 'none',
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Content Wrapper - centered */}
        <div className={styles.contentWrapper}>
          {/* 013 Number with Counter Animation */}
          <div className={styles.numberWrapper}>
            <h2 className={styles.bigNumber}>
              <div className={styles.counterContainer}>
                <div className={styles.digitWrapper}>
                  <div className={styles.digitColumn} ref={digit1Ref}>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                  </div>
                </div>
                <div className={styles.digitWrapper}>
                  <div className={styles.digitColumn} ref={digit2Ref}>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                  </div>
                </div>
                <div className={styles.digitWrapper}>
                  <div className={styles.digitColumn} ref={digit3Ref}>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                  </div>
                </div>
              </div>
            </h2>
          </div>

          {/* Main Text */}
          <div className={styles.mainTextWrapper}>
            <p className={styles.mainText}>excuses meer</p>
            <p className={styles.mainText}>het is tijd</p>
            <p className={styles.mainText}>voor actie</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className={styles.buttonWrapper}>
          <button className={styles.ctaButton}>
            <span>beginnen met coaching</span>
          </button>
          <div className={styles.arrowCircle}>
            <svg width="100%" height="100%" viewBox="0 0 57 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28.5" cy="29" r="28.5" fill="#285A66"/>
              <path d="M20 29H37M37 29L30 22M37 29L30 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* LID WORDEN Text */}
        <div className={styles.lidText}>
          <p className={styles.lidWordenText}>lid worden?</p>
        </div>
      </div>
    </section>
  );
}
