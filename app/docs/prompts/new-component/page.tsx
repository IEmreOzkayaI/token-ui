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
import { Copy, Check, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { PromptCopyStatus } from "@/app/docs/prompts/_components/prompt-fields"
import { RESPONSIVE_REQUIREMENTS_SECTION } from "@/app/docs/prompts/_lib/responsive-requirements"

const PROMPT = `You are a Token UI design system engineer.

Create a new component: {component_name}

Primitives to combine/extend:
{primitives_used}

Required features:
{features}

State management approach: {state_management}

Key usage examples:
{documentation_examples}

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

Screen blocks → use Build Screen prompt (/docs/prompts/build-screen) — NOT this prompt.
  Full dashboards decompose into ui/blocks/{slug}/_components/ with sub-component docs.

---

Guidelines:
1. Create folder: ui/components/{component_name}/
2. Use existing primitives when possible
3. Create composable sub-components if complex
4. Add data-slot attributes to all parts
5. Support variant and size props from primitives
6. Include accessibility best practices
7. Support light/dark mode via CSS variables
8. Add TypeScript types for all props
9. Keep component API minimal and clear
10. Create demo files (default.tsx, demo.tsx)
${RESPONSIVE_REQUIREMENTS_SECTION}

Return:
1. Main component file(s)
2. Demo files structure
3. Documentation code example`

const EXAMPLE_VALUES = {
  component_name: "stat-card",
  primitives_used: ["Card (for container)", "Label (for title)", "Badge (for trend indicator)"],
  features: ["Display numeric stat with label", "Optional trend indicator (up/down arrow)", "Optional description text", "Support loading state"],
  state_management: "external (all props)",
  documentation_examples: ["Revenue stat with 12% upward trend", "User count with description text", "Loading skeleton state"],
}

const EMPTY_VALUES = {
  component_name: "",
  primitives_used: [""],
  features: [""],
  state_management: "",
  documentation_examples: [""],
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

export default function NewComponentPage() {
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
      setSheetWidth(Math.min(98, Math.max(30, startWidth + (delta / window.innerWidth) * 100)))
    }
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  const generatePrompt = () => {
    let result = PROMPT
    result = result.replace(/\{component_name\}/g, values.component_name || "")
    result = result.replace(/\{primitives_used\}/g, values.primitives_used.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{features\}/g, values.features.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    result = result.replace(/\{state_management\}/g, values.state_management || "")
    result = result.replace(/\{documentation_examples\}/g, values.documentation_examples.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    if (withDocs) result += `\n---\n\nALSO GENERATE DOCUMENTATION:\n\nAfter creating the component, also create a full documentation page:\n\nFile: app/docs/ui/components/${values.component_name || "{component_name}"}/page.tsx\n\n1. Create demo files in ui/components/${values.component_name || "{component_name}"}/ - default.tsx, demo.tsx, size.tsx, one per variant\n2. Create the docs page:\n   - Import DocsPage, DocsPageHeader, DocsSection, DocsCallout from @/app/docs/_components/\n   - Import ComponentExample from @/app/docs/_components/component-example\n   - Structure: DocsPageHeader → Overview → Examples (ComponentExample per demo) → Props table → Best Practices\n\nReturn: component files + demos + docs page.`
    return result
  }

  const finalPrompt = generatePrompt()

  const handleCopy = async () => {
    const ok = await copyToClipboard(finalPrompt)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const renderPrompt = () => {
    const allValues = [
      values.component_name, values.state_management,
      ...values.primitives_used.filter(Boolean),
      ...values.features.filter(Boolean),
      ...values.documentation_examples.filter(Boolean),
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
        title="Compose Component"
        description="Hazır primitive'leri birleştirerek yeni bileşen oluşturur"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <PromptGuide
          summary="Primitive'ler tek başına kullanılabilir; ama çoğu ekranda birleştirilmiş halleri gerekir. Bu prompt, mevcut parçaları (Card, Label, Badge…) kullanarak domain-specific bir component üretir. Özel klavye navigasyonu, async fetch veya karmaşık state machine yoksa doğru seçim budur."
          useWhen="stat-card, user-avatar-group, pricing-card gibi — yapı basit, mevcut parçalar yeterli, props ile kontrol ediliyor."
          avoidWhen={
            <>
              Temel parça eksik → <strong>Create Primitive</strong>. Combobox gibi ağır interaction →{" "}
              <strong>Custom Build</strong>. Sadece button&apos;a stil → <strong>Add Variant</strong>.
            </>
          }
          example={
            <>
              &quot;Revenue gösteren kart — label, büyük sayı, yukarı trend badge, loading skeleton.&quot;
              <span className="mt-2 block text-muted-foreground">
                → Card + Label + Badge birleşir,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ui/components/stat-card/</code> oluşur
              </span>
            </>
          }
          outputs={
            <PromptGuideList
              items={[
                <>
                  Konum: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ui/components/[name]/</code>
                </>,
                "Dosyalar: default.tsx, demo.tsx, [variant].tsx",
                "Her demo tek konsept — bir dosya bir fikir",
                "Primitive'ler ui/primitives/ altından import edilir",
                "Component seviyesinde CVA gerekmez (yeni variant yoksa)",
              ]}
            />
          }
          outputsTitle="Dosya yapısı"
        />
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
                <div className="grid gap-2"><Label className="text-xs font-semibold">Component Name</Label><Input value={values.component_name} onChange={(e) => setValues(p => ({ ...p, component_name: e.target.value }))} placeholder="e.g., stat-card, data-table" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Primitives to Use" values={values.primitives_used} placeholder="e.g., Card (for container)" onChange={(v) => setValues(p => ({ ...p, primitives_used: v }))} />
                <MultiInput label="Required Features" values={values.features} placeholder="e.g., Display numeric stat with label" onChange={(v) => setValues(p => ({ ...p, features: v }))} />
                <div className="grid gap-2"><Label className="text-xs font-semibold">State Management</Label><Input value={values.state_management} onChange={(e) => setValues(p => ({ ...p, state_management: e.target.value }))} placeholder="e.g., external (all props), internal" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Usage Examples" values={values.documentation_examples} placeholder="e.g., Revenue stat with trend" onChange={(v) => setValues(p => ({ ...p, documentation_examples: v }))} />
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
