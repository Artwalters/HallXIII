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
      // Pro Marquee Implementation - Top (Left Direction)
      const topMarqueeContent = topMarqueeRef.current?.querySelector(`.${styles.marqueeContent}`);
      const topMarqueeScroll = topMarqueeRef.current?.querySelector(`.${styles.marqueeScroll}`) as HTMLElement;

      if (topMarqueeContent && topMarqueeScroll) {
        // Configuration
        const speed = 15;
        const direction = -1; // -1 for left, 1 for right
        const scrollSpeed = 10;
        const duplicate = 2;

        // Duplicate marquee content for seamless loop
        if (duplicate > 0) {
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < duplicate; i++) {
            fragment.appendChild(topMarqueeContent.cloneNode(true));
          }
          topMarqueeScroll.appendChild(fragment);
        }

        // Responsive speed multiplier
        const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
        const marqueeSpeed = speed * ((topMarqueeContent as HTMLElement).offsetWidth / window.innerWidth) * speedMultiplier;

        // Setup scroll container for parallax effect
        topMarqueeScroll.style.marginLeft = `${scrollSpeed * -1}%`;
        topMarqueeScroll.style.width = `${(scrollSpeed * 2) + 100}%`;

        // Get all marquee items (including duplicates)
        const topMarqueeItems = topMarqueeRef.current?.querySelectorAll(`.${styles.marqueeContent}`);

        // Basis marquee animation on all items
        const topAnimation = gsap.to(topMarqueeItems, {
          xPercent: -100,
          repeat: -1,
          duration: marqueeSpeed,
          ease: 'linear'
        }).totalProgress(0.5);

        // Set initial direction
        gsap.set(topMarqueeItems, { xPercent: direction === 1 ? 100 : -100 });
        topAnimation.timeScale(direction);
        topAnimation.play();

        // ScrollTrigger for direction inversion
        ScrollTrigger.create({
          trigger: topMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const isInverted = self.direction === 1; // Scrolling down
            const currentDirection = isInverted ? -direction : direction;
            topAnimation.timeScale(currentDirection);
          }
        });

        // Extra parallax scroll effect
        const topScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: topMarqueeRef.current,
            start: '0% 100%',
            end: '100% 0%',
            scrub: 0
          }
        });

        const scrollStart = direction === -1 ? scrollSpeed : -scrollSpeed;
        const scrollEnd = -scrollStart;

        topScrollTl.fromTo(topMarqueeScroll,
          { x: `${scrollStart}vw` },
          { x: `${scrollEnd}vw`, ease: 'none' }
        );
      }

      // Pro Marquee Implementation - Bottom (Right Direction)
      const bottomMarqueeContent = bottomMarqueeRef.current?.querySelector(`.${styles.marqueeContent}`);
      const bottomMarqueeScroll = bottomMarqueeRef.current?.querySelector(`.${styles.marqueeScroll}`) as HTMLElement;

      if (bottomMarqueeContent && bottomMarqueeScroll) {
        // Configuration
        const speed = 15;
        const direction = 1; // -1 for left, 1 for right
        const scrollSpeed = 10;
        const duplicate = 2;

        // Duplicate marquee content for seamless loop
        if (duplicate > 0) {
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < duplicate; i++) {
            fragment.appendChild(bottomMarqueeContent.cloneNode(true));
          }
          bottomMarqueeScroll.appendChild(fragment);
        }

        // Responsive speed multiplier
        const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
        const marqueeSpeed = speed * ((bottomMarqueeContent as HTMLElement).offsetWidth / window.innerWidth) * speedMultiplier;

        // Setup scroll container for parallax effect
        bottomMarqueeScroll.style.marginLeft = `${scrollSpeed * -1}%`;
        bottomMarqueeScroll.style.width = `${(scrollSpeed * 2) + 100}%`;

        // Get all marquee items (including duplicates)
        const bottomMarqueeItems = bottomMarqueeRef.current?.querySelectorAll(`.${styles.marqueeContent}`);

        // Basis marquee animation on all items
        const bottomAnimation = gsap.to(bottomMarqueeItems, {
          xPercent: -100,
          repeat: -1,
          duration: marqueeSpeed,
          ease: 'linear'
        }).totalProgress(0.5);

        // Set initial direction
        gsap.set(bottomMarqueeItems, { xPercent: direction === 1 ? 100 : -100 });
        bottomAnimation.timeScale(direction);
        bottomAnimation.play();

        // ScrollTrigger for direction inversion
        ScrollTrigger.create({
          trigger: bottomMarqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const isInverted = self.direction === 1; // Scrolling down
            const currentDirection = isInverted ? -direction : direction;
            bottomAnimation.timeScale(currentDirection);
          }
        });

        // Extra parallax scroll effect
        const bottomScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: bottomMarqueeRef.current,
            start: '0% 100%',
            end: '100% 0%',
            scrub: 0
          }
        });

        const scrollStart = direction === -1 ? scrollSpeed : -scrollSpeed;
        const scrollEnd = -scrollStart;

        bottomScrollTl.fromTo(bottomMarqueeScroll,
          { x: `${scrollStart}vw` },
          { x: `${scrollEnd}vw`, ease: 'none' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      {/* Top Marquee */}
      <div ref={topMarqueeRef} className={styles.marqueeContainer}>
        <div className={styles.marqueeScroll}>
          <div className={styles.marqueeContent}>
            <span className={styles.marqueeText}>
              Ontdek je volledige potentieel - onze coaching trajecten - Ontdek je volledige potentieel - onze coaching trajecten -
            </span>
            <span className={styles.marqueeText}>
              Ontdek je volledige potentieel - onze coaching trajecten - Ontdek je volledige potentieel - onze coaching trajecten -
            </span>
          </div>
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
        <div className={styles.marqueeScroll}>
          <div className={styles.marqueeContent}>
            <span className={styles.marqueeText}>
              - onze partners - expertise in de sport - onze partners - expertise in de sport -
            </span>
            <span className={styles.marqueeText}>
              - onze partners - expertise in de sport - onze partners - expertise in de sport -
            </span>
          </div>
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
