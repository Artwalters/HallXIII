'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MarqueeScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeScrollProps {
  title: string;
  subtitle: string | ReactNode;
  direction?: -1 | 1;
  speed?: number;
  scrollSpeed?: number;
  backgroundColor?: string;
  showIcon?: boolean;
  rotate?: number;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function MarqueeScroll({
  title,
  subtitle,
  direction = -1,
  speed = 25,
  scrollSpeed = 10,
  backgroundColor = 'transparent',
  showIcon = true,
  rotate = 0,
  paddingTop,
  paddingBottom,
}: MarqueeScrollProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !scrollRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const marqueeContainer = marqueeRef.current!;
      const marqueeScroll = scrollRef.current!;
      const marqueeContent = contentRef.current!;

      // Duplicate content for seamless loop
      const fragment = document.createDocumentFragment();
      const duplicate = 5; // Increased to ensure enough content fills the screen
      for (let i = 0; i < duplicate; i++) {
        fragment.appendChild(marqueeContent.cloneNode(true));
      }
      marqueeContent.parentElement?.appendChild(fragment);

      // Speed calculation
      const contentWidth = marqueeContent.offsetWidth;
      const windowWidth = window.innerWidth;
      const speedMultiplier = windowWidth < 479 ? 0.25 : windowWidth < 991 ? 0.5 : 1;
      const calculatedSpeed = speed * (contentWidth / windowWidth) * speedMultiplier;

      // Parallax setup
      gsap.set(marqueeScroll, {
        marginLeft: `-${scrollSpeed}%`,
        width: `${scrollSpeed * 2 + 100}%`,
      });

      // Get all marquee content items
      const allContent = marqueeContent.parentElement?.querySelectorAll('[data-marquee-content]');
      if (!allContent) return;

      // Base animation
      const animation = gsap.to(allContent, {
        xPercent: -100,
        repeat: -1,
        duration: calculatedSpeed,
        ease: 'linear',
        modifiers: {
          xPercent: gsap.utils.unitize((x) => parseFloat(x) % 100),
        },
      }).totalProgress(0.5);

      animation.timeScale(direction);
      animation.play();

      // Scroll direction inversion
      ScrollTrigger.create({
        trigger: marqueeContainer,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const isInverted = self.direction === 1;
          const currentDirection = isInverted ? -direction : direction;
          animation.timeScale(currentDirection);
        },
      });

      // Extra parallax effect
      const scrollStart = direction === -1 ? scrollSpeed : -scrollSpeed;

      gsap.timeline({
        scrollTrigger: {
          trigger: marqueeContainer,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0,
        },
      }).fromTo(
        marqueeScroll,
        { x: `${scrollStart}vw` },
        { x: `${-scrollStart}vw`, ease: 'none' }
      );

    });

    return () => ctx.revert();
  }, [direction, speed, scrollSpeed]);

  return (
    <div
      ref={marqueeRef}
      className={styles.marqueeContainer}
      style={{
        backgroundColor,
        transform: `rotate(${rotate}deg)`,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom
      }}
    >
      <div ref={scrollRef} className={styles.marqueeScroll}>
        <div className={styles.marqueeInner}>
          <div ref={contentRef} data-marquee-content className={styles.marqueeContent}>
            <div className={styles.marqueeItem}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
