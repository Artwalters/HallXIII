'use client';

import Image from 'next/image';
import styles from './CommunitySection.module.css';

export default function CommunitySection() {
  return (
    <section className={styles.section}>
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
        {/* Top Right Text */}
        <div className={styles.topText}>
          <p className={styles.topLine}>een sportschool</p>
          <p className={styles.topLine}>gedreven door</p>
        </div>

        {/* Main Community Text */}
        <div className={styles.communityWrapper}>
          <h2 className={styles.communityText}>COMMUNITY</h2>
        </div>

        {/* Social Media Section */}
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
    </section>
  );
}
