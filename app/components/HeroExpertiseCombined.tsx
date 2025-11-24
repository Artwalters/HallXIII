'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OnboardingForm from './OnboardingForm';
import Navigation from './Navigation';
import styles from './HeroExpertiseCombined.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExpertiseCombined() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const expertiseWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const shadowOverlayRef = useRef<HTMLDivElement>(null);

  // Parallax effect removed

  useEffect(() => {
    // Image columns animation (from ExpertiseSection)
    if (!containerRef.current || !leftColumnRef.current || !middleColumnRef.current || !rightColumnRef.current) return;

    const ctx = gsap.context(() => {
      // Configuration
      const speed = 200; // base animation speed in seconds
      const leftDirection = -1; // -1 for down, 1 for up
      const middleDirection = 1; // opposite of left
      const rightDirection = -1; // same as left
      const scrollSpeed = 10; // parallax strength
      const duplicate = 2;

      // Duplicate collections for seamless loop
      const duplicateCollection = (column: HTMLDivElement) => {
        const collection = column.querySelector('[data-collection]') as HTMLDivElement;
        if (!collection) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < duplicate; i++) {
          fragment.appendChild(collection.cloneNode(true));
        }
        column.appendChild(fragment);
      };

      duplicateCollection(leftColumnRef.current);
      duplicateCollection(middleColumnRef.current);
      duplicateCollection(rightColumnRef.current);

      // Responsive speed multiplier
      const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
      const adjustedSpeed = speed * speedMultiplier;

      // Get all collection items for each column
      const leftCollections = leftColumnRef.current.querySelectorAll('[data-collection]');
      const middleCollections = middleColumnRef.current.querySelectorAll('[data-collection]');
      const rightCollections = rightColumnRef.current.querySelectorAll('[data-collection]');

      // Base animations for continuous scroll - animate ALL collections
      const leftAnimation = gsap.to(leftCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed,
        ease: 'linear'
      }).totalProgress(0.5);

      const middleAnimation = gsap.to(middleCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed * 1.4,
        ease: 'linear'
      }).totalProgress(0.5);

      const rightAnimation = gsap.to(rightCollections, {
        yPercent: -100,
        repeat: -1,
        duration: adjustedSpeed * 1.2,
        ease: 'linear'
      }).totalProgress(0.5);

      // Set initial direction
      gsap.set(leftCollections, { yPercent: leftDirection === 1 ? 100 : -100 });
      gsap.set(middleCollections, { yPercent: middleDirection === 1 ? 100 : -100 });
      gsap.set(rightCollections, { yPercent: rightDirection === 1 ? 100 : -100 });

      leftAnimation.timeScale(leftDirection);
      middleAnimation.timeScale(middleDirection);
      rightAnimation.timeScale(rightDirection);

      leftAnimation.play();
      middleAnimation.play();
      rightAnimation.play();

      // ScrollTrigger for direction inversion
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const isInverted = self.direction === 1; // Scrolling down
          const currentLeftDir = isInverted ? -leftDirection : leftDirection;
          const currentMiddleDir = isInverted ? -middleDirection : middleDirection;
          const currentRightDir = isInverted ? -rightDirection : rightDirection;

          leftAnimation.timeScale(currentLeftDir);
          middleAnimation.timeScale(currentMiddleDir);
          rightAnimation.timeScale(currentRightDir);
        }
      });

      // Extra parallax scroll effect on columns
      const leftScrollStart = leftDirection === -1 ? scrollSpeed : -scrollSpeed;
      const middleScrollStart = middleDirection === -1 ? scrollSpeed : -scrollSpeed;
      const rightScrollStart = rightDirection === -1 ? scrollSpeed : -scrollSpeed;

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(leftColumnRef.current,
        { y: `${leftScrollStart}vh` },
        { y: `${-leftScrollStart}vh`, ease: 'none' }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(middleColumnRef.current,
        { y: `${middleScrollStart}vh` },
        { y: `${-middleScrollStart}vh`, ease: 'none' }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0
        }
      }).fromTo(rightColumnRef.current,
        { y: `${rightScrollStart}vh` },
        { y: `${-rightScrollStart}vh`, ease: 'none' }
      );
    });

    return () => ctx.revert();
  }, []);

  // Shadow overlay mouse parallax effect
  useEffect(() => {
    if (!heroSectionRef.current || !shadowOverlayRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current || !shadowOverlayRef.current) return;

      const rect = heroSectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Invert movement for realistic light effect - shadow moves opposite to mouse
      // Smooth movement for shadow overlay (max 40px in each direction)
      gsap.to(shadowOverlayRef.current, {
        x: -x * 40,
        y: -y * 40,
        duration: 1.5,
        ease: 'power0.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      if (!shadowOverlayRef.current) return;

      // Reset to center when mouse leaves
      gsap.to(shadowOverlayRef.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power0.out'
      });
    };

    const heroSection = heroSectionRef.current;
    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* SVG Filter Definition for Emboss Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="embossFilter" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create bevel effect using specular lighting */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5"
                                specularExponent="20" lightingColor="white" result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                         k1="0" k2="1" k3="0.05" k4="0"/>
          </filter>
        </defs>
      </svg>

      {/* Navigation Component */}
      <Navigation />

      <div className={styles.wrapper} ref={wrapperRef}>
        {/* Outer Content Container - buiten clip-path */}
        <div className={styles.outerContentContainer}>
          {/* Meet Hall13 Button - left */}
          <div className={styles.meetHall13Container}>
            <div className={styles.meetHall13Button}>
              <Image
                src="/assets/meet-button-bg.svg"
                alt=""
                fill
                className={styles.meetButtonBg}
              />
              <div className={styles.meetButtonImage}>
                <Image
                  src="/assets/meet-preview.jpg"
                  alt=""
                  fill
                  className={styles.meetPreviewImage}
                />
              </div>
              <span className={styles.meetHall13Text}>meet hall13</span>
            </div>
          </div>

          {/* Bottom row - OnboardingForm (left) + Tagline (right) */}
          <div className={styles.bottomRow}>
            {/* OnboardingForm - left */}
            <div className={styles.onboardingWrapper}>
              <OnboardingForm />
            </div>

            {/* Tagline - right */}
            <div className={styles.taglineWrapper}>
              <p className={styles.tagline}>
                De hal waar sport en expertise samen komen
              </p>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className={styles.heroSection} ref={heroSectionRef}>
        <div className={styles.clippedContent}>
          {/* Texture Overlay - Noise */}
          <div
            className={styles.overlay}
            style={{
              backgroundImage: 'url(/assets/overlays/noise_repeat_texture.webp)',
              backgroundRepeat: 'repeat'
            }}
          ></div>

          {/* Shadow Overlay */}
          <div ref={shadowOverlayRef} className={styles.shadowOverlay}>
            <Image
              src="/assets/overlays/shadow_overlay.png"
              alt=""
              fill
              className={styles.shadowOverlayImage}
            />
          </div>

          <div className={styles.heroContainer}>

            {/* Main Content */}
            <div className={styles.mainContent}>
              {/* Left Side: Large HALL XIII Logo */}
              <div className={styles.hallLogoContainer}>
                <h1 className={styles.hallLogo}>
                  <svg width="1055" height="360" viewBox="0 0 1055 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1054.97 58.7306L1054.97 285.413H1001.65L1001.65 58.903C1003.58 58.3429 1051.28 58.1561 1054.97 58.7306Z" fill="currentColor"/>
                    <path d="M985.025 58.4297L985.025 284.968C982.956 285.514 938.032 285.773 931.61 285.227L931.61 58.4297H985.025Z" fill="currentColor"/>
                    <path d="M914.915 58.5996H861.5L861.5 285.268H914.915L914.915 58.5996Z" fill="currentColor"/>
                    <path d="M814.122 280.743C813.993 281.059 813.978 281.16 813.921 281.217C813.863 281.275 813.748 281.332 813.662 281.332C803.922 281.375 794.167 281.418 784.426 281.447H753.337C750.564 275.903 747.834 270.474 745.119 265.045C742.289 259.329 739.53 253.569 736.585 247.925C735.594 246.043 735.68 244.665 736.786 242.798C745.751 228.033 754.587 213.196 763.465 198.374C763.867 197.699 764.356 197.096 764.945 196.234C765.476 196.78 766.022 197.182 766.324 197.714C773.091 209.448 779.8 221.225 786.581 232.959C794.569 246.819 802.614 260.65 810.631 274.51C811.852 276.621 813.016 278.761 814.136 280.743H814.122Z" fill="currentColor"/>
                    <path d="M848.225 0.258525C847.937 0.517049 847.894 0.718124 847.851 0.919199C844.418 5.32848 841.357 9.63723 838.139 13.8311C836.056 16.5599 833.772 19.1165 831.387 22.0033C833.168 22.664 833.269 24.0141 832.824 25.5078C831.99 28.409 831.071 31.3102 830.209 34.1971C829.62 36.1791 829.002 38.1324 828.499 40.1288C827.81 42.9438 826.431 45.012 823.313 45.3711C822.178 45.5003 821.646 46.2472 821.244 47.2095C820.339 49.3782 819.405 51.547 818.5 53.7013C818.543 54.2902 818.673 54.4482 818.787 54.6205C823.485 51.1592 827.853 47.5255 832.306 44.0067C833.585 43.0013 834.921 41.8379 837.134 42.3981C837.464 45.5147 835.582 47.942 834.318 50.441C832.68 53.687 831.028 57.0621 827.566 59.3458C826.962 57.9095 826.502 56.7893 825.956 55.4536C824.606 56.8036 825.123 58.1968 825.181 59.4607C825.238 60.7533 825.54 62.0747 823.687 62.5343C823.859 63.2093 823.959 63.7694 824.117 64.3152C824.592 66.01 824.232 67.317 822.666 68.3654C820.397 69.9022 817.983 71.3528 816.13 73.3205C812.423 77.2127 808.903 81.306 805.57 85.543C793.344 101.04 781.161 116.566 769.079 132.149C764.281 138.368 759.755 144.788 755.1 151.108C754.339 152.142 753.75 153.162 755.344 153.995C752.5 156.135 749.181 157.571 748.879 161.908C747.658 160.731 746.883 161.147 746.179 162.138C743.952 165.24 741.452 168.185 739.455 171.431C735.906 177.19 732.645 183.122 729.255 188.967C728.924 189.542 728.465 190.044 727.976 190.676C728.378 191.926 728.737 193.262 729.212 194.525C729.614 195.588 730.39 196.091 731.553 195.517C732.229 194.913 732.458 194.54 732.703 194.166C733.364 193.534 733.723 193.046 734.082 192.587C734.484 192.242 734.513 191.969 734.57 191.71C734.57 191.667 734.7 191.667 734.757 191.653C734.757 191.897 734.728 192.127 734.714 192.342C734.427 192.788 734.412 193.061 734.412 193.348C734.901 193.463 735.475 193.276 735.763 192.874C742.371 183.969 749.023 175.107 755.517 166.116C765.243 152.688 774.725 139.086 784.537 125.729C792.482 114.9 800.844 104.372 808.875 93.5859C813.026 87.9989 816.848 82.1678 820.813 76.4659C820.253 76.351 819.491 76.552 819.089 77.026C816.575 79.9559 814.161 82.9577 811.705 85.9307C805.599 93.6147 799.78 101.04 794.063 108.509C786.721 118.103 779.423 127.74 772.125 137.363C768.878 141.585 765.976 145.621 763.074 149.643C761.364 152.3 759.712 154.497 757.787 156.537C758.534 154.081 760.014 152.099 761.551 150.145C764.74 145.593 767.7 141.284 770.645 136.989C774.251 132.106 777.354 127.323 780.788 122.814C788.474 112.731 796.376 102.835 804.062 92.7386C805.987 90.2251 808.257 88.0564 810.196 85.5717C814.319 81.0762 818.112 76.7818 821.905 72.5018C823.873 70.8645 825.037 68.6958 827.925 68.1643C827.178 71.1805 825.698 73.3636 824.419 75.6185C817.767 87.2521 809.78 97.9809 801.792 108.681C793.215 120.185 784.466 131.56 775.917 143.079C767.125 154.899 758.505 166.835 749.756 178.698C744.512 185.807 739.556 193.104 735.159 200.802C730.303 209.333 725.045 217.62 719.816 225.936C712.949 236.823 705.952 247.624 698.97 258.439C693.065 267.602 687.046 276.693 681.184 285.871C676.472 293.239 671.917 300.707 667.291 308.118C666.228 309.828 665.438 311.235 664.648 312.657C664.432 312.542 664.217 312.441 664.001 312.341C664.562 311.106 665.136 309.871 665.711 308.635C666.904 306.553 667.794 304.7 668.699 302.847C669.288 301.641 669.964 300.549 669.777 298.998C669.604 297.619 670.725 296.557 671.989 295.824C673.153 295.135 673.685 294.115 674.259 292.765C675.351 290.165 677.406 287.968 677.937 285.038C677.937 284.952 678.052 284.851 678.124 284.822C680.825 284.033 680.968 281.447 682.06 279.465C683.612 276.636 685.523 274.007 687.232 271.25C689.387 267.745 691.542 264.227 693.568 260.636C694.832 258.41 694.933 255.939 694.114 253.512C693.151 250.683 691.269 250.123 689.387 252.435C687.232 255.078 685.278 257.965 683.756 261.009C678.339 271.824 672.09 282.137 665.697 292.377C665.208 292.779 665.079 292.995 664.935 293.196C664.576 293.325 664.533 293.655 664.504 293.971C664.447 293.713 664.389 293.44 664.318 293.181C664.662 292.851 664.677 292.636 664.691 292.42C665.093 291.501 665.309 290.855 665.51 290.194C665.539 289.72 665.424 289.648 665.323 289.576C663.958 288.916 663.642 289.821 663.269 290.438C661.229 293.9 659.203 297.361 657.249 300.88C656.114 302.89 655.152 305.002 653.859 307.587C653.112 305.849 652.594 304.628 651.919 303.02C648.888 309.44 645.828 315.544 641.661 321.045C644.951 310.474 649.807 300.578 654.275 290.51C654.247 290.079 654.074 290.079 653.887 290.079C649.965 294.56 647.753 299.688 645.454 304.786C645.339 305.045 645.109 305.447 645.196 305.591C646.632 307.673 644.865 308.937 643.802 310.072C642.308 311.709 641.432 313.634 640.368 315.486C637.28 320.844 634.176 326.186 630.872 331.414C629.464 333.626 627.654 335.68 624.407 336.01C624.091 333.095 624.766 330.366 625.585 327.723C628.731 317.555 633.487 308.061 637.998 298.481C642.337 289.246 646.474 279.91 650.597 270.575C651.402 268.765 651.775 266.769 652.35 264.859C652.163 264.787 651.962 264.715 651.775 264.643C650.641 266.884 649.462 269.124 648.385 271.394C643.903 281.002 639.291 290.553 635.01 300.248C631.404 308.406 628.185 316.736 624.824 325.023C623.545 328.197 621.965 331.328 621.175 334.646C619.393 342.157 613.905 347.5 610.4 354.007C609.351 355.96 607.885 357.698 606.42 359.436C606.161 356.85 607.612 354.811 608.518 352.685C613.402 341.21 618.416 329.806 623.373 318.373C625.671 313.059 627.927 307.716 630.197 302.373C630.498 301.655 630.743 300.908 631.016 300.176C630.915 299.544 630.771 299.343 630.628 299.113C628.545 302.876 626.778 306.797 625.039 310.747C621.232 319.379 617.439 327.996 613.618 336.628C613.474 336.973 613.187 337.26 612.54 337.461C612.77 336.556 612.957 335.623 613.244 334.732C614.666 330.452 616.103 326.172 617.525 321.892C616.85 321.892 616.319 322.366 615.801 322.854C615.672 322.782 615.543 322.711 615.399 322.639C615.916 321.677 616.419 320.714 616.936 319.752C617.497 318.761 617.683 317.856 617.856 316.966C619.953 311.924 621.764 307.142 623.588 302.345C622.927 302 622.568 302.043 621.907 302.144C622.266 301.425 622.525 300.908 623.042 299.86C623.128 300.851 623.157 301.21 623.186 301.569C624.824 301.167 624.824 299.601 625.197 298.223C625.082 297.763 624.795 297.82 624.795 297.82C624.465 298.065 624.393 298.237 624.263 298.381C623.818 298.768 623.603 298.969 623.401 299.185C623.401 298.926 623.43 298.682 623.445 298.424C623.746 298.022 623.847 297.849 623.976 297.706C625.729 293.943 627.266 290.323 628.789 286.718C630.355 283.831 631.547 281.16 632.74 278.474C634.191 275.156 635.627 271.81 637.078 268.507C642.049 257.189 646.79 245.756 652.092 234.597C655.999 226.367 660.654 218.482 664.978 210.454C665.294 209.865 665.711 209.319 666.358 208.342C666.688 209.635 666.904 210.511 667.119 211.416C670.423 213.067 671.17 216.773 673.34 219.33C673.728 219.674 673.871 219.66 674.029 219.66C672.018 214.087 669.59 208.4 667.033 202.439C679.201 180.738 691.485 158.849 703.854 136.817C704.314 137.923 704.717 138.885 705.277 140.207C706.771 138.454 706.124 137.047 705.622 135.754C705.148 134.462 705.291 133.528 706.828 132.551C708.538 138.512 710.176 144.314 711.828 150.102C712.23 150.533 712.474 150.533 712.719 150.548C712.316 147.517 711.684 144.429 710.751 141.442C708.94 135.596 710.492 130.498 713.566 125.499C719.299 116.207 725.965 107.618 732.631 99.0006C739.354 90.3113 746.179 81.7225 752.96 73.0763C753.434 72.9614 753.506 72.7891 753.577 72.6167C753.606 72.746 753.62 72.8752 753.649 73.0189C753.319 73.421 753.319 73.7801 753.319 74.5126C754.885 73.4785 756.206 72.6167 757.543 71.7406C757.945 69.8878 756.652 68.4372 757.672 66.9148C758.692 65.6366 759.338 64.6743 759.999 63.7263C761.781 61.4283 763.203 59.3027 764.64 57.177C765.085 56.5882 765.157 56.1142 765.257 55.3961C764.266 55.5828 763.39 55.7408 762.513 55.8988C762.398 55.7695 762.298 55.6259 762.183 55.4823C763.964 53.9024 765.746 52.3082 767.556 50.6852C768.174 52.4949 767.729 53.9168 765.588 57.1052C763.821 59.4463 762.413 61.572 760.991 63.6833C760.287 64.6168 759.956 65.4068 759.626 66.1967C759.583 67.6904 759.453 68.7245 759.338 69.7586C761.623 67.8915 763.217 65.7084 764.051 63.0082C764.309 62.1896 765.243 61.5863 765.89 60.9113C766.134 60.6384 766.55 60.4373 766.651 60.1357C768.677 54.5344 772.714 50.3118 776.55 46.003C785.658 35.7913 795.456 26.2833 806.188 17.7664C807.208 16.9621 808.343 16.3158 809.42 15.5977C809.593 15.8131 809.751 16.0429 809.938 16.2727C805.829 20.1362 801.734 23.9853 797.64 27.8489C797.525 28.1936 797.697 28.251 797.87 28.3085C803.602 24.287 808.76 20.1075 814.018 16.0716C817.408 13.4433 820.928 11.0017 824.419 8.51695C824.793 8.24407 825.267 8.1148 826.244 7.6552C825.612 9.01964 825.181 9.91011 824.778 10.815C824.965 11.1166 825.468 11.0878 826 11.0735C826.804 10.5564 827.106 10.2261 827.393 9.88139C827.767 9.53669 827.867 9.3787 828.04 9.2638C828.585 8.78984 828.873 8.44514 829.175 8.10044C829.534 7.7701 829.649 7.61212 829.792 7.48285C830.108 7.15252 830.223 7.00889 830.381 6.89399C830.769 6.60674 830.884 6.46312 830.999 6.30513C831.401 6.06097 831.488 5.90298 831.603 5.74499C831.99 5.47211 832.077 5.29976 832.192 5.12741C832.594 4.91197 832.709 4.78271 832.824 4.63908C832.852 4.79707 832.867 4.94069 832.91 5.09868C832.579 5.41466 832.479 5.57264 832.393 5.74499C832.062 6.04661 831.933 6.20459 831.775 6.31949C831.444 6.62111 831.373 6.80782 831.301 7.00889C830.97 7.38232 830.841 7.52594 830.683 7.62648C830.353 7.92809 830.209 8.07172 830.065 8.18662C829.548 8.6893 829.261 9.04837 828.988 9.39306C828.571 9.66595 828.471 9.82394 828.341 9.9532C827.824 10.4846 827.508 10.8293 827.206 11.174C825.382 12.8113 823.888 14.2763 822.365 15.7556C817.782 20.2367 813.457 24.5168 809.406 29.0409C807.538 31.1235 806.202 33.68 804.622 36.0211C803.861 37.1557 803.099 38.3047 802.323 39.4394C802.323 39.9995 802.467 40.2006 802.611 40.3873C812.955 30.0176 822.997 19.4612 834.26 10.183C838.24 6.89399 842.478 3.9066 846.616 0.775574C847.19 0.459599 847.391 0.315975 847.607 0.186712C847.937 0.272887 847.952 0.143625 847.98 0C848.024 0.1149 848.081 0.201075 848.124 0.315975L848.225 0.258525Z" fill="currentColor"/>
                    <path d="M705.763 95.4083C698.307 107.76 690.937 120.184 683.552 132.578C681.843 135.451 680.162 138.323 678.424 141.182C678.036 141.814 677.533 142.388 676.858 143.307C672.49 135.724 668.281 128.456 664.1 121.16C660.494 114.913 657.161 109.01 653.785 103.121C648.9 94.604 644.015 86.0871 639.088 77.5845C635.74 71.8108 632.335 66.0658 628.974 60.3064C628.557 59.5883 628.241 58.7983 627.752 57.793H688.782C691.54 63.2364 694.356 68.7372 697.129 74.2524C700.045 80.0548 702.876 85.8716 705.849 91.631C706.553 93.0098 706.596 94.0008 705.749 95.394L705.763 95.4083Z" fill="currentColor"/>
                    <path d="M594.391 242.794V285.063H444.706V58.2793H499.227V242.794H594.391Z" fill="currentColor"/>
                    <path d="M428.095 285.136H369.249C364.839 271.032 360.414 256.928 355.931 242.652H304.068C308.119 228.49 312.07 214.645 316.107 200.541H342.843C334.741 174.43 326.753 148.735 318.779 123.041H318.176C301.439 177.029 284.716 231.018 267.979 285.064H209.349C237.105 209.445 264.804 133.942 292.546 58.3809H344.208C345.501 61.7704 346.823 65.2318 348.145 68.6788C351.147 76.851 354.006 84.578 356.865 92.305C359.724 100.032 362.597 107.759 365.442 115.486C367.655 121.461 369.853 127.45 372.051 133.439C375.01 141.453 377.998 149.453 380.944 157.482C383.113 163.371 385.268 169.274 387.437 175.162C390.397 183.176 393.385 191.176 396.345 199.191C399.175 206.831 401.962 214.487 404.792 222.128C407.479 229.395 410.223 236.634 412.924 243.901C416.3 253.007 419.647 262.113 423.009 271.233C424.331 274.838 425.667 278.414 426.989 281.99C427.348 282.981 427.678 283.987 428.052 285.136H428.095Z" fill="currentColor"/>
                    <path d="M189.605 58.4414H135.27V285.182H189.605V58.4414Z" fill="currentColor"/>
                    <path d="M112.692 148.204V190.559H54.9236V285.136C51.8492 285.164 48.9327 285.179 46.0163 285.193C43.1573 285.193 40.2984 285.193 37.4394 285.193H0V58.4238H54.7799V148.204H112.692Z" fill="currentColor"/>
                  </svg>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <div
        ref={expertiseWrapRef}
        className={styles.expertiseWrap}
        data-expertise-parallax
      >
        <section
          className={styles.expertise}
          data-expertise-parallax-inner
          data-nav-dark
        >
          <div className={styles.expertiseContainer}>
            {/* Title & Description */}
            <div className={styles.textContainer}>
              <h2 className={styles.title}>
                een sportschool <br />
                met diverse expertises
              </h2>
              <p className={styles.description}>
                Hal 13 is de sportschool waar je verschillende disciplines kunt ontdekken, van krachtsport en powerlifting tot atletische doelen. Onze coaches en externe experts staan klaar om je te helpen bij het optimaal ontwikkelen van jouw sportieve ambities.
              </p>
            </div>

            {/* Image Grid Container - Overflow Hidden for Animation */}
            <div ref={containerRef} className={styles.imageContainer}>
              {/* Top Gradient Overlay */}
              <div className={styles.topGradient} />

              {/* Bottom Gradient Overlay */}
              <div className={styles.bottomGradient} />

              <div className={styles.columnsContainer}>
                {/* Left Column - Scrolls Down */}
                <div ref={leftColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-1.jpg" alt="Powerlifting training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-4.jpg" alt="Running training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>

                {/* Middle Column - Scrolls Up */}
                <div ref={middleColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-2.jpg" alt="Personal training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-5.jpg" alt="Strength training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Scrolls Down */}
                <div ref={rightColumnRef} className={styles.column}>
                  <div data-collection className={styles.imageCollection}>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-3.jpg" alt="Athletic training" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image src="/assets/expertise-6.jpg" alt="Physiotherapy" fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
