interface NavigationLink {
  type: 'link';
  label: string;
  href: string;
}

interface NavigationGroup {
  type: 'group';
  label: string;
  key: string;
  children: readonly NavigationLink[];
}

interface NavigationCta {
  type: 'cta';
  label: string;
  href: string;
}

export type NavigationItem = NavigationLink | NavigationGroup | NavigationCta;

export const navigationItems = [
  {
    type: 'group',
    label: 'Journeys',
    key: 'journeys',
    children: [
      { type: 'link', label: 'Tours', href: '/tour/' },
      { type: 'link', label: 'Treks', href: '/trek/' },
    ],
  },
  {
    type: 'group',
    label: 'Programs',
    key: 'programs',
    children: [
      { type: 'link', label: 'Stay / Airbnb', href: '/airbnb/' },
      { type: 'link', label: 'Volunteering', href: '/volunteering/' },
      { type: 'link', label: 'Ticketing', href: '/ticketing/' },
    ],
  },
  { type: 'link', label: 'About', href: '/about/' },
  { type: 'link', label: 'Travel Info', href: '/travel-info/' },
  { type: 'cta', label: 'Enquire', href: '/contact/' },
] as const satisfies readonly NavigationItem[];
