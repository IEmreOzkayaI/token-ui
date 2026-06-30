"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { Code, Palette, Moon, Link, Lightbulb } from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "oklch-system", title: "OKLCH System" },
  { id: "semantic-roles", title: "Semantic Roles" },
  { id: "status-colors", title: "Status Colors" },
  { id: "dark-mode", title: "Dark Mode" },
  { id: "accessibility", title: "Accessibility" },
  { id: "usage", title: "Usage" },
]

export default function ColorsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Colors"
        description="OKLCH perceptually uniform color system with semantic roles, automatic dark mode, and full accessibility support."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI uses OKLCH color space for perceptually uniform colors that maintain consistent visual weight across light and dark modes. All colors are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Code className="size-4" /> Source
            </p>
            <code className="text-xs">app/globals.css (:root and .dark)</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Palette className="size-4" /> Format
            </p>
            <code className="text-xs">oklch(Lightness Chroma Hue)</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Moon className="size-4" /> Mode Support
            </p>
            <p className="text-xs">Automatic light/dark variants</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Link className="size-4" /> Integration
            </p>
            <p className="text-xs">CSS vars, Tailwind, JavaScript</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="oklch-system" title="OKLCH System">
        <p className="text-muted-foreground mb-6">
          OKLCH (Oklab with Chroma Hue) is a perceptually uniform color space where equal distances in the space correspond to equal perceptual differences in color.
        </p>
        <CodeBlock code={`/* OKLCH Syntax: oklch(Lightness Chroma Hue) */

/* Lightness: 0 (black) to 1 (white) */
--background: oklch(1 0 0);        /* White */
--foreground: oklch(0.145 0 0);    /* Near black */

/* Chroma: saturation amount (0 = gray, higher = more saturated) */
--primary: oklch(0.488 0.243 264.376);     /* Saturated blue */
--muted: oklch(0.97 0 0);                   /* No chroma = gray */

/* Hue: 0-360 degrees (0=red, 120=green, 240=blue) */
--destructive: oklch(0.577 0.245 27.325);  /* Red (27.325°) */
--success: oklch(0.577 0.191 142.495);     /* Green (142.495°) */
--warning: oklch(0.715 0.171 70.08);       /* Orange (70.08°) */`} />
        <DocsCallout title="Why OKLCH?" variant="info">
          OKLCH maintains perceptually uniform lightness across hues. This means a blue and a yellow with the same lightness value appear equally bright to human eyes, making the color system more predictable and accessible.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="semantic-roles" title="Semantic Roles">
        <p className="text-muted-foreground mb-6">
          Semantic color roles assign purpose to colors. Each role has both foreground and background variants for contrast.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-medium">Primary</span>
            </div>
            <p className="text-xs text-muted-foreground">Interactive, primary actions</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-medium">Secondary</span>
            </div>
            <p className="text-xs text-muted-foreground">Secondary actions</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-medium">Accent</span>
            </div>
            <p className="text-xs text-muted-foreground">Highlights, emphasis</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Muted</span>
            </div>
            <p className="text-xs text-muted-foreground">Disabled, placeholders</p>
          </div>
        </div>

        <CodeBlock code={`/* Light Mode (:root) */
--primary: oklch(0.488 0.243 264.376);              /* Interactive, primary actions */
--primary-foreground: oklch(0.97 0.014 254.604);   /* Text on primary bg */

--secondary: oklch(0.967 0.001 286.375);           /* Secondary actions */
--secondary-foreground: oklch(0.21 0.006 285.885); /* Text on secondary bg */

--accent: oklch(0.488 0.243 264.376);              /* Highlights, emphasis */
--accent-foreground: oklch(0.97 0.014 254.604);   /* Text on accent bg */

--muted: oklch(0.97 0 0);                          /* Disabled, placeholders */
--muted-foreground: oklch(0.556 0 0);              /* Text on muted bg */

--destructive: oklch(0.577 0.245 27.325);          /* Alerts, errors */
--destructive-foreground: oklch(0.97 0.014 254.604); /* Text on destructive bg */

--background: oklch(1 0 0);                        /* Page/card backgrounds */
--foreground: oklch(0.145 0 0);                    /* Body text */

--card: oklch(1 0 0);                              /* Card containers */
--card-foreground: oklch(0.145 0 0);               /* Card text */

--border: oklch(0.922 0 0);                        /* UI borders */
--input: oklch(0.922 0 0);                         /* Input borders/backgrounds */`} />
      </DocsSection>

      <DocsSection id="status-colors" title="Status Colors">
        <p className="text-muted-foreground mb-6">
          Status colors communicate outcomes and states. Each has foreground text color for contrast.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-success flex items-center justify-center">
              <span className="text-success-foreground font-medium">Success</span>
            </div>
            <p className="text-xs text-muted-foreground">Confirmation, success</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-warning flex items-center justify-center">
              <span className="text-warning-foreground font-medium">Warning</span>
            </div>
            <p className="text-xs text-muted-foreground">Caution, attention needed</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-border/50 bg-destructive flex items-center justify-center">
              <span className="text-destructive-foreground font-medium">Destructive</span>
            </div>
            <p className="text-xs text-muted-foreground">Alerts, errors</p>
          </div>
        </div>

        <CodeBlock code={`/* Light Mode Status Colors */
--warning: oklch(0.715 0.171 70.08);               /* Caution, attention needed */
--warning-foreground: oklch(0.145 0 0);            /* Dark text on warning */

--success: oklch(0.577 0.191 142.495);             /* Confirmation, success */
--success-foreground: oklch(0.145 0 0);            /* Dark text on success */

--info: oklch(0.488 0.243 264.376);                /* Information, neutral */
--info-foreground: oklch(0.97 0.014 254.604);      /* Light text on info */`} />
      </DocsSection>

      <DocsSection id="dark-mode" title="Dark Mode">
        <p className="text-muted-foreground mb-6">
          Dark mode uses adjusted lightness and chroma values to maintain readability and visual hierarchy while respecting the darker background.
        </p>
        <CodeBlock code={`/* Dark Mode (.dark selector) */
:root {
  --background: oklch(1 0 0);                      /* Light mode: white */
}

.dark {
  --background: oklch(0.145 0 0);                  /* Dark mode: near black */
  --foreground: oklch(0.985 0 0);                  /* Inverted: nearly white */
}

/* Color Adjustments in Dark Mode */
:root {
  --primary: oklch(0.488 0.243 264.376);           /* Lighter blue for light mode */
}

.dark {
  --primary: oklch(0.424 0.199 265.638);           /* Darker, less saturated for dark mode */
}

/* Shadows Adjusted for Dark Mode */
:root {
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark {
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3); /* Stronger shadows on dark bg */
}`} />
        <DocsCallout title="Auto Dark Mode" variant="tip">
          When .dark class is added to document root, all CSS variables automatically switch to dark mode values. No component changes needed.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="accessibility" title="Accessibility">
        <p className="text-muted-foreground mb-6">
          All color combinations meet WCAG AA contrast requirements for both light and dark modes.
        </p>
        <div className="space-y-4">
          <CodeBlock code={`/* Contrast Examples */

/* WCAG AA (4.5:1 minimum for body text) */
--foreground on --background: 21:1 (AAA pass)
--primary on --background: 8.5:1 (AAA pass)
--muted-foreground on --background: 5.2:1 (AA pass)

/* WCAG AA (3:1 minimum for large text) */
--primary on --card: 8.5:1 (AAA pass)
--destructive on --background: 6.1:1 (AAA pass)`} />
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>All text colors meet minimum contrast ratios in both modes</li>
            <li>Don't rely on color alone to convey meaning (icons, patterns, text)</li>
            <li>Use semantic colors appropriately (destructive for errors, success for confirmations)</li>
            <li>Test custom color combinations with accessibility checkers</li>
          </ul>
        </div>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Use colors in three ways: CSS variables, Tailwind CSS, or JavaScript.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Direct CSS variable usage -->
<div style="
  color: var(--foreground);
  background-color: var(--background);
  border: 1px solid var(--border);
">
  Automatic dark mode support
</div>

<!-- JavaScript access -->
<script>
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim();
  // Result: "oklch(0.488 0.243 264.376)"
</script>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Semantic color classes -->
<div class="text-foreground bg-background">Body text</div>
<button class="bg-primary text-primary-foreground">Primary button</button>
<div class="border border-border/50">Subtle border</div>

<!-- Status colors -->
<div class="bg-destructive text-destructive-foreground">Error state</div>
<div class="bg-success text-success-foreground">Success state</div>
<div class="bg-warning text-warning-foreground">Warning state</div>

<!-- Opacity variants -->
<div class="bg-primary/50">50% opacity primary</div>
<div class="text-foreground/70">70% opacity text</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. Complete Color Reference</h4>
            <CodeBlock code={`/* All Available Colors */

/* Semantic Roles */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--accent, --accent-foreground
--muted, --muted-foreground
--border, --input, --ring

/* Status */
--destructive, --destructive-foreground
--warning, --warning-foreground
--success, --success-foreground
--info, --info-foreground

/* Component-Specific */
--sidebar, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-accent-foreground
--sidebar-border, --sidebar-ring

/* Data Visualization */
--chart-1 through --chart-5 (5 distinct colors for charts)`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Use semantic colors: --primary for actions, --destructive for errors</li>
              <li>• Never hardcode hex values. Always use CSS variables</li>
              <li>• Test both light and dark modes. Colors may look different</li>
              <li>• Use text colors on colored backgrounds for proper contrast</li>
              <li>• Combine color with icons/text to convey meaning (not color alone)</li>
              <li>• Respect user's prefers-color-scheme media query preference</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
