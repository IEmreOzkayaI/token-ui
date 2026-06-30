"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "elevation-system", title: "Elevation System" },
  { id: "dark-mode", title: "Dark Mode" },
  { id: "usage", title: "Usage" },
]

export default function ShadowsPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Shadows"
        description="7-level elevation system for creating depth and visual hierarchy. Automatically adjusted for dark mode."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI shadows create visual depth and hierarchy through an elevation system. Shadows are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code> with automatic dark mode adjustments.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📍 Source</p>
            <code className="text-xs">app/globals.css :root and .dark</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📊 Levels</p>
            <p className="text-xs">7 elevations (none, xs to 2xl)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">🎨 Dark Mode</p>
            <p className="text-xs">Adjusted opacity per mode</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">🔍 Semantics</p>
            <p className="text-xs">Elevation increases with component importance</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="elevation-system" title="Elevation System">
        <p className="text-muted-foreground mb-6">
          7 elevation levels for progressive depth perception. Higher elevations indicate components that float above the page.
        </p>

        <div className="mb-6 grid gap-4 bg-foreground/5 p-6 rounded-lg border border-border/50">
          <div className="h-24 bg-card border border-border rounded-lg flex items-center justify-center font-medium">
            none (base)
          </div>
          <div className="h-24 bg-card shadow-xs rounded-lg flex items-center justify-center font-medium">
            shadow-xs
          </div>
          <div className="h-24 bg-card shadow-sm rounded-lg flex items-center justify-center font-medium">
            shadow-sm
          </div>
          <div className="h-24 bg-card shadow-md rounded-lg flex items-center justify-center font-medium">
            shadow-md (default)
          </div>
          <div className="h-24 bg-card shadow-lg rounded-lg flex items-center justify-center font-medium">
            shadow-lg
          </div>
          <div className="h-24 bg-card shadow-xl rounded-lg flex items-center justify-center font-medium">
            shadow-xl
          </div>
          <div className="h-24 bg-card shadow-2xl rounded-lg flex items-center justify-center font-medium">
            shadow-2xl
          </div>
        </div>

        <CodeBlock code={`/* Shadow Elevation Levels */

--shadow-none: 0 0 #0000;
/* No shadow, base layer (background) */

--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
/* Subtle, minimal elevation (borders, dividers) */

--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
/* Small, slight elevation (cards, containers) */

--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
/* Medium elevation (card hover, standard cards) */

--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
/* Large elevation (dropdowns, popovers) */

--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
/* Extra large (modals, important overlays) */

--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
/* Maximum elevation (fullscreen modals, top-level UI) */

/* Elevation Semantics */
Base (none):         Background, borders
Low (xs/sm):         Cards, containers, raised text
Medium (md/lg):      Hover states, focused elements
High (xl/2xl):       Modals, dropdowns, important overlays`} />
      </DocsSection>

      <DocsSection id="dark-mode" title="Dark Mode">
        <p className="text-muted-foreground mb-6">
          Shadow opacity automatically increases in dark mode to maintain visual separation against dark backgrounds.
        </p>
        <CodeBlock code={`/* Light Mode (:root) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
/* Subtle on light background */

/* Dark Mode (.dark) */
.dark {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  /* Increased opacity for visibility on dark background */
}

/* Automatic adjustment based on mode */
<div style="box-shadow: var(--shadow-md)">
  Light mode: subtle shadow
  Dark mode: more pronounced shadow (auto)
</div>`} />
        <DocsCallout title="Automatic Adaptation" variant="info">
          Shadows automatically adjust when .dark class is toggled. No component changes needed.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply shadows using CSS variables or Tailwind CSS.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Direct CSS variable usage -->
<div style="box-shadow: var(--shadow-md)">
  Card with medium elevation
</div>

<div style="
  box-shadow: var(--shadow-lg);
  transition: box-shadow var(--transition-base);
"
onmouseover="this.style.boxShadow='var(--shadow-xl)'"
onmouseout="this.style.boxShadow='var(--shadow-lg)'"
>
  Interactive element with shadow on hover
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Semantic shadow classes -->
<div class="shadow-sm">Small elevation</div>
<div class="shadow-md">Medium elevation (card)</div>
<div class="shadow-lg">Large elevation (dropdown)</div>
<div class="shadow-xl">Extra large (modal)</div>

<!-- With transitions -->
<div class="shadow-md hover:shadow-xl transition-shadow">
  Hover to elevate
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. Component Patterns</h4>
            <CodeBlock code={`/* Card - Base Shadow */
.card {
  box-shadow: var(--shadow-sm);
}

/* Card - Hover State */
.card:hover {
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

/* Dropdown - High Elevation */
.dropdown {
  box-shadow: var(--shadow-lg);
}

/* Modal - Maximum Elevation */
.modal {
  box-shadow: var(--shadow-xl);
}

/* Focus State (Accessibility) */
*:focus {
  box-shadow: 0 0 0 3px var(--ring);
}`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Use shadows to indicate elevation, not just decoration</li>
              <li>• Higher elevations (lg/xl) for interactive/modal elements</li>
              <li>• Lower elevations (xs/sm) for content containers</li>
              <li>• Combine shadow transitions for interactive feedback</li>
              <li>• Test shadows in both light and dark modes</li>
              <li>• Don't layer multiple shadows unnecessarily</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
