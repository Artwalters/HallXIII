'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransition } from '../context/TransitionContext';
import styles from './TransitionOverlay.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TransitionOverlay() {
  const { shape1Ref, shape2Ref, shape3Ref, resetTransition } = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const isInitialLoad = useRef(true);

  // Mount portal after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial positions AFTER shapes are mounted
  useEffect(() => {
    if (!mounted) return;

    // Set initial positions (off-screen)
    gsap.set(shape1Ref.current, { x: '-100%', y: '-100%' });
    gsap.set(shape2Ref.current, { y: '100%' });
    gsap.set(shape3Ref.current, { x: '100%' });
  }, [mounted, shape1Ref, shape2Ref, shape3Ref]);

  // Handle enter animation when pathname or search params change
  useEffect(() => {
    // Skip enter animation on initial page load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Reset scroll position
    window.scrollTo(0, 0);

    // Wait for page content to be rendered before animating out
    // Use requestAnimationFrame to ensure browser has painted
    const startEnterAnimation = () => {
      // Enter animation: paper shapes animate back out
      const enterTimeline = gsap.timeline({
        onComplete: () => {
          // Reset transition state so next transition can happen
          resetTransition();

          // Resume Lenis scroll and resize
          if (typeof window !== 'undefined' && window.lenis) {
            window.lenis.start();
            window.lenis.resize();
          }

          // Refresh ScrollTrigger for new page content
          // Multiple refreshes to ensure layout is fully settled
          ScrollTrigger.refresh();
          setTimeout(() => {
            ScrollTrigger.refresh();
            if (window.lenis) window.lenis.resize();
          }, 100);
          setTimeout(() => {
            ScrollTrigger.refresh();
            if (window.lenis) window.lenis.resize();
          }, 300);
        }
      });

      enterTimeline
        .to(shape3Ref.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(shape2Ref.current, {
          y: '100%',
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.35')
        .to(shape1Ref.current, {
          x: '-100%',
          y: '-100%',
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.35');
    };

    // Wait for next frame + small delay to ensure page content is rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Additional delay for mobile devices and slow connections
        setTimeout(startEnterAnimation, 100);
      });
    });
  }, [pathname, searchParams, shape1Ref, shape2Ref, shape3Ref, resetTransition]);

  const overlay = (
    <div className={styles.transitionContainer} aria-hidden="true">
      {/* Shape 1 - Top Left */}
      <div
        ref={shape1Ref}
        className={`${styles.shape} ${styles.shape1}`}
      >
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image
            src="/assets/overlays/overlay.jpg"
            alt=""
            fill
            className={styles.overlayImage}
          />
        </div>
      </div>

      {/* Shape 2 - Bottom */}
      <div
        ref={shape2Ref}
        className={`${styles.shape} ${styles.shape2}`}
      >
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image
            src="/assets/overlays/overlay.jpg"
            alt=""
            fill
            className={styles.overlayImage}
          />
        </div>
      </div>

      {/* Shape 3 - Right */}
      <div
        ref={shape3Ref}
        className={`${styles.shape} ${styles.shape3}`}
      >
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image
            src="/assets/overlays/overlay.jpg"
            alt=""
            fill
            className={styles.overlayImage}
          />
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level, bypassing stacking contexts
  if (!mounted) return null;
  return createPortal(overlay, document.body);
}
