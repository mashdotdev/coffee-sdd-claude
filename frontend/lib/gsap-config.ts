/**
 * GSAP Configuration
 * Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
 *
 * Registers GSAP plugins and sets global defaults
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG } from './constants';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Set global defaults for premium, confident animations
  gsap.defaults({
    duration: ANIMATION_CONFIG.duration.medium,
    ease: ANIMATION_CONFIG.ease.primary,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === 'development',
  });
}

export { gsap, ScrollTrigger };
