# Coffee Site - Premium Coffee Brand DTC Website

**Last Updated**: 2026-01-17
**Constitution Version**: 1.0.0
**Current Feature**: Hero Section (001-hero-section) - 87% Complete

## Project Overview

This is a conversion-focused premium coffee brand website built with Next.js 16. The site follows a strict constitution-driven development approach with 7 core principles governing all decisions. The design philosophy prioritizes conversion over everything else, implementing a 5-section psychological flow: PLAN → ANCHOR → GUIDER → ELEVATE → SHIP.

## Technology Stack

**Framework & Language:**
- Next.js 16.1.3 (App Router with Turbopack)
- React 19.2.3
- TypeScript 5.x (strict mode enabled)

**Styling:**
- Tailwind CSS 4.x with custom design tokens
- Brand Colors: Espresso Black (#0E0E0E), Roasted Brown (#4A2C1D), Cream Latte (#F5EFE6), Burnt Gold (#C89B3C)
- Typography: Playfair Display (headings), Inter (body)

**Animation:**
- GSAP 3.14.2 with ScrollTrigger plugin
- @gsap/react 2.1.2 (useGSAP hook)
- Lenis 1.3.17 for smooth scrolling
- Custom SplitText implementation (manual span wrapping to avoid $199/year premium plugin)

**Development Tools:**
- ESLint 9.x + Prettier 3.8.0
- Husky 9.1.7 for git hooks
- npm package manager

## Project Structure

```
A:\Desktop\coffee-site\
├── .specify/                          # Speckit workflow configuration
│   ├── memory/constitution.md         # 7 core principles (NON-NEGOTIABLE)
│   ├── templates/                     # Feature spec templates
│   └── scripts/                       # Automation scripts
├── specs/
│   └── 001-hero-section/              # Current feature spec
│       ├── spec.md                    # Requirements & user stories
│       ├── plan.md                    # Implementation plan
│       ├── tasks.md                   # 46 tasks (40 complete, 6 manual testing)
│       ├── research.md                # Technical decisions
│       └── quickstart.md              # Testing procedures
├── frontend/                          # Next.js application root
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with fonts + SmoothScrollWrapper
│   │   ├── page.tsx                   # Home page (imports HeroSection)
│   │   └── globals.css                # Tailwind + brand colors
│   ├── components/
│   │   ├── sections/
│   │   │   └── HeroSection.tsx        # ⭐ Main hero with scroll-video (h-[190vh])
│   │   ├── ui/
│   │   │   └── Button.tsx             # Reusable CTA button
│   │   └── animations/
│   │       └── SmoothScrollWrapper.tsx # Lenis integration
│   ├── hooks/
│   │   ├── useVideoOnScroll.ts        # Video scrubbing via ScrollTrigger
│   │   ├── useSplitText.ts            # Custom text splitting (chars/words)
│   │   ├── useScrollReveal.ts         # Fade + translate on scroll
│   │   └── index.ts                   # Barrel export
│   ├── lib/
│   │   ├── constants.ts               # Brand colors, animation config
│   │   ├── gsap-config.ts             # GSAP plugin registration
│   │   └── utils.ts                   # cn, prefersReducedMotion, isMobileDevice
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   └── public/
│       └── assets/
│           └── coffee-reveal.mp4      # 8-second hero video (all I-frames, 6.8MB)
├── MASTERPROMPT.md                    # Design brief (source of truth)
└── CLAUDE.md                          # ⭐ This file

```

## 7 Core Principles (Constitution v1.0.0)

**CRITICAL**: These principles are NON-NEGOTIABLE and supersede all other practices.

1. **Conversion-First Design** - Every element serves conversion. One CTA per section. Authority tone, scarcity language.
2. **Five-Section Flow Integrity** - PLAN → ANCHOR → GUIDER → ELEVATE → SHIP (strict order)
3. **Luxury Brand Standards** - Brand colors, typography, 12-column grid, max-width 1200-1280px
4. **GSAP Animation Discipline** - Slow, deliberate, confident. No bouncing. Mobile-optimized.
5. **Type Safety & Code Quality** - Strict TypeScript, no `any` types, ESLint + Prettier enforced
6. **Mobile-First Experience** - Sticky CTAs, thumb-zone positioning, <3s load on 3G
7. **Performance Excellence** - Lighthouse ≥90, FCP <1.5s, LCP <2.5s, 60fps animations

**When in doubt**: Optimize for conversion. Complexity requires explicit justification.

## Current Implementation Status

### Hero Section (001-hero-section) - 40/46 Tasks Complete

**✅ Completed:**
- Phase 1-3: Core hero section with scroll-controlled video (T001-T029)
- Phase 4-5: Mobile optimization with sticky CTA (T030-T034)
- Phase 7: Accessibility (reduced motion), cleanup, code formatting (T037-T040, T044, T046)

**📋 Requires Manual Testing (6 tasks):**
- T035: Video load performance on throttled 3G
- T036: Text contrast on mobile (4.5:1 ratio)
- T041: Lighthouse audit (Performance ≥90)
- T042: Accessibility audit (WCAG 2.1 Level AA)
- T043: Animation performance (60fps during scroll)
- T045: Quickstart validation checklist

**Build Status**: ✅ Passing | **ESLint**: ✅ No errors | **TypeScript**: ✅ Strict mode passing

## Key Technical Decisions

### RT-001: Custom SplitText Implementation
**Decision**: Manual span wrapping instead of GSAP SplitText plugin
**Rationale**: Avoid $199/year licensing cost while maintaining functionality
**Trade-off**: Slightly more code, but full control and no dependency

### RT-002: All-I-Frame Video Optimization
**Decision**: Convert video to all I-frames using ffmpeg
**Command**: `ffmpeg -i input.mp4 -vcodec libx264 -g 1 -x264-params keyint=1:scenecut=0 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart -an output.mp4`
**Result**: 1.8MB → 6.8MB (3.8x increase) with frame-perfect scrubbing
**Trade-off**: Larger file size for buttery smooth scroll-sync

### RT-003: Mobile Animation Optimization
**Decision**: Switch from character-level to word-level splitting on mobile (<768px)
**Rationale**: Better performance, faster animations (0.15s stagger, 0.6s duration)
**Implementation**: `isMobileDevice()` check in `useSplitText` hook

### RT-004: Hero Section Height Tuning
**Decision**: `h-[190vh]` for 8-second video
**Rationale**: Tighter scroll-to-video synchronization (user adjusted from initial 250vh → 180vh → 190vh)
**Fine-tuning**: Increase for slower scrub, decrease for faster

## Development Workflow

### Commands

```bash
# Development
cd frontend
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build with Turbopack
npm run lint         # ESLint check
npm run format       # Prettier format all files

# Testing (manual - use Chrome DevTools)
# 1. Network tab → Throttle to Slow 3G for T035
# 2. Lighthouse tab → Run audit for T041
# 3. Accessibility tab → Run audit for T042
# 4. Performance tab → Record scroll for T043
```

### Speckit Workflow

```bash
/speckit.specify <feature-description>  # Create spec from description
/speckit.clarify                        # Resolve underspecified areas
/speckit.plan                           # Generate implementation plan
/speckit.tasks                          # Generate task breakdown
/speckit.implement                      # Execute implementation
```

## Important Notes & Gotchas

### Video Scrubbing
- Hero video MUST have all I-frames for smooth scrubbing (RT-002)
- ScrollTrigger syncs `video.currentTime` to `scroll.progress` (0-1)
- Section height determines scrub speed: `h-[190vh]` = 1.9x viewport height scroll range
- Reduced motion disables scroll-sync (shows static poster)

### Mobile Sticky CTA
- Fixed positioning at `bottom-6` (thumb-zone)
- Hidden on desktop with `md:hidden`
- Desktop CTA also hidden on mobile with `hidden md:block` at line 84

### Lenis Smooth Scrolling
- Initialized in `SmoothScrollWrapper.tsx` at layout level
- Integrates with GSAP via `ScrollTrigger.update`
- Duration: 1.2s, easing: power2 out
- Must use `requestAnimationFrame` loop

### TypeScript Strict Mode
- All props require interfaces in `types/index.ts`
- No `any` types without justification
- React refs typed as `React.RefObject<HTMLElement>`

### Accessibility
- All hooks check `prefersReducedMotion()` and simplify to fade-only
- Button component has `focus-visible:ring-2` for keyboard navigation
- Video has poster frame fallback

## Common Issues & Solutions

### Issue: Build fails with Turbopack parsing error
**Solution**: Check for unclosed JSX tags, especially after editing HeroSection.tsx

### Issue: Video doesn't scrub smoothly
**Solution**: Verify video has all I-frames using `ffprobe -show_frames input.mp4 | grep "pict_type=I" | wc -l`

### Issue: Animations not working
**Solution**: Check if `SmoothScrollWrapper` is wrapping app in `layout.tsx`

### Issue: Mobile animations laggy
**Solution**: Verify `isMobileDevice()` check switches to word-level splitting

## Next Steps

1. **Manual Testing**: Complete T035-T036, T041-T043, T045 using Chrome DevTools
2. **Lighthouse Optimization**: If score <90, optimize images/fonts
3. **Video Asset**: Ensure poster image exists at `/assets/coffee-reveal-poster.jpg`
4. **Next Section**: Implement ANCHOR section (Brand Story / Emotional Lock)

## File Modification History

- **2026-01-17**: HeroSection.tsx height adjusted to `h-[190vh]` (user fine-tuned from 180vh)
- **2026-01-17**: Desktop CTA hidden on mobile (`hidden md:block` at line 84)
- **2026-01-17**: Mobile sticky CTA added with thumb-zone positioning
- **2026-01-17**: All 3 custom hooks created with reduced motion support
- **2026-01-17**: Video optimized to all I-frames (1.8MB → 6.8MB)

---

**For New Claude Sessions**: Read `.specify/memory/constitution.md` first, then `specs/001-hero-section/tasks.md` for current progress. Dev server runs on port 3000. All animation code must follow "slow, deliberate, confident" principle from Constitution Principle IV.
