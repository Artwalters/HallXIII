'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import OnboardingForm from './OnboardingForm';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const el = wrapRef.current;
    const inner = el.querySelector('[data-footer-parallax-inner]') as HTMLElement;
    const dark = el.querySelector('[data-footer-parallax-dark]') as HTMLElement;

    if (!inner || !dark) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'clamp(top bottom)',
        end: 'clamp(top top)',
        scrub: true
      }
    });

    // Footer moves UP from -25% to 0%
    tl.from(inner, {
      yPercent: -25,
      ease: 'linear'
    });

    // Dark overlay fades IN from 0.5 to 1
    tl.from(dark, {
      opacity: 0.5,
      ease: 'linear'
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.footerWrap}
      data-footer-parallax
    >
      <footer
        className={styles.footer}
        data-footer-parallax-inner
      >
        <div className={styles.container}>
          {/* Onboarding Form - linksboven */}
          <div className={styles.onboardingFormWrapper}>
            <OnboardingForm />
          </div>

          {/* Top Section */}
          <div className={styles.topSection}>
            {/* Main Nav and Legal Links */}
            <div className={styles.topLinks}>
              {/* Main Navigation */}
              <div className={styles.mainNav}>
                <a href="#aanmelden" className={styles.navLink}>Aanmelden</a>
                <a href="#diensten" className={styles.navLink}>Diensten</a>
                <a href="#coaches" className={styles.navLink}>Coaches</a>
                <a href="#reviews" className={styles.navLink}>Reviews</a>
                <a href="#community" className={styles.navLink}>Community</a>
              </div>

              {/* Legal and Social Links */}
              <div className={styles.legalSocial}>
                <div className={styles.legalLinks}>
                  <a href="#terms" className={styles.legalLink}>Terms & Conditions</a>
                  <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
                  <a href="#investor" className={styles.legalLink}>Investor Privacy Notice</a>
                  <a href="#cookies" className={styles.legalLink}>Cookies Policy</a>
                </div>
                <div className={styles.socialLinks}>
                  <a href="https://instagram.com/hall_xiii" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
                  <a href="https://tiktok.com/@hall_xiii" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Tiktok</a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className={styles.middleSection}>
            {/* Addresses */}
            <div className={styles.addresses}>
              <div className={styles.addressBlock}>
                <h3 className={styles.addressTitle}>Bedrijf</h3>
                <address className={styles.addressText}>
                  Industrieweg 12D<br />
                  5262 GJ Vught<br />
                  The Netherlands
                </address>
              </div>
              <div className={styles.addressBlock}>
                <h3 className={styles.addressTitle}>Gym</h3>
                <address className={styles.addressText}>
                  Ollandseweg 139<br />
                  5491 XA St Oedenrode<br />
                  The Netherlands
                </address>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <h3 className={styles.newsletterTitle}>Nieuwsbrief</h3>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="chriscbum@voorbeeld.com"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  <Image
                    src="/assets/arrow-button.svg"
                    alt="Submit"
                    width={70}
                    height={72}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottom}>
            <p className={styles.designCredit}>
              design & code by <span className={styles.studioName}>Walters.studio</span>
            </p>
            <div className={styles.copyright}>
              <p className={styles.copyrightText}>Hall13 bv All Rights Reserved.</p>
              <p className={styles.copyrightYear}>©{new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
      <div
        className={styles.dark}
        data-footer-parallax-dark
      />
    </div>
  );
}
