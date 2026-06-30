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

Enhance existing primitive: {primitive_name}

Current location: ui/primitives/{primitive_name}.tsx

Enhancement type: {enhancement_type}

Changes required:
{changes}

Backwards compatibility: {backwards_compatibility}

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

Guidelines:
1. Read ui/primitives/{primitive_name}.tsx fully before making changes
2. If adding variants/sizes, follow existing naming pattern
3. Maintain consistency with other primitives
4. Update data-slot attributes if needed
5. Ensure accessibility maintained or improved
6. Update exports if new variants added
7. Keep component API stable

Return only the modified code sections with explanations.`

const EXAMPLE_VALUES = {
  primitive_name: "button",
  enhancement_type: "new-variant",
  changes: ["Add 'premium' variant using accent colors with elevated shadow", "Premium variant available for all existing sizes", "Slightly increased padding for premium variant"],
  backwards_compatibility: "yes",
}

const EMPTY_VALUES = {
  primitive_name: "",
  enhancement_type: "",
  changes: [""],
  backwards_compatibility: "",
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

export default function EnhancePrimitivePage() {
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
    result = result.replace(/\{primitive_name\}/g, values.primitive_name || "")
    result = result.replace(/\{enhancement_type\}/g, values.enhancement_type || "")
    result = result.replace(/\{changes\}/g, values.changes.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{backwards_compatibility\}/g, values.backwards_compatibility || "")
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [
      values.primitive_name, values.enhancement_type, values.backwards_compatibility,
      ...values.changes.filter(Boolean),
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
    <DocsPage toc={[{ id: "overview", title: "Overview" }]}>
      <DocsPageHeader
        title="Existing Primitive Enhancement"
        description="Add variants, sizes, or improvements to existing primitive"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">The primitives in ui/primitives/ are designed to grow. Use this when you need to extend one with a new variant, size, or accessibility improvement — the AI reads the file first so it follows the exact same patterns already there.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">When to use</p><p className="text-xs text-muted-foreground">An existing primitive is missing a variant you need, lacks a size option, or has gaps in its accessibility states.</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">When NOT to use</p><p className="text-xs text-muted-foreground">Don't use this to add completely new behavior. For new primitives use New Primitive; for component-level changes use Modify Existing.</p></CardContent></Card>
        </div>
        <DocsCallout title="Enhancement types" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• new-variant — add a CVA variant option (e.g. 'premium', 'warning')</li>
            <li>• new-size — add a size option (e.g. 'xs', '2xl')</li>
            <li>• a11y-improvement — add missing ARIA states or keyboard behavior</li>
            <li>• refactor — improve consistency without changing the API</li>
          </ul>
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
                <div className="grid gap-2"><Label className="text-xs font-semibold">Primitive Name</Label><Input value={values.primitive_name} onChange={(e) => setValues(p => ({ ...p, primitive_name: e.target.value }))} placeholder="e.g., button, input, badge" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Enhancement Type</Label><Input value={values.enhancement_type} onChange={(e) => setValues(p => ({ ...p, enhancement_type: e.target.value }))} placeholder="e.g., new-variant, new-size, a11y-improvement" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Changes Required" values={values.changes} placeholder="e.g., Add premium variant with accent colors" onChange={(v) => setValues(p => ({ ...p, changes: v }))} />
                <div className="grid gap-2"><Label className="text-xs font-semibold">Backwards Compatibility</Label><Input value={values.backwards_compatibility} onChange={(e) => setValues(p => ({ ...p, backwards_compatibility: e.target.value }))} placeholder="e.g., yes, no" className="h-9 text-sm focus-visible:ring-primary" /></div>
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
    
      <DocsSection title="Next Step" className="mt-12 pt-8 border-t">
        <DocsCallout title="Generate Documentation" variant="default">
          <p className="text-sm mb-2">Once your component or primitive is complete, use the <strong>Documentation</strong> prompt to generate a full docs page. It will:</p>
          <ul className="space-y-1 text-sm">
            <li>• Create app/docs/ui/components/[name]/page.tsx</li>
            <li>• Import all your demo files as live examples</li>
            <li>• Generate a props table from your TypeScript types</li>
            <li>• Document when to use, best practices, accessibility notes</li>
          </ul>
        </DocsCallout>
      </DocsSection>

    </DocsPage>
  )
}
