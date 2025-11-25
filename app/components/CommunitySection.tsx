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
              <Image
                src="/assets/social-icon-1.svg"
                alt=""
                width={70}
                height={70}
                className={styles.socialIconImage}
              />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <Image
                src="/assets/social-icon-2.svg"
                alt=""
                width={70}
                height={70}
                className={styles.socialIconImage}
              />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <Image
                src="/assets/social-icon-3.svg"
                alt=""
                width={70}
                height={70}
                className={styles.socialIconImage}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
