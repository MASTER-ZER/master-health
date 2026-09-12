---
name: Master Health | ماستر هيلث
colors:
  surface: '#f9f9ff'
  surface-dim: '#d4daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#e3e8f9'
  surface-container-highest: '#dde2f3'
  on-surface: '#161c27'
  on-surface-variant: '#414750'
  inverse-surface: '#2a303d'
  inverse-on-surface: '#ecf0ff'
  outline: '#727782'
  outline-variant: '#c1c7d2'
  surface-tint: '#1960a3'
  primary: '#005394'
  on-primary: '#ffffff'
  primary-container: '#2b6cb0'
  on-primary-container: '#e1ecff'
  inverse-primary: '#a2c9ff'
  secondary: '#006d40'
  on-secondary: '#ffffff'
  secondary-container: '#8ef5b5'
  on-secondary-container: '#007243'
  tertiary: '#784600'
  on-tertiary: '#ffffff'
  tertiary-container: '#9a5b00'
  on-tertiary-container: '#ffe7d2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004881'
  secondary-fixed: '#91f8b8'
  secondary-fixed-dim: '#74db9d'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#00522f'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86e'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#f9f9ff'
  on-background: '#161c27'
  surface-variant: '#dde2f3'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 3rem
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.375rem
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 1.875rem
    fontWeight: '600'
    lineHeight: 2.5rem
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
  headline-md:
    fontFamily: Noto Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2.125rem
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Noto Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Noto Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-sm:
    fontFamily: Noto Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
  label-lg:
    fontFamily: Noto Sans
    fontSize: 0.9375rem
    fontWeight: '600'
    lineHeight: 1.375rem
  label-md:
    fontFamily: Noto Sans
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  label-sm:
    fontFamily: Noto Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1.125rem
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a serene, reassuring, and precise digital clinical environment tailored for bilingual Arabic and English patient experiences, prioritizing primary right-to-left (RTL) workflows. The aesthetic reflects modern clinical care: minimal visual noise, generous structural whitespace, rigorous structural alignment, and absolute clarity of critical health details.

### Emotional Target & Voice
- **Reassurance & Calm**: Softening clinical anxiety through structured hierarchy, open pacing, and balanced tones.
- **Precision & Trust**: Unambiguous data presentation, distinct status markers, and accessible, dignified interactions.
- **Accessibility First**: Legible at distance or under stress; free of unnecessary decorative flourishes, skeuomorphic noise, or high-friction micro-interactions.

### Visual Style
The interface employs a **Modern Healthcare Minimalist** foundation paired with subtle tonal layering and soft ambient depth. Components present crisp container bounds, tactile tactile surfaces, and deliberate semantic accents.

## Colors

The color palette centers on a deep, reassuring clinical blue balanced by organic restorative green for forward-moving patient milestones. Contrast ratios strictly exceed WCAG 2.1 AA across body copy, interactive elements, and critical notifications.

### Palette Architecture
- **Primary Brand (`#2B6CB0`)**: Anchors primary navigation, active states, key interactive controls, and structural identity.
- **Secondary / Success (`#38A169`)**: Reserved for positive patient actions, booking completions, confirmed health records, and reassuring indicators.
- **Tertiary / Warning (`#D69E2E`)**: Signals pending lab results, scheduled callbacks, and cautionary notices without inducing panic.
- **Destructive / Error (`#E53E3E`)**: Clear, non-jarring feedback for missed appointments, critical vitals, and form validation blocks.
- **Background (`#F7FAFC`)**: Soft, tinted off-white that reduces eye fatigue across long consultation reads.
- **Surface Cards (`#FFFFFF`)**: Bright elevated containers bounded by hairline borders (`#E2E8F0`).
- **Typography**: Primary content reads in deep charcoal (`#1A202C`) to avoid stark harshness, paired with supporting slate (`#4A5568`).

## Typography

Typography prioritizes exceptional legibility across both Arabic (Kufi/Modern Naskh characteristics) and Latin character sets. Line heights are calibrated wider than typical English baselines (1.6x to 1.8x) to accommodate Arabic ascenders, descenders, and diacritical marks without vertical crowding.

### Principles
- **Baseline Openness**: Body text maintains a minimum line-height of 1.75rem on 1rem font sizes, preventing calligraphic overlap.
- **RTL Fluidity**: Headings and titles preserve balanced optical weight in Arabic script, avoiding false bolds that degrade letterform counters.
- **Numerals**: Interface defaults to contextual standard numerals while ensuring financial and dosage figures remain legible and unobstructed.

## Layout & Spacing

The layout model is anchored on an 8pt spatial grid configured to a default right-to-left (`dir="rtl"`) context, reflowing dynamically when flipped to LTR.

### Spatial Rhythms & Grid
- **Mobile (<768px)**: 4-column fluid layout with `1rem` outer margin and `1rem` gutters.
- **Tablet (768px–1024px)**: 8-column layout with `2rem` outer margin and `1.5rem` gutters.
- **Desktop (>1024px)**: 12-column layout maxed at `1280px` canvas with `3rem` margins and `2rem` gutters.

### Structural Flow
- All inline offsets must use CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline`) to ensure bidirectional support.
- Major clinical workflows (doctor profiles, appointment slots, prescription overviews) utilize asymmetrical split containers with primary context on the right (RTL start) and summary/actions anchored on the left.

## Elevation & Depth

This design system uses a quiet elevation strategy that pairs crisp border containment with softly diffuse, colored ambient drop shadows. Surfaces do not rely on aggressive dark shadows, which feel clinical in an industrial rather than therapeutic sense.

### Elevation Hierarchy
- **Level 0 (Flat)**: Base canvas `#F7FAFC`. Flat cards and secondary segmented controls sit with `border: 1px solid #E2E8F0` and no shadow.
- **Level 1 (Card Default)**: Core interactive cards and clinical panels. `#FFFFFF` surface with `border: 1px solid #E2E8F0` and `box-shadow: 0 1px 3px rgba(26, 32, 44, 0.04), 0 4px 8px rgba(43, 108, 176, 0.03)`.
- **Level 2 (Interactive Hover / Dropdown)**: Hovered appointment items, popovers, and pickers. `box-shadow: 0 4px 12px rgba(26, 32, 44, 0.06), 0 8px 24px rgba(43, 108, 176, 0.05)`.
- **Level 3 (Modals / Sticky Actions)**: Critical patient alerts, booking drawers, and floating appointment triggers. `box-shadow: 0 12px 32px rgba(26, 32, 44, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)`.

## Shapes

The geometric framework utilizes balanced, humane curvature to communicate safety and modern precision without feeling childlike or overly tech-forward.

### Corner Radius System
- **Base (0.5rem / 8px)**: Standard inputs, small badges, buttons, and alert strips.
- **Large (1rem / 16px)**: Core clinic appointment cards, summary cards, prescription panels, and modal containers.
- **Extra-Large (1.5rem / 24px)**: Major dashboard hero panels and persistent bottom sheets on mobile.
- **Pill / Circular (9999px)**: Status badges, category filtering chips, and avatar containers.

## Components

### Buttons
- **Primary Action (Confirm / Book CTA)**: Solid `#38A169` fill with white text, `0.5rem` radius, and `0.75rem 1.5rem` padding. Hover introduces a subtle darkening to `#2F855A` with no scale shifts.
- **Brand / Secondary**: Solid `#2B6CB0` fill for administrative actions or deep navigation. Hover shifts to `#2C5282`.
- **Outline / Neutral**: Transparent background, `1px solid #E2E8F0`, text color `#1A202C`. Hover sets background to `#EDF2F7`.
- **Icon Placement**: In RTL, trailing icons represent advancement and sit to the physical left (`inline-end`).

### Input Fields & Controls
- **Form Inputs**: Height `48px`, `#FFFFFF` fill, `1px solid #E2E8F0`, radius `0.5rem`. Label aligned to `inline-start` above the field. Focused state applies `border-color: #2B6CB0` with a `0 0 0 3px rgba(43, 108, 176, 0.15)` focus ring.
- **Checkboxes & Radios**: `20px` size, `#2B6CB0` active fill with high-contrast white check/dot. Unchecked uses `#CBD5E0` border.

### Cards & Clinic Listings
- **Doctor / Appointment Card**: White background, `1px solid #E2E8F0`, `1rem` radius, Level 1 shadow. Layout features physician avatar and credentials at `inline-start`, specialty tags centrally, and availability / CTA at `inline-end`.

### Chips & Badges
- **Status Badges**: Semi-transparent background fills paired with high-contrast foreground text.
  - *Confirmed*: `#C6F6D5` background with `#22543D` text.
  - *Pending*: `#FEFCBF` background with `#744210` text.
  - *Cancelled*: `#FED7D7` background with `#742A2A` text.
- **Filter Chips**: Pill shape, background `#EDF2F7`, text `#4A5568`. Active state shifts to `#2B6CB0` background with white text.

### Clinical Time-Slot Selector
- Segmented grid of buttons displaying available appointment hours. Inactive slots use `#FFFFFF` with `#E2E8F0` border; selected slot uses `#2B6CB0` with white text; booked/unavailable slots carry `#EDF2F7` background, `#A0AEC0` muted text, and a strikethrough.