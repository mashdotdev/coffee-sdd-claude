# Quickstart Guide: Hero Section Development

**Feature**: Hero Section (PLAN)
**Date**: 2026-01-17
**For**: Developers implementing the hero section

## Prerequisites

- Node.js 20+ installed
- Frontend dependencies installed (`cd frontend && npm install`)
- FFmpeg installed (for video optimization)
- Basic understanding of GSAP and React hooks

## Step 1: Optimize Video Asset

**Before starting implementation**, optimize the hero video for smooth scroll scrubbing.

### Command

```bash
cd frontend/public/assets

# Create optimized version with all I-frames
ffmpeg -i coffee-reveal.mp4.mp4 \
  -vcodec libx264 \
  -g 1 \
  -x264-params keyint=1:scenecut=0 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  coffee-reveal-optimized.mp4

# Rename original as backup
mv coffee-reveal.mp4.mp4 coffee-reveal-original.mp4.mp4

# Use optimized version
mv coffee-reveal-optimized.mp4 coffee-reveal.mp4
```

### Validation

```bash
# Check file size (should be 5-7MB)
ls -lh coffee-reveal.mp4

# Verify keyframe interval using ffprobe
ffprobe -select_streams v -show_frames coffee-reveal.mp4 | grep "pict_type=I" | wc -l
# Should equal total frame count (every frame is I-frame)
```

**Expected**: File size 5-7MB (up from 1.7MB), frame-perfect scrubbing when tested in browser.

## Step 2: Development Environment Setup

### Start Dev Server

```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:3000` to see changes live.

### Enable GSAP Debug Markers

**During development**, enable ScrollTrigger markers to visualize scroll positions:

```typescript
// In lib/gsap-config.ts, temporarily set:
ScrollTrigger.defaults({
  markers: true,  // Show start/end lines
});
```

**Remember to disable before production!**

## Step 3: Component Development Order

Follow this order to avoid dependency issues:

### 1. Utilities (No dependencies)

**File**: `frontend/lib/utils.ts`

```typescript
// Create cn() helper for className merging
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Mobile detection
export function isMobileDevice(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}
```

### 2. Smooth Scroll Wrapper (Layout dependency)

**File**: `frontend/components/animations/SmoothScrollWrapper.tsx`

See [research.md RT-003](./research.md#rt-003-lenis-integration-with-nextjs-app-router) for implementation.

**Update**: `frontend/app/layout.tsx`

```typescript
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

### 3. Custom Hooks (Component dependencies)

**Files**:
- `frontend/hooks/useVideoOnScroll.ts`
- `frontend/hooks/useSplitText.ts`
- `frontend/hooks/useScrollReveal.ts`
- `frontend/hooks/index.ts` (barrel export)

See [plan.md Phase 1 - Custom Hooks](./plan.md#custom-hooks) for signatures and behavior.

### 4. UI Components

**File**: `frontend/components/ui/Button.tsx`

```typescript
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-transform',
        variant === 'primary' && 'bg-[#C89B3C] text-[#F5EFE6] hover:scale-105',
        variant === 'secondary' && 'border-2 border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C]/10',
        size === 'md' && 'px-8 py-3 text-lg',
        size === 'lg' && 'px-10 py-4 text-xl',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 5. Hero Section Component

**File**: `frontend/components/sections/HeroSection.tsx`

See [plan.md Phase 1 - Component Architecture](./plan.md#herosectiontsx-main-component) for structure.

### 6. Update Home Page

**File**: `frontend/app/page.tsx`

```typescript
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Future sections: Anchor, Guider, Elevate, Ship */}
    </main>
  );
}
```

## Step 4: Local Testing

### Desktop Testing

1. **Open DevTools** (F12)
2. **Check Console** for GSAP errors or warnings
3. **Scroll through hero** - verify video scrubs smoothly at 60fps
4. **Inspect text animations** - characters should reveal with stagger
5. **Test CTA button** - hover should scale, click should work

### Mobile Testing

**Chrome DevTools Device Mode**:
1. Toggle device toolbar (Ctrl+Shift+M)
2. Select "iPhone 12 Pro" or similar
3. Throttle network to "Fast 3G"
4. Reload page and verify:
   - Hero loads in <3 seconds
   - Animations simplified (word-level, not character-level)
   - CTA positioned in bottom third (thumb-zone)
   - Text readable against video background

**Real Device Testing** (Recommended):
1. Connect phone to same network as dev machine
2. Get local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Open `http://<your-ip>:3000` on phone
4. Test scroll performance, touch interactions, and load time

### Accessibility Testing

**Reduced Motion**:
1. **Windows**: Settings > Accessibility > Visual effects > Animation effects OFF
2. **Mac**: System Preferences > Accessibility > Display > Reduce motion
3. **Chrome DevTools**: Rendering > Emulate CSS prefers-reduced-motion: reduce
4. Reload page - verify video doesn't scroll-sync, text fades only

**Keyboard Navigation**:
- Tab to CTA button - should show focus ring
- Enter/Space should trigger button

### Performance Testing

**Lighthouse Audit**:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit (in production build)
cd frontend
npm run build
npm start

# In another terminal
lighthouse http://localhost:3000 --view --only-categories=performance
```

**Target Scores**:
- Performance: ≥90
- FCP: <1.5s
- LCP: <2.5s
- CLS: <0.1

**Chrome DevTools Performance**:
1. Open DevTools > Performance tab
2. Start recording
3. Scroll through hero section
4. Stop recording
5. Verify FPS stays at 60 during scroll (green line)

## Step 5: Common Issues & Debugging

### Issue: Video doesn't scrub smoothly

**Cause**: Video not optimized with all I-frames
**Solution**: Re-run video optimization command (Step 1)

### Issue: "ScrollTrigger is not defined"

**Cause**: GSAP plugin not registered
**Solution**: Check `lib/gsap-config.ts` has `gsap.registerPlugin(ScrollTrigger)` at module level

### Issue: Hydration mismatch error

**Cause**: Client component missing `"use client"` directive
**Solution**: Add `"use client";` at top of any file using hooks or browser APIs

### Issue: Text animation doesn't show on mobile

**Cause**: Characters positioned outside viewport on small screens
**Solution**: Check `overflow-hidden` on parent wrapper, reduce font size on mobile

### Issue: Performance below 60fps

**Debug Steps**:
1. Open DevTools > Performance > Record
2. Identify bottleneck (usually layout thrashing or too many DOM mutations)
3. Solutions:
   - Reduce character count in split text (use words on mobile)
   - Use `will-change: transform` on animated elements
   - Ensure video is optimized
   - Check for other expensive operations during scroll

## Step 6: Pre-Commit Checklist

Before committing, verify:

- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Video is optimized version (5-7MB file)
- [ ] GSAP debug markers disabled (`markers: false`)
- [ ] Tested on mobile device (real or high-fidelity simulator)
- [ ] Lighthouse Performance score ≥90
- [ ] Reduced motion tested and works
- [ ] No console errors or warnings
- [ ] CTA button functional and accessible
- [ ] All animations feel deliberate (not bouncy)

## Reference Files

- **GSAP Patterns**: `.claude/skills/gsap-animations/SKILL.md`
- **Video Scroll**: `.claude/skills/gsap-animations/VIDEOONSCROLLGSAP.md`
- **Research Decisions**: `specs/001-hero-section/research.md`
- **Component Architecture**: `specs/001-hero-section/plan.md#phase-1-design--contracts`

## Getting Help

If stuck, check these resources in order:

1. **GSAP Skill Docs**: `.claude/skills/gsap-animations/` directory
2. **Research File**: `specs/001-hero-section/research.md` for decisions
3. **Plan File**: `specs/001-hero-section/plan.md` for architecture
4. **GSAP Docs**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
5. **Lenis Docs**: https://github.com/darkroomengineering/lenis

## Next Steps

After hero section is complete and tested:

1. Run `/speckit.tasks` to generate task breakdown
2. Create git commits for each major component
3. Submit PR with Lighthouse scores and mobile testing evidence
4. Move on to next section (ANCHOR - Brand Story)
