'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GymSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const gymCards = [
  {
    image: '/assets/expertise-1.jpg',
  },
  {
    image: '/assets/expertise-2.jpg',
  },
  {
    image: '/assets/expertise-3.jpg',
  },
];

export default function GymSection() {
  const cardsGridRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <h2 className={styles.title}>DE GYM</h2>

        {/* Cards */}
        <div ref={cardsGridRef} className={styles.cardsGrid}>
          {gymCards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className={styles.cardImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
