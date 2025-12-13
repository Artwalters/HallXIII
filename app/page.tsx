import HeroExpertiseCombined from './components/HeroExpertiseCombined';
import CoachingSection from './components/CoachingSection';
import CoachesSection from './components/CoachesSection';
import DienstenSection from './components/DienstenSection';
import CommunitySection from './components/CommunitySection';
import ReviewSection from './components/ReviewSection';
import FooterSection from './components/CTAFooterCombined';

export default function Home() {
  return (
    <main style={{ width: '100%', minHeight: 'calc(100 * var(--avh))' }}>
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
