'use client';

import { createContext, useContext, useRef, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TransitionContextType {
  triggerTransition: (href: string) => void;
  resetTransition: () => void;
  shape1Ref: React.RefObject<HTMLDivElement | null>;
  shape2Ref: React.RefObject<HTMLDivElement | null>;
  shape3Ref: React.RefObject<HTMLDivElement | null>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const resetTransition = useCallback(() => {
    isTransitioning.current = false;
  }, []);

  const triggerTransition = useCallback((href: string) => {
    // Don't transition to same page
    if (href === pathname || isTransitioning.current) return;

    // Check if shapes are ready
    if (!shape1Ref.current || !shape2Ref.current || !shape3Ref.current) {
      // Fallback: just navigate without animation
      router.push(href);
      return;
    }

    isTransitioning.current = true;

    // Prefetch the page first
    router.prefetch(href);

    // Stop Lenis scroll
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.stop();
    }

    // Kill any active ScrollTriggers to prevent issues
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Exit animation: paper shapes animate in from outside
    const exitTimeline = gsap.timeline({
      onComplete: () => {
        // Small delay to ensure page is prefetched
        setTimeout(() => {
          router.push(href);
        }, 50);
      }
    });

    exitTimeline
      .to(shape1Ref.current, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .to(shape2Ref.current, {
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.35')
      .to(shape3Ref.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.35');
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ triggerTransition, resetTransition, shape1Ref, shape2Ref, shape3Ref }}>
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
