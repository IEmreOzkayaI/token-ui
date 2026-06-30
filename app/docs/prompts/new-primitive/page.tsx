"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/primitives/card"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

const PROMPT = `You are a Token UI design system engineer.

Create a new primitive component: {primitive_name}

Base element/primitive: {base_element}

Required features:
{features}

Variant options:
{variants}

Accessibility requirements:
{a11y_requirements}

Guidelines:
1. Use CVA (class-variance-authority) for variant management
2. Add data-slot="{primitive_name}" to root element
3. Support className prop for customization
4. Use cn() utility to merge classes
5. Export both component and {primitive_name}Variants
6. Support asChild pattern if composition needed
7. Include focus-visible and aria-invalid states
8. Support light/dark modes via Tailwind
9. Use CSS custom properties from app/globals.css for colors/spacing
10. Add TypeScript types for all props

File location: ui/primitives/{primitive_name}.tsx

Return complete, production-ready code.`

export default function NewPrimitivePage() {
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    const ok = await copyToClipboard(PROMPT)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "usage", title: "Usage" },
      { id: "example", title: "Example" },
    ]}>
      <DocsPageHeader
        title="New Primitive Generation"
        description="Create new base UI component from scratch"
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">
          Use this prompt when creating a new foundational primitive component. A primitive is a base UI component that combines with others to create full-featured components.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When to Use</p>
              <p className="text-xs text-muted-foreground">
                Creating foundational component, converting external library component to Token UI, building new base element
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-1">When NOT to Use</p>
              <p className="text-xs text-muted-foreground">
                Adding to existing primitive (use Enhance Primitive), creating full-featured component (use New Component), just adding a variant
              </p>
            </CardContent>
          </Card>
        </div>

        <DocsCallout title="Key Points" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• Primitives are base components in ui/primitives/</li>
            <li>• Use CVA (class-variance-authority) for variants</li>
            <li>• Add data-slot attributes to all elements</li>
            <li>• Export both component and variants CVA</li>
            <li>• Support composable sub-components if needed</li>
            <li>• Include accessibility features from the start</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <p className="text-muted-foreground mb-6">
          Copy the prompt below and fill in the placeholders with your primitive details:
        </p>

        <div className="relative mb-6">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyPrompt}
            className="absolute top-4 right-4 z-10"
            aria-label={copied ? "Copied" : "Copy prompt"}
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
          <CodeBlock code={PROMPT} showLineNumbers={false} />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Parameters to Replace</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><code className="bg-foreground/10 px-1.5 py-0.5 rounded">{`{primitive_name}`}</code> — kebab-case component name (e.g., "toggle", "badge")</li>
              <li><code className="bg-foreground/10 px-1.5 py-0.5 rounded">{`{base_element}`}</code> — HTML element or existing primitive to extend (e.g., "button", "div", "input")</li>
              <li><code className="bg-foreground/10 px-1.5 py-0.5 rounded">{`{features}`}</code> — List of required capabilities and behaviors</li>
              <li><code className="bg-foreground/10 px-1.5 py-0.5 rounded">{`{variants}`}</code> — Optional list of visual variants (default, outline, ghost, etc.)</li>
              <li><code className="bg-foreground/10 px-1.5 py-0.5 rounded">{`{a11y_requirements}`}</code> — Specific accessibility needs (keyboard nav, ARIA labels, etc.)</li>
            </ul>
          </div>
        </div>
      </DocsSection>

      <DocsSection id="example" title="Example Usage">
        <p className="text-muted-foreground mb-4">
          Here's an example of using this prompt to create a "toggle-group" primitive:
        </p>

        <CodeBlock code={`You are a Token UI design system engineer.

Create a new primitive component: toggle-group

Base element/primitive: div

Required features:
- Multiple toggle buttons that can be selected together or mutually exclusive
- Manage selection state
- Support single or multiple selection modes
- Keyboard navigation (arrow keys)

Variant options:
- default, outline, ghost
- Size: sm, default, lg

Accessibility requirements:
- ARIA roles for button group
- Keyboard navigation with arrow keys
- Proper focus management
- Screen reader support

Guidelines:
[same as template]`} showLineNumbers={false} />

        <p className="text-sm text-muted-foreground mt-4">
          The AI will create a complete, production-ready primitive component with CVA variants, TypeScript types, accessibility features, and proper Token UI patterns.
        </p>
      </DocsSection>
    </DocsPage>
  )
}
