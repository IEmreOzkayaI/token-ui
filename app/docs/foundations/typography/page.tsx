"use client"

import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"

const toc = [
  { id: "overview", title: "Overview" },
  { id: "font-sizes", title: "Font Sizes" },
  { id: "font-weights", title: "Font Weights" },
  { id: "line-heights", title: "Line Heights" },
  { id: "letter-spacing", title: "Letter Spacing" },
  { id: "usage", title: "Usage" },
]

export default function TypographyPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Typography"
        description="11-level font size scale with 5 weights, line heights, and letter spacing for comprehensive typographic control."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          Token UI typography uses CSS custom properties for systematic, consistent text sizing and hierarchy. All tokens are defined in <code className="bg-foreground/10 px-2 py-1 rounded">app/globals.css</code>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📍 Source</p>
            <code className="text-xs">app/globals.css :root</code>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📏 Scale</p>
            <p className="text-xs">11 steps (0.75rem to 4.5rem)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">⚖️ Weights</p>
            <p className="text-xs">5 weights (300 to 700)</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-foreground/5">
            <p className="text-sm font-medium mb-2">📐 Line Heights</p>
            <p className="text-xs">4 scales (1.2 to 2)</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="font-sizes" title="Font Sizes">
        <p className="text-muted-foreground mb-6">
          11-level font size scale from xs (12px) to 7xl (72px) for all text elements.
        </p>

        <div className="space-y-3 mb-6 bg-foreground/5 p-6 rounded-lg border border-border/50">
          <div className="text-xs">xs (12px)</div>
          <div className="text-sm">sm (14px)</div>
          <div className="text-base">base (16px) - default body</div>
          <div className="text-lg">lg (18px)</div>
          <div className="text-xl">xl (20px)</div>
          <div className="text-2xl">2xl (24px)</div>
          <div className="text-3xl">3xl (30px)</div>
          <div className="text-4xl">4xl (36px)</div>
          <div className="text-5xl">5xl (48px)</div>
          <div className="text-6xl">6xl (60px)</div>
          <div className="text-7xl">7xl (72px)</div>
        </div>

        <CodeBlock code={`/* Font Size Scale */
--font-size-xs: 0.75rem;      /* 12px - captions, tiny text */
--font-size-sm: 0.875rem;     /* 14px - small labels */
--font-size-base: 1rem;       /* 16px - body text (default) */
--font-size-lg: 1.125rem;     /* 18px - large body */
--font-size-xl: 1.25rem;      /* 20px - subheadings */
--font-size-2xl: 1.5rem;      /* 24px - section headings */
--font-size-3xl: 1.875rem;    /* 30px - page subheadings */
--font-size-4xl: 2.25rem;     /* 36px - large headings */
--font-size-5xl: 3rem;        /* 48px - major headings */
--font-size-6xl: 3.75rem;     /* 60px - hero text */
--font-size-7xl: 4.5rem;      /* 72px - display text */

/* Usage */
<h1 style="font-size: var(--font-size-4xl)">Heading</h1>
<p style="font-size: var(--font-size-base)">Body text</p>
<small style="font-size: var(--font-size-sm)">Small text</small>`} />
      </DocsSection>

      <DocsSection id="font-weights" title="Font Weights">
        <p className="text-muted-foreground mb-6">
          5 font weights for typographic emphasis and hierarchy.
        </p>

        <div className="space-y-2 mb-6 bg-foreground/5 p-6 rounded-lg border border-border/50">
          <div className="font-light text-base">Light (300) - delicate, reduced emphasis</div>
          <div className="font-normal text-base">Normal (400) - standard body text</div>
          <div className="font-medium text-base">Medium (500) - slightly emphasized</div>
          <div className="font-semibold text-base">Semibold (600) - labels, subheadings</div>
          <div className="font-bold text-base">Bold (700) - strong emphasis, headings</div>
        </div>

        <CodeBlock code={`/* Font Weights */
--font-weight-light: 300;      /* Delicate, reduced emphasis */
--font-weight-normal: 400;     /* Standard body text weight */
--font-weight-medium: 500;     /* Slightly emphasized */
--font-weight-semibold: 600;   /* Labels, subheadings */
--font-weight-bold: 700;       /* Strong emphasis, headings */

/* Usage Examples */
<p style="font-weight: var(--font-weight-light)">Light text</p>
<p style="font-weight: var(--font-weight-normal)">Normal body</p>
<strong style="font-weight: var(--font-weight-bold)">Bold emphasis</strong>

/* Tailwind */
<p class="font-light">Light text</p>
<p class="font-normal">Normal text</p>
<p class="font-bold">Bold text</p>`} />
      </DocsSection>

      <DocsSection id="line-heights" title="Line Heights">
        <p className="text-muted-foreground mb-6">
          4 line height scales for different text densities and readability.
        </p>
        <CodeBlock code={`/* Line Heights */
--line-height-tight: 1.2;      /* Headlines, dense text (120%) */
--line-height-normal: 1.5;     /* Body text, default (150%) */
--line-height-relaxed: 1.75;   /* Comfortable, spaced text (175%) */
--line-height-loose: 2;        /* Very spacious, accessible (200%) */

/* Usage */
<h1 style="line-height: var(--line-height-tight)">
  Tight headlines
</h1>

<p style="line-height: var(--line-height-normal)">
  Standard body text with good readability
</p>

<p style="line-height: var(--line-height-relaxed)">
  More spacious paragraphs for better breathing room
</p>

/* Tailwind */
<h1 class="leading-tight">Headline</h1>
<p class="leading-normal">Body text</p>
<p class="leading-relaxed">Spacious content</p>`} />
      </DocsSection>

      <DocsSection id="letter-spacing" title="Letter Spacing">
        <p className="text-muted-foreground mb-6">
          Letter spacing for specific text styles. Used sparingly for headings and special text.
        </p>
        <CodeBlock code={`/* Letter Spacing */
--letter-spacing-tight: -0.02em;   /* Condensed, headlines */
--letter-spacing-normal: 0em;      /* Default spacing */
--letter-spacing-wide: 0.05em;     /* Expanded, uppercase labels */

/* Usage */
<h1 style="letter-spacing: var(--letter-spacing-tight)">
  Condensed Headline
</h1>

<p style="letter-spacing: var(--letter-spacing-normal)">
  Regular text with normal spacing
</p>

<label style="
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
">
  Form Label
</label>

/* Tailwind */
<h1 class="tracking-tight">Headline</h1>
<p class="tracking-normal">Body</p>
<span class="tracking-wide">Label</span>`} />
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Apply typography tokens using CSS variables, Tailwind, or JavaScript.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">1. CSS Variables</h4>
            <CodeBlock code={`<!-- Direct CSS variables -->
<h1 style="
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
">
  Main Heading
</h1>

<p style="
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
">
  Body text with comfortable readability
</p>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">2. Tailwind CSS</h4>
            <CodeBlock code={`<!-- Semantic Tailwind classes -->
<h1 class="text-4xl font-bold leading-tight">Heading</h1>
<h2 class="text-2xl font-semibold">Subheading</h2>
<p class="text-base font-normal leading-normal">Body text</p>
<small class="text-sm font-medium">Label</small>
<code class="text-xs font-mono">Code snippet</code>

<!-- Spacing variants -->
<p class="text-base leading-relaxed">Spacious paragraph</p>
<span class="text-xs tracking-wide uppercase">Condensed label</span>`} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">3. CSS Grid Display</h4>
            <CodeBlock code={`/* Complete Typography Scale */
--font-size-xs: 0.75rem        /* 12px */
--font-size-sm: 0.875rem       /* 14px */
--font-size-base: 1rem         /* 16px */
--font-size-lg: 1.125rem       /* 18px */
--font-size-xl: 1.25rem        /* 20px */
--font-size-2xl: 1.5rem        /* 24px */
--font-size-3xl: 1.875rem      /* 30px */
--font-size-4xl: 2.25rem       /* 36px */
--font-size-5xl: 3rem          /* 48px */
--font-size-6xl: 3.75rem       /* 60px */
--font-size-7xl: 4.5rem        /* 72px */`} />
          </div>

          <DocsCallout title="Best Practices" variant="tip">
            <ul className="space-y-1 text-sm">
              <li>• Use base (1rem/16px) for body text, not smaller</li>
              <li>• Maintain line height of 1.5+ for body text (readability)</li>
              <li>• Use tight line heights (1.2) only for headings</li>
              <li>• Limit font weight variations (don't use light for body)</li>
              <li>• Respect --font-size scale, don't use arbitrary sizes</li>
              <li>• Letter spacing mainly for uppercase labels and headings</li>
            </ul>
          </DocsCallout>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
