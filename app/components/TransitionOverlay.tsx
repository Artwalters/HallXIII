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
  const { shape1Ref, shape2Ref, resetTransition, currentVariant, onVariantChange } = useTransition();
  const [variant, setVariant] = useState<'horizontal' | 'vertical' | 'diagonal' | 'diagonalMirrored'>('horizontal');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const isInitialLoad = useRef(true);

  // Mount portal after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Register variant change callback
  useEffect(() => {
    onVariantChange.current = (newVariant) => {
      setVariant(newVariant);
    };
    return () => {
      onVariantChange.current = null;
    };
  }, [onVariantChange]);

  // Set initial positions AFTER shapes are mounted
  useEffect(() => {
    if (!mounted) return;

    // Initial position: shapes buiten beeld (links en rechts)
    gsap.set(shape1Ref.current, { x: '-100%' });
    gsap.set(shape2Ref.current, { x: '100%' });
  }, [mounted, shape1Ref, shape2Ref]);

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

      // Shapes animeren UIT - altijd horizontaal (container roteert)
      enterTimeline
        .to(shape1Ref.current, { x: '-100%', duration: 0.6, ease: 'power1.inOut' })
        .to(shape2Ref.current, { x: '100%', duration: 0.6, ease: 'power1.inOut' }, '-=0.55');
    };

    // Wait for next frame + small delay to ensure page content is rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(startEnterAnimation, 100);
      });
    });
  }, [pathname, searchParams, shape1Ref, shape2Ref, resetTransition, currentVariant]);

  // Bepaal CSS class voor inner container rotatie
  const getInnerClass = () => {
    switch (variant) {
      case 'vertical': return styles.innerVertical;
      case 'diagonal': return styles.innerDiagonal;
      case 'diagonalMirrored': return styles.innerDiagonalMirrored;
      default: return styles.innerHorizontal;
    }
  };

  const overlay = (
    <div className={styles.transitionContainer} aria-hidden="true">
      {/* Inner container die we roteren */}
      <div className={`${styles.transitionInner} ${getInnerClass()}`}>
        {/* Shape 1 - links */}
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

        {/* Shape 2 - rechts */}
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
      </div>
    </div>
  );

  // Use portal to render at document body level, bypassing stacking contexts
  if (!mounted) return null;
  return createPortal(overlay, document.body);
}
