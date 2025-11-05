import Hero from './components/Hero';
import ExpertiseSection from './components/ExpertiseSection';
import GymSection from './components/GymSection';

export default function Home() {
  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <Hero />
      <ExpertiseSection />
      <GymSection />
    </main>
  );
}
