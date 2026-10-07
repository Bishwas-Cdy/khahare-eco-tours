import { gsap } from 'gsap';

const timing = {
  standard: 0.8,
  cinematic: 1.05,
  stagger: 0.075,
  scrub: 0.75,
} as const;

const easing = {
  reveal: 'power3.out',
  cinematic: 'power4.out',
} as const;

const trigger = {
  start: 'top 86%',
  once: true,
} as const;

type RevealType = 'clip' | 'fade' | 'mask' | 'scale' | 'slide-left' | 'slide-right';

const revealTypes = new Set<RevealType>([
  'clip',
  'fade',
  'mask',
  'scale',
  'slide-left',
  'slide-right',
]);

function getRevealType(element: HTMLElement): RevealType {
  const value = element.dataset.reveal as RevealType | undefined;
  return value && revealTypes.has(value) ? value : 'fade';
}

function addReveal(
  timeline: gsap.core.Timeline,
  element: HTMLElement,
  position: number | string = 0,
) {
  if (element.hasAttribute('data-line-draw')) {
    timeline.from(
      element,
      {
        duration: timing.cinematic,
        ease: easing.cinematic,
        scaleX: 0,
        transformOrigin: 'left center',
      },
      position,
    );
    return;
  }

  const revealType = getRevealType(element);

  if (revealType === 'mask') {
    const inner = element.querySelector<HTMLElement>('[data-reveal-inner]');
    if (!inner) return;

    timeline.from(inner, { duration: timing.cinematic, ease: easing.cinematic, yPercent: 108 }, position);
    return;
  }

  if (revealType === 'clip') {
    const media = element.querySelector<HTMLElement>('[data-reveal-media]');

    timeline.from(
      element,
      {
        clipPath: 'inset(0 100% 0 0)',
        duration: timing.cinematic,
        ease: easing.cinematic,
      },
      position,
    );

    if (media) {
      timeline.from(
        media,
        { duration: timing.cinematic, ease: easing.cinematic, scale: 1.035 },
        position,
      );
    }
    return;
  }

  const variants: Record<Exclude<RevealType, 'clip' | 'mask'>, gsap.TweenVars> = {
    fade: { opacity: 0 },
    scale: { opacity: 0, scale: 1.025 },
    'slide-left': { opacity: 0, x: 24 },
    'slide-right': { opacity: 0, x: -24 },
  };

  timeline.from(
    element,
    {
      ...variants[revealType],
      duration: timing.standard,
      ease: easing.reveal,
    },
    position,
  );
}

export function createIntroSequence(): gsap.core.Timeline | null {
  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal-on="intro"]');
  if (!elements.length) return null;

  const timeline = gsap.timeline({ paused: true });

  elements.forEach((element, index) => {
    addReveal(timeline, element, index * 0.08);
  });

  return timeline;
}

export function createScrollReveals() {
  gsap.utils
    .toArray<HTMLElement>('[data-reveal]:not([data-reveal-on="intro"])')
    .forEach((element) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          ...trigger,
        },
      });

      addReveal(timeline, element);
    });
}

export function createStaggers() {
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
    if (!items.length) return;

    gsap.from(items, {
      duration: timing.standard,
      ease: easing.reveal,
      opacity: 0,
      scrollTrigger: {
        trigger: group,
        ...trigger,
      },
      stagger: timing.stagger,
      y: 12,
    });
  });
}

export function createLineDraws() {
  gsap.utils
    .toArray<HTMLElement>('[data-line-draw]:not([data-reveal-on="intro"])')
    .forEach((element) => {
      gsap.from(element, {
        duration: timing.cinematic,
        ease: easing.cinematic,
        scaleX: 0,
        scrollTrigger: {
          trigger: element,
          ...trigger,
        },
        transformOrigin: 'left center',
      });
    });
}

export function createParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
    gsap.fromTo(
      element,
      { yPercent: -4 },
      {
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement ?? element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: timing.scrub,
        },
        yPercent: 4,
      },
    );
  });
}

export function createScrollScenes() {
  gsap.utils.toArray<HTMLElement>('[data-scroll-scene]').forEach((scene) => {
    const movingElement = scene.querySelector<HTMLElement>('[data-scene-shift]');
    if (!movingElement) return;

    gsap.fromTo(
      movingElement,
      { rotate: -1, xPercent: -8 },
      {
        ease: 'none',
        rotate: 1,
        scrollTrigger: {
          trigger: scene,
          start: 'top bottom',
          end: 'bottom top',
          scrub: timing.scrub,
        },
        xPercent: 8,
      },
    );
  });
}
