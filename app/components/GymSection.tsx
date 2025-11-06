'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './GymSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function GymSection() {
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleWrapperRef.current || !digit1Ref.current || !digit2Ref.current || !digit3Ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleWrapperRef.current,
          start: 'top 150%',
          end: 'bottom -150%',
          onLeave: () => {
            // Reset naar 0 wanneer uit scherm naar beneden
            gsap.to([digit1Ref.current, digit2Ref.current, digit3Ref.current], {
              y: '1%',
              duration: 0.5,
            });
          },
          onLeaveBack: () => {
            // Reset naar 0 wanneer uit scherm naar boven
            gsap.to([digit1Ref.current, digit2Ref.current, digit3Ref.current], {
              y: '1%',
              duration: 0.5,
            });
          },
          onEnter: () => {
            // Speel animatie af bij eerste keer binnenkomen
            tl.restart();
          },
          onEnterBack: () => {
            // Speel animatie opnieuw af bij terugkeren van beneden
            tl.restart();
          },
        }
      });

      // Cijfer 1 animeert eerst
      tl.fromTo(digit1Ref.current, {
        y: '1%',
      }, {
        y: '-29%',
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0)
      // Cijfer 2 animeert daarna
      .fromTo(digit2Ref.current, {
        y: '1%',
      }, {
        y: '-69%',
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.5)
      // Cijfer 3 animeert als laatste
      .fromTo(digit3Ref.current, {
        y: '1%',
      }, {
        y: '-49%',
        duration: 1.2,
        ease: 'power2.inOut',
      }, 1);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrapper} ref={titleWrapperRef}>
          <div className={styles.numberContainer}>
            <span className={styles.m2Text}>m2</span>
            <h2 className={styles.numberText}>
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
          <h3 className={styles.descriptionText}>
            waar jij je<br />
            kunt uitleven
          </h3>
        </div>

        {/* Swiper Slider */}
        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1.3}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            slideToClickedSlide={true}
            speed={1200}
            resistance={true}
            resistanceRatio={0.5}
            longSwipesRatio={0.3}
            onSlideChangeTransitionStart={(swiper) => {
              // Start animating as soon as transition begins (during drag)
              const slides = swiper.slides;
              slides.forEach((slide: HTMLElement, index: number) => {
                if (index === swiper.activeIndex) {
                  gsap.to(slide, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.inOut',
                  });
                } else {
                  gsap.to(slide, {
                    scale: 0.9,
                    opacity: 0.7,
                    duration: 0.8,
                    ease: 'power2.inOut',
                  });
                }
              });
            }}
            onSwiper={(swiper) => {
              // Initial animation on mount
              const slides = swiper.slides;
              slides.forEach((slide: HTMLElement, index: number) => {
                if (index === swiper.activeIndex) {
                  gsap.set(slide, { scale: 1, opacity: 1 });
                } else {
                  gsap.set(slide, { scale: 0.9, opacity: 0.7 });
                }
              });
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.4,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 1.6,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 1.9,
                spaceBetween: 60,
              },
            }}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-1.png"
                alt="Gym 1"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-2.png"
                alt="Gym 2"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-3.png"
                alt="Gym 3"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-1.png"
                alt="Gym 4"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-2.png"
                alt="Gym 5"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-3.png"
                alt="Gym 6"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-1.png"
                alt="Gym 7"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-2.png"
                alt="Gym 8"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <Image
                src="/assets/gym-3.png"
                alt="Gym 9"
                width={800}
                height={600}
                className={styles.slideImage}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* CTA Buttons */}
        <div className={styles.ctaContainer}>
          <a href="#" className={styles.ctaButton}>
            <span className={styles.ctaText}>dag pas?</span>
            <Image
              src="/assets/underline-1.svg"
              alt=""
              width={191}
              height={5}
              className={styles.ctaUnderline}
            />
          </a>
          <a href="#" className={styles.ctaButton}>
            <span className={styles.ctaText}>liD worden?</span>
            <Image
              src="/assets/underline-2.svg"
              alt=""
              width={232}
              height={5}
              className={styles.ctaUnderline}
            />
          </a>
        </div>
      </div>
    </section>
  );
}