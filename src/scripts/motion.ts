import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSmoothScroll } from './lenis';
import {
  createIntroSequence,
  createLineDraws,
  createParallax,
  createScrollReveals,
  createScrollScenes,
  createStaggers,
} from './motion-primitives';

type Cleanup = () => void;

const noop = () => {};

function createAnimations(): Cleanup {
  const smoothScroll = createSmoothScroll();
  let playIntro: (() => void) | undefined;

  const context = gsap.context(() => {
    const introSequence = createIntroSequence();
    playIntro = () => introSequence?.play();

    createScrollReveals();
    createStaggers();
    createLineDraws();
    createParallax();
    createScrollScenes();
  });

  const refresh = () => ScrollTrigger.refresh();
  const handleIntroComplete = () => {
    playIntro?.();
    refresh();
  };

  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('ket:page-intro-complete', handleIntroComplete, { once: true });

  if (!document.documentElement.classList.contains('page-intro-pending')) {
    playIntro?.();
  }

  const refreshFrame = window.requestAnimationFrame(refresh);

  return () => {
    window.removeEventListener('load', refresh);
    window.removeEventListener('ket:page-intro-complete', handleIntroComplete);
    window.cancelAnimationFrame(refreshFrame);
    context.revert();
    smoothScroll?.destroy();
  };
}

export function initMotion(): Cleanup {
  if (typeof window === 'undefined') return noop;

  gsap.registerPlugin(ScrollTrigger);

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let disposeAnimations: Cleanup = noop;

  const applyPreference = () => {
    disposeAnimations();
    disposeAnimations = noop;
    document.documentElement.classList.remove('motion-ready');

    if (motionPreference.matches) {
      document.documentElement.dataset.motion = 'reduced';
      return;
    }

    document.documentElement.dataset.motion = 'full';
    document.documentElement.classList.add('motion-ready');
    disposeAnimations = createAnimations();
  };

  applyPreference();
  motionPreference.addEventListener('change', applyPreference);

  return () => {
    motionPreference.removeEventListener('change', applyPreference);
    disposeAnimations();
    document.documentElement.classList.remove('motion-ready');
    delete document.documentElement.dataset.motion;
  };
}
