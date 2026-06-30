"use client"

import { useState } from "react"
import { Card, CardContent } from "@/primitives/card"
import { Button } from "@/primitives/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/primitives/sheet"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { cn } from "@/lib/utils"
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
  const [open, setOpen] = useState(false)
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
      { id: "create", title: "Create" },
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
        <Button onClick={() => setOpen(true)}>Create</Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col">
            <SheetHeader>
              <SheetTitle>Fill Parameters</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto space-y-4 py-6">
              <div className="space-y-3">
                {[
                  { key: "primitive_name", label: "Primitive Name", placeholder: "e.g., toggle, badge, toggle-group" },
                  { key: "base_element", label: "Base Element/Primitive", placeholder: "e.g., button, div, input" },
                  { key: "features", label: "Required Features", placeholder: "List features line by line", textarea: true },
                  { key: "variants", label: "Variant Options", placeholder: "e.g., default, outline, ghost", textarea: true },
                  { key: "a11y_requirements", label: "Accessibility Requirements", placeholder: "Keyboard nav, ARIA labels, etc.", textarea: true },
                ].map((param) => (
                  <div key={param.key}>
                    <label className="text-xs font-medium block mb-1.5">{param.label}</label>
                    {param.textarea ? (
                      <textarea
                        value={values[param.key as keyof typeof values]}
                        onChange={(e) => setValues((prev) => ({ ...prev, [param.key]: e.target.value }))}
                        placeholder={param.placeholder}
                        className={cn(
                          "w-full min-h-20 rounded-lg border border-border/50 bg-foreground/5 px-3 py-2 text-xs",
                          "outline-none focus:border-foreground/30 focus:bg-foreground/10 transition-colors",
                          "placeholder:text-muted-foreground/40 resize-none"
                        )}
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[param.key as keyof typeof values]}
                        onChange={(e) => setValues((prev) => ({ ...prev, [param.key]: e.target.value }))}
                        placeholder={param.placeholder}
                        className={cn(
                          "w-full rounded-lg border border-border/50 bg-foreground/5 px-3 py-2 text-xs",
                          "outline-none focus:border-foreground/30 focus:bg-foreground/10 transition-colors",
                          "placeholder:text-muted-foreground/40"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold">Prompt</h4>
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
              <CodeBlock code={finalPrompt} showLineNumbers={false} className="max-h-48" />
              <div className="text-xs text-muted-foreground mt-2">
                {Object.values(values).some((v) => !v) ? (
                  <span className="text-yellow-600">⚠️ Fill all parameters</span>
                ) : (
                  <span className="text-primary">✓ Ready to copy</span>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </DocsSection>
    </DocsPage>
  )
}
