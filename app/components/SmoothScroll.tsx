'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Skip smooth scroll on touch devices (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Store lenis instance on window for access in other components
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}
