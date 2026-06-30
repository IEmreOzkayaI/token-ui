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

const PROMPT = `You are a Token UI migration specialist.

Migrate component: {source_component}
Target name: {target_name}
Migration scope: {migration_scope}

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

Token UI Standards (target format):

1. STRUCTURE
   - Use CVA for variants
   - data-slot attributes on all elements
   - Composable sub-components

2. PROPS
   - Support variant and size props
   - Support className for customization
   - Forward all HTML props

3. EXPORTS
   - Named export: PascalCase
   - Export variants CVA

4. STYLING
   - Tailwind CSS only
   - CSS custom properties from app/globals.css
   - Support light/dark mode via CSS variables
   - Use data-attribute selectors

5. TYPES
   - TypeScript: React.ComponentProps<"element"> & VariantProps<typeof cva>

6. A11Y
   - focus-visible states
   - aria-invalid states
   - Proper roles and labels
${RESPONSIVE_REQUIREMENTS_SECTION}

Return:
1. Migrated component(s)
2. Demo files
3. Migration guide
4. Breaking changes list
5. Testing checklist`

const EXAMPLE_VALUES = {
  source_component: "app/old/dialog-old.tsx",
  target_name: "dialog",
  migration_scope: "primitive",
}

const EMPTY_VALUES = {
  source_component: "",
  target_name: "",
  migration_scope: "",
}

type Values = typeof EXAMPLE_VALUES

export default function MigrationPage() {
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
    result = result.replace(/\{source_component\}/g, values.source_component || "")
    result = result.replace(/\{target_name\}/g, values.target_name || "")
    result = result.replace(/\{migration_scope\}/g, values.migration_scope || "")
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [values.source_component, values.target_name, values.migration_scope].filter(Boolean).sort((a, b) => b.length - a.length)
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
        title="Component Migration"
        description="Convert legacy components to Token UI standard"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">Bringing in a shadcn component or migrating from another design system? This prompt maps the existing component's props and styles to Token UI patterns — CVA variants, CSS variable tokens, data-slot attributes — and produces a migration guide alongside the code.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Scope: primitive</p><p className="text-xs text-muted-foreground">Output goes to ui/primitives/ — CVA definition, data-slot, TypeScript types. Suitable for simple components.</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Scope: component</p><p className="text-xs text-muted-foreground">Output goes to ui/components/ — can compose primitives, includes demo files. Suitable for complex components.</p></CardContent></Card>
        </div>
        <DocsCallout title="Migration steps" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• AI reads the source component in full</li>
            <li>• Maps existing props to Token UI variant/size props</li>
            <li>• Converts styling to Tailwind + CSS variables</li>
            <li>• Adds data-slot, accessibility states, TypeScript types</li>
            <li>• Produces migration guide with breaking changes list</li>
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
                <div className="grid gap-2"><Label className="text-xs font-semibold">Source Component</Label><Input value={values.source_component} onChange={(e) => setValues(p => ({ ...p, source_component: e.target.value }))} placeholder="e.g., app/old/dialog-old.tsx" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Target Name</Label><Input value={values.target_name} onChange={(e) => setValues(p => ({ ...p, target_name: e.target.value }))} placeholder="e.g., dialog" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Migration Scope</Label><Input value={values.migration_scope} onChange={(e) => setValues(p => ({ ...p, migration_scope: e.target.value }))} placeholder="e.g., primitive, component" className="h-9 text-sm focus-visible:ring-primary" /></div>
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
