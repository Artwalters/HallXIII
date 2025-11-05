'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './OnboardingForm.module.css';

export default function OnboardingForm() {
  const [step] = useState(1);
  const totalSteps = 4;

  return (
    <div className={styles.container}>
      {/* Onboarding Steps */}
      <div className={styles.stepRow}>
        <div className={styles.stepLabel}>
          <p className={styles.stepText}>
            Stap {step}/{totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Title */}
      <div className={styles.titleRow}>
        <p className={styles.titleText}>
          Waarin herken jij jezelf?
        </p>
      </div>

      {/* Menu/Dropdown */}
      <div className={styles.menuRow}>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownImage}>
            <Image
              alt=""
              src="/assets/dropdown-vector.svg"
              width={233}
              height={59}
            />
          </div>
          <p className={styles.dropdownText}>
            Maak een keuze
          </p>
        </div>

        {/* Arrow Button */}
        <button className={styles.arrowButton}>
          <Image
            alt="Volgende"
            src="/assets/arrow-vector.svg"
            width={56}
            height={58}
          />
        </button>
      </div>

      {/* Subtitle */}
      <div className={styles.subtitleRow}>
        <p className={styles.subtitleText}>
          Check vrijblijvend of hall13 past bij jouw doelen
        </p>
      </div>
    </div>
  );
}
