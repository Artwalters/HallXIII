'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './CoachesSection.module.css';

interface Coach {
  name: string;
  image: string;
  description: string;
}

const coaches: Coach[] = [
  {
    name: 'RIM',
    image: '/assets/coach-rim.jpg',
    description: 'Mijn naam is Rim Pinckers, 32 jaar. Sinds 2015 ben ik actief als krachttrainer en coach. Zelf train ik al 13 jaar intensief, waarvan de eerste twee jaar gericht op gewichtheffen, gevolgd door 5 jaar competitief bodybuilden. Momenteel richt ik me op powerlifting.'
  },
  {
    name: 'DYLAN',
    image: '/assets/coach-dylan.jpg',
    description: 'Dylan is een ervaren coach met een passie voor atletische ontwikkeling en functionele training.'
  },
  {
    name: 'NOAH',
    image: '/assets/coach-noah.jpg',
    description: 'Noah specialiseert zich in krachtsport en helpt atleten hun doelen te bereiken met gepersonaliseerde training.'
  },
  {
    name: 'MAARTEN',
    image: '/assets/coach-maarten.jpg',
    description: 'Maarten combineert jarenlange ervaring in powerlifting met moderne trainingsmethoden.'
  },
  {
    name: 'MEREL',
    image: '/assets/coach-merel.jpg',
    description: 'Merel is gespecialiseerd in begeleiding en coaching voor zowel beginners als gevorderden.'
  },
];

export default function CoachesSection() {
  const [expandedCoach, setExpandedCoach] = useState<string | null>(null);
  const coachRefs = useRef<{ [key: string]: { bg: HTMLDivElement | null; descriptionWrapper: HTMLDivElement | null; descriptionContent: HTMLDivElement | null; chevron: HTMLDivElement | null } }>({});

  const toggleCoach = (name: string) => {
    const isCurrentlyExpanded = expandedCoach === name;
    const refs = coachRefs.current[name];

    if (!refs) return;

    // Close all other coaches first
    if (expandedCoach && expandedCoach !== name && coachRefs.current[expandedCoach]) {
      const prevRefs = coachRefs.current[expandedCoach];
      if (prevRefs.bg && prevRefs.descriptionWrapper && prevRefs.chevron && prevRefs.descriptionContent) {
        gsap.to(prevRefs.descriptionContent, { opacity: 0, duration: 0.3, ease: 'power3.out' });
        gsap.to(prevRefs.bg, { height: '10rem', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(prevRefs.descriptionWrapper, { gridTemplateRows: '0fr', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(prevRefs.chevron, { rotation: 180, duration: 0.6, ease: 'power3.inOut' });
      }
    }

    if (isCurrentlyExpanded) {
      // Close current coach
      if (refs.bg && refs.descriptionWrapper && refs.chevron && refs.descriptionContent) {
        gsap.to(refs.descriptionContent, { opacity: 0, duration: 0.3, ease: 'power3.out' });
        gsap.to(refs.bg, { height: '10rem', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(refs.descriptionWrapper, { gridTemplateRows: '0fr', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(refs.chevron, { rotation: 180, duration: 0.6, ease: 'power3.inOut' });
        setExpandedCoach(null);
      }
    } else {
      // Open new coach
      setExpandedCoach(name);

      if (refs.bg && refs.descriptionWrapper && refs.chevron && refs.descriptionContent) {
        gsap.to(refs.bg, { height: '100%', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(refs.descriptionWrapper, { gridTemplateRows: '1fr', duration: 0.6, ease: 'power3.inOut' });
        gsap.to(refs.chevron, { rotation: 0, duration: 0.6, ease: 'power3.inOut' });
        gsap.to(refs.descriptionContent, { opacity: 1, duration: 0.4, delay: 0.6, ease: 'power3.out' });
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleWrapper}>
          <p className={styles.subtitle}>ONTMOET DE</p>
          <h1 className={styles.title}>COACHES</h1>
        </div>

        {/* Coaches List */}
        <div className={styles.coachesList}>
          {coaches.map((coach) => {
            if (!coachRefs.current[coach.name]) {
              coachRefs.current[coach.name] = { bg: null, descriptionWrapper: null, descriptionContent: null, chevron: null };
            }

            return (
              <div key={coach.name} className={styles.coachItem}>
                <div
                  className={styles.coachButtonBg}
                  ref={(el) => { if (el) coachRefs.current[coach.name].bg = el; }}
                >
                  <Image
                    src="/assets/coach-button-bg.svg"
                    alt=""
                    fill
                    className={styles.buttonBgImage}
                  />
                </div>

                <button
                  className={`${styles.coachButton} ${expandedCoach === coach.name ? styles.expanded : ''}`}
                  onClick={() => toggleCoach(coach.name)}
                >
                  <div className={styles.coachContent}>
                    <div className={styles.coachImageWrapper}>
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        fill
                        className={styles.coachImage}
                      />
                    </div>
                    <span className={styles.coachName}>{coach.name}</span>
                  </div>
                  <div
                    className={styles.chevron}
                    ref={(el) => { if (el) coachRefs.current[coach.name].chevron = el; }}
                  >
                    <Image
                      src="/assets/chevron-down.svg"
                      alt=""
                      width={50}
                      height={33}
                    />
                  </div>
                </button>

                <div
                  className={styles.coachDescriptionWrapper}
                  ref={(el) => { if (el) coachRefs.current[coach.name].descriptionWrapper = el; }}
                >
                  <div className={styles.coachDescriptionInner}>
                    <div
                      className={styles.coachDescriptionContent}
                      ref={(el) => { if (el) coachRefs.current[coach.name].descriptionContent = el; }}
                    >
                      <p className={styles.descriptionText}>{coach.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Watermark */}
        <div className={styles.watermark}>
          <span className={styles.watermarkText}>HAL13</span>
        </div>
      </div>
    </section>
  );
}
