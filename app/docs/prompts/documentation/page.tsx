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
import { PromptCopyStatus } from "@/app/docs/prompts/_components/prompt-fields"
import { RESPONSIVE_REQUIREMENTS_SECTION } from "@/app/docs/prompts/_lib/responsive-requirements"
import { BLOCK_DOCUMENTATION_GUIDELINES_SECTION } from "@/app/docs/prompts/_lib/block-subcomponent-requirements"

const PROMPT = `You are a Token UI design system engineer.

Create documentation for: {component_name}

Component location: {component_path}

Available demos:
{examples_available}

Key props to document:
{key_props}

Primary use cases:
{use_cases}

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
1. Create: app/docs/ui/components/{component_name}/page.tsx
2. Import ComponentExample, DocsPage, DocsSection, DocsCallout
3. Create examples array with all demo files
4. Use readSource() for code display
5. Structure:
   - DocsPageHeader with title/description
   - Overview section
   - Installation section
   - Examples section (ComponentExample for each demo)
   - Props documentation section
   - Best practices section (DocsCallout)
6. Show real examples with ComponentExample
7. Display source code with readSource
${BLOCK_DOCUMENTATION_GUIDELINES_SECTION}
${RESPONSIVE_REQUIREMENTS_SECTION}

Return production-ready documentation page.`

const EXAMPLE_VALUES = {
  component_name: "badge",
  component_path: "ui/primitives/badge",
  examples_available: ["default.tsx (default variant)", "destructive.tsx", "success.tsx", "outline.tsx", "size.tsx (all sizes)", "demo.tsx (interactive)"],
  key_props: ["variant: default | secondary | destructive | success | outline | warning", "size: sm | default | lg", "className: custom classes"],
  use_cases: ["Status indicators", "Tags and labels", "Notification badges", "Category labels"],
}

const EMPTY_VALUES = {
  component_name: "",
  component_path: "",
  examples_available: [""],
  key_props: [""],
  use_cases: [""],
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

export default function DocumentationPage() {
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
    result = result.replace(/\{component_path\}/g, values.component_path || "")
    result = result.replace(/\{examples_available\}/g, values.examples_available.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{key_props\}/g, values.key_props.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{use_cases\}/g, values.use_cases.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [
      values.component_name, values.component_path,
      ...values.examples_available.filter(Boolean),
      ...values.key_props.filter(Boolean),
      ...values.use_cases.filter(Boolean),
    ].filter(Boolean).sort((a, b) => b.length - a.length)
    const pattern = allValues.length ? new RegExp(allValues.map(v => v.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")).join("|"), "g") : null
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
        title="Documentation Generation"
        description="Create documentation page for a component"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">Token UI docs are generated from actual code — ComponentExample renders live previews, readSource() shows the implementation. This prompt produces a complete, structured docs page that imports all your demo files and documents every prop.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">What gets generated</p><p className="text-xs text-muted-foreground">Full docs page with live component examples, props table, usage patterns, and best practices callout</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">File location</p><p className="text-xs text-muted-foreground">app/docs/ui/components/[name]/page.tsx — structured with DocsPageHeader, DocsSection, ComponentExample, CodeBlock</p></CardContent></Card>
        </div>
        <DocsCallout title="Docs page structure" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• DocsPageHeader — title + description</li>
            <li>• Overview section — when to use, key features</li>
            <li>• Examples section — ComponentExample for each demo file</li>
            <li>• Props section — typed props table</li>
            <li>• Best Practices — DocsCallout with do/don't</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" style={{ width: `${sheetWidth}vw` }} className="!max-w-none flex h-dvh flex-col gap-0 overflow-hidden p-0">
          <div onMouseDown={handleResizeStart} className="absolute left-0 top-0 h-full w-3 cursor-col-resize z-50 flex items-center justify-center group">
            <div className="flex flex-col gap-[3px] opacity-30 group-hover:opacity-100 transition-opacity">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-[3px] h-[3px] rounded-full bg-foreground group-hover:bg-primary transition-colors" />)}
            </div>
          </div>
          <SheetHeader className="shrink-0 border-b px-6 pb-4 pt-5">
            <SheetTitle className="text-base font-semibold">Prompt Generator</SheetTitle>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Fill in parameters to generate your Token UI prompt</p>
              <button className="shrink-0 text-xs text-primary/70 underline underline-offset-2 hover:text-primary transition-colors" onClick={() => { setShowExample(!showExample); setValues(showExample ? EMPTY_VALUES : EXAMPLE_VALUES) }}>
                {showExample ? "Clear fields" : "Load example"}
              </button>
            </div>
          </SheetHeader>
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto border-r no-scrollbar">
              <div className="space-y-6 p-6">
                <div className="grid gap-2"><Label className="text-xs font-semibold">Component Name</Label><Input value={values.component_name} onChange={(e) => setValues(p => ({ ...p, component_name: e.target.value }))} placeholder="e.g., badge, button, card" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Component Path</Label><Input value={values.component_path} onChange={(e) => setValues(p => ({ ...p, component_path: e.target.value }))} placeholder="e.g., ui/primitives/badge" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Available Demos" values={values.examples_available} placeholder="e.g., default.tsx (default variant)" onChange={(v) => setValues(p => ({ ...p, examples_available: v }))} />
                <MultiInput label="Key Props" values={values.key_props} placeholder="e.g., variant: default | outline | ghost" onChange={(v) => setValues(p => ({ ...p, key_props: v }))} />
                <MultiInput label="Primary Use Cases" values={values.use_cases} placeholder="e.g., Status indicators" onChange={(v) => setValues(p => ({ ...p, use_cases: v }))} />
              </div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
                <h4 className="text-sm font-semibold">Generated Prompt</h4>
                <div className="text-xs"><PromptCopyStatus ready /></div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar"><div className="p-6">{renderPrompt()}</div></div>
            </div>
          </div>
          <SheetFooter className="shrink-0 border-t px-6 py-4">
            <Button onClick={handleCopy} className="w-full gap-2 h-9 bg-primary text-white hover:bg-primary/90">
              {copied ? <><Check className="size-4" />Copied to clipboard</> : <><Copy className="size-4" />Copy Prompt</>}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocsPage>
  )
}
