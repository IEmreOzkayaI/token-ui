"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Spacing Scale" },
  { id: "practical", title: "Practical Guidelines" },
  { id: "usage", title: "Usage" },
]

export default function SpacingPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Spacing"
        description="8px-based spacing scale for margins, paddings, and gaps. Consistent rhythm across all layouts."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI spacing uses an 8px-based scale ensuring predictable, proportional spacing across all components and layouts. All values are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📍 Source</p>
            <code className="text-xs">app/globals.css :root</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📏 Base Unit</p>
            <p className="text-xs">8px (1rem base size = 16px)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📊 Scale</p>
            <p className="text-xs">0 to 32rem (0px to 512px)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">🎯 Values</p>
            <p className="text-xs">12 predefined tokens</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="scale" title="Spacing Scale">
        <p className="text-muted-foreground mb-6">
          Proportional spacing scale from 0 to 32rem (512px) for consistent layout rhythm.
        </p>
        <CodeBlock code={`/* Spacing Scale (8px base) */
--space-0: 0;          /* 0px - reset */
--space-1: 0.25rem;    /* 4px - tiny spacing */
--space-2: 0.5rem;     /* 8px - icon spacing */
--space-3: 0.75rem;    /* 12px - small gaps */
--space-4: 1rem;       /* 16px - default padding */
--space-6: 1.5rem;     /* 24px - section gaps */
--space-8: 2rem;       /* 32px - large spacing */
--space-12: 3rem;      /* 48px - major sections */
--space-16: 4rem;      /* 64px - layout spacing */
--space-20: 5rem;      /* 80px - hero spacing */
--space-24: 6rem;      /* 96px - page spacing */
--space-32: 8rem;      /* 128px - max spacing */

/* Spacing Patterns */
Small component (button):  var(--space-2) × var(--space-4)    /* 8px × 16px */
Standard component:        var(--space-4)                      /* 16px */
Card container:            var(--space-6)                      /* 24px */
Section spacing:           var(--space-8)                      /* 32px */
Major spacing:             var(--space-12)                     /* 48px */`} />
      </DocsSection>

      <DocsSection id="practical" title="Practical Guidelines">
        <p className="text-muted-foreground mb-6">
          Common spacing patterns and recommendations for different UI elements.
        </p>
        <CodeBlock code={`/* Common Spacing Applications */

/* Form elements */
Input/Select padding:      var(--space-3) × var(--space-4)    /* 12px × 16px */
Form field gap:            var(--space-4)                      /* 16px */

/* Buttons */
Button padding:            var(--space-2) × var(--space-4)    /* 8px × 16px */
Button group gap:          var(--space-2)                      /* 8px */

/* Lists */
List item padding:         var(--space-3)                      /* 12px */
List gap:                  var(--space-2)                      /* 8px */

/* Cards & Containers */
Card padding:              var(--space-6)                      /* 24px */
Card gap:                  var(--space-4)                      /* 16px */

/* Layouts */
Section gap:               var(--space-8)                      /* 32px */
Page padding:              var(--space-6) to var(--space-8)   /* 24-32px */

/* Typography spacing */
Paragraph gap:             var(--space-4)                      /* 16px */
Heading margin:            var(--space-6)                      /* 24px */`} />
        <DocsCallout title="Rhythm & Balance" variant="info">
          Use multiples of the base spacing unit to maintain visual rhythm. Common multipliers: 1x (4px), 2x (8px), 3x (12px), 4x (16px), 6x (24px), 8x (32px).
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply spacing tokens using CSS variables, Tailwind, or JavaScript.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Direct CSS variable usage -->
<div style="padding: var(--space-4); gap: var(--space-3)">
  Content with consistent spacing
</div>

<button style="padding: var(--space-2) var(--space-4)">
  Button with 8px vertical, 16px horizontal
</button>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Tailwind spacing classes -->
<div class="p-4 gap-3 mb-6">Spaced container</div>

<!-- Common patterns -->
<button class="px-4 py-2">Button (16px/8px)</button>
<div class="p-6 gap-4">Card (24px padding, 16px gap)</div>
<ul class="space-y-2">List (8px gap)</ul>

<!-- Responsive spacing -->
<section class="px-4 sm:px-6 lg:px-8">
  Responsive padding
</section>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. JavaScript</h4>
            <CodeBlock code={`// Access spacing tokens
const getSpacing = (tokenName) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(\`--space-\${tokenName}\`)
    .trim()
  return value  // "1rem", "1.5rem", etc
}

// Usage
const padding = getSpacing('4')      // "1rem" (16px)
const gap = getSpacing('3')          // "0.75rem" (12px)

// Convert to pixels
const toPixels = (remValue) => {
  return parseFloat(remValue) * 16
}`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Never use arbitrary spacing values. Use scale tokens only.</li>
              <li>• Use consistent spacing for related elements (list items, button groups)</li>
              <li>• Apply larger spacing (--space-6+) for section separation</li>
              <li>• Use smaller spacing (--space-1 to --space-3) for icon/text relationships</li>
              <li>• Maintain vertical rhythm: section gap ÷ content gap = consistent ratio</li>
              <li>• Combine padding and gap instead of using margins for flex/grid</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
