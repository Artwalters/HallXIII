'use client';

import { useEffect } from 'react';
import HeroExpertiseCombined from './components/HeroExpertiseCombined';
import CoachingSection from './components/CoachingSection';
import CoachesSection from './components/CoachesSection';
import DienstenSection from './components/DienstenSection';
import CommunitySection from './components/CommunitySection';
import ReviewSection from './components/ReviewSection';
import FooterSection from './components/CTAFooterCombined';

export default function Home() {
  // Restore scroll position when navigating back
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navigatingBack = sessionStorage.getItem('navigatingBack');
    const savedPosition = sessionStorage.getItem('homeScrollPosition');

    if (navigatingBack === 'true' && savedPosition) {
      // Clear the flag
      sessionStorage.removeItem('navigatingBack');

      // Restore scroll position after a brief delay to ensure DOM is ready
      const position = parseInt(savedPosition, 10);

      // Use requestAnimationFrame to ensure the page has rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Use Lenis scrollTo if available (for smooth scroll), otherwise use window.scrollTo
          if (window.lenis) {
            window.lenis.scrollTo(position, { immediate: true });
          } else {
            window.scrollTo({
              top: position,
              behavior: 'instant' as ScrollBehavior,
            });
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
