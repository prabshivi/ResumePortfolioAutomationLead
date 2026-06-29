# Shivi Prabhakar — Interactive Apple-Style Portfolio

An enterprise-grade, high-performance web portfolio built to showcase a decade of QA Automation leadership, SDET architecture, and continuous delivery engineering. This project leverages a premium, ultra-minimalist layout modeled closely on modern product presentation pages to communicate technical specifications and career milestones with absolute clarity.

---

## 🛠️ Detailed Tech Stack & Engineering Mechanics

To deliver a seamless user experience without performance lag or frame drops, the site relies on a modern, utility-first front-end stack:

### 1. Layout & Styling: Tailwind CSS
* **Utility-First Paradigm:** Eliminates bloated, unoptimized custom CSS files by utilizing pre-compiled, atomic utility classes directly within the markup.
* **Apple Aesthetic Replication:** Implements sub-pixel antialiasing (`antialiased`), absolute dark-mode canvas baselines (`bg-[#04020b]`), and high-contrast, muted typography hierarchies (`text-themeText` and `text-themeTextMuted`) to mirror standard hardware showcase aesthetics.
* **Responsive Fluid Grid:** Uses Tailwind’s breakpoint system (`grid-cols-1 md:grid-cols-3`) to seamlessly reflow structural Bento grid modules between mobile layouts and expansive ultra-wide desktop displays.

### 2. Core Animation Engine: GSAP (GreenSock Animation Platform)
* **High-Performance Tweens:** Bypasses standard CSS transitions in favor of GSAP’s high-performance animation engine, which updates inline properties directly via the browser's requestAnimationFrame loop for hardware-accelerated rendering.
* **Cinematic Keyframes:** Handles complex, multi-stage element properties—such as the scaling and cinematic text-gradient fade reveals on the main hero stage—with precise timing control curves (`ease: "power3.out"`).

### 3. Scroll Orchestration & Pinning: GSAP ScrollTrigger
* **Scrollytelling Mechanics:** Converts standard vertical viewport scrolling into an active interaction axis. 
- **Cross-Browser CSS Pinning:** Implements a scroll-locked timeline (`scrub: 1`) on the experience track, locking the user’s viewport container dynamically over a `500vh` scroll distance while transitioning sequential experience data layers in and out of view.
- **Cross-Browser Layout Adjustments:** Avoids breaking the CSS `position: sticky` context on mobile and desktop browsers by replacing standard scroll-breaking `overflow-x: hidden` parent properties with `overflow-x: clip`.

### 4. Interactive 3D Graphics: Three.js
- **Dynamic Background Canvas**: Renders a fixed, real-time 3D canvas featuring a particle node network, a glassmorphic torus (symbolizing QA loops), and a high-metalness icosahedron (representing security core nodes).
- **Interactive Inertia**: Objects rotate and respond dynamically to user mouse position and scroll progression, providing smooth perspective shifts and depth.

### 5. Demographics & Telemetry: Vercel Web Analytics & Speed Insights
- **User Demographics**: Tracks browser information, device type (Desktop, Mobile, Tablet), operating system, and geolocation automatically through request metadata parsing.
- **Performance Monitoring**: Measures real-world Core Web Vitals (LCP, FID, CLS) across all mobile and desktop browsers using Speed Insights.

---

## 📐 Architecture & Section Breakdown

* **The Stage (Hero Reveal):** A high-impact introductory block that relies on a progressive opacity reveal to immediately frame 10 years of automation experience.
* **The Keynote (Interactive Timeline):** A single-container timeline that cycles through core leadership positions at Empire Life and Royal Bank of Canada. It keeps the viewer focused on one key milestone at a time, displaying technologies right alongside metrics.
* **The Tech Spec Sheet (Bento Grid):** An asymmetric layout block mapping out specialized capabilities in framework engineering (Selenium, Cypress, Testim), core back-end testing architectures, performance profiles (JMeter), and enterprise continuous integration (GitHub Actions).

---

## 🧪 Automated Testing & CI/CD Validation

The project features a complete multi-environment testing suite powered by **Playwright**:
- **Playwright Configuration ([playwright.config.js](file:///Users/shiviprabhakar/Documents/Github/ResumePortfolioAutomationLead/playwright.config.js))**: Establishes a browser and viewport testing matrix across Desktop Chrome (Chromium), Desktop Firefox, Desktop Safari (WebKit), Mobile Safari (emulating iPhone 14 viewport), and Mobile Chrome (emulating Pixel 5 viewport).
- **Regression Suite ([tests/portfolio.spec.js](file:///Users/shiviprabhakar/Documents/Github/ResumePortfolioAutomationLead/tests/portfolio.spec.js))**:
  - Validates critical layout, branding, and structural bento cards.
  - Automates scrolling and verifies that the GSAP/ScrollTrigger scrollytelling experience correctly displays the correct text cards (opacity > 0.8) at their designated scroll coordinates and hides other slides.
- **CI/CD Integration ([playwright.yml](file:///Users/shiviprabhakar/Documents/Github/ResumePortfolioAutomationLead/.github/workflows/playwright.yml))**: Automatically runs the test matrix in a headless Linux container on push and pull-request events.

---

## 📄 Documentation & References

This implementation is built strictly upon the formal API patterns, framework design principles, and specifications found within the official platform documentation:

* **Tailwind CSS Configuration & Styling:** Reference the [Tailwind CSS Documentation](https://tailwindcss.com/docs) for extending utility classes, background opacities, and responsive grid layouts.
* **GSAP Core Mechanics:** Reference the [GSAP Core Documentation](https://gsap.com/docs/v3/GSAP/) for handling element arrays, timing deltas, and programmatic easing transitions.
* **ScrollTrigger Scroll Locking:** Reference the [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) for calculating triggers, configuring container pinning, and scrubbing active timelines across viewport distances.
* **Three.js Graphics API**: Reference the [Three.js Documentation](https://threejs.org/docs/) for WebGL material mapping, point lights, and math helpers.
* **Vercel Analytics & Speed Insights Integration**: Reference the [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics) for static HTML integrations.