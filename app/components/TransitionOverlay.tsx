'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './TransitionOverlay.module.css';

export default function TransitionOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Set initial positions (off-screen)
    gsap.set('#transition-shape-1', { x: '-100%', y: '-100%' });
    gsap.set('#transition-shape-2', { y: '100%' });
    gsap.set('#transition-shape-3', { x: '100%' });
  }, [mounted]);

  const overlay = (
    <div className={styles.transitionContainer} aria-hidden="true">
      <div id="transition-shape-1" className={`${styles.shape} ${styles.shape1}`}>
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image src="/assets/overlays/overlay.jpg" alt="" fill className={styles.overlayImage} />
        </div>
      </div>

      <div id="transition-shape-2" className={`${styles.shape} ${styles.shape2}`}>
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image src="/assets/overlays/overlay.jpg" alt="" fill className={styles.overlayImage} />
        </div>
      </div>

      <div id="transition-shape-3" className={`${styles.shape} ${styles.shape3}`}>
        <div className={styles.paperBg} />
        <div className={styles.overlay}>
          <Image src="/assets/overlays/overlay.jpg" alt="" fill className={styles.overlayImage} />
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(overlay, document.body);
}
