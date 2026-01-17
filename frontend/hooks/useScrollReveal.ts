'use client';

/**
 * useScrollReveal Hook
 * Generic fade + translate reveal animation on scroll
 * Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollRevealOptions } from '@/types';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    delay = 0,
    duration = 0.8,
    direction = 'up',
    ease = 'power3.out',
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    if (prefersReducedMotion()) {
      // Simplified fade-only animation for accessibility
      gsap.from(element, {
        opacity: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
      });
      return;
    }

    // Calculate translate values based on direction
    const translateMap = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    // Scroll-triggered reveal animation
    gsap.from(element, {
      opacity: 0,
      ...translateMap[direction],
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%', // Trigger when element is 80% from viewport top
        toggleActions: 'play none none none', // One-time animation
      },
    });
  }, [delay, duration, direction, ease]);

  return elementRef;
}
