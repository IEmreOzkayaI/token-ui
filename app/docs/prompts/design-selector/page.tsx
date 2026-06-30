"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/primitives/button"
import { Card, CardContent } from "@/primitives/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { cn } from "@/lib/utils"

const SAMPLE_PROMPT = `You are a Token UI design system engineer.

Create a new primitive component: toggle-group

Base element/primitive: div

Required features:
- Multiple toggle buttons
- Selection state management
- Single or multiple selection modes

Variant options:
- default, outline, ghost

Accessibility requirements:
- ARIA roles for button group
- Keyboard navigation

Guidelines:
[full guidelines...]`

const PARAMETERS = [
  { key: "primitive_name", label: "Primitive Name", value: "toggle-group" },
  { key: "base_element", label: "Base Element", value: "div" },
  { key: "features", label: "Required Features", value: "- Multiple toggle buttons\n- Selection state" },
  { key: "variants", label: "Variant Options", value: "- default, outline, ghost" },
  { key: "a11y", label: "A11y Requirements", value: "- ARIA roles\n- Keyboard nav" },
]

// Layout 1: Single Page (Vertical Flow)
function Layout1SinglePage() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Overview</h3>
        <p className="text-xs text-muted-foreground">Use this prompt when creating new foundational primitives...</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Parameters</h3>
        <div className="space-y-2">
          {PARAMETERS.map((p) => (
            <div key={p.key} className="text-xs">
              <code className="bg-foreground/10 px-2 py-1 rounded">{p.label}</code>
              <input
                type="text"
                defaultValue={p.value}
                className="mt-1 w-full rounded border border-border/50 bg-foreground/5 px-2 py-1 text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Generated Prompt</h3>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={async () => {
              const ok = await copyToClipboard(SAMPLE_PROMPT)
              if (ok) {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }
            }}
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <CodeBlock code={SAMPLE_PROMPT} showLineNumbers={false} className="max-h-64" />
      </div>
    </div>
  )
}

// Layout 2: Sidebar (Left Tabs, Right Content)
function Layout2Sidebar() {
  const [tab, setTab] = useState("params")
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex gap-6">
      <div className="w-48 space-y-1">
        {["Overview", "Parameters", "Template"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t.toLowerCase().replace(" ", ""))}
            className={cn(
              "w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors",
              tab === t.toLowerCase().replace(" ", "")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {tab === "overview" && (
          <div>
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-xs text-muted-foreground">Use this prompt when creating new foundational primitives...</p>
          </div>
        )}
        {tab === "params" && (
          <div className="space-y-3">
            <h3 className="font-semibold">Fill Parameters</h3>
            {PARAMETERS.map((p) => (
              <div key={p.key}>
                <label className="text-xs font-medium block mb-1">{p.label}</label>
                <input
                  type="text"
                  defaultValue={p.value}
                  className="w-full rounded border border-border/50 bg-foreground/5 px-2 py-1 text-xs"
                />
              </div>
            ))}
          </div>
        )}
        {tab === "template" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Generated Prompt</h3>
              <Button variant="ghost" size="icon-sm" onClick={async () => {
                const ok = await copyToClipboard(SAMPLE_PROMPT)
                if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
              }}>
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <CodeBlock code={SAMPLE_PROMPT} showLineNumbers={false} className="max-h-64" />
          </div>
        )}
      </div>
    </div>
  )
}

// Layout 3: Card-Based (Inputs in Cards)
function Layout3CardBased() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {PARAMETERS.map((p) => (
          <Card key={p.key}>
            <CardContent className="pt-4">
              <label className="text-xs font-medium block mb-2">{p.label}</label>
              <input
                type="text"
                defaultValue={p.value}
                className="w-full rounded border border-border/50 bg-foreground/5 px-2 py-1 text-xs"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Generated Prompt</h3>
            <Button variant="ghost" size="icon-sm" onClick={async () => {
              const ok = await copyToClipboard(SAMPLE_PROMPT)
              if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
            }}>
              {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            </Button>
          </div>
          <CodeBlock code={SAMPLE_PROMPT} showLineNumbers={false} className="max-h-64" />
        </CardContent>
      </Card>
    </div>
  )
}

// Layout 4: Minimal (Collapsed)
function Layout4Minimal() {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left flex items-center justify-between"
        >
          <h3 className="font-semibold">Fill Parameters</h3>
          <span>{expanded ? "−" : "+"}</span>
        </button>
        {expanded && (
          <div className="space-y-3 mt-4 pt-4 border-t">
            {PARAMETERS.map((p) => (
              <div key={p.key}>
                <label className="text-xs font-medium block mb-1">{p.label}</label>
                <input
                  type="text"
                  defaultValue={p.value}
                  className="w-full rounded border border-border/50 bg-foreground/5 px-2 py-1 text-xs"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Generated Prompt</h3>
          <Button variant="ghost" size="icon-sm" onClick={async () => {
            const ok = await copyToClipboard(SAMPLE_PROMPT)
            if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
          }}>
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <CodeBlock code={SAMPLE_PROMPT} showLineNumbers={false} className="max-h-64" />
      </div>
    </div>
  )
}

// Layout 5: Split View (Left Template, Right Preview)
function Layout5SplitView() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-3">
        <h3 className="font-semibold">Parameters</h3>
        {PARAMETERS.map((p) => (
          <div key={p.key}>
            <label className="text-xs font-medium block mb-1">{p.label}</label>
            <input
              type="text"
              defaultValue={p.value}
              className="w-full rounded border border-border/50 bg-foreground/5 px-2 py-1 text-xs"
            />
          </div>
        ))}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Live Preview</h3>
          <Button variant="ghost" size="icon-sm" onClick={async () => {
            const ok = await copyToClipboard(SAMPLE_PROMPT)
            if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
          }}>
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          </Button>
        </div>
        <CodeBlock code={SAMPLE_PROMPT} showLineNumbers={false} className="max-h-96" />
      </div>
    </div>
  )
}

export default function DesignSelectorPage() {
  const [selected, setSelected] = useState<"1" | "2" | "3" | "4" | "5">("1")

  return (
    <DocsPage toc={[]}>
      <DocsPageHeader
        title="Prompt UI Design Selector"
        description="Choose your preferred layout for prompt screens"
      />

      <DocsSection id="intro" title="Select Layout">
        <p className="text-muted-foreground mb-6">
          5 design options below. Choose the one you prefer most.
        </p>

        <Tabs value={selected} onValueChange={(v: any) => setSelected(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="1">Single Page</TabsTrigger>
            <TabsTrigger value="2">Sidebar</TabsTrigger>
            <TabsTrigger value="3">Cards</TabsTrigger>
            <TabsTrigger value="4">Minimal</TabsTrigger>
            <TabsTrigger value="5">Split</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="border rounded-lg p-6 bg-foreground/2">
            <Layout1SinglePage />
          </TabsContent>

          <TabsContent value="2" className="border rounded-lg p-6 bg-foreground/2">
            <Layout2Sidebar />
          </TabsContent>

          <TabsContent value="3" className="border rounded-lg p-6 bg-foreground/2">
            <Layout3CardBased />
          </TabsContent>

          <TabsContent value="4" className="border rounded-lg p-6 bg-foreground/2">
            <Layout4Minimal />
          </TabsContent>

          <TabsContent value="5" className="border rounded-lg p-6 bg-foreground/2">
            <Layout5SplitView />
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium">
            Selected: <span className="text-primary font-semibold">Layout {selected}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Choose one above, then tell me which you prefer and I'll implement it for all 12 prompt pages.
          </p>
        </div>
      </DocsSection>
    </DocsPage>
  )
}
