'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CoachingSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const coachingItems = [
  {
    number: '01',
    category: 'training begeleiding',
    title: 'zelfstandig trainen met ondersteuning',
    description: 'Bij Trainingsbegeleiding krijg je alles wat je nodig hebt om zelfstandig aan de slag te gaan, mét de steun van jouw persoonlijke coach. Je ontvangt een op maat gemaakt trainingsplan dat aansluit op jouw niveau, wensen, behoeften en doelen.',
    image: '/assets/expertise-1.jpg',
    imageAlt: 'Training begeleiding',
    imagePosition: 'right' // Text left, Image right
  },
  {
    number: '02',
    category: 'performance coaching',
    title: 'haal het maximale uit je prestaties',
    description: 'Bij Performance Begeleiding staat alles in het teken van het verbeteren van jouw prestaties. Of dit nu sportspecifiek is, powerlifting, krachtsport of conditietraining: het maakt niet uit. Afhankelijk van jouw niveau, doelstellingen en wensen stellen we de programmering samen die het beste bij jou past. Denk bijvoorbeeld aan een schema op basis van RIR of RPE.',
    image: '/assets/expertise-2.jpg',
    imageAlt: 'Performance coaching',
    imagePosition: 'left' // Image left, Text right
  },
  {
    number: '03',
    category: 'voeding begeleiding',
    title: 'voeding die bijdraagt aan je doelen',
    description: 'Heb jij je training goed onder controle en wil je vooral ondersteuning op het gebied van voeding? Dan sluit dit pakket perfect bij jou aan. Na een uitgebreide intake stellen we een persoonlijk plan van aanpak op, volledig afgestemd op jouw situatie en doelen. Je ontvangt twee voedingsschema\'s waarmee je direct praktisch aan de slag kunt.',
    image: '/assets/expertise-3.jpg',
    imageAlt: 'Voeding begeleiding',
    imagePosition: 'right' // Text left, Image right
  },
  {
    number: '04',
    category: 'leefstijl coaching',
    title: 'het aanpakken van jouw leefstijl',
    description: 'Leefstijlcoaching gaat verder dan alleen trainen en voeding. Met dit abonnement werk je aan álle leefstijlfactoren die invloed hebben op jouw gezondheid en prestaties: stress, slaap, herstel, je privéleven én natuurlijk beweging en voeding. We kijken dus niet alleen naar je schema, maar naar jou als persoon.',
    image: '/assets/expertise-4.jpg',
    imageAlt: 'Leefstijl coaching',
    imagePosition: 'left' // Image left, Text right
  },
  {
    number: '05',
    category: 'Personal training',
    title: 'één-op-één trainen onder begeleiding',
    description: 'Bij Personal Training ligt de focus volledig op één-op-één trainen onder begeleiding van jouw coach. Alle aandacht gaat naar jou: hoe jij traint, hoe jij beweegt en hoe jij het meeste uit jezelf haalt. Je coach zorgt ervoor dat je oefeningen altijd correct en veilig worden uitgevoerd, geeft je een duwtje waar nodig of trapt juist even op de rem als dat beter is. Zo haal je elke sessie het maximale uit je training.',
    image: '/assets/expertise-5.jpg',
    imageAlt: 'Personal training',
    imagePosition: 'right' // Text left, Image right
  }
];

const partnersItem = {
  number: '01',
  category: 'MAE Fysiotherapie',
  title: 'Fysiotherapie zonder beperkingen',
  description: 'Bij M.A.E. Fysiotherapie kijken we anders naar revalidatie. Waar veel zorgprofessionals vooral beperkingen opleggen, geloven wij in een doelgerichte, persoonlijke en stapsgewijze aanpak. Het doel: jou weer laten functioneren zonder belemmeringen.',
  image: '/assets/expertise-6.jpg',
  imageAlt: 'MAE Fysiotherapie',
  imagePosition: 'left' // Image left, Text right
};

export default function CoachingSection() {
  const topMarqueeRef = useRef<HTMLDivElement>(null);
  const bottomMarqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!topMarqueeRef.current || !bottomMarqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Top Marquee with seamless infinite loop
      const topMarqueeContent = topMarqueeRef.current?.querySelector(`.${styles.marqueeContent}`);

      if (topMarqueeContent) {
        // Create infinite loop timeline
        const topLoop = gsap.timeline({
          repeat: -1,
        });

        topLoop.to(topMarqueeContent, {
          x: '-50%',
          duration: 60,
          ease: 'none',
        });

        let topDirection = 1; // 1 = left (default), -1 = right

        // Scroll trigger controls the speed and direction based on scroll velocity
        ScrollTrigger.create({
          trigger: topMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = self.getVelocity();

            // Update direction based on scroll direction with higher threshold
            if (Math.abs(velocity) > 200) {
              topDirection = velocity > 0 ? 1 : -1;
            }

            const speedModifier = Math.abs(velocity) / 300;
            const clampedSpeed = Math.min(3, speedModifier);

            gsap.to(topLoop, {
              timeScale: topDirection * (1 + clampedSpeed),
              duration: 0.8,
              ease: 'power2.out',
            });
          },
        });
      }

      // Bottom Marquee with seamless infinite loop
      const bottomMarqueeContent = bottomMarqueeRef.current?.querySelector(`.${styles.marqueeContent}`);

      if (bottomMarqueeContent) {
        // Create infinite loop timeline
        const bottomLoop = gsap.timeline({
          repeat: -1,
        });

        bottomLoop.to(bottomMarqueeContent, {
          x: '-50%',
          duration: 60,
          ease: 'none',
        });

        let bottomDirection = 1; // 1 = left (default), -1 = right

        // Scroll trigger controls the speed and direction based on scroll velocity
        ScrollTrigger.create({
          trigger: bottomMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = self.getVelocity();

            // Update direction based on scroll direction with higher threshold
            if (Math.abs(velocity) > 200) {
              bottomDirection = velocity > 0 ? 1 : -1;
            }

            const speedModifier = Math.abs(velocity) / 300;
            const clampedSpeed = Math.min(3, speedModifier);

            gsap.to(bottomLoop, {
              timeScale: bottomDirection * (1 + clampedSpeed),
              duration: 0.8,
              ease: 'power2.out',
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      {/* Top Marquee */}
      <div ref={topMarqueeRef} className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span className={styles.marqueeText}>
            Ontdek je volledige potentieel - onze coaching trajecten - Ontdek je volledige potentieel - onze coaching trajecten -
          </span>
          <span className={styles.marqueeText}>
            Ontdek je volledige potentieel - onze coaching trajecten - Ontdek je volledige potentieel - onze coaching trajecten -
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Coaching Items */}
      <div className={styles.container}>
        {coachingItems.map((item, index) => (
          <div key={index} className={styles.coachingItem}>
            {item.imagePosition === 'right' ? (
              <>
                <div className={styles.textContent}>
                  <div className={styles.header}>
                    <p className={styles.category}>{item.number} {item.category}</p>
                    <h2 className={styles.title}>{item.title}</h2>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <a href="#" className={styles.link}>
                    <span className={styles.linkText}>meer info</span>
                    <Image
                      src="/assets/underline-1.svg"
                      alt=""
                      width={94}
                      height={2}
                      className={styles.underline}
                    />
                  </a>
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 650px"
                    className={styles.image}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 650px"
                    className={styles.image}
                  />
                </div>
                <div className={styles.textContent}>
                  <div className={styles.header}>
                    <p className={styles.category}>{item.number} {item.category}</p>
                    <h2 className={styles.title}>{item.title}</h2>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <a href="#" className={styles.link}>
                    <span className={styles.linkText}>meer info</span>
                    <Image
                      src="/assets/underline-1.svg"
                      alt=""
                      width={94}
                      height={2}
                      className={styles.underline}
                    />
                  </a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Bottom Marquee */}
      <div ref={bottomMarqueeRef} className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span className={styles.marqueeText}>
            - onze partners - expertise in de sport - onze partners - expertise in de sport -
          </span>
          <span className={styles.marqueeText}>
            - onze partners - expertise in de sport - onze partners - expertise in de sport -
          </span>
        </div>
      </div>

      {/* Partners Section */}
      <div className={styles.container}>
        <div className={styles.coachingItem}>
          <div className={styles.imageWrapper}>
            <Image
              src={partnersItem.image}
              alt={partnersItem.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 518px"
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.header}>
              <p className={styles.category}>{partnersItem.number} {partnersItem.category}</p>
              <h2 className={styles.title}>{partnersItem.title}</h2>
            </div>
            <p className={styles.description}>{partnersItem.description}</p>
            <a href="#" className={styles.link}>
              <span className={styles.linkText}>meer info</span>
              <Image
                src="/assets/underline-1.svg"
                alt=""
                width={94}
                height={2}
                className={styles.underline}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
