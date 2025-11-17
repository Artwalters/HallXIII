'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OnboardingForm from './OnboardingForm';
import Navigation from './Navigation';
import styles from './HeroExpertiseCombined.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExpertiseCombined() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const expertiseWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax Animation for Expertise Section Reveal
    if (!expertiseWrapRef.current) return;

    const el = expertiseWrapRef.current;
    const inner = el.querySelector('[data-expertise-parallax-inner]') as HTMLElement;

    if (!inner) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: inner,
        start: 'top bottom',
        end: 'top top',
        scrub: true
      }
    });

    // Expertise section moves UP from -35% to 0%
    tl.from(inner, {
      yPercent: -35,
      ease: 'linear'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Image columns animation (from ExpertiseSection)
    if (!containerRef.current || !leftColumnRef.current || !middleColumnRef.current || !rightColumnRef.current) return;

    const ctx = gsap.context(() => {
      // Configuration
      const speed = 200; // base animation speed in seconds
      const leftDirection = -1; // -1 for down, 1 for up
      const middleDirection = 1; // opposite of left
      const rightDirection = -1; // same as left
      const scrollSpeed = 10; // parallax strength
      const duplicate = 2;

      // Duplicate collections for seamless loop
      const duplicateCollection = (column: HTMLDivElement) => {
        const collection = column.querySelector('[data-collection]') as HTMLDivElement;
        if (!collection) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < duplicate; i++) {
          fragment.appendChild(collection.cloneNode(true));
        }
        column.appendChild(fragment);
      };

      duplicateCollection(leftColumnRef.current);
      duplicateCollection(middleColumnRef.current);
      duplicateCollection(rightColumnRef.current);

      // Responsive speed multiplier
      const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
      const adjustedSpeed = speed * speedMultiplier;

      // Get all collection items for each column
      const leftCollections = leftColumnRef.current.querySelectorAll('[data-collection]');
      const middleCollections = middleColumnRef.current.querySelectorAll('[data-collection]');
      const rightCollections = rightColumnRef.current.querySelectorAll('[data-collection]');

      // Base animations for continuous scroll - animate ALL collections
      const leftAnimation = gsap.to(leftCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed,
        ease: 'linear'
      }).totalProgress(0.5);

      const middleAnimation = gsap.to(middleCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed * 1.4,
        ease: 'linear'
      }).totalProgress(0.5);

      const rightAnimation = gsap.to(rightCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed * 1.2,
        ease: 'linear'
      }).totalProgress(0.5);

      // Set initial direction
      gsap.set(leftCollections, { yPercent: leftDirection === 1 ? 100 : -100 });
      gsap.set(middleCollections, { yPercent: middleDirection === 1 ? 100 : -100 });
      gsap.set(rightCollections, { yPercent: rightDirection === 1 ? 100 : -100 });

      leftAnimation.timeScale(leftDirection);
      middleAnimation.timeScale(middleDirection);
      rightAnimation.timeScale(rightDirection);

      leftAnimation.play();
      middleAnimation.play();
      rightAnimation.play();

      // ScrollTrigger for direction inversion
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const isInverted = self.direction === 1; // Scrolling down
          const currentLeftDir = isInverted ? -leftDirection : leftDirection;
          const currentMiddleDir = isInverted ? -middleDirection : middleDirection;
          const currentRightDir = isInverted ? -rightDirection : rightDirection;

          leftAnimation.timeScale(currentLeftDir);
          middleAnimation.timeScale(currentMiddleDir);
          rightAnimation.timeScale(currentRightDir);
        }
      });

      // Extra parallax scroll effect on columns
      const leftScrollStart = leftDirection === -1 ? scrollSpeed : -scrollSpeed;
      const middleScrollStart = middleDirection === -1 ? scrollSpeed : -scrollSpeed;
      const rightScrollStart = rightDirection === -1 ? scrollSpeed : -scrollSpeed;

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(leftColumnRef.current,
        { y: `${leftScrollStart}vh` },
        { y: `${-leftScrollStart}vh`, ease: 'none' }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(middleColumnRef.current,
        { y: `${middleScrollStart}vh` },
        { y: `${-middleScrollStart}vh`, ease: 'none' }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(rightColumnRef.current,
        { y: `${rightScrollStart}vh` },
        { y: `${-rightScrollStart}vh`, ease: 'none' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navigation Component */}
      <Navigation />

      <div className={styles.wrapper} ref={wrapperRef}>
        {/* HERO SECTION */}
        <section className={styles.heroSection} ref={heroSectionRef}>
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

          <div className={styles.heroContainer}>

            {/* Main Content */}
            <div className={styles.mainContent}>
              {/* Meet Hall13 Button */}
              <div className={styles.meetHall13Container}>
                <div className={styles.meetHall13Button}>
                  <Image
                    src="/assets/meet-button-bg.svg"
                    alt=""
                    fill
                    className={styles.meetButtonBg}
                  />
                  <div className={styles.meetButtonImage}>
                    <Image
                      src="/assets/meet-preview.jpg"
                      alt=""
                      fill
                      className={styles.meetPreviewImage}
                    />
                  </div>
                  <span className={styles.meetHall13Text}>meet hall13</span>
                </div>
              </div>

              {/* Left Side: Large HALL XIII Logo */}
              <div className={styles.hallLogoContainer}>
                <h1 className={styles.hallLogo}>
                  <Image
                    src="/assets/Hal13_logo.svg"
                    alt="HALL XIII"
                    width={1055}
                    height={360}
                    priority
                  />
                </h1>
              </div>

              {/* Bottom Section: OnboardingForm + Tagline */}
              <div className={styles.bottomContent}>
                {/* OnboardingForm */}
                <div className={styles.onboardingWrapper}>
                  <OnboardingForm />
                </div>

                {/* Tagline */}
                <div className={styles.taglineWrapper}>
                  <p className={styles.tagline}>
                    De hal waar sport en expertise samen komen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <div
        ref={expertiseWrapRef}
        className={styles.expertiseWrap}
        data-expertise-parallax
      >
        <section
          className={styles.expertise}
          data-expertise-parallax-inner
        >
          <div className={styles.expertiseContainer}>
            {/* Title & Description */}
            <div className={styles.textContainer}>
              <h2 className={styles.title}>
                een sportschool met diverse expertises
              </h2>
              <p className={styles.description}>
                Hal 13 is de sportschool waar je verschillende disciplines kunt ontdekken, van krachtsport en powerlifting tot atletische doelen. Onze coaches en externe experts staan klaar om je te helpen bij het optimaal ontwikkelen van jouw sportieve ambities.
              </p>
            </div>

            {/* Image Grid Container - Overflow Hidden for Animation */}
            <div ref={containerRef} className={styles.imageContainer}>
              {/* Top Gradient Overlay */}
              <div className={styles.topGradient} />

              {/* Bottom Gradient Overlay */}
              <div className={styles.bottomGradient} />

              <div className={styles.columnsContainer}>
                {/* Left Column - Scrolls Down */}
                <div ref={leftColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>

                {/* Middle Column - Scrolls Up */}
                <div ref={middleColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Scrolls Down */}
                <div ref={rightColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
