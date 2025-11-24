'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CoachesSection.module.css';

interface Coach {
  name: string;
  image: string;
  description: string;
  largeImage: string;
  rotation: number;
}

const coaches: Coach[] = [
  {
    name: 'RIM',
    image: '/assets/coach-rim.jpg',
    description: 'Rim Pinckers, 32 jaar. Sinds 2015 krachttrainer en coach met HBO Sportkunde Wellness. Traint zelf al 13 jaar: van gewichtheffen en competitief bodybuilden tot powerlifting. Combineert theoretische kennis met praktijkervaring, discipline en empathie voor een unieke coachingstijl.',
    largeImage: '/assets/expertise-1.jpg',
    rotation: -3
  },
  {
    name: 'DYLAN',
    image: '/assets/coach-dylan.jpg',
    description: 'Dylan Strik, 23 jaar. CIOS-afgestudeerd coach met ervaring in wielrennen op hoog niveau. Specialiseert zich in krachttraining en conditionele begeleiding. Benadrukt het mentale aspect en voeding voor optimale resultaten. Combineert coaching met sportmassage als Athlete Reliëf binnen Hal13.',
    largeImage: '/assets/expertise-2.jpg',
    rotation: 4
  },
  {
    name: 'NOAH',
    image: '/assets/coach-noah.jpg',
    description: 'Noah Sipsma, 23 jaar. Sportkunde student en powerlifter op hoog niveau met Nederlands record squat. Meerdere podiumplaatsen bij Nederlandse Junioren Kampioenschappen. Helpt je zowel fysiek als mentaal sterker worden, van algemene fitness tot powerlifting op wedstrijdniveau.',
    largeImage: '/assets/expertise-3.jpg',
    rotation: -5
  },
  {
    name: 'MAARTEN',
    image: '/assets/coach-maarten.jpg',
    description: 'Maarten combineert jarenlange ervaring in powerlifting met moderne trainingsmethoden.',
    largeImage: '/assets/expertise-4.jpg',
    rotation: 3
  },
  {
    name: 'MEREL',
    image: '/assets/coach-merel.jpg',
    description: 'Merel is gespecialiseerd in begeleiding en coaching voor zowel beginners als gevorderden.',
    largeImage: '/assets/expertise-5.jpg',
    rotation: -4
  },
];

export default function CoachesSection() {
  const photoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const currentVisiblePhoto = useRef<string | null>(null);
  const activeAccordion = useRef<string | null>(null);

  useEffect(() => {
    // Initialize photo positions
    Object.values(photoRefs.current).forEach((photo) => {
      if (photo) {
        gsap.set(photo, { y: '100%', rotation: 0 });
      }
    });

    function initAccordionCSS() {
      document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
        const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

        accordion.addEventListener('click', (event) => {
          const toggle = (event.target as HTMLElement).closest('[data-accordion-toggle]');
          if (!toggle) return;

          const singleAccordion = toggle.closest('[data-accordion-status]');
          if (!singleAccordion) return;

          const coachName = singleAccordion.getAttribute('data-coach-name');
          const wasActive = singleAccordion.getAttribute('data-accordion-status') === 'active';

          // Update status first
          singleAccordion.setAttribute('data-accordion-status', wasActive ? 'not-active' : 'active');

          if (wasActive) {
            // Closing accordion
            activeAccordion.current = null;
            if (coachName && photoRefs.current[coachName]) {
              gsap.killTweensOf(photoRefs.current[coachName]);
              gsap.to(photoRefs.current[coachName], {
                y: '100%',
                duration: 0.6,
                ease: 'power3.inOut',
                onComplete: () => {
                  if (currentVisiblePhoto.current === coachName) {
                    currentVisiblePhoto.current = null;
                  }
                }
              });
            }
          } else {
            // Opening accordion
            activeAccordion.current = coachName;
            if (coachName && photoRefs.current[coachName]) {
              showPhoto(coachName);
            }
          }

          if (closeSiblings && !wasActive) {
            accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
              if (sibling !== singleAccordion) {
                const siblingName = sibling.getAttribute('data-coach-name');
                sibling.setAttribute('data-accordion-status', 'not-active');
                if (siblingName === activeAccordion.current) {
                  activeAccordion.current = null;
                }
              }
            });
          }
        });
      });
    }

    initAccordionCSS();
  }, []);

  const showPhoto = (coachName: string) => {
    const targetPhoto = photoRefs.current[coachName];
    if (!targetPhoto) return;

    // Kill any existing animations on target
    gsap.killTweensOf(targetPhoto);

    // If there's a different visible photo, animate both simultaneously
    if (currentVisiblePhoto.current && currentVisiblePhoto.current !== coachName) {
      const currentPhoto = photoRefs.current[currentVisiblePhoto.current];
      if (currentPhoto) {
        gsap.killTweensOf(currentPhoto);
        // Animate out current photo (rotate back to 0 and down)
        gsap.to(currentPhoto, {
          y: '100%',
          rotation: 0,
          duration: 0.4,
          ease: 'power2.in'
        });
      }
    }

    // Get rotation for this coach from data
    const coach = coaches.find(c => c.name === coachName);
    const rotation = coach?.rotation || 0;

    // Animate in new photo with rotation
    currentVisiblePhoto.current = coachName;
    gsap.to(targetPhoto, {
      y: 0,
      rotation: rotation,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const hidePhoto = (coachName: string) => {
    const targetPhoto = photoRefs.current[coachName];
    if (!targetPhoto) return;

    gsap.killTweensOf(targetPhoto);
    gsap.to(targetPhoto, {
      y: '100%',
      rotation: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        if (currentVisiblePhoto.current === coachName) {
          currentVisiblePhoto.current = null;
        }
      }
    });
  };

  const handleMouseEnter = (coachName: string) => {
    // Only allow hover animations if no accordion is open
    if (activeAccordion.current !== null) {
      return;
    }

    showPhoto(coachName);
  };

  const handleMouseLeave = (coachName: string) => {
    // Don't hide if this accordion is active
    if (activeAccordion.current === coachName) {
      return;
    }

    // Only hide if no accordion is open
    if (activeAccordion.current !== null) {
      return;
    }

    hidePhoto(coachName);
  };

  return (
    <section className={styles.section} data-nav-dark>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleWrapper}>
          <p className={styles.subtitle}>ONTMOET DE</p>
          <h1 className={styles.title}>COACHES</h1>
        </div>

        {/* Coaches List - Accordion */}
        <div data-accordion-close-siblings="true" data-accordion-css-init="" className={styles.accordionCss}>
          <ul className={styles.accordionList}>
            {coaches.map((coach) => (
              <li
                key={coach.name}
                data-accordion-status="not-active"
                data-coach-name={coach.name}
                className={styles.accordionItem}
                onMouseEnter={() => handleMouseEnter(coach.name)}
                onMouseLeave={() => handleMouseLeave(coach.name)}
              >
                <div data-accordion-toggle="" className={styles.accordionItemTop}>
                  <div className={styles.coachContent}>
                    <div className={styles.coachImageWrapper}>
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        fill
                        className={styles.coachImage}
                      />
                    </div>
                    <h3 className={styles.coachName}>{coach.name}</h3>
                  </div>
                  <div className={styles.accordionIcon}>
                    <svg className={styles.accordionIconSvg} xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 36 36" fill="none">
                      <path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10"></path>
                    </svg>
                  </div>
                </div>
                <div className={styles.accordionItemBottom}>
                  <div className={styles.accordionItemBottomWrap}>
                    <div className={styles.accordionItemBottomContent}>
                      <p className={styles.descriptionText}>{coach.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Coach Photos Container */}
        <div className={styles.coachPhotosContainer}>
          {coaches.map((coach) => (
            <div
              key={`photo-${coach.name}`}
              ref={(el) => { photoRefs.current[coach.name] = el; }}
              data-coach={coach.name}
              className={styles.coachPhoto}
            >
              <Image
                src={coach.largeImage}
                alt={coach.name}
                fill
                className={styles.coachPhotoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
