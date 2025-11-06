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

        {/* Main Community Text with Images */}
        <div className={styles.communityWrapper}>
          <h2 className={styles.communityText}>COMMUNITY</h2>

          {/* Image 1 - Top Center */}
          <div className={styles.image1}>
            <Image
              src="/assets/community-1.jpg"
              alt="Community"
              fill
              sizes="(max-width: 768px) 200px, 300px"
              className={styles.image}
            />
          </div>

          {/* Image 2 - Bottom Left */}
          <div className={styles.image2}>
            <Image
              src="/assets/community-2.jpg"
              alt="Community"
              fill
              sizes="(max-width: 768px) 180px, 250px"
              className={styles.image}
            />
          </div>

          {/* Image 3 - Bottom Right */}
          <div className={styles.image3}>
            <Image
              src="/assets/community-3.jpg"
              alt="Community"
              fill
              sizes="(max-width: 768px) 200px, 320px"
              className={styles.image}
            />
          </div>
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
