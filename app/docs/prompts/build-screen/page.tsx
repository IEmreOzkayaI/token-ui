"use client"

import { useState, type ReactNode } from "react"
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
import {
  BLOCK_SUBCOMPONENT_STRUCTURE_SECTION,
  getBlockSubcomponentDocsSection,
} from "@/app/docs/prompts/_lib/block-subcomponent-requirements"
import {
  RESPONSIVE_BREAKPOINTS_REFERENCE,
  RESPONSIVE_REQUIREMENTS_SECTION,
} from "@/app/docs/prompts/_lib/responsive-requirements"

const PROMPT = `You are a Token UI design system engineer.

Build screen: {screen_name}

Domain context:
{domain_context}

Layout sections:
{layout_sections}

Components to use:
{components_used}

Data entities:
{data_entities}

Interactions:
{interactions}

States:
{states}

${RESPONSIVE_BREAKPOINTS_REFERENCE}

Screen-specific responsive rules:
{responsive_rules}
${RESPONSIVE_REQUIREMENTS_SECTION}

---

CODEBASE REFERENCE (read before writing any code):

Design tokens  → app/globals.css
  All CSS variables are defined here. No hardcoded values allowed.
  Token categories: colors, typography, spacing (--space-*), radius (--radius-*),
  shadows (--shadow-*), borders (--border, --input), transitions (--transition-*).
  Dark mode is automatic via CSS variables — no dark: Tailwind classes for colors.

Screen blocks → ui/blocks/AdminDashboard/*
  Read for layout density, section rhythm, and block-level composition patterns.

KPI metrics → ui/components/stat-card/*
  Use StatCard for all KPI tiles. Custom gradient cards are NOT allowed.

Charts → ui/components/chart/example-legend.tsx + ui/primitives/chart.tsx
  Use ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip.
  Colors: --chart-1 through --chart-5 only. NO hex values.

Existing primitives → ui/primitives/*
  Read these files to understand CVA structure, import paths, data-slot usage,
  export format, and TypeScript types.

Foundation docs → app/docs/foundations/*
  Read these to understand design decisions, token usage rules, and system constraints.

---

Build guidelines:
1. Location: ui/blocks/{screen_name}/
2. Decompose into _components/ — one PascalCase export per file (KpiStrip, DashboardToolbar, ProductSalesChart, etc.)
3. Root file {screen_name}.tsx orchestrates layout; data-slot on each region
4. mock-data.ts with realistic domain data
5. Demo files: default.tsx, demo.tsx, loading.tsx, empty.tsx
6. types.ts and utils.ts for entities, formatters, aggregates (computed outside JSX)
7. demo-props.ts + subcomponent-demos/{ComponentName}.tsx for EVERY _components/ export (REQUIRED)
8. KPI row: StatCard with className="max-w-none w-full", grid gap-4 sm:grid-cols-2 xl:grid-cols-4
9. Charts: ChartContainer + ChartLegend (no duplicate Badge legend), custom tooltip with locale format
10. Presentational: all data via props; no hardcoded aggregates in JSX
11. Empty + loading states must mirror loaded layout skeleton (section titles visible)
${BLOCK_SUBCOMPONENT_STRUCTURE_SECTION}

Quality checklist (self-verify before returning):
- KPI row uses StatCard, not custom gradient cards
- Charts use --chart-* tokens only; no inline hex or hardcoded colors
- Empty and loading states match loaded layout structure
- Aggregates computed in utils, not inline in render
- Horizontal bar charts: adequate YAxis width, radius={[0,4,4,0]}
- Primary chart area: min-h-[360px]; horizontal scroll when many data points
- Responsive layout verified at mobile, tablet portrait, tablet landscape, and desktop breakpoints
- Every _components/ export has demo-props entry, subcomponent-demos file, block-subcomponents.ts registry entry, and block-subcomponent-demo-map.tsx entry

Return:
1. Root screen + _components/
2. types.ts, utils.ts, mock-data.ts
3. default.tsx, demo.tsx, loading.tsx, empty.tsx
4. demo-props.ts + subcomponent-demos/ (one file per _components/ export)
5. block-subcomponents.ts registry entry + block-subcomponent-demo-map.tsx entries`

const EXAMPLE_VALUES = {
  screen_name: "station-sales-dashboard",
  domain_context:
    "Benzin istasyonu satış paneli — 5 istasyon, 4 ürün kategorisi (Benzin 95, Benzin 97, Motorin, LPG). Para birimi TRY, tr-TR locale.",
  layout_sections: [
    "Page header (title + description)",
    "KPI strip — 4 StatCards: toplam ciro, toplam litre, aktif istasyon, en çok satan ürün",
    "Primary chart — grouped bar: istasyon × ürün ciro",
    "Secondary chart — horizontal bar: istasyon ciro sıralaması",
    "Demo toolbar — şehir filtresi (Select)",
  ],
  components_used: [
    "StatCard (KPI strip)",
    "Card + CardHeader + CardContent (chart panels)",
    "ChartContainer + ChartLegend + BarChart (Recharts)",
    "Select + Label (demo filter)",
    "Empty + Skeleton (states)",
  ],
  data_entities: [
    "StationSale { stationId, stationName, city?, products: Record<ProductCategory, { liters, revenue }> }",
    "ProductCategory: benzin95 | benzin97 | motorin | lpg",
    "Aggregates: totalRevenue, totalLiters, stationCount, topProduct",
  ],
  interactions: [
    "City filter (demo) — Select narrows station list",
    "Chart tooltip — TRY currency format, per-product breakdown + subtotal",
    "Horizontal scroll on primary chart when many stations",
  ],
  states: [
    "loading — skeleton with section titles + StatCard skeletons + chart placeholders",
    "empty — Empty component when data array is empty",
    "loaded — full KPI strip + both charts",
  ],
  responsive_rules: [
    "KPI grid: 1 col mobile → 2 cols sm → 4 cols xl",
    "Toolbar filters: stack on mobile, wrap on sm, row on lg+",
    "Charts stack vertically below xl; overflow-x-auto for wide bar charts",
    "Tables: overflow-x-auto with min-width on mobile/tablet",
    "Two-column chart rows collapse to single column below xl",
  ],
}

const EMPTY_VALUES = {
  screen_name: "",
  domain_context: "",
  layout_sections: [""],
  components_used: [""],
  data_entities: [""],
  interactions: [""],
  states: [""],
  responsive_rules: [""],
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

export default function BuildScreenPage() {
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
    const replaceList = (key: keyof Values, field: string) => {
      const val = values[key]
      const text = Array.isArray(val)
        ? val.filter(Boolean).map((f) => `- ${f}`).join("\n") || ""
        : (val as string) || ""
      result = result.replace(new RegExp(`\\{${field}\\}`, "g"), text)
    }
    replaceList("screen_name", "screen_name")
    replaceList("domain_context", "domain_context")
    replaceList("layout_sections", "layout_sections")
    replaceList("components_used", "components_used")
    replaceList("data_entities", "data_entities")
    replaceList("interactions", "interactions")
    replaceList("states", "states")
    replaceList("responsive_rules", "responsive_rules")
    if (withDocs) {
      result += getBlockSubcomponentDocsSection(values.screen_name || "{screen_name}")
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
      values.screen_name,
      values.domain_context,
      ...values.layout_sections.filter(Boolean),
      ...values.components_used.filter(Boolean),
      ...values.data_entities.filter(Boolean),
      ...values.interactions.filter(Boolean),
      ...values.states.filter(Boolean),
      ...values.responsive_rules.filter(Boolean),
    ].filter(Boolean).sort((a, b) => b.length - a.length)
    const pattern = allValues.length ? new RegExp(allValues.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g") : null
    const hl = (text: string): ReactNode => {
      if (!pattern) return text
      const parts: ReactNode[] = []; let last = 0; let m: RegExpExecArray | null
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
        title="Build Screen"
        description="Tam dashboard veya analitik ekran: KPI şeridi, chart'lar, filtre ve tablo"
        action={<Button onClick={() => setOpen(true)} size="sm" className="gap-2"><Plus className="size-3.5" /> Create</Button>}
      />

      <DocsSection id="overview" title="Overview">
        <PromptGuide
          summary="Ekran seviyesi iş için özel prompt. Tek widget değil — layout + veri görselleştirme + filtre + boş/yükleme durumları bir arada. KPI'lar için StatCard, chart'lar için ChartContainer pattern'i zorunlu; çıktı ui/blocks/ altına gider."
          useWhen="Dashboard, analitik panel, satış özeti gibi tam ekran bölümler. Birden fazla chart, KPI strip, filtre veya tablo içeriyorsa."
          avoidWhen={
            <>
              Tek yeniden kullanılabilir widget → <strong>Compose Component</strong>. Combobox gibi karmaşık tek parça →{" "}
              <strong>Custom Build</strong>. Sadece bir primitive&apos;e variant → <strong>Add Variant</strong>.
            </>
          }
          example={
            <>
              &quot;5 istasyonun ürün bazlı ciro paneli — 4 KPI, grouped bar chart, sıralama grafiği, şehir filtresi.&quot;
              <span className="mt-2 block text-muted-foreground">
                → <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ui/blocks/station-sales-dashboard/</code> oluşur
              </span>
            </>
          }
          outputs={
            <PromptGuideList
              items={[
                <>
                  Konum: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ui/blocks/[screen-name]/</code>
                </>,
                "Root orchestrator + _components/ alt bileşenleri",
                "types.ts, utils.ts, mock-data.ts",
                "default.tsx, demo.tsx, loading.tsx, empty.tsx",
                "demo-props.ts + subcomponent-demos/ (her _components/ export için zorunlu)",
                "block-subcomponents.ts registry + block-subcomponent-demo-map.tsx kayıtları",
                "StatCard KPI + ChartContainer chart (token renkleri)",
                "Root docs sayfası + Sub-components bölümü (Include docs açıksa)",
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
                <div className="grid gap-2"><Label className="text-xs font-semibold">Screen Name</Label><Input value={values.screen_name} onChange={(e) => setValues(p => ({ ...p, screen_name: e.target.value }))} placeholder="e.g., station-sales-dashboard" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <div className="grid gap-2"><Label className="text-xs font-semibold">Domain Context</Label><Input value={values.domain_context} onChange={(e) => setValues(p => ({ ...p, domain_context: e.target.value }))} placeholder="Business domain description" className="h-9 text-sm focus-visible:ring-primary" /></div>
                <MultiInput label="Layout Sections" values={values.layout_sections} placeholder="e.g., KPI strip with 4 StatCards" onChange={(v) => setValues(p => ({ ...p, layout_sections: v }))} />
                <MultiInput label="Components Used" values={values.components_used} placeholder="e.g., StatCard, ChartContainer" onChange={(v) => setValues(p => ({ ...p, components_used: v }))} />
                <MultiInput label="Data Entities" values={values.data_entities} placeholder="e.g., StationSale type" onChange={(v) => setValues(p => ({ ...p, data_entities: v }))} />
                <MultiInput label="Interactions" values={values.interactions} placeholder="e.g., City filter with Select" onChange={(v) => setValues(p => ({ ...p, interactions: v }))} />
                <MultiInput label="States" values={values.states} placeholder="e.g., loading skeleton" onChange={(v) => setValues(p => ({ ...p, states: v }))} />
                <MultiInput label="Responsive Rules" values={values.responsive_rules} placeholder="e.g., KPI grid 1→2→4 cols" onChange={(v) => setValues(p => ({ ...p, responsive_rules: v }))} />
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
