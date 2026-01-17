'use client';

/**
 * Hero Section Component
 * Full-viewport hero with scroll-controlled video, animated text, and primary CTA
 * Per Constitution v1.0.0 - Implements PLAN section (instant clarity + authority + desire)
 */

import { useVideoOnScroll, useSplitText, useScrollReveal } from '@/hooks';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  // Custom hooks for animations
  const videoRef = useVideoOnScroll({
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  });

  const headlineRef = useSplitText({
    type: 'chars',
    stagger: 0.05,
    delay: 0.2,
  });

  const subheadlineRef = useScrollReveal({
    delay: 0.3,
    direction: 'up',
  });

  const ctaRef = useScrollReveal({
    delay: 0.5,
    direction: 'up',
  });

  return (
    <section className={`relative h-[190vh] ${className || ''}`}>
      {/* Sticky container - pinned during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video background with overlays */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/assets/coffee-reveal.mp4"
            className="h-full w-full object-cover brightness-[0.35]"
            muted
            playsInline
            preload="auto"
            poster="/assets/coffee-reveal-poster.png" // Fallback poster
          />

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content layer */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-[1280px] px-6 text-center">
            {/* Headline with character reveal */}
            <h1
              ref={headlineRef as React.RefObject<HTMLHeadingElement>}
              className="font-heading text-5xl leading-tight tracking-tight text-[#F5EFE6] md:text-7xl lg:text-8xl"
            >
              Coffee for People Who Refuse Average Mornings
            </h1>

            {/* Subheadline with fade reveal */}
            <p
              ref={subheadlineRef as React.RefObject<HTMLParagraphElement>}
              className="mt-6 text-xl text-[#F5EFE6]/80 md:text-2xl"
            >
              Obsessively sourced. Meticulously roasted. Elite coffee for
              high-performers.
            </p>

            {/* Primary CTA with delayed reveal */}
            <div
              ref={ctaRef as React.RefObject<HTMLDivElement>}
              className="mt-10 md:mt-12 hidden md:block"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  // TODO: Navigate to product page
                  console.log('Shop the Roast clicked');
                }}
              >
                Shop the Roast
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA - thumb-zone positioning */}
        <div className="fixed bottom-6 left-0 right-0 z-20 px-6 md:hidden">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => {
              // TODO: Navigate to product page
              console.log('Shop the Roast clicked (mobile sticky)');
            }}
          >
            Shop the Roast
          </Button>
        </div>
      </div>
    </section>
  );
}
