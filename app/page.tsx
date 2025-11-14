import Hero from './components/Hero';
import ExpertiseSection from './components/ExpertiseSection';
import GymSection from './components/GymSection';
import CoachingSection from './components/CoachingSection';
import CoachingSlider from './components/CoachingSlider';
import CommunitySection from './components/CommunitySection';
import ReviewSection from './components/ReviewSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <Hero />
      <ExpertiseSection />
      <GymSection />
      <CoachingSection />
      <CoachingSlider />

      {/* Wrapper met gradient achtergrond voor Community section */}
      <div style={{
        background: 'linear-gradient(to bottom, var(--color-cream) 0%, var(--color-black) 100%)',
        position: 'relative'
      }}>
        <CommunitySection />
      </div>

      {/* Zwarte achtergrond voor onderste secties */}
      <div style={{ backgroundColor: 'var(--color-black)' }}>
        <ReviewSection />
        <CTASection />
      </div>
    </main>
  );
}
