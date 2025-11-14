import Image from 'next/image';
import OnboardingForm from './OnboardingForm';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      {/* Background Image Container - Responsive */}
      <div className={styles.backgroundImage}>
        <Image
          alt="Sport achtergrond"
          src="/assets/hero-bg.png"
          width={1530}
          height={1954}
          priority
        />
      </div>

      {/* Content Container - Responsive with max-width */}
      <div className={styles.contentContainer}>

        {/* Navigation Menu - Responsive */}
        <nav className={styles.nav}>
          {/* Logo - Responsive scaling */}
          <div className={styles.logo}>
            <div className={styles.logoPart1}>
              <Image
                alt="Hall XIII Logo"
                src="/assets/logo-part1.svg"
                width={170}
                height={58}
              />
            </div>
            <div className={styles.logoPart2}>
              <Image
                alt="Hall XIII Logo onderdeel"
                src="/assets/logo-part2.svg"
                width={185}
                height={52}
              />
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className={styles.desktopNav}>
            <a href="#diensten" className={styles.navLink}>
              Diensten
            </a>
            <a href="#team" className={styles.navLink}>
              Team
            </a>
            <a href="#events" className={styles.navLink}>
              events
            </a>
            <a href="#contact" className={styles.navLink}>
              contact
            </a>
          </div>

          {/* Menu Button - Responsive */}
          <button className={styles.menuButton}>
            <span className={styles.menuText}>menu</span>
            <Image
              src="/assets/underline-1.svg"
              alt=""
              width={80}
              height={5}
              className={styles.menuUnderline}
            />
          </button>
        </nav>

        {/* Main Content - Responsive Layout */}
        <div className={styles.mainContent}>
          {/* Heading - Responsive Typography */}
          <h1 className={styles.heading}>
            de hal waar sport en<br />
            expertise samen komen.
          </h1>

          {/* Onboarding Form */}
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
