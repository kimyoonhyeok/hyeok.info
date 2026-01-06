# Product Specification Document for Final Verification

## 1. Project Overview
- **Project Name**: Yoonhyeok Kim Portfolio (hyeok.info)
- **Tech Stack**: Next.js 14, React, TypeScript, CSS Modules, Swiper.js
- **Objective**: Verify design fidelity, functional integrity, and responsive behavior across all target devices and browsers.

## 2. Target Test Environments
- **Primary Mobile**: iOS Safari (iPhone 13/14/15 Pro Max), Android Chrome (Samsung/Pixel).
- **Tablets**: iPad (Portrait/Landscape), Galaxy Tab.
- **Desktop**: Chrome, Safari, Firefox (macOS & Windows).
- **Network Conditions**: Test on both Wi-Fi and 4G/5G to ensure asset loading performance.

## 3. Core Verification Checklist

### A. Visual Identity & Typography
- [ ] **Font Rendering**: 
    - Verify `agchoijeongho-screen` loads correctly without flickering (FOUC).
    - **Safari Specific**: Confirm Footer font weight is not too bold (should be `400`/Light).
    - **Korean Text**: Ensure correct font fallback (no "Gulim/Batang" default look).
- [ ] **Custom Cursor**:
    - Confirm SVG cursor (`cursor_default.svg`, `cursor_hover.svg`) follows mouse accurately.
    - Confirm cursor disappears/resets on Touch devices (Mobile/Tablet).

### B. Page-Specific Inspections

#### 1. Home Page (`/`)
- [ ] **Entrance Image**: 
    - Check shadow intensity and centering.
    - Mobile: Image size should be ~150% of original reference (large and impactful).
- [ ] **Footer Flow**: 
    - **Mobile**: Footer must flow naturally after the image (no overlap, no fixed bottom if content is tall).
    - **Desktop**: Footer should be positioned correctly based on viewport height.

#### 2. Works Page (`/works`)
- [ ] **Grid Layout**:
    - Desktop: 3 Columns.
    - Tablet: 2 Columns.
    - Mobile: 1 Column.
- [ ] **Project Thumbnails**:
    - **Hover Effect**: Opacity should drop to **0.55** (strong transparency) on hover.
    - **Video Thumbnails (`TD`, `AcademicMotionGraphic`)**:
        - Aspect Ratio: **13:10** (1300x1000).
        - Rendering: No black bars, no cropping (Object-fit: Contain).
        - Playback: Autoplay, Loop, Muted. **Must play on iOS Low Power Mode**.
    - **Image Thumbnails**: Aspect Ratio 1.3 default.

#### 3. Project Detail Page (`/works/[slug]`)
- [ ] **Navigation (Slider)**:
    - **Desktop**: Split screen. Right side clicks to advance slides. `Swiper` should NOT drag.
    - **Mobile/Tablet**: Horizontal Scroll/Slider. Swipe enabled.
- [ ] **Asset Rendering**:
    - Verify high-res images load.
    - Verify Videos (`04.mp4` in `lovingYou`, etc.) play automatically.
    - **Tablet Clipping**: Ensure tall images are not cut off by header/footer (padding check).
- [ ] **Scroll Restoration**:
    - Navigate Works -> Project -> Back to Works. Page must return to exact scroll position.

#### 4. About Page (`/about`)
- [ ] **Typography**:
    - **Hanging Indents**: Years (e.g., '2025') should stand apart, text should align in a block.
    - **Capitalization**: All English words in lists must be Capitalized (e.g., "Editorial Design").
- [ ] **Layout**:
    - Check responsive stacking of columns on Mobile.

### C. Functionality & Logic
- [ ] **Navigation Links**:
    - Header links (Works, About, Brief) must work and highlight active state.
    - "Hyeok" logo returns to Home.
- [ ] **Transitions**:
    - Page transitions should be smooth (Fade in/out).
- [ ] **Errors**:
    - Check Console for red errors (Hydration mismatches, 404s).

## 4. Known Regression Tests (Do Not Skip)
1.  **TD & Academic Thumbnail Size**: These two must look IDENTICAL in size and alignment.
2.  **Home Mobile Footer**: Must not float in the middle of the screen on large phones.
3.  **Safari Fonts**: Must not look "thicker" than Chrome.
4.  **Hover Opacity**: Must be visibly strong (0.55).

## 5. Final Output Expectation
- A pass/fail report for each item.
- Screenshots of any visual regressions.
- Console logs for any functional errors.
