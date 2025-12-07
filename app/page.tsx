'use client';

import { useEffect, useRef } from 'react';
import HeroExpertiseCombined from './components/HeroExpertiseCombined';
import CoachingSection from './components/CoachingSection';
import CoachesSection from './components/CoachesSection';
import DienstenSection from './components/DienstenSection';
import CommunitySection from './components/CommunitySection';
import ReviewSection from './components/ReviewSection';
import FooterSection from './components/CTAFooterCombined';

export default function Home() {
  const hasRestoredScroll = useRef(false);

  // Restore scroll position when navigating back
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasRestoredScroll.current) return; // Prevent double execution in StrictMode

    const navigatingBack = sessionStorage.getItem('navigatingBack');
    const returnToSection = sessionStorage.getItem('returnToSection');

    if (navigatingBack === 'true' && returnToSection) {
      hasRestoredScroll.current = true;

      // Clear the flags
      sessionStorage.removeItem('navigatingBack');
      sessionStorage.removeItem('returnToSection');

      // Map section identifiers to DOM IDs
      const sectionMap: { [key: string]: string } = {
        'diensten': 'diensten',
        'coaching': 'coaching-trajecten'
      };

      const targetId = sectionMap[returnToSection];

      // Scroll to section after a brief delay to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            // Use Lenis scrollTo if available (for smooth scroll), otherwise use scrollIntoView
            if (window.lenis) {
              window.lenis.scrollTo(targetElement, { immediate: true, offset: 0 });
            } else {
              targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          }
        });
      });
    }
  }, []);

  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <HeroExpertiseCombined />
      <DienstenSection />
      <CoachingSection />
      <CoachesSection />

      {/* Wrapper met gradient achtergrond voor Community section */}
      <div style={{
        background: 'linear-gradient(to bottom, var(--color-black) 0%, var(--color-black) 100%)',
        position: 'relative'
      }}>
        <CommunitySection />
      </div>

      {/* Zwarte achtergrond voor ReviewSection */}
      <div style={{ backgroundColor: 'var(--color-black)' }}>
        <ReviewSection />
      </div>

      {/* Footer Section */}
      <FooterSection />
    </main>
  );
}
