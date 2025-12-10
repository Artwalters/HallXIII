'use client';

import { createContext, useContext, useRef, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TransitionVariant = 'horizontal' | 'vertical' | 'diagonal';

interface TransitionContextType {
  triggerTransition: (href: string) => void;
  resetTransition: () => void;
  shape1Ref: React.RefObject<HTMLDivElement | null>;
  shape2Ref: React.RefObject<HTMLDivElement | null>;
  currentVariant: React.MutableRefObject<TransitionVariant>;
  onVariantChange: React.MutableRefObject<((variant: TransitionVariant) => void) | null>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

const variants: TransitionVariant[] = ['horizontal', 'vertical', 'diagonal'];

export function TransitionProvider({ children }: { children: ReactNode }) {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const currentVariant = useRef<TransitionVariant>('horizontal');
  const onVariantChange = useRef<((variant: TransitionVariant) => void) | null>(null);
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
    if (!shape1Ref.current || !shape2Ref.current) {
      // Fallback: just navigate without animation
      router.push(href);
      return;
    }

    isTransitioning.current = true;

    // Pick random variant and notify listener
    currentVariant.current = variants[Math.floor(Math.random() * variants.length)];
    if (onVariantChange.current) {
      onVariantChange.current(currentVariant.current);
    }

    // Prefetch the page first
    router.prefetch(href);

    // Stop Lenis scroll
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.stop();
    }

    // Kill any active ScrollTriggers to prevent issues
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial positions - altijd horizontaal (container roteert)
    gsap.set(shape1Ref.current, { x: '-100%' });
    gsap.set(shape2Ref.current, { x: '100%' });

    // Exit animation: paper shapes animate in from outside
    const exitTimeline = gsap.timeline({
      onComplete: () => {
        // Small delay to ensure page is prefetched
        setTimeout(() => {
          router.push(href);
        }, 50);
      }
    });

    // Altijd horizontale animatie - container roteert voor variatie
    exitTimeline
      .to(shape1Ref.current, { x: 0, duration: 0.5, ease: 'power2.inOut' })
      .to(shape2Ref.current, { x: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.45');
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ triggerTransition, resetTransition, shape1Ref, shape2Ref, currentVariant, onVariantChange }}>
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
