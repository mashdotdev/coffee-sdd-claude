# Tasks: Hero Section (PLAN)

**Input**: Design documents from `/specs/001-hero-section/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` at repository root
- All paths are relative to `frontend/` directory
- TypeScript files use `.ts` or `.tsx` extensions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and video asset optimization

- [x] T001 Optimize hero video asset using ffmpeg command in frontend/public/assets/coffee-reveal.mp4
- [x] T002 [P] Create utility functions in frontend/lib/utils.ts (cn, prefersReducedMotion, isMobileDevice)
- [x] T003 [P] Extend TypeScript types in frontend/types/index.ts (ButtonProps, SplitTextOptions, VideoOnScrollOptions, ScrollRevealOptions)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core animation infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create SmoothScrollWrapper component in frontend/components/animations/SmoothScrollWrapper.tsx (Lenis initialization, GSAP integration)
- [x] T005 Update root layout in frontend/app/layout.tsx to wrap children with SmoothScrollWrapper
- [x] T006 [P] Create useScrollReveal hook in frontend/hooks/useScrollReveal.ts (generic fade + translate animation)
- [x] T007 [P] Create useSplitText hook in frontend/hooks/useSplitText.ts (character/word splitting, mobile optimization, accessibility)
- [x] T008 [P] Create useVideoOnScroll hook in frontend/hooks/useVideoOnScroll.ts (video scroll-sync, reduced motion support)
- [x] T009 Create hooks barrel export in frontend/hooks/index.ts (export all custom hooks)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Immediate Brand Impression (Priority: P1) 🎯 MVP

**Goal**: Visitor lands on homepage and instantly understands premium brand positioning within 3 seconds through full-screen video and clear messaging

**Independent Test**: Load homepage and verify full-screen premium coffee visual appears with brand positioning ("Coffee for People Who Refuse Average Mornings") immediately clear. Video should progress smoothly when scrolling.

### Implementation for User Story 1

- [x] T010 [P] [US1] Create Button component in frontend/components/ui/Button.tsx (primary variant, brand colors, hover states)
- [x] T011 [US1] Create HeroSection component structure in frontend/components/sections/HeroSection.tsx (section wrapper, sticky video container, content layer)
- [x] T012 [US1] Implement video element in HeroSection with scroll-sync using useVideoOnScroll hook
- [x] T013 [US1] Add video overlays in HeroSection (brightness filter, gradient overlay for text contrast)
- [x] T014 [US1] Implement headline with character-by-character reveal using useSplitText hook in HeroSection
- [x] T015 [US1] Implement subheadline with fade reveal using useScrollReveal hook in HeroSection
- [x] T016 [US1] Add primary CTA button in HeroSection using Button component with delayed reveal
- [x] T017 [US1] Update home page in frontend/app/page.tsx to import and render HeroSection component

**Checkpoint**: At this point, User Story 1 should be fully functional - hero section displays with scroll-controlled video, animated text, and primary CTA

---

## Phase 4: User Story 2 - Engagement Through Scroll Control (Priority: P1)

**Goal**: Visitor explores hero by scrolling, creating interactive connection through scroll-controlled video that plays forward/reverse based on scroll direction

**Independent Test**: Scroll through hero section and verify video playback follows scroll position smoothly. Scroll up/down should move video forward/reverse. Pausing scroll should hold current frame without drift.

**Dependencies**: US1 must be complete (hero structure and video element exist)

### Implementation for User Story 2

- [x] T018 [US2] Enhance useVideoOnScroll hook to support bidirectional scroll (forward on scroll down, reverse on scroll up)
- [x] T019 [US2] Add scroll progress tracking in useVideoOnScroll to ensure frame-perfect synchronization
- [x] T020 [US2] Implement extended scroll area (h-[250vh]) in HeroSection for slow, deliberate video pacing
- [x] T021 [US2] Configure ScrollTrigger scrub value (scrub: 1) in useVideoOnScroll for smooth lag effect
- [x] T022 [US2] Add video pause on load in useVideoOnScroll (loadedmetadata event) to prevent auto-play
- [x] T023 [US2] Verify video holds frame when scroll stops (no drift or continued playback)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - hero displays (US1) AND video scrubs perfectly with scroll (US2)

---

## Phase 5: User Story 3 - Clear Call-to-Action Path (Priority: P1)

**Goal**: Visitor who resonates with brand can take immediate action through single prominent "Shop the Roast" CTA with no competing elements

**Independent Test**: Identify primary CTA button and verify it's the only actionable element. Button should provide hover feedback and be clearly visible after text animations complete.

**Dependencies**: US1 must be complete (Button component and HeroSection structure exist)

### Implementation for User Story 3

- [x] T024 [US3] Verify Button component primary variant styling matches brand (Burnt Gold #C89B3C background, Cream text)
- [x] T025 [US3] Implement hover feedback in Button component (scale transform, smooth transition)
- [x] T026 [US3] Add keyboard focus styling to Button component (visible focus ring for accessibility)
- [x] T027 [US3] Verify CTA appears with 0.5 second delay after subheadline in HeroSection
- [x] T028 [US3] Ensure no competing CTAs or distracting elements present in HeroSection (single CTA only)
- [x] T029 [US3] Add onClick handler to CTA button (placeholder navigation to product page)

**Checkpoint**: All P1 user stories should now be independently functional - hero displays (US1), video scrubs with scroll (US2), AND single clear CTA is actionable (US3)

---

## Phase 6: User Story 4 - Mobile-Optimized Experience (Priority: P2)

**Goal**: Mobile visitor accesses hero on smartphone and receives optimized experience with simplified animations, readable text, and thumb-zone CTA positioning

**Independent Test**: Load hero on mobile device (or Chrome DevTools mobile emulator) and verify video loads within 3 seconds, text is legible, animations are simplified, and CTA is positioned in bottom third (thumb-zone).

**Dependencies**: US1, US2, US3 must be complete (full desktop experience exists)

### Implementation for User Story 4

- [x] T030 [P] [US4] Add mobile detection logic to useSplitText hook (switch from chars to words on screens <768px)
- [x] T031 [P] [US4] Implement mobile animation simplification in useSplitText (faster stagger 0.15s, shorter duration 0.6s)
- [x] T032 [P] [US4] Add responsive typography in HeroSection (text-5xl md:text-7xl for headline)
- [x] T033 [US4] Implement thumb-zone CTA positioning on mobile in HeroSection (absolute bottom positioning on small screens)
- [x] T034 [US4] Add sticky CTA behavior on mobile scroll in HeroSection (fixed bottom on scroll past fold)
- [ ] T035 [US4] Verify video loads within 3 seconds on throttled 3G connection (Chrome DevTools network throttling) - REQUIRES MANUAL TESTING
- [ ] T036 [US4] Test text contrast on mobile devices (ensure 4.5:1 ratio with video background) - REQUIRES MANUAL TESTING

**Checkpoint**: All user stories (P1 + P2) should now be independently functional with full mobile optimization

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance optimization, and final validation

- [x] T037 [P] Verify reduced motion support in useVideoOnScroll (prefers-reduced-motion: reduce disables scroll-sync)
- [x] T038 [P] Verify reduced motion support in useSplitText (simplified to fade-only when reduced motion enabled)
- [x] T039 [P] Add video poster frame fallback in HeroSection (static image for failed video loads)
- [x] T040 [P] Implement wide screen layout constraints in HeroSection (max-width 1280px, centered content)
- [ ] T041 Run Lighthouse audit and verify Performance score ≥90 (target: FCP <1.5s, LCP <2.5s) - REQUIRES MANUAL TESTING
- [ ] T042 Run accessibility audit and verify WCAG 2.1 Level AA compliance (contrast 4.5:1, keyboard navigation) - REQUIRES MANUAL TESTING
- [ ] T043 Test animation performance and verify 60fps maintained during scroll (Chrome DevTools Performance tab) - REQUIRES MANUAL TESTING
- [x] T044 Verify cleanup functions in all custom hooks (no memory leaks on unmount)
- [ ] T045 Run through quickstart.md validation checklist (video optimized, animations deliberate, mobile tested) - REQUIRES MANUAL TESTING
- [x] T046 Format code with Prettier and verify ESLint passes (npm run format && npm run lint)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T003) completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (T004-T009) completion - Foundation for US2 and US3
- **User Story 2 (Phase 4)**: Depends on US1 (T010-T017) completion - Requires hero structure and video element
- **User Story 3 (Phase 5)**: Depends on US1 (T010-T017) completion - Requires Button component and hero structure
- **User Story 4 (Phase 6)**: Depends on US1, US2, US3 completion - Optimizes existing desktop experience
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 - Enhances video scroll behavior of existing hero
- **User Story 3 (P1)**: Depends on User Story 1 - Enhances CTA behavior of existing hero
- **User Story 4 (P2)**: Depends on User Stories 1, 2, 3 - Optimizes complete desktop experience for mobile

### Within Each User Story

**User Story 1**:
- T010 (Button) and T011 (HeroSection structure) can start in parallel
- T012-T016 must complete in sequence (video → overlays → headline → subheadline → CTA)
- T017 (update page.tsx) must be last after T010-T016 complete

**User Story 2**:
- All tasks (T018-T023) are sequential enhancements to useVideoOnScroll hook

**User Story 3**:
- T024-T026 (Button enhancements) can run in parallel
- T027-T029 (HeroSection CTA verification) must follow T024-T026

**User Story 4**:
- T030-T032 can run in parallel (different files/concerns)
- T033-T037 must complete in sequence (positioning → sticky → load test → contrast)

**Polish Phase**:
- T037-T040 can run in parallel (different concerns)
- T041-T046 should run sequentially (audits and validation)

### Parallel Opportunities

**Phase 1 (Setup)**:
- T002 (utils) and T003 (types) can run in parallel with T001 (video optimization)

**Phase 2 (Foundational)**:
- After T004-T005 complete: T006, T007, T008 can all run in parallel (different hook files)

**Phase 3 (User Story 1)**:
- T010 (Button) and T011 (HeroSection) can run in parallel at start

**Phase 4 (User Story 2)**:
- All sequential (single file modifications)

**Phase 5 (User Story 3)**:
- T024-T026 can run in parallel (Button component)

**Phase 6 (User Story 4)**:
- T030, T031, T032 can run in parallel (different files)

**Phase 7 (Polish)**:
- T037, T038, T039, T040 can run in parallel (different concerns)

---

## Parallel Example: Foundational Phase

```bash
# After T004-T005 complete, launch hook creation in parallel:
Task: "Create useScrollReveal hook in frontend/hooks/useScrollReveal.ts"
Task: "Create useSplitText hook in frontend/hooks/useSplitText.ts"
Task: "Create useVideoOnScroll hook in frontend/hooks/useVideoOnScroll.ts"

# Then T009 creates barrel export after all hooks complete
```

## Parallel Example: User Story 1

```bash
# Launch Button and HeroSection structure together:
Task: "Create Button component in frontend/components/ui/Button.tsx"
Task: "Create HeroSection component structure in frontend/components/sections/HeroSection.tsx"

# After both complete, proceed with sequential HeroSection enhancements
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T009) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T010-T017)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Load homepage
   - Verify full-screen hero with video
   - Verify headline, subheadline, and CTA appear
   - Test scroll (video should move with scroll)
5. Deploy/demo if ready

**At this checkpoint**: You have a functional hero section that displays brand positioning, shows scroll-controlled video, and has a primary CTA. This is the minimum viable hero section.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (T001-T009)
2. Add User Story 1 → Test independently → Deploy/Demo (T010-T017) **MVP!**
3. Add User Story 2 → Test independently → Deploy/Demo (T018-T023) - Enhanced scroll control
4. Add User Story 3 → Test independently → Deploy/Demo (T024-T029) - Polished CTA
5. Add User Story 4 → Test independently → Deploy/Demo (T030-T036) - Mobile optimized
6. Add Polish → Final validation → Production ready (T037-T046)

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T009)
2. Once Foundational is done:
   - Developer A: Completes User Story 1 (T010-T017) - Foundation for all
3. Once US1 complete:
   - Developer A: User Story 2 (T018-T023) - Video scroll enhancements
   - Developer B: User Story 3 (T024-T029) - CTA enhancements (parallel to US2!)
4. Once US1, US2, US3 complete:
   - Developer A or B: User Story 4 (T030-T036) - Mobile optimization
5. Team: Polish together (T037-T046)

**Note**: US2 and US3 can be worked on in parallel by different developers since they enhance different aspects of US1 (video scroll vs CTA behavior).

---

## Task Summary

**Total Tasks**: 46
- **Setup**: 3 tasks
- **Foundational**: 6 tasks (BLOCKING)
- **User Story 1 (P1)**: 8 tasks
- **User Story 2 (P1)**: 6 tasks
- **User Story 3 (P1)**: 6 tasks
- **User Story 4 (P2)**: 7 tasks
- **Polish**: 10 tasks

**Parallel Opportunities Identified**: 15 tasks marked [P]

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 (17 tasks) delivers functional hero section

**Independent Test Criteria**:
- **US1**: Homepage loads with full-screen hero, video, headline, subheadline, and CTA
- **US2**: Video scrubs forward/reverse with scroll direction, holds frame when stopped
- **US3**: Single primary CTA with hover feedback, no competing elements
- **US4**: Mobile loads <3s, animations simplified, CTA in thumb-zone

---

## Notes

- **[P] tasks** = different files, no dependencies, can run in parallel
- **[Story] label** maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Video optimization (T001) is prerequisite - run ffmpeg command first
- Foundational phase (T004-T009) blocks all user stories - complete before US work
- US2 and US3 can run in parallel after US1 (different file concerns)
- Refer to quickstart.md for development setup and testing procedures
- Refer to research.md for technical decisions and implementation patterns
- All animations must follow constitution "slow, deliberate, confident" principle
- Performance targets: FCP <1.5s, LCP <2.5s, 60fps, Lighthouse ≥90
