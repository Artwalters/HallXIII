'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { servicesData, ServiceData } from '../data/servicesData';
import styles from './ServicesOnboardingPaper.module.css';

interface ServicesOnboardingPaperProps {
  onStart?: (serviceId: string) => void;
}

export default function ServicesOnboardingPaper({ onStart }: ServicesOnboardingPaperProps) {
  const [selectedService, setSelectedService] = useState<ServiceData>(servicesData[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceSelect = (service: ServiceData) => {
    setSelectedService(service);
    setIsDropdownOpen(false);
  };

  const handleStart = () => {
    if (onStart) {
      onStart(selectedService.id);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Pin at top */}
      <div className={styles.pin}>
        <Image
          src="/assets/buttons/XIII_button.png"
          alt=""
          width={112}
          height={112}
          className={styles.pinImage}
        />
      </div>

      <div className={styles.container}>
        {/* Header Section - Fixed */}
        <div className={styles.header}>
          <h2 className={styles.title}>Kies je traject</h2>

          {/* Dropdown */}
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              className={`${styles.dropdownButton} ${isDropdownOpen ? styles.dropdownButtonOpen : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* Border layer - white, shows on hover */}
              <div className={styles.dropdownButtonBorder}>
                <svg className={styles.dropdownButtonBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                  <rect x="2" y="4" width="96" height="94" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
                  <rect x="102" y="2" width="96" height="96" rx="10" stroke="currentColor" strokeWidth="3" fill="none" />
                  <rect x="202" y="3" width="96" height="95" rx="9" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
              {/* Background layer - dark */}
              <div className={styles.dropdownButtonBack}>
                <svg className={styles.dropdownButtonBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="currentColor" preserveAspectRatio="none">
                  <rect x="2" y="4" width="96" height="94" rx="8" />
                  <rect x="102" y="2" width="96" height="96" rx="10" />
                  <rect x="202" y="3" width="96" height="95" rx="9" />
                </svg>
              </div>
              {/* Text */}
              <span className={styles.dropdownButtonText}>{selectedService.category}</span>
              {/* Chevron */}
              <div className={`${styles.dropdownChevron} ${isDropdownOpen ? styles.dropdownChevronOpen : ''}`}>
                <div className={styles.dropdownChevronSprite}>
                  <Image src="/assets/stopmotion_icons/down1.svg" alt="" width={24} height={24} className={styles.dropdownChevronImg} />
                  <Image src="/assets/stopmotion_icons/down2.svg" alt="" width={24} height={24} className={styles.dropdownChevronImg} />
                  <Image src="/assets/stopmotion_icons/down3.svg" alt="" width={24} height={24} className={styles.dropdownChevronImg} />
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {servicesData.map((service) => (
                  <button
                    key={service.id}
                    className={`${styles.dropdownOption} ${service.id === selectedService.id ? styles.dropdownOptionSelected : ''}`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    {service.category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className={styles.scrollableContent}>
          {/* Category Tag */}
          <div className={styles.categoryTag}>
            <div className={styles.categoryCircle}>
              <div className={styles.categoryCircleSprite}>
                <svg className={styles.categoryCircleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="48" />
                </svg>
                <svg className={styles.categoryCircleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="52" cy="48" r="47" />
                </svg>
                <svg className={styles.categoryCircleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="49" cy="51" r="49" />
                </svg>
              </div>
            </div>
            <span className={styles.categoryText}>{selectedService.category}</span>
          </div>

          {/* Service Title */}
          <h3 className={styles.serviceTitle}>{selectedService.title}</h3>

          {/* Description */}
          <p className={styles.description}>{selectedService.description}</p>

          {/* Benefits */}
          <div className={styles.benefits}>
            <h4 className={styles.benefitsTitle}>Wat krijg je:</h4>
            <ul className={styles.benefitsList}>
              {selectedService.benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitItem}>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section - Fixed at bottom */}
        <div className={styles.ctaWrapper}>
          <button className={styles.startButton} onClick={handleStart}>
            {/* Border layer - white, shows on hover */}
            <div className={styles.startButtonBorder}>
              <svg className={styles.startButtonBorderSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                <rect x="2" y="4" width="96" height="94" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
                <rect x="102" y="2" width="96" height="96" rx="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <rect x="202" y="3" width="96" height="95" rx="9" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </div>
            {/* Background layer - black */}
            <div className={styles.startButtonBack}>
              <svg className={styles.startButtonBackSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="currentColor" preserveAspectRatio="none">
                <rect x="2" y="4" width="96" height="94" rx="8" />
                <rect x="102" y="2" width="96" height="96" rx="10" />
                <rect x="202" y="3" width="96" height="95" rx="9" />
              </svg>
            </div>
            {/* Text */}
            <span className={styles.startButtonText}>Start nu</span>
          </button>
        </div>

        {/* Texture Overlay */}
        <div className={styles.overlay}>
          <Image
            src="/assets/overlays/overlay.jpg"
            alt=""
            fill
            className={styles.overlayImage}
          />
        </div>
      </div>
    </div>
  );
}
