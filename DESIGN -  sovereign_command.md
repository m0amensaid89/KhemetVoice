# Design System Specification

## 1. Overview & Creative North Star
**The Creative North Star: "The Sovereign Intelligence"**

This design system is a bridge between the monolithic weight of ancient monuments and the light-speed precision of a quantum command center. We are moving away from "bubbly" SaaS aesthetics toward a high-end, editorial HUD (Heads-Up Display) experience. 

The system avoids the "template" look by utilizing intentional asymmetry, modular "widget" logic, and a cinematic depth that feels like a physical object rather than a flat webpage. It is designed to feel authoritative and elite, specifically tailored for the high-stakes enterprise environments of the MENA region.

---

## 2. Colors: Tonal Depth & Signature Textures

The palette is rooted in the deep obsidian of the Egyptian night, punctuated by the "electric life" of modern AI.

### Core Palette
- **Primary Background:** `#031427` (Deep Obsidian). The foundation of the "Control Room."
- **Primary Accent:** `primary_container` (`#2563eb`). Use for logical paths and primary actions.
- **Secondary Accent:** `secondary` (`#4cd7f6`). Reserved for "Live" states: voice activity, waveforms, and active AI processing.
- **The Highlight:** `tertiary` (`#f9bd22`). Used only for premium emphasis, security alerts, or high-tier enterprise features.

### The "No-Line" Rule
Standard 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through:
1.  **Tonal Shifts:** Placing a `surface_container_low` section against a `surface` background.
2.  **Vertical Space:** Using the spacing scale to create clear mental models of content grouping.
3.  **Ghost Borders:** If a boundary is required for accessibility, use the `outline_variant` token at **15% opacity**.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Each "inner" container should move up the tier:
- **Level 0 (Base):** `surface`
- **Level 1 (Panels):** `surface_container_low`
- **Level 2 (Active Modules):** `surface_container_high`

### The "Glass & Gradient" Rule
To achieve a "Cinematic AI" feel, floating elements (modals, tooltips) must use **Glassmorphism**: 
- Background: `surface_container` at 80% opacity.
- Backdrop Blur: `12px` to `20px`.
- Edge: A top-down subtle gradient (Primary to Primary-Container at 10% opacity) to simulate a light-catching glass edge.

---

## 3. Typography: Authoritative Precision

The typography system reflects a balance between the ancient (Cinzel Decorative) and the functional (Inter/Space Grotesk).

- **Display & Headlines:** Use `display-lg` through `headline-sm`. These utilize `spaceGrotesk` (or `Cinzel Decorative` for brand-heavy editorial moments). These should feel sharp and structured.
- **Titles & Labels:** Use `title-md` and `label-md` in `inter`. For metadata, use All-Caps with `0.05em` tracking to mimic technical instrumentation.
- **Body:** `inter`. High-contrast white (`#F8FAFC`) for readability against the obsidian background, and muted slate (`#64748B`) for secondary information.

---

## 4. Elevation & Depth: Tonal Layering

We do not use traditional drop shadows. Depth is achieved via **Tonal Layering**.

- **The Layering Principle:** A "floating" module is not defined by a shadow, but by being one step higher in the `surface-container` scale than the layer beneath it.
- **Ambient Shadows:** When a true lift is required (e.g., a floating command palette), use an extra-diffused shadow:
    - Blur: `40px`
    - Color: `surface_tint` (`#b4c5ff`) at **5% opacity**. This creates a soft, holographic glow rather than a heavy dark shadow.
- **Glassmorphism & Depth:** Use semi-transparent surface colors to allow the "glow" of background waveforms or data visualizations to bleed through, making the UI feel integrated into a singular atmosphere.

---

## 5. Components: Modular Units

### Buttons
- **Primary:** `primary_container` background. Sharp corners (`radius: sm` - `0.125rem`). No gradients.
- **Secondary:** Transparent background with a `Ghost Border` (outline-variant at 20%).
- **Tertiary:** Text-only in `secondary_fixed_dim`. Used for low-priority system actions.

### Cards & Modules
- **Rule:** Forbid divider lines within cards.
- **Style:** Use `surface_container_low`. On hover, transition to `surface_container_highest` with a 200ms ease.
- **Header:** Use a `tertiary` (Gold) accent line (2px height, 24px width) in the top-left corner of primary modules to denote "Elite" status.

### Voice & AI Waveforms
- **Color:** Always `secondary` (`#06B6D4`). 
- **Motion:** Waveforms should utilize a "glow" effect using the `secondary_container` color to simulate light emission.

### Input Fields
- **Style:** Underline-only or subtle `surface_container_highest` fills. 
- **States:** Focus state should shift the underline to `primary` (`#2563EB`) with a subtle outer glow.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts to guide the eye (e.g., a heavy left-aligned data column balanced by a large, airy visualization area).
- **Do** use the Spacing Scale rigorously. Vertical rhythm is your primary tool for organization.
- **Do** use the Amber/Gold highlight (`#FBBF24`) sparingly—think of it as "digital jewelry."

### Don't
- **Don't** use rounded/pill-shaped buttons. They break the "Futuristic Command Center" aesthetic. Stick to `sm` (0.125rem) or `none` (0px) radii.
- **Don't** use pure black (`#000000`). It kills the cinematic depth of the obsidian navy background.
- **Don't** use standard "startup" gradients. Use tonal shifts and light-leaks instead.
- **Don't** use 100% opaque borders. They create visual "noise" and cheapen the premium feel.

---

## 7. Spacing & Grid Logic
The system relies on a **12-column modular grid** with a **24px gutter**. 
- **Padding:** Use `xl` (0.75rem) as the base padding for modules.
- **Structure:** Align elements to a rigorous baseline. In an "AI Operating System," mathematical precision is a signal of trustworthiness and power.