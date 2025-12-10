'use client';

import { createContext, useContext, useRef, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TransitionContextType {
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const triggerTransition = useCallback((href: string) => {
    if (href === pathname || isTransitioning.current) return;

    isTransitioning.current = true;

    // Stop scroll (desktop: Lenis, mobile: CSS)
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    // Kill ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Get shapes by ID
    const shape1 = document.getElementById('transition-shape-1');
    const shape2 = document.getElementById('transition-shape-2');
    const shape3 = document.getElementById('transition-shape-3');

    // Exit animation: shapes IN
    const exitTimeline = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        router.push(href);
      }
    });

    exitTimeline
      .to(shape1, { x: 0, y: 0, duration: 0.5, ease: 'power2.inOut' })
      .to(shape2, { y: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.45')
      .to(shape3, { x: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.45');
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
