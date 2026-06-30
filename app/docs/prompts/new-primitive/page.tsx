"use client"

import { useState } from "react"
import { Card, CardContent } from "@/primitives/card"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { Copy, Check } from "lucide-react"

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
  const [values, setValues] = useState({
    primitive_name: "toggle-group",
    base_element: "div",
    features: "- Multiple toggle buttons\n- Selection state management\n- Single or multiple selection modes\n- Keyboard navigation (arrow keys)",
    variants: "- default, outline, ghost\n- Size: sm, default, lg",
    a11y_requirements: "- ARIA roles for button group\n- Keyboard navigation with arrow keys\n- Proper focus management\n- Screen reader support",
  })

  const generatePrompt = () => {
    let result = PROMPT
    Object.entries(values).forEach(([key, value]) => {
      const placeholder = `{${key}}`
      result = result.replace(new RegExp(placeholder, "g"), value || "")
    })
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "create", title: "Create Prompt" },
    ]}>
      <DocsPageHeader
        title="New Primitive Generation"
        description="Create new base UI component from scratch"
        action={
          <Button onClick={handleCopy} size="sm" variant="outline" className="gap-2">
            {copied ? (
              <>
                <Check className="size-3.5 text-primary" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Create
              </>
            )}
          </Button>
        }
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
                Adding to existing primitive, creating full-featured component, just adding a variant
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

      <DocsSection id="create" title="Create Prompt">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Parameters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Parameters</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="primitive-name">Primitive Name</Label>
                <Input
                  id="primitive-name"
                  value={values.primitive_name}
                  onChange={(e) => setValues((prev) => ({ ...prev, primitive_name: e.target.value }))}
                  placeholder="e.g., toggle, badge, toggle-group"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="base-element">Base Element/Primitive</Label>
                <Input
                  id="base-element"
                  value={values.base_element}
                  onChange={(e) => setValues((prev) => ({ ...prev, base_element: e.target.value }))}
                  placeholder="e.g., button, div, input"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="features">Required Features</Label>
                <textarea
                  id="features"
                  value={values.features}
                  onChange={(e) => setValues((prev) => ({ ...prev, features: e.target.value }))}
                  placeholder="List features line by line"
                  className="h-24 rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="variants">Variant Options</Label>
                <textarea
                  id="variants"
                  value={values.variants}
                  onChange={(e) => setValues((prev) => ({ ...prev, variants: e.target.value }))}
                  placeholder="e.g., default, outline, ghost"
                  className="h-24 rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="a11y">Accessibility Requirements</Label>
                <textarea
                  id="a11y"
                  value={values.a11y_requirements}
                  onChange={(e) => setValues((prev) => ({ ...prev, a11y_requirements: e.target.value }))}
                  placeholder="Keyboard nav, ARIA labels, etc."
                  className="h-24 rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Generated Prompt</h3>
            <div className="rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
              <div className="bg-muted/50 border-b border-border/30 px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">prompt.txt</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="size-4 text-primary" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
              <div className="overflow-auto max-h-96">
                <pre className="p-4 text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap break-words font-mono">
                  {finalPrompt}
                </pre>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {Object.values(values).some((v) => !v) ? (
                <span className="text-yellow-600">⚠️ Fill parameters to generate</span>
              ) : (
                <span className="text-primary">✓ Ready to copy</span>
              )}
            </div>
          </div>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
