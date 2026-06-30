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

Modify existing component: {component_name}

Target variant: {variant_name}

Changes to apply:
{changes}

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

Modification guidelines:
1. Read ui/primitives/{component_name}.tsx first — understand full current state
2. Apply only the listed changes — don't refactor unrelated code
3. Maintain backwards compatibility unless breaking change is explicitly listed
4. Keep all existing data-slot attributes and TypeScript types intact
5. Ensure accessibility remains intact (focus-visible, aria-* states)
6. Test that light/dark mode still works after changes
${RESPONSIVE_REQUIREMENTS_SECTION}

Return:
1. Modified sections only (diff-style, with context)
2. What changed and why
3. Any breaking changes
4. Demo update if needed`

const EXAMPLE_VALUES = {
  component_name: "badge",
  variant_name: "success",
  changes: ["Change background from muted green to --color-success token", "Increase font weight to semibold for better visibility", "Add optional icon slot on left side", "Update demo file to show new icon usage"],
}

const EMPTY_VALUES = {
  component_name: "",
  variant_name: "",
  changes: [""],
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

export default function ModifyExistingPage() {
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
    result = result.replace(/\{variant_name\}/g, values.variant_name || "")
    result = result.replace(/\{changes\}/g, values.changes.filter(Boolean).map(f => `- ${f}`).join("\n") || "")
    if (withDocs) {
      const name = values.component_name || "{component_name}"
      result += `\n---\n\nALSO GENERATE DOCUMENTATION:\n\nAfter applying changes, also update the documentation page:\n\nFile: app/docs/ui/components/${name}/page.tsx\n\n1. Update affected demo files in ui/components/${name}/\n2. Update the docs page:\n   - Import DocsPage, DocsPageHeader, DocsSection, DocsCallout from @/app/docs/_components/\n   - Import ComponentExample from @/app/docs/_components/component-example\n   - Reflect changes in Examples and Props table\n   - Add Best Practices callout if behavior changed\n\nReturn: modified component + updated demos + docs page.`
    }
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
        title="Targeted Edit"
        description="Sadece listelediğin değişiklikleri yapar — geri kalan koda dokunmaz"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <PromptGuide
          summary="Cerrahi müdahale prompt'u. Değişiklik listesi verirsin, AI sadece onları uygular — refactor yapmaz, yanındaki kodu ellemiyor, istemediğin şeyi iyileştirmez. Mevcut variant'ı düzeltmek veya küçük API eklemek için ideal."
          useWhen="Success badge'in rengi yanlış. Default button padding'i 2px artır. Input'a sol tarafa icon slot ekle. Tek bir variant'ta bug fix."
          avoidWhen={
            <>
              Sıfırdan yeni variant stili → <strong>Add Variant</strong>. Tüm dosyayı temizlemek →{" "}
              <strong>Refactor</strong>. Yeni büyük özellik → <strong>Custom Build</strong>.
            </>
          }
          example={
            <>
              &quot;Badge success variant — arka planı hardcoded yeşil yerine{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">--success</code> token kullan, font-weight
              semibold olsun.&quot;
              <span className="mt-2 block text-muted-foreground">→ Sadece o variant satırları değişir.</span>
            </>
          }
          outputs={
            <PromptGuideList
              items={[
                "AI önce tüm dosyayı okur",
                "Sadece listelediğin maddeler değişir",
                "Geriye dönük uyumluluk korunur (aksi yazmadıkça)",
                "data-slot ve TypeScript tipleri bozulmaz",
                "Light/dark mode sonrası kontrol edilir",
              ]}
            />
          }
          outputsTitle="Güvenlik kuralları"
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
                <div className="grid gap-2"><Label className="text-xs font-semibold">Component Name</Label><Input value={values.component_name} onChange={(e) => setValues(p => ({ ...p, component_name: e.target.value }))} placeholder="e.g., badge, button, input" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Target Variant</Label><Input value={values.variant_name} onChange={(e) => setValues(p => ({ ...p, variant_name: e.target.value }))} placeholder="e.g., success, default, ghost" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Changes to Apply" values={values.changes} placeholder="e.g., Change background to --color-success token" onChange={(v) => setValues(p => ({ ...p, changes: v }))} />
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
