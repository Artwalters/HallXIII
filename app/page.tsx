import HeroExpertiseCombined from './components/HeroExpertiseCombined';
import CoachingSection from './components/CoachingSection';
import CoachesSection from './components/CoachesSection';
import CommunitySection from './components/CommunitySection';
import ReviewSection from './components/ReviewSection';
import CTAFooterCombined from './components/CTAFooterCombined';

export default function Home() {
  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <HeroExpertiseCombined />
      <CoachingSection />
      <CoachesSection />

      {/* Wrapper met gradient achtergrond voor Community section */}
      <div style={{
        background: 'linear-gradient(to bottom, var(--color-cream) 0%, var(--color-black) 100%)',
        position: 'relative'
      }}>
        <CommunitySection />
      </div>

      {/* Zwarte achtergrond voor ReviewSection */}
      <div style={{ backgroundColor: 'var(--color-black)' }}>
        <ReviewSection />
      </div>

      {/* CTA en Footer gecombineerd */}
      <CTAFooterCombined />
    </main>
  );
}
