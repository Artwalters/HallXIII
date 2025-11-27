'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './CommunitySection.module.css';

const LOOPING_WORDS = ['COMMUNITY', 'EVENTS', 'TEAMWERK', 'PASSIE', 'AMBITIE'];

export default function CommunitySection() {
  const wordListRef = useRef<HTMLUListElement>(null);
  const wordsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const wordList = wordListRef.current;
    if (!wordList) return;

    const words = Array.from(wordList.children) as HTMLLIElement[];
    const totalWords = words.length;
    const wordHeight = 100 / totalWords;
    let currentIndex = 0;

    function moveWords() {
      currentIndex++;

      gsap.to(wordList, {
        yPercent: -wordHeight * currentIndex,
        duration: 1.2,
        ease: 'elastic.out(1, 0.85)',
        onComplete: function() {
          if (currentIndex >= totalWords - 3) {
            wordList.appendChild(wordList.children[0]);
            currentIndex--;
            gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
            words.push(words.shift()!);
          }
        }
      });
    }

    const tl = gsap.timeline({ repeat: -1, delay: 1 });
    tl.call(moveWords);
    tl.to({}, { duration: 2 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* Top Right Text - buiten clip-path */}
        <div className={styles.topText}>
          <p className={styles.topLine}>een sportschool</p>
          <p className={styles.topLine}>gedreven door</p>
        </div>

        <section className={styles.section} data-nav-dark>
          {/* Texture Overlay */}
          <div className={styles.overlay}>
            <Image
              src="/assets/overlays/overlay.jpg"
              alt=""
              fill
              className={styles.overlayImage}
            />
          </div>

          <div className={styles.container}>
            {/* Looping Words */}
            <div className={styles.loopingWords}>
              <div className={styles.loopingWordsContainers}>
                <ul ref={wordListRef} className={styles.loopingWordsList}>
                  {LOOPING_WORDS.map((word, index) => (
                    <li
                      key={index}
                      className={styles.loopingWordsItem}
                      ref={(el) => {
                        if (el) wordsRef.current[index] = el;
                      }}
                    >
                      <p className={styles.loopingWordsText}>{word}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.loopingWordsFade}></div>
            </div>

          </div>
        </section>

        {/* Social Media Section - buiten clip-path */}
        <div className={styles.socialSection}>
          <p className={styles.socialText}>volg ons</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
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
                  <Image src="/assets/stopmotion_icons/insta1.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/insta2.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/insta3.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                </div>
              </div>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="TikTok">
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
                  <Image src="/assets/stopmotion_icons/tiktok1.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/tiktok2.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/tiktok3.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                </div>
              </div>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
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
                  <Image src="/assets/stopmotion_icons/facebook1.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/facebook2.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                  <Image src="/assets/stopmotion_icons/facebook3.svg" alt="" width={20} height={20} className={styles.socialIconImg} />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
