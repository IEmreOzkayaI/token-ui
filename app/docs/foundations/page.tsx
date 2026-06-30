import Link from "next/link"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "architecture", title: "Architecture" },
  { id: "colors", title: "Colors", depth: 2 },
  { id: "typography", title: "Typography", depth: 2 },
  { id: "spacing", title: "Spacing", depth: 2 },
  { id: "radius", title: "Border Radius", depth: 2 },
  { id: "shadows", title: "Shadows", depth: 2 },
  { id: "transitions", title: "Transitions", depth: 2 },
  { id: "z-index", title: "Z-Index", depth: 2 },
  { id: "usage", title: "Usage" },
]

export default function FoundationsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Design Foundations"
        description="Centralized CSS variable tokens for colors, typography, spacing, shadows, radius, transitions, and z-index. Optimized for consistency and performance."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI foundations are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>. They ensure visual consistency across all components while enabling light/dark mode support and easy customization.
        </p>
        <div className="space-y-3">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📍 Source Location</p>
            <code className="text-xs">app/globals.css — :root and .dark selectors</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">🎨 Format</p>
            <p className="text-sm">CSS custom properties (variables) with OKLCH color space for perceptual uniformity</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">🔗 Integration</p>
            <p className="text-sm">Native CSS + Tailwind @theme export + TypeScript support</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="architecture" title="Architecture">
        <p className="text-muted-foreground mb-6">
          Complete foundation system with 10 token categories:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Color System</h4>
            <p className="text-xs text-muted-foreground mb-2">OKLCH perceptual colors with semantic roles (primary, secondary, accent, destructive) plus status colors (warning, success, info)</p>
            <code className="text-xs">--primary, --secondary, --accent, --destructive, --warning, --success, --info</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Typography</h4>
            <p className="text-xs text-muted-foreground mb-2">11-level font size scale (xs to 7xl), 5 font weights, line heights, and letter spacing</p>
            <code className="text-xs">--font-size-xs to --font-size-7xl, --font-weight-*, --line-height-*</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Spacing</h4>
            <p className="text-xs text-muted-foreground mb-2">8px-based scale from 0 to 32rem (512px) for margins, paddings, and gaps</p>
            <code className="text-xs">--space-0 to --space-32 (0, 0.25rem, 0.5rem, ...)</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Border Radius</h4>
            <p className="text-xs text-muted-foreground mb-2">7-level semantic scale from sharp (sm) to full circles (full)</p>
            <code className="text-xs">--radius-sm to --radius-full, --radius-3xl</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Shadows</h4>
            <p className="text-xs text-muted-foreground mb-2">7 elevation levels for depth perception, adjusted for dark mode</p>
            <code className="text-xs">--shadow-none, --shadow-xs to --shadow-2xl</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Motion</h4>
            <p className="text-xs text-muted-foreground mb-2">3 transition speeds (fast, base, slow) with cubic-bezier easing</p>
            <code className="text-xs">--transition-fast, --transition-base, --transition-slow</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Z-Index</h4>
            <p className="text-xs text-muted-foreground mb-2">Semantic stacking context from dropdown (1000) to tooltip (1070)</p>
            <code className="text-xs">--z-dropdown to --z-tooltip</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Sidebar</h4>
            <p className="text-xs text-muted-foreground mb-2">Component-specific color tokens for sidebar styling</p>
            <code className="text-xs">--sidebar, --sidebar-foreground, --sidebar-primary</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Charts</h4>
            <p className="text-xs text-muted-foreground mb-2">5 distinct colors for data visualization charts</p>
            <code className="text-xs">--chart-1 to --chart-5</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Opacity</h4>
            <p className="text-xs text-muted-foreground mb-2">Standard opacity values for disabled states and interactions</p>
            <code className="text-xs">--opacity-disabled, --opacity-hover, --opacity-focus</code>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="colors" title="Colors">
        <p className="text-muted-foreground mb-6">
          OKLCH perceptually uniform colors with semantic roles and automatic dark mode support.
        </p>
        <DocsCallout title="Color System" variant="info">
          Token UI uses OKLCH color space for perceptually uniform colors across light and dark modes. Each color has a light and dark variant that maintains proper contrast ratios.
        </DocsCallout>
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Semantic Color Roles</h4>
            <CodeBlock code={`/* Color roles in app/globals.css */
:root {
  --primary: oklch(0.488 0.243 264.376);      /* Blue */
  --secondary: oklch(0.967 0.001 286.375);    /* Light neutral */
  --accent: oklch(0.488 0.243 264.376);       /* Accent */
  --destructive: oklch(0.577 0.245 27.325);   /* Red */
  --warning: oklch(0.715 0.171 70.08);        /* Orange */
  --success: oklch(0.577 0.191 142.495);      /* Green */
  --info: oklch(0.488 0.243 264.376);         /* Blue */
  --muted: oklch(0.97 0 0);                   /* Light gray */
}

.dark {
  --primary: oklch(0.424 0.199 265.638);      /* Lighter blue */
  --secondary: oklch(0.274 0.006 286.033);    /* Dark neutral */
  /* ... */
}`} />
          </div>
          <div>
            <h4 className="font-semibold mb-3">Usage</h4>
            <CodeBlock code={`/* CSS Variables */
<div style="color: var(--foreground); background-color: var(--background);">
  Content
</div>

/* Tailwind */
<div class="text-foreground bg-background">
  Content
</div>

/* JavaScript */
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary')
  .trim()`} />
          </div>
        </div>
      </DocsSection>

      <DocsSection id="typography" title="Typography">
        <p className="text-muted-foreground mb-6">
          11-level font size scale with 5 weights, line heights, and letter spacing for comprehensive typography control.
        </p>
        <CodeBlock code={`/* Font Sizes (xs to 7xl) */
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 1.875rem;    /* 30px */
--font-size-4xl: 2.25rem;     /* 36px */
--font-size-5xl: 3rem;        /* 48px */
--font-size-6xl: 3.75rem;     /* 60px */
--font-size-7xl: 4.5rem;      /* 72px */

/* Font Weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;

/* Letter Spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0em;
--letter-spacing-wide: 0.05em;`} />
      </DocsSection>

      <DocsSection id="spacing" title="Spacing">
        <p className="text-muted-foreground mb-6">
          8px-based spacing scale for consistent margins, paddings, and gaps throughout the UI.
        </p>
        <CodeBlock code={`/* Spacing Scale (8px base) */
--space-0: 0;          /* 0px */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */

/* Usage */
<div style="padding: var(--space-4); margin: var(--space-6); gap: var(--space-2)">
  Content
</div>`} />
      </DocsSection>

      <DocsSection id="radius" title="Border Radius">
        <p className="text-muted-foreground mb-6">
          7-level semantic border radius scale from sharp to full circles.
        </p>
        <CodeBlock code={`/* Border Radius Scale */
--radius-sm: 0.25rem;      /* 4px */
--radius-md: 0.375rem;     /* 6px */
--radius-lg: 0.5rem;       /* 8px */
--radius-xl: 0.75rem;      /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;     /* Full circle */

/* Usage */
<div style="border-radius: var(--radius-lg)">
  Normal rounded
</div>

<div style="border-radius: var(--radius-full)">
  Pill shape
</div>`} />
      </DocsSection>

      <DocsSection id="shadows" title="Shadows">
        <p className="text-muted-foreground mb-6">
          7-level elevation system for creating depth and visual hierarchy. Automatically adjusted for dark mode.
        </p>
        <CodeBlock code={`/* Shadow Elevation Scale */
--shadow-none: 0 0 #0000;
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Dark mode adjusts opacity automatically in .dark selector */

/* Usage */
<div style="box-shadow: var(--shadow-md)">
  Card with elevation
</div>`} />
      </DocsSection>

      <DocsSection id="transitions" title="Transitions">
        <p className="text-muted-foreground mb-6">
          3 transition speeds with cubic-bezier timing functions for smooth, natural motion.
        </p>
        <CodeBlock code={`/* Transition Speeds */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Usage */
<button style="transition: all var(--transition-base)">
  Hover me
</button>

<div style="transition: color var(--transition-fast), background-color var(--transition-base)">
  Mixed transitions
</div>`} />
      </DocsSection>

      <DocsSection id="z-index" title="Z-Index">
        <p className="text-muted-foreground mb-6">
          Semantic z-index scale to prevent stacking context conflicts and ensure proper layering.
        </p>
        <CodeBlock code={`/* Z-Index Scale */
--z-dropdown: 1000;         /* Dropdown menus */
--z-sticky: 1020;           /* Sticky headers */
--z-fixed: 1030;            /* Fixed navigation */
--z-modal-backdrop: 1040;   /* Modal overlay */
--z-modal: 1050;            /* Modal dialog */
--z-popover: 1060;          /* Popovers & tooltips base */
--z-tooltip: 1070;          /* Tooltip top layer */

/* Usage */
<div style="z-index: var(--z-modal)">
  Modal content (highest)
</div>

<div style="z-index: var(--z-dropdown)">
  Dropdown menu
</div>`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Use design tokens in three ways: CSS variables, Tailwind CSS, or JavaScript.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<div style="
  color: var(--foreground);
  background-color: var(--background);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
">
  Styled with CSS variables
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- CSS variables are exported to @theme -->
<div class="
  text-foreground bg-background
  p-4 rounded-lg
  shadow-md transition-all
  hover:shadow-lg
">
  Styled with Tailwind
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. JavaScript</h4>
            <CodeBlock code={`// Access CSS variables in JavaScript
const getToken = (tokenName) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(\`--\${tokenName}\`)
    .trim()
  return value
}

// Usage
const primaryColor = getToken('primary')
const spacing = getToken('space-4')
const shadowMd = getToken('shadow-md')`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Always use semantic token names (--primary, --destructive) not hardcoded hex values</li>
              <li>• Use consistent spacing scales from --space-* variables</li>
              <li>• Apply shadows progressively (sm → md → lg) for proper elevation hierarchy</li>
              <li>• Respect z-index semantic values to prevent stacking conflicts</li>
              <li>• Use --transition-* for consistent motion across the interface</li>
              <li>• Test color contrast in both light and dark modes</li>
            </ul>
          </DocsCallout>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Token Import Map</h4>
            <CodeBlock code={`/* All available tokens in app/globals.css */

/* Colors */
--background, --foreground, --card, --card-foreground,
--primary, --primary-foreground, --secondary, --secondary-foreground,
--accent, --accent-foreground, --destructive, --destructive-foreground,
--warning, --warning-foreground, --success, --success-foreground,
--info, --info-foreground, --muted, --muted-foreground,
--border, --input, --ring

/* Typography */
--font-size-xs to --font-size-7xl
--font-weight-light to --font-weight-bold
--line-height-tight to --line-height-loose
--letter-spacing-tight to --letter-spacing-wide

/* Spacing */
--space-0 to --space-32

/* Radius */
--radius-sm to --radius-full

/* Shadows */
--shadow-none to --shadow-2xl

/* Transitions */
--transition-fast, --transition-base, --transition-slow

/* Z-Index */
--z-dropdown to --z-tooltip`} />
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
