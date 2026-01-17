# Research: Hero Section Technical Decisions

**Feature**: Hero Section (PLAN)
**Date**: 2026-01-17
**Status**: Complete

## RT-001: GSAP SplitText Plugin Availability

### Question
Is SplitText included in GSAP free version or requires premium license?

### Context
- FR-004 requires character-by-character headline reveal
- Constitution Principle IV mandates custom GSAP hooks library
- GSAP skill documentation references SplitText extensively

### Research Findings

**SplitText License**: Requires GSAP Club membership ($99/year personal, $199/year commercial)

**Free Alternatives**:
1. **Manual span wrapping** - Split text into `<span>` elements, animate with GSAP
2. **Third-party libraries** - `splitting.js` (3KB), but adds dependency
3. **CSS-only** - Limited control, doesn't support character-level animation well

### Decision
**Use custom `useSplitText` hook with manual span wrapping**

### Rationale
- Avoid ongoing licensing costs for MVP
- Maintains full control over animation timing and easing
- Aligns with constitution's custom hooks library approach
- Pure React/GSAP solution with no additional dependencies
- Character animation quality equivalent to premium SplitText for our use case

### Implementation Details

```typescript
// useSplitText.ts
export function useSplitText(options: SplitTextOptions) {
  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    // 1. Store original text
    const originalText = element.textContent || '';

    // 2. Split into characters and wrap in spans
    const chars = originalText.split('').map((char, i) =>
      `<span class="inline-block" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
    );
    element.innerHTML = chars.join('');

    // 3. Animate spans
    const spans = element.querySelectorAll('span');
    gsap.from(spans, {
      yPercent: 100,
      opacity: 0,
      stagger: options.stagger || 0.05,
      duration: options.duration || 0.8,
      ease: 'power3.out',
      delay: options.delay || 0
    });

    // 4. Cleanup: restore original text
    return () => {
      element.textContent = originalText;
    };
  }, []);

  return elementRef;
}
```

**Mobile Optimization**: Detect screen width and switch to word-level splitting on mobile:
```typescript
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const splitType = isMobile ? 'words' : 'chars';
```

### Alternatives Considered
- **SplitText Premium**: Rejected due to $199/year cost, overkill for single hero section
- **splitting.js**: Rejected to avoid external dependency, reinventing the wheel unnecessary
- **CSS-only animations**: Rejected due to lack of character-level control and GSAP integration

---

## RT-002: Video Optimization for Scroll Scrubbing

### Question
What video codec/settings ensure frame-perfect scrubbing for scroll-controlled video?

### Context
- FR-017 requires optimized video format for smooth scrubbing
- Current video: `coffee-reveal.mp4.mp4` (1.7MB)
- GSAP skill VIDEOONSCROLLGSAP.md recommends all-I-frame encoding

### Research Findings

**Problem**: Standard H.264 encoding uses keyframes every 250-300 frames (10-12 seconds). Browser must decode from last keyframe when seeking, causing lag during scroll scrubbing.

**Solution**: Encode with keyframe on every frame (all I-frames). Browser can seek instantly to any frame.

**Trade-off**: File size increases 3-4x, but scrubbing becomes frame-perfect.

### Decision
**Use H.264 with all I-frames encoding**

### Rationale
- Smooth scrubbing is critical for premium brand perception (Constitution Principle IV)
- File size increase acceptable for hero section (5-7MB final vs 1.7MB original)
- Modern browsers handle H.264 efficiently with hardware decoding
- No alternative codec provides better scrubbing performance

### Implementation Command

```bash
ffmpeg -i coffee-reveal.mp4.mp4 \
  -vcodec libx264 \
  -g 1 \
  -x264-params keyint=1:scenecut=0 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  public/assets/coffee-reveal-optimized.mp4
```

**Parameters Explained**:
- `-g 1` - Keyframe every 1 frame (all I-frames)
- `-x264-params keyint=1:scenecut=0` - Force keyframe interval, disable scene detection
- `-preset slow` - High quality encoding (slower encode, better compression)
- `-crf 18` - Constant quality (18 = visually lossless)
- `-pix_fmt yuv420p` - Compatibility format for all browsers
- `-movflags +faststart` - Optimize for web streaming (metadata at start)
- `-an` - Remove audio track (not needed for muted hero video)

**Expected Output**: 5-7MB file with frame-perfect scrubbing

### Alternatives Considered
- **WebM (VP9)**: Better compression but inconsistent browser support for seeking
- **HEVC/H.265**: Better quality-to-size ratio but Safari requires paid codec license
- **Standard H.264**: Rejected due to laggy scrubbing (unacceptable for premium UX)

### Validation
Test scrubbing performance after encoding:
1. Load video in `<video>` element with `preload="auto"`
2. Manually set `video.currentTime` to various points
3. Verify instant frame display with no lag

---

## RT-003: Lenis Integration with Next.js App Router

### Question
How to initialize Lenis at layout level without SSR/hydration mismatches in Next.js 16?

### Context
- Constitution requires Lenis for smooth scrolling
- Next.js 16 uses React 19 with strict hydration checks
- Lenis requires DOM access (client-side only)

### Research Findings

**Problem**: Lenis initialization in server component causes hydration errors. Direct `layout.tsx` modification triggers "document is not defined" error.

**Solution Pattern**:
1. Create `SmoothScrollWrapper` client component
2. Mark with `"use client"` directive
3. Initialize Lenis in `useEffect` (after hydration)
4. Wrap `{children}` in `layout.tsx`

### Decision
**Use `SmoothScrollWrapper` client component wrapping layout children**

### Rationale
- Client component boundary isolates browser-only code
- `useEffect` ensures Lenis runs after hydration is complete
- Lenis wrapper at layout level provides global smooth scrolling
- Integrates with GSAP ScrollTrigger via RAF loop

### Implementation

**File**: `frontend/components/animations/SmoothScrollWrapper.tsx`

```typescript
"use client";

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

**Usage in `layout.tsx`**:
```tsx
import SmoothScrollWrapper from '@/components/animations/SmoothScrollWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
```

### Alternatives Considered
- **Direct Lenis in layout.tsx**: Rejected due to SSR errors
- **Per-page initialization**: Rejected to avoid duplication and ensure global smoothness
- **Third-party wrapper (lenis/react)**: Considered but custom implementation provides more control

### Validation
- Verify smooth scrolling works on all pages
- Confirm no hydration warnings in console
- Test ScrollTrigger animations integrate correctly

---

## RT-004: Reduced Motion Accessibility

### Question
Best practice for disabling scroll-sync video when user has motion sensitivity?

### Context
- FR-016 requires `prefers-reduced-motion` support
- WCAG 2.1 Level AA compliance mandatory
- Must not break experience for motion-sensitive users

### Research Findings

**Media Query**: `prefers-reduced-motion: reduce` - User OS setting for motion sensitivity

**Browser Support**: 95%+ (Chrome 74+, Safari 10.1+, Firefox 63+)

**Best Practices**:
1. Check media query before initializing animations
2. Provide static fallback with same content
3. Don't completely remove animations - simplify to fade only

### Decision
**Check `prefers-reduced-motion` in custom hooks, conditionally skip ScrollTrigger**

### Rationale
- Native browser API, no dependencies
- Respects user's explicit accessibility preference
- Graceful degradation - hero still functional with static video
- Aligns with WCAG 2.1 Animation from Interactions guideline

### Implementation

**In `useVideoOnScroll` hook**:
```typescript
useGSAP(() => {
  const video = videoRef.current;
  if (!video) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip scroll-sync, show static video poster
    video.poster = '/assets/coffee-reveal-poster.jpg';
    return;
  }

  // Normal scroll-sync video setup
  ScrollTrigger.create({
    trigger: video,
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      if (video.duration) {
        video.currentTime = video.duration * self.progress;
      }
    },
  });
}, []);
```

**In `useSplitText` hook**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Simple fade instead of character animation
  gsap.from(elementRef.current, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });
  return;
}

// Normal character-by-character animation
// ...
```

### Alternatives Considered
- **CSS-only `@media (prefers-reduced-motion)`**: Rejected as it doesn't conditionally disable JS animations
- **Completely remove animations**: Rejected as some motion is acceptable (fade transitions)
- **User toggle in UI**: Rejected to avoid extra UI complexity, respect OS setting

---

## RT-005: Mobile Animation Simplification

### Question
How to detect mobile vs desktop for animation complexity reduction per FR-013?

### Context
- FR-013 requires mobile animation simplification for performance
- Constitution Principle VI mandates mobile-first optimization
- 60fps target must be maintained on mobile devices

### Research Findings

**Detection Methods**:
1. **User-agent sniffing**: Unreliable, not recommended
2. **Touch event detection**: Tablets with mouse support cause false positives
3. **Screen width media queries**: Reliable, aligns with Tailwind breakpoints
4. **Device pixel ratio**: Not reliable indicator of performance

**Tailwind Breakpoint**: `md: 768px` - Standard mobile/desktop boundary

### Decision
**Use `matchMedia('(min-width: 768px)')` for JS branching, Tailwind `md:` for CSS**

### Rationale
- Consistent with Tailwind's mobile-first approach
- Reliable detection based on viewport size
- No user-agent parsing needed
- Matches design system breakpoint (md: 768px)

### Implementation

**In `useSplitText` hook**:
```typescript
useGSAP(() => {
  const element = elementRef.current;
  if (!element) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    // Mobile: word-level animation (fewer elements, faster)
    const words = element.textContent!.split(' ');
    element.innerHTML = words
      .map(word => `<span class="inline-block">${word}&nbsp;</span>`)
      .join('');

    gsap.from(element.querySelectorAll('span'), {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    });
  } else {
    // Desktop: character-level animation (richer experience)
    const chars = element.textContent!.split('');
    element.innerHTML = chars
      .map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    gsap.from(element.querySelectorAll('span'), {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
    });
  }
}, []);
```

**CSS-driven differences** (in component):
```tsx
<div className="
  md:text-7xl text-5xl        // Smaller text on mobile
  md:tracking-tight tracking-normal  // Looser tracking on mobile
">
```

### Animation Complexity Reduction

| Animation | Desktop | Mobile |
|-----------|---------|--------|
| Headline | Character stagger (0.05s) | Word stagger (0.15s) |
| Parallax | Full effect | Disabled |
| Video scroll | Full scrubbing | Simplified (fewer updates) |
| CTA hover | Scale + shadow | Tap highlight only |

### Alternatives Considered
- **User-agent detection**: Rejected as unreliable and fragile
- **Device memory API**: Too new, limited browser support
- **Performance observer**: Overkill for simple detection

---

## Summary & Next Steps

All research tasks resolved. Key decisions:

1. ✅ **Custom SplitText**: Manual span wrapping, no premium license needed
2. ✅ **Video Optimization**: H.264 all-I-frames encoding command provided
3. ✅ **Lenis Integration**: `SmoothScrollWrapper` client component pattern
4. ✅ **Accessibility**: `prefers-reduced-motion` checks in hooks
5. ✅ **Mobile Detection**: `matchMedia('(min-width: 768px)')` for branching

**Ready for Phase 1**: Component architecture design and contract generation.

**Action Items**:
- [ ] Run video optimization command before implementation
- [ ] Create `SmoothScrollWrapper` component first (prerequisite for all animations)
- [ ] Implement custom hooks with mobile + accessibility checks
- [ ] Test on real mobile devices (not just DevTools)
