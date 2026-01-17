'use client';

/**
 * useSplitText Hook
 * Custom text splitting and animation without premium GSAP SplitText plugin
 * Per RT-001 research decision: Use manual span wrapping for cost-effective solution
 * Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { SplitTextOptions } from '@/types';
import { prefersReducedMotion, isMobileDevice } from '@/lib/utils';

export function useSplitText(options: SplitTextOptions = {}) {
  const {
    type = 'chars',
    stagger = 0.05,
    direction = 'up',
    delay = 0,
    duration = 0.8,
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    // Store original text for cleanup
    const originalText = element.textContent || '';

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

    // Mobile optimization: Use words instead of chars for performance
    const isMobile = isMobileDevice();
    const actualType = type === 'chars' && isMobile ? 'words' : type;

    // Mobile-specific animation settings for better performance
    const actualStagger = isMobile ? 0.15 : stagger;
    const actualDuration = isMobile ? 0.6 : duration;

    // Split text based on type
    let parts: string[] = [];
    if (actualType === 'chars') {
      parts = originalText.split('');
    } else if (actualType === 'words') {
      parts = originalText.split(' ');
    } else if (actualType === 'lines') {
      // Simple line splitting (for more complex line detection, would need layout calculation)
      parts = originalText.split('\n');
    }

    // Wrap each part in a span
    const wrappedParts = parts.map((part) => {
      if (actualType === 'chars' && part === ' ') {
        return '<span class="inline-block">&nbsp;</span>';
      }
      if (actualType === 'words') {
        return `<span class="inline-block">${part}&nbsp;</span>`;
      }
      return `<span class="inline-block overflow-hidden"><span class="inline-block">${part}</span></span>`;
    });

    element.innerHTML = wrappedParts.join('');

    // Get all inner spans for animation
    const spans = element.querySelectorAll('span span');
    const targets = spans.length > 0 ? spans : element.querySelectorAll('span');

    // Animate based on direction
    const fromProps =
      direction === 'down'
        ? { yPercent: -100, opacity: 0 }
        : { yPercent: 100, opacity: 0 };

    gsap.from(targets, {
      ...fromProps,
      stagger: actualStagger,
      duration: actualDuration,
      delay,
      ease: 'power3.out',
    });

    // Cleanup: restore original text on unmount
    return () => {
      if (element) {
        element.textContent = originalText;
      }
    };
  }, [type, stagger, direction, delay, duration]);

  return elementRef;
}
