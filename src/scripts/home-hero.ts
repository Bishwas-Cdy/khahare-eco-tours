import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Cleanup = () => void;

const noop = () => {};

export function initHomeHero(): Cleanup {
  if (typeof window === 'undefined') return noop;

  const hero = document.querySelector<HTMLElement>('[data-home-hero]');
  if (!hero) return noop;

  gsap.registerPlugin(ScrollTrigger);

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  let introHasCompleted = !root.classList.contains('page-intro-pending');
  let animationContext: gsap.Context | undefined;
  let entranceTimeline: gsap.core.Timeline | undefined;

  const createAnimations = () => {
    animationContext?.revert();
    entranceTimeline = undefined;

    if (motionPreference.matches) return;

    animationContext = gsap.context(() => {
      const media = hero.querySelector<HTMLElement>('[data-hero-media]');
      const mediaFrame = hero.querySelector<HTMLElement>('[data-hero-media-frame]');
      const titleLines = hero.querySelectorAll<HTMLElement>('[data-hero-title-line]');
      const firstTitleLines = hero.querySelectorAll<HTMLElement>('[data-hero-title-line="first"]');
      const secondTitleLines = hero.querySelectorAll<HTMLElement>('[data-hero-title-line="second"]');
      const support = hero.querySelectorAll<HTMLElement>('[data-hero-support]');
      const scrollCue = hero.querySelector<HTMLElement>('[data-hero-scroll]');
      const header = document.querySelector<HTMLElement>('[data-site-header]');

      gsap.set(media, { scale: 1.045 });
      gsap.set(titleLines, { yPercent: 110 });
      gsap.set(support, { autoAlpha: 0, y: 14 });
      gsap.set(scrollCue, { autoAlpha: 0 });
      gsap.set(header, { autoAlpha: 0, y: -10 });

      entranceTimeline = gsap
        .timeline({ paused: true, defaults: { ease: 'power4.out' } })
        .to(media, { duration: 1.45, scale: 1 }, 0)
        .to(firstTitleLines, { duration: 1.05, yPercent: 0 }, 0.2)
        .to(secondTitleLines, { duration: 1.05, yPercent: 0 }, 0.32)
        .to(header, { autoAlpha: 1, duration: 0.8, y: 0 }, 0.42)
        .to(support, { autoAlpha: 1, duration: 0.85, stagger: 0.09, y: 0 }, 0.62)
        .to(scrollCue, { autoAlpha: 1, duration: 0.7 }, 1.08);

      if (introHasCompleted) entranceTimeline.play();

      gsap.to(mediaFrame, {
        ease: 'none',
        yPercent: 2.5,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to(scrollCue, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '18% top',
          scrub: true,
        },
      });
    }, hero);
  };

  const handleIntroComplete = () => {
    introHasCompleted = true;
    entranceTimeline?.play();
  };

  const handlePreferenceChange = () => createAnimations();

  window.addEventListener('ket:page-intro-complete', handleIntroComplete);
  motionPreference.addEventListener('change', handlePreferenceChange);
  createAnimations();

  if (!root.classList.contains('page-intro-pending')) {
    handleIntroComplete();
  }

  return () => {
    window.removeEventListener('ket:page-intro-complete', handleIntroComplete);
    motionPreference.removeEventListener('change', handlePreferenceChange);
    animationContext?.revert();
  };
}
