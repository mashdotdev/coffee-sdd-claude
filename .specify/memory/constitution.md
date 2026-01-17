<!--
Sync Impact Report:
- Version change: N/A (initial) → 1.0.0
- New constitution created with 7 core principles
- Initial ratification: 2026-01-17
- Templates requiring updates:
  ✅ plan-template.md (reviewed - constitution check section compatible)
  ✅ spec-template.md (reviewed - user story structure compatible)
  ✅ tasks-template.md (reviewed - phase structure compatible)
- No follow-up TODOs
-->

# Premium Coffee Brand Constitution

## Core Principles

### I. Conversion-First Design (NON-NEGOTIABLE)

Every design decision, animation, and line of copy MUST serve the primary goal: converting visitors into buyers.

**Rules:**
- One primary CTA per section - no competing actions
- No decorative elements that distract from conversion path
- Scarcity language enforced (limited roast, small batch, exclusivity)
- Authority tone maintained throughout - never casual or friendly blogger tone
- Remove all friction: doubt, hesitation, confusion

**Rationale:** This is a $10,000 premium DTC website. Every pixel must earn its place by contributing to revenue. Beautiful design that doesn't convert is failed design.

### II. Five-Section Flow Integrity

The site structure MUST strictly follow the persuasion architecture:
1. **PLAN** - Instant clarity + authority + desire (Hero)
2. **ANCHOR** - Emotional lock + brand story
3. **GUIDER** - Education + trust building + objection removal
4. **ELEVATE** - Transformation + status + social proof
5. **SHIP** - Decisive action + purchase

**Rules:**
- No reordering or merging of sections
- Each section must complete its psychological purpose before the next
- Section breaks must be deliberate and paced
- Mobile experience must preserve the flow integrity

**Rationale:** This flow maps to the buyer's psychological journey from awareness to decision. Breaking the sequence breaks the conversion funnel.

### III. Luxury Brand Standards

Visual identity MUST communicate premium positioning and obsessive quality.

**Mandatory Design System:**
- **Colors:**
  - Primary: Espresso Black `#0E0E0E`
  - Secondary: Roasted Coffee Brown `#4A2C1D`
  - Accent: Cream Latte `#F5EFE6`
  - CTA: Burnt Gold `#C89B3C`
  - Contrast: Deep Oxide Red `#8B2F2F`
- **Typography:**
  - Headings: Playfair Display / Canela / Cormorant (luxury serif)
  - Body: Inter / SF Pro / Neue Haas Grotesk (clean sans-serif)
  - Editorial font scale - NOT SaaS scale
- **Grid:**
  - 12-column grid, max-width 1200-1280px
  - Generous white space (never cramped)
  - Strict vertical rhythm

**Forbidden:**
- Random colors or gradients (unless subtle and intentional)
- Cute coffee illustrations or generic Shopify aesthetics
- More than 2 font families
- Cluttered layouts or weak copy

**Rationale:** Luxury buyers associate design quality with product quality. Amateur design signals amateur product, regardless of actual coffee quality.

### IV. GSAP Animation Discipline

Animations MUST enhance persuasion through confidence and authority - never distract or feel amateur.

**Animation Principles:**
- Slow, deliberate, confident pacing
- NEVER bounce or over-ease (screams amateur)
- Use ScrollTrigger for scroll-based reveals
- Techniques: fade + translateY, clip-path reveals, subtle parallax
- Every animation must support a conversion goal

**GSAP Architecture (Custom Hooks Library):**
- `useScrollReveal` - text and element reveals on scroll
- `useParallax` - subtle background/image parallax
- `useClipReveal` - image reveals with clip-path
- `useSplitText` - word-by-word headline reveals
- `useSmoothScroll` - Lenis integration for smooth scrolling

**Mobile:**
- Reduce animation complexity on mobile
- Faster easing curves
- No heavy parallax effects
- Prioritize thumb-first interactions

**Rationale:** Animation should feel like a luxury car accelerating - smooth, powerful, controlled. Bouncy animations belong in consumer apps, not premium brands.

### V. Type Safety & Code Quality (NON-NEGOTIABLE)

TypeScript MUST be used with strict mode enabled across the entire codebase.

**Rules:**
- `strict: true` in tsconfig.json
- No `any` types without explicit justification
- Props interfaces for all components
- Type-safe GSAP refs and timelines
- ESLint + Prettier configured and enforced

**Rationale:** Type safety prevents runtime errors and makes refactoring safe. Premium brands can't afford broken animations or runtime crashes.

### VI. Mobile-First Experience

Mobile experience MUST be optimized for conversion, not just responsive.

**Requirements:**
- Sticky bottom CTA on scroll (always accessible)
- Thumb-zone optimized CTAs
- Simplified animations (performance)
- Touch-first interactions
- Fast loading (<3s on 3G)

**Rationale:** Mobile users convert differently than desktop. Responsive design alone isn't enough - mobile needs dedicated optimization.

### VII. Performance Excellence

Website MUST load fast and animate smoothly to maintain premium perception.

**Performance Standards:**
- Lighthouse Performance score ≥90
- First Contentful Paint <1.5s
- Largest Contentful Paint <2.5s
- Cumulative Layout Shift <0.1
- 60fps animations (no jank)

**Implementation:**
- Next.js Image optimization for all images
- Code splitting by route
- GSAP loaded efficiently (no full bundle)
- Font subsetting and preloading
- Lazy load below-fold content

**Rationale:** Slow sites feel cheap. Premium brands must load instantly and scroll like butter. Performance is perceived as quality.

## Technology Stack

**Framework & Language:**
- Next.js 16 (App Router)
- TypeScript strict mode
- React Server Components (default)

**Styling:**
- Tailwind CSS 4.x
- Custom design tokens for brand colors
- CSS Modules for component-specific styles if needed

**Animation:**
- GSAP 3.x with ScrollTrigger
- Lenis for smooth scrolling
- SplitText for text reveals
- Custom hooks library for reusable animations

**Development:**
- ESLint + Prettier
- Husky for pre-commit hooks
- VS Code recommended extensions

## Development Workflow

### Component Architecture

Components MUST follow this structure:
```
src/
├── app/
│   ├── layout.tsx          # Root layout with global providers
│   └── page.tsx            # Home page (all 5 sections)
├── components/
│   ├── sections/           # 5 core sections (Plan, Anchor, Guider, Elevate, Ship)
│   ├── ui/                 # Reusable UI components (Button, Card, etc.)
│   └── animations/         # Animation wrappers
├── hooks/
│   ├── useScrollReveal.ts
│   ├── useParallax.ts
│   ├── useClipReveal.ts
│   └── useSmoothScroll.ts
├── lib/
│   ├── gsap-config.ts      # GSAP plugin registration
│   └── constants.ts        # Brand colors, typography scale
└── types/
    └── index.ts            # Shared TypeScript types
```

### Content Strategy

**Hardcoded Content:**
- All copy lives in component files or constants
- Product data in `src/lib/product-data.ts`
- Image paths in `public/images/`
- No CMS or external data sources

**Rationale:** Single-brand site with fixed content. Hardcoding is fastest and eliminates complexity.

### Animation Development

1. Create reusable hooks in `src/hooks/`
2. Register GSAP plugins once in `src/lib/gsap-config.ts`
3. Import hooks in components
4. Test on mobile devices (not just browser DevTools)
5. Profile performance - no animation should drop below 60fps

### Code Review Standards

Every PR MUST verify:
- TypeScript compiles with no errors
- Animation feels deliberate and premium (not bouncy)
- Mobile experience tested on real device or high-fidelity simulator
- Lighthouse score ≥90
- No conversion path blockers introduced

## Governance

**Constitution Authority:**
This constitution supersedes all other development practices, style guides, or preferences. When in doubt, optimize for conversion.

**Amendment Process:**
1. Propose change with rationale in GitHub issue
2. Discuss impact on conversion goals
3. Update constitution with version bump
4. Update all dependent templates
5. Communicate changes to all contributors

**Compliance:**
- All PRs must align with core principles
- Design decisions that violate principles require explicit justification
- Performance regressions are blocking issues
- Animation that feels "cheap" must be removed or refined

**Complexity Justification:**
If a feature/pattern violates simplicity or adds complexity:
- Document the specific problem being solved
- Explain why simpler alternatives were rejected
- Get explicit approval before implementation

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17
