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

Create demo file for component: {component_name}

Demo type: {demo_type}
Demo file name: {demo_name}.tsx
Demo purpose: {demo_content}

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
1. Location: ui/components/{component_name}/{demo_name}.tsx
2. Import from @/primitives/{component_name} or @/components/{component_name}
3. Keep demo simple and focused
4. Show only one thing (one variant, all sizes, or interactive example)
5. Use semantic HTML when possible
6. Include accessibility attributes (aria-label, role, etc.)
7. For interactive demos: use useState from react
8. For variant demos: show variant prop values
9. For size demos: show all size options side by side
10. Use Lucide React icons if needed

Return production-ready demo component.`

const EXAMPLE_VALUES = {
  component_name: "button",
  demo_type: "size",
  demo_name: "size",
  demo_content: "Show all button sizes (xs, sm, default, lg) with both text and icon variants side by side",
}

const EMPTY_VALUES = {
  component_name: "",
  demo_type: "",
  demo_name: "",
  demo_content: "",
}

type Values = typeof EXAMPLE_VALUES

export default function DemoGenerationPage() {
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
    result = result.replace(/\{component_name\}/g, values.component_name || "")
    result = result.replace(/\{demo_type\}/g, values.demo_type || "")
    result = result.replace(/\{demo_name\}/g, values.demo_name || "")
    result = result.replace(/\{demo_content\}/g, values.demo_content || "")
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
    values.component_name &&
    values.demo_type &&
    values.demo_name &&
    values.demo_content

  const renderPrompt = () => {
    const allValues = [
      values.component_name,
      values.demo_type,
      values.demo_name,
      values.demo_content,
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
            const [label] = line.split(" → ")
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
        title="Demo Generation"
        description="Create demo file for component variant/size"
        action={
          <Button onClick={() => setOpen(true)} size="sm" className="gap-2">
            <Plus className="size-3.5" />
            Create
          </Button>
        }
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-6">Demo files power the live examples in the docs. Each file exports a single React component with no props — just a focused illustration of one concept. Use this prompt to generate them quickly and correctly.</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">Demo types</p><p className="text-xs text-muted-foreground">variant — show one variant; size — all sizes side by side; interactive — with useState; state — loading/error/empty states</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm font-medium mb-1">File location</p><p className="text-xs text-muted-foreground">ui/components/[name]/[demo-name].tsx — one file per concept, imported by the docs page as a live example</p></CardContent></Card>
        </div>
        <DocsCallout title="One concept per file" variant="info">
          <ul className="space-y-1 text-sm">
            <li>• default.tsx — the default variant</li>
            <li>• [variant].tsx — one variant per file</li>
            <li>• size.tsx — all sizes together</li>
            <li>• demo.tsx — interactive example with state</li>
            <li>• icon.tsx — icon usage patterns</li>
          </ul>
        </DocsCallout>
      </DocsSection>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" style={{ width: `${sheetWidth}vw` }} className="!max-w-none flex flex-col">
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

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto border-r">
              <div className="space-y-6 p-6">
                <div className="grid gap-2">
                  <Label htmlFor="component-name" className="text-xs font-semibold">Component Name</Label>
                  <Input
                    id="component-name"
                    value={values.component_name}
                    onChange={(e) => setValues((prev) => ({ ...prev, component_name: e.target.value }))}
                    placeholder="e.g., button, badge, card"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="demo-type" className="text-xs font-semibold">Demo Type</Label>
                  <Input
                    id="demo-type"
                    value={values.demo_type}
                    onChange={(e) => setValues((prev) => ({ ...prev, demo_type: e.target.value }))}
                    placeholder="e.g., variant, size, interactive, state"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="demo-name" className="text-xs font-semibold">Demo File Name</Label>
                  <Input
                    id="demo-name"
                    value={values.demo_name}
                    onChange={(e) => setValues((prev) => ({ ...prev, demo_name: e.target.value }))}
                    placeholder="e.g., size, ghost, interactive"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="demo-content" className="text-xs font-semibold">Demo Purpose</Label>
                  <Input
                    id="demo-content"
                    value={values.demo_content}
                    onChange={(e) => setValues((prev) => ({ ...prev, demo_content: e.target.value }))}
                    placeholder="e.g., Show all button sizes side by side"
                    className="h-9 text-sm focus-visible:ring-primary"
                  />
                </div>
              </div>
            </div>

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
