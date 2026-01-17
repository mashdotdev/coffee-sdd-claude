/**
 * Brand Constants
 * Premium Coffee Brand Design System
 * Per Constitution v1.0.0 - Principle III: Luxury Brand Standards
 */

export const BRAND_COLORS = {
  // Primary palette
  espressoBlack: '#0E0E0E',
  roastedBrown: '#4A2C1D',
  creamLatte: '#F5EFE6',
  burntGold: '#C89B3C',
  deepOxideRed: '#8B2F2F',
} as const;

export const TYPOGRAPHY = {
  // Font families
  heading: 'var(--font-playfair)',
  body: 'var(--font-inter)',

  // Font scale (editorial style)
  scale: {
    h1: 'text-6xl md:text-7xl lg:text-8xl',
    h2: 'text-4xl md:text-5xl lg:text-6xl',
    h3: 'text-3xl md:text-4xl lg:text-5xl',
    h4: 'text-2xl md:text-3xl lg:text-4xl',
    body: 'text-base md:text-lg',
    small: 'text-sm md:text-base',
  },
} as const;

export const GRID = {
  maxWidth: '1280px',
  columns: 12,
} as const;

export const ANIMATION_CONFIG = {
  // Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
  duration: {
    slow: 1.2,
    medium: 0.8,
    fast: 0.4,
  },
  ease: {
    primary: 'power2.out',
    smooth: 'power1.inOut',
    confident: 'power3.out',
  },
} as const;
