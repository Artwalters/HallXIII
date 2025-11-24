'use client';

import Image from 'next/image';
import styles from './CommunitySection.module.css';

export default function CommunitySection() {
  return (
    <>
      {/* SVG Filter Definition for Emboss Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="communityEmbossFilter" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create bevel effect using specular lighting */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5"
                                specularExponent="20" lightingColor="white" result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                         k1="0" k2="1" k3="0.3" k4="0"/>
          </filter>
        </defs>
      </svg>

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
      </div>
    </>
  );
}
