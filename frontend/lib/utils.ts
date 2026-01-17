/**
 * Utility Functions
 * Per Constitution v1.0.0 - Supporting functions for premium brand experience
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if user prefers reduced motion
 * Per FR-016: Accessibility support for motion-sensitive users
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect mobile device based on viewport width
 * Per FR-013: Mobile animation simplification
 * Uses Tailwind 'md' breakpoint (768px) as threshold
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}
