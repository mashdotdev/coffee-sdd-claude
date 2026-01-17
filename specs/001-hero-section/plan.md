# Implementation Plan: Hero Section (PLAN)

**Branch**: `001-hero-section` | **Date**: 2026-01-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hero-section/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a full-viewport hero section with scroll-controlled video that serves as the PLAN (instant clarity + authority + desire) in the five-section conversion flow. The hero features a pinned video (`coffee-reveal.mp4`) that scrubs frame-by-frame based on scroll position, overlaid with character-by-character text reveals and a single primary CTA. Extended scroll area (2.5x viewport) creates slow, deliberate pacing that signals premium quality. Mobile version optimizes animations for performance while maintaining thumb-zone CTA positioning.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), React 19.x, Next.js 16.x (App Router)
**Primary Dependencies**:
- GSAP 3.14.x (ScrollTrigger, SplitText plugins)
- @gsap/react 2.1.x (useGSAP hook)
- Lenis 1.3.x (smooth scrolling)
- Tailwind CSS 4.x
**Storage**: N/A (static content, no persistence required)
**Testing**: Jest + React Testing Library (unit), Playwright (E2E), Lighthouse CI (performance)
**Target Platform**: Modern web browsers (Chrome/Edge/Safari/Firefox last 2 versions), responsive mobile
**Project Type**: Web application (Next.js frontend)
**Performance Goals**:
- Desktop: FCP <1.5s, 60fps animations during scroll
- Mobile: LCP <2.5s on 3G, simplified animations maintaining 60fps
- Lighthouse Performance score ≥90
**Constraints**:
- Video must maintain frame-perfect scrubbing (requires all-I-frame optimization)
- Accessibility: WCAG 2.1 Level AA contrast (4.5:1), reduced motion support
- Mobile: <3s initial load on 3G connection
- Single primary CTA only (constitution Principle I)
**Scale/Scope**:
- Single hero section component
- 4 custom GSAP hooks (video scroll, split text, scroll reveal, smooth scroll wrapper)
- 1 reusable Button component
- Mobile + desktop responsive breakpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Conversion-First Design
- **Check**: Single primary CTA ("Shop the Roast"), no competing actions
- **Status**: PASS - Spec explicitly requires one CTA only (FR-011)
- **Evidence**: User Story 3 acceptance scenario validates no competing CTAs present

### ✅ Principle II: Five-Section Flow Integrity
- **Check**: Hero implements PLAN section (instant clarity + authority + desire)
- **Status**: PASS - Feature purpose aligns with PLAN requirements
- **Evidence**: User Story 1 validates brand positioning communicated in 5 seconds

### ✅ Principle III: Luxury Brand Standards
- **Check**: Uses Playfair Display (headings), Inter (body), brand colors, max-width 1280px
- **Status**: PASS - FR-009 requires brand typography, design tokens defined in lib/constants.ts
- **Evidence**: Dependencies section references brand colors and typography system

### ✅ Principle IV: GSAP Animation Discipline
- **Check**: Slow, deliberate animations using ScrollTrigger, no bounce/over-easing
- **Status**: PASS - Extended scroll (2.5x viewport) creates slow pacing, FR-012 requires 0.8-1.2s durations
- **Evidence**: Scroll-controlled video with scrub: 1, character stagger timing, constitution-compliant easing

### ✅ Principle V: Type Safety & Code Quality
- **Check**: TypeScript strict mode, typed props, no `any` without justification
- **Status**: PASS - Technical context specifies TypeScript 5.x strict mode
- **Evidence**: Component architecture requires Props interfaces per constitution

### ✅ Principle VI: Mobile-First Experience
- **Check**: Thumb-zone CTA, simplified animations, <3s load on 3G
- **Status**: PASS - User Story 4 (P2) covers mobile optimization, FR-014 requires thumb-zone positioning
- **Evidence**: SC-004 validates LCP <2.5s on 3G, FR-013 requires reduced animation complexity

### ✅ Principle VII: Performance Excellence
- **Check**: Lighthouse ≥90, FCP <1.5s, LCP <2.5s, 60fps animations
- **Status**: PASS - Performance goals match constitution standards exactly
- **Evidence**: FR-018 requires 60fps, SC-003/SC-004 validate load times, SC-005 validates animation performance

**Overall Constitution Compliance**: ✅ ALL GATES PASSED

## Project Structure

### Documentation (this feature)

```text
specs/001-hero-section/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (below)
├── data-model.md        # Phase 1 output (N/A - no data entities for this feature)
├── quickstart.md        # Phase 1 output (below)
├── contracts/           # Phase 1 output (N/A - no API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── layout.tsx          # Root layout (already exists with fonts)
│   ├── globals.css         # Global styles (already exists with brand tokens)
│   └── page.tsx            # Home page (update to include HeroSection)
├── components/
│   ├── sections/
│   │   └── HeroSection.tsx       # Main hero component (NEW)
│   ├── ui/
│   │   └── Button.tsx            # Reusable CTA button (NEW)
│   └── animations/
│       └── SmoothScrollWrapper.tsx  # Lenis wrapper for layout (NEW)
├── hooks/
│   ├── useVideoOnScroll.ts       # Video scroll-sync hook (NEW)
│   ├── useSplitText.ts           # Character reveal hook (NEW)
│   ├── useScrollReveal.ts        # Generic scroll reveal hook (NEW)
│   └── index.ts                  # Hooks barrel export (NEW)
├── lib/
│   ├── gsap-config.ts      # GSAP plugin registration (already exists)
│   ├── constants.ts        # Brand colors, typography (already exists)
│   └── utils.ts            # Helper functions (NEW - cn, prefers-reduced-motion)
├── types/
│   └── index.ts            # Shared TypeScript types (already exists, extend)
└── public/
    └── assets/
        └── coffee-reveal.mp4.mp4  # Video asset (already exists)
```

**Structure Decision**: Web application structure (Option 2) - Frontend-only Next.js application with component-based architecture. Hero section is a client component in `components/sections/` using custom hooks from `hooks/` directory. Follows constitution's prescribed component architecture from Section "Development Workflow > Component Architecture".

## Complexity Tracking

> **No violations - this section is empty per constitution compliance**

All requirements align with constitution principles. No additional complexity justification needed.

---

## Phase 0: Research & Unknowns Resolution

### Research Tasks

**RT-001: GSAP SplitText Plugin Availability**
- **Question**: Is SplitText included in GSAP free version or requires premium license?
- **Context**: FR-004 requires character-by-character headline reveal
- **Decision**: SplitText requires GSAP Club membership (premium). **Alternative**: Use CSS-based character splitting with `display: inline-block` on spans
- **Rationale**: Avoid licensing costs for MVP. CSS approach provides adequate control for character animation.
- **Implementation**: Create custom `useSplitText` hook that wraps text in spans and animates with GSAP `from()` using stagger

**RT-002: Video Optimization for Scroll Scrubbing**
- **Question**: What video codec/settings ensure frame-perfect scrubbing?
- **Context**: FR-017 requires all I-frames for smooth scrubbing, video is 1.7MB
- **Decision**: Use H.264 with keyframe on every frame (`-g 1` in ffmpeg), accept 3-4x file size increase for smooth UX
- **Rationale**: Smooth scrubbing is critical for premium feel. Modern browsers handle H.264 efficiently. File size impact acceptable for hero section.
- **Command**: `ffmpeg -i coffee-reveal.mp4.mp4 -vcodec libx264 -g 1 -x264-params keyint=1:scenecut=0 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart -an coffee-reveal-optimized.mp4`

**RT-003: Lenis Integration with Next.js App Router**
- **Question**: How to initialize Lenis at layout level without hydration mismatches?
- **Context**: Constitution requires Lenis for smooth scrolling, Next.js 16 uses React 19
- **Decision**: Create `SmoothScrollWrapper` client component wrapping `children` in `layout.tsx`, use `useEffect` for Lenis initialization
- **Rationale**: Client component boundary prevents SSR issues. Effect runs after hydration ensuring DOM is ready.
- **Reference**: Lenis React integration docs + GSAP skill SCROLLTRIGGER.md section "Integration with Lenis"

**RT-004: Reduced Motion Media Query Handling**
- **Question**: Best practice for disabling scroll-sync video when `prefers-reduced-motion: reduce`?
- **Context**: FR-016 requires accessibility support for motion-sensitive users
- **Decision**: Use `window.matchMedia('(prefers-reduced-motion: reduce)')` check in `useVideoOnScroll` hook, conditionally skip ScrollTrigger creation
- **Rationale**: Native browser API, no dependencies. Fallback shows static video poster frame.
- **Implementation**: Add `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches` guard

**RT-005: Mobile Animation Simplification Strategy**
- **Question**: How to detect mobile vs desktop for animation complexity reduction?
- **Context**: FR-013 requires mobile animation simplification for performance
- **Decision**: Use Tailwind breakpoints (`md:` prefix) for CSS-driven differences, use `matchMedia('(min-width: 768px)')` for JS animation branching
- **Rationale**: Consistent with Tailwind's mobile-first approach. Avoids user-agent sniffing.
- **Implementation**: Desktop: full character stagger (0.05s), Mobile: word stagger (0.15s) or simple fade

### Research Output

See [research.md](./research.md) for detailed findings on:
1. Custom SplitText implementation without premium license
2. Video optimization parameters for frame-perfect scrubbing
3. Lenis + Next.js 16 integration pattern
4. Reduced motion accessibility implementation
5. Mobile animation simplification approach

---

## Phase 1: Design & Contracts

### Data Model

**N/A** - Hero section is a presentation component with no persistent data entities. All content is hardcoded per constitution's content strategy.

### API Contracts

**N/A** - No backend API required. Hero section is fully client-side with static assets.

### Component Architecture

#### HeroSection.tsx (Main Component)

**Purpose**: Full-viewport hero with scroll-controlled video, animated text, and primary CTA

**Props**:
```typescript
interface HeroSectionProps {
  className?: string;
}
```

**Structure**:
```tsx
<section className="relative h-[250vh]"> // Extended scroll area
  <div className="sticky top-0 h-screen"> // Pinned viewport
    <video /> // Scroll-controlled video with overlays
    <div className="absolute inset-0"> // Content layer
      <h1 /> // Character-reveal headline
      <p />  // Subheadline
      <Button /> // Primary CTA
    </div>
  </div>
</section>
```

**Hooks Used**:
- `useVideoOnScroll({ start: "top top", end: "bottom top", pin: true })`
- `useSplitText(headlineRef, { type: "chars", stagger: 0.05 })`
- `useScrollReveal(subheadlineRef, { delay: 0.3 })`
- `useScrollReveal(ctaRef, { delay: 0.5 })`

#### Button.tsx (UI Component)

**Purpose**: Reusable CTA button with brand styling and hover states

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Variants**:
- `primary`: Burnt Gold (#C89B3C) background, cream text, scale hover
- `secondary`: Transparent with gold border, gold text
- `text`: No background, gold text, underline hover

#### SmoothScrollWrapper.tsx (Layout Component)

**Purpose**: Initialize Lenis smooth scrolling at layout level, integrate with GSAP ScrollTrigger

**Props**:
```typescript
interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}
```

**Implementation**:
- Initialize Lenis in `useEffect`
- Connect Lenis to GSAP via `ScrollTrigger.update()` in RAF loop
- Cleanup on unmount

### Custom Hooks

#### useVideoOnScroll

**Signature**:
```typescript
function useVideoOnScroll(options: {
  start?: string;
  end?: string;
  pin?: boolean;
  trigger?: string | HTMLElement;
  scrub?: number | boolean;
}): RefObject<HTMLVideoElement>
```

**Behavior**:
- Returns video ref
- Pauses video initially via `loadedmetadata` event
- Creates ScrollTrigger syncing `video.currentTime` with scroll `progress`
- Respects `prefers-reduced-motion` (skips ScrollTrigger if set)

#### useSplitText

**Signature**:
```typescript
function useSplitText(options: {
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  direction?: 'up' | 'down';
  delay?: number;
}): RefObject<HTMLElement>
```

**Behavior**:
- Wraps text content in spans (one per character/word/line)
- Animates from `yPercent: 100, opacity: 0` with stagger
- Cleanup: removes spans on unmount
- Mobile: switches to word-level split if `type: 'chars'` and screen <768px

#### useScrollReveal

**Signature**:
```typescript
function useScrollReveal(options: {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}): RefObject<HTMLElement>
```

**Behavior**:
- Generic fade + translate reveal on scroll
- Trigger at `start: "top 80%"`
- One-time animation (no reverse)

### Quickstart Guide

See [quickstart.md](./quickstart.md) for developer setup instructions including:
1. Video optimization command
2. Component import patterns
3. Testing scroll animations locally
4. Mobile testing checklist
5. Performance profiling steps

---

## Phase 2: Task Breakdown

**NOTE**: This section is intentionally left empty. Task breakdown is generated by the `/speckit.tasks` command, which creates `tasks.md` in the specs directory.

To proceed with implementation:
```bash
/speckit.tasks
```

This will generate a dependency-ordered task list based on this plan.
