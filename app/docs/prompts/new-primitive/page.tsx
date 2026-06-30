"use client"

import { useState } from "react"
import { Card, CardContent } from "@/primitives/card"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/primitives/sheet"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { Copy, Check, Plus, X, Trash2 } from "lucide-react"

const PROMPT = `You are a Token UI design system engineer.

Create a new primitive component: {primitive_name}

Base element/primitive: {base_element}

Required features:
{features}

Variant options:
{variants}

Accessibility requirements:
{a11y_requirements}

---

CODEBASE REFERENCE (read before writing any code):

Design tokens  → app/globals.css
  All CSS variables are defined here. No hardcoded values allowed.
  Token categories: colors, typography, spacing (--space-*), radius (--radius-*),
  shadows (--shadow-*), borders (--border, --input), transitions (--transition-*).
  Dark mode is automatic via CSS variables — no dark: Tailwind classes for colors.

Existing primitives → ui/primitives/*
  Read these files to understand CVA structure, import paths, data-slot usage,
  export format, and TypeScript types. Follow the exact same patterns.
  Key reference: ui/primitives/button.tsx

Existing components → ui/components/*
  Read these to understand how primitives are composed and used together.

Foundation docs → app/docs/foundations/*
  Read these to understand design decisions, token usage rules, and system constraints.

---

IMPLEMENTATION GUIDELINES:

1. CVA (class-variance-authority) for all variants — export {primitive_name}Variants
2. data-slot="{primitive_name}" on root element
3. Support className prop via cn() merge
4. Forward all HTML props with ...props spread
5. asChild pattern support if composition needed (Slot from radix-ui)
6. TypeScript: React.ComponentProps<"{base_element}"> & VariantProps<typeof {primitive_name}Variants>
7. Accessibility: focus-visible:ring-3 focus-visible:ring-ring/50, aria-invalid states
8. data-variant and data-size attributes for external styling hooks
9. No inline styles — Tailwind + CSS variables only

File location: ui/primitives/{primitive_name}.tsx

Return complete, production-ready code.`

const EXAMPLE_VALUES = {
  primitive_name: "toggle-group",
  base_element: "div",
  features: ["Multiple toggle buttons", "Selection state management", "Single or multiple selection modes", "Keyboard navigation (arrow keys)"],
  variants: ["default", "outline", "ghost", "Size: sm, default, lg"],
  a11y_requirements: ["ARIA roles for button group", "Keyboard navigation with arrow keys", "Proper focus management", "Screen reader support"],
}

const EMPTY_VALUES = {
  primitive_name: "",
  base_element: "",
  features: [""],
  variants: [""],
  a11y_requirements: [""],
}

type Values = typeof EXAMPLE_VALUES

function MultiInput({
  label,
  values,
  placeholder,
  onChange,
}: {
  label: string
  values: string[]
  placeholder: string
  onChange: (vals: string[]) => void
}) {
  const update = (i: number, v: string) => {
    const next = [...values]
    next[i] = v
    onChange(next)
  }
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))
  const add = () => onChange([...values, ""])

  return (
    <div className="grid gap-2">
      <Label className="text-xs font-semibold">{label}</Label>
      <div className="space-y-2">
        {values.map((val, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="h-9 text-sm focus-visible:ring-primary flex-1"
            />
            {values.length > 1 && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => remove(i)}
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-fit h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground px-1"
        onClick={add}
      >
        <Plus className="size-3" />
        Add item
      </Button>
    </div>
  )
}

export default function NewPrimitivePage() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showExample, setShowExample] = useState(true)
  const [values, setValues] = useState<Values>(EXAMPLE_VALUES)
  const [sheetWidth, setSheetWidth] = useState(50)

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = sheetWidth

    const onMove = (ev: MouseEvent) => {
      const delta = startX - ev.clientX
      const newWidth = Math.min(98, Math.max(30, startWidth + (delta / window.innerWidth) * 100))
      setSheetWidth(newWidth)
    }
    const onUp = () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  const generatePrompt = () => {
    let result = PROMPT
    result = result.replace(/\{primitive_name\}/g, values.primitive_name || "")
    result = result.replace(/\{base_element\}/g, values.base_element || "")
    result = result.replace(/\{features\}/g, values.features.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{variants\}/g, values.variants.filter(Boolean).map(v => `- ${v}`).join("\n") || "")
    result = result.replace(/\{a11y_requirements\}/g, values.a11y_requirements.filter(Boolean).map(a => `- ${a}`).join("\n") || "")
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

  const allFilled =
    values.primitive_name &&
    values.base_element &&
    values.features.some(Boolean) &&
    values.variants.some(Boolean) &&
    values.a11y_requirements.some(Boolean)

  // Highlight all user-entered values in prompt (single-pass regex, no nested replacement)
  const renderPrompt = () => {
    const allValues = [
      values.primitive_name,
      values.base_element,
      ...values.features.filter(Boolean),
      ...values.variants.filter(Boolean),
      ...values.a11y_requirements.filter(Boolean),
    ].filter(Boolean).sort((a, b) => b.length - a.length)

    if (!allValues.length) return <>{finalPrompt}</>

    const pattern = new RegExp(
      allValues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
      "g"
    )

    const parts: (string | JSX.Element)[] = []
    let last = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(finalPrompt)) !== null) {
      if (match.index > last) parts.push(finalPrompt.slice(last, match.index))
      parts.push(<span key={match.index} className="text-primary font-semibold">{match[0]}</span>)
      last = pattern.lastIndex
    }
    if (last < finalPrompt.length) parts.push(finalPrompt.slice(last))
    return <>{parts}</>
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
          <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
            <Plus className="size-3.5" />
            Create
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
        <p className="text-muted-foreground">
          Click "Create" button in the header to open the prompt generator.
        </p>
      </DocsSection>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" style={{ width: `${sheetWidth}vw` }} className="!max-w-none flex flex-col">
          {/* Drag handle */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute left-0 top-0 h-full w-3 cursor-col-resize z-50 flex items-center justify-center group"
          >
            <div className="flex flex-col gap-[3px] opacity-30 group-hover:opacity-100 transition-opacity">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-foreground group-hover:bg-primary transition-colors" />
              ))}
            </div>
          </div>
          <SheetHeader className="px-6 pt-5 pb-4 border-b">
            <SheetTitle className="text-base font-semibold">Prompt Generator</SheetTitle>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Fill in parameters to generate your Token UI prompt</p>
              <button
                className="shrink-0 text-xs text-primary/70 underline underline-offset-2 hover:text-primary transition-colors"
                onClick={() => {
                  setShowExample(!showExample)
                  setValues(showExample ? EMPTY_VALUES : EXAMPLE_VALUES)
                }}
              >
                {showExample ? "Clear fields" : "Load example"}
              </button>
            </div>
          </SheetHeader>

          <div className="flex flex-1 overflow-hidden">
            {/* Left: Form */}
            <div className="flex-1 overflow-y-auto border-r">
              <div className="space-y-6 p-6">
                <div className="grid gap-2">
                  <Label htmlFor="primitive-name" className="text-xs font-semibold">Primitive Name</Label>
                  <Input
                    id="primitive-name"
                    value={values.primitive_name}
                    onChange={(e) => setValues((prev) => ({ ...prev, primitive_name: e.target.value }))}
                    placeholder="e.g., toggle, badge, toggle-group"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="base-element" className="text-xs font-semibold">Base Element/Primitive</Label>
                  <Input
                    id="base-element"
                    value={values.base_element}
                    onChange={(e) => setValues((prev) => ({ ...prev, base_element: e.target.value }))}
                    placeholder="e.g., button, div, input"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>

                <MultiInput
                  label="Required Features"
                  values={values.features}
                  placeholder="e.g., Selection state management"
                  onChange={(v) => setValues((prev) => ({ ...prev, features: v }))}
                />

                <MultiInput
                  label="Variant Options"
                  values={values.variants}
                  placeholder="e.g., default, outline, ghost"
                  onChange={(v) => setValues((prev) => ({ ...prev, variants: v }))}
                />

                <MultiInput
                  label="Accessibility Requirements"
                  values={values.a11y_requirements}
                  placeholder="e.g., ARIA roles for button group"
                  onChange={(v) => setValues((prev) => ({ ...prev, a11y_requirements: v }))}
                />
              </div>
            </div>

            {/* Right: Preview */}
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold">Generated Prompt</h4>
                <div className="text-xs text-muted-foreground">
                  {!allFilled ? (
                    <span className="text-yellow-600">⚠ Fill all parameters</span>
                  ) : (
                    <span className="text-primary">✓ Ready to copy</span>
                  )}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <pre className="text-sm leading-relaxed p-6 whitespace-pre-wrap break-words font-mono text-foreground/80">
                  {renderPrompt()}
                </pre>
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t">
            <Button onClick={handleCopy} className="w-full gap-2 h-9 bg-primary text-white hover:bg-primary/90">
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Prompt
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocsPage>
  )
}
