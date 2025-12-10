'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Track of dit de allereerste page load is (buiten component, persistent)
let isInitialPageLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const shape1 = document.getElementById('transition-shape-1');
    const shape2 = document.getElementById('transition-shape-2');
    const shape3 = document.getElementById('transition-shape-3');

    // Skip animatie alleen op allereerste page load
    if (isInitialPageLoad) {
      isInitialPageLoad = false;

      // Zorg dat shapes buiten beeld staan bij eerste load
      if (shape1) gsap.set(shape1, { x: '-100%', y: '-100%' });
      if (shape2) gsap.set(shape2, { y: '100%' });
      if (shape3) gsap.set(shape3, { x: '100%' });
      return;
    }

    // Reset scroll
    window.scrollTo(0, 0);

    // Herstel scroll (was geblokkeerd tijdens exit)
    document.body.style.overflow = '';

    // Enter animatie: shapes UIT
    const enterTimeline = gsap.timeline({
      onComplete: () => {
        // Resume Lenis (desktop only)
        if (window.lenis) {
          window.lenis.start();
          window.lenis.resize();
        }

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    });

    enterTimeline
      .to(shape3, { x: '100%', duration: 0.4, ease: 'power2.out' })
      .to(shape2, { y: '100%', duration: 0.4, ease: 'power2.out' }, '-=0.35')
      .to(shape1, { x: '-100%', y: '-100%', duration: 0.4, ease: 'power2.out' }, '-=0.35');
  }, []);

  return <>{children}</>;
}
