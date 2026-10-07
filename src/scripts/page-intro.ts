type Cleanup = () => void;

const noop = () => {};

export function initPageIntro(): Cleanup {
  if (typeof window === 'undefined') return noop;

  const root = document.documentElement;
  const curtain = document.querySelector<HTMLElement>('[data-page-intro]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let completed = false;
  let safetyTimer = 0;

  const finish = () => {
    if (completed) return;

    completed = true;
    window.clearTimeout(safetyTimer);
    root.classList.remove('page-intro-active', 'page-intro-pending');
    curtain?.remove();
    window.dispatchEvent(new CustomEvent('ket:page-intro-complete'));
  };

  if (!curtain || reduceMotion) {
    finish();
    return noop;
  }

  root.classList.add('page-intro-active');
  safetyTimer = window.setTimeout(finish, 1800);

  let animation: Animation | undefined;
  let cancelled = false;
  let secondFrame = 0;

  const firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(() => {
      if (cancelled) return;

      try {
        animation = curtain.animate(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100%)' },
          ],
          {
            delay: 260,
            duration: 980,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
          },
        );

        animation.finished.then(finish).catch(() => finish());
      } catch {
        finish();
      }
    });
  });

  return () => {
    cancelled = true;
    completed = true;
    window.clearTimeout(safetyTimer);
    window.cancelAnimationFrame(firstFrame);
    if (secondFrame) window.cancelAnimationFrame(secondFrame);

    animation?.cancel();
    root.classList.remove('page-intro-active', 'page-intro-pending');
  };
}
