'use client';

/**
 * useVideoOnScroll Hook
 * Syncs video playback to scroll position using GSAP ScrollTrigger
 * Per RT-002 research decision: Requires all-I-frame optimized video for smooth scrubbing
 * Per Constitution v1.0.0 - Principle IV: GSAP Animation Discipline
 */

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { VideoOnScrollOptions } from '@/types';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function useVideoOnScroll(options: VideoOnScrollOptions = {}) {
  const {
    start = 'top top',
    end = 'bottom top',
    pin = true,
    trigger,
    scrub = 1, // Smooth lag for premium feel
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video initially to prevent auto-play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Create scroll-sync animation
  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check for reduced motion preference - skip scroll-sync if set
    if (prefersReducedMotion()) {
      // Show static poster frame instead
      return;
    }

    // Create ScrollTrigger that syncs video.currentTime with scroll progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || video,
      start,
      end,
      pin,
      scrub,
      onUpdate: (self) => {
        // Sync video playback to scroll progress
        if (video.duration) {
          video.currentTime = video.duration * self.progress;
        }
      },
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
    };
  }, [start, end, pin, trigger, scrub]);

  return videoRef;
}
