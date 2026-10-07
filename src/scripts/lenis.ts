import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollController {
  destroy: () => void;
}

export function createSmoothScroll(): SmoothScrollController | null {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const lenis = new Lenis({
    anchors: true,
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
  });

  const updateLenis = (time: number) => lenis.raf(time * 1000);
  const unsubscribeScroll = lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(updateLenis);

  return {
    destroy() {
      gsap.ticker.remove(updateLenis);
      unsubscribeScroll();
      lenis.destroy();
    },
  };
}
