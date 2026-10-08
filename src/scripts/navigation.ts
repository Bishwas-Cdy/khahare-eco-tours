type Cleanup = () => void;
type HeaderTheme = 'dark' | 'light';

interface DropdownElements {
  item: HTMLElement;
  menu: HTMLElement;
  toggle: HTMLButtonElement;
}

const noop = () => {};

function setMenuAvailability(menu: HTMLElement, isAvailable: boolean) {
  menu.setAttribute('aria-hidden', String(!isAvailable));
  menu.toggleAttribute('inert', !isAvailable);
}

function initializeSubmenus(
  header: HTMLElement,
  desktopQuery: MediaQueryList,
  signal: AbortSignal,
) {
  const dropdowns = Array.from(header.querySelectorAll<HTMLElement>('[data-dropdown]'))
    .map((item): DropdownElements | null => {
      const toggle = item.querySelector<HTMLButtonElement>('[data-dropdown-toggle]');
      const menu = item.querySelector<HTMLElement>('[data-dropdown-menu]');
      return toggle && menu ? { item, menu, toggle } : null;
    })
    .filter((dropdown): dropdown is DropdownElements => dropdown !== null);

  const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  const closeDropdown = (dropdown: DropdownElements, restoreFocus = false) => {
    dropdown.item.classList.remove('submenu-is-open');
    dropdown.toggle.setAttribute('aria-expanded', 'false');
    setMenuAvailability(dropdown.menu, false);
    if (restoreFocus) dropdown.toggle.focus();
  };

  const closeAll = (except?: DropdownElements) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== except) closeDropdown(dropdown);
    });
  };

  const openDropdown = (dropdown: DropdownElements, focus: 'first' | 'last' | false = false) => {
    if (!desktopQuery.matches) return;

    closeAll(dropdown);
    dropdown.item.classList.add('submenu-is-open');
    dropdown.toggle.setAttribute('aria-expanded', 'true');
    setMenuAvailability(dropdown.menu, true);

    if (focus) {
      const links = dropdown.menu.querySelectorAll<HTMLElement>('a[href]');
      const target = focus === 'first' ? links[0] : links[links.length - 1];
      target?.focus();
    }
  };

  dropdowns.forEach((dropdown) => {
    setMenuAvailability(dropdown.menu, false);

    dropdown.toggle.addEventListener(
      'click',
      () => {
        const isOpen = dropdown.toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeDropdown(dropdown) : openDropdown(dropdown);
      },
      { signal },
    );

    dropdown.toggle.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          openDropdown(dropdown, event.key === 'ArrowDown' ? 'first' : 'last');
        } else if (event.key === 'Escape') {
          closeDropdown(dropdown);
        }
      },
      { signal },
    );

    dropdown.menu.addEventListener(
      'keydown',
      (event) => {
        const links = Array.from(dropdown.menu.querySelectorAll<HTMLElement>('a[href]'));
        const currentIndex = links.indexOf(document.activeElement as HTMLElement);
        let nextIndex: number | undefined;

        if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % links.length;
        if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + links.length) % links.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = links.length - 1;

        if (nextIndex !== undefined) {
          event.preventDefault();
          links[nextIndex]?.focus();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown(dropdown, true);
        }
      },
      { signal },
    );

    dropdown.item.addEventListener(
      'focusout',
      () => {
        window.requestAnimationFrame(() => {
          if (!dropdown.item.contains(document.activeElement)) closeDropdown(dropdown);
        });
      },
      { signal },
    );

    dropdown.item.addEventListener(
      'pointerenter',
      () => {
        if (hoverQuery.matches) openDropdown(dropdown);
      },
      { signal },
    );

    dropdown.item.addEventListener(
      'pointerleave',
      () => {
        if (hoverQuery.matches && !dropdown.item.contains(document.activeElement)) {
          closeDropdown(dropdown);
        }
      },
      { signal },
    );
  });

  document.addEventListener(
    'pointerdown',
    (event) => {
      const target = event.target as Node;
      if (!dropdowns.some((dropdown) => dropdown.item.contains(target))) closeAll();
    },
    { signal },
  );

  desktopQuery.addEventListener('change', () => closeAll(), { signal });
}

function initializeMobileMenu(
  header: HTMLElement,
  desktopQuery: MediaQueryList,
  signal: AbortSignal,
): Cleanup {
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = header.querySelector<HTMLElement>('[data-mobile-menu]');
  const closeButton = panel?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!toggle || !panel || !closeButton) return noop;

  let isOpen = false;

  const getFocusableElements = () =>
    Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    );

  const closeMenu = (restoreFocus = true) => {
    if (!isOpen) return;

    isOpen = false;
    header.classList.remove('menu-is-open');
    document.body.classList.remove('navigation-open');
    toggle.setAttribute('aria-expanded', 'false');
    setMenuAvailability(panel, false);
    if (restoreFocus) toggle.focus();
  };

  const openMenu = () => {
    if (isOpen || desktopQuery.matches) return;

    isOpen = true;
    header.classList.add('menu-is-open');
    document.body.classList.add('navigation-open');
    toggle.setAttribute('aria-expanded', 'true');
    setMenuAvailability(panel, true);
    window.requestAnimationFrame(() => panel.querySelector<HTMLElement>('a[href]')?.focus());
  };

  setMenuAvailability(panel, false);

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()), { signal });
  closeButton.addEventListener('click', () => closeMenu(), { signal });
  panel.addEventListener(
    'click',
    (event) => {
      if ((event.target as Element).closest('a[href]')) closeMenu(false);
    },
    { signal },
  );
  document.addEventListener(
    'keydown',
    (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    { signal },
  );
  desktopQuery.addEventListener('change', () => closeMenu(false), { signal });

  return () => closeMenu(false);
}

function initializeHeaderTheme(header: HTMLElement, signal: AbortSignal): Cleanup {
  const themeRegions = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme]'));
  if (!themeRegions.length) return noop;

  let observer: IntersectionObserver | undefined;
  let resizeFrame = 0;
  let updateFrame = 0;

  const updateTheme = () => {
    const probeY = header.getBoundingClientRect().height / 2;
    const activeRegion = themeRegions
      .filter((region) => {
        const bounds = region.getBoundingClientRect();
        return bounds.top <= probeY && bounds.bottom > probeY;
      })
      .at(-1);
    const requestedTheme = activeRegion?.dataset.headerTheme;
    const theme: HeaderTheme = requestedTheme === 'light' ? 'light' : 'dark';
    header.dataset.theme = theme;
  };

  const scheduleUpdate = () => {
    window.cancelAnimationFrame(updateFrame);
    updateFrame = window.requestAnimationFrame(updateTheme);
  };

  const createObserver = () => {
    observer?.disconnect();

    const probeY = Math.min(Math.round(header.getBoundingClientRect().height / 2), window.innerHeight - 1);
    const bottomMargin = Math.max(0, window.innerHeight - probeY - 2);

    observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: `-${probeY}px 0px -${bottomMargin}px 0px`,
      threshold: 0,
    });
    themeRegions.forEach((region) => observer?.observe(region));
    updateTheme();
  };

  window.addEventListener(
    'resize',
    () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(createObserver);
    },
    { passive: true, signal },
  );

  createObserver();

  return () => {
    observer?.disconnect();
    window.cancelAnimationFrame(resizeFrame);
    window.cancelAnimationFrame(updateFrame);
  };
}

export function initNavigation(): Cleanup {
  if (typeof window === 'undefined') return noop;

  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return noop;

  const controller = new AbortController();
  const desktopQuery = window.matchMedia('(min-width: 64rem)');
  const cleanupMobileMenu = initializeMobileMenu(header, desktopQuery, controller.signal);
  const cleanupTheme = initializeHeaderTheme(header, controller.signal);

  initializeSubmenus(header, desktopQuery, controller.signal);

  return () => {
    cleanupMobileMenu();
    cleanupTheme();
    controller.abort();
  };
}
