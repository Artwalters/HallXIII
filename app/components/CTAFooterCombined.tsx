'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OnboardingForm from './OnboardingForm';
import styles from './CTAFooterCombined.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTAFooterCombined() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const footerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CTA Counter Animation
    if (ctaSectionRef.current && digit1Ref.current && digit2Ref.current && digit3Ref.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 10%',
            end: 'center center',
            scrub: 1.5,
          }
        });

        // Cijfer 1: blijft op 0 (geen animatie nodig)
        tl.to(digit1Ref.current, {
          y: '1%',
          duration: 1,
        }, 0)
        // Cijfer 2: van 1 naar 0 (terugtellen)
        .fromTo(digit2Ref.current, {
          y: '-9%',
        }, {
          y: '1%',
          duration: 1,
          ease: 'none',
        }, 0)
        // Cijfer 3: van 3 naar 0 (terugtellen)
        .fromTo(digit3Ref.current, {
          y: '-29%',
        }, {
          y: '1%',
          duration: 1,
          ease: 'none',
        }, 0);
      });

      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Footer Parallax Animation
    if (!footerWrapRef.current) return;

    const el = footerWrapRef.current;
    const inner = el.querySelector('[data-footer-parallax-inner]') as HTMLElement;
    const dark = el.querySelector('[data-footer-parallax-dark]') as HTMLElement;

    if (!inner || !dark) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: inner,
        start: 'top bottom',
        end: 'top top',
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
    <>
      {/* SVG Filter Definition for Emboss Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="ctaEmbossFilter" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create bevel effect using specular lighting */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5"
                                specularExponent="20" lightingColor="white" result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                         k1="0" k2="1" k3="0.05" k4="0"/>
          </filter>
        </defs>
      </svg>

      <div className={styles.wrapper} ref={wrapperRef}>
      {/* Black top overlay */}
      <div className={styles.blackTopOverlay} />

      {/* CTA SECTION */}
      <section className={styles.ctaSection} ref={ctaSectionRef}>
        <div className={styles.clippedContent}>
          {/* Texture Overlay */}
          <div className={styles.overlay}>
            <Image
              src="/assets/overlays/overlay.jpg"
              alt=""
              fill
              className={styles.overlayImage}
            />
          </div>

          <div className={styles.ctaContainer}>
            {/* Content Wrapper - centered */}
            <div className={styles.contentWrapper}>
              {/* 013 Number with Counter Animation */}
              <div className={styles.numberWrapper}>
                <h2 className={styles.bigNumber}>
                  <div className={styles.counterContainer}>
                    <div className={styles.digitWrapper}>
                      <div className={styles.digitColumn} ref={digit1Ref}>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                      </div>
                    </div>
                    <div className={styles.digitWrapper}>
                      <div className={styles.digitColumn} ref={digit2Ref}>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                      </div>
                    </div>
                    <div className={styles.digitWrapper}>
                      <div className={styles.digitColumn} ref={digit3Ref}>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                      </div>
                    </div>
                  </div>
                </h2>
              </div>

              {/* Main Text */}
              <div className={styles.mainTextWrapper}>
                <p className={styles.mainText}>excuses meer</p>
                <p className={styles.mainText}>het is tijd</p>
                <p className={styles.mainText}>voor actie</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaWrapper}>
              <div className={styles.buttonWrapper}>
                <button className={styles.ctaButton}>
                  <span>beginnen met coaching</span>
                </button>
                <div className={styles.arrowCircle}>
                  <svg width="100%" height="100%" viewBox="0 0 57 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28.5" cy="29" r="28.5" fill="#285A66"/>
                    <path d="M20 29H37M37 29L30 22M37 29L30 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* LID WORDEN Text */}
              <div className={styles.lidText}>
                <p className={styles.lidWordenText}>lid worden?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <div
        ref={footerWrapRef}
        className={styles.footerWrap}
        data-footer-parallax
      >
        <footer
          className={styles.footer}
          data-footer-parallax-inner
        >
          <div className={styles.footerContainer}>
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
                      src="/assets/arrow.svg"
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
    </div>
    </>
  );
}
