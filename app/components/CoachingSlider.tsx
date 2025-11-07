'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import styles from './CoachingSlider.module.css';

gsap.registerPlugin(Draggable);

const slides = [
  {
    image: '/assets/gym-1.png',
    name: 'Maarten',
    lastName: 'Kreutz',
    role: 'fysioterapeut',
  },
  {
    image: '/assets/gym-2.png',
    name: 'Merel',
    lastName: 'Fernengel',
    role: 'coach',
  },
  {
    image: '/assets/gym-3.png',
    name: 'Rim',
    lastName: 'Pinckers',
    role: 'coach',
  },
  {
    image: '/assets/expertise-1.jpg',
    name: 'Noah',
    lastName: 'Sipsma',
    role: 'coach',
  },
  {
    image: '/assets/expertise-2.jpg',
    name: 'Dylan',
    lastName: 'Strik',
    role: 'coach',
  },
];

export default function CoachingSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stepElementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const slideElements = gsap.utils.toArray<HTMLElement>('[data-slider="slide"]');
    const nextButton = document.querySelector('[data-slider-button="next"]');
    const prevButton = document.querySelector('[data-slider-button="prev"]');
    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = stepElementRef.current;
    const stepsParent = stepElement?.parentElement;

    let activeElement: HTMLElement | null = null;
    const totalSlides = slideElements.length;

    // Set total
    if (totalElement) totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides.toString();

    // Create step clones
    if (stepsParent && stepElement) {
      stepsParent.innerHTML = '';
      slideElements.forEach((_, index) => {
        const stepClone = stepElement.cloneNode(true) as HTMLElement;
        stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : (index + 1).toString();
        stepsParent.appendChild(stepClone);
      });
    }
    const allSteps = stepsParent ? stepsParent.querySelectorAll('[data-slide-count="step"]') : [];

    // Responsive check
    const mq = window.matchMedia('(min-width: 992px)');
    let useNextForActive = mq.matches;
    mq.addEventListener('change', (e) => {
      useNextForActive = e.matches;
      if (currentEl) {
        applyActive(currentEl, currentIndex, false);
      }
    });

    let currentEl: HTMLElement | null = null;
    let currentIndex = 0;

    function resolveActive(el: HTMLElement) {
      return useNextForActive ? (el.nextElementSibling as HTMLElement || slideElements[0]) : el;
    }

    function applyActive(el: HTMLElement, index: number, animateNumbers = true) {
      if (activeElement) activeElement.classList.remove(styles.active);
      const target = resolveActive(el);
      target.classList.add(styles.active);
      activeElement = target;

      if (allSteps.length) {
        if (animateNumbers) {
          gsap.to(allSteps, { y: `${-100 * index}%`, ease: 'power3', duration: 0.45 });
        } else {
          gsap.set(allSteps, { y: `${-100 * index}%` });
        }
      }
    }

    const loop = horizontalLoop(slideElements, {
      paused: true,
      draggable: true,
      center: false,
      onChange: (element: HTMLElement, index: number) => {
        currentEl = element;
        currentIndex = index;
        applyActive(element, index, true);
      },
    });

    timelineRef.current = loop;

    function mapClickIndex(i: number) {
      return useNextForActive ? i - 1 : i;
    }

    slideElements.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (slide.classList.contains(styles.active)) return;
        loop.toIndex(mapClickIndex(i), { ease: 'power3', duration: 0.725 });
      });
    });

    nextButton?.addEventListener('click', () => loop.next({ ease: 'power3', duration: 0.725 }));
    prevButton?.addEventListener('click', () => loop.previous({ ease: 'power3', duration: 0.725 }));

    if (!currentEl && slideElements[0]) {
      currentEl = slideElements[0];
      currentIndex = 0;
      applyActive(currentEl, currentIndex, false);
    }

    return () => {
      loop?.kill?.();
    };
  }, []);

  function horizontalLoop(items: HTMLElement[], config: any) {
    let timeline: any;
    config = config || {};

    const ctx = gsap.context(() => {
      const onChange = config.onChange;
      let lastIndex = 0;
      const tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            const i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: 'none' },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      });

      const length = items.length;
      const startX = items[0].offsetLeft;
      const times: number[] = [];
      const widths: number[] = [];
      const spaceBefore: number[] = [];
      const xPercents: number[] = [];
      let curIndex = 0;
      let indexIsDirty = false;
      const center = config.center;
      const pixelsPerSecond = (config.speed || 1) * 100;
      const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);
      let timeOffset = 0;
      const container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode;
      let totalWidth: number;

      const getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
        (parseFloat(config.paddingRight) || 0);

      const populateWidths = () => {
        let b1 = (container as HTMLElement).getBoundingClientRect();
        let b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string);
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / widths[i]) * 100 +
              parseFloat(gsap.getProperty(el, 'xPercent') as string)
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: (i) => xPercents[i],
        });
        totalWidth = getTotalWidth();
      };

      let timeWrap: (t: number) => number;

      const populateOffsets = () => {
        timeOffset = center ? (tl.duration() * ((container as HTMLElement).offsetWidth / 2)) / totalWidth : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels['label' + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset
            );
          });
      };

      const getClosest = (values: number[], value: number, wrap: number) => {
        let i = values.length;
        let closest = 1e10;
        let index = 0;
        let d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      };

      const populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
          tl.to(
            item,
            { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond },
            0
          )
            .fromTo(
              item,
              { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
              {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add('label' + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      };

      const refresh = (deep?: boolean) => {
        const progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && (tl as any).draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      };

      const onResize = () => refresh(true);
      let proxy: HTMLDivElement;

      gsap.set(items, { x: 0 });
      populateWidths();
      populateTimeline();
      populateOffsets();
      window.addEventListener('resize', onResize);

      function toIndex(index: number, vars?: any) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
        const newIndex = gsap.utils.wrap(0, length, index);
        let time = times[newIndex];
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        if (time < 0 || time > tl.duration()) {
          vars.modifiers = { time: timeWrap };
        }
        curIndex = newIndex;
        vars.overwrite = true;
        gsap.killTweensOf(proxy);
        return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
      }

      tl.toIndex = (index: number, vars?: any) => toIndex(index, vars);
      tl.closestIndex = (setCurrent?: boolean) => {
        const index = getClosest(times, tl.time(), tl.duration());
        if (setCurrent) {
          curIndex = index;
          indexIsDirty = false;
        }
        return index;
      };
      tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
      tl.next = (vars?: any) => toIndex(tl.current() + 1, vars);
      tl.previous = (vars?: any) => toIndex(tl.current() - 1, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true);

      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }

      if (config.draggable && typeof Draggable === 'function') {
        proxy = document.createElement('div');
        const wrap = gsap.utils.wrap(0, 1);
        let ratio: number,
          startProgress: number,
          draggable: any,
          lastSnap: number,
          initChangeX: number,
          wasPlaying: boolean;
        const align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio));
        const syncIndex = () => tl.closestIndex(true);

        draggable = Draggable.create(proxy, {
          trigger: items[0].parentNode,
          type: 'x',
          onPressInit() {
            const x = this.x;
            gsap.killTweensOf(tl);
            wasPlaying = !tl.paused();
            tl.pause();
            startProgress = tl.progress();
            refresh();
            ratio = 1 / totalWidth;
            initChangeX = startProgress / -ratio - x;
            gsap.set(proxy, { x: startProgress / -ratio });
          },
          onDrag: align,
          onThrowUpdate: align,
          overshootTolerance: 0,
          inertia: true,
          snap(value: number) {
            if (Math.abs(startProgress / -ratio - this.x) < 10) {
              return lastSnap + initChangeX;
            }
            const time = -(value * ratio) * tl.duration();
            const wrappedTime = timeWrap(time);
            const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
            let dif = snapTime - wrappedTime;
            Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
            lastSnap = (time + dif) / tl.duration() / -ratio;
            return lastSnap;
          },
          onRelease() {
            syncIndex();
            draggable.isThrowing && (indexIsDirty = true);
          },
          onThrowComplete: () => {
            syncIndex();
            wasPlaying && tl.play();
          },
        })[0];
        (tl as any).draggable = draggable;
      }

      tl.closestIndex(true);
      lastIndex = curIndex;
      onChange && onChange(items[curIndex], curIndex);
      timeline = tl;

      return () => window.removeEventListener('resize', onResize);
    });

    return timeline;
  }

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderOverlay}>
        <div className={styles.sliderOverlayInner}>
          <div className={styles.sliderOverlayCount}>
            <div className={styles.sliderCountCol}>
              <h2 ref={stepElementRef} data-slide-count="step" className={styles.sliderCountHeading}>
                01
              </h2>
            </div>
            <div className={styles.sliderCountDivider}></div>
            <div className={styles.sliderCountCol}>
              <h2 data-slide-count="total" className={styles.sliderCountHeading}>
                04
              </h2>
            </div>
          </div>
          <h2 className={styles.sliderTitle}>DE COACHES<br />VAN HALL13</h2>
          <div className={styles.sliderOverlayNav}>
            <button aria-label="previous slide" data-slider-button="prev" className={styles.sliderBtn}>
              <svg
                className={styles.sliderBtnCircle}
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                overflow="visible"
                viewBox="0 0 70 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M69.1436 22.2025C65.4076 8.98887 49.8314 2.14891 38.8715 0.578002C35.0487 0.0298209 22.5473 -1.762 12.4304 5.88799C-1.86464 16.6961 -3.89792 40.6729 6.68181 55.9647C13.3189 65.5619 26.5973 74.1528 39.6402 71.5183C50.3645 69.3501 57.3695 60.3133 59.5681 57.4824C63.3082 52.6551 65.0274 48.1592 66.0812 45.3447C68.3335 39.3106 71.5529 30.7075 69.1477 22.2025H69.1436Z"
                  fill="rgba(24, 24, 24, 0.2)"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 17 12"
                fill="none"
                className={styles.sliderBtnArrow}
              >
                <path
                  d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button aria-label="next slide" data-slider-button="next" className={styles.sliderBtn}>
              <svg
                className={styles.sliderBtnCircle}
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                overflow="visible"
                viewBox="0 0 70 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M69.1436 22.2025C65.4076 8.98887 49.8314 2.14891 38.8715 0.578002C35.0487 0.0298209 22.5473 -1.762 12.4304 5.88799C-1.86464 16.6961 -3.89792 40.6729 6.68181 55.9647C13.3189 65.5619 26.5973 74.1528 39.6402 71.5183C50.3645 69.3501 57.3695 60.3133 59.5681 57.4824C63.3082 52.6551 65.0274 48.1592 66.0812 45.3447C68.3335 39.3106 71.5529 30.7075 69.1477 22.2025H69.1436Z"
                  fill="rgba(24, 24, 24, 0.2)"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 17 12"
                fill="none"
                className={`${styles.sliderBtnArrow} ${styles.next}`}
              >
                <path
                  d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.sliderMain}>
        <div className={styles.sliderWrap}>
          <div ref={wrapperRef} data-slider="list" className={styles.sliderList}>
            {slides.map((slide, index) => (
              <div key={index} data-slider="slide" className={styles.sliderSlide}>
                <div className={styles.sliderSlideInner}>
                  <Image src={slide.image} alt={`${slide.name} ${slide.lastName}`} fill className={styles.slideImg} />
                  <div className={styles.slideGradient}></div>
                  <div className={styles.slideContent}>
                    {/* Logo bovenin */}
                    <div className={styles.slideLogo}>
                      <div className={styles.slideLogoPart1}>
                        <Image
                          src="/assets/logo-part1.svg"
                          alt="Hall 13"
                          fill
                        />
                      </div>
                      <div className={styles.slideLogoPart2}>
                        <Image
                          src="/assets/logo-part2.svg"
                          alt="Hall 13"
                          fill
                        />
                      </div>
                    </div>

                    {/* Naam en rol onderaan */}
                    <div className={styles.slideBottom}>
                      <div className={styles.slideName}>
                        <p className={styles.slideNameFirst}>{slide.name}</p>
                        <p className={styles.slideNameLast}>{slide.lastName}</p>
                      </div>

                      <a href="#" className={styles.btnStopMotion}>
                        <div className={styles.btnStopMotionInner}>
                          <div className={styles.btnStopMotionBack}>
                            <svg className={styles.btnStopMotionBackSvg} xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 678 82" fill="none" preserveAspectRatio="none">
                              <path d="M460.308 7.5301L460.216 7.59846L460.136 7.68002C457.225 10.6259 456.112 14.1147 455.704 17.5301C455.426 19.853 455.471 22.2897 455.511 24.487C455.528 25.4194 455.544 26.3088 455.534 27.128L455.534 27.1281C455.485 31.453 455.744 35.7647 456.055 40.0304C456.123 40.9669 456.194 41.9001 456.264 42.8308C456.515 46.1574 456.764 49.452 456.895 52.7505L456.895 52.7508C456.908 53.0821 456.921 53.4306 456.934 53.7944C457.069 57.4373 457.259 62.604 458.379 67.1206C459.587 71.9918 462.087 76.9016 467.56 77.582C473.567 78.3305 479.645 78.2561 485.652 77.9982C487.517 77.9182 489.368 77.821 491.208 77.7243C495.339 77.5074 499.416 77.2933 503.477 77.282C509.676 77.2646 515.244 77.2472 520.758 77.2299C527.284 77.2095 533.736 77.1893 541.07 77.1696H541.07C554.586 77.1316 568.103 77.3437 581.637 77.5561L581.644 77.5562C595.171 77.7685 608.714 77.981 622.259 77.9429L656.359 77.8495H656.359C661.063 77.8359 665.017 76.6431 667.846 73.7831C670.658 70.9404 672.118 66.6909 672.376 61.0789C672.376 61.0754 672.376 61.072 672.377 61.0685L674.492 25.4333L674.494 25.398L674.495 25.3626C674.533 22.1986 674.382 18.4111 673.479 14.9927C672.579 11.5846 670.865 8.30716 667.596 6.52469C664.981 5.09728 662.088 4.78229 659.564 4.54711C644.655 3.15323 629.771 3.58486 614.955 4.01454C607.786 4.22244 600.633 4.42988 593.5 4.42988H593.489L593.477 4.43005C574.96 4.7118 563.056 4.62436 546.859 4.50539C543.481 4.48058 539.916 4.4544 536.066 4.42991L536.056 4.42985L536.047 4.42991L481.337 4.78111L481.327 4.78117L481.317 4.78137C480.654 4.79452 479.792 4.79159 478.8 4.78821C476.592 4.7807 473.737 4.77099 470.984 4.93131C468.963 5.04904 466.912 5.26041 465.089 5.64402C463.297 6.02083 461.568 6.59424 460.308 7.5301Z" fill="currentColor" vectorEffect="non-scaling-stroke"/>
                              <path d="M234.308 7.53029L234.216 7.59866L234.136 7.68022C231.211 10.6399 230.192 14.1108 229.879 17.4972C229.724 19.1774 229.74 20.8572 229.787 22.4481C229.799 22.8857 229.814 23.3132 229.829 23.7322C229.868 24.8662 229.906 25.9383 229.894 26.9826L229.894 26.9828C229.875 28.6315 229.85 30.2894 229.826 31.9535C229.725 38.8516 229.622 45.8555 229.895 52.7507L229.895 52.751C229.942 53.9419 229.932 55.2806 229.922 56.7443C229.916 57.5192 229.91 58.3292 229.912 59.1708C229.919 61.5488 229.992 64.1036 230.352 66.4843C230.71 68.8491 231.369 71.1777 232.64 73.0207C233.953 74.9248 235.881 76.2492 238.56 76.5822C250.422 78.0603 265.656 78.3151 277.477 78.2822C283.676 78.2648 289.244 78.2474 294.758 78.2301C301.285 78.2097 307.736 78.1895 315.07 78.1698H315.07C328.58 78.1318 342.101 78.0942 355.62 78.0566C369.17 78.0189 382.72 77.9812 396.259 77.9431L430.359 77.8497H430.359C435.025 77.8362 439.302 76.7751 442.498 74.1015C445.729 71.3985 447.627 67.2382 447.889 61.514L447.891 61.4715L447.891 61.429L447.495 25.3457C447.498 25.1251 447.501 24.9008 447.504 24.6732C447.543 21.7376 447.591 18.2486 447.003 15.101C446.368 11.6948 444.927 8.34146 441.596 6.52488C438.981 5.09747 436.088 4.78249 433.564 4.54731C422.446 3.50779 411.337 3.65454 400.286 4.05631C397.163 4.16986 394.049 4.30351 390.94 4.43693C383.019 4.77686 375.136 5.1152 367.24 5.1152H367.228L367.217 5.11538C353.805 5.31944 344.001 5.08464 333.483 4.83273C326.434 4.66389 319.063 4.48737 310.07 4.43013C310.069 4.43012 310.067 4.43011 310.066 4.4301L255.365 3.78138L255.341 3.78109L255.317 3.78156C253.037 3.82678 248.938 3.9493 244.891 4.43987C242.868 4.68508 240.826 5.0259 239.013 5.50582C237.23 5.978 235.536 6.61818 234.308 7.53029Z" fill="currentColor" vectorEffect="non-scaling-stroke"/>
                              <path d="M8.30825 7.53031L8.21621 7.59867L8.13562 7.68023C5.22501 10.6261 4.11162 14.1149 3.70376 17.5303C3.42636 19.8533 3.47076 22.2899 3.51079 24.4872C3.52778 25.4196 3.54399 26.309 3.53448 27.1282L3.53448 27.1283C3.43625 35.6709 3.55681 44.217 3.89466 52.7508L3.89467 52.751C3.94197 53.9397 3.93235 55.3029 3.92174 56.8084C3.91609 57.6093 3.91016 58.4504 3.91236 59.327C3.91857 61.7984 3.99176 64.4732 4.35013 66.9728C4.70591 69.4543 5.36005 71.899 6.61737 73.8311C7.91554 75.826 9.84384 77.2446 12.5596 77.5822C21.6839 78.7191 32.8409 78.5422 42.824 78.3839C45.8454 78.336 48.7592 78.2898 51.4767 78.2822C57.6756 78.2648 63.2436 78.2474 68.7584 78.2301C75.2845 78.2097 81.736 78.1895 89.07 78.1698H89.0702C102.58 78.1318 116.101 78.0942 129.62 78.0566C143.17 78.0189 156.719 77.9812 170.259 77.9432L204.359 77.8497H204.359C209.025 77.8362 213.088 76.774 216.05 74.0563C219.022 71.3282 220.631 67.1677 220.889 61.514L220.889 61.512L222.493 25.4112L222.494 25.387L222.495 25.3628C222.533 22.1989 222.382 18.4113 221.479 14.993C220.579 11.5848 218.865 8.30736 215.596 6.5249C212.981 5.09749 210.088 4.7825 207.564 4.54732C192.196 3.11047 176.75 3.46107 161.408 3.80934C154.66 3.9625 147.932 4.11522 141.24 4.11522H141.228L141.217 4.11539C118.825 4.4561 106.355 4.57189 84.0659 4.43012L84.0563 4.43005L84.0468 4.43012L29.3374 4.78131L29.3273 4.78138L29.3173 4.78158C28.6541 4.79473 27.7923 4.7918 26.7999 4.78842C24.5917 4.78091 21.7368 4.7712 18.984 4.93152C16.9626 5.04925 14.9124 5.26062 13.0886 5.64423C11.2971 6.02104 9.56824 6.59445 8.30825 7.53031Z" fill="currentColor" vectorEffect="non-scaling-stroke"/>
                            </svg>
                          </div>
                          <div className={styles.btnStopMotionIcon}>
                            <div className={styles.before100}></div>
                            <svg className={styles.btnStopMotionIconSvg} xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 40" fill="none">
                              <path d="M138.72 35.662C138.72 35.662 138.68 35.6604 138.655 35.6594C138.413 35.6171 138.235 35.3986 138.245 35.1472L138.785 21.8544L134.175 23.5194C134.001 23.5854 133.8 23.5448 133.659 23.4091C133.526 23.2818 133.469 23.0845 133.525 22.9L139.544 3.36319C139.619 3.12252 139.852 2.97764 140.103 3.02029C140.345 3.06262 140.523 3.28105 140.512 3.53247L139.973 16.8253L144.583 15.1603C144.765 15.0945 144.958 15.1349 145.099 15.2706C145.232 15.3978 145.289 15.5951 145.233 15.7797L139.214 35.3165C139.148 35.5332 138.939 35.679 138.72 35.6702L138.72 35.662Z" fill="currentColor"/>
                              <path d="M100.389 35.966C100.389 35.966 100.349 35.9661 100.324 35.9662C100.081 35.9347 99.8932 35.7244 99.8922 35.4728L101.032 21.3271L94.5498 23.5735C93.0942 22.946 94.1764 23.6156 94.0297 23.4863C93.8912 23.365 93.8255 23.1705 93.8735 22.9836L99.7771 3.66243C99.8411 3.41867 100.068 3.26356 100.32 3.29505C100.563 3.32657 100.751 3.53688 100.752 3.78851L99.0734 18.229L105.161 17.3027C105.339 17.2289 105.534 17.2606 105.681 17.3899C105.82 17.5112 105.885 17.7058 105.837 17.8926L100.867 35.5988C100.811 35.8182 100.609 35.9732 100.389 35.9741L100.389 35.966Z" fill="currentColor"/>
                              <path d="M58.6775 35.1145C58.6775 35.1145 58.637 35.111 58.6127 35.1089C58.3728 35.0557 58.2048 34.8295 58.2263 34.5788L61.1337 18.9977L54.6831 22.7794C54.5069 22.8376 54.3074 22.7879 54.1729 22.646C54.0457 22.5129 53.9977 22.3133 54.0622 22.1314L60.1736 4.78497C60.2591 4.54791 60.4989 4.41369 60.7469 4.46756C60.9868 4.52075 61.1549 4.74698 61.1333 4.99768L61.1337 15.5456L65.4578 14.8976C65.6421 14.84 65.8335 14.8891 65.968 15.0309C66.0952 15.1641 66.1432 15.3638 66.0787 15.5456L59.186 34.7915C59.1106 35.005 58.8952 35.1413 58.6768 35.1226L58.6775 35.1145Z" fill="currentColor"/>
                              <path d="M18.0738 34.3732C18.0738 34.3732 18.0277 34.3732 18 34.3732C17.7232 34.3404 17.511 34.1273 17.511 33.8732L19.5 20.8732L13.7841 24.301C15 24.301 13.3597 24.3419 13.1936 24.2108C13.0367 24.0879 12.9629 23.8912 13.0183 23.7027L21 3.37316C21.0738 3.12729 21.3322 2.97156 21.6182 3.00434C21.895 3.03713 22.1072 3.2502 22.1072 3.50426L21 17.8732L25.2159 15.4415C25.4189 15.3677 25.6404 15.4005 25.8065 15.5316C25.9633 15.6545 26.0371 15.8513 25.9817 16.0398L18.6182 34.0044C18.5536 34.2256 18.3229 34.3814 18.0738 34.3814V34.3732Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <p className={styles.btnStopMotionP}>{slide.role}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
