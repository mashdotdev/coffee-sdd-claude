'use client';

/**
 * Smooth Scroll Wrapper
 * Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger at layout level
 */

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export default function SmoothScrollWrapper({
  children,
}: SmoothScrollWrapperProps) {
  useEffect(() => {
    // Initialize Lenis with premium-feeling easing
    const lenis = new Lenis({
      duration: 1.2, // Slow, deliberate scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger via RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
