"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { useState } from "react"
import { Code, BarChart3, Zap, TrendingUp } from "lucide-react"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "speeds", title: "Transition Speeds" },
  { id: "easing", title: "Easing Functions" },
  { id: "usage", title: "Usage" },
]

export default function TransitionsPage() {
  const [hoverState, setHoverState] = useState("none")

  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Transitions"
        description="3 transition speeds with standard easing for consistent motion across the UI."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI transitions use consistent timing and easing to create predictable, professional motion. All values are CSS custom properties defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>.
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
              <BarChart3 className="size-4" /> Speeds
            </p>
            <p className="text-xs">3 durations (fast, base, slow)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="size-4" /> Easing
            </p>
            <p className="text-xs">Material Motion easing curve</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Zap className="size-4" /> Use
            </p>
            <p className="text-xs">UI state changes, interactions</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="speeds" title="Transition Speeds">
        <p className="text-muted-foreground mb-6">
          3 transition speeds for different interaction types: fast for feedback, base for state changes, slow for attention.
        </p>

        <div className="mb-6 space-y-4 bg-foreground/5 p-6 rounded-lg border border-border/50">
          <p className="text-xs font-medium text-muted-foreground">Hover over boxes to see transitions:</p>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Fast (150ms) - quick feedback</p>
              <div
                onMouseEnter={() => setHoverState("fast")}
                onMouseLeave={() => setHoverState("none")}
                className="h-12 bg-primary rounded-lg transition-all"
                style={{
                  width: hoverState === "fast" ? "100%" : "60%",
                  transitionDuration: "150ms",
                }}
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Base (200ms) - standard transition</p>
              <div
                onMouseEnter={() => setHoverState("base")}
                onMouseLeave={() => setHoverState("none")}
                className="h-12 bg-primary rounded-lg transition-all"
                style={{
                  width: hoverState === "base" ? "100%" : "60%",
                  transitionDuration: "200ms",
                }}
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Slow (300ms) - draw attention</p>
              <div
                onMouseEnter={() => setHoverState("slow")}
                onMouseLeave={() => setHoverState("none")}
                className="h-12 bg-primary rounded-lg transition-all"
                style={{
                  width: hoverState === "slow" ? "100%" : "60%",
                  transitionDuration: "300ms",
                }}
              />
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Transition Speeds */

--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
/* Quick feedback (loading, hover states) */

--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
/* Standard transitions (default) */

--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
/* Slower motion (draw attention, important changes) */

/* Easing: Material Motion Standard Curve */
cubic-bezier(0.4, 0, 0.2, 1)
/* Acceleration then deceleration for natural motion */`} />
      </DocsSection>

      <DocsSection id="easing" title="Easing Functions">
        <p className="text-muted-foreground mb-6">
          All transitions use the Material Motion standard easing curve for consistent, natural-feeling motion across the UI.
        </p>
        <CodeBlock code={`/* Easing: Material Motion Standard Curve */
cubic-bezier(0.4, 0, 0.2, 1)

/* Characteristics */
- Starts slow (subtle entrance)
- Accelerates through middle
- Decelerates to end (elegant finish)
- Natural, predictable motion

/* Why this curve? */
- Familiar to users (iOS, Android, Material Design)
- Feels organic and less mechanical
- Proper pacing for UI interactions
- Works well across all transition speeds

/* Usage */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
transition: background-color var(--transition-base);`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply transitions for smooth state changes and interactive feedback.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Quick feedback animation -->
<button style="transition: var(--transition-fast)">
  Quick response
</button>

<!-- State change animation -->
<div style="
  transition:
    background-color var(--transition-base),
    transform var(--transition-base);
"
onmouseover="this.style.backgroundColor='var(--primary)'"
onmouseout="this.style.backgroundColor='var(--card)'"
>
  Smooth color transition
</div>

<!-- Slow attention-drawing animation -->
<div style="animation: pulse var(--transition-slow) infinite">
  Important change
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Duration shortcuts -->
<button class="hover:bg-primary transition-colors duration-150">
  Fast feedback
</button>

<div class="hover:shadow-lg transition-shadow">
  Standard transition
</div>

<div class="hover:scale-105 transition-transform duration-300">
  Slow scale effect
</div>

<!-- Custom property -->
<div style="transition-duration: var(--transition-base)">
  Using CSS variable
</div>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. Common Patterns</h4>
            <CodeBlock code={`/* Hover state elevation */
.card {
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

/* Opacity fade */
.fade-in {
  animation: fadeIn var(--transition-base);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Multi-property transition */
.interactive {
  transition:
    background-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);
}`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Use fast (150ms) for quick feedback (button presses)</li>
              <li>• Use base (200ms) for most state changes (default)</li>
              <li>• Use slow (300ms) only for important, attention-drawing changes</li>
              <li>• Don't animate everything - motion should have purpose</li>
              <li>• Keep animations under 300ms for responsive feel</li>
              <li>• Use GPU-accelerated properties (transform, opacity) when possible</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
