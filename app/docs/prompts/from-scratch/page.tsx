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
import { Copy, Check, Plus, X } from "lucide-react"

const PROMPT = `You are a Token UI design system engineer.

Build {component_name} from scratch.

Variant: {variant_name}

Requirements:
{requirements}

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

Build guidelines:
1. Location: ui/primitives/{component_name}.tsx (if primitive) or ui/components/{component_name}/ (if component)
2. Use CVA for all variants — export {component_name}Variants
3. data-slot="{component_name}" on root element, child slots get descriptive names
4. Forward all HTML props with ...props spread
5. TypeScript: React.ComponentProps<"element"> & VariantProps<typeof {component_name}Variants>
6. Accessibility: focus-visible:ring-3 focus-visible:ring-ring/50, aria-invalid states
7. No inline styles — Tailwind + CSS variables only
8. Create demo file showing {variant_name} variant

Return complete, production-ready code.`

const EXAMPLE_VALUES = {
  component_name: "combobox",
  variant_name: "searchable",
  requirements: ["Search input that filters dropdown options", "Keyboard navigation (arrow keys, enter, escape)", "Support for option groups", "Async loading state with spinner", "Clear selection button", "Works with react-hook-form"],
}

const EMPTY_VALUES = {
  component_name: "",
  variant_name: "",
  requirements: [""],
}

type Values = typeof EXAMPLE_VALUES

function MultiInput({ label, values, placeholder, onChange }: {
  label: string; values: string[]; placeholder: string; onChange: (vals: string[]) => void
}) {
  const update = (i: number, v: string) => { const next = [...values]; next[i] = v; onChange(next) }
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))
  const add = () => onChange([...values, ""])
  return (
    <div className="grid gap-2">
      <Label className="text-xs font-semibold">{label}</Label>
      <div className="space-y-2">
        {values.map((val, i) => (
          <div key={i} className="flex gap-2">
            <Input value={val} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} className="h-9 text-sm focus-visible:ring-primary flex-1" />
            {values.length > 1 && (
              <Button variant="ghost" size="icon-sm" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => remove(i)}>
                <X className="size-3.5" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="w-fit h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground px-1" onClick={add}>
        <Plus className="size-3" /> Add item
      </Button>
    </div>
  )
}

export default function FromScratchPage() {
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
      setSheetWidth(Math.min(98, Math.max(30, startWidth + (delta / window.innerWidth) * 100)))
    }
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  const generatePrompt = () => {
    let result = PROMPT
    result = result.replace(/\{component_name\}/g, values.component_name || "")
    result = result.replace(/\{variant_name\}/g, values.variant_name || "")
    result = result.replace(/\{requirements\}/g, values.requirements.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [
      values.component_name, values.variant_name,
      ...values.requirements.filter(Boolean),
    ].filter(Boolean).sort((a, b) => b.length - a.length)
    const pattern = allValues.length ? new RegExp(allValues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g") : null
    const hl = (text: string): React.ReactNode => {
      if (!pattern) return text
      const parts: (string | JSX.Element)[] = []; let last = 0; let m: RegExpExecArray | null
      while ((m = pattern.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index))
        parts.push(<span key={m.index} className="text-primary font-semibold">{m[0]}</span>)
        last = pattern.lastIndex
      }
      if (last < text.length) parts.push(text.slice(last))
      return <>{parts}</>
    }
    const allLines = finalPrompt.split("\n")
    const lines = allLines.filter((line, idx) => line.trim() || allLines[idx - 1]?.trim())
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-1" />
          if (line.startsWith("---")) return <div key={i} className="border-t border-border/30 my-1" />
          if (line.match(/^\d+\./)) { const [num, ...rest] = line.split(/\s+/); return <div key={i} className="flex gap-3 text-sm"><span className="font-semibold min-w-fit">{num}</span><div>{hl(rest.join(" "))}</div></div> }
          if (line.startsWith("   ") || line.startsWith("  ")) return <div key={i} className="text-sm pl-4 text-foreground/80">{hl(line.trim())}</div>
          if (line.startsWith("- ")) return <div key={i} className="flex gap-2 text-sm"><span>•</span><div>{hl(line.slice(2))}</div></div>
          return <div key={i} className="text-sm">{hl(line)}</div>
        })}
      </div>
    )
  }

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }, { id: "create", title: "Create Prompt" }]}>
      <DocsPageHeader
        title="Build From Scratch"
        description="Build a brand new component or primitive with full spec"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">Build any new component or primitive from scratch with precise requirements. The AI reads existing code first to match patterns exactly.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Primitives</p><p className="text-xs text-muted-foreground">Base components in ui/primitives/ — CVA, data-slot, composable sub-components, TypeScript types</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Components</p><p className="text-xs text-muted-foreground">Full-featured in ui/components/ — combines primitives, domain-specific, includes demos</p></CardContent></Card>
        </div>
        <DocsCallout title="From Scratch Checklist" variant="info">
          <ul className="space-y-1 text-sm"><li>• Read existing primitives before writing</li><li>• CVA for all variants, export variants object</li><li>• data-slot on every element</li><li>• Accessibility: focus-visible, aria-invalid, keyboard nav</li><li>• No hardcoded colors/spacing — CSS variables only</li></ul>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="create" title="Create Prompt">
        <p className="text-muted-foreground">Click "Create" button in the header to open the prompt generator.</p>
      </DocsSection>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" style={{ width: `${sheetWidth}vw` }} className="!max-w-none flex flex-col">
          <div onMouseDown={handleResizeStart} className="absolute left-0 top-0 h-full w-3 cursor-col-resize z-50 flex items-center justify-center group">
            <div className="flex flex-col gap-[3px] opacity-30 group-hover:opacity-100 transition-opacity">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-[3px] h-[3px] rounded-full bg-foreground group-hover:bg-primary transition-colors" />)}
            </div>
          </div>
          <SheetHeader className="px-6 pt-5 pb-4 border-b">
            <SheetTitle className="text-base font-semibold">Prompt Generator</SheetTitle>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Fill in parameters to generate your Token UI prompt</p>
              <button className="shrink-0 text-xs text-primary/70 underline underline-offset-2 hover:text-primary transition-colors" onClick={() => { setShowExample(!showExample); setValues(showExample ? EMPTY_VALUES : EXAMPLE_VALUES) }}>
                {showExample ? "Clear fields" : "Load example"}
              </button>
            </div>
          </SheetHeader>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto border-r">
              <div className="space-y-6 p-6">
                <div className="grid gap-2"><Label className="text-xs font-semibold">Component Name</Label><Input value={values.component_name} onChange={(e) => setValues(p => ({ ...p, component_name: e.target.value }))} placeholder="e.g., combobox, date-picker" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Variant Name</Label><Input value={values.variant_name} onChange={(e) => setValues(p => ({ ...p, variant_name: e.target.value }))} placeholder="e.g., searchable, multi-select" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Requirements" values={values.requirements} placeholder="e.g., Keyboard navigation with arrow keys" onChange={(v) => setValues(p => ({ ...p, requirements: v }))} />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold">Generated Prompt</h4>
                <div className="text-xs"><span className="text-primary">✓ Ready to copy</span></div>
              </div>
              <div className="flex-1 overflow-y-auto"><div className="p-6">{renderPrompt()}</div></div>
            </div>
          </div>
          <SheetFooter className="px-6 py-4 border-t">
            <Button onClick={handleCopy} className="w-full gap-2 h-9 bg-primary text-white hover:bg-primary/90">
              {copied ? <><Check className="size-4" />Copied to clipboard</> : <><Copy className="size-4" />Copy Prompt</>}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocsPage>
  )
}
