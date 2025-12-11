'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import OnboardingForm from './OnboardingForm';
import styles from './CTAFooterCombined.module.css';

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const basePath = process.env.NODE_ENV === 'production' ? '/HallXIII' : '';

export default function CTAFooterCombined() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const shadowOverlayRef = useRef<HTMLDivElement>(null);
  const waltersPaperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CTA Counter Animation
    if (ctaSectionRef.current && digit1Ref.current && digit2Ref.current && digit3Ref.current) {
      // Set initial positions immediately
      gsap.set(digit1Ref.current, { yPercent: 0 });
      gsap.set(digit2Ref.current, { yPercent: -10 });
      gsap.set(digit3Ref.current, { yPercent: -30 });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 50%',
            end: 'center center',
            scrub: 3,
            invalidateOnRefresh: true,
          }
        });

        // Cijfer 1: blijft op 0 (geen animatie nodig)
        tl.to(digit1Ref.current, {
          yPercent: 0,
          duration: 1,
        }, 0)
        // Cijfer 2: van 1 naar 0 (terugtellen)
        .to(digit2Ref.current, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, 0)
        // Cijfer 3: van 3 naar 0 (terugtellen)
        .to(digit3Ref.current, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, 0);
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  useEffect(() => {
    // Footer Parallax Animation - Osmo style (desktop only)
    if (!footerWrapRef.current) return;

    // Only on desktop (768px+)
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const el = footerWrapRef.current;
    const inner = el.querySelector('[data-footer-parallax-inner]') as HTMLElement;

    if (!inner) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'clamp(top bottom)',
        end: 'clamp(top top)',
        scrub: true
      }
    });

    tl.from(inner, {
      yPercent: -25,
      ease: 'linear'
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Shadow overlay mouse parallax effect for CTA section
  useEffect(() => {
    if (!ctaSectionRef.current || !shadowOverlayRef.current) return;

    const ctaSection = ctaSectionRef.current;
    const shadowOverlay = shadowOverlayRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = ctaSection.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const maxMove = 20;

      gsap.to(shadowOverlay, {
        x: deltaX * maxMove,
        y: deltaY * maxMove,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(shadowOverlay, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    ctaSection.addEventListener('mousemove', handleMouseMove);
    ctaSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctaSection.removeEventListener('mousemove', handleMouseMove);
      ctaSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Walters Studio paper scroll animation
  useEffect(() => {
    if (!waltersPaperRef.current || !footerWrapRef.current) return;

    const paper = waltersPaperRef.current;
    const footer = footerWrapRef.current;

    // Set initial state - hidden below and to the right, tilted
    gsap.set(paper, {
      yPercent: 80,
      xPercent: 40,
      rotation: -25,
    });

    // Animate paper with a subtle scoop movement
    const st = ScrollTrigger.create({
      trigger: footer,
      start: 'top 50%',
      onEnter: () => {
        gsap.to(paper, {
          yPercent: 0,
          xPercent: 0,
          rotation: -5,
          duration: 1.4,
          delay: 0.5,
          ease: 'power3.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(paper, {
          yPercent: 80,
          xPercent: 40,
          rotation: -25,
          duration: 0.6,
          ease: 'power2.in'
        });
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  // Footer label animation: circle pops in first, then text reveals
  useEffect(() => {
    if (!footerWrapRef.current) return;

    const labels = footerWrapRef.current.querySelectorAll(`.${styles.footerLabel}`);
    const splits: SplitText[] = [];

    labels.forEach((label) => {
      const circle = label.querySelector(`.${styles.footerLabelCircle}`);
      const text = label.querySelector(`.${styles.footerLabelText}`);

      if (!circle || !text) return;

      // Circle stays visible, only hide text initially
      gsap.set(text, { autoAlpha: 0 });

      const split = SplitText.create(text, {
        type: 'lines, words, chars',
        mask: 'lines',
        autoSplit: true,
        onSplit: (instance) => {
          // Set chars to starting position (below the mask)
          gsap.set(instance.chars, { yPercent: 110 });

          // Create timeline for sequenced animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: label,
              start: 'top 85%',
              toggleActions: 'play none none reset'
            }
          });

          // Text reveals smoothly from behind mask
          tl.set(text, { autoAlpha: 1 })
          .to(instance.chars, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.024,
            ease: 'power3.out'
          });

          return tl;
        }
      });

      splits.push(split);
    });

    return () => {
      splits.forEach(split => split.revert());
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {/* CTA SECTION */}
      <section className={styles.ctaSection} ref={ctaSectionRef}>
        <div className={styles.clippedContent}>
          {/* Texture Overlay */}
          <div
            className={styles.overlay}
            style={{
              backgroundImage: `url(${basePath}/assets/overlays/noise_repeat_texture.webp)`,
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto'
            }}
          />

          {/* Shadow Overlay Wrapper - clips the overflow */}
          <div className={styles.shadowOverlayWrapper}>
            <div ref={shadowOverlayRef} className={styles.shadowOverlay}>
              <Image
                src={`${basePath}/assets/overlays/shadow_overlay.png`}
                alt=""
                fill
                className={styles.shadowOverlayImage}
              />
            </div>
          </div>
          <div className={styles.ctaContainer}>
            {/* Content Wrapper - centered */}
            <div className={styles.contentWrapper}>
              {/* 013 Number with Counter Animation */}
              <div className={styles.numberContainer}>
                <div className={`${styles.numberGroup} ${styles.digit1}`}>
                  <div className={styles.numberWrap} ref={digit1Ref}>
                    <span className={styles.number}>0</span>
                  </div>
                </div>
                <div className={`${styles.numberGroup} ${styles.digit2}`}>
                  <div className={styles.numberWrap} ref={digit2Ref}>
                    <span className={styles.number}>0</span>
                    <span className={styles.number}>1</span>
                    <span className={styles.number}>2</span>
                    <span className={styles.number}>3</span>
                    <span className={styles.number}>4</span>
                    <span className={styles.number}>5</span>
                    <span className={styles.number}>6</span>
                    <span className={styles.number}>7</span>
                    <span className={styles.number}>8</span>
                    <span className={styles.number}>9</span>
                  </div>
                </div>
                <div className={`${styles.numberGroup} ${styles.digit3}`}>
                  <div className={styles.numberWrap} ref={digit3Ref}>
                    <span className={styles.number}>0</span>
                    <span className={styles.number}>1</span>
                    <span className={styles.number}>2</span>
                    <span className={styles.number}>3</span>
                    <span className={styles.number}>4</span>
                    <span className={styles.number}>5</span>
                    <span className={styles.number}>6</span>
                    <span className={styles.number}>7</span>
                    <span className={styles.number}>8</span>
                    <span className={styles.number}>9</span>
                  </div>
                </div>
              </div>

              {/* Main Text - Desktop */}
              <div className={styles.mainTextWrapper}>
                <p className={styles.mainText}>excuses meer</p>
                <p className={styles.mainText}>het is tijd</p>
                <p className={styles.mainText}>voor actie</p>
              </div>

              {/* Main Text - Mobile */}
              <div className={styles.mainTextWrapperMobile}>
                <p className={styles.mainTextMobile}>excuses meer het is</p>
                <p className={styles.mainTextMobile}>
                  tijd voor actie
                  <svg className={styles.arrowDownIcon} viewBox="0 0 15.86 18.26" fill="none">
                    <path d="M15.84,12.46l-.16-.04c-.06-.07.2-.26.16-.38l-.07-.03-.05-.08s-.09.02-.12.05l-.04.04s-.06.04-.07.02c0,0,0-.02.03-.05l.07-.08c.05-.05.11-.11.08-.13h-.04s.02-.06,0-.07l-.08.06s.11-.14.07-.18h-.01s-.05-.01-.08.02l-.11.14s-.03.03-.04.02h-.02c-.02-.14.13-.25.1-.27v-.02c-.24,0-.29.04-.75.52l-.3.31c-.3.32-.72.74-1.29,1.33l-1.23,1.17v-.27c-.01-.78-.02-1.85-.03-3.3l.11-7.67-2.02-2.06-.09-.11s-.05-.05-.1-.05c-.04-.07-.33-.35-.78-.79-.19-.19-.39-.39-.57-.56-.77.01-1.66.02-2.42.04-.64,0-1.17.03-1.41.04h-.14c-.32-.01-.79-.01-1.18-.02-.35,0-.67.04-.8.19,0,.02-.04.04-.07.04-.18,0-.28.07-.42.11-.11.02-.18.04-.18.06,0,.01.07.01.18.03l.04.02-.04.02h-.11s-.06,0-.06.02h.03c.07.03.29.01.29.05h0s-.29.02-.29.02c-.07,0-.1,0-.13.04t-.04.03l-.11-.03c-.1,0-.17.13-.28.13h-.03l-.03.03s.03.04.07.04h.03s.07,0,.08.02c-.07.05-.29.04-.39.05h-.04s.47.09.58.18h-.67c-.11.01-.22.01-.22.05-.03.01-.1.03-.1.05l.04.04s.11.03.18.03l.38-.04h.11c.11.03.15.05.15.07s-.11.02-.22.02h-.21c-.18,0-.17.06-.35.06h-.18c-.07,0-.1.08-.2.11-.04,0-.08,0-.08-.01l.07-.08-.03-.02c-.08.02-.18.08-.18.15l.04.04s-.07.02-.07.03v.02c.08.05.26.07.5.07l.57-.03.29.02.11.07s-.07.03-.18.03h-.11s-.03.02-.03.02c0,.04.07.08.11.07l.43.02.39-.03c.28.04.57.05.85.05l.46-.03c.07-.02.11-.02.18-.02.11,0,.21.02.32.03.21-.02.46-.04.67-.04.11,0,.22,0,.32.01l.22.02.71-.03c.07-.02.14-.04.21-.04.14,0,.32.03.5.03l.35-.02s.11,0,.14.01l.25.02.33-.02.06-.03h0s.02.04.02.04l.11.11c.42.43,1.19,1.22,1.37,1.4l.08.06.09.11.07.09c.05.05.1.05.17.12l.03.03c.07.11.16.21.25.31l.24.24.02.03v.03s0,.01,0,.01c0,0-.01,0-.01.01v.07s-.03.14-.03.14l.03.5c0,.07,0,.17-.02.25,0,.1-.05.18-.05.32l.02.1v.15s-.01.07.01.1l-.02.11.04.03-.02.11-.02.04h.04v.21s0,.07-.02.11l-.03.14.02.21v.22s.01.32.01.32l-.04.17v.15s.03.67.03.67l-.02.57.02.53c0,.22-.01.39-.05.43v.04s.06.07.06.1l-.02.07.02.29-.06.43.02.39-.02.1.02.14.02.11c0,.11-.03.22-.03.29s.02.14.06.21v.07s0,.32,0,.32q0,.07.02.07h.02v-.15s0-.1.01-.1l.02.03v.39c-.05.08-.06.15-.06.18v.18c0,.07,0,.11.04.11h.03c-.01.07-.01.1-.01.17l.02.36c0-.11.05-.15.05-.22v-.28s0-.11-.02-.11t.02-.03l-.03-.29v-.53s.03-.11.03-.11c.01,0,.03.25.04.57l.02-.29c0-.1,0-.14.02-.14,0,0,.01.14.02.32v.14q-.02.11-.04.11l-.02-.14c.02.61.04,1.49.1,1.55.03,0,.03.04.03.08v.14s0,.03,0,.03c.08,0,.12.23.15.41-.01-.01-.03-.02-.07-.01-.01-.04-.19-.21-.43-.44-.52-.49-1.35-1.26-1.58-1.46l-.06-.05c-.13-.13-.29-.33-.45-.48-.14-.14-.3-.24-.45-.19-.02.02-.04.02-.06,0-.07-.07-.16-.06-.24-.08-.06-.03-.1-.05-.11-.03-.02.01.01.04.04.09v.03s-.02,0-.02,0l-.04-.04s-.03-.03-.04-.02v.03s.11.11.09.13l-.02.02-.11-.11s-.04-.04-.08-.03t-.04,0l-.02-.07s-.16.03-.2,0l-.02-.02h-.04s-.01.05.01.07h.01s.03.04.02.05c-.07.01-.14-.08-.2-.11.02.05.11.24.1.34l-.28-.26c-.04-.05-.08-.09-.11-.06-.03,0-.07-.02-.08,0v.04s.01.07.04.09l.18.13.03.05c.03.06.03.08.02.1-.02,0-.06-.03-.1-.07l-.08-.09c-.07-.06-.11-.03-.18-.09l-.07-.07s-.1.01-.17-.01c-.01-.01-.02-.02-.01-.04l.08-.02v-.03s-.13-.01-.18.04v.04s-.05-.02-.06,0h-.01c-.01.08.05.16.15.25l.24.21.11.12v.1s-.06,0-.11-.05l-.04-.04h-.03s-.02.08,0,.1l.16.17.17.14c.09.14.19.26.31.37l.2.17s.05.02.08.05c.04.04.07.1.1.15.1.07.22.15.3.24.05.04.09.08.12.13l.07.1.3.26s.09.03.12.06c.05.05.1.15.17.22l.16.12s.04.04.04.07l.09.11.32.25.08.11.13.12c.25.23.66.7.76.79l.05.03.05.07s.02.04.05.07c.05.05.1.05.18.12l.02.03c.16.23.38.44.59.65l.42.44.08.07.02.03.2-.16.37-.4c.05-.06.13-.14.19-.18.09-.06.16-.08.27-.19l.08-.1.11-.1s.06-.06.07-.1l.1-.07v-.05l.05-.03h.03l-.03-.02.08-.09s.03-.03.06-.03l.08-.03.07-.1.09-.08.11-.14.1-.05.07-.04.23-.3.25-.21.19-.22c.08-.09.16-.15.21-.14h.01s-.01-.08,0-.09l.04-.02.1-.13.22-.12.13-.17.06-.03.04-.07.03-.06s.11-.06.13-.09c.03-.03.04-.07.05-.12v-.04s.15-.12.15-.12t.01-.04v-.02s-.07.06-.07.06c0,.02-.04.05-.05.03v-.02l.03-.03.13-.12c.06,0,.1-.02.11-.03l.07-.08s.04-.04.02-.06l-.03-.03s.05-.03.08-.06l.13-.16s-.1.02-.13.05l-.11.12s-.04.04-.02.06t-.03,0l-.1.12-.22.21-.05.03s.09-.13.19-.26l-.12.11s-.04.04-.06.04c.01-.03.05-.09.1-.14l.06-.06q.05-.03.07-.02l-.05.07c.22-.24.57-.61.55-.68-.02-.02-.01-.04.01-.05l.06-.05v-.02c-.07-.08.04-.25.09-.33l.04-.04c.09-.09-.02-.14.04-.19l.05-.03c.06-.06.06-.14.09-.2.04-.04.04-.07.01-.09ZM1.8,1.34s-.11-.02-.11-.04l.07-.02c.07,0,.11.02.11.04l-.07.02ZM7.74,1.6c-.73.02-1.53.04-2.3.07-.53,0-1.06-.01-1.56-.04l.64-.02,3.05-.04c.1,0,.16-.01.19,0,.01.01.01.02.01.03h-.03ZM8.13,2l-.19-.22c-.08-.06-.11-.08-.13-.09v-.04s0-.01,0-.01t.1.07l.36.34v.04s-.09-.05-.14-.09ZM8.67,2.52l-.23-.23-.04-.06.06.04.11.13.12.09.04.06-.06-.03ZM10.13,12.14s0,.11-.02.11c-.04-.18-.04-.46-.04-.67v-.32c0-.29-.02-.68.04-.68l.02.03c0,.39-.02.79-.03,1.14l.03.39ZM10.14,4.06l.05.05c.07.06.04.06.04.08h-.03s-.06-.11-.06-.13ZM10.27,12.28l-.03-.11v-.39c-.01-.1-.01-.21.02-.25l.03.5c0,.1,0,.24-.02.25ZM10.45,14.61l-.02-.1v-.15s.05.11.05.11c0,.07-.01.14-.03.14ZM6.46,12.94s-.03-.05-.02-.06h.04s.03.06.02.08l-.04-.02ZM8.73,15.58c-.34-.3-.71-.64-1.06-.96-.22-.21-.42-.43-.6-.64l.27.23,1.24,1.18c.12.11.19.18.19.21l-.04-.02ZM9.14,15.95s-.06-.01-.09-.04l-.11-.12-.11-.09-.02-.03.02-.02.11.09.2.19v.02ZM9.35,16.2l-.13-.12-.02-.04h.04s.06.09.06.09l.07.04.02.04h-.04ZM10.47,17.46s-.08-.14-.08-.15l.05.04c.05.05.09.11.09.14l-.06-.03ZM11.27,15.39s.01-.07.03-.07c0,0,.01.02.01.04l-.04.03ZM14.55,14.44s.08-.09.11-.09l-.02.07-.15.16s-.08.08-.12.07l.18-.21ZM14.76,14.48c-.04.09-.15.21-.23.29l-.13.13c-.11.12-.26.28-.3.24v-.03c.15-.16.33-.29.47-.43l.14-.17s.04-.05.05-.03ZM15.19,12.41s-.04.02-.06.01c0-.02.1-.13.13-.16l.05-.06s.09-.08.11-.06v.03l-.18.16-.05.08ZM15.43,13.36l-.07.04.02-.07s.07-.04.08-.03l-.03.06Z" fill="currentColor"/>
                  </svg>
                </p>
              </div>
            </div>
          </div>
          {/* Bottom Section - Onboarding Form + CTA Options */}
          <div className={styles.ctaBottomRow}>
            <div className={styles.ctaFormWrapper}>
              <OnboardingForm animateOnScroll />
            </div>
            <div className={styles.ctaOptionWrapper}>
              <span className={styles.ctaOptionText}>bekijk onze coaching pakketten</span>
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
            {/* Top Row - 3 Columns */}
            <div className={styles.footerGrid}>
              {/* Contact Column */}
              <div className={styles.footerColumn}>
                <div className={styles.footerLabel}>
                  <div className={styles.footerLabelCircle}>
                    <div className={styles.footerLabelCircleSprite}>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <circle cx="6" cy="6" r="5" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="5.3" ry="4.7" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="4.7" ry="5.3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className={styles.footerLabelText}>contact</span>
                </div>
                <div className={styles.footerLinks}>
                  <a href="mailto:info@hal13.nl" className={styles.footerLink}>info@hal13.nl</a>
                </div>
                <div className={styles.socialIcons}>
                  <a href="https://instagram.com/hall_xiii" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                    <div className={styles.socialIconBorder}>
                      <svg className={styles.socialIconBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconBack}>
                      <svg className={styles.socialIconBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconInner}>
                      <div className={styles.socialIconSprite}>
                        <Image src="/assets/stopmotion_icons/insta1.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/insta2.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/insta3.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                      </div>
                    </div>
                  </a>
                  <a href="https://tiktok.com/@hall_xiii" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="TikTok">
                    <div className={styles.socialIconBorder}>
                      <svg className={styles.socialIconBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconBack}>
                      <svg className={styles.socialIconBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconInner}>
                      <div className={styles.socialIconSprite}>
                        <Image src="/assets/stopmotion_icons/tiktok1.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/tiktok2.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/tiktok3.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                      </div>
                    </div>
                  </a>
                  <a href="https://facebook.com/hall_xiii" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                    <div className={styles.socialIconBorder}>
                      <svg className={styles.socialIconBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconBack}>
                      <svg className={styles.socialIconBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="46" ry="48" fill="currentColor" />
                        <ellipse cx="150" cy="50" rx="48" ry="46" fill="currentColor" />
                        <ellipse cx="250" cy="50" rx="46" ry="47" fill="currentColor" />
                      </svg>
                    </div>
                    <div className={styles.socialIconInner}>
                      <div className={styles.socialIconSprite}>
                        <Image src="/assets/stopmotion_icons/facebook1.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/facebook2.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                        <Image src="/assets/stopmotion_icons/facebook3.svg" alt="" width={52} height={52} className={styles.socialIconImg} />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Gym Column */}
              <div className={styles.footerColumn}>
                <div className={styles.footerLabel}>
                  <div className={styles.footerLabelCircle}>
                    <div className={styles.footerLabelCircleSprite}>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <circle cx="6" cy="6" r="5" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="5.3" ry="4.7" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="4.7" ry="5.3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className={styles.footerLabelText}>gym</span>
                </div>
                <div className={styles.footerLinks}>
                  <span className={styles.footerText}>6369 te simpelveld</span>
                </div>
                <div data-draw-line-trigger="">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=50.829039848058436,5.991422341864164"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-draw-line=""
                    className={styles.footerSmallLink}
                  >
                    google maps
                    <div data-draw-line-box="" className={styles.textDrawBox}></div>
                  </a>
                </div>
              </div>

              {/* Newsletter Column */}
              <div className={styles.footerColumn}>
                <div className={styles.footerLabel}>
                  <div className={styles.footerLabelCircle}>
                    <div className={styles.footerLabelCircleSprite}>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <circle cx="6" cy="6" r="5" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="5.3" ry="4.7" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 12 12" className={styles.footerLabelCircleSvg}>
                        <ellipse cx="6" cy="6" rx="4.7" ry="5.3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className={styles.footerLabelText}>nieuwsbrief</span>
                </div>
                <span className={styles.footerText}>sign me up</span>
                <div className={styles.newsletterForm}>
                  {/* Input Field - Stop Motion Style */}
                  <div className={styles.newsletterInputWrapper}>
                    <div className={styles.newsletterInputBorder}>
                      <svg className={styles.newsletterInputBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 678 82" fill="none" preserveAspectRatio="none">
                        <path d="M460.308 7.5301L460.216 7.59846L460.136 7.68002C457.225 10.6259 456.112 14.1147 455.704 17.5301C455.426 19.853 455.471 22.2897 455.511 24.487C455.528 25.4194 455.544 26.3088 455.534 27.128L455.534 27.1281C455.485 31.453 455.744 35.7647 456.055 40.0304C456.123 40.9669 456.194 41.9001 456.264 42.8308C456.515 46.1574 456.764 49.452 456.895 52.7505L456.895 52.7508C456.908 53.0821 456.921 53.4306 456.934 53.7944C457.069 57.4373 457.259 62.604 458.379 67.1206C459.587 71.9918 462.087 76.9016 467.56 77.582C473.567 78.3305 479.645 78.2561 485.652 77.9982C487.517 77.9182 489.368 77.821 491.208 77.7243C495.339 77.5074 499.416 77.2933 503.477 77.282C509.676 77.2646 515.244 77.2472 520.758 77.2299C527.284 77.2095 533.736 77.1893 541.07 77.1696H541.07C554.586 77.1316 568.103 77.3437 581.637 77.5561L581.644 77.5562C595.171 77.7685 608.714 77.981 622.259 77.9429L656.359 77.8495H656.359C661.063 77.8359 665.017 76.6431 667.846 73.7831C670.658 70.9404 672.118 66.6909 672.376 61.0789C672.376 61.0754 672.376 61.072 672.377 61.0685L674.492 25.4333L674.494 25.398L674.495 25.3626C674.533 22.1986 674.382 18.4111 673.479 14.9927C672.579 11.5846 670.865 8.30716 667.596 6.52469C664.981 5.09728 662.088 4.78229 659.564 4.54711C644.655 3.15323 629.771 3.58486 614.955 4.01454C607.786 4.22244 600.633 4.42988 593.5 4.42988H593.489L593.477 4.43005C574.96 4.7118 563.056 4.62436 546.859 4.50539C543.481 4.48058 539.916 4.4544 536.066 4.42991L536.056 4.42985L536.047 4.42991L481.337 4.78111L481.327 4.78117L481.317 4.78137C480.654 4.79452 479.792 4.79159 478.8 4.78821C476.592 4.7807 473.737 4.77099 470.984 4.93131C468.963 5.04904 466.912 5.26041 465.089 5.64402C463.297 6.02083 461.568 6.59424 460.308 7.5301Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                        <path d="M234.308 7.53029L234.216 7.59866L234.136 7.68022C231.211 10.6399 230.192 14.1108 229.879 17.4972C229.724 19.1774 229.74 20.8572 229.787 22.4481C229.799 22.8857 229.814 23.3132 229.829 23.7322C229.868 24.8662 229.906 25.9383 229.894 26.9826L229.894 26.9828C229.875 28.6315 229.85 30.2894 229.826 31.9535C229.725 38.8516 229.622 45.8555 229.895 52.7507L229.895 52.751C229.942 53.9419 229.932 55.2806 229.922 56.7443C229.916 57.5192 229.91 58.3292 229.912 59.1708C229.919 61.5488 229.992 64.1036 230.352 66.4843C230.71 68.8491 231.369 71.1777 232.64 73.0207C233.953 74.9248 235.881 76.2492 238.56 76.5822C250.422 78.0603 265.656 78.3151 277.477 78.2822C283.676 78.2648 289.244 78.2474 294.758 78.2301C301.285 78.2097 307.736 78.1895 315.07 78.1698H315.07C328.58 78.1318 342.101 78.0942 355.62 78.0566C369.17 78.0189 382.72 77.9812 396.259 77.9431L430.359 77.8497H430.359C435.025 77.8362 439.302 76.7751 442.498 74.1015C445.729 71.3985 447.627 67.2382 447.889 61.514L447.891 61.4715L447.891 61.429L447.495 25.3457C447.498 25.1251 447.501 24.9008 447.504 24.6732C447.543 21.7376 447.591 18.2486 447.003 15.101C446.368 11.6948 444.927 8.34146 441.596 6.52488C438.981 5.09747 436.088 4.78249 433.564 4.54731C422.446 3.50779 411.337 3.65454 400.286 4.05631C397.163 4.16986 394.049 4.30351 390.94 4.43693C383.019 4.77686 375.136 5.1152 367.24 5.1152H367.228L367.217 5.11538C353.805 5.31944 344.001 5.08464 333.483 4.83273C326.434 4.66389 319.063 4.48737 310.07 4.43013C310.069 4.43012 310.067 4.43011 310.066 4.4301L255.365 3.78138L255.341 3.78109L255.317 3.78156C253.037 3.82678 248.938 3.9493 244.891 4.43987C242.868 4.68508 240.826 5.0259 239.013 5.50582C237.23 5.978 235.536 6.61818 234.308 7.53029Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                        <path d="M8.30825 7.53031L8.21621 7.59867L8.13562 7.68023C5.22501 10.6261 4.11162 14.1149 3.70376 17.5303C3.42636 19.8533 3.47076 22.2899 3.51079 24.4872C3.52778 25.4196 3.54399 26.309 3.53448 27.1282L3.53448 27.1283C3.43625 35.6709 3.55681 44.217 3.89466 52.7508L3.89467 52.751C3.94197 53.9397 3.93235 55.3029 3.92174 56.8084C3.91609 57.6093 3.91016 58.4504 3.91236 59.327C3.91857 61.7984 3.99176 64.4732 4.35013 66.9728C4.70591 69.4543 5.36005 71.899 6.61737 73.8311C7.91554 75.826 9.84384 77.2446 12.5596 77.5822C21.6839 78.7191 32.8409 78.5422 42.824 78.3839C45.8454 78.336 48.7592 78.2898 51.4767 78.2822C57.6756 78.2648 63.2436 78.2474 68.7584 78.2301C75.2845 78.2097 81.736 78.1895 89.07 78.1698H89.0702C102.58 78.1318 116.101 78.0942 129.62 78.0566C143.17 78.0189 156.719 77.9812 170.259 77.9432L204.359 77.8497H204.359C209.025 77.8362 213.088 76.774 216.05 74.0563C219.022 71.3282 220.631 67.1677 220.889 61.514L220.889 61.512L222.493 25.4112L222.494 25.387L222.495 25.3628C222.533 22.1989 222.382 18.4113 221.479 14.993C220.579 11.5848 218.865 8.30736 215.596 6.5249C212.981 5.09749 210.088 4.7825 207.564 4.54732C192.196 3.11047 176.75 3.46107 161.408 3.80934C154.66 3.9625 147.932 4.11522 141.24 4.11522H141.228L141.217 4.11539C118.825 4.4561 106.355 4.57189 84.0659 4.43012L84.0563 4.43005L84.0468 4.43012L29.3374 4.78131L29.3273 4.78138L29.3173 4.78158C28.6541 4.79473 27.7923 4.7918 26.7999 4.78842C24.5917 4.78091 21.7368 4.7712 18.984 4.93152C16.9626 5.04925 14.9124 5.26062 13.0886 5.64423C11.2971 6.02104 9.56824 6.59445 8.30825 7.53031Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                      </svg>
                    </div>
                    <div className={styles.newsletterInputBack}>
                      <svg className={styles.newsletterInputBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 678 82" fill="none" preserveAspectRatio="none">
                        <path d="M460.308 7.5301L460.216 7.59846L460.136 7.68002C457.225 10.6259 456.112 14.1147 455.704 17.5301C455.426 19.853 455.471 22.2897 455.511 24.487C455.528 25.4194 455.544 26.3088 455.534 27.128L455.534 27.1281C455.485 31.453 455.744 35.7647 456.055 40.0304C456.123 40.9669 456.194 41.9001 456.264 42.8308C456.515 46.1574 456.764 49.452 456.895 52.7505L456.895 52.7508C456.908 53.0821 456.921 53.4306 456.934 53.7944C457.069 57.4373 457.259 62.604 458.379 67.1206C459.587 71.9918 462.087 76.9016 467.56 77.582C473.567 78.3305 479.645 78.2561 485.652 77.9982C487.517 77.9182 489.368 77.821 491.208 77.7243C495.339 77.5074 499.416 77.2933 503.477 77.282C509.676 77.2646 515.244 77.2472 520.758 77.2299C527.284 77.2095 533.736 77.1893 541.07 77.1696H541.07C554.586 77.1316 568.103 77.3437 581.637 77.5561L581.644 77.5562C595.171 77.7685 608.714 77.981 622.259 77.9429L656.359 77.8495H656.359C661.063 77.8359 665.017 76.6431 667.846 73.7831C670.658 70.9404 672.118 66.6909 672.376 61.0789C672.376 61.0754 672.376 61.072 672.377 61.0685L674.492 25.4333L674.494 25.398L674.495 25.3626C674.533 22.1986 674.382 18.4111 673.479 14.9927C672.579 11.5846 670.865 8.30716 667.596 6.52469C664.981 5.09728 662.088 4.78229 659.564 4.54711C644.655 3.15323 629.771 3.58486 614.955 4.01454C607.786 4.22244 600.633 4.42988 593.5 4.42988H593.489L593.477 4.43005C574.96 4.7118 563.056 4.62436 546.859 4.50539C543.481 4.48058 539.916 4.4544 536.066 4.42991L536.056 4.42985L536.047 4.42991L481.337 4.78111L481.327 4.78117L481.317 4.78137C480.654 4.79452 479.792 4.79159 478.8 4.78821C476.592 4.7807 473.737 4.77099 470.984 4.93131C468.963 5.04904 466.912 5.26041 465.089 5.64402C463.297 6.02083 461.568 6.59424 460.308 7.5301Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                        <path d="M234.308 7.53029L234.216 7.59866L234.136 7.68022C231.211 10.6399 230.192 14.1108 229.879 17.4972C229.724 19.1774 229.74 20.8572 229.787 22.4481C229.799 22.8857 229.814 23.3132 229.829 23.7322C229.868 24.8662 229.906 25.9383 229.894 26.9826L229.894 26.9828C229.875 28.6315 229.85 30.2894 229.826 31.9535C229.725 38.8516 229.622 45.8555 229.895 52.7507L229.895 52.751C229.942 53.9419 229.932 55.2806 229.922 56.7443C229.916 57.5192 229.91 58.3292 229.912 59.1708C229.919 61.5488 229.992 64.1036 230.352 66.4843C230.71 68.8491 231.369 71.1777 232.64 73.0207C233.953 74.9248 235.881 76.2492 238.56 76.5822C250.422 78.0603 265.656 78.3151 277.477 78.2822C283.676 78.2648 289.244 78.2474 294.758 78.2301C301.285 78.2097 307.736 78.1895 315.07 78.1698H315.07C328.58 78.1318 342.101 78.0942 355.62 78.0566C369.17 78.0189 382.72 77.9812 396.259 77.9431L430.359 77.8497H430.359C435.025 77.8362 439.302 76.7751 442.498 74.1015C445.729 71.3985 447.627 67.2382 447.889 61.514L447.891 61.4715L447.891 61.429L447.495 25.3457C447.498 25.1251 447.501 24.9008 447.504 24.6732C447.543 21.7376 447.591 18.2486 447.003 15.101C446.368 11.6948 444.927 8.34146 441.596 6.52488C438.981 5.09747 436.088 4.78249 433.564 4.54731C422.446 3.50779 411.337 3.65454 400.286 4.05631C397.163 4.16986 394.049 4.30351 390.94 4.43693C383.019 4.77686 375.136 5.1152 367.24 5.1152H367.228L367.217 5.11538C353.805 5.31944 344.001 5.08464 333.483 4.83273C326.434 4.66389 319.063 4.48737 310.07 4.43013C310.069 4.43012 310.067 4.43011 310.066 4.4301L255.365 3.78138L255.341 3.78109L255.317 3.78156C253.037 3.82678 248.938 3.9493 244.891 4.43987C242.868 4.68508 240.826 5.0259 239.013 5.50582C237.23 5.978 235.536 6.61818 234.308 7.53029Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                        <path d="M8.30825 7.53031L8.21621 7.59867L8.13562 7.68023C5.22501 10.6261 4.11162 14.1149 3.70376 17.5303C3.42636 19.8533 3.47076 22.2899 3.51079 24.4872C3.52778 25.4196 3.54399 26.309 3.53448 27.1282L3.53448 27.1283C3.43625 35.6709 3.55681 44.217 3.89466 52.7508L3.89467 52.751C3.94197 53.9397 3.93235 55.3029 3.92174 56.8084C3.91609 57.6093 3.91016 58.4504 3.91236 59.327C3.91857 61.7984 3.99176 64.4732 4.35013 66.9728C4.70591 69.4543 5.36005 71.899 6.61737 73.8311C7.91554 75.826 9.84384 77.2446 12.5596 77.5822C21.6839 78.7191 32.8409 78.5422 42.824 78.3839C45.8454 78.336 48.7592 78.2898 51.4767 78.2822C57.6756 78.2648 63.2436 78.2474 68.7584 78.2301C75.2845 78.2097 81.736 78.1895 89.07 78.1698H89.0702C102.58 78.1318 116.101 78.0942 129.62 78.0566C143.17 78.0189 156.719 77.9812 170.259 77.9432L204.359 77.8497H204.359C209.025 77.8362 213.088 76.774 216.05 74.0563C219.022 71.3282 220.631 67.1677 220.889 61.514L220.889 61.512L222.493 25.4112L222.494 25.387L222.495 25.3628C222.533 22.1989 222.382 18.4113 221.479 14.993C220.579 11.5848 218.865 8.30736 215.596 6.5249C212.981 5.09749 210.088 4.7825 207.564 4.54732C192.196 3.11047 176.75 3.46107 161.408 3.80934C154.66 3.9625 147.932 4.11522 141.24 4.11522H141.228L141.217 4.11539C118.825 4.4561 106.355 4.57189 84.0659 4.43012L84.0563 4.43005L84.0468 4.43012L29.3374 4.78131L29.3273 4.78138L29.3173 4.78158C28.6541 4.79473 27.7923 4.7918 26.7999 4.78842C24.5917 4.78091 21.7368 4.7712 18.984 4.93152C16.9626 5.04925 14.9124 5.26062 13.0886 5.64423C11.2971 6.02104 9.56824 6.59445 8.30825 7.53031Z" fill="currentColor" vectorEffect="non-scaling-stroke"></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="jouw@email.com"
                      className={styles.newsletterInput}
                    />
                  </div>

                  {/* Submit Button - Stop Motion Circle */}
                  <button className={styles.newsletterButton} type="submit">
                    <div className={styles.newsletterButtonBorder}>
                      <svg className={styles.newsletterButtonBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" fill="none" preserveAspectRatio="none">
                        <path d="M76.4867 24.5604C72.354 9.94352 55.1236 2.37712 42.9997 0.639385C38.7709 0.0329867 24.9418 -1.94912 13.7505 6.5133C-2.06266 18.4693 -4.31189 44.9924 7.39143 61.9082C14.7334 72.5247 29.422 82.0279 43.85 79.1136C55.7133 76.7152 63.4622 66.7187 65.8943 63.5871C70.0316 58.2472 71.9334 53.2738 73.0991 50.1604C75.5907 43.4855 79.1519 33.9686 76.4913 24.5604H76.4867Z" fill="currentColor"/>
                        <path transform="translate(80, 0)" d="M78.6386 47.2262C82.368 32.5012 71.2293 17.3333 61.5986 9.76645C58.2396 7.12693 47.2543 -1.50418 33.3311 0.228838C13.6585 2.67644 -1.55097 24.5215 0.126503 45.0227C1.17662 57.8878 9.14567 73.4622 23.0978 78.1523C34.571 82.0068 46.28 77.224 49.952 75.7281C56.205 73.1722 60.3387 69.8161 62.905 67.7026C68.4001 63.1677 76.2427 56.7066 78.6426 47.2285L78.6386 47.2262Z" fill="currentColor"/>
                        <path transform="translate(160, 0)" d="M10.7453 70.9871C21.6328 81.5793 40.3379 79.5168 51.7064 74.9598C55.6718 73.3706 68.6392 68.1726 74.0999 55.2483C81.8166 36.9875 70.5029 12.8932 51.9096 4.09531C40.243 -1.42784 22.7707 -2.3136 11.7329 7.42428C2.65815 15.433 0.945693 27.9647 0.405213 31.8928C-0.507839 38.5859 0.331852 43.8439 0.879001 47.1231C2.05873 54.1495 3.73298 64.1719 10.7413 70.9894L10.7453 70.9871Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className={styles.newsletterButtonBack}>
                      <svg className={styles.newsletterButtonBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" fill="none" preserveAspectRatio="none">
                        <path d="M76.4867 24.5604C72.354 9.94352 55.1236 2.37712 42.9997 0.639385C38.7709 0.0329867 24.9418 -1.94912 13.7505 6.5133C-2.06266 18.4693 -4.31189 44.9924 7.39143 61.9082C14.7334 72.5247 29.422 82.0279 43.85 79.1136C55.7133 76.7152 63.4622 66.7187 65.8943 63.5871C70.0316 58.2472 71.9334 53.2738 73.0991 50.1604C75.5907 43.4855 79.1519 33.9686 76.4913 24.5604H76.4867Z" fill="currentColor"/>
                        <path transform="translate(80, 0)" d="M78.6386 47.2262C82.368 32.5012 71.2293 17.3333 61.5986 9.76645C58.2396 7.12693 47.2543 -1.50418 33.3311 0.228838C13.6585 2.67644 -1.55097 24.5215 0.126503 45.0227C1.17662 57.8878 9.14567 73.4622 23.0978 78.1523C34.571 82.0068 46.28 77.224 49.952 75.7281C56.205 73.1722 60.3387 69.8161 62.905 67.7026C68.4001 63.1677 76.2427 56.7066 78.6426 47.2285L78.6386 47.2262Z" fill="currentColor"/>
                        <path transform="translate(160, 0)" d="M10.7453 70.9871C21.6328 81.5793 40.3379 79.5168 51.7064 74.9598C55.6718 73.3706 68.6392 68.1726 74.0999 55.2483C81.8166 36.9875 70.5029 12.8932 51.9096 4.09531C40.243 -1.42784 22.7707 -2.3136 11.7329 7.42428C2.65815 15.433 0.945693 27.9647 0.405213 31.8928C-0.507839 38.5859 0.331852 43.8439 0.879001 47.1231C2.05873 54.1495 3.73298 64.1719 10.7413 70.9894L10.7453 70.9871Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <svg className={styles.newsletterArrow} viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
          {/* Walters Studio Paper Note */}
          <div ref={waltersPaperRef} className={styles.waltersPaper}>
            <div className={styles.waltersPaperInner}>
              <div className={styles.waltersPaperOverlay}>
                <Image
                  src="/assets/overlays/overlay.jpg"
                  alt=""
                  fill
                  className={styles.waltersPaperOverlayImage}
                />
              </div>
              <span className={styles.waltersPaperText}>by walters.studio</span>
              <div className={styles.waltersPaperLogo}>
                <Image
                  src="/assets/walters-studio.png"
                  alt="walters.studio logo"
                  width={120}
                  height={60}
                  className={styles.waltersPaperLogoImage}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
