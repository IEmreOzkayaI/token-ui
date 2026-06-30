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

const PROMPT = `You are a Token UI design system engineer auditor.

Audit scope: {audit_scope}
Target: {target}
Focus areas:
{focus_areas}

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

Audit against Token UI standards:

1. NAMING CONVENTIONS
   - Primitives: kebab-case, lowercase
   - Exports: PascalCase
   - data-slot: kebab-case with prefix

2. ARCHITECTURE
   - Uses CVA for variants
   - Has data-slot attributes
   - Supports className prop
   - Forwards all HTML props
   - TypeScript typed

3. TOKENS
   - Uses CSS custom properties from app/globals.css
   - No hardcoded colors/spacing
   - Light/dark mode support

4. ACCESSIBILITY
   - focus-visible states
   - aria-invalid for errors
   - Proper color contrast (WCAG AA)

5. STYLING
   - Uses Tailwind CSS
   - Uses data-attribute selectors
   - Dark mode via CSS variables

Return audit report with compliance status (✅/❌) for each area, specific issues, and priority fixes.`

const EXAMPLE_VALUES = {
  audit_scope: "component",
  target: "ui/components/dialog",
  focus_areas: ["Token usage (colors, spacing)", "Accessibility (keyboard, screen reader, ARIA)", "Styling consistency", "Documentation completeness"],
}

const EMPTY_VALUES = {
  audit_scope: "",
  target: "",
  focus_areas: [""],
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

export default function DesignSystemAuditPage() {
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
    result = result.replace(/\{audit_scope\}/g, values.audit_scope || "")
    result = result.replace(/\{target\}/g, values.target || "")
    result = result.replace(/\{focus_areas\}/g, values.focus_areas.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [values.audit_scope, values.target, ...values.focus_areas.filter(Boolean)].filter(Boolean).sort((a, b) => b.length - a.length)
    const pattern = allValues.length ? new RegExp(allValues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g") : null
    const highlightText = (text: string) => {
      if (!pattern) return <>{text}</>
      const parts: (string | JSX.Element)[] = []; let last = 0; let match: RegExpExecArray | null
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index))
        parts.push(<span key={match.index} className="text-primary font-semibold">{match[0]}</span>)
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
          if (line.match(/^\d+\./)) { const [num, ...rest] = line.split(/\s+/); return <div key={i} className="flex gap-3 text-sm"><span className="font-semibold min-w-fit">{num}</span><div>{highlightText(rest.join(" "))}</div></div> }
          if (line.startsWith("   ") || line.startsWith("  ")) return <div key={i} className="text-sm pl-4 text-foreground/80">{highlightText(line.trim())}</div>
          if (line.startsWith("- ")) return <div key={i} className="flex gap-2 text-sm"><span>•</span><div>{highlightText(line.slice(2))}</div></div>
          return <div key={i} className="text-sm">{highlightText(line)}</div>
        })}
      </div>
    )
  }

  return (
    <DocsPage toc={[{ id: "overview", title: "Overview" }]}>
      <DocsPageHeader
        title="Design System Audit"
        description="Review code for Token UI standards compliance"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">Audit components and code for compliance with Token UI standards and best practices.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Scope Options</p><ul className="text-xs text-muted-foreground space-y-1"><li>• primitive: Single base component</li><li>• component: Full component</li><li>• documentation: Docs page</li><li>• full: Entire directory</li></ul></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">When to Use</p><ul className="text-xs text-muted-foreground space-y-1"><li>• Before shipping new component</li><li>• Code review preparation</li><li>• Migration assessment</li></ul></CardContent></Card>
        </div>
        <DocsCallout title="Audit Areas" variant="info">
          <ul className="space-y-1 text-sm"><li>• Naming conventions (kebab-case, PascalCase exports)</li><li>• Architecture (CVA, data-slot, className support)</li><li>• Token compliance (no hardcoded values)</li><li>• Accessibility (focus-visible, aria-invalid, contrast)</li><li>• Styling (Tailwind + data-attribute selectors)</li></ul>
        </DocsCallout>
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
                <div className="grid gap-2">
                  <Label className="text-xs font-semibold">Audit Scope</Label>
                  <Input value={values.audit_scope} onChange={(e) => setValues(p => ({ ...p, audit_scope: e.target.value }))} placeholder="e.g., component, primitive, full" className="h-9 text-sm focus-visible:ring-primary" />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-semibold">Target</Label>
                  <Input value={values.target} onChange={(e) => setValues(p => ({ ...p, target: e.target.value }))} placeholder="e.g., ui/components/dialog" className="h-9 text-sm focus-visible:ring-primary" />
                </div>
                <MultiInput label="Focus Areas" values={values.focus_areas} placeholder="e.g., Token usage compliance" onChange={(v) => setValues(p => ({ ...p, focus_areas: v }))} />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold">Generated Prompt</h4>
                <div className="text-xs">{(!values.audit_scope || !values.target) ? <span className="text-yellow-600">⚠ Fill all parameters</span> : <span className="text-primary">✓ Ready to copy</span>}</div>
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
