"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { Code, Layers, Grid3x3, Lightbulb } from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "scale", title: "Radius Scale" },
  { id: "semantic-usage", title: "Semantic Usage" },
  { id: "usage", title: "Usage" },
]

export default function RadiusPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Border Radius"
        description="7-level semantic border radius scale from sharp (4px) to full circles (9999px)."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI border radius uses a systematic scale for consistent corner rounding across all components. All values are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Code className="size-4" /> Source
            </p>
            <code className="text-xs">app/globals.css :root</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Layers className="size-4" /> Levels
            </p>
            <p className="text-xs">7 semantic steps (sm to full)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Grid3x3 className="size-4" /> Range
            </p>
            <p className="text-xs">4px to 9999px</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="size-4" /> Semantic
            </p>
            <p className="text-xs">Sharp to pill/circle</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="scale" title="Radius Scale">
        <p className="text-muted-foreground mb-6">
          7-level semantic border radius scale from minimal to full circles.
        </p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 bg-foreground/5 p-6 rounded-lg border border-border/50">
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded-sm mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">sm (4px)</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded mx-auto" style={{ width: "160px", borderRadius: "6px" }}></div>
            <p className="text-xs">md (6px)</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded-lg mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">lg (8px) - default</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded-xl mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">xl (12px)</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded-2xl mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">2xl (16px)</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-primary rounded-3xl mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">3xl (24px)</p>
          </div>
          <div className="space-y-2 text-center sm:col-span-2">
            <div className="h-20 bg-primary rounded-full mx-auto" style={{ width: "160px" }}></div>
            <p className="text-xs">full (circle/pill)</p>
          </div>
        </div>

        <CodeBlock code={`/* Border Radius Scale */
--radius-sm: 0.25rem;      /* 4px - minimal rounding (sharp) */
--radius-md: 0.375rem;     /* 6px - subtle rounding */
--radius-lg: 0.5rem;       /* 8px - standard rounding (default) */
--radius-xl: 0.75rem;      /* 12px - generous rounding */
--radius-2xl: 1rem;        /* 16px - soft corners */
--radius-3xl: 1.5rem;      /* 24px - very round */
--radius-full: 9999px;     /* Full circle / pill shape */

/* Semantic Mapping */
Sharp buttons:        --radius-sm              /* 4px */
Standard components:  --radius-lg              /* 8px */
Rounded cards:        --radius-xl to --radius-2xl  /* 12-16px */
Pill buttons:         --radius-full            /* 9999px */`} />
      </DocsSection>

      <DocsSection id="semantic-usage" title="Semantic Usage">
        <p className="text-muted-foreground mb-6">
          Apply radius values based on component type and design intent.
        </p>
        <CodeBlock code={`/* Component Radius Recommendations */

/* Sharp, Technical Components */
Code blocks:          --radius-md
Input fields:         --radius-md to --radius-lg
Select dropdowns:     --radius-md to --radius-lg

/* Standard UI Components */
Buttons:              --radius-lg
Cards:                --radius-lg to --radius-xl
Modals:               --radius-xl to --radius-2xl

/* Soft, Friendly Components */
Large cards:          --radius-2xl
Badges:               --radius-full (pill)
Avatars:              --radius-full (circle)
Tags:                 --radius-full (pill)

/* Interactive Elements */
Button on hover:      stay same or increase slightly
Card on hover:        stay same (consistent)
Focus state:          show ring without radius change`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply radius using CSS variables or Tailwind CSS.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Direct CSS variable usage -->
<div style="border-radius: var(--radius-lg)">
  Standard rounded element
</div>

<button style="border-radius: var(--radius-full)">
  Pill-shaped button
</button>

<input style="border-radius: var(--radius-md)" />

<div style="border-radius: var(--radius-2xl)">
  Very round card
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Semantic Tailwind classes -->
<div class="rounded-sm">Minimal rounding</div>
<button class="rounded-lg">Standard button</button>
<div class="rounded-xl">Generous rounding</div>
<div class="rounded-2xl">Soft corners</div>
<div class="rounded-3xl">Very round</div>
<button class="rounded-full">Pill shape</button>

<!-- Responsive radius -->
<div class="rounded-lg sm:rounded-xl lg:rounded-2xl">
  Responsive rounding
</div>

<!-- Partial radius -->
<div class="rounded-t-lg">Top corners only</div>
<div class="rounded-b-xl">Bottom corners only</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. Complete Scale Reference</h4>
            <CodeBlock code={`/* All Available Radius Values */
--radius-sm: 0.25rem       /* 4px */
--radius-md: 0.375rem      /* 6px */
--radius-lg: 0.5rem        /* 8px (default) */
--radius-xl: 0.75rem       /* 12px */
--radius-2xl: 1rem         /* 16px */
--radius-3xl: 1.5rem       /* 24px */
--radius-full: 9999px      /* Full circle/pill */`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Use lg (8px) as default for most UI components</li>
              <li>• Use sm/md (4-6px) for input fields and technical elements</li>
              <li>• Use xl/2xl (12-16px) for cards and containers</li>
              <li>• Use full for pills, badges, and circular avatars</li>
              <li>• Maintain consistency: similar components = same radius</li>
              <li>• Don't mix many different radius values in one design</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
