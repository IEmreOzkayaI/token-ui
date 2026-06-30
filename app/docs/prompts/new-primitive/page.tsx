"use client"

import { useState } from "react"
import { Button } from "@/primitives/button"
import { Input } from "@/primitives/input"
import { Label } from "@/primitives/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/primitives/sheet"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { PromptGuide, PromptGuideList } from "@/app/docs/_components/prompt-guide"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { Copy, Check, Plus, X, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PromptCopyStatus } from "@/app/docs/prompts/_components/prompt-fields"
import { RESPONSIVE_REQUIREMENTS_SECTION } from "@/app/docs/prompts/_lib/responsive-requirements"

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
${RESPONSIVE_REQUIREMENTS_SECTION}

Return complete, production-ready code.`

const DOCS_ADDON = `
---

ALSO GENERATE DOCUMENTATION:

After creating the primitive, create a complete documentation page with source code visibility:

File: app/docs/ui/components/{primitive_name}/page.tsx

1. Create demo files in ui/components/{primitive_name}/
   - default.tsx
   - demo.tsx (interactive with useState)
   - size.tsx (all sizes side by side, if applicable)
   - [variant].tsx (one per variant: ghost.tsx, outline.tsx, etc.)

2. Create the docs page structure:
   - DocsPageHeader (title, description)
   - Overview section
   - Examples section (ComponentExample for each demo)
   - Props table
   - Component Source section (REQUIRED - see below)
   - Accessibility section
   - Best Practices section

3. Component Source Section (REQUIRED):
   Add a "Component Source" DocsSection showing:
   a) Primitive structure: Show index.tsx implementation
   b) CVA Definition: Show the cva() setup with all variants and sizes
   c) TypeScript Types: Show VariantProps usage
   d) Export Pattern: Show how component and variantsCva are exported

   Reference FuelPumpStatusCard docs for pattern: /docs/ui/components/fuel-pump-status-card#component-source

Imports:
   - Import DocsPage, DocsPageHeader, DocsSection, DocsCallout from @/app/docs/_components/
   - Import ComponentExample from @/app/docs/_components/component-example
   - Import readSource from @/lib/read-source
   - Create examples array importing all demo files
   - Structure: DocsPageHeader → Overview → Examples (ComponentExample per demo) → Props table → Best Practices (DocsCallout)

Return all files: primitive + demos + docs page.`

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
  const [withDocs, setWithDocs] = useState(true)

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
    if (withDocs) result += DOCS_ADDON.replace(/\{primitive_name\}/g, values.primitive_name || "")
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

  // Highlight + format prompt with sections, lists, code blocks
  const renderPrompt = () => {
    const allValues = [
      values.primitive_name,
      values.base_element,
      ...values.features.filter(Boolean),
      ...values.variants.filter(Boolean),
      ...values.a11y_requirements.filter(Boolean),
    ].filter(Boolean).sort((a, b) => b.length - a.length)

    const pattern = allValues.length ? new RegExp(
      allValues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
      "g"
    ) : null

    const highlightText = (text: string) => {
      if (!pattern) return text
      const parts: (string | JSX.Element)[] = []
      let last = 0
      let match: RegExpExecArray | null
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index))
        parts.push(<span key={match.index} className="text-primary font-semibold">{match[0]}</span>)
        last = pattern.lastIndex
      }
      if (last < text.length) parts.push(text.slice(last))
      return parts.length ? parts : text
    }

    const allLines = finalPrompt.split("\n")
    const lines = allLines.filter((line, idx) => line.trim() || allLines[idx - 1]?.trim())
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-1" />
          if (line.startsWith("---")) return <div key={i} className="border-t border-border/30 my-1" />
          if (line.match(/^\d+\./)) {
            const [num, ...rest] = line.split(/\s+/)
            return <div key={i} className="flex gap-3 text-sm"><span className="font-semibold min-w-fit">{num}</span><div>{highlightText(rest.join(" "))}</div></div>
          }
          if (line.startsWith("  ")) return <div key={i} className="text-sm pl-4 text-foreground/80">{highlightText(line.trim())}</div>
          if (line.startsWith("- ")) return <div key={i} className="flex gap-2 text-sm"><span>•</span><div>{highlightText(line.slice(2))}</div></div>
          if (line.includes(" → ")) {
            const [label, desc] = line.split(" → ")
            return <div key={i} className="text-sm space-y-1"><div className="font-semibold text-foreground">{highlightText(label)}</div></div>
          }
          return <div key={i} className="text-sm">{highlightText(line)}</div>
        })}
      </div>
    )
  }

  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
    ]}>
      <DocsPageHeader
        title="Create Primitive"
        description="Sistemde olmayan temel UI parçasını sıfırdan oluşturur"
        action={
          <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
            <Plus className="size-3.5" />
            Create
          </Button>
        }
      />

      <DocsSection id="overview" title="Overview">
        <PromptGuide
          summary={
            <>
              Token UI&apos;nin en küçük yapı taşları{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                ui/primitives/
              </code>{" "}
              altında durur. Bu prompt, sistemde <strong className="text-foreground">hiç olmayan</strong>{" "}
              yeni bir temel parça yazdırmak içindir.
            </>
          }
          useWhen="İhtiyacın olan parça primitives klasöründe yok — toggle-group, file-upload, rating gibi. Başka component'ler bunun üstüne kurulacak."
          avoidWhen={
            <>
              Button var, sadece premium stili lazım → <strong>Extend Primitive</strong> veya{" "}
              <strong>Add Variant</strong>. Card + Badge birleştirmek → <strong>Compose Component</strong>.
            </>
          }
          example={
            <>
              &quot;Rating component lazım — 1-5 yıldız, keyboard ile seçilebilir, aria-label&apos;lı.&quot;
              <span className="mt-2 block text-muted-foreground">
                → <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ui/primitives/rating.tsx</code> üretilir
              </span>
            </>
          }
          outputs={
            <PromptGuideList
              items={[
                "CVA variant tanımı — [name]Variants olarak export",
                "data-slot root ve child element'lerde",
                "TypeScript: React.ComponentProps & VariantProps",
                "focus-visible, aria-invalid, ARIA rolleri",
                "Named export: component + variants object",
              ]}
            />
          }
        />
      </DocsSection>

      <Sheet open={open} onOpenChange={setOpen}>

      <DocsSection id="implementation" title="Implementation Guide">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Real-world example: FuelPumpStatusCard</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete component combining multiple primitives. Shows structure, sub-components, and implementation patterns.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Component Structure</h4>
              <pre className="text-xs overflow-x-auto p-3 rounded-lg border bg-muted/50"><code>{`ui/components/fuel-pump-status-card/
  ├─ index.tsx              (main component + sub-components)
  ├─ types.ts               (TypeScript types)
  ├─ utils.ts               (formatting helpers)
  ├─ _fixtures.ts           (test data)
  ├─ usage.tsx              (real usage example)
  └─ *.tsx                  (demo variants)`}</code></pre>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Component Implementation Pattern</h4>
              <p className="text-xs text-muted-foreground mb-3">
                See full source: <a href="/docs/ui/components/fuel-pump-status-card#component-source" className="text-primary hover:underline">FuelPumpStatusCard docs →</a>
              </p>
              <div className="overflow-x-auto rounded-lg border bg-background">
                <pre className="text-xs p-4"><code>{`// Main component structure:
export function YourComponent({
  variant = "default",
  size = "md",
  className,
  onClick,
  ...props
}: YourComponentProps) {
  const isCompact = variant === "compact"

  return (
    <div
      data-slot="your-component"
      data-variant={variant}
      data-size={size}
      role={onClick ? "button" : undefined}
      className={cn(yourComponentVariants({ variant, size }), className)}
      onClick={onClick}
      {...props}
    >
      <SubComponent1 />
      {!isCompact && <SubComponent2 />}
    </div>
  )
}

export { yourComponentVariants }`}</code></pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Key Patterns</h4>
              <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-5">
                <li><code className="text-foreground">data-slot</code> attributes on all elements for styling hooks</li>
                <li>CVA (class-variance-authority) for variant management</li>
                <li>Composable sub-components for complex layouts</li>
                <li>TypeScript types exported alongside component</li>
                <li>Formatting utilities in separate utils.ts file</li>
                <li>Test data in _fixtures.ts for demos</li>
              </ul>
            </div>
          </div>
        </div>
      </DocsSection>
        <SheetContent side="right" style={{ width: `${sheetWidth}vw` }} className="!max-w-none flex h-dvh flex-col gap-0 overflow-hidden p-0">
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
          <SheetHeader className="shrink-0 border-b px-6 pb-4 pt-5">
            <SheetTitle className="text-base font-semibold">Prompt Generator</SheetTitle>
            <div className="flex items-center gap-2 justify-between w-full">
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

          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Left: Form */}
            <div className="min-h-0 flex-1 overflow-y-auto border-r no-scrollbar">
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
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
                <h4 className="text-sm font-semibold">Generated Prompt</h4>
                <div className="text-xs text-muted-foreground">
                  <PromptCopyStatus ready={Boolean(allFilled)} />
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
                <pre className="text-sm leading-relaxed p-6 whitespace-pre-wrap break-words font-mono text-foreground/80">
                  {renderPrompt()}
                </pre>
              </div>
            </div>
          </div>

          <SheetFooter className="shrink-0 border-t px-6 py-4">
            <div className="flex items-center gap-3 w-full">
              <Button onClick={handleCopy} className="flex-1 gap-2 h-9 bg-primary text-white hover:bg-primary/90">
                {copied ? <><Check className="size-4" />Copied to clipboard</> : <><Copy className="size-4" />Copy Prompt</>}
              </Button>
              <button
                onClick={() => setWithDocs(!withDocs)}
                className={cn(
                  "flex items-center gap-1.5 h-8 px-2.5 rounded-md text-xs font-medium transition-colors shrink-0",
                  withDocs
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {withDocs && <Check className="size-3" />}
                Include docs
              </button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    
    </DocsPage>
  )
}
