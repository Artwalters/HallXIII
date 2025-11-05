'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './GymSection.module.css';

export default function GymSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.numberContainer}>
            <span className={styles.m2Text}>m2</span>
            <h2 className={styles.numberText}>200</h2>
          </div>
          <h3 className={styles.descriptionText}>
            waar jij je kunt uitleven
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