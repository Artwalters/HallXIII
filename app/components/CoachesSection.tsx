'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CoachesSection.module.css';

interface Coach {
  name: string;
  image: string;
  description: string;
  largeImage: string;
  rotation: number;
  quote: string;
  frameIndex: number;
  flipFrame: boolean;
}

const frames = [
  '/assets/frames poloroid/frame 1.png',
  '/assets/frames poloroid/frame2.png',
  '/assets/frames poloroid/frame 3.png',
  '/assets/frames poloroid/frame4.png',
];

const coaches: Coach[] = [
  {
    name: 'RIM',
    image: '/assets/expertise-1.jpg',
    description: 'Rim Pinckers, 32 jaar. Sinds 2015 krachttrainer en coach met HBO Sportkunde Wellness. Traint zelf al 13 jaar: van gewichtheffen en competitief bodybuilden tot powerlifting. Combineert theoretische kennis met praktijkervaring, discipline en empathie voor een unieke coachingstijl.',
    largeImage: '/assets/expertise-1.jpg',
    rotation: -3,
    quote: 'Train hard, blijf nederig en blijf altijd je grenzen verleggen',
    frameIndex: 0,
    flipFrame: false
  },
  {
    name: 'DYLAN',
    image: '/assets/expertise-2.jpg',
    description: 'Dylan Strik, 23 jaar. CIOS-afgestudeerd coach met ervaring in wielrennen op hoog niveau. Specialiseert zich in krachttraining en conditionele begeleiding. Benadrukt het mentale aspect en voeding voor optimale resultaten. Combineert coaching met sportmassage als Athlete Reliëf binnen Hal13.',
    largeImage: '/assets/expertise-2.jpg',
    rotation: 4,
    quote: 'Je mindset bepaalt alles, je lichaam volgt waar je geest leidt',
    frameIndex: 1,
    flipFrame: true
  },
  {
    name: 'NOAH',
    image: '/assets/expertise-3.jpg',
    description: 'Noah Sipsma, 23 jaar. Sportkunde student en powerlifter op hoog niveau met Nederlands record squat. Meerdere podiumplaatsen bij Nederlandse Junioren Kampioenschappen. Helpt je zowel fysiek als mentaal sterker worden, van algemene fitness tot powerlifting op wedstrijdniveau.',
    largeImage: '/assets/expertise-3.jpg',
    rotation: -5,
    quote: 'Elke dag een beetje sterker worden, één rep per keer',
    frameIndex: 2,
    flipFrame: false
  },
  {
    name: 'MAARTEN',
    image: '/assets/expertise-4.jpg',
    description: 'Maarten combineert jarenlange ervaring in powerlifting met moderne trainingsmethoden.',
    largeImage: '/assets/expertise-4.jpg',
    rotation: 3,
    quote: 'Consistentie wint altijd van talent dat niet komt opdagen',
    frameIndex: 3,
    flipFrame: true
  },
  {
    name: 'MEREL',
    image: '/assets/expertise-5.jpg',
    description: 'Merel is gespecialiseerd in begeleiding en coaching voor zowel beginners als gevorderden.',
    largeImage: '/assets/expertise-5.jpg',
    rotation: -4,
    quote: 'Geloof in jezelf en vertrouw het proces, resultaten volgen',
    frameIndex: 0,
    flipFrame: true
  },
];

export default function CoachesSection() {
  const photoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const activeAccordion = useRef<string | null>(null);

  useEffect(() => {
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

          singleAccordion.setAttribute('data-accordion-status', wasActive ? 'not-active' : 'active');

          if (wasActive) {
            activeAccordion.current = null;
            setActiveCard(null);
          } else {
            activeAccordion.current = coachName;
            if (coachName) {
              bringToFront(coachName);
            }
          }

          if (closeSiblings && !wasActive) {
            accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
              if (sibling !== singleAccordion) {
                sibling.setAttribute('data-accordion-status', 'not-active');
              }
            });
          }
        });
      });
    }

    initAccordionCSS();
  }, []);

  const bringToFront = (coachName: string) => {
    const targetPhoto = photoRefs.current[coachName];
    if (!targetPhoto) return;

    // Reset all cards z-index
    Object.entries(photoRefs.current).forEach(([name, photo]) => {
      if (photo && name !== coachName) {
        gsap.to(photo, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        photo.style.zIndex = '1';
      }
    });

    // Bring target to front with slight scale
    targetPhoto.style.zIndex = '10';
    gsap.to(targetPhoto, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });

    setActiveCard(coachName);
  };

  const handleMouseEnter = (coachName: string) => {
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) return;
    if (activeAccordion.current !== null) return;
    bringToFront(coachName);
  };

  const handleMouseLeave = (coachName: string) => {
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) return;
    if (activeAccordion.current === coachName) return;
    if (activeAccordion.current !== null) return;

    const targetPhoto = photoRefs.current[coachName];
    if (targetPhoto) {
      gsap.to(targetPhoto, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    setActiveCard(null);
  };

  return (
    <section className={styles.section} data-nav-dark>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleWrapper}>
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
                className={styles.accordionItemWrapper}
                onMouseEnter={() => handleMouseEnter(coach.name)}
                onMouseLeave={() => handleMouseLeave(coach.name)}
              >
                <div className={styles.accordionItem}>
                  <div data-accordion-toggle="" className={styles.accordionItemTop}>
                    <div className={styles.coachContent}>
                      <div className={styles.coachImageContainer}>
                        <div className={styles.coachImageWrapper}>
                          <Image
                            src={coach.image}
                            alt={coach.name}
                            fill
                            className={styles.coachImage}
                          />
                        </div>
                        <div className={styles.coachImageRing}>
                          <svg className={styles.coachImageRingSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                            <ellipse cx="50" cy="50" rx="46" ry="48" stroke="currentColor" strokeWidth="4" fill="none" />
                            <ellipse cx="150" cy="50" rx="48" ry="46" stroke="currentColor" strokeWidth="4" fill="none" />
                            <ellipse cx="250" cy="50" rx="46" ry="47" stroke="currentColor" strokeWidth="4" fill="none" />
                          </svg>
                        </div>
                      </div>
                      <h3 className={styles.coachName}>{coach.name}</h3>
                    </div>
                    <div className={styles.accordionIcon}>
                      <div className={styles.accordionIconInner}>
                        <div className={styles.accordionIconSprite}>
                          <Image src="/assets/stopmotion_icons/down1.svg" alt="" width={20} height={20} className={styles.accordionIconImg} />
                          <Image src="/assets/stopmotion_icons/down2.svg" alt="" width={20} height={20} className={styles.accordionIconImg} />
                          <Image src="/assets/stopmotion_icons/down3.svg" alt="" width={20} height={20} className={styles.accordionIconImg} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.accordionItemBottom}>
                    <div className={styles.accordionItemBottomWrap}>
                      <div className={styles.accordionItemBottomContent}>
                        <p className={styles.descriptionText}>{coach.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Stacked Coach Photos */}
        <div className={styles.coachPhotosContainer}>
          {coaches.map((coach, index) => (
            <div
              key={`photo-${coach.name}`}
              ref={(el) => { photoRefs.current[coach.name] = el; }}
              data-coach={coach.name}
              data-frame-index={coach.frameIndex}
              className={styles.coachPhoto}
              style={{
                transform: `rotate(${coach.rotation}deg)`,
                zIndex: coaches.length - index
              }}
            >
              <div className={styles.polaroidWrapper}>
                <Image
                  src={coach.largeImage}
                  alt={coach.name}
                  fill
                  className={styles.coachPhotoImage}
                />
                {/* Polaroid Frame Overlay */}
                <div className={styles.frameOverlay}>
                  <Image
                    src={frames[coach.frameIndex]}
                    alt=""
                    fill
                    className={styles.frameImage}
                    style={{ transform: coach.flipFrame ? 'scaleX(-1)' : 'none' }}
                  />
                </div>
                {/* Quote */}
                <div className={styles.quoteCaption}>
                  <p className={styles.quoteText}>
                    {coach.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
